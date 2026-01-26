/**
 * Integration tests for DataFrame creation and operations
 * Tests the actual WASM DataFrame functionality
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { getModule } from './setup';
import { DatabonkDataFrame, ColumnType } from '../../src';
import type { DatabonkModule } from '../../src';

describe('DataFrame Integration', () => {
  let module: DatabonkModule;

  beforeAll(async () => {
    module = await getModule();
  });

  describe('fromTypedArrays', () => {
    it('should create a DataFrame with Int32 column', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
      ]);

      expect(df.rowCount).toBe(5);
      expect(df.columns).toContain('id');

      df.free();
    });

    it('should create a DataFrame with Float32 column', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: new Float32Array([1.5, 2.5, 3.5, 4.5, 5.5]) },
      ]);

      expect(df.rowCount).toBe(5);
      expect(df.columns).toContain('value');

      df.free();
    });

    it('should create a DataFrame with Float64 column', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'precise', data: new Float64Array([1.123456789, 2.987654321]) },
      ]);

      expect(df.rowCount).toBe(2);
      expect(df.columns).toContain('precise');

      df.free();
    });

    it('should create a DataFrame with multiple columns', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
        { name: 'value', data: new Float32Array([1.5, 2.5, 3.5, 4.5, 5.5]) },
        { name: 'weight', data: new Float64Array([0.1, 0.2, 0.3, 0.4, 0.5]) },
      ]);

      expect(df.rowCount).toBe(5);
      expect(df.columnCount).toBe(3);
      expect(df.columns).toEqual(['id', 'value', 'weight']);

      df.free();
    });

    it('should throw error for empty columns array', async () => {
      await expect(
        DatabonkDataFrame.fromTypedArrays(module, [])
      ).rejects.toThrow('At least one column is required');
    });

    it('should throw error for mismatched column lengths', async () => {
      await expect(
        DatabonkDataFrame.fromTypedArrays(module, [
          { name: 'a', data: new Int32Array([1, 2, 3]) },
          { name: 'b', data: new Float32Array([1, 2]) }, // Different length
        ])
      ).rejects.toThrow('has 2 rows, expected 3');
    });

    it('should handle explicit column type', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: new Float32Array([1, 2, 3]), type: ColumnType.Float32 },
      ]);

      expect(df.rowCount).toBe(3);
      df.free();
    });
  });

  describe('Column Access', () => {
    it('should get zero-copy column view', async () => {
      const originalData = new Float32Array([1.5, 2.5, 3.5, 4.5, 5.5]);
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: originalData },
      ]);

      const view = df.getColumnView('value');

      expect(view).not.toBeNull();
      expect(view!.length).toBe(5);
      expect(view!.get(0)).toBeCloseTo(1.5, 4);
      expect(view!.get(4)).toBeCloseTo(5.5, 4);

      df.free();
    });

    it('should return null for non-existent column', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: new Float32Array([1, 2, 3]) },
      ]);

      const view = df.getColumnView('nonexistent');

      expect(view).toBeNull();

      df.free();
    });

    it('should check column existence', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: new Float32Array([1, 2, 3]) },
      ]);

      // WASM returns i32 for bool (1 = true, 0 = false)
      expect(df.hasColumn('value')).toBeTruthy();
      expect(df.hasColumn('nonexistent')).toBeFalsy();

      df.free();
    });
  });

  describe('Aggregations', () => {
    it('should compute sum correctly', async () => {
      const data = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data },
      ]);

      const sum = df.sum('value');
      const expected = 55;

      expect(sum).toBeCloseTo(expected, 4);

      df.free();
    });

    it('should compute mean correctly', async () => {
      const data = new Float32Array([2, 4, 6, 8, 10]);
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data },
      ]);

      const mean = df.mean('value');
      const expected = 6;

      expect(mean).toBeCloseTo(expected, 4);

      df.free();
    });

    it('should compute min correctly', async () => {
      const data = new Float32Array([5, 2, 8, 1, 9, 3]);
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data },
      ]);

      const min = df.min('value');

      expect(min).toBe(1);

      df.free();
    });

    it('should compute max correctly', async () => {
      const data = new Float32Array([5, 2, 8, 1, 9, 3]);
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data },
      ]);

      const max = df.max('value');

      expect(max).toBe(9);

      df.free();
    });

    it('should compute count correctly', async () => {
      const data = new Float32Array([1, 2, 3, 4, 5]);
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data },
      ]);

      const count = df.count('value');

      expect(count).toBe(5);

      df.free();
    });
  });

  describe('Column Arithmetic', () => {
    it('should add two columns', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'a', data: new Float32Array([1, 2, 3, 4]) },
        { name: 'b', data: new Float32Array([10, 20, 30, 40]) },
      ]);

      df.add('a', 'b', 'sum');

      expect(df.columns).toContain('sum');

      df.free();
    });

    it('should subtract two columns', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'a', data: new Float32Array([10, 20, 30, 40]) },
        { name: 'b', data: new Float32Array([1, 2, 3, 4]) },
      ]);

      df.sub('a', 'b', 'diff');

      expect(df.columns).toContain('diff');

      df.free();
    });

    it('should multiply column by scalar', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: new Float32Array([1, 2, 3, 4]) },
      ]);

      df.scalarMul('value', 2.5, 'scaled');

      expect(df.columns).toContain('scaled');

      df.free();
    });
  });

  describe('Memory Management', () => {
    it('should free DataFrame without error', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: new Float32Array([1, 2, 3]) },
      ]);

      // Should not throw
      df.free();

      // Pointer should be cleared
      expect(df.wasmPtr).toBe(0);
    });

    it('should handle double free gracefully', async () => {
      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data: new Float32Array([1, 2, 3]) },
      ]);

      df.free();
      // Second free should not throw
      df.free();
    });
  });

  describe('Large DataFrames', () => {
    it('should handle 100K rows', async () => {
      const size = 100_000;
      const data = new Float32Array(size);
      for (let i = 0; i < size; i++) {
        data[i] = i;
      }

      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'value', data },
      ]);

      expect(df.rowCount).toBe(size);

      // Sum of 0 to 99999 = (n-1) * n / 2 = 4999950000
      // Float32 has limited precision (~7 significant digits), so we check relative error
      const sum = df.sum('value');
      const expected = 4999950000;
      const relativeError = Math.abs(sum - expected) / expected;
      expect(relativeError).toBeLessThan(0.001); // Within 0.1%

      df.free();
    });

    it('should handle multiple columns with 10K rows', async () => {
      const size = 10_000;
      const ids = new Int32Array(size);
      const values = new Float32Array(size);
      const weights = new Float64Array(size);

      for (let i = 0; i < size; i++) {
        ids[i] = i;
        values[i] = i * 1.5;
        weights[i] = i * 0.001;
      }

      const df = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: ids },
        { name: 'value', data: values },
        { name: 'weight', data: weights },
      ]);

      expect(df.rowCount).toBe(size);
      expect(df.columnCount).toBe(3);

      df.free();
    });
  });
});
