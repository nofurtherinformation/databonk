/**
 * NumericColumn - Columnar storage for numeric types (i32, i64, f32, f64)
 * 64-byte aligned for SIMD operations
 */

import { ValidityBitmap } from './validity-bitmap';

// 64-byte alignment for SIMD
const ALIGNMENT: i32 = 64;

/** Column data types */
export const enum DataType {
  Int32 = 0,
  Int64 = 1,
  Float32 = 2,
  Float64 = 3,
}

/** Get byte size for data type */
@inline
function getTypeSize(dtype: DataType): i32 {
  switch (dtype) {
    case DataType.Int32:
    case DataType.Float32:
      return 4;
    case DataType.Int64:
    case DataType.Float64:
      return 8;
    default:
      return 4;
  }
}

@final
export class NumericColumn {
  /** Pointer to the data buffer */
  private data: usize = 0;
  /** Number of elements */
  private _length: i32 = 0;
  /** Byte size of the buffer */
  private _byteLength: i32 = 0;
  /** Data type */
  private _dtype: DataType = DataType.Float32;
  /** Validity bitmap for null handling */
  private _validity: ValidityBitmap = new ValidityBitmap(0);
  /** Whether this column owns its memory */
  private _ownsMemory: bool = true;

  constructor(length: i32, dtype: DataType) {
    this._length = length;
    this._dtype = dtype;
    this._ownsMemory = true;

    const elementSize = getTypeSize(dtype);
    const bytesNeeded = length * elementSize;
    // Align to 64 bytes
    this._byteLength = ((bytesNeeded + ALIGNMENT - 1) / ALIGNMENT) * ALIGNMENT;

    // Allocate aligned memory
    this.data = heap.alloc(this._byteLength);
    // Initialize to zero
    memory.fill(this.data, 0, this._byteLength);

    // Create validity bitmap (all valid by default)
    // Free the initial empty one and create proper one
    this._validity.free();
    this._validity = new ValidityBitmap(length);
  }

  /** Create a column from an existing pointer (for zero-copy) */
  static fromPointer(ptr: usize, length: i32, dtype: DataType): NumericColumn {
    const col = new NumericColumn(0, dtype);
    // Free the auto-allocated memory
    heap.free(col.data);

    col.data = ptr;
    col._length = length;
    col._byteLength = length * getTypeSize(dtype);
    col._ownsMemory = false;
    col._validity = new ValidityBitmap(length);
    return col;
  }

  /** Get the number of elements */
  get length(): i32 {
    return this._length;
  }

  /** Get the data type */
  get dtype(): DataType {
    return this._dtype;
  }

  /** Get the pointer to the underlying data for zero-copy access */
  get dataPtr(): usize {
    return this.data;
  }

  /** Get the byte length of the buffer */
  get byteLength(): i32 {
    return this._byteLength;
  }

  /** Get the validity bitmap */
  get validity(): ValidityBitmap {
    return this._validity;
  }

  /** Check if value at index is null */
  @inline
  isNull(index: i32): bool {
    return !this._validity.isValid(index);
  }

  /** Set value at index as null */
  @inline
  setNull(index: i32): void {
    this._validity.setNull(index);
  }

  // ============ Int32 accessors ============

  @inline
  getI32(index: i32): i32 {
    return load<i32>(this.data + (index << 2));
  }

  @inline
  setI32(index: i32, value: i32): void {
    store<i32>(this.data + (index << 2), value);
    this._validity.setValid(index);
  }

  @inline
  getI32Unchecked(index: i32): i32 {
    return load<i32>(this.data + (index << 2));
  }

  // ============ Int64 accessors ============

  @inline
  getI64(index: i32): i64 {
    return load<i64>(this.data + (index << 3));
  }

  @inline
  setI64(index: i32, value: i64): void {
    store<i64>(this.data + (index << 3), value);
    this._validity.setValid(index);
  }

  // ============ Float32 accessors ============

  @inline
  getF32(index: i32): f32 {
    return load<f32>(this.data + (index << 2));
  }

  @inline
  setF32(index: i32, value: f32): void {
    store<f32>(this.data + (index << 2), value);
    this._validity.setValid(index);
  }

  @inline
  getF32Unchecked(index: i32): f32 {
    return load<f32>(this.data + (index << 2));
  }

  // ============ Float64 accessors ============

  @inline
  getF64(index: i32): f64 {
    return load<f64>(this.data + (index << 3));
  }

  @inline
  setF64(index: i32, value: f64): void {
    store<f64>(this.data + (index << 3), value);
    this._validity.setValid(index);
  }

  @inline
  getF64Unchecked(index: i32): f64 {
    return load<f64>(this.data + (index << 3));
  }

  /** Copy data from a typed array (via pointer) */
  copyFromBuffer(srcPtr: usize, srcLength: i32): void {
    const elementSize = getTypeSize(this._dtype);
    const copyBytes = min(srcLength, this._length) * elementSize;
    memory.copy(this.data, srcPtr, copyBytes);
  }

  /** Clone this column */
  clone(): NumericColumn {
    const newCol = new NumericColumn(this._length, this._dtype);
    memory.copy(newCol.data, this.data, this._byteLength);
    newCol._validity.copyFrom(this._validity);
    return newCol;
  }

  /** Slice column to create a new column with subset of data */
  slice(start: i32, end: i32): NumericColumn {
    const sliceLength = end - start;
    const newCol = new NumericColumn(sliceLength, this._dtype);
    const elementSize = getTypeSize(this._dtype);
    memory.copy(newCol.data, this.data + start * elementSize, sliceLength * elementSize);
    // Copy validity
    for (let i: i32 = 0; i < sliceLength; i++) {
      if (!this._validity.isValid(start + i)) {
        newCol._validity.setNull(i);
      }
    }
    return newCol;
  }

  /** Free the underlying memory */
  free(): void {
    if (this._ownsMemory && this.data !== 0) {
      heap.free(this.data);
    }
    this.data = 0;
    this._validity.free();
  }
}

/** Factory functions for creating typed columns */

export function createInt32Column(length: i32): NumericColumn {
  return new NumericColumn(length, DataType.Int32);
}

export function createInt64Column(length: i32): NumericColumn {
  return new NumericColumn(length, DataType.Int64);
}

export function createFloat32Column(length: i32): NumericColumn {
  return new NumericColumn(length, DataType.Float32);
}

export function createFloat64Column(length: i32): NumericColumn {
  return new NumericColumn(length, DataType.Float64);
}
