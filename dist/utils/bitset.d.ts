export declare class BitSet {
    private data;
    private length;
    constructor(length: number);
    set(index: number, value: boolean): void;
    get(index: number): boolean;
    size(): number;
    count(): number;
    private popCount;
    /**
     * Get a batch of null flags as a bitmask.
     * Useful for SIMD-style batch null checking.
     * @param startIndex The starting index (must be aligned to 32 for optimal performance)
     * @param count Number of bits to get (max 32)
     * @returns A number where bit i is set if index (startIndex + i) is null
     */
    getNullMaskBatch(startIndex: number, count: number): number;
    /**
     * Check if any bit in a range is set.
     * Faster than checking each bit individually.
     */
    anySet(startIndex: number, count: number): boolean;
    /**
     * Get direct access to the underlying data array.
     * @internal
     */
    getDataRef(): Uint32Array;
    [Symbol.iterator](): Iterator<boolean>;
}
//# sourceMappingURL=bitset.d.ts.map