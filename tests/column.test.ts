import { Column } from '../src/core/column';
import { DataType } from '../src/utils/types';

describe('Column', () => {
  describe('constructor and basic operations', () => {
    test('creates column with numeric data', () => {
      const col = new Column('test', [1, 2, 3, 4, 5]);
      expect(col.name).toBe('test');
      expect(col.length).toBe(5);
      expect(col.dataType).toBe('int8');
      expect(col.get(0)).toBe(1);
      expect(col.get(4)).toBe(5);
    });

    test('creates column with string data', () => {
      const col = new Column('names', ['Alice', 'Bob', 'Charlie']);
      expect(col.dataType).toBe('string');
      expect(col.get(1)).toBe('Bob');
    });

    test('creates column with boolean data', () => {
      const col = new Column('flags', [true, false, true]);
      expect(col.dataType).toBe('boolean');
      expect(col.get(0)).toBe(true);
      expect(col.get(1)).toBe(false);
    });

    test('handles null values correctly', () => {
      const col = new Column('mixed', [1, null, 3, null, 5]);
      expect(col.get(1)).toBeNull();
      expect(col.isNull(1)).toBe(true);
      expect(col.isNull(0)).toBe(false);
      expect(col.count()).toBe(3); // non-null values
    });
  });

  describe('data type inference', () => {
    test('infers int8 for small integers', () => {
      const col = new Column('small', [1, -5, 127]);
      expect(col.dataType).toBe('int8');
    });

    test('infers int16 for medium integers', () => {
      const col = new Column('medium', [1000, -500, 30000]);
      expect(col.dataType).toBe('int16');
    });

    test('infers float64 for decimals', () => {
      const col = new Column('decimal', [1.5, 2.7, 3.14]);
      expect(col.dataType).toBe('float64');
    });

    test('allows explicit data type override', () => {
      const col = new Column('forced', [1, 2, 3], 'float64');
      expect(col.dataType).toBe('float64');
    });
  });

  describe('aggregation operations', () => {
    const numCol = new Column('numbers', [1, 2, 3, 4, 5]);
    const mixedCol = new Column('mixed', [1, null, 3, null, 5]);

    test('calculates sum correctly', () => {
      expect(numCol.sum()).toBe(15);
      expect(mixedCol.sum()).toBe(9);
    });

    test('calculates mean correctly', () => {
      expect(numCol.mean()).toBe(3);
      expect(mixedCol.mean()).toBe(3);
    });

    test('finds min and max', () => {
      expect(numCol.min()).toBe(1);
      expect(numCol.max()).toBe(5);
      expect(mixedCol.min()).toBe(1);
      expect(mixedCol.max()).toBe(5);
    });

    test('counts non-null values', () => {
      expect(numCol.count()).toBe(5);
      expect(mixedCol.count()).toBe(3);
    });

    test('throws error for string aggregations', () => {
      const strCol = new Column('strings', ['a', 'b', 'c']);
      expect(() => strCol.sum()).toThrow();
      expect(() => strCol.mean()).toThrow();
    });
  });

  describe('operations', () => {
    const col = new Column('test', [1, 2, 3, 4, 5]);

    test('slices correctly', () => {
      const sliced = col.slice(1, 4);
      expect(sliced.length).toBe(3);
      expect(sliced.toArray()).toEqual([2, 3, 4]);
    });

    test('filters correctly', () => {
      const filtered = col.filter(val => val !== null && val > 3);
      expect(filtered.toArray()).toEqual([4, 5]);
    });

    test('maps correctly', () => {
      const mapped = col.map(val => val !== null ? val * 2 : null);
      expect(mapped.toArray()).toEqual([2, 4, 6, 8, 10]);
    });

    test('gets unique values', () => {
      const dupes = new Column('dupes', [1, 2, 2, 3, 3, 3]);
      expect(dupes.unique()).toEqual([1, 2, 3]);
    });

    test('converts to array', () => {
      expect(col.toArray()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  test('handles empty column', () => {
    const empty = new Column('empty', []);
    expect(empty.length).toBe(0);
    expect(empty.toArray()).toEqual([]);
    expect(empty.count()).toBe(0);
  });
});