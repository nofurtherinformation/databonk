/**
 * WASM Module Loader with SharedArrayBuffer support
 */
/** WASM module exports type */
export interface DatabonkWasm {
    memory: WebAssembly.Memory;
    allocateBuffer(byteLength: number): number;
    freeBuffer(ptr: number): void;
    createDataFrame(rowCount: number, columnNames: number, // pointer to string array
    columnTypes: number, // pointer to i32 array
    dataPtrs: number): number;
    createEmptyDataFrameWithRows(rowCount: number): number;
    addInt32ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;
    addFloat32ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;
    addFloat64ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;
    addInt64ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;
    simdSumF32(ptr: number, length: number): number;
    simdSumF64(ptr: number, length: number): number;
    simdMinF32(ptr: number, length: number): number;
    simdMinF64(ptr: number, length: number): number;
    simdMaxF32(ptr: number, length: number): number;
    simdMaxF64(ptr: number, length: number): number;
    getRowCount(df: number): number;
    getColumnCount(df: number): number;
    getColumnPtr(df: number, columnName: number): number;
    getColumnLength(df: number, columnName: number): number;
    getColumnType(df: number, columnName: number): number;
    hasColumn(df: number, columnName: number): boolean;
    freeDataFrame(df: number): void;
    dfSum(df: number, columnName: number): number;
    dfMean(df: number, columnName: number): number;
    dfMin(df: number, columnName: number): number;
    dfMax(df: number, columnName: number): number;
    dfCount(df: number, columnName: number): number;
    dfAdd(df: number, colA: number, colB: number, resultName: number): void;
    dfSub(df: number, colA: number, colB: number, resultName: number): void;
    dfScalarMul(df: number, colName: number, scalar: number, resultName: number): void;
    groupBySum(df: number, keyColumn: number, valueColumns: number, maxKey: number): number;
    groupByMeanAgg(df: number, keyColumn: number, valueColumns: number, maxKey: number): number;
    innerJoin(left: number, right: number, leftKey: number, rightKey: number): number;
    __new(size: number, id: number): number;
    __pin(ptr: number): number;
    __unpin(ptr: number): void;
    __collect(): void;
}
/** Loader options */
export interface LoaderOptions {
    /** Path to WASM file (default: build/release.wasm) */
    wasmPath?: string;
    /** Initial memory pages (64KB each, default: 256 = 16MB) */
    initialMemory?: number;
    /** Maximum memory pages (default: 16384 = 1GB) */
    maximumMemory?: number;
    /** Use shared memory for SharedArrayBuffer support */
    sharedMemory?: boolean;
}
/** Module instance with memory access helpers */
export interface DatabonkModule {
    /** WASM exports */
    exports: DatabonkWasm;
    /** Memory buffer (may be SharedArrayBuffer) */
    memory: WebAssembly.Memory;
    /** Check if using shared memory */
    isSharedMemory: boolean;
    /** Get Int32Array view into WASM memory */
    getInt32View(ptr: number, length: number): Int32Array;
    /** Get Float32Array view into WASM memory */
    getFloat32View(ptr: number, length: number): Float32Array;
    /** Get Float64Array view into WASM memory */
    getFloat64View(ptr: number, length: number): Float64Array;
    /** Get Uint8Array view into WASM memory */
    getUint8View(ptr: number, length: number): Uint8Array;
    /** Allocate string in WASM memory */
    allocString(str: string): number;
    /** Free WASM memory */
    freePtr(ptr: number): void;
}
/**
 * Load the Databonk WASM module
 */
export declare function loadDatabonk(options?: LoaderOptions): Promise<DatabonkModule>;
/**
 * Check if SharedArrayBuffer is available
 */
export declare function isSharedArrayBufferSupported(): boolean;
//# sourceMappingURL=loader.d.ts.map