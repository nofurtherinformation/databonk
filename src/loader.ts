/**
 * WASM Module Loader with SharedArrayBuffer support
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

/** WASM module exports type */
export interface DatabonkWasm {
  // Memory
  memory: WebAssembly.Memory;

  // Memory allocation
  allocateBuffer(byteLength: number): number;
  freeBuffer(ptr: number): void;

  // DataFrame creation (legacy - uses arrays)
  createDataFrame(
    rowCount: number,
    columnNames: number, // pointer to string array
    columnTypes: number, // pointer to i32 array
    dataPtrs: number     // pointer to usize array
  ): number;

  // Simpler DataFrame creation API
  createEmptyDataFrameWithRows(rowCount: number): number;
  addInt32ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;
  addFloat32ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;
  addFloat64ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;
  addInt64ColumnToDataFrame(df: number, name: number, dataPtr: number, length: number): void;

  // SIMD aggregations (direct)
  simdSumF32(ptr: number, length: number): number;
  simdSumF64(ptr: number, length: number): number;
  simdMinF32(ptr: number, length: number): number;
  simdMinF64(ptr: number, length: number): number;
  simdMaxF32(ptr: number, length: number): number;
  simdMaxF64(ptr: number, length: number): number;

  // DataFrame operations
  getRowCount(df: number): number;
  getColumnCount(df: number): number;
  getColumnPtr(df: number, columnName: number): number;
  getColumnLength(df: number, columnName: number): number;
  getColumnType(df: number, columnName: number): number;
  hasColumn(df: number, columnName: number): boolean;
  freeDataFrame(df: number): void;

  // Aggregations
  dfSum(df: number, columnName: number): number;
  dfMean(df: number, columnName: number): number;
  dfMin(df: number, columnName: number): number;
  dfMax(df: number, columnName: number): number;
  dfCount(df: number, columnName: number): number;

  // Arithmetic
  dfAdd(df: number, colA: number, colB: number, resultName: number): void;
  dfSub(df: number, colA: number, colB: number, resultName: number): void;
  dfScalarMul(df: number, colName: number, scalar: number, resultName: number): void;

  // GroupBy
  groupBySum(df: number, keyColumn: number, valueColumns: number, maxKey: number): number;
  groupByMeanAgg(df: number, keyColumn: number, valueColumns: number, maxKey: number): number;

  // Join
  innerJoin(left: number, right: number, leftKey: number, rightKey: number): number;

  // AssemblyScript runtime exports
  __new(size: number, id: number): number;
  __pin(ptr: number): number;
  __unpin(ptr: number): void;
  __collect(): void;
}

/** Loader options */
export interface LoaderOptions {
  /** Path to WASM file (default: build/release.wasm) */
  wasmPath?: string;
  /** Initial memory pages (64KB each, default: 256 = 16MB) */
  initialMemory?: number;
  /** Maximum memory pages (default: 16384 = 1GB) */
  maximumMemory?: number;
  /** Use shared memory for SharedArrayBuffer support */
  sharedMemory?: boolean;
}

/** Module instance with memory access helpers */
export interface DatabonkModule {
  /** WASM exports */
  exports: DatabonkWasm;
  /** Memory buffer (may be SharedArrayBuffer) */
  memory: WebAssembly.Memory;
  /** Check if using shared memory */
  isSharedMemory: boolean;

  // Memory helpers
  /** Get Int32Array view into WASM memory */
  getInt32View(ptr: number, length: number): Int32Array;
  /** Get Float32Array view into WASM memory */
  getFloat32View(ptr: number, length: number): Float32Array;
  /** Get Float64Array view into WASM memory */
  getFloat64View(ptr: number, length: number): Float64Array;
  /** Get Uint8Array view into WASM memory */
  getUint8View(ptr: number, length: number): Uint8Array;

  /** Allocate string in WASM memory */
  allocString(str: string): number;
  /** Free WASM memory */
  freePtr(ptr: number): void;
}

/**
 * Load the Databonk WASM module
 */
export async function loadDatabonk(options: LoaderOptions = {}): Promise<DatabonkModule> {
  const {
    wasmPath,
    initialMemory = 256,
    maximumMemory = 16384,
    sharedMemory = true,
  } = options;

  // Create memory (shared if supported)
  let memory: WebAssembly.Memory;
  let isSharedMemory = false;

  try {
    if (sharedMemory && typeof SharedArrayBuffer !== 'undefined') {
      memory = new WebAssembly.Memory({
        initial: initialMemory,
        maximum: maximumMemory,
        shared: true,
      });
      isSharedMemory = true;
    } else {
      memory = new WebAssembly.Memory({
        initial: initialMemory,
        maximum: maximumMemory,
      });
    }
  } catch {
    // Fall back to non-shared memory
    memory = new WebAssembly.Memory({
      initial: initialMemory,
      maximum: maximumMemory,
    });
  }

  // Load WASM binary
  let wasmBinary: ArrayBuffer;

  if (wasmPath) {
    // Load from specified path
    if (typeof window !== 'undefined') {
      // Browser
      const response = await fetch(wasmPath);
      wasmBinary = await response.arrayBuffer();
    } else {
      // Node.js
      const buffer = await readFile(wasmPath);
      wasmBinary = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
    }
  } else {
    // Try default paths
    try {
      if (typeof window !== 'undefined') {
        const response = await fetch('./build/release.wasm');
        wasmBinary = await response.arrayBuffer();
      } else {
        // Node.js - try to find the wasm file relative to this module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const defaultPath = join(__dirname, '..', 'build', 'release.wasm');
        const buffer = await readFile(defaultPath);
        wasmBinary = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
      }
    } catch {
      throw new Error('Could not load WASM file. Please specify wasmPath option.');
    }
  }

  // Imports for WASM module
  const imports: WebAssembly.Imports = {
    env: {
      memory,
      abort(msgPtr: number, filePtr: number, line: number, column: number) {
        console.error(`WASM abort at ${line}:${column}`);
        throw new Error('WASM abort');
      },
    },
  };

  // Instantiate WASM module
  const { instance } = await WebAssembly.instantiate(wasmBinary, imports);
  const exports = instance.exports as unknown as DatabonkWasm;

  // Create module interface
  const module: DatabonkModule = {
    exports,
    memory,
    isSharedMemory,

    getInt32View(ptr: number, length: number): Int32Array {
      return new Int32Array(memory.buffer, ptr, length);
    },

    getFloat32View(ptr: number, length: number): Float32Array {
      return new Float32Array(memory.buffer, ptr, length);
    },

    getFloat64View(ptr: number, length: number): Float64Array {
      return new Float64Array(memory.buffer, ptr, length);
    },

    getUint8View(ptr: number, length: number): Uint8Array {
      return new Uint8Array(memory.buffer, ptr, length);
    },

    allocString(str: string): number {
      // AssemblyScript string allocation using the runtime
      // Strings in AssemblyScript are UTF-16 encoded with a specific header format
      // The runtime's __new function allocates managed memory with a type header

      // String type ID in AssemblyScript is 2
      const STRING_ID = 2;
      const byteLength = str.length * 2; // UTF-16

      // Allocate string using __new (includes runtime header)
      const ptr = exports.__new(byteLength, STRING_ID);

      // Write UTF-16 data directly after the header
      // __new returns a pointer to the data portion (after the header)
      const dataView = new Uint16Array(memory.buffer, ptr, str.length);
      for (let i = 0; i < str.length; i++) {
        dataView[i] = str.charCodeAt(i);
      }

      // Pin the string so it won't be garbage collected during use
      exports.__pin(ptr);

      return ptr;
    },

    freePtr(ptr: number): void {
      // For runtime-managed objects (like strings), unpin them
      // The GC will reclaim them when appropriate
      try {
        exports.__unpin(ptr);
      } catch {
        // If unpin fails, try freeBuffer for raw allocations
        exports.freeBuffer(ptr);
      }
    },
  };

  return module;
}

/**
 * Check if SharedArrayBuffer is available
 */
export function isSharedArrayBufferSupported(): boolean {
  try {
    return typeof SharedArrayBuffer !== 'undefined';
  } catch {
    return false;
  }
}
