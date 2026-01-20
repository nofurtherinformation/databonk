import { DataType, TypedArrayInstance } from '../utils/types.js';
import { BitSet } from '../utils/bitset.js';
export declare class Column<T = any> {
    readonly name: string;
    readonly dataType: DataType;
    private data;
    private nullBitmap;
    readonly length: number;
    constructor(name: string, values: T[], dataType?: DataType);
    private createDataArray;
    get(index: number): T | null;
    /**
     * Get a value without bounds checking or null handling.
     * Use only when caller ensures valid index and handles nulls separately.
     * @internal
     */
    getRaw(index: number): T;
    /**
     * Get direct reference to the underlying data array.
     * Use for batch operations that need raw access.
     * @internal
     */
    getDataRef(): TypedArrayInstance | any[];
    /**
     * Get direct reference to the null bitmap.
     * Use for batch null checking.
     * @internal
     */
    getNullBitmapRef(): BitSet;
    isNull(index: number): boolean;
    slice(start?: number, end?: number): Column<T>;
    filter(predicate: (value: T | null, index: number) => boolean): Column<T>;
    map<U>(fn: (value: T | null, index: number) => U, newDataType?: DataType): Column<U>;
    sum(): number;
    mean(): number;
    min(): number;
    max(): number;
    count(): number;
    unique(): T[];
    values(): Iterator<T | null>;
    toArray(): (T | null)[];
    static from<T>(name: string, values: T[], dataType?: DataType): Column<T>;
    /**
     * Create a Column directly from raw data without copying.
     * Use for optimized construction when data is already in the correct format.
     * @internal
     */
    static fromRaw<T>(name: string, data: TypedArrayInstance | any[], nullBitmap: BitSet, dataType: DataType): Column<T>;
    /**
     * Select rows by indices with optimized batch copying.
     * Much faster than calling get() for each index.
     */
    selectIndices(indices: number[]): Column<T>;
}
//# sourceMappingURL=column.d.ts.map