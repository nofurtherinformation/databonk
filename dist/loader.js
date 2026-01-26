/**
 * WASM Module Loader with SharedArrayBuffer support
 */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
/**
 * Load the Databonk WASM module
 */
export async function loadDatabonk(options = {}) {
    const { wasmPath, initialMemory = 256, maximumMemory = 16384, sharedMemory = true, } = options;
    // Create memory (shared if supported)
    let memory;
    let isSharedMemory = false;
    try {
        if (sharedMemory && typeof SharedArrayBuffer !== 'undefined') {
            memory = new WebAssembly.Memory({
                initial: initialMemory,
                maximum: maximumMemory,
                shared: true,
            });
            isSharedMemory = true;
        }
        else {
            memory = new WebAssembly.Memory({
                initial: initialMemory,
                maximum: maximumMemory,
            });
        }
    }
    catch {
        // Fall back to non-shared memory
        memory = new WebAssembly.Memory({
            initial: initialMemory,
            maximum: maximumMemory,
        });
    }
    // Load WASM binary
    let wasmBinary;
    if (wasmPath) {
        // Load from specified path
        if (typeof window !== 'undefined') {
            // Browser
            const response = await fetch(wasmPath);
            wasmBinary = await response.arrayBuffer();
        }
        else {
            // Node.js
            const buffer = await readFile(wasmPath);
            wasmBinary = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        }
    }
    else {
        // Try default paths
        try {
            if (typeof window !== 'undefined') {
                const response = await fetch('./build/release.wasm');
                wasmBinary = await response.arrayBuffer();
            }
            else {
                // Node.js - try to find the wasm file relative to this module
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = dirname(__filename);
                const defaultPath = join(__dirname, '..', 'build', 'release.wasm');
                const buffer = await readFile(defaultPath);
                wasmBinary = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
            }
        }
        catch {
            throw new Error('Could not load WASM file. Please specify wasmPath option.');
        }
    }
    // Imports for WASM module
    const imports = {
        env: {
            memory,
            abort(msgPtr, filePtr, line, column) {
                console.error(`WASM abort at ${line}:${column}`);
                throw new Error('WASM abort');
            },
        },
    };
    // Instantiate WASM module
    const { instance } = await WebAssembly.instantiate(wasmBinary, imports);
    const exports = instance.exports;
    // Create module interface
    const module = {
        exports,
        memory,
        isSharedMemory,
        getInt32View(ptr, length) {
            return new Int32Array(memory.buffer, ptr, length);
        },
        getFloat32View(ptr, length) {
            return new Float32Array(memory.buffer, ptr, length);
        },
        getFloat64View(ptr, length) {
            return new Float64Array(memory.buffer, ptr, length);
        },
        getUint8View(ptr, length) {
            return new Uint8Array(memory.buffer, ptr, length);
        },
        allocString(str) {
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
        freePtr(ptr) {
            // For runtime-managed objects (like strings), unpin them
            // The GC will reclaim them when appropriate
            try {
                exports.__unpin(ptr);
            }
            catch {
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
export function isSharedArrayBufferSupported() {
    try {
        return typeof SharedArrayBuffer !== 'undefined';
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=loader.js.map