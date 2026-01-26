/**
 * SIMD utilities and helper functions
 */

/** Create a v128 with all f32 lanes set to the same value */
@inline
export function f32x4Splat(value: f32): v128 {
  return f32x4.splat(value);
}

/** Create a v128 with all f64 lanes set to the same value */
@inline
export function f64x2Splat(value: f64): v128 {
  return f64x2.splat(value);
}

/** Create a v128 with all i32 lanes set to the same value */
@inline
export function i32x4Splat(value: i32): v128 {
  return i32x4.splat(value);
}

/** Create a v128 with all i64 lanes set to the same value */
@inline
export function i64x2Splat(value: i64): v128 {
  return i64x2.splat(value);
}

/** Horizontal sum of f32x4 vector */
@inline
export function f32x4HorizontalSum(v: v128): f32 {
  return (
    f32x4.extract_lane(v, 0) +
    f32x4.extract_lane(v, 1) +
    f32x4.extract_lane(v, 2) +
    f32x4.extract_lane(v, 3)
  );
}

/** Horizontal sum of f64x2 vector */
@inline
export function f64x2HorizontalSum(v: v128): f64 {
  return f64x2.extract_lane(v, 0) + f64x2.extract_lane(v, 1);
}

/** Horizontal minimum of f32x4 vector */
@inline
export function f32x4HorizontalMin(v: v128): f32 {
  const a = min(f32x4.extract_lane(v, 0), f32x4.extract_lane(v, 1));
  const b = min(f32x4.extract_lane(v, 2), f32x4.extract_lane(v, 3));
  return min(a, b);
}

/** Horizontal minimum of f64x2 vector */
@inline
export function f64x2HorizontalMin(v: v128): f64 {
  return min(f64x2.extract_lane(v, 0), f64x2.extract_lane(v, 1));
}

/** Horizontal maximum of f32x4 vector */
@inline
export function f32x4HorizontalMax(v: v128): f32 {
  const a = max(f32x4.extract_lane(v, 0), f32x4.extract_lane(v, 1));
  const b = max(f32x4.extract_lane(v, 2), f32x4.extract_lane(v, 3));
  return max(a, b);
}

/** Horizontal maximum of f64x2 vector */
@inline
export function f64x2HorizontalMax(v: v128): f64 {
  return max(f64x2.extract_lane(v, 0), f64x2.extract_lane(v, 1));
}

/** Check if SIMD is supported (always true in WASM SIMD) */
export function simdSupported(): bool {
  return true;
}

/** Get optimal alignment for SIMD (16 bytes for v128) */
export function simdAlignment(): i32 {
  return 16;
}

/** Prefetch memory for upcoming SIMD operations */
@inline
export function prefetch(ptr: usize): void {
  // WASM doesn't have explicit prefetch, but the compiler may optimize memory access patterns
  // This is a placeholder for potential future optimization
}
