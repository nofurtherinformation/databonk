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

  *[Symbol.iterator](): Iterator<boolean> {
    for (let i = 0; i < this.length; i++) {
      yield this.get(i);
    }
  }
}