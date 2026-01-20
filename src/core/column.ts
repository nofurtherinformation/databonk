import { DataType, TypedArrayInstance, TYPE_CONSTRUCTORS, inferArrayDataType } from '../utils/types.js';
import { BitSet } from '../utils/bitset.js';

export class Column<T = any> {
  public readonly name: string;
  public readonly dataType: DataType;
  private data: TypedArrayInstance | any[];
  private nullBitmap: BitSet;
  public readonly length: number;

  constructor(name: string, values: T[], dataType?: DataType) {
    this.name = name;
    this.length = values.length;
    this.dataType = dataType || inferArrayDataType(values);
    
    this.nullBitmap = new BitSet(this.length);
    this.data = this.createDataArray(values);
  }

  private createDataArray(values: T[]): TypedArrayInstance | any[] {
    const Constructor = TYPE_CONSTRUCTORS[this.dataType];
    
    if (!Constructor) {
      return values.map((val, i) => {
        const isNull = val === null || val === undefined;
        this.nullBitmap.set(i, isNull);
        return isNull ? (this.dataType === 'string' ? '' : false) : val;
      });
    }

    const typedArray = new Constructor(this.length);
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      const isNull = val === null || val === undefined;
      this.nullBitmap.set(i, isNull);
      typedArray[i] = isNull ? 0 : Number(val);
    }
    
    return typedArray;
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    
    if (this.nullBitmap.get(index)) {
      return null;
    }
    
    return this.data[index] as T;
  }

  isNull(index: number): boolean {
    return this.nullBitmap.get(index);
  }

  slice(start?: number, end?: number): Column<T> {
    const sliceStart = start || 0;
    const sliceEnd = end || this.length;
    const slicedValues: (T | null)[] = [];
    
    for (let i = sliceStart; i < sliceEnd; i++) {
      slicedValues.push(this.get(i));
    }
    
    return new Column(this.name, slicedValues as T[], this.dataType);
  }

  filter(predicate: (value: T | null, index: number) => boolean): Column<T> {
    const filteredValues: (T | null)[] = [];
    
    for (let i = 0; i < this.length; i++) {
      const value = this.get(i);
      if (predicate(value, i)) {
        filteredValues.push(value);
      }
    }
    
    return new Column(this.name, filteredValues as T[], this.dataType);
  }

  map<U>(fn: (value: T | null, index: number) => U, newDataType?: DataType): Column<U> {
    const mappedValues: U[] = [];
    
    for (let i = 0; i < this.length; i++) {
      const value = this.get(i);
      mappedValues.push(fn(value, i));
    }
    
    return new Column(this.name, mappedValues, newDataType);
  }

  sum(): number {
    if (this.dataType === 'string' || this.dataType === 'boolean') {
      throw new Error('Cannot sum non-numeric column');
    }
    
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      if (!this.nullBitmap.get(i)) {
        sum += this.data[i] as number;
      }
    }
    
    return sum;
  }

  mean(): number {
    if (this.dataType === 'string' || this.dataType === 'boolean') {
      throw new Error('Cannot calculate mean of non-numeric column');
    }
    
    const validCount = this.length - this.nullBitmap.count();
    return validCount > 0 ? this.sum() / validCount : 0;
  }

  min(): number {
    if (this.dataType === 'string' || this.dataType === 'boolean') {
      throw new Error('Cannot find min of non-numeric column');
    }
    
    let min = Infinity;
    let hasValidValue = false;
    
    for (let i = 0; i < this.length; i++) {
      if (!this.nullBitmap.get(i)) {
        const value = this.data[i] as number;
        if (value < min) {
          min = value;
        }
        hasValidValue = true;
      }
    }
    
    return hasValidValue ? min : NaN;
  }

  max(): number {
    if (this.dataType === 'string' || this.dataType === 'boolean') {
      throw new Error('Cannot find max of non-numeric column');
    }
    
    let max = -Infinity;
    let hasValidValue = false;
    
    for (let i = 0; i < this.length; i++) {
      if (!this.nullBitmap.get(i)) {
        const value = this.data[i] as number;
        if (value > max) {
          max = value;
        }
        hasValidValue = true;
      }
    }
    
    return hasValidValue ? max : NaN;
  }

  count(): number {
    return this.length - this.nullBitmap.count();
  }

  unique(): T[] {
    const uniqueValues = new Set<T>();
    
    for (let i = 0; i < this.length; i++) {
      if (!this.nullBitmap.get(i)) {
        uniqueValues.add(this.data[i] as T);
      }
    }
    
    return Array.from(uniqueValues);
  }

  *values(): Iterator<T | null> {
    for (let i = 0; i < this.length; i++) {
      yield this.get(i);
    }
  }

  toArray(): (T | null)[] {
    const result: (T | null)[] = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.get(i));
    }
    return result;
  }

  static from<T>(name: string, values: T[], dataType?: DataType): Column<T> {
    return new Column(name, values, dataType);
  }
}