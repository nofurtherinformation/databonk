/**
 * StringColumn - Arrow-style variable-length string storage
 * Uses offsets buffer + data buffer with UTF-16 encoding (AssemblyScript native)
 */

import { ValidityBitmap } from './validity-bitmap';

// 64-byte alignment for SIMD
const ALIGNMENT: usize = 64;

@final
export class StringColumn {
  /** Offsets buffer (i32 array, length + 1 elements) */
  private offsets: usize;
  /** Data buffer (UTF-16 characters) */
  private data: usize;
  /** Number of strings */
  private _length: i32;
  /** Size of offsets buffer in bytes */
  private _offsetsByteLength: i32;
  /** Size of data buffer in bytes */
  private _dataByteLength: i32;
  /** Current write position in data buffer */
  private _dataPosition: i32;
  /** Data buffer capacity */
  private _dataCapacity: i32;
  /** Validity bitmap for null handling */
  private _validity: ValidityBitmap;

  constructor(length: i32, initialDataCapacity: i32 = 0) {
    this._length = length;

    // Offsets: (length + 1) i32 values, aligned
    const offsetsBytes = (length + 1) << 2;
    this._offsetsByteLength = ((offsetsBytes + ALIGNMENT - 1) / ALIGNMENT) * ALIGNMENT;
    this.offsets = heap.alloc(this._offsetsByteLength);
    memory.fill(this.offsets, 0, this._offsetsByteLength);

    // Data: estimate or use provided capacity (UTF-16, so 2 bytes per char)
    const estimatedChars = initialDataCapacity > 0 ? initialDataCapacity : length * 16;
    const dataBytes = estimatedChars << 1;
    this._dataCapacity = estimatedChars;
    this._dataByteLength = ((dataBytes + ALIGNMENT - 1) / ALIGNMENT) * ALIGNMENT;
    this.data = heap.alloc(this._dataByteLength);
    memory.fill(this.data, 0, this._dataByteLength);

    this._dataPosition = 0;

    // Create validity bitmap
    this._validity = new ValidityBitmap(length);
  }

  /** Get the number of strings */
  get length(): i32 {
    return this._length;
  }

  /** Get the offsets pointer for zero-copy access */
  get offsetsPtr(): usize {
    return this.offsets;
  }

  /** Get the data pointer for zero-copy access */
  get dataPtr(): usize {
    return this.data;
  }

  /** Get the validity bitmap */
  get validity(): ValidityBitmap {
    return this._validity;
  }

  /** Get the offset for a string at index */
  @inline
  private getOffset(index: i32): i32 {
    return load<i32>(this.offsets + (index << 2));
  }

  /** Set the offset for a string at index */
  @inline
  private setOffset(index: i32, offset: i32): void {
    store<i32>(this.offsets + (index << 2), offset);
  }

  /** Ensure data buffer has enough capacity */
  private ensureCapacity(needed: i32): void {
    if (this._dataPosition + needed > this._dataCapacity) {
      // Double capacity or grow to fit
      const newCapacity = max(this._dataCapacity << 1, this._dataPosition + needed);
      const newDataBytes = newCapacity << 1;
      const newDataByteLength = ((newDataBytes + ALIGNMENT - 1) / ALIGNMENT) * ALIGNMENT;
      const newData = heap.alloc(newDataByteLength);

      // Copy existing data
      memory.copy(newData, this.data, this._dataPosition << 1);

      // Free old buffer and update
      heap.free(this.data);
      this.data = newData;
      this._dataCapacity = newCapacity;
      this._dataByteLength = newDataByteLength;
    }
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

  /** Get string at index */
  getString(index: i32): string {
    if (index < 0 || index >= this._length) return '';
    if (!this._validity.isValid(index)) return '';

    const startOffset = this.getOffset(index);
    const endOffset = this.getOffset(index + 1);
    const charLength = endOffset - startOffset;

    if (charLength <= 0) return '';

    // Create string from UTF-16 data
    const result = String.UTF16.decodeUnsafe(
      this.data + (startOffset << 1),
      charLength << 1
    );
    return result;
  }

  /** Set string at index (for sequential building) */
  setString(index: i32, value: string): void {
    if (index < 0 || index >= this._length) return;

    const charLength = value.length;

    // Ensure capacity
    this.ensureCapacity(charLength);

    // Set start offset
    this.setOffset(index, this._dataPosition);

    // Copy string data
    const strPtr = changetype<usize>(value);
    memory.copy(this.data + (this._dataPosition << 1), strPtr, charLength << 1);

    // Update position
    this._dataPosition += charLength;

    // Set end offset
    this.setOffset(index + 1, this._dataPosition);

    // Mark as valid
    this._validity.setValid(index);
  }

  /** Get the byte length of a string at index */
  getStringByteLength(index: i32): i32 {
    if (index < 0 || index >= this._length) return 0;
    const startOffset = this.getOffset(index);
    const endOffset = this.getOffset(index + 1);
    return (endOffset - startOffset) << 1;
  }

  /** Get total data size used */
  getTotalDataSize(): i32 {
    return this._dataPosition << 1;
  }

  /** Clone this column */
  clone(): StringColumn {
    const newCol = new StringColumn(this._length, this._dataCapacity);

    // Copy offsets
    memory.copy(newCol.offsets, this.offsets, this._offsetsByteLength);

    // Copy data
    memory.copy(newCol.data, this.data, this._dataPosition << 1);
    newCol._dataPosition = this._dataPosition;

    // Copy validity
    newCol._validity.copyFrom(this._validity);

    return newCol;
  }

  /** Free the underlying memory */
  free(): void {
    if (this.offsets !== 0) {
      heap.free(this.offsets);
      this.offsets = 0;
    }
    if (this.data !== 0) {
      heap.free(this.data);
      this.data = 0;
    }
    this._validity.free();
  }
}
