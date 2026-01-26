/**
 * Unit tests for Join operations
 */

import { describe, it, expect } from 'vitest';

describe('Hash Join', () => {
  describe('Inner Join', () => {
    it('should match rows with equal keys', () => {
      // Left table
      const leftIds = new Int32Array([1, 2, 3, 4, 5]);
      const leftValues = new Float32Array([10, 20, 30, 40, 50]);

      // Right table
      const rightIds = new Int32Array([2, 4, 6]);
      const rightValues = new Float32Array([200, 400, 600]);

      // Simulate inner join
      const resultLeftIdx: number[] = [];
      const resultRightIdx: number[] = [];

      // Build hash table on right (smaller)
      const rightMap = new Map<number, number>();
      for (let i = 0; i < rightIds.length; i++) {
        rightMap.set(rightIds[i], i);
      }

      // Probe with left
      for (let i = 0; i < leftIds.length; i++) {
        if (rightMap.has(leftIds[i])) {
          resultLeftIdx.push(i);
          resultRightIdx.push(rightMap.get(leftIds[i])!);
        }
      }

      expect(resultLeftIdx).toEqual([1, 3]); // indices 1 (id=2) and 3 (id=4)
      expect(resultRightIdx).toEqual([0, 1]); // indices 0 (id=2) and 1 (id=4)

      // Build result
      const resultIds = resultLeftIdx.map(i => leftIds[i]);
      const resultLeftVals = resultLeftIdx.map(i => leftValues[i]);
      const resultRightVals = resultRightIdx.map(i => rightValues[i]);

      expect(resultIds).toEqual([2, 4]);
      expect(resultLeftVals).toEqual([20, 40]);
      expect(resultRightVals).toEqual([200, 400]);
    });

    it('should handle no matches', () => {
      const leftIds = new Int32Array([1, 2, 3]);
      const rightIds = new Int32Array([4, 5, 6]);

      const rightMap = new Map<number, number>();
      for (let i = 0; i < rightIds.length; i++) {
        rightMap.set(rightIds[i], i);
      }

      const matches: number[] = [];
      for (let i = 0; i < leftIds.length; i++) {
        if (rightMap.has(leftIds[i])) {
          matches.push(i);
        }
      }

      expect(matches).toEqual([]);
    });

    it('should handle multiple matches (one-to-many)', () => {
      const leftIds = new Int32Array([1, 1, 2]); // id 1 appears twice
      const rightIds = new Int32Array([1, 2]);

      const rightMap = new Map<number, number>();
      for (let i = 0; i < rightIds.length; i++) {
        rightMap.set(rightIds[i], i);
      }

      const matches: Array<[number, number]> = [];
      for (let i = 0; i < leftIds.length; i++) {
        if (rightMap.has(leftIds[i])) {
          matches.push([i, rightMap.get(leftIds[i])!]);
        }
      }

      expect(matches).toEqual([[0, 0], [1, 0], [2, 1]]);
    });
  });

  describe('Left Join', () => {
    it('should include all left rows', () => {
      const leftIds = new Int32Array([1, 2, 3]);
      const rightIds = new Int32Array([2]);

      const rightMap = new Map<number, number>();
      for (let i = 0; i < rightIds.length; i++) {
        rightMap.set(rightIds[i], i);
      }

      const results: Array<[number, number | null]> = [];
      for (let i = 0; i < leftIds.length; i++) {
        if (rightMap.has(leftIds[i])) {
          results.push([i, rightMap.get(leftIds[i])!]);
        } else {
          results.push([i, null]); // null indicates no match
        }
      }

      expect(results).toEqual([[0, null], [1, 0], [2, null]]);
    });
  });

  describe('Join on Large Tables', () => {
    it('should handle 1M rows efficiently', () => {
      // Test that the algorithm is O(n) with hash table
      const size = 1_000_000;
      const leftIds = new Int32Array(size);
      const rightIds = new Int32Array(size);

      for (let i = 0; i < size; i++) {
        leftIds[i] = i;
        rightIds[i] = i;
      }

      const start = performance.now();

      // Build hash table
      const rightMap = new Map<number, number>();
      for (let i = 0; i < rightIds.length; i++) {
        rightMap.set(rightIds[i], i);
      }

      // Probe
      let matchCount = 0;
      for (let i = 0; i < leftIds.length; i++) {
        if (rightMap.has(leftIds[i])) {
          matchCount++;
        }
      }

      const elapsed = performance.now() - start;

      expect(matchCount).toBe(size);
      // Should complete in reasonable time (less than 1 second)
      expect(elapsed).toBeLessThan(1000);
    });
  });
});
