/**
 * SIMD-accelerated arithmetic operations on columns
 */

import { f32x4Splat, f64x2Splat } from './simd-utils';

// =============================================================================
// Float32 SIMD Arithmetic (4 values per v128)
// =============================================================================

/**
 * Add two Float32 arrays element-wise, storing result in destination
 */
export function simdAddF32(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3; // Process 4 at a time

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f32x4.add(a, b));
    i += 4;
  }

  // Handle remaining elements
  while (i < length) {
    const offset = i << 2;
    store<f32>(dstPtr + offset, load<f32>(aPtr + offset) + load<f32>(bPtr + offset));
    i++;
  }
}

/**
 * Subtract two Float32 arrays element-wise (a - b)
 */
export function simdSubF32(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f32x4.sub(a, b));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<f32>(dstPtr + offset, load<f32>(aPtr + offset) - load<f32>(bPtr + offset));
    i++;
  }
}

/**
 * Multiply two Float32 arrays element-wise
 */
export function simdMulF32(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f32x4.mul(a, b));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<f32>(dstPtr + offset, load<f32>(aPtr + offset) * load<f32>(bPtr + offset));
    i++;
  }
}

/**
 * Divide two Float32 arrays element-wise (a / b)
 */
export function simdDivF32(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f32x4.div(a, b));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<f32>(dstPtr + offset, load<f32>(aPtr + offset) / load<f32>(bPtr + offset));
    i++;
  }
}

/**
 * Multiply Float32 array by scalar
 */
export function simdScalarMulF32(srcPtr: usize, scalar: f32, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;
  const scalarVec = f32x4Splat(scalar);

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(srcPtr + offset);
    v128.store(dstPtr + offset, f32x4.mul(a, scalarVec));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<f32>(dstPtr + offset, load<f32>(srcPtr + offset) * scalar);
    i++;
  }
}

/**
 * Add scalar to Float32 array
 */
export function simdScalarAddF32(srcPtr: usize, scalar: f32, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;
  const scalarVec = f32x4Splat(scalar);

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(srcPtr + offset);
    v128.store(dstPtr + offset, f32x4.add(a, scalarVec));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<f32>(dstPtr + offset, load<f32>(srcPtr + offset) + scalar);
    i++;
  }
}

// =============================================================================
// Float64 SIMD Arithmetic (2 values per v128)
// =============================================================================

/**
 * Add two Float64 arrays element-wise
 */
export function simdAddF64(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~1; // Process 2 at a time

  while (i < simdLength) {
    const offset = i << 3;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f64x2.add(a, b));
    i += 2;
  }

  // Handle remaining element
  if (i < length) {
    const offset = i << 3;
    store<f64>(dstPtr + offset, load<f64>(aPtr + offset) + load<f64>(bPtr + offset));
  }
}

/**
 * Subtract two Float64 arrays element-wise (a - b)
 */
export function simdSubF64(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~1;

  while (i < simdLength) {
    const offset = i << 3;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f64x2.sub(a, b));
    i += 2;
  }

  if (i < length) {
    const offset = i << 3;
    store<f64>(dstPtr + offset, load<f64>(aPtr + offset) - load<f64>(bPtr + offset));
  }
}

/**
 * Multiply two Float64 arrays element-wise
 */
export function simdMulF64(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~1;

  while (i < simdLength) {
    const offset = i << 3;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f64x2.mul(a, b));
    i += 2;
  }

  if (i < length) {
    const offset = i << 3;
    store<f64>(dstPtr + offset, load<f64>(aPtr + offset) * load<f64>(bPtr + offset));
  }
}

/**
 * Divide two Float64 arrays element-wise (a / b)
 */
export function simdDivF64(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~1;

  while (i < simdLength) {
    const offset = i << 3;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, f64x2.div(a, b));
    i += 2;
  }

  if (i < length) {
    const offset = i << 3;
    store<f64>(dstPtr + offset, load<f64>(aPtr + offset) / load<f64>(bPtr + offset));
  }
}

/**
 * Multiply Float64 array by scalar
 */
export function simdScalarMulF64(srcPtr: usize, scalar: f64, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~1;
  const scalarVec = f64x2Splat(scalar);

  while (i < simdLength) {
    const offset = i << 3;
    const a = v128.load(srcPtr + offset);
    v128.store(dstPtr + offset, f64x2.mul(a, scalarVec));
    i += 2;
  }

  if (i < length) {
    const offset = i << 3;
    store<f64>(dstPtr + offset, load<f64>(srcPtr + offset) * scalar);
  }
}

/**
 * Add scalar to Float64 array
 */
export function simdScalarAddF64(srcPtr: usize, scalar: f64, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~1;
  const scalarVec = f64x2Splat(scalar);

  while (i < simdLength) {
    const offset = i << 3;
    const a = v128.load(srcPtr + offset);
    v128.store(dstPtr + offset, f64x2.add(a, scalarVec));
    i += 2;
  }

  if (i < length) {
    const offset = i << 3;
    store<f64>(dstPtr + offset, load<f64>(srcPtr + offset) + scalar);
  }
}

// =============================================================================
// Int32 SIMD Arithmetic (4 values per v128)
// =============================================================================

/**
 * Add two Int32 arrays element-wise
 */
export function simdAddI32(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, i32x4.add(a, b));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<i32>(dstPtr + offset, load<i32>(aPtr + offset) + load<i32>(bPtr + offset));
    i++;
  }
}

/**
 * Subtract two Int32 arrays element-wise (a - b)
 */
export function simdSubI32(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, i32x4.sub(a, b));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<i32>(dstPtr + offset, load<i32>(aPtr + offset) - load<i32>(bPtr + offset));
    i++;
  }
}

/**
 * Multiply two Int32 arrays element-wise
 */
export function simdMulI32(aPtr: usize, bPtr: usize, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(aPtr + offset);
    const b = v128.load(bPtr + offset);
    v128.store(dstPtr + offset, i32x4.mul(a, b));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<i32>(dstPtr + offset, load<i32>(aPtr + offset) * load<i32>(bPtr + offset));
    i++;
  }
}

/**
 * Multiply Int32 array by scalar
 */
export function simdScalarMulI32(srcPtr: usize, scalar: i32, dstPtr: usize, length: i32): void {
  let i: i32 = 0;
  const simdLength = length & ~3;
  const scalarVec = i32x4.splat(scalar);

  while (i < simdLength) {
    const offset = i << 2;
    const a = v128.load(srcPtr + offset);
    v128.store(dstPtr + offset, i32x4.mul(a, scalarVec));
    i += 4;
  }

  while (i < length) {
    const offset = i << 2;
    store<i32>(dstPtr + offset, load<i32>(srcPtr + offset) * scalar);
    i++;
  }
}
