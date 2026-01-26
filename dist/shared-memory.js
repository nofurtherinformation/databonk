/**
 * SharedArrayBuffer utilities for zero-copy column access
 */
/**
 * Zero-copy column view into WASM memory
 * Provides direct access to column data without copying
 */
export class ColumnView {
    /** The underlying typed array view */
    data;
    /** Pointer to data in WASM memory */
    ptr;
    /** Number of elements */
    length;
    /** Whether this is a shared memory view */
    isShared;
    constructor(data, ptr, isShared) {
        this.data = data;
        this.ptr = ptr;
        this.length = data.length;
        this.isShared = isShared;
    }
    /** Get value at index */
    get(index) {
        return this.data[index];
    }
    /** Set value at index */
    set(index, value) {
        this.data[index] = value;
    }
    /** Iterate over values */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this.data[i];
        }
    }
    /** Convert to regular array (copies data) */
    toArray() {
        return Array.from(this.data);
    }
    /** Slice the view (creates a copy) */
    slice(start, end) {
        return this.data.slice(start, end);
    }
}
/**
 * Column type enum matching AssemblyScript
 */
export var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["Int32"] = 0] = "Int32";
    ColumnType[ColumnType["Int64"] = 1] = "Int64";
    ColumnType[ColumnType["Float32"] = 2] = "Float32";
    ColumnType[ColumnType["Float64"] = 3] = "Float64";
    ColumnType[ColumnType["String"] = 4] = "String";
})(ColumnType || (ColumnType = {}));
/**
 * Get the byte size for a column type
 */
export function getColumnTypeSize(type) {
    switch (type) {
        case ColumnType.Int32:
        case ColumnType.Float32:
            return 4;
        case ColumnType.Int64:
        case ColumnType.Float64:
            return 8;
        default:
            return 0;
    }
}
/**
 * Create a typed array view for a column type
 */
export function createTypedArrayView(module, ptr, length, type) {
    const isShared = module.isSharedMemory;
    switch (type) {
        case ColumnType.Int32:
            return new ColumnView(module.getInt32View(ptr, length), ptr, isShared);
        case ColumnType.Float32:
            return new ColumnView(module.getFloat32View(ptr, length), ptr, isShared);
        case ColumnType.Float64:
            return new ColumnView(module.getFloat64View(ptr, length), ptr, isShared);
        default:
            throw new Error(`Unsupported column type: ${type}`);
    }
}
/**
 * Copy data from a TypedArray into WASM memory
 */
export function copyToWasm(module, data, ptr) {
    const view = new Uint8Array(module.memory.buffer, ptr, data.byteLength);
    view.set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
}
/**
 * Allocate and copy a TypedArray into WASM memory
 */
export function allocateAndCopy(module, data) {
    const ptr = module.exports.allocateBuffer(data.byteLength);
    copyToWasm(module, data, ptr);
    return ptr;
}
/**
 * Create a SharedArrayBuffer-backed TypedArray for cross-thread sharing
 * Only works if the WASM module was loaded with shared memory
 */
export function createSharedView(module, ptr, length, TypedArrayConstructor) {
    if (!module.isSharedMemory) {
        return null;
    }
    return new TypedArrayConstructor(module.memory.buffer, ptr, length);
}
//# sourceMappingURL=shared-memory.js.map