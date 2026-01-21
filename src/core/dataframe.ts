import { Column } from './column';
import { DataType } from '../utils/types';
import { IndexManager } from './index-manager.js';
import { IndexOptions, IndexEntry, IndexType } from './index.js';

export type RowObject = Record<string, any>;

/**
 * Options for DataFrame factory methods.
 */
export interface DataFrameOptions {
  /**
   * Indices to create on the DataFrame at construction time.
   *
   * @example
   * const df = DataFrame.fromRows(data, {
   *   indices: [
   *     { columns: 'id', type: 'unique' },
   *     { columns: 'department' },
   *     { columns: ['year', 'region'], type: 'sorted' }
   *   ]
   * });
   */
  indices?: Array<{
    columns: string | string[];
    type?: IndexType;
    name?: string;
  }>;
}

/**
 * RowProxy provides zero-allocation row access for iteration.
 * Reuses a single object while iterating, avoiding object creation per row.
 */
export class RowProxy {
  private columnCache: Map<string, Column> = new Map();
  private index: number = 0;

  constructor(df: DataFrame) {
    for (const name of df.columnNames) {
      this.columnCache.set(name, df.column(name));
    }
  }

  /**
   * Set the current row index.
   * @returns this for chaining
   */
  setIndex(i: number): this {
    this.index = i;
    return this;
  }

  /**
   * Get a value from the current row.
   */
  get(col: string): any {
    const column = this.columnCache.get(col);
    if (!column) {
      throw new Error(`Column '${col}' not found`);
    }
    return column.get(this.index);
  }

  /**
   * Get a value without null checking (faster for non-null columns).
   */
  getRaw(col: string): any {
    return this.columnCache.get(col)!.getRaw(this.index);
  }

  /**
   * Check if a column value is null at the current row.
   */
  isNull(col: string): boolean {
    return this.columnCache.get(col)!.isNull(this.index);
  }

  /**
   * Get the current row index.
   */
  getIndex(): number {
    return this.index;
  }
}

export class DataFrame {
  private columns: Map<string, Column> = new Map();
  public readonly length: number;
  private _indexManager: IndexManager | null = null;

  constructor(data: Record<string, Column> | Column[]) {
    if (Array.isArray(data)) {
      data.forEach(col => this.columns.set(col.name, col));
    } else {
      Object.entries(data).forEach(([name, col]) => this.columns.set(name, col));
    }

    const lengths = Array.from(this.columns.values()).map(col => col.length);
    if (lengths.length === 0) {
      this.length = 0;
    } else if (new Set(lengths).size > 1) {
      throw new Error('All columns must have the same length');
    } else {
      this.length = lengths[0];
    }
  }

  get columnNames(): string[] {
    return Array.from(this.columns.keys());
  }

  get columnCount(): number {
    return this.columns.size;
  }

  column(name: string): Column {
    const col = this.columns.get(name);
    if (!col) {
      throw new Error(`Column '${name}' not found`);
    }
    return col;
  }

  hasColumn(name: string): boolean {
    return this.columns.has(name);
  }

  addColumn(column: Column): DataFrame {
    if (this.length > 0 && column.length !== this.length) {
      throw new Error('Column length must match DataFrame length');
    }
    
    const newColumns = new Map(this.columns);
    newColumns.set(column.name, column);
    return new DataFrame(Object.fromEntries(newColumns));
  }

  removeColumn(name: string): DataFrame {
    if (!this.hasColumn(name)) {
      throw new Error(`Column '${name}' not found`);
    }
    
    const newColumns = new Map(this.columns);
    newColumns.delete(name);
    return new DataFrame(Object.fromEntries(newColumns));
  }

  select(columns: string[]): DataFrame {
    const selectedColumns: Record<string, Column> = {};
    
    columns.forEach(name => {
      if (!this.hasColumn(name)) {
        throw new Error(`Column '${name}' not found`);
      }
      selectedColumns[name] = this.columns.get(name)!;
    });
    
    return new DataFrame(selectedColumns);
  }

  filter(predicate: (row: RowObject, index: number) => boolean): DataFrame {
    const indices: number[] = [];

    // Cache column references for the predicate
    const columnRefs: Array<[string, Column]> = [];
    this.columns.forEach((col, name) => columnRefs.push([name, col]));

    // Reuse a single row object to reduce allocations
    const row: RowObject = {};

    for (let i = 0; i < this.length; i++) {
      // Populate row object using cached column references
      for (const [name, col] of columnRefs) {
        row[name] = col.get(i);
      }
      if (predicate(row, i)) {
        indices.push(i);
      }
    }

    return this.selectRows(indices);
  }

  slice(start?: number, end?: number): DataFrame {
    const sliceStart = start || 0;
    const sliceEnd = end || this.length;
    
    const slicedColumns: Record<string, Column> = {};
    
    this.columns.forEach((column, name) => {
      slicedColumns[name] = column.slice(sliceStart, sliceEnd);
    });
    
    return new DataFrame(slicedColumns);
  }

  selectRows(indices: number[]): DataFrame {
    const selectedColumns: Record<string, Column> = {};

    this.columns.forEach((column, name) => {
      // Use optimized batch selection instead of individual get() calls
      selectedColumns[name] = column.selectIndices(indices);
    });

    return new DataFrame(selectedColumns);
  }

  /**
   * Filter rows using a predicate function that receives a RowProxy.
   * More efficient than filter() as it avoids creating a new object per row.
   */
  filterByIndex(predicate: (index: number, proxy: RowProxy) => boolean): DataFrame {
    const proxy = new RowProxy(this);
    const indices: number[] = [];

    for (let i = 0; i < this.length; i++) {
      if (predicate(i, proxy.setIndex(i))) {
        indices.push(i);
      }
    }

    return this.selectRows(indices);
  }

  /**
   * Create a RowProxy for efficient iteration.
   * Use this when you need to access multiple columns per row without allocation.
   */
  createRowProxy(): RowProxy {
    return new RowProxy(this);
  }

  getRow(index: number): RowObject {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    
    const row: RowObject = {};
    this.columns.forEach((column, name) => {
      row[name] = column.get(index);
    });
    
    return row;
  }

  *rows(): IterableIterator<RowObject> {
    for (let i = 0; i < this.length; i++) {
      yield this.getRow(i);
    }
  }

  head(n: number = 5): DataFrame {
    return this.slice(0, Math.min(n, this.length));
  }

  tail(n: number = 5): DataFrame {
    return this.slice(Math.max(0, this.length - n));
  }

  sort(columnName: string, ascending: boolean = true): DataFrame {
    if (!this.hasColumn(columnName)) {
      throw new Error(`Column '${columnName}' not found`);
    }
    
    const indices = Array.from({ length: this.length }, (_, i) => i);
    const column = this.columns.get(columnName)!;
    
    indices.sort((a, b) => {
      const valueA = column.get(a);
      const valueB = column.get(b);
      
      if (valueA === null && valueB === null) return 0;
      if (valueA === null) return ascending ? 1 : -1;
      if (valueB === null) return ascending ? -1 : 1;
      
      let comparison: number;
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else {
        comparison = (valueA as number) - (valueB as number);
      }
      
      return ascending ? comparison : -comparison;
    });
    
    return this.selectRows(indices);
  }

  drop(columns: string[]): DataFrame {
    const remainingColumns: Record<string, Column> = {};
    
    this.columns.forEach((column, name) => {
      if (!columns.includes(name)) {
        remainingColumns[name] = column;
      }
    });
    
    return new DataFrame(remainingColumns);
  }

  rename(columnMapping: Record<string, string>): DataFrame {
    const renamedColumns: Record<string, Column> = {};
    
    this.columns.forEach((column, oldName) => {
      const newName = columnMapping[oldName] || oldName;
      renamedColumns[newName] = new Column(newName, column.toArray(), column.dataType);
    });
    
    return new DataFrame(renamedColumns);
  }

  toArray(): RowObject[] {
    const result: RowObject[] = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.getRow(i));
    }
    return result;
  }

  toColumns(): Record<string, any[]> {
    const result: Record<string, any[]> = {};
    this.columns.forEach((column, name) => {
      result[name] = column.toArray();
    });
    return result;
  }

  // ==================== Index Methods ====================

  /**
   * Get the IndexManager for this DataFrame.
   * Creates one lazily if it doesn't exist.
   */
  get indexManager(): IndexManager {
    if (!this._indexManager) {
      this._indexManager = new IndexManager();
    }
    return this._indexManager;
  }

  /**
   * Create an index on one or more columns.
   *
   * @param columns - Column name(s) to index
   * @param options - Index options (type: 'hash' | 'sorted' | 'unique', name: string)
   * @returns This DataFrame for chaining
   *
   * @example
   * // Create a hash index (default)
   * df.createIndex('userId');
   *
   * // Create a sorted index for range queries / merge-join
   * df.createIndex(['year', 'region'], { type: 'sorted' });
   *
   * // Create a unique index (enforces uniqueness)
   * df.createIndex('id', { type: 'unique' });
   */
  createIndex(columns: string | string[], options?: IndexOptions): this {
    this.indexManager.createIndex(this, columns, options);
    return this;
  }

  /**
   * Drop an index by name.
   *
   * @param name - The index name
   * @returns true if dropped, false if not found
   */
  dropIndex(name: string): boolean {
    if (!this._indexManager) return false;
    return this._indexManager.dropIndex(name);
  }

  /**
   * Check if an index exists for the given column(s).
   *
   * @param columns - Column name(s) to check
   * @returns true if an index exists
   */
  hasIndex(columns: string | string[]): boolean {
    if (!this._indexManager) return false;
    return this._indexManager.hasIndex(columns);
  }

  /**
   * List all index names on this DataFrame.
   */
  listIndices(): string[] {
    if (!this._indexManager) return [];
    return this._indexManager.listIndices();
  }

  /**
   * Get an index by name or columns.
   *
   * @param nameOrColumns - Index name or column names
   * @returns The index entry or null
   */
  getIndex(nameOrColumns: string | string[]): IndexEntry | null {
    if (!this._indexManager) return null;
    return this._indexManager.getIndex(nameOrColumns);
  }

  static from(data: RowObject[] | Record<string, any[]>, options?: DataFrameOptions): DataFrame {
    if (Array.isArray(data)) {
      return DataFrame.fromRows(data, options);
    } else {
      return DataFrame.fromColumns(data, options);
    }
  }

  static fromRows(rows: RowObject[], options?: DataFrameOptions): DataFrame {
    if (rows.length === 0) {
      return new DataFrame({});
    }

    const columnNames = Object.keys(rows[0]);
    const columns: Record<string, Column> = {};

    columnNames.forEach(name => {
      const values = rows.map(row => row[name]);
      columns[name] = new Column(name, values);
    });

    const df = new DataFrame(columns);
    return DataFrame.applyOptions(df, options);
  }

  static fromColumns(data: Record<string, any[]>, options?: DataFrameOptions): DataFrame {
    const columns: Record<string, Column> = {};

    Object.entries(data).forEach(([name, values]) => {
      columns[name] = new Column(name, values);
    });

    const df = new DataFrame(columns);
    return DataFrame.applyOptions(df, options);
  }

  /**
   * Apply options (like indices) to a DataFrame.
   * @internal
   */
  private static applyOptions(df: DataFrame, options?: DataFrameOptions): DataFrame {
    if (options?.indices) {
      for (const indexSpec of options.indices) {
        df.createIndex(indexSpec.columns, {
          type: indexSpec.type,
          name: indexSpec.name,
        });
      }
    }
    return df;
  }
}