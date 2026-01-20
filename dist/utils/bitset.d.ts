export declare class BitSet {
    private data;
    private length;
    constructor(length: number);
    set(index: number, value: boolean): void;
    get(index: number): boolean;
    size(): number;
    count(): number;
    private popCount;
    [Symbol.iterator](): Iterator<boolean>;
}
//# sourceMappingURL=bitset.d.ts.map