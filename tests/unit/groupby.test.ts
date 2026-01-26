/**
 * Unit tests for GroupBy operations
 */

import { describe, it, expect } from 'vitest';

describe('GroupBy', () => {
  describe('Integer Key GroupBy', () => {
    it('should group by integer keys correctly', () => {
      // Simulate groupby with integer zones 0-4
      const keys = new Int32Array([0, 1, 0, 2, 1, 0, 2, 1]);
      const values = new Float32Array([10, 20, 30, 40, 50, 60, 70, 80]);

      // Group manually
      const groups = new Map<number, number[]>();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!groups.has(key)) {
          groups.set(key, []);
        }
        groups.get(key)!.push(values[i]);
      }

      expect(groups.size).toBe(3);
      expect(groups.get(0)).toEqual([10, 30, 60]);
      expect(groups.get(1)).toEqual([20, 50, 80]);
      expect(groups.get(2)).toEqual([40, 70]);
    });

    it('should compute sum aggregation per group', () => {
      const keys = new Int32Array([0, 1, 0, 2, 1, 0, 2, 1]);
      const values = new Float32Array([10, 20, 30, 40, 50, 60, 70, 80]);

      // Group and sum
      const sums = new Map<number, number>();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        sums.set(key, (sums.get(key) || 0) + values[i]);
      }

      expect(sums.get(0)).toBeCloseTo(100); // 10 + 30 + 60
      expect(sums.get(1)).toBeCloseTo(150); // 20 + 50 + 80
      expect(sums.get(2)).toBeCloseTo(110); // 40 + 70
    });

    it('should compute mean aggregation per group', () => {
      const keys = new Int32Array([0, 1, 0, 2, 1, 0, 2, 1]);
      const values = new Float32Array([10, 20, 30, 40, 50, 60, 70, 80]);

      // Group, sum, and count
      const sums = new Map<number, number>();
      const counts = new Map<number, number>();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        sums.set(key, (sums.get(key) || 0) + values[i]);
        counts.set(key, (counts.get(key) || 0) + 1);
      }

      // Compute means
      const means = new Map<number, number>();
      for (const [key, sum] of sums) {
        means.set(key, sum / counts.get(key)!);
      }

      expect(means.get(0)).toBeCloseTo(100 / 3); // ~33.33
      expect(means.get(1)).toBeCloseTo(150 / 3); // 50
      expect(means.get(2)).toBeCloseTo(110 / 2); // 55
    });
  });

  describe('Multiple Value Columns', () => {
    it('should aggregate multiple columns simultaneously', () => {
      const keys = new Int32Array([0, 1, 0, 1]);
      const pop1 = new Float32Array([100, 200, 300, 400]);
      const pop2 = new Float32Array([10, 20, 30, 40]);

      // Group and sum both columns
      const sums1 = new Map<number, number>();
      const sums2 = new Map<number, number>();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        sums1.set(key, (sums1.get(key) || 0) + pop1[i]);
        sums2.set(key, (sums2.get(key) || 0) + pop2[i]);
      }

      expect(sums1.get(0)).toBeCloseTo(400); // 100 + 300
      expect(sums1.get(1)).toBeCloseTo(600); // 200 + 400
      expect(sums2.get(0)).toBeCloseTo(40);  // 10 + 30
      expect(sums2.get(1)).toBeCloseTo(60);  // 20 + 40
    });
  });
});
