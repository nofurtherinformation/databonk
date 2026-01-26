/**
 * Column arithmetic operations
 */

import { DataFrame } from '../dataframe/dataframe';
import { NumericColumn, DataType } from '../core/numeric-column';
import {
  simdAddF32,
  simdSubF32,
  simdMulF32,
  simdDivF32,
  simdScalarMulF32,
  simdScalarAddF32,
  simdAddF64,
  simdSubF64,
  simdMulF64,
  simdDivF64,
  simdScalarMulF64,
  simdScalarAddF64,
  simdAddI32,
  simdSubI32,
  simdMulI32,
  simdScalarMulI32,
} from '../simd/simd-arithmetic';

// =============================================================================
// Column-to-column operations
// =============================================================================

/**
 * Add two columns, returning a new column
 */
export function columnAdd(a: NumericColumn, b: NumericColumn): NumericColumn {
  if (a.length !== b.length) {
    throw new Error('Column length mismatch');
  }

  const len = a.length;
  const dtype = a.dtype; // Use same dtype as first column
  const result = new NumericColumn(len, dtype);

  const aPtr = a.dataPtr;
  const bPtr = b.dataPtr;
  const dstPtr = result.dataPtr;

  switch (dtype) {
    case DataType.Float32:
      simdAddF32(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Float64:
      simdAddF64(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Int32:
      simdAddI32(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Int64:
      for (let i: i32 = 0; i < len; i++) {
        result.setI64(i, a.getI64(i) + b.getI64(i));
      }
      break;
  }

  return result;
}

/**
 * Subtract two columns (a - b), returning a new column
 */
export function columnSub(a: NumericColumn, b: NumericColumn): NumericColumn {
  if (a.length !== b.length) {
    throw new Error('Column length mismatch');
  }

  const len = a.length;
  const dtype = a.dtype;
  const result = new NumericColumn(len, dtype);

  const aPtr = a.dataPtr;
  const bPtr = b.dataPtr;
  const dstPtr = result.dataPtr;

  switch (dtype) {
    case DataType.Float32:
      simdSubF32(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Float64:
      simdSubF64(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Int32:
      simdSubI32(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Int64:
      for (let i: i32 = 0; i < len; i++) {
        result.setI64(i, a.getI64(i) - b.getI64(i));
      }
      break;
  }

  return result;
}

/**
 * Multiply two columns element-wise, returning a new column
 */
export function columnMul(a: NumericColumn, b: NumericColumn): NumericColumn {
  if (a.length !== b.length) {
    throw new Error('Column length mismatch');
  }

  const len = a.length;
  const dtype = a.dtype;
  const result = new NumericColumn(len, dtype);

  const aPtr = a.dataPtr;
  const bPtr = b.dataPtr;
  const dstPtr = result.dataPtr;

  switch (dtype) {
    case DataType.Float32:
      simdMulF32(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Float64:
      simdMulF64(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Int32:
      simdMulI32(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Int64:
      for (let i: i32 = 0; i < len; i++) {
        result.setI64(i, a.getI64(i) * b.getI64(i));
      }
      break;
  }

  return result;
}

/**
 * Divide two columns element-wise (a / b), returning a new column
 */
export function columnDiv(a: NumericColumn, b: NumericColumn): NumericColumn {
  if (a.length !== b.length) {
    throw new Error('Column length mismatch');
  }

  const len = a.length;
  const dtype = a.dtype;
  const result = new NumericColumn(len, dtype);

  const aPtr = a.dataPtr;
  const bPtr = b.dataPtr;
  const dstPtr = result.dataPtr;

  switch (dtype) {
    case DataType.Float32:
      simdDivF32(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Float64:
      simdDivF64(aPtr, bPtr, dstPtr, len);
      break;
    case DataType.Int32:
      // Integer division (no SIMD)
      for (let i: i32 = 0; i < len; i++) {
        const bVal = load<i32>(bPtr + (i << 2));
        if (bVal !== 0) {
          store<i32>(dstPtr + (i << 2), load<i32>(aPtr + (i << 2)) / bVal);
        } else {
          store<i32>(dstPtr + (i << 2), 0);
        }
      }
      break;
    case DataType.Int64:
      for (let i: i32 = 0; i < len; i++) {
        const bVal = b.getI64(i);
        if (bVal !== 0) {
          result.setI64(i, a.getI64(i) / bVal);
        } else {
          result.setI64(i, 0);
        }
      }
      break;
  }

  return result;
}

// =============================================================================
// Scalar operations
// =============================================================================

/**
 * Multiply column by scalar, returning a new column
 */
export function columnScalarMul(col: NumericColumn, scalar: f64): NumericColumn {
  const len = col.length;
  const dtype = col.dtype;
  const result = new NumericColumn(len, dtype);

  const srcPtr = col.dataPtr;
  const dstPtr = result.dataPtr;

  switch (dtype) {
    case DataType.Float32:
      simdScalarMulF32(srcPtr, <f32>scalar, dstPtr, len);
      break;
    case DataType.Float64:
      simdScalarMulF64(srcPtr, scalar, dstPtr, len);
      break;
    case DataType.Int32:
      simdScalarMulI32(srcPtr, <i32>scalar, dstPtr, len);
      break;
    case DataType.Int64:
      const scalarI64 = <i64>scalar;
      for (let i: i32 = 0; i < len; i++) {
        result.setI64(i, col.getI64(i) * scalarI64);
      }
      break;
  }

  return result;
}

/**
 * Add scalar to column, returning a new column
 */
export function columnScalarAdd(col: NumericColumn, scalar: f64): NumericColumn {
  const len = col.length;
  const dtype = col.dtype;
  const result = new NumericColumn(len, dtype);

  const srcPtr = col.dataPtr;
  const dstPtr = result.dataPtr;

  switch (dtype) {
    case DataType.Float32:
      simdScalarAddF32(srcPtr, <f32>scalar, dstPtr, len);
      break;
    case DataType.Float64:
      simdScalarAddF64(srcPtr, scalar, dstPtr, len);
      break;
    case DataType.Int32:
      const scalarI32 = <i32>scalar;
      for (let i: i32 = 0; i < len; i++) {
        store<i32>(dstPtr + (i << 2), load<i32>(srcPtr + (i << 2)) + scalarI32);
      }
      break;
    case DataType.Int64:
      const scalarI64 = <i64>scalar;
      for (let i: i32 = 0; i < len; i++) {
        result.setI64(i, col.getI64(i) + scalarI64);
      }
      break;
  }

  return result;
}

// =============================================================================
// DataFrame-level operations
// =============================================================================

/**
 * Add two columns in a DataFrame, storing result in new column
 */
export function dfAdd(
  df: DataFrame,
  colA: string,
  colB: string,
  resultName: string
): void {
  const a = df.getNumericColumn(colA);
  const b = df.getNumericColumn(colB);
  if (a === null || b === null) {
    throw new Error('Column not found');
  }

  const result = columnAdd(a!, b!);

  switch (a!.dtype) {
    case DataType.Float32:
      df.addFloat32Column(resultName, result);
      break;
    case DataType.Float64:
      df.addFloat64Column(resultName, result);
      break;
    case DataType.Int32:
      df.addInt32Column(resultName, result);
      break;
    case DataType.Int64:
      df.addInt64Column(resultName, result);
      break;
  }
}

/**
 * Subtract columns in a DataFrame (colA - colB), storing result in new column
 */
export function dfSub(
  df: DataFrame,
  colA: string,
  colB: string,
  resultName: string
): void {
  const a = df.getNumericColumn(colA);
  const b = df.getNumericColumn(colB);
  if (a === null || b === null) {
    throw new Error('Column not found');
  }

  const result = columnSub(a!, b!);

  switch (a!.dtype) {
    case DataType.Float32:
      df.addFloat32Column(resultName, result);
      break;
    case DataType.Float64:
      df.addFloat64Column(resultName, result);
      break;
    case DataType.Int32:
      df.addInt32Column(resultName, result);
      break;
    case DataType.Int64:
      df.addInt64Column(resultName, result);
      break;
  }
}

/**
 * Multiply column by scalar in a DataFrame, storing result in new column
 */
export function dfScalarMul(
  df: DataFrame,
  colName: string,
  scalar: f64,
  resultName: string
): void {
  const col = df.getNumericColumn(colName);
  if (col === null) {
    throw new Error('Column not found');
  }

  const result = columnScalarMul(col!, scalar);

  switch (col!.dtype) {
    case DataType.Float32:
      df.addFloat32Column(resultName, result);
      break;
    case DataType.Float64:
      df.addFloat64Column(resultName, result);
      break;
    case DataType.Int32:
      df.addInt32Column(resultName, result);
      break;
    case DataType.Int64:
      df.addInt64Column(resultName, result);
      break;
  }
}
