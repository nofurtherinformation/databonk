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
export declare class IndexCache {
    private cache;
    private maxAge;
    constructor(maxAge?: number);
    /**
     * Generate a cache key from column names.
     */
    private getCacheKey;
    /**
     * Get a cached index for the given DataFrame and columns.
     * Returns null if not cached or expired.
     */
    getIndex(df: DataFrame, columns: string[]): Map<string, number[]> | null;
    /**
     * Store an index in the cache.
     */
    setIndex(df: DataFrame, columns: string[], index: Map<string, number[]>): void;
    /**
     * Invalidate all cached indices for a DataFrame.
     */
    invalidate(df: DataFrame): void;
    /**
     * Clear all cached indices.
     */
    clear(): void;
}
/**
 * Global index cache instance for shared use across operations.
 */
export declare const globalIndexCache: IndexCache;
//# sourceMappingURL=index-cache.d.ts.map