import { DataType } from './types.js';
/**
 * TypedHasher provides efficient hashing for different data types.
 * Uses numeric hashing for numeric keys to avoid expensive string conversion.
 */
export declare class TypedHasher {
    private static readonly FNV_OFFSET;
    private static readonly FNV_PRIME;
    private static readonly NULL_SENTINEL;
    /**
     * Hash a single numeric value directly without string conversion.
     * For 32-bit integers, uses the value itself as the hash.
     * For floats, uses bit-level hashing.
     */
    static hashSingleNumeric(value: number | null): number;
    /**
     * Hash a float64 value using bit-level operations.
     */
    private static hashFloat64;
    /**
     * Hash a string value using FNV-1a.
     */
    static hashString(value: string | null): number;
    /**
     * Hash any value based on its type.
     */
    static hashValue(value: any, dataType: DataType): number;
    /**
     * Hash a composite key (multiple columns) using FNV-1a combining.
     */
    static hashCompositeKey(values: any[], types: DataType[]): number;
    /**
     * Create a compound key for exact matching when hash collision is possible.
     * Returns a string representation for collision detection.
     */
    static createCompoundKey(values: any[]): string;
}
/**
 * NumericHashMap is a hash map optimized for numeric keys.
 * Uses open addressing with linear probing for cache-friendly access.
 */
export declare class NumericHashMap<V> {
    private keys;
    private values;
    private compoundKeys;
    private size;
    private capacity;
    private readonly EMPTY;
    private readonly DELETED;
    constructor(expectedSize?: number);
    private nextPowerOfTwo;
    private hash;
    /**
     * Set a value with both numeric hash and compound key for exact matching.
     */
    set(numericKey: number, compoundKey: string, value: V): void;
    /**
     * Get a value by numeric hash and compound key.
     */
    get(numericKey: number, compoundKey: string): V | undefined;
    /**
     * Check if a key exists.
     */
    has(numericKey: number, compoundKey: string): boolean;
    /**
     * Get or create a value.
     */
    getOrCreate(numericKey: number, compoundKey: string, factory: () => V): V;
    private resize;
    /**
     * Iterate over all entries.
     */
    entries(): IterableIterator<[string, V]>;
    /**
     * Get the number of entries.
     */
    getSize(): number;
}
//# sourceMappingURL=hash.d.ts.map