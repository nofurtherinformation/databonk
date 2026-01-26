/**
 * SIMD-accelerated aggregation operations
 * Uses multiple accumulators to hide latency and maximize throughput
 */

import {
  f32x4Splat,
  f64x2Splat,
  f32x4HorizontalSum,
  f64x2HorizontalSum,
  f32x4HorizontalMin,
  f64x2HorizontalMin,
  f32x4HorizontalMax,
  f64x2HorizontalMax,
} from './simd-utils';

// =============================================================================
// Float32 SIMD Aggregations (4 values per v128)
// =============================================================================

/**
 * SIMD sum for Float32 array
 * Uses 4 accumulators to hide latency, processing 16 values per iteration
 */
export function simdSumF32(ptr: usize, length: i32): f32 {
  let sum: f32 = 0;
  let i: i32 = 0;

  // Process 16 values per iteration with 4 accumulators
  const unrollLength = length & ~15; // length - (length % 16)

  if (unrollLength > 0) {
    let acc0 = f32x4Splat(0);
    let acc1 = f32x4Splat(0);
    let acc2 = f32x4Splat(0);
    let acc3 = f32x4Splat(0);

    while (i < unrollLength) {
      acc0 = f32x4.add(acc0, v128.load(ptr + (i << 2)));
      acc1 = f32x4.add(acc1, v128.load(ptr + ((i + 4) << 2)));
      acc2 = f32x4.add(acc2, v128.load(ptr + ((i + 8) << 2)));
      acc3 = f32x4.add(acc3, v128.load(ptr + ((i + 12) << 2)));
      i += 16;
    }

    // Combine accumulators
    acc0 = f32x4.add(acc0, acc1);
    acc2 = f32x4.add(acc2, acc3);
    acc0 = f32x4.add(acc0, acc2);

    // Horizontal sum
    sum = f32x4HorizontalSum(acc0);
  }

  // Handle remaining elements
  while (i < length) {
    sum += load<f32>(ptr + (i << 2));
    i++;
  }

  return sum;
}

/**
 * SIMD minimum for Float32 array
 */
export function simdMinF32(ptr: usize, length: i32): f32 {
  if (length === 0) return Infinity;

  let minVal: f32 = Infinity;
  let i: i32 = 0;

  // Process 16 values per iteration with 4 accumulators
  const unrollLength = length & ~15;

  if (unrollLength > 0) {
    let acc0 = f32x4Splat(Infinity);
    let acc1 = f32x4Splat(Infinity);
    let acc2 = f32x4Splat(Infinity);
    let acc3 = f32x4Splat(Infinity);

    while (i < unrollLength) {
      acc0 = f32x4.min(acc0, v128.load(ptr + (i << 2)));
      acc1 = f32x4.min(acc1, v128.load(ptr + ((i + 4) << 2)));
      acc2 = f32x4.min(acc2, v128.load(ptr + ((i + 8) << 2)));
      acc3 = f32x4.min(acc3, v128.load(ptr + ((i + 12) << 2)));
      i += 16;
    }

    // Combine accumulators
    acc0 = f32x4.min(acc0, acc1);
    acc2 = f32x4.min(acc2, acc3);
    acc0 = f32x4.min(acc0, acc2);

    minVal = f32x4HorizontalMin(acc0);
  }

  // Handle remaining elements
  while (i < length) {
    const val = load<f32>(ptr + (i << 2));
    if (val < minVal) minVal = val;
    i++;
  }

  return minVal;
}

/**
 * SIMD maximum for Float32 array
 */
export function simdMaxF32(ptr: usize, length: i32): f32 {
  if (length === 0) return -Infinity;

  let maxVal: f32 = -Infinity;
  let i: i32 = 0;

  // Process 16 values per iteration with 4 accumulators
  const unrollLength = length & ~15;

  if (unrollLength > 0) {
    let acc0 = f32x4Splat(-Infinity);
    let acc1 = f32x4Splat(-Infinity);
    let acc2 = f32x4Splat(-Infinity);
    let acc3 = f32x4Splat(-Infinity);

    while (i < unrollLength) {
      acc0 = f32x4.max(acc0, v128.load(ptr + (i << 2)));
      acc1 = f32x4.max(acc1, v128.load(ptr + ((i + 4) << 2)));
      acc2 = f32x4.max(acc2, v128.load(ptr + ((i + 8) << 2)));
      acc3 = f32x4.max(acc3, v128.load(ptr + ((i + 12) << 2)));
      i += 16;
    }

    // Combine accumulators
    acc0 = f32x4.max(acc0, acc1);
    acc2 = f32x4.max(acc2, acc3);
    acc0 = f32x4.max(acc0, acc2);

    maxVal = f32x4HorizontalMax(acc0);
  }

  // Handle remaining elements
  while (i < length) {
    const val = load<f32>(ptr + (i << 2));
    if (val > maxVal) maxVal = val;
    i++;
  }

  return maxVal;
}

// =============================================================================
// Float64 SIMD Aggregations (2 values per v128)
// =============================================================================

/**
 * SIMD sum for Float64 array
 * Uses 4 accumulators to hide latency, processing 8 values per iteration
 */
export function simdSumF64(ptr: usize, length: i32): f64 {
  let sum: f64 = 0;
  let i: i32 = 0;

  // Process 8 values per iteration with 4 accumulators
  const unrollLength = length & ~7; // length - (length % 8)

  if (unrollLength > 0) {
    let acc0 = f64x2Splat(0);
    let acc1 = f64x2Splat(0);
    let acc2 = f64x2Splat(0);
    let acc3 = f64x2Splat(0);

    while (i < unrollLength) {
      acc0 = f64x2.add(acc0, v128.load(ptr + (i << 3)));
      acc1 = f64x2.add(acc1, v128.load(ptr + ((i + 2) << 3)));
      acc2 = f64x2.add(acc2, v128.load(ptr + ((i + 4) << 3)));
      acc3 = f64x2.add(acc3, v128.load(ptr + ((i + 6) << 3)));
      i += 8;
    }

    // Combine accumulators
    acc0 = f64x2.add(acc0, acc1);
    acc2 = f64x2.add(acc2, acc3);
    acc0 = f64x2.add(acc0, acc2);

    // Horizontal sum
    sum = f64x2HorizontalSum(acc0);
  }

  // Handle remaining elements
  while (i < length) {
    sum += load<f64>(ptr + (i << 3));
    i++;
  }

  return sum;
}

/**
 * SIMD minimum for Float64 array
 */
export function simdMinF64(ptr: usize, length: i32): f64 {
  if (length === 0) return Infinity;

  let minVal: f64 = Infinity;
  let i: i32 = 0;

  // Process 8 values per iteration with 4 accumulators
  const unrollLength = length & ~7;

  if (unrollLength > 0) {
    let acc0 = f64x2Splat(Infinity);
    let acc1 = f64x2Splat(Infinity);
    let acc2 = f64x2Splat(Infinity);
    let acc3 = f64x2Splat(Infinity);

    while (i < unrollLength) {
      acc0 = f64x2.min(acc0, v128.load(ptr + (i << 3)));
      acc1 = f64x2.min(acc1, v128.load(ptr + ((i + 2) << 3)));
      acc2 = f64x2.min(acc2, v128.load(ptr + ((i + 4) << 3)));
      acc3 = f64x2.min(acc3, v128.load(ptr + ((i + 6) << 3)));
      i += 8;
    }

    // Combine accumulators
    acc0 = f64x2.min(acc0, acc1);
    acc2 = f64x2.min(acc2, acc3);
    acc0 = f64x2.min(acc0, acc2);

    minVal = f64x2HorizontalMin(acc0);
  }

  // Handle remaining elements
  while (i < length) {
    const val = load<f64>(ptr + (i << 3));
    if (val < minVal) minVal = val;
    i++;
  }

  return minVal;
}

/**
 * SIMD maximum for Float64 array
 */
export function simdMaxF64(ptr: usize, length: i32): f64 {
  if (length === 0) return -Infinity;

  let maxVal: f64 = -Infinity;
  let i: i32 = 0;

  // Process 8 values per iteration with 4 accumulators
  const unrollLength = length & ~7;

  if (unrollLength > 0) {
    let acc0 = f64x2Splat(-Infinity);
    let acc1 = f64x2Splat(-Infinity);
    let acc2 = f64x2Splat(-Infinity);
    let acc3 = f64x2Splat(-Infinity);

    while (i < unrollLength) {
      acc0 = f64x2.max(acc0, v128.load(ptr + (i << 3)));
      acc1 = f64x2.max(acc1, v128.load(ptr + ((i + 2) << 3)));
      acc2 = f64x2.max(acc2, v128.load(ptr + ((i + 4) << 3)));
      acc3 = f64x2.max(acc3, v128.load(ptr + ((i + 6) << 3)));
      i += 8;
    }

    // Combine accumulators
    acc0 = f64x2.max(acc0, acc1);
    acc2 = f64x2.max(acc2, acc3);
    acc0 = f64x2.max(acc0, acc2);

    maxVal = f64x2HorizontalMax(acc0);
  }

  // Handle remaining elements
  while (i < length) {
    const val = load<f64>(ptr + (i << 3));
    if (val > maxVal) maxVal = val;
    i++;
  }

  return maxVal;
}

// =============================================================================
// Int32 SIMD Aggregations
// =============================================================================

/**
 * SIMD sum for Int32 array (returns i64 to avoid overflow)
 */
export function simdSumI32(ptr: usize, length: i32): i64 {
  let sum: i64 = 0;
  let i: i32 = 0;

  // For i32, we accumulate into i64 to prevent overflow
  // Process 4 values at a time using scalar since i32x4 doesn't have a direct i64 accumulator
  const unrollLength = length & ~3;

  while (i < unrollLength) {
    sum += load<i32>(ptr + (i << 2));
    sum += load<i32>(ptr + ((i + 1) << 2));
    sum += load<i32>(ptr + ((i + 2) << 2));
    sum += load<i32>(ptr + ((i + 3) << 2));
    i += 4;
  }

  // Handle remaining elements
  while (i < length) {
    sum += load<i32>(ptr + (i << 2));
    i++;
  }

  return sum;
}

/**
 * SIMD minimum for Int32 array
 */
export function simdMinI32(ptr: usize, length: i32): i32 {
  if (length === 0) return i32.MAX_VALUE;

  let minVal: i32 = i32.MAX_VALUE;
  let i: i32 = 0;

  // Process 16 values per iteration with 4 accumulators
  const unrollLength = length & ~15;

  if (unrollLength > 0) {
    let acc0 = i32x4.splat(i32.MAX_VALUE);
    let acc1 = i32x4.splat(i32.MAX_VALUE);
    let acc2 = i32x4.splat(i32.MAX_VALUE);
    let acc3 = i32x4.splat(i32.MAX_VALUE);

    while (i < unrollLength) {
      acc0 = i32x4.min_s(acc0, v128.load(ptr + (i << 2)));
      acc1 = i32x4.min_s(acc1, v128.load(ptr + ((i + 4) << 2)));
      acc2 = i32x4.min_s(acc2, v128.load(ptr + ((i + 8) << 2)));
      acc3 = i32x4.min_s(acc3, v128.load(ptr + ((i + 12) << 2)));
      i += 16;
    }

    // Combine accumulators
    acc0 = i32x4.min_s(acc0, acc1);
    acc2 = i32x4.min_s(acc2, acc3);
    acc0 = i32x4.min_s(acc0, acc2);

    // Horizontal min
    minVal = min(
      min(i32x4.extract_lane(acc0, 0), i32x4.extract_lane(acc0, 1)),
      min(i32x4.extract_lane(acc0, 2), i32x4.extract_lane(acc0, 3))
    );
  }

  // Handle remaining elements
  while (i < length) {
    const val = load<i32>(ptr + (i << 2));
    if (val < minVal) minVal = val;
    i++;
  }

  return minVal;
}

/**
 * SIMD maximum for Int32 array
 */
export function simdMaxI32(ptr: usize, length: i32): i32 {
  if (length === 0) return i32.MIN_VALUE;

  let maxVal: i32 = i32.MIN_VALUE;
  let i: i32 = 0;

  // Process 16 values per iteration with 4 accumulators
  const unrollLength = length & ~15;

  if (unrollLength > 0) {
    let acc0 = i32x4.splat(i32.MIN_VALUE);
    let acc1 = i32x4.splat(i32.MIN_VALUE);
    let acc2 = i32x4.splat(i32.MIN_VALUE);
    let acc3 = i32x4.splat(i32.MIN_VALUE);

    while (i < unrollLength) {
      acc0 = i32x4.max_s(acc0, v128.load(ptr + (i << 2)));
      acc1 = i32x4.max_s(acc1, v128.load(ptr + ((i + 4) << 2)));
      acc2 = i32x4.max_s(acc2, v128.load(ptr + ((i + 8) << 2)));
      acc3 = i32x4.max_s(acc3, v128.load(ptr + ((i + 12) << 2)));
      i += 16;
    }

    // Combine accumulators
    acc0 = i32x4.max_s(acc0, acc1);
    acc2 = i32x4.max_s(acc2, acc3);
    acc0 = i32x4.max_s(acc0, acc2);

    // Horizontal max
    maxVal = max(
      max(i32x4.extract_lane(acc0, 0), i32x4.extract_lane(acc0, 1)),
      max(i32x4.extract_lane(acc0, 2), i32x4.extract_lane(acc0, 3))
    );
  }

  // Handle remaining elements
  while (i < length) {
    const val = load<i32>(ptr + (i << 2));
    if (val > maxVal) maxVal = val;
    i++;
  }

  return maxVal;
}
