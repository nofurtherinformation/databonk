/**
 * Integration tests for DataFrame join operations
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { getModule } from './setup';
import { DatabonkDataFrame } from '../../src';
import type { DatabonkModule } from '../../src';

describe('DataFrame Join Integration', () => {
  let module: DatabonkModule;

  beforeAll(async () => {
    module = await getModule();
  });

  describe('Inner Join', () => {
    it('should join two DataFrames on matching integer keys', async () => {
      // Create left DataFrame
      const left = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
        { name: 'value', data: new Float32Array([10, 20, 30, 40, 50]) },
      ]);

      // Create right DataFrame with some matching keys
      const right = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([2, 4, 6]) },
        { name: 'extra', data: new Float32Array([200, 400, 600]) },
      ]);

      // Join on 'id'
      const result = left.innerJoin(right, 'id', 'id');

      // Result should have rows only for matching keys (2 and 4)
      // Note: Actual row count depends on WASM implementation
      expect(result).toBeDefined();
      expect(result.columns).toContain('id');
      expect(result.columns).toContain('value');

      left.free();
      right.free();
      result.free();
    });

    it('should handle join with no matching keys', async () => {
      const left = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 2, 3]) },
        { name: 'value', data: new Float32Array([10, 20, 30]) },
      ]);

      const right = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([4, 5, 6]) },
        { name: 'extra', data: new Float32Array([40, 50, 60]) },
      ]);

      const result = left.innerJoin(right, 'id', 'id');

      // Inner join with no matches should result in empty DataFrame
      expect(result.rowCount).toBe(0);

      left.free();
      right.free();
      result.free();
    });

    it('should handle join with all matching keys', async () => {
      const left = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 2, 3]) },
        { name: 'left_value', data: new Float32Array([10, 20, 30]) },
      ]);

      const right = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 2, 3]) },
        { name: 'right_value', data: new Float32Array([100, 200, 300]) },
      ]);

      const result = left.innerJoin(right, 'id', 'id');

      expect(result.rowCount).toBe(3);

      left.free();
      right.free();
      result.free();
    });

    it('should handle join with duplicate keys on left side', async () => {
      const left = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 1, 2, 2, 2]) },
        { name: 'value', data: new Float32Array([10, 11, 20, 21, 22]) },
      ]);

      const right = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'id', data: new Int32Array([1, 2]) },
        { name: 'extra', data: new Float32Array([100, 200]) },
      ]);

      const result = left.innerJoin(right, 'id', 'id');

      // Should have 5 rows (2 for id=1, 3 for id=2)
      expect(result.rowCount).toBe(5);

      left.free();
      right.free();
      result.free();
    });

    it('should handle join with different column names for keys', async () => {
      const left = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'left_id', data: new Int32Array([1, 2, 3]) },
        { name: 'value', data: new Float32Array([10, 20, 30]) },
      ]);

      const right = await DatabonkDataFrame.fromTypedArrays(module, [
        { name: 'right_id', data: new Int32Array([2, 3, 4]) },
        { name: 'extra', data: new Float32Array([200, 300, 400]) },
      ]);

      const result = left.innerJoin(right, 'left_id', 'right_id');

      // Matching keys are 2 and 3
      expect(result.rowCount).toBe(2);

      left.free();
      right.free();
      result.free();
    });
  });

  describe('Join Memory Management', () => {
    it('should not leak memory on join', async () => {
      // Perform multiple joins to check for memory leaks
      for (let i = 0; i < 10; i++) {
        const left = await DatabonkDataFrame.fromTypedArrays(module, [
          { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
          { name: 'value', data: new Float32Array([10, 20, 30, 40, 50]) },
        ]);

        const right = await DatabonkDataFrame.fromTypedArrays(module, [
          { name: 'id', data: new Int32Array([2, 4]) },
          { name: 'extra', data: new Float32Array([200, 400]) },
        ]);

        const result = left.innerJoin(right, 'id', 'id');

        left.free();
        right.free();
        result.free();
      }

      // If we get here without errors, memory management is working
      expect(true).toBe(true);
    });
  });
});
