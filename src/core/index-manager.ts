import { DataFrame } from './dataframe.js';
import { Column } from './column.js';
import {
  IndexType,
  IndexOptions,
  IndexEntry,
  IndexData,
  HashIndexData,
  SortedIndexData,
  UniqueIndexData,
  IndexLookupResult,
} from './index.js';

/**
 * Manages persistent indices for a DataFrame.
 * Indices are stored directly on the manager instance and persist until explicitly dropped.
 */
export class IndexManager {
  private indices: Map<string, IndexEntry> = new Map();
  private columnToIndices: Map<string, Set<string>> = new Map();

  /**
   * Create a new index on the given DataFrame.
   *
   * @param df - The DataFrame to index
   * @param columns - Column(s) to include in the index key
   * @param options - Index options (type, name)
   * @returns The name of the created index
   * @throws Error if unique index has duplicate values
   */
  createIndex(
    df: DataFrame,
    columns: string | string[],
    options: IndexOptions = {}
  ): string {
    const columnList = Array.isArray(columns) ? columns : [columns];
    const indexType = options.type || 'hash';
    const indexName = options.name || this.generateIndexName(indexType, columnList);

    // Validate columns exist
    for (const col of columnList) {
      if (!df.hasColumn(col)) {
        throw new Error(`Column '${col}' not found in DataFrame`);
      }
    }

    // Check if index with this name already exists
    if (this.indices.has(indexName)) {
      throw new Error(`Index '${indexName}' already exists`);
    }

    // Build the index
    const data = this.buildIndex(df, columnList, indexType);

    const entry: IndexEntry = {
      name: indexName,
      columns: columnList,
      data,
      createdAt: Date.now(),
    };

    // Store the index
    this.indices.set(indexName, entry);

    // Update column-to-index mapping for fast lookup
    for (const col of columnList) {
      if (!this.columnToIndices.has(col)) {
        this.columnToIndices.set(col, new Set());
      }
      this.columnToIndices.get(col)!.add(indexName);
    }

    return indexName;
  }

  /**
   * Build the index data structure.
   */
  private buildIndex(df: DataFrame, columns: string[], type: IndexType): IndexData {
    switch (type) {
      case 'hash':
        return this.buildHashIndex(df, columns);
      case 'sorted':
        return this.buildSortedIndex(df, columns);
      case 'unique':
        return this.buildUniqueIndex(df, columns);
      default:
        throw new Error(`Unknown index type: ${type}`);
    }
  }

  /**
   * Build a hash index for fast equality lookups.
   */
  private buildHashIndex(df: DataFrame, columns: string[]): HashIndexData {
    const map = new Map<string, number[]>();
    const cols = columns.map(c => df.column(c));

    for (let i = 0; i < df.length; i++) {
      const key = this.createKey(cols, i);
      const existing = map.get(key);
      if (existing) {
        existing.push(i);
      } else {
        map.set(key, [i]);
      }
    }

    return { type: 'hash', map };
  }

  /**
   * Build a sorted index for range queries and merge-joins.
   */
  private buildSortedIndex(df: DataFrame, columns: string[]): SortedIndexData {
    const map = new Map<string, number[]>();
    const cols = columns.map(c => df.column(c));

    // First build a hash map
    for (let i = 0; i < df.length; i++) {
      const key = this.createKey(cols, i);
      const existing = map.get(key);
      if (existing) {
        existing.push(i);
      } else {
        map.set(key, [i]);
      }
    }

    // Sort the keys and build the sorted entries array
    const sortedKeys = Array.from(map.keys()).sort();
    const entries: Array<{ key: string; indices: number[] }> = [];
    const keyToPosition = new Map<string, number>();

    for (let i = 0; i < sortedKeys.length; i++) {
      const key = sortedKeys[i];
      entries.push({ key, indices: map.get(key)! });
      keyToPosition.set(key, i);
    }

    return { type: 'sorted', entries, keyToPosition };
  }

  /**
   * Build a unique index that enforces uniqueness.
   */
  private buildUniqueIndex(df: DataFrame, columns: string[]): UniqueIndexData {
    const map = new Map<string, number>();
    const cols = columns.map(c => df.column(c));

    for (let i = 0; i < df.length; i++) {
      const key = this.createKey(cols, i);
      if (map.has(key)) {
        throw new Error(
          `Duplicate value found for unique index on columns [${columns.join(', ')}]: key='${key}'`
        );
      }
      map.set(key, i);
    }

    return { type: 'unique', map };
  }

  /**
   * Create a string key from column values at a given row index.
   */
  private createKey(columns: Column[], rowIndex: number): string {
    let key = '';
    for (let i = 0; i < columns.length; i++) {
      if (i > 0) key += '||';
      const val = columns[i].get(rowIndex);
      key += val === null ? '\0' : String(val);
    }
    return key;
  }

  /**
   * Generate a default index name.
   */
  private generateIndexName(type: IndexType, columns: string[]): string {
    return `idx_${type}_${columns.join('_')}`;
  }

  /**
   * Get an index by name or by column list.
   *
   * @param nameOrColumns - Index name or array of column names
   * @returns The index entry or null if not found
   */
  getIndex(nameOrColumns: string | string[]): IndexEntry | null {
    if (typeof nameOrColumns === 'string') {
      return this.indices.get(nameOrColumns) || null;
    }

    // Search by columns - find an index that matches exactly these columns
    const columnSet = new Set(nameOrColumns);
    for (const entry of this.indices.values()) {
      if (
        entry.columns.length === nameOrColumns.length &&
        entry.columns.every(c => columnSet.has(c))
      ) {
        return entry;
      }
    }

    return null;
  }

  /**
   * Get an index suitable for the given columns.
   * Returns the first matching index, preferring indices that exactly match the columns.
   */
  getIndexForColumns(columns: string[]): IndexEntry | null {
    // First try exact match
    const exact = this.getIndex(columns);
    if (exact) return exact;

    // Look for any index where all requested columns are a prefix
    // This allows using a multi-column index for single-column lookups
    for (const entry of this.indices.values()) {
      const entryColSet = new Set(entry.columns);
      if (columns.every(c => entryColSet.has(c))) {
        return entry;
      }
    }

    return null;
  }

  /**
   * Drop an index by name.
   *
   * @param name - The index name
   * @returns true if dropped, false if not found
   */
  dropIndex(name: string): boolean {
    const entry = this.indices.get(name);
    if (!entry) return false;

    // Remove from column mapping
    for (const col of entry.columns) {
      const indexSet = this.columnToIndices.get(col);
      if (indexSet) {
        indexSet.delete(name);
        if (indexSet.size === 0) {
          this.columnToIndices.delete(col);
        }
      }
    }

    this.indices.delete(name);
    return true;
  }

  /**
   * Check if an index exists for the given column(s).
   */
  hasIndex(columns: string | string[]): boolean {
    const columnList = Array.isArray(columns) ? columns : [columns];
    return this.getIndex(columnList) !== null;
  }

  /**
   * Check if an index exists by name.
   */
  hasIndexByName(name: string): boolean {
    return this.indices.has(name);
  }

  /**
   * List all index names.
   */
  listIndices(): string[] {
    return Array.from(this.indices.keys());
  }

  /**
   * Get all index entries.
   */
  getAllIndices(): IndexEntry[] {
    return Array.from(this.indices.values());
  }

  /**
   * Perform a lookup on a hash or unique index.
   */
  lookup(indexName: string, key: string): IndexLookupResult {
    const entry = this.indices.get(indexName);
    if (!entry) {
      return { indices: [], found: false };
    }

    switch (entry.data.type) {
      case 'hash': {
        const indices = entry.data.map.get(key);
        return indices ? { indices, found: true } : { indices: [], found: false };
      }
      case 'unique': {
        const idx = entry.data.map.get(key);
        return idx !== undefined
          ? { indices: [idx], found: true }
          : { indices: [], found: false };
      }
      case 'sorted': {
        const pos = entry.data.keyToPosition.get(key);
        if (pos !== undefined) {
          return { indices: entry.data.entries[pos].indices, found: true };
        }
        return { indices: [], found: false };
      }
      default:
        return { indices: [], found: false };
    }
  }

  /**
   * Convert an index to a hash map format (for join operations).
   * This allows the join algorithm to use the index without rebuilding.
   */
  toHashMap(indexName: string): Map<string, number[]> | null {
    const entry = this.indices.get(indexName);
    if (!entry) return null;

    switch (entry.data.type) {
      case 'hash':
        return entry.data.map;
      case 'sorted': {
        // Convert sorted index to hash map
        const map = new Map<string, number[]>();
        for (const { key, indices } of entry.data.entries) {
          map.set(key, indices);
        }
        return map;
      }
      case 'unique': {
        // Convert unique index to hash map
        const map = new Map<string, number[]>();
        for (const [key, idx] of entry.data.map) {
          map.set(key, [idx]);
        }
        return map;
      }
      default:
        return null;
    }
  }

  /**
   * Clear all indices.
   */
  clear(): void {
    this.indices.clear();
    this.columnToIndices.clear();
  }

  /**
   * Get the number of indices.
   */
  get size(): number {
    return this.indices.size;
  }
}
