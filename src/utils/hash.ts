import { DataType } from './types.js';

/**
 * TypedHasher provides efficient hashing for different data types.
 * Uses numeric hashing for numeric keys to avoid expensive string conversion.
 */
export class TypedHasher {
  // FNV-1a constants
  private static readonly FNV_OFFSET = 0x811c9dc5;
  private static readonly FNV_PRIME = 0x01000193;

  // Null sentinel value (minimum 32-bit signed integer)
  private static readonly NULL_SENTINEL = -2147483648;

  /**
   * Hash a single numeric value directly without string conversion.
   * For 32-bit integers, uses the value itself as the hash.
   * For floats, uses bit-level hashing.
   */
  static hashSingleNumeric(value: number | null): number {
    if (value === null) return this.NULL_SENTINEL;

    // For 32-bit integers, use value directly
    if (Number.isInteger(value) && value >= -2147483647 && value <= 2147483646) {
      return value | 0;
    }

    return this.hashFloat64(value);
  }

  /**
   * Hash a float64 value using bit-level operations.
   */
  private static hashFloat64(value: number): number {
    // Use a simple but effective floating point hash
    // Multiply by a large prime to spread out the bits
    const bits = value * 2654435761;
    return (bits | 0) ^ ((bits * 65536) | 0);
  }

  /**
   * Hash a string value using FNV-1a.
   */
  static hashString(value: string | null): number {
    if (value === null) return this.NULL_SENTINEL;

    let hash = this.FNV_OFFSET;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, this.FNV_PRIME);
    }
    return hash;
  }

  /**
   * Hash any value based on its type.
   */
  static hashValue(value: any, dataType: DataType): number {
    if (value === null || value === undefined) return this.NULL_SENTINEL;

    switch (dataType) {
      case 'int8':
      case 'int16':
      case 'int32':
      case 'float32':
      case 'float64':
        return this.hashSingleNumeric(value as number);
      case 'string':
        return this.hashString(value as string);
      case 'boolean':
        return value ? 1 : 0;
      default:
        return this.hashString(String(value));
    }
  }

  /**
   * Hash a composite key (multiple columns) using FNV-1a combining.
   */
  static hashCompositeKey(values: any[], types: DataType[]): number {
    let hash = this.FNV_OFFSET;

    for (let i = 0; i < values.length; i++) {
      const valueHash = this.hashValue(values[i], types[i]);
      hash = Math.imul(hash ^ valueHash, this.FNV_PRIME);
    }

    return hash;
  }

  /**
   * Create a compound key for exact matching when hash collision is possible.
   * Returns a string representation for collision detection.
   */
  static createCompoundKey(values: any[]): string {
    return values.map(v => v === null ? '\x00NULL\x00' : String(v)).join('\x00|\x00');
  }
}

/**
 * NumericHashMap is a hash map optimized for numeric keys.
 * Uses open addressing with linear probing for cache-friendly access.
 */
export class NumericHashMap<V> {
  private keys: Int32Array;
  private values: (V | undefined)[];
  private compoundKeys: (string | undefined)[];  // For collision detection
  private size: number = 0;
  private capacity: number;
  private readonly EMPTY = -2147483648;  // Same as NULL_SENTINEL
  private readonly DELETED = -2147483647;

  constructor(expectedSize: number = 1024) {
    // Use power of 2 for fast modulo with bitwise AND
    this.capacity = this.nextPowerOfTwo(Math.max(expectedSize * 2, 16));
    this.keys = new Int32Array(this.capacity).fill(this.EMPTY);
    this.values = new Array(this.capacity);
    this.compoundKeys = new Array(this.capacity);
  }

  private nextPowerOfTwo(n: number): number {
    n--;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    return n + 1;
  }

  private hash(key: number): number {
    // Fast modulo for power of 2
    return (key & 0x7fffffff) & (this.capacity - 1);
  }

  /**
   * Set a value with both numeric hash and compound key for exact matching.
   */
  set(numericKey: number, compoundKey: string, value: V): void {
    if (this.size > this.capacity * 0.7) {
      this.resize();
    }

    let index = this.hash(numericKey);
    let firstDeleted = -1;

    while (true) {
      const existing = this.keys[index];

      if (existing === this.EMPTY) {
        const targetIndex = firstDeleted >= 0 ? firstDeleted : index;
        this.keys[targetIndex] = numericKey;
        this.compoundKeys[targetIndex] = compoundKey;
        this.values[targetIndex] = value;
        this.size++;
        return;
      }

      if (existing === this.DELETED) {
        if (firstDeleted < 0) firstDeleted = index;
      } else if (existing === numericKey && this.compoundKeys[index] === compoundKey) {
        // Exact match - update value
        this.values[index] = value;
        return;
      }

      index = (index + 1) & (this.capacity - 1);
    }
  }

  /**
   * Get a value by numeric hash and compound key.
   */
  get(numericKey: number, compoundKey: string): V | undefined {
    let index = this.hash(numericKey);

    while (true) {
      const existing = this.keys[index];

      if (existing === this.EMPTY) {
        return undefined;
      }

      if (existing === numericKey && this.compoundKeys[index] === compoundKey) {
        return this.values[index];
      }

      index = (index + 1) & (this.capacity - 1);
    }
  }

  /**
   * Check if a key exists.
   */
  has(numericKey: number, compoundKey: string): boolean {
    return this.get(numericKey, compoundKey) !== undefined;
  }

  /**
   * Get or create a value.
   */
  getOrCreate(numericKey: number, compoundKey: string, factory: () => V): V {
    let index = this.hash(numericKey);
    let firstDeleted = -1;

    while (true) {
      const existing = this.keys[index];

      if (existing === this.EMPTY) {
        if (this.size > this.capacity * 0.7) {
          this.resize();
          return this.getOrCreate(numericKey, compoundKey, factory);
        }

        const targetIndex = firstDeleted >= 0 ? firstDeleted : index;
        const value = factory();
        this.keys[targetIndex] = numericKey;
        this.compoundKeys[targetIndex] = compoundKey;
        this.values[targetIndex] = value;
        this.size++;
        return value;
      }

      if (existing === this.DELETED) {
        if (firstDeleted < 0) firstDeleted = index;
      } else if (existing === numericKey && this.compoundKeys[index] === compoundKey) {
        return this.values[index]!;
      }

      index = (index + 1) & (this.capacity - 1);
    }
  }

  private resize(): void {
    const oldKeys = this.keys;
    const oldValues = this.values;
    const oldCompoundKeys = this.compoundKeys;
    const oldCapacity = this.capacity;

    this.capacity *= 2;
    this.keys = new Int32Array(this.capacity).fill(this.EMPTY);
    this.values = new Array(this.capacity);
    this.compoundKeys = new Array(this.capacity);
    this.size = 0;

    for (let i = 0; i < oldCapacity; i++) {
      if (oldKeys[i] !== this.EMPTY && oldKeys[i] !== this.DELETED) {
        this.set(oldKeys[i], oldCompoundKeys[i]!, oldValues[i]!);
      }
    }
  }

  /**
   * Iterate over all entries.
   */
  *entries(): IterableIterator<[string, V]> {
    for (let i = 0; i < this.capacity; i++) {
      if (this.keys[i] !== this.EMPTY && this.keys[i] !== this.DELETED) {
        yield [this.compoundKeys[i]!, this.values[i]!];
      }
    }
  }

  /**
   * Get the number of entries.
   */
  getSize(): number {
    return this.size;
  }
}
