export class BitSet {
  private data: Uint32Array;
  private length: number;

  constructor(length: number) {
    this.length = length;
    this.data = new Uint32Array(Math.ceil(length / 32));
  }

  set(index: number, value: boolean): void {
    if (index >= this.length) throw new Error('Index out of bounds');
    
    const arrayIndex = Math.floor(index / 32);
    const bitIndex = index % 32;
    
    if (value) {
      this.data[arrayIndex] |= (1 << bitIndex);
    } else {
      this.data[arrayIndex] &= ~(1 << bitIndex);
    }
  }

  get(index: number): boolean {
    if (index >= this.length) throw new Error('Index out of bounds');
    
    const arrayIndex = Math.floor(index / 32);
    const bitIndex = index % 32;
    
    return (this.data[arrayIndex] & (1 << bitIndex)) !== 0;
  }

  size(): number {
    return this.length;
  }

  count(): number {
    let count = 0;
    for (let i = 0; i < this.data.length; i++) {
      count += this.popCount(this.data[i]);
    }
    return count;
  }

  private popCount(n: number): number {
    n = n - ((n >>> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
    return (((n + (n >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
  }

  /**
   * Get a batch of null flags as a bitmask.
   * Useful for SIMD-style batch null checking.
   * @param startIndex The starting index (must be aligned to 32 for optimal performance)
   * @param count Number of bits to get (max 32)
   * @returns A number where bit i is set if index (startIndex + i) is null
   */
  getNullMaskBatch(startIndex: number, count: number): number {
    if (count <= 0 || count > 32) {
      throw new Error('Count must be between 1 and 32');
    }

    const arrayIndex = Math.floor(startIndex / 32);
    const bitOffset = startIndex % 32;

    if (bitOffset === 0 && count === 32) {
      // Aligned access - fast path
      return this.data[arrayIndex] >>> 0;
    }

    // Extract bits across word boundaries if needed
    let result = this.data[arrayIndex] >>> bitOffset;

    if (bitOffset + count > 32 && arrayIndex + 1 < this.data.length) {
      // Need bits from next word
      const bitsFromFirst = 32 - bitOffset;
      const bitsFromSecond = count - bitsFromFirst;
      const nextWord = this.data[arrayIndex + 1];
      result |= (nextWord & ((1 << bitsFromSecond) - 1)) << bitsFromFirst;
    }

    // Mask to requested count
    return result & ((1 << count) - 1);
  }

  /**
   * Check if any bit in a range is set.
   * Faster than checking each bit individually.
   */
  anySet(startIndex: number, count: number): boolean {
    const endIndex = Math.min(startIndex + count, this.length);

    for (let i = startIndex; i < endIndex; ) {
      const arrayIndex = Math.floor(i / 32);
      const bitOffset = i % 32;
      const bitsToCheck = Math.min(32 - bitOffset, endIndex - i);

      const mask = ((1 << bitsToCheck) - 1) << bitOffset;
      if ((this.data[arrayIndex] & mask) !== 0) {
        return true;
      }

      i += bitsToCheck;
    }

    return false;
  }

  /**
   * Get direct access to the underlying data array.
   * @internal
   */
  getDataRef(): Uint32Array {
    return this.data;
  }

  *[Symbol.iterator](): Iterator<boolean> {
    for (let i = 0; i < this.length; i++) {
      yield this.get(i);
    }
  }
}