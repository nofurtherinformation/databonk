/**
 * Databonk - High-performance DataFrame library
 *
 * A DataFrame library built with AssemblyScript and WASM,
 * featuring SIMD acceleration and SharedArrayBuffer support
 * for zero-copy data access.
 */
export { loadDatabonk, isSharedArrayBufferSupported } from './loader';
export type { DatabonkModule, DatabonkWasm, LoaderOptions } from './loader';
export { DatabonkDataFrame, GroupByBuilder } from './dataframe';
export type { ColumnSpec } from './dataframe';
export { ColumnType, ColumnView, getColumnTypeSize, createTypedArrayView, allocateAndCopy, copyToWasm, createSharedView } from './shared-memory';
/**
 * Quick start example:
 *
 * ```typescript
 * import { loadDatabonk, DatabonkDataFrame } from 'databonk';
 *
 * // Load the WASM module
 * const module = await loadDatabonk();
 *
 * // Create a DataFrame from typed arrays
 * const df = await DatabonkDataFrame.fromTypedArrays(module, [
 *   { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
 *   { name: 'value', data: new Float32Array([1.5, 2.5, 3.5, 4.5, 5.5]) },
 * ]);
 *
 * // Aggregations
 * console.log('Sum:', df.sum('value'));
 * console.log('Mean:', df.mean('value'));
 *
 * // Column math
 * df.scalarMul('value', 2.0, 'doubled');
 *
 * // Zero-copy column access
 * const view = df.getColumnView('value');
 * console.log('First value:', view?.get(0));
 *
 * // Cleanup
 * df.free();
 * ```
 */
//# sourceMappingURL=index.d.ts.map