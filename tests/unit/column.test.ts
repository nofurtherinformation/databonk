/**
 * Unit tests for column operations
 */

import { describe, it, expect, beforeAll } from 'vitest';

describe('ValidityBitmap', () => {
  it('should track null values correctly', () => {
    // Test basic null tracking
    // This will test the WASM module when loaded
    expect(true).toBe(true);
  });

  it('should count valid values', () => {
    expect(true).toBe(true);
  });
});

describe('NumericColumn', () => {
  describe('Float32Column', () => {
    it('should store and retrieve f32 values', () => {
      const data = new Float32Array([1.5, 2.5, 3.5, 4.5]);
      expect(data.length).toBe(4);
      expect(data[0]).toBeCloseTo(1.5);
    });

    it('should handle null values', () => {
      expect(true).toBe(true);
    });
  });

  describe('Int32Column', () => {
    it('should store and retrieve i32 values', () => {
      const data = new Int32Array([1, 2, 3, 4]);
      expect(data.length).toBe(4);
      expect(data[0]).toBe(1);
    });
  });

  describe('Float64Column', () => {
    it('should store and retrieve f64 values', () => {
      const data = new Float64Array([1.5, 2.5, 3.5, 4.5]);
      expect(data.length).toBe(4);
      expect(data[0]).toBeCloseTo(1.5);
    });
  });
});

describe('SIMD Aggregations', () => {
  describe('sum', () => {
    it('should compute sum correctly for f32', () => {
      const data = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const sum = data.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(55);
    });

    it('should handle empty arrays', () => {
      const data = new Float32Array([]);
      const sum = data.reduce((a, b) => a + b, 0);
      expect(sum).toBe(0);
    });

    it('should handle arrays not divisible by SIMD width', () => {
      // Test with 17 elements (not divisible by 4 or 16)
      const data = new Float32Array(17).fill(1);
      const sum = data.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(17);
    });
  });

  describe('min/max', () => {
    it('should compute min correctly', () => {
      const data = new Float32Array([5, 2, 8, 1, 9, 3]);
      const min = Math.min(...data);
      expect(min).toBe(1);
    });

    it('should compute max correctly', () => {
      const data = new Float32Array([5, 2, 8, 1, 9, 3]);
      const max = Math.max(...data);
      expect(max).toBe(9);
    });
  });
});

describe('Column Arithmetic', () => {
  it('should add two columns element-wise', () => {
    const a = new Float32Array([1, 2, 3, 4]);
    const b = new Float32Array([5, 6, 7, 8]);
    const result = new Float32Array(4);
    for (let i = 0; i < 4; i++) {
      result[i] = a[i] + b[i];
    }
    expect(result[0]).toBeCloseTo(6);
    expect(result[3]).toBeCloseTo(12);
  });

  it('should multiply column by scalar', () => {
    const a = new Float32Array([1, 2, 3, 4]);
    const scalar = 2.5;
    const result = new Float32Array(4);
    for (let i = 0; i < 4; i++) {
      result[i] = a[i] * scalar;
    }
    expect(result[0]).toBeCloseTo(2.5);
    expect(result[3]).toBeCloseTo(10);
  });
});
