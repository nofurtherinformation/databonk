/**
 * SharedArrayBuffer utilities for zero-copy column access
 */

import type { DatabonkModule } from './loader';

/**
 * Zero-copy column view into WASM memory
 * Provides direct access to column data without copying
 */
export class ColumnView<T extends TypedArray> {
  /** The underlying typed array view */
  readonly data: T;
  /** Pointer to data in WASM memory */
  readonly ptr: number;
  /** Number of elements */
  readonly length: number;
  /** Whether this is a shared memory view */
  readonly isShared: boolean;

  constructor(data: T, ptr: number, isShared: boolean) {
    this.data = data;
    this.ptr = ptr;
    this.length = data.length;
    this.isShared = isShared;
  }

  /** Get value at index */
  get(index: number): number {
    return this.data[index];
  }

  /** Set value at index */
  set(index: number, value: number): void {
    this.data[index] = value;
  }

  /** Iterate over values */
  *[Symbol.iterator](): Iterator<number> {
    for (let i = 0; i < this.length; i++) {
      yield this.data[i];
    }
  }

  /** Convert to regular array (copies data) */
  toArray(): number[] {
    return Array.from(this.data);
  }

  /** Slice the view (creates a copy) */
  slice(start?: number, end?: number): T {
    return this.data.slice(start, end) as T;
  }
}

type TypedArray = Int32Array | Float32Array | Float64Array | Uint8Array;
type NumericTypedArray = Int32Array | Float32Array | Float64Array;

/**
 * Column type enum matching AssemblyScript
 */
export enum ColumnType {
  Int32 = 0,
  Int64 = 1,
  Float32 = 2,
  Float64 = 3,
  String = 4,
}

/**
 * Get the byte size for a column type
 */
export function getColumnTypeSize(type: ColumnType): number {
  switch (type) {
    case ColumnType.Int32:
    case ColumnType.Float32:
      return 4;
    case ColumnType.Int64:
    case ColumnType.Float64:
      return 8;
    default:
      return 0;
  }
}

/**
 * Create a typed array view for a column type
 */
export function createTypedArrayView(
  module: DatabonkModule,
  ptr: number,
  length: number,
  type: ColumnType
): ColumnView<NumericTypedArray> {
  const isShared = module.isSharedMemory;

  switch (type) {
    case ColumnType.Int32:
      return new ColumnView(
        module.getInt32View(ptr, length),
        ptr,
        isShared
      );
    case ColumnType.Float32:
      return new ColumnView(
        module.getFloat32View(ptr, length),
        ptr,
        isShared
      );
    case ColumnType.Float64:
      return new ColumnView(
        module.getFloat64View(ptr, length),
        ptr,
        isShared
      );
    default:
      throw new Error(`Unsupported column type: ${type}`);
  }
}

/**
 * Copy data from a TypedArray into WASM memory
 */
export function copyToWasm(
  module: DatabonkModule,
  data: TypedArray,
  ptr: number
): void {
  const view = new Uint8Array(module.memory.buffer, ptr, data.byteLength);
  view.set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
}

/**
 * Allocate and copy a TypedArray into WASM memory
 */
export function allocateAndCopy(
  module: DatabonkModule,
  data: TypedArray
): number {
  const ptr = module.exports.allocateBuffer(data.byteLength);
  copyToWasm(module, data, ptr);
  return ptr;
}

/**
 * Create a SharedArrayBuffer-backed TypedArray for cross-thread sharing
 * Only works if the WASM module was loaded with shared memory
 */
export function createSharedView<T extends TypedArray>(
  module: DatabonkModule,
  ptr: number,
  length: number,
  TypedArrayConstructor: new (buffer: ArrayBufferLike, byteOffset: number, length: number) => T
): T | null {
  if (!module.isSharedMemory) {
    return null;
  }

  return new TypedArrayConstructor(module.memory.buffer, ptr, length);
}
