/**
 * Integration test setup - Shared WASM module loading
 */

import { loadDatabonk, DatabonkModule } from '../../src';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let module: DatabonkModule | null = null;

/**
 * Get the shared WASM module instance.
 * Loads the module on first call, returns cached instance thereafter.
 */
export async function getModule(): Promise<DatabonkModule> {
  if (!module) {
    // Find the WASM file relative to this test file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const wasmPath = join(__dirname, '..', '..', 'build', 'release.wasm');

    module = await loadDatabonk({
      wasmPath,
      sharedMemory: true, // WASM is compiled with shared memory enabled
    });
  }
  return module;
}

/**
 * Get the WASM memory for direct manipulation.
 */
export function getMemory(): WebAssembly.Memory {
  if (!module) {
    throw new Error('Module not loaded. Call getModule() first.');
  }
  return module.memory;
}

/**
 * Allocate a Float32Array in WASM memory and return the pointer.
 */
export function allocateF32(data: Float32Array): number {
  if (!module) {
    throw new Error('Module not loaded. Call getModule() first.');
  }
  const ptr = module.exports.allocateBuffer(data.byteLength);
  const view = new Float32Array(module.memory.buffer, ptr, data.length);
  view.set(data);
  return ptr;
}

/**
 * Allocate an Int32Array in WASM memory and return the pointer.
 */
export function allocateI32(data: Int32Array): number {
  if (!module) {
    throw new Error('Module not loaded. Call getModule() first.');
  }
  const ptr = module.exports.allocateBuffer(data.byteLength);
  const view = new Int32Array(module.memory.buffer, ptr, data.length);
  view.set(data);
  return ptr;
}

/**
 * Allocate a Float64Array in WASM memory and return the pointer.
 */
export function allocateF64(data: Float64Array): number {
  if (!module) {
    throw new Error('Module not loaded. Call getModule() first.');
  }
  const ptr = module.exports.allocateBuffer(data.byteLength);
  const view = new Float64Array(module.memory.buffer, ptr, data.length);
  view.set(data);
  return ptr;
}

/**
 * Free a WASM memory allocation.
 */
export function freePtr(ptr: number): void {
  if (!module) {
    throw new Error('Module not loaded. Call getModule() first.');
  }
  module.exports.freeBuffer(ptr);
}

/**
 * Reset the module (for test isolation if needed).
 */
export function resetModule(): void {
  module = null;
}
