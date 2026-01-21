/**
 * Index types for DataFrame indexing operations.
 */

/**
 * Index type determines the data structure and capabilities:
 * - 'hash': Hash map for equality lookups (O(1) average). Default for most use cases.
 * - 'sorted': Sorted array for range queries and merge-joins (O(log n) lookup).
 * - 'unique': Hash map with uniqueness constraint (primary key semantics).
 */
export type IndexType = 'hash' | 'sorted' | 'unique';

/**
 * Options for creating an index.
 */
export interface IndexOptions {
  /** Index type. Defaults to 'hash'. */
  type?: IndexType;
  /** Custom name for the index. Auto-generated if not provided. */
  name?: string;
}

/**
 * Hash index entry - maps string keys to row indices.
 */
export interface HashIndexData {
  type: 'hash';
  /** Map from serialized key to array of row indices */
  map: Map<string, number[]>;
}

/**
 * Sorted index entry - maintains sorted order for range queries.
 */
export interface SortedIndexData {
  type: 'sorted';
  /** Sorted array of { key, indices } pairs */
  entries: Array<{ key: string; indices: number[] }>;
  /** Map from key to position in entries array for O(1) lookup */
  keyToPosition: Map<string, number>;
}

/**
 * Unique index entry - enforces uniqueness constraint.
 */
export interface UniqueIndexData {
  type: 'unique';
  /** Map from serialized key to single row index */
  map: Map<string, number>;
}

/**
 * Union type for all index data structures.
 */
export type IndexData = HashIndexData | SortedIndexData | UniqueIndexData;

/**
 * Complete index entry with metadata.
 */
export interface IndexEntry {
  /** Unique name for this index */
  name: string;
  /** Columns that make up the index key */
  columns: string[];
  /** The index data structure */
  data: IndexData;
  /** When the index was created (timestamp) */
  createdAt: number;
}

/**
 * Result of an index lookup operation.
 */
export interface IndexLookupResult {
  /** Row indices matching the lookup key */
  indices: number[];
  /** Whether the lookup was successful */
  found: boolean;
}
