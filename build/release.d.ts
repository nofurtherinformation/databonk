/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * assembly/index/createDataFrame
 * @param rowCount `i32`
 * @param columnNames `~lib/array/Array<~lib/string/String>`
 * @param columnTypes `~lib/array/Array<i32>`
 * @param dataPtrs `~lib/array/Array<usize>`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function createDataFrame(rowCount: number, columnNames: Array<string>, columnTypes: Array<number>, dataPtrs: Array<number>): __Internref7;
/**
 * assembly/index/getColumnPtr
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `usize`
 */
export declare function getColumnPtr(df: __Internref7, columnName: string): number;
/**
 * assembly/index/getColumnLength
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `i32`
 */
export declare function getColumnLength(df: __Internref7, columnName: string): number;
/**
 * assembly/index/getRowCount
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @returns `i32`
 */
export declare function getRowCount(df: __Internref7): number;
/**
 * assembly/index/getColumnCount
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @returns `i32`
 */
export declare function getColumnCount(df: __Internref7): number;
/**
 * assembly/index/innerJoin
 * @param left `assembly/dataframe/dataframe/DataFrame`
 * @param right `assembly/dataframe/dataframe/DataFrame`
 * @param leftKey `~lib/string/String`
 * @param rightKey `~lib/string/String`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function innerJoin(left: __Internref7, right: __Internref7, leftKey: string, rightKey: string): __Internref7;
/**
 * assembly/index/groupBySum
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumn `~lib/string/String`
 * @param valueColumns `~lib/array/Array<~lib/string/String>`
 * @param maxKey `i32`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function groupBySum(df: __Internref7, keyColumn: string, valueColumns: Array<string>, maxKey?: number): __Internref7;
/**
 * assembly/index/groupByMeanAgg
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumn `~lib/string/String`
 * @param valueColumns `~lib/array/Array<~lib/string/String>`
 * @param maxKey `i32`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function groupByMeanAgg(df: __Internref7, keyColumn: string, valueColumns: Array<string>, maxKey?: number): __Internref7;
/**
 * assembly/index/allocateBuffer
 * @param byteLength `i32`
 * @returns `usize`
 */
export declare function allocateBuffer(byteLength: number): number;
/**
 * assembly/index/freeBuffer
 * @param ptr `usize`
 */
export declare function freeBuffer(ptr: number): void;
/**
 * assembly/index/freeDataFrame
 * @param df `assembly/dataframe/dataframe/DataFrame`
 */
export declare function freeDataFrame(df: __Internref7): void;
/**
 * assembly/index/getColumnType
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `i32`
 */
export declare function getColumnType(df: __Internref7, columnName: string): number;
/**
 * assembly/index/hasColumn
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `bool`
 */
export declare function hasColumn(df: __Internref7, columnName: string): boolean;
/**
 * assembly/index/createEmptyDataFrameWithRows
 * @param rowCount `i32`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function createEmptyDataFrameWithRows(rowCount: number): __Internref7;
/**
 * assembly/index/addInt32ColumnToDataFrame
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param name `~lib/string/String`
 * @param dataPtr `usize`
 * @param length `i32`
 */
export declare function addInt32ColumnToDataFrame(df: __Internref7, name: string, dataPtr: number, length: number): void;
/**
 * assembly/index/addFloat32ColumnToDataFrame
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param name `~lib/string/String`
 * @param dataPtr `usize`
 * @param length `i32`
 */
export declare function addFloat32ColumnToDataFrame(df: __Internref7, name: string, dataPtr: number, length: number): void;
/**
 * assembly/index/addFloat64ColumnToDataFrame
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param name `~lib/string/String`
 * @param dataPtr `usize`
 * @param length `i32`
 */
export declare function addFloat64ColumnToDataFrame(df: __Internref7, name: string, dataPtr: number, length: number): void;
/**
 * assembly/index/addInt64ColumnToDataFrame
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param name `~lib/string/String`
 * @param dataPtr `usize`
 * @param length `i32`
 */
export declare function addInt64ColumnToDataFrame(df: __Internref7, name: string, dataPtr: number, length: number): void;
/** assembly/core/numeric-column/DataType */
export declare enum DataType {
  /** @type `i32` */
  Int32,
  /** @type `i32` */
  Int64,
  /** @type `i32` */
  Float32,
  /** @type `i32` */
  Float64,
}
/**
 * assembly/core/numeric-column/createInt32Column
 * @param length `i32`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function createInt32Column(length: number): __Internref9;
/**
 * assembly/core/numeric-column/createInt64Column
 * @param length `i32`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function createInt64Column(length: number): __Internref9;
/**
 * assembly/core/numeric-column/createFloat32Column
 * @param length `i32`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function createFloat32Column(length: number): __Internref9;
/**
 * assembly/core/numeric-column/createFloat64Column
 * @param length `i32`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function createFloat64Column(length: number): __Internref9;
/** assembly/core/schema/ColumnType */
export declare enum ColumnType {
  /** @type `i32` */
  Int32,
  /** @type `i32` */
  Int64,
  /** @type `i32` */
  Float32,
  /** @type `i32` */
  Float64,
  /** @type `i32` */
  String,
}
/**
 * assembly/core/schema/isNumericType
 * @param colType `i32`
 * @returns `bool`
 */
export declare function isNumericType(colType: number): boolean;
/**
 * assembly/core/schema/getColumnTypeSize
 * @param colType `i32`
 * @returns `i32`
 */
export declare function getColumnTypeSize(colType: number): number;
/**
 * assembly/core/schema/columnTypeToDataType
 * @param colType `i32`
 * @returns `i32`
 */
export declare function columnTypeToDataType(colType: number): number;
/**
 * assembly/dataframe/dataframe/createEmptyDataFrame
 * @param rowCount `i32`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function createEmptyDataFrame(rowCount: number): __Internref7;
/**
 * assembly/dataframe/builder/createDataFrameBuilder
 * @param rowCount `i32`
 * @returns `assembly/dataframe/builder/DataFrameBuilder`
 */
export declare function createDataFrameBuilder(rowCount: number): __Internref17;
/**
 * assembly/dataframe/builder/buildDataFrameFromArrays
 * @param rowCount `i32`
 * @param columnNames `~lib/array/Array<~lib/string/String>`
 * @param columnTypes `~lib/array/Array<i32>`
 * @param dataPtrs `~lib/array/Array<usize>`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function buildDataFrameFromArrays(rowCount: number, columnNames: Array<string>, columnTypes: Array<number>, dataPtrs: Array<number>): __Internref7;
/**
 * assembly/ops/aggregations/columnSum
 * @param column `assembly/core/numeric-column/NumericColumn`
 * @returns `f64`
 */
export declare function columnSum(column: __Internref9): number;
/**
 * assembly/ops/aggregations/columnMean
 * @param column `assembly/core/numeric-column/NumericColumn`
 * @returns `f64`
 */
export declare function columnMean(column: __Internref9): number;
/**
 * assembly/ops/aggregations/columnMin
 * @param column `assembly/core/numeric-column/NumericColumn`
 * @returns `f64`
 */
export declare function columnMin(column: __Internref9): number;
/**
 * assembly/ops/aggregations/columnMax
 * @param column `assembly/core/numeric-column/NumericColumn`
 * @returns `f64`
 */
export declare function columnMax(column: __Internref9): number;
/**
 * assembly/ops/aggregations/columnCount
 * @param column `assembly/core/numeric-column/NumericColumn`
 * @returns `i32`
 */
export declare function columnCount(column: __Internref9): number;
/**
 * assembly/ops/aggregations/columnVariance
 * @param column `assembly/core/numeric-column/NumericColumn`
 * @returns `f64`
 */
export declare function columnVariance(column: __Internref9): number;
/**
 * assembly/ops/aggregations/columnStdDev
 * @param column `assembly/core/numeric-column/NumericColumn`
 * @returns `f64`
 */
export declare function columnStdDev(column: __Internref9): number;
/**
 * assembly/ops/aggregations/dfSum
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `f64`
 */
export declare function dfSum(df: __Internref7, columnName: string): number;
/**
 * assembly/ops/aggregations/dfMean
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `f64`
 */
export declare function dfMean(df: __Internref7, columnName: string): number;
/**
 * assembly/ops/aggregations/dfMin
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `f64`
 */
export declare function dfMin(df: __Internref7, columnName: string): number;
/**
 * assembly/ops/aggregations/dfMax
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `f64`
 */
export declare function dfMax(df: __Internref7, columnName: string): number;
/**
 * assembly/ops/aggregations/dfCount
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `i32`
 */
export declare function dfCount(df: __Internref7, columnName: string): number;
/**
 * assembly/ops/aggregations/dfVariance
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `f64`
 */
export declare function dfVariance(df: __Internref7, columnName: string): number;
/**
 * assembly/ops/aggregations/dfStdDev
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param columnName `~lib/string/String`
 * @returns `f64`
 */
export declare function dfStdDev(df: __Internref7, columnName: string): number;
/**
 * assembly/ops/arithmetic/columnAdd
 * @param a `assembly/core/numeric-column/NumericColumn`
 * @param b `assembly/core/numeric-column/NumericColumn`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function columnAdd(a: __Internref9, b: __Internref9): __Internref9;
/**
 * assembly/ops/arithmetic/columnSub
 * @param a `assembly/core/numeric-column/NumericColumn`
 * @param b `assembly/core/numeric-column/NumericColumn`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function columnSub(a: __Internref9, b: __Internref9): __Internref9;
/**
 * assembly/ops/arithmetic/columnMul
 * @param a `assembly/core/numeric-column/NumericColumn`
 * @param b `assembly/core/numeric-column/NumericColumn`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function columnMul(a: __Internref9, b: __Internref9): __Internref9;
/**
 * assembly/ops/arithmetic/columnDiv
 * @param a `assembly/core/numeric-column/NumericColumn`
 * @param b `assembly/core/numeric-column/NumericColumn`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function columnDiv(a: __Internref9, b: __Internref9): __Internref9;
/**
 * assembly/ops/arithmetic/columnScalarMul
 * @param col `assembly/core/numeric-column/NumericColumn`
 * @param scalar `f64`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function columnScalarMul(col: __Internref9, scalar: number): __Internref9;
/**
 * assembly/ops/arithmetic/columnScalarAdd
 * @param col `assembly/core/numeric-column/NumericColumn`
 * @param scalar `f64`
 * @returns `assembly/core/numeric-column/NumericColumn`
 */
export declare function columnScalarAdd(col: __Internref9, scalar: number): __Internref9;
/**
 * assembly/ops/arithmetic/dfAdd
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param colA `~lib/string/String`
 * @param colB `~lib/string/String`
 * @param resultName `~lib/string/String`
 */
export declare function dfAdd(df: __Internref7, colA: string, colB: string, resultName: string): void;
/**
 * assembly/ops/arithmetic/dfSub
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param colA `~lib/string/String`
 * @param colB `~lib/string/String`
 * @param resultName `~lib/string/String`
 */
export declare function dfSub(df: __Internref7, colA: string, colB: string, resultName: string): void;
/**
 * assembly/ops/arithmetic/dfScalarMul
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param colName `~lib/string/String`
 * @param scalar `f64`
 * @param resultName `~lib/string/String`
 */
export declare function dfScalarMul(df: __Internref7, colName: string, scalar: number, resultName: string): void;
/**
 * assembly/ops/groupby/groupByIntegerKey
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumnName `~lib/string/String`
 * @param maxKey `i32`
 * @returns `assembly/ops/groupby/GroupByResult`
 */
export declare function groupByIntegerKey(df: __Internref7, keyColumnName: string, maxKey?: number): __Internref21;
/**
 * assembly/ops/groupby/groupBySumF32
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumnName `~lib/string/String`
 * @param valueColumnNames `~lib/array/Array<~lib/string/String>`
 * @param maxKey `i32`
 * @returns `assembly/ops/groupby/GroupByResult`
 */
export declare function groupBySumF32(df: __Internref7, keyColumnName: string, valueColumnNames: Array<string>, maxKey?: number): __Internref21;
/**
 * assembly/ops/groupby/groupByMean
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumnName `~lib/string/String`
 * @param valueColumnNames `~lib/array/Array<~lib/string/String>`
 * @param maxKey `i32`
 * @returns `assembly/ops/groupby/GroupByResult`
 */
export declare function groupByMean(df: __Internref7, keyColumnName: string, valueColumnNames: Array<string>, maxKey?: number): __Internref21;
/**
 * assembly/ops/groupby/groupByMin
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumnName `~lib/string/String`
 * @param valueColumnNames `~lib/array/Array<~lib/string/String>`
 * @param maxKey `i32`
 * @returns `assembly/ops/groupby/GroupByResult`
 */
export declare function groupByMin(df: __Internref7, keyColumnName: string, valueColumnNames: Array<string>, maxKey?: number): __Internref21;
/**
 * assembly/ops/groupby/groupByMax
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumnName `~lib/string/String`
 * @param valueColumnNames `~lib/array/Array<~lib/string/String>`
 * @param maxKey `i32`
 * @returns `assembly/ops/groupby/GroupByResult`
 */
export declare function groupByMax(df: __Internref7, keyColumnName: string, valueColumnNames: Array<string>, maxKey?: number): __Internref21;
/**
 * assembly/ops/groupby/groupByCount
 * @param df `assembly/dataframe/dataframe/DataFrame`
 * @param keyColumnName `~lib/string/String`
 * @param maxKey `i32`
 * @returns `assembly/ops/groupby/GroupByResult`
 */
export declare function groupByCount(df: __Internref7, keyColumnName: string, maxKey?: number): __Internref21;
/**
 * assembly/ops/join/innerJoinI32
 * @param left `assembly/dataframe/dataframe/DataFrame`
 * @param right `assembly/dataframe/dataframe/DataFrame`
 * @param leftKeyColumn `~lib/string/String`
 * @param rightKeyColumn `~lib/string/String`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function innerJoinI32(left: __Internref7, right: __Internref7, leftKeyColumn: string, rightKeyColumn: string): __Internref7;
/**
 * assembly/ops/join/leftJoinI32
 * @param left `assembly/dataframe/dataframe/DataFrame`
 * @param right `assembly/dataframe/dataframe/DataFrame`
 * @param leftKeyColumn `~lib/string/String`
 * @param rightKeyColumn `~lib/string/String`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function leftJoinI32(left: __Internref7, right: __Internref7, leftKeyColumn: string, rightKeyColumn: string): __Internref7;
/**
 * assembly/ops/join/rightJoinI32
 * @param left `assembly/dataframe/dataframe/DataFrame`
 * @param right `assembly/dataframe/dataframe/DataFrame`
 * @param leftKeyColumn `~lib/string/String`
 * @param rightKeyColumn `~lib/string/String`
 * @returns `assembly/dataframe/dataframe/DataFrame`
 */
export declare function rightJoinI32(left: __Internref7, right: __Internref7, leftKeyColumn: string, rightKeyColumn: string): __Internref7;
/**
 * assembly/simd/simd-aggregations/simdSumF32
 * @param ptr `usize`
 * @param length `i32`
 * @returns `f32`
 */
export declare function simdSumF32(ptr: number, length: number): number;
/**
 * assembly/simd/simd-aggregations/simdSumF64
 * @param ptr `usize`
 * @param length `i32`
 * @returns `f64`
 */
export declare function simdSumF64(ptr: number, length: number): number;
/**
 * assembly/simd/simd-aggregations/simdMinF32
 * @param ptr `usize`
 * @param length `i32`
 * @returns `f32`
 */
export declare function simdMinF32(ptr: number, length: number): number;
/**
 * assembly/simd/simd-aggregations/simdMinF64
 * @param ptr `usize`
 * @param length `i32`
 * @returns `f64`
 */
export declare function simdMinF64(ptr: number, length: number): number;
/**
 * assembly/simd/simd-aggregations/simdMaxF32
 * @param ptr `usize`
 * @param length `i32`
 * @returns `f32`
 */
export declare function simdMaxF32(ptr: number, length: number): number;
/**
 * assembly/simd/simd-aggregations/simdMaxF64
 * @param ptr `usize`
 * @param length `i32`
 * @returns `f64`
 */
export declare function simdMaxF64(ptr: number, length: number): number;
/**
 * assembly/simd/simd-arithmetic/simdAddF32
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdAddF32(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdSubF32
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdSubF32(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdMulF32
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdMulF32(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdDivF32
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdDivF32(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdScalarMulF32
 * @param srcPtr `usize`
 * @param scalar `f32`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdScalarMulF32(srcPtr: number, scalar: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdAddF64
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdAddF64(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdSubF64
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdSubF64(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdMulF64
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdMulF64(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdDivF64
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdDivF64(aPtr: number, bPtr: number, dstPtr: number, length: number): void;
/**
 * assembly/simd/simd-arithmetic/simdScalarMulF64
 * @param srcPtr `usize`
 * @param scalar `f64`
 * @param dstPtr `usize`
 * @param length `i32`
 */
export declare function simdScalarMulF64(srcPtr: number, scalar: number, dstPtr: number, length: number): void;
/**
 * assembly/memory/allocator/allocAligned
 * @param size `usize`
 * @param alignment `usize`
 * @returns `usize`
 */
export declare function allocAligned(size: number, alignment?: number): number;
/**
 * assembly/memory/allocator/freeAligned
 * @param ptr `usize`
 */
export declare function freeAligned(ptr: number): void;
/**
 * assembly/memory/allocator/reallocAligned
 * @param ptr `usize`
 * @param oldSize `usize`
 * @param newSize `usize`
 * @param alignment `usize`
 * @returns `usize`
 */
export declare function reallocAligned(ptr: number, oldSize: number, newSize: number, alignment?: number): number;
/**
 * assembly/memory/allocator/zeroMemory
 * @param ptr `usize`
 * @param size `usize`
 */
export declare function zeroMemory(ptr: number, size: number): void;
/**
 * assembly/memory/allocator/copyMemory
 * @param dest `usize`
 * @param src `usize`
 * @param size `usize`
 */
export declare function copyMemory(dest: number, src: number, size: number): void;
/**
 * assembly/memory/allocator/getMemoryPages
 * @returns `i32`
 */
export declare function getMemoryPages(): number;
/**
 * assembly/memory/allocator/growMemory
 * @param pages `i32`
 * @returns `i32`
 */
export declare function growMemory(pages: number): number;
/** assembly/memory/allocator/SIMD_ALIGNMENT */
export declare const SIMD_ALIGNMENT: {
  /** @type `usize` */
  get value(): number
};
/**
 * assembly/memory/shared/getMemoryBase
 * @returns `usize`
 */
export declare function getMemoryBase(): number;
/**
 * assembly/memory/shared/getMemorySize
 * @returns `usize`
 */
export declare function getMemorySize(): number;
/**
 * assembly/memory/shared/createInt32View
 * @param ptr `usize`
 * @param length `i32`
 * @returns `assembly/memory/shared/BufferView`
 */
export declare function createInt32View(ptr: number, length: number): __Internref27;
/**
 * assembly/memory/shared/createFloat32View
 * @param ptr `usize`
 * @param length `i32`
 * @returns `assembly/memory/shared/BufferView`
 */
export declare function createFloat32View(ptr: number, length: number): __Internref27;
/**
 * assembly/memory/shared/createFloat64View
 * @param ptr `usize`
 * @param length `i32`
 * @returns `assembly/memory/shared/BufferView`
 */
export declare function createFloat64View(ptr: number, length: number): __Internref27;
/**
 * assembly/memory/shared/createUint8View
 * @param ptr `usize`
 * @param length `i32`
 * @returns `assembly/memory/shared/BufferView`
 */
export declare function createUint8View(ptr: number, length: number): __Internref27;
/**
 * assembly/memory/shared/atomicLoadI32
 * @param ptr `usize`
 * @returns `i32`
 */
export declare function atomicLoadI32(ptr: number): number;
/**
 * assembly/memory/shared/atomicStoreI32
 * @param ptr `usize`
 * @param value `i32`
 */
export declare function atomicStoreI32(ptr: number, value: number): void;
/**
 * assembly/memory/shared/atomicAddI32
 * @param ptr `usize`
 * @param value `i32`
 * @returns `i32`
 */
export declare function atomicAddI32(ptr: number, value: number): number;
/**
 * assembly/memory/shared/memoryFence
 */
export declare function memoryFence(): void;
/** assembly/dataframe/dataframe/DataFrame */
declare class __Internref7 extends Number {
  private __nominal7: symbol;
  private __nominal0: symbol;
}
/** assembly/core/numeric-column/NumericColumn */
declare class __Internref9 extends Number {
  private __nominal9: symbol;
  private __nominal0: symbol;
}
/** assembly/dataframe/builder/DataFrameBuilder */
declare class __Internref17 extends Number {
  private __nominal17: symbol;
  private __nominal0: symbol;
}
/** assembly/ops/groupby/GroupByResult */
declare class __Internref21 extends Number {
  private __nominal21: symbol;
  private __nominal0: symbol;
}
/** assembly/memory/shared/BufferView */
declare class __Internref27 extends Number {
  private __nominal27: symbol;
  private __nominal0: symbol;
}
