/**
 * Memory allocator utilities for aligned buffer allocation
 */

// Standard alignment for SIMD operations
export const SIMD_ALIGNMENT: usize = 64;

/**
 * Allocate aligned memory buffer
 * @param size Size in bytes
 * @param alignment Alignment requirement (default 64 bytes for SIMD)
 * @returns Pointer to allocated memory
 */
export function allocAligned(size: usize, alignment: usize = SIMD_ALIGNMENT): usize {
  // AssemblyScript's heap.alloc already provides some alignment
  // but we ensure it meets our requirements
  const alignedSize = ((size + alignment - 1) / alignment) * alignment;
  return heap.alloc(alignedSize);
}

/**
 * Free allocated memory
 * @param ptr Pointer to free
 */
export function freeAligned(ptr: usize): void {
  if (ptr !== 0) {
    heap.free(ptr);
  }
}

/**
 * Reallocate memory buffer with new size
 * @param ptr Existing pointer
 * @param oldSize Old size in bytes
 * @param newSize New size in bytes
 * @param alignment Alignment requirement
 * @returns Pointer to reallocated memory
 */
export function reallocAligned(
  ptr: usize,
  oldSize: usize,
  newSize: usize,
  alignment: usize = SIMD_ALIGNMENT
): usize {
  const alignedNewSize = ((newSize + alignment - 1) / alignment) * alignment;
  const newPtr = heap.alloc(alignedNewSize);

  // Copy old data
  const copySize = min(oldSize, newSize);
  memory.copy(newPtr, ptr, copySize);

  // Free old memory
  if (ptr !== 0) {
    heap.free(ptr);
  }

  return newPtr;
}

/**
 * Zero out a memory region
 * @param ptr Pointer to memory
 * @param size Size in bytes
 */
export function zeroMemory(ptr: usize, size: usize): void {
  memory.fill(ptr, 0, size);
}

/**
 * Copy memory region
 * @param dest Destination pointer
 * @param src Source pointer
 * @param size Size in bytes
 */
export function copyMemory(dest: usize, src: usize, size: usize): void {
  memory.copy(dest, src, size);
}

/**
 * Get current memory size in pages (64KB per page)
 */
export function getMemoryPages(): i32 {
  return <i32>memory.size();
}

/**
 * Grow memory by specified number of pages
 * @param pages Number of pages to grow
 * @returns Previous size in pages, or -1 on failure
 */
export function growMemory(pages: i32): i32 {
  return <i32>memory.grow(pages);
}
