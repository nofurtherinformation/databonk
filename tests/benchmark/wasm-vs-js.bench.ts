/**
 * WASM vs JavaScript Performance Benchmark
 *
 * Compares the performance of WASM SIMD operations against pure JavaScript.
 *
 * Run with: npx vitest bench tests/benchmark/wasm-vs-js.bench.ts
 */

import { describe, bench, beforeAll } from 'vitest';
import { loadDatabonk, DatabonkModule, allocateAndCopy } from '../../src';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const SIZE = 1_000_000; // 1 million elements

// Pre-generate test data at module load time
const f32Data = new Float32Array(SIZE);
const f64Data = new Float64Array(SIZE);

for (let i = 0; i < SIZE; i++) {
  f32Data[i] = Math.random() * 100;
  f64Data[i] = Math.random() * 100;
}

// Module-level state for WASM
let module: DatabonkModule | null = null;
let f32Ptr = 0;
let f64Ptr = 0;

// Helper to ensure module is loaded
async function ensureModule(): Promise<DatabonkModule> {
  if (!module) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const wasmPath = join(__dirname, '..', '..', 'build', 'release.wasm');
    module = await loadDatabonk({ wasmPath, sharedMemory: true });
    f32Ptr = allocateAndCopy(module, f32Data);
    f64Ptr = allocateAndCopy(module, f64Data);
  }
  return module;
}

// Initialize before all benchmarks
describe('WASM Benchmark Suite', () => {
  beforeAll(async () => {
    await ensureModule();
  });

  describe('Sum Benchmark (1M elements)', () => {
    bench('Sum F32 - JavaScript reduce', () => {
      let sum = 0;
      for (let i = 0; i < f32Data.length; i++) {
        sum += f32Data[i];
      }
      return sum;
    });

    bench('Sum F32 - WASM SIMD', async () => {
      const m = await ensureModule();
      return m.exports.simdSumF32(f32Ptr, SIZE);
    });

    bench('Sum F64 - JavaScript reduce', () => {
      let sum = 0;
      for (let i = 0; i < f64Data.length; i++) {
        sum += f64Data[i];
      }
      return sum;
    });

    bench('Sum F64 - WASM SIMD', async () => {
      const m = await ensureModule();
      return m.exports.simdSumF64(f64Ptr, SIZE);
    });
  });

  describe('Min Benchmark (1M elements)', () => {
    bench('Min F32 - JavaScript loop', () => {
      let min = Infinity;
      for (let i = 0; i < f32Data.length; i++) {
        if (f32Data[i] < min) min = f32Data[i];
      }
      return min;
    });

    bench('Min F32 - WASM SIMD', async () => {
      const m = await ensureModule();
      return m.exports.simdMinF32(f32Ptr, SIZE);
    });

    bench('Min F64 - JavaScript loop', () => {
      let min = Infinity;
      for (let i = 0; i < f64Data.length; i++) {
        if (f64Data[i] < min) min = f64Data[i];
      }
      return min;
    });

    bench('Min F64 - WASM SIMD', async () => {
      const m = await ensureModule();
      return m.exports.simdMinF64(f64Ptr, SIZE);
    });
  });

  describe('Max Benchmark (1M elements)', () => {
    bench('Max F32 - JavaScript loop', () => {
      let max = -Infinity;
      for (let i = 0; i < f32Data.length; i++) {
        if (f32Data[i] > max) max = f32Data[i];
      }
      return max;
    });

    bench('Max F32 - WASM SIMD', async () => {
      const m = await ensureModule();
      return m.exports.simdMaxF32(f32Ptr, SIZE);
    });

    bench('Max F64 - JavaScript loop', () => {
      let max = -Infinity;
      for (let i = 0; i < f64Data.length; i++) {
        if (f64Data[i] > max) max = f64Data[i];
      }
      return max;
    });

    bench('Max F64 - WASM SIMD', async () => {
      const m = await ensureModule();
      return m.exports.simdMaxF64(f64Ptr, SIZE);
    });
  });

  describe('Combined Statistics (1M elements)', () => {
    bench('Sum+Min+Max F32 - JavaScript', () => {
      let sum = 0;
      let min = Infinity;
      let max = -Infinity;
      for (let i = 0; i < f32Data.length; i++) {
        const v = f32Data[i];
        sum += v;
        if (v < min) min = v;
        if (v > max) max = v;
      }
      return { sum, min, max };
    });

    bench('Sum+Min+Max F32 - WASM SIMD (3 calls)', async () => {
      const m = await ensureModule();
      const sum = m.exports.simdSumF32(f32Ptr, SIZE);
      const min = m.exports.simdMinF32(f32Ptr, SIZE);
      const max = m.exports.simdMaxF32(f32Ptr, SIZE);
      return { sum, min, max };
    });
  });
});

// Pure JS benchmarks that don't need WASM
describe('GroupBy Sum Benchmark (JS only)', () => {
  const GROUP_SIZE = 100_000;
  const NUM_GROUPS = 100;

  // Generate grouped data
  const groupKeys = new Int32Array(GROUP_SIZE);
  const groupValues = new Float32Array(GROUP_SIZE);

  for (let i = 0; i < GROUP_SIZE; i++) {
    groupKeys[i] = i % NUM_GROUPS;
    groupValues[i] = Math.random() * 100;
  }

  bench('GroupBy Sum - JavaScript Map', () => {
    const groups = new Map<number, number>();
    for (let i = 0; i < GROUP_SIZE; i++) {
      const key = groupKeys[i];
      const current = groups.get(key) || 0;
      groups.set(key, current + groupValues[i]);
    }
    return groups;
  });

  bench('GroupBy Sum - JavaScript Array (pre-allocated)', () => {
    const sums = new Float64Array(NUM_GROUPS);
    for (let i = 0; i < GROUP_SIZE; i++) {
      sums[groupKeys[i]] += groupValues[i];
    }
    return sums;
  });
});

describe('Hash Join Benchmark (JS only)', () => {
  const LEFT_SIZE = 100_000;
  const RIGHT_SIZE = 10_000;

  // Generate join data
  const leftKeys = new Int32Array(LEFT_SIZE);
  const rightKeys = new Int32Array(RIGHT_SIZE);

  for (let i = 0; i < LEFT_SIZE; i++) {
    leftKeys[i] = Math.floor(Math.random() * 50_000);
  }

  for (let i = 0; i < RIGHT_SIZE; i++) {
    rightKeys[i] = Math.floor(Math.random() * 50_000);
  }

  bench('Hash Join - JavaScript Map', () => {
    // Build hash table on right side
    const rightMap = new Map<number, number[]>();
    for (let i = 0; i < RIGHT_SIZE; i++) {
      const key = rightKeys[i];
      if (!rightMap.has(key)) {
        rightMap.set(key, []);
      }
      rightMap.get(key)!.push(i);
    }

    // Probe from left side
    let matchCount = 0;
    for (let i = 0; i < LEFT_SIZE; i++) {
      const matches = rightMap.get(leftKeys[i]);
      if (matches) {
        matchCount += matches.length;
      }
    }
    return matchCount;
  });
});

describe('Memory Allocation Benchmark', () => {
  const ALLOC_SIZE = 1_000_000 * 4; // 4MB

  bench('Allocate 4MB - JavaScript TypedArray', () => {
    const arr = new Float32Array(1_000_000);
    return arr.length;
  });

  bench('Allocate 4MB - WASM heap', async () => {
    const m = await ensureModule();
    const ptr = m.exports.allocateBuffer(ALLOC_SIZE);
    m.exports.freeBuffer(ptr);
    return ptr;
  });

  bench('Allocate+Copy 4MB - JavaScript to WASM', async () => {
    const m = await ensureModule();
    const data = new Float32Array(1_000_000);
    const ptr = allocateAndCopy(m, data);
    m.exports.freeBuffer(ptr);
    return ptr;
  });
});
