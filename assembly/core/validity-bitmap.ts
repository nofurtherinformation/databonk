/**
 * ValidityBitmap - Bit-packed null tracking for columnar data
 * Uses 1 bit per value, 64-byte aligned for SIMD operations
 */

// 64-byte alignment for SIMD
const ALIGNMENT: i32 = 64;

@final
export class ValidityBitmap {
  /** Pointer to bit-packed validity data */
  private data: usize;
  /** Number of values tracked */
  private _length: i32;
  /** Size of the buffer in bytes */
  private _byteLength: i32;

  constructor(length: i32) {
    this._length = length;
    // Calculate bytes needed (8 values per byte, rounded up)
    const bytesNeeded = (length + 7) >> 3;
    // Align to 64 bytes
    this._byteLength = ((bytesNeeded + ALIGNMENT - 1) / ALIGNMENT) * ALIGNMENT;
    // Allocate aligned memory
    this.data = heap.alloc(this._byteLength);
    // Initialize all bits to 1 (all valid)
    memory.fill(this.data, 0xFF, this._byteLength);
  }

  /** Get the number of values tracked */
  get length(): i32 {
    return this._length;
  }

  /** Get the pointer to the underlying data for zero-copy access */
  get dataPtr(): usize {
    return this.data;
  }

  /** Get the byte length of the buffer */
  get byteLength(): i32 {
    return this._byteLength;
  }

  /** Check if value at index is valid (not null) */
  @inline
  isValid(index: i32): bool {
    if (index < 0 || index >= this._length) return false;
    const byteIndex = index >> 3;
    const bitIndex = index & 7;
    return (load<u8>(this.data + byteIndex) & (1 << bitIndex)) !== 0;
  }

  /** Mark value at index as null */
  @inline
  setNull(index: i32): void {
    if (index < 0 || index >= this._length) return;
    const byteIndex = index >> 3;
    const bitIndex: u8 = <u8>(index & 7);
    const currentByte = load<u8>(this.data + byteIndex);
    const mask: u8 = <u8>(1 << bitIndex);
    store<u8>(this.data + byteIndex, currentByte & ~mask);
  }

  /** Mark value at index as valid (not null) */
  @inline
  setValid(index: i32): void {
    if (index < 0 || index >= this._length) return;
    const byteIndex = index >> 3;
    const bitIndex: u8 = <u8>(index & 7);
    const currentByte = load<u8>(this.data + byteIndex);
    const mask: u8 = <u8>(1 << bitIndex);
    store<u8>(this.data + byteIndex, currentByte | mask);
  }

  /** Count the number of valid (non-null) values using popcount */
  countValid(): i32 {
    let count: i32 = 0;
    const fullBytes = this._length >> 3;
    const remainingBits = this._length & 7;

    // Process full bytes using 64-bit popcount for efficiency
    const fullU64s = fullBytes >> 3;
    let ptr = this.data;

    for (let i: i32 = 0; i < fullU64s; i++) {
      count += <i32>popcnt(load<u64>(ptr));
      ptr += 8;
    }

    // Process remaining full bytes
    const remainingBytes = fullBytes & 7;
    for (let i: i32 = 0; i < remainingBytes; i++) {
      count += <i32>popcnt(load<u8>(ptr));
      ptr += 1;
    }

    // Process remaining bits in the last partial byte
    if (remainingBits > 0) {
      const lastByte = load<u8>(this.data + fullBytes);
      const mask = (1 << remainingBits) - 1;
      count += <i32>popcnt(<u32>(lastByte & mask));
    }

    return count;
  }

  /** Count the number of null values */
  countNull(): i32 {
    return this._length - this.countValid();
  }

  /** Set all values as valid */
  setAllValid(): void {
    memory.fill(this.data, 0xFF, this._byteLength);
  }

  /** Set all values as null */
  setAllNull(): void {
    memory.fill(this.data, 0x00, this._byteLength);
  }

  /** Copy validity from another bitmap */
  copyFrom(other: ValidityBitmap): void {
    const copyBytes = min(this._byteLength, other._byteLength);
    memory.copy(this.data, other.data, copyBytes);
  }

  /** Clone this bitmap */
  clone(): ValidityBitmap {
    const newBitmap = new ValidityBitmap(this._length);
    memory.copy(newBitmap.data, this.data, this._byteLength);
    return newBitmap;
  }

  /** Free the underlying memory */
  free(): void {
    if (this.data !== 0) {
      heap.free(this.data);
      this.data = 0;
    }
  }
}
