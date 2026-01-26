/**
 * Aggregation operations for columns and DataFrames
 */

import { NumericColumn, DataType } from '../core/numeric-column';
import { DataFrame } from '../dataframe/dataframe';
import { ColumnType } from '../core/schema';
import {
  simdSumF32,
  simdSumF64,
  simdSumI32,
  simdMinF32,
  simdMinF64,
  simdMinI32,
  simdMaxF32,
  simdMaxF64,
  simdMaxI32,
} from '../simd/simd-aggregations';

// =============================================================================
// Column-level aggregations
// =============================================================================

/**
 * Sum a numeric column (returns f64 for precision)
 */
export function columnSum(column: NumericColumn): f64 {
  const ptr = column.dataPtr;
  const len = column.length;

  switch (column.dtype) {
    case DataType.Float32:
      return <f64>simdSumF32(ptr, len);
    case DataType.Float64:
      return simdSumF64(ptr, len);
    case DataType.Int32:
      return <f64>simdSumI32(ptr, len);
    case DataType.Int64:
      // Fall back to scalar for i64
      let sum64: i64 = 0;
      for (let i: i32 = 0; i < len; i++) {
        sum64 += column.getI64(i);
      }
      return <f64>sum64;
    default:
      return 0;
  }
}

/**
 * Mean of a numeric column
 */
export function columnMean(column: NumericColumn): f64 {
  if (column.length === 0) return 0;
  return columnSum(column) / <f64>column.length;
}

/**
 * Minimum of a numeric column
 */
export function columnMin(column: NumericColumn): f64 {
  const ptr = column.dataPtr;
  const len = column.length;

  switch (column.dtype) {
    case DataType.Float32:
      return <f64>simdMinF32(ptr, len);
    case DataType.Float64:
      return simdMinF64(ptr, len);
    case DataType.Int32:
      return <f64>simdMinI32(ptr, len);
    case DataType.Int64:
      let min64: i64 = i64.MAX_VALUE;
      for (let i: i32 = 0; i < len; i++) {
        const val = column.getI64(i);
        if (val < min64) min64 = val;
      }
      return <f64>min64;
    default:
      return Infinity;
  }
}

/**
 * Maximum of a numeric column
 */
export function columnMax(column: NumericColumn): f64 {
  const ptr = column.dataPtr;
  const len = column.length;

  switch (column.dtype) {
    case DataType.Float32:
      return <f64>simdMaxF32(ptr, len);
    case DataType.Float64:
      return simdMaxF64(ptr, len);
    case DataType.Int32:
      return <f64>simdMaxI32(ptr, len);
    case DataType.Int64:
      let max64: i64 = i64.MIN_VALUE;
      for (let i: i32 = 0; i < len; i++) {
        const val = column.getI64(i);
        if (val > max64) max64 = val;
      }
      return <f64>max64;
    default:
      return -Infinity;
  }
}

/**
 * Count non-null values in a column
 */
export function columnCount(column: NumericColumn): i32 {
  return column.validity.countValid();
}

/**
 * Variance of a numeric column (sample variance)
 */
export function columnVariance(column: NumericColumn): f64 {
  const len = column.length;
  if (len < 2) return 0;

  const mean = columnMean(column);
  let sumSq: f64 = 0;

  const ptr = column.dataPtr;

  switch (column.dtype) {
    case DataType.Float32:
      for (let i: i32 = 0; i < len; i++) {
        const diff = <f64>load<f32>(ptr + (i << 2)) - mean;
        sumSq += diff * diff;
      }
      break;
    case DataType.Float64:
      for (let i: i32 = 0; i < len; i++) {
        const diff = load<f64>(ptr + (i << 3)) - mean;
        sumSq += diff * diff;
      }
      break;
    case DataType.Int32:
      for (let i: i32 = 0; i < len; i++) {
        const diff = <f64>load<i32>(ptr + (i << 2)) - mean;
        sumSq += diff * diff;
      }
      break;
    case DataType.Int64:
      for (let i: i32 = 0; i < len; i++) {
        const diff = <f64>column.getI64(i) - mean;
        sumSq += diff * diff;
      }
      break;
  }

  return sumSq / <f64>(len - 1);
}

/**
 * Standard deviation of a numeric column
 */
export function columnStdDev(column: NumericColumn): f64 {
  return Math.sqrt(columnVariance(column));
}

// =============================================================================
// DataFrame-level aggregations
// =============================================================================

/**
 * Sum a column in a DataFrame by name
 */
export function dfSum(df: DataFrame, columnName: string): f64 {
  const col = df.getNumericColumn(columnName);
  if (col === null) return 0;
  return columnSum(col!);
}

/**
 * Mean of a column in a DataFrame by name
 */
export function dfMean(df: DataFrame, columnName: string): f64 {
  const col = df.getNumericColumn(columnName);
  if (col === null) return 0;
  return columnMean(col!);
}

/**
 * Min of a column in a DataFrame by name
 */
export function dfMin(df: DataFrame, columnName: string): f64 {
  const col = df.getNumericColumn(columnName);
  if (col === null) return Infinity;
  return columnMin(col!);
}

/**
 * Max of a column in a DataFrame by name
 */
export function dfMax(df: DataFrame, columnName: string): f64 {
  const col = df.getNumericColumn(columnName);
  if (col === null) return -Infinity;
  return columnMax(col!);
}

/**
 * Count non-null values in a column by name
 */
export function dfCount(df: DataFrame, columnName: string): i32 {
  const col = df.getNumericColumn(columnName);
  if (col === null) return 0;
  return columnCount(col!);
}

/**
 * Variance of a column in a DataFrame by name
 */
export function dfVariance(df: DataFrame, columnName: string): f64 {
  const col = df.getNumericColumn(columnName);
  if (col === null) return 0;
  return columnVariance(col!);
}

/**
 * Standard deviation of a column in a DataFrame by name
 */
export function dfStdDev(df: DataFrame, columnName: string): f64 {
  const col = df.getNumericColumn(columnName);
  if (col === null) return 0;
  return columnStdDev(col!);
}
