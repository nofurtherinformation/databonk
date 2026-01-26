/**
 * Databonk - AssemblyScript DataFrame Library
 * Main exports for WASM module
 */

// Import for internal use
import { DataFrame as DataFrameClass, createEmptyDataFrame as createEmptyDF } from './dataframe/dataframe';
import { buildDataFrameFromArrays as buildDF } from './dataframe/builder';
import { groupBySumF32 as gbSumF32, groupByMean as gbMean } from './ops/groupby';
import { innerJoinI32 as ijI32 } from './ops/join';
import { NumericColumn, DataType } from './core/numeric-column';

// Re-export core types
export { ValidityBitmap } from './core/validity-bitmap';
export { NumericColumn, DataType, createInt32Column, createInt64Column, createFloat32Column, createFloat64Column } from './core/numeric-column';
export { StringColumn } from './core/string-column';
export { Schema, Field, ColumnType, isNumericType, getColumnTypeSize, columnTypeToDataType } from './core/schema';

// Re-export DataFrame
export { DataFrame, createEmptyDataFrame } from './dataframe/dataframe';
export { DataFrameBuilder, createDataFrameBuilder, buildDataFrameFromArrays } from './dataframe/builder';

// Re-export operations
export {
  columnSum, columnMean, columnMin, columnMax, columnCount, columnVariance, columnStdDev,
  dfSum, dfMean, dfMin, dfMax, dfCount, dfVariance, dfStdDev
} from './ops/aggregations';
export { columnAdd, columnSub, columnMul, columnDiv, columnScalarMul, columnScalarAdd, dfAdd, dfSub, dfScalarMul } from './ops/arithmetic';
export { GroupByResult, groupByIntegerKey, groupBySumF32, groupByMean, groupByMin, groupByMax, groupByCount } from './ops/groupby';
export { innerJoinI32, leftJoinI32, rightJoinI32 } from './ops/join';

// Re-export SIMD operations (for advanced users)
export { simdSumF32, simdSumF64, simdMinF32, simdMinF64, simdMaxF32, simdMaxF64 } from './simd/simd-aggregations';
export { simdAddF32, simdSubF32, simdMulF32, simdDivF32, simdScalarMulF32 } from './simd/simd-arithmetic';
export { simdAddF64, simdSubF64, simdMulF64, simdDivF64, simdScalarMulF64 } from './simd/simd-arithmetic';

// Re-export memory utilities
export { allocAligned, freeAligned, reallocAligned, zeroMemory, copyMemory, getMemoryPages, growMemory, SIMD_ALIGNMENT } from './memory/allocator';
export { getMemoryBase, getMemorySize, BufferView, createInt32View, createFloat32View, createFloat64View, createUint8View, atomicLoadI32, atomicStoreI32, atomicAddI32, memoryFence } from './memory/shared';

// =============================================================================
// High-level API functions exported for JavaScript
// =============================================================================

/**
 * Create a DataFrame from column data pointers
 * This is the main entry point for JavaScript
 */
export function createDataFrame(
  rowCount: i32,
  columnNames: string[],
  columnTypes: i32[],
  dataPtrs: usize[]
): DataFrameClass {
  return buildDF(rowCount, columnNames, columnTypes, dataPtrs);
}

/**
 * Get column data pointer from DataFrame
 */
export function getColumnPtr(df: DataFrameClass, columnName: string): usize {
  return df.getColumnDataPtr(columnName);
}

/**
 * Get column length from DataFrame
 */
export function getColumnLength(df: DataFrameClass, columnName: string): i32 {
  const col = df.getNumericColumn(columnName);
  return col !== null ? col!.length : 0;
}

/**
 * Get row count from DataFrame
 */
export function getRowCount(df: DataFrameClass): i32 {
  return df.rowCount;
}

/**
 * Get column count from DataFrame
 */
export function getColumnCount(df: DataFrameClass): i32 {
  return df.columnCount;
}

/**
 * Perform inner join on two DataFrames
 */
export function innerJoin(
  left: DataFrameClass,
  right: DataFrameClass,
  leftKey: string,
  rightKey: string
): DataFrameClass {
  return ijI32(left, right, leftKey, rightKey);
}

/**
 * Perform groupBy sum aggregation
 */
export function groupBySum(
  df: DataFrameClass,
  keyColumn: string,
  valueColumns: string[],
  maxKey: i32 = 256
): DataFrameClass {
  const result = gbSumF32(df, keyColumn, valueColumns, maxKey);
  return result.toDataFrame(keyColumn);
}

/**
 * Perform groupBy mean aggregation
 */
export function groupByMeanAgg(
  df: DataFrameClass,
  keyColumn: string,
  valueColumns: string[],
  maxKey: i32 = 256
): DataFrameClass {
  const result = gbMean(df, keyColumn, valueColumns, maxKey);
  return result.toDataFrame(keyColumn);
}

/**
 * Allocate memory and return pointer
 * Used by JS to get a buffer for writing data
 */
export function allocateBuffer(byteLength: i32): usize {
  return heap.alloc(byteLength);
}

/**
 * Free allocated memory
 */
export function freeBuffer(ptr: usize): void {
  heap.free(ptr);
}

/**
 * Free a DataFrame and its resources
 */
export function freeDataFrame(df: DataFrameClass): void {
  df.free();
}

/**
 * Get the column type
 */
export function getColumnType(df: DataFrameClass, columnName: string): i32 {
  return <i32>df.getColumnType(columnName);
}

/**
 * Check if column exists
 */
export function hasColumn(df: DataFrameClass, columnName: string): bool {
  return df.hasColumn(columnName);
}

// =============================================================================
// Simpler DataFrame building API for JavaScript
// These functions avoid passing arrays which is complex with AssemblyScript
// =============================================================================

/**
 * Create an empty DataFrame with a specified row count
 * Use this followed by addColumnToDataFrame calls
 */
export function createEmptyDataFrameWithRows(rowCount: i32): DataFrameClass {
  return createEmptyDF(rowCount);
}

/**
 * Add an Int32 column to a DataFrame
 * @param df DataFrame pointer
 * @param name Column name
 * @param dataPtr Pointer to Int32 data
 * @param length Number of elements
 */
export function addInt32ColumnToDataFrame(
  df: DataFrameClass,
  name: string,
  dataPtr: usize,
  length: i32
): void {
  const col = new NumericColumn(length, DataType.Int32);
  col.copyFromBuffer(dataPtr, length);
  df.addInt32Column(name, col);
}

/**
 * Add a Float32 column to a DataFrame
 * @param df DataFrame pointer
 * @param name Column name
 * @param dataPtr Pointer to Float32 data
 * @param length Number of elements
 */
export function addFloat32ColumnToDataFrame(
  df: DataFrameClass,
  name: string,
  dataPtr: usize,
  length: i32
): void {
  const col = new NumericColumn(length, DataType.Float32);
  col.copyFromBuffer(dataPtr, length);
  df.addFloat32Column(name, col);
}

/**
 * Add a Float64 column to a DataFrame
 * @param df DataFrame pointer
 * @param name Column name
 * @param dataPtr Pointer to Float64 data
 * @param length Number of elements
 */
export function addFloat64ColumnToDataFrame(
  df: DataFrameClass,
  name: string,
  dataPtr: usize,
  length: i32
): void {
  const col = new NumericColumn(length, DataType.Float64);
  col.copyFromBuffer(dataPtr, length);
  df.addFloat64Column(name, col);
}

/**
 * Add an Int64 column to a DataFrame
 * @param df DataFrame pointer
 * @param name Column name
 * @param dataPtr Pointer to Int64 data
 * @param length Number of elements
 */
export function addInt64ColumnToDataFrame(
  df: DataFrameClass,
  name: string,
  dataPtr: usize,
  length: i32
): void {
  const col = new NumericColumn(length, DataType.Int64);
  col.copyFromBuffer(dataPtr, length);
  df.addInt64Column(name, col);
}
