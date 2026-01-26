/**
 * SharedArrayBuffer utilities for zero-copy column access
 */
import type { DatabonkModule } from './loader';
/**
 * Zero-copy column view into WASM memory
 * Provides direct access to column data without copying
 */
export declare class ColumnView<T extends TypedArray> {
    /** The underlying typed array view */
    readonly data: T;
    /** Pointer to data in WASM memory */
    readonly ptr: number;
    /** Number of elements */
    readonly length: number;
    /** Whether this is a shared memory view */
    readonly isShared: boolean;
    constructor(data: T, ptr: number, isShared: boolean);
    /** Get value at index */
    get(index: number): number;
    /** Set value at index */
    set(index: number, value: number): void;
    /** Iterate over values */
    [Symbol.iterator](): Iterator<number>;
    /** Convert to regular array (copies data) */
    toArray(): number[];
    /** Slice the view (creates a copy) */
    slice(start?: number, end?: number): T;
}
type TypedArray = Int32Array | Float32Array | Float64Array | Uint8Array;
type NumericTypedArray = Int32Array | Float32Array | Float64Array;
/**
 * Column type enum matching AssemblyScript
 */
export declare enum ColumnType {
    Int32 = 0,
    Int64 = 1,
    Float32 = 2,
    Float64 = 3,
    String = 4
}
/**
 * Get the byte size for a column type
 */
export declare function getColumnTypeSize(type: ColumnType): number;
/**
 * Create a typed array view for a column type
 */
export declare function createTypedArrayView(module: DatabonkModule, ptr: number, length: number, type: ColumnType): ColumnView<NumericTypedArray>;
/**
 * Copy data from a TypedArray into WASM memory
 */
export declare function copyToWasm(module: DatabonkModule, data: TypedArray, ptr: number): void;
/**
 * Allocate and copy a TypedArray into WASM memory
 */
export declare function allocateAndCopy(module: DatabonkModule, data: TypedArray): number;
/**
 * Create a SharedArrayBuffer-backed TypedArray for cross-thread sharing
 * Only works if the WASM module was loaded with shared memory
 */
export declare function createSharedView<T extends TypedArray>(module: DatabonkModule, ptr: number, length: number, TypedArrayConstructor: new (buffer: ArrayBufferLike, byteOffset: number, length: number) => T): T | null;
export {};
//# sourceMappingURL=shared-memory.d.ts.map