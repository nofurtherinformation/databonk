/**
 * SharedArrayBuffer support for zero-copy JS access
 * Memory is imported from JS to enable SharedArrayBuffer usage
 */

/**
 * Get the base address of WASM linear memory
 * This is always 0 in WASM but exported for clarity
 */
export function getMemoryBase(): usize {
  return 0;
}

/**
 * Get the current memory size in bytes
 */
export function getMemorySize(): usize {
  return <usize>memory.size() << 16; // pages * 64KB
}

/**
 * Create a view descriptor for a buffer
 * Returns offset and length for JS to create TypedArray view
 */
@final
export class BufferView {
  /** Byte offset into WASM memory */
  offset: usize;
  /** Length in elements (not bytes) */
  length: i32;
  /** Element size in bytes */
  elementSize: i32;

  constructor(offset: usize, length: i32, elementSize: i32) {
    this.offset = offset;
    this.length = length;
    this.elementSize = elementSize;
  }

  /** Get byte length */
  get byteLength(): i32 {
    return this.length * this.elementSize;
  }
}

/**
 * Create a buffer view for Int32Array
 */
export function createInt32View(ptr: usize, length: i32): BufferView {
  return new BufferView(ptr, length, 4);
}

/**
 * Create a buffer view for Int64Array (BigInt64Array in JS)
 */
export function createInt64View(ptr: usize, length: i32): BufferView {
  return new BufferView(ptr, length, 8);
}

/**
 * Create a buffer view for Float32Array
 */
export function createFloat32View(ptr: usize, length: i32): BufferView {
  return new BufferView(ptr, length, 4);
}

/**
 * Create a buffer view for Float64Array
 */
export function createFloat64View(ptr: usize, length: i32): BufferView {
  return new BufferView(ptr, length, 8);
}

/**
 * Create a buffer view for Uint8Array
 */
export function createUint8View(ptr: usize, length: i32): BufferView {
  return new BufferView(ptr, length, 1);
}

/**
 * Atomic operations for thread synchronization
 * These use WASM atomics when compiled with --enable threads
 */

/**
 * Atomic load of i32
 */
export function atomicLoadI32(ptr: usize): i32 {
  return atomic.load<i32>(ptr);
}

/**
 * Atomic store of i32
 */
export function atomicStoreI32(ptr: usize, value: i32): void {
  atomic.store<i32>(ptr, value);
}

/**
 * Atomic add of i32
 */
export function atomicAddI32(ptr: usize, value: i32): i32 {
  return atomic.add<i32>(ptr, value);
}

/**
 * Atomic compare-and-swap of i32
 */
export function atomicCasI32(ptr: usize, expected: i32, replacement: i32): i32 {
  return atomic.cmpxchg<i32>(ptr, expected, replacement);
}

/**
 * Memory fence (full barrier)
 */
export function memoryFence(): void {
  atomic.fence();
}
