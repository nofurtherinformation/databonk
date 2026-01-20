import { DataFrame } from './dataframe.js';

/**
 * CachedIndex stores a hash index along with metadata about when it was created.
 */
export interface CachedIndex {
  columns: string[];
  index: Map<string, number[]>;
  createdAt: number;
}

/**
 * IndexCache provides caching for hash indices used in join and groupBy operations.
 * Uses WeakMap to allow garbage collection of DataFrames.
 */
export class IndexCache {
  private cache: WeakMap<DataFrame, Map<string, CachedIndex>> = new WeakMap();
  private maxAge: number;  // Maximum age in milliseconds

  constructor(maxAge: number = 60000) {  // Default 1 minute
    this.maxAge = maxAge;
  }

  /**
   * Generate a cache key from column names.
   */
  private getCacheKey(columns: string[]): string {
    return columns.slice().sort().join('\x00');
  }

  /**
   * Get a cached index for the given DataFrame and columns.
   * Returns null if not cached or expired.
   */
  getIndex(df: DataFrame, columns: string[]): Map<string, number[]> | null {
    const dfCache = this.cache.get(df);
    if (!dfCache) return null;

    const key = this.getCacheKey(columns);
    const cached = dfCache.get(key);

    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.createdAt > this.maxAge) {
      dfCache.delete(key);
      return null;
    }

    return cached.index;
  }

  /**
   * Store an index in the cache.
   */
  setIndex(df: DataFrame, columns: string[], index: Map<string, number[]>): void {
    let dfCache = this.cache.get(df);
    if (!dfCache) {
      dfCache = new Map();
      this.cache.set(df, dfCache);
    }

    const key = this.getCacheKey(columns);
    dfCache.set(key, {
      columns: columns.slice(),
      index,
      createdAt: Date.now()
    });
  }

  /**
   * Invalidate all cached indices for a DataFrame.
   */
  invalidate(df: DataFrame): void {
    this.cache.delete(df);
  }

  /**
   * Clear all cached indices.
   */
  clear(): void {
    // WeakMap doesn't have a clear method, so we create a new one
    this.cache = new WeakMap();
  }
}

/**
 * Global index cache instance for shared use across operations.
 */
export const globalIndexCache = new IndexCache();
