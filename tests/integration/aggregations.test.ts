/**
 * Integration tests for SIMD aggregations
 * Tests the actual WASM SIMD operations
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { getModule, allocateF32, allocateF64, freePtr } from './setup';
import type { DatabonkModule } from '../../src';

describe('WASM SIMD Aggregations', () => {
  let module: DatabonkModule;

  beforeAll(async () => {
    module = await getModule();
  });

  describe('simdSumF32', () => {
    it('should compute sum correctly for aligned array', () => {
      // 16 elements - perfectly aligned for SIMD
      const data = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
      const expected = data.reduce((a, b) => a + b, 0);

      const ptr = allocateF32(data);
      const result = module.exports.simdSumF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBeCloseTo(expected, 4);
    });

    it('should match JavaScript reduce result', () => {
      const data = new Float32Array(1000);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 100;
      }
      const jsSum = data.reduce((a, b) => a + b, 0);

      const ptr = allocateF32(data);
      const wasmSum = module.exports.simdSumF32(ptr, data.length);
      freePtr(ptr);

      // Float32 precision is limited, so we use a relative tolerance
      expect(wasmSum).toBeCloseTo(jsSum, 0);
    });

    it('should handle empty array', () => {
      const data = new Float32Array(0);
      const ptr = allocateF32(data);
      const result = module.exports.simdSumF32(ptr, 0);
      freePtr(ptr);

      expect(result).toBe(0);
    });

    it('should handle single element', () => {
      const data = new Float32Array([42.5]);
      const ptr = allocateF32(data);
      const result = module.exports.simdSumF32(ptr, 1);
      freePtr(ptr);

      expect(result).toBeCloseTo(42.5, 4);
    });

    it('should handle non-SIMD-aligned sizes (17 elements)', () => {
      // 17 is not divisible by 4 or 16
      const data = new Float32Array(17).fill(1);
      const expected = 17;

      const ptr = allocateF32(data);
      const result = module.exports.simdSumF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBeCloseTo(expected, 4);
    });

    it('should handle prime number of elements (23)', () => {
      const data = new Float32Array(23);
      for (let i = 0; i < data.length; i++) {
        data[i] = i + 1;
      }
      const expected = (23 * 24) / 2; // Sum 1 to 23

      const ptr = allocateF32(data);
      const result = module.exports.simdSumF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBeCloseTo(expected, 4);
    });
  });

  describe('simdMinF32', () => {
    it('should find minimum correctly', () => {
      const data = new Float32Array([5, 2, 8, 1, 9, 3, 7, 4, 6, 10]);
      const expected = 1;

      const ptr = allocateF32(data);
      const result = module.exports.simdMinF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBe(expected);
    });

    it('should handle negative values', () => {
      const data = new Float32Array([5, -2, 8, -10, 9, 3, -7, 4, 6, 10]);
      const expected = -10;

      const ptr = allocateF32(data);
      const result = module.exports.simdMinF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBe(expected);
    });

    it('should return Infinity for empty array', () => {
      const ptr = allocateF32(new Float32Array(0));
      const result = module.exports.simdMinF32(ptr, 0);
      freePtr(ptr);

      expect(result).toBe(Infinity);
    });

    it('should handle all same values', () => {
      const data = new Float32Array(100).fill(42);
      const ptr = allocateF32(data);
      const result = module.exports.simdMinF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBe(42);
    });
  });

  describe('simdMaxF32', () => {
    it('should find maximum correctly', () => {
      const data = new Float32Array([5, 2, 8, 1, 9, 3, 7, 4, 6, 10]);
      const expected = 10;

      const ptr = allocateF32(data);
      const result = module.exports.simdMaxF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBe(expected);
    });

    it('should handle negative values', () => {
      const data = new Float32Array([-5, -2, -8, -10, -9, -3, -7, -4, -6, -1]);
      const expected = -1;

      const ptr = allocateF32(data);
      const result = module.exports.simdMaxF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBe(expected);
    });

    it('should return -Infinity for empty array', () => {
      const ptr = allocateF32(new Float32Array(0));
      const result = module.exports.simdMaxF32(ptr, 0);
      freePtr(ptr);

      expect(result).toBe(-Infinity);
    });

    it('should handle min at last position', () => {
      const data = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
      const ptr = allocateF32(data);
      const result = module.exports.simdMaxF32(ptr, data.length);
      freePtr(ptr);

      expect(result).toBe(100);
    });
  });

  describe('simdSumF64', () => {
    it('should compute sum correctly with higher precision', () => {
      const data = new Float64Array([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
      const expected = 5.5;

      const ptr = allocateF64(data);
      const result = module.exports.simdSumF64(ptr, data.length);
      freePtr(ptr);

      expect(result).toBeCloseTo(expected, 10);
    });

    it('should handle large values without overflow', () => {
      const data = new Float64Array([1e15, 2e15, 3e15, 4e15]);
      const expected = 10e15;

      const ptr = allocateF64(data);
      const result = module.exports.simdSumF64(ptr, data.length);
      freePtr(ptr);

      expect(result).toBeCloseTo(expected, 5);
    });
  });

  describe('simdMinF64', () => {
    it('should find minimum with higher precision', () => {
      const data = new Float64Array([1.1111111111, 2.2222222222, 0.1234567890, 3.3333333333]);
      const expected = 0.1234567890;

      const ptr = allocateF64(data);
      const result = module.exports.simdMinF64(ptr, data.length);
      freePtr(ptr);

      expect(result).toBeCloseTo(expected, 10);
    });
  });

  describe('simdMaxF64', () => {
    it('should find maximum with higher precision', () => {
      const data = new Float64Array([1.1111111111, 2.2222222222, 3.3333333333, 0.1234567890]);
      const expected = 3.3333333333;

      const ptr = allocateF64(data);
      const result = module.exports.simdMaxF64(ptr, data.length);
      freePtr(ptr);

      expect(result).toBeCloseTo(expected, 10);
    });
  });
});
