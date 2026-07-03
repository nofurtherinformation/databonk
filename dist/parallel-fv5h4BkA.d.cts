/**
 * enableThreads — opt-in shared-memory parallel mode (ADR-006 / P5.1).
 *
 * Detection:
 *  - Browser: requires `crossOriginIsolated === true` (COOP+COEP headers).
 *  - Node.js: `SharedArrayBuffer` is always available (no isolation needed).
 *  If isolation is absent → console.warn + returns `false`.
 *
 * When enabled:
 *  - Loads `simd-threads.wasm` with a SAB-backed `WebAssembly.Memory`.
 *  - Calls `__wasm_init_memory()` (if exported) on the main instance to apply
 *    any passive data segments.  Workers instantiate the same binary with the
 *    same shared memory but skip `__wasm_init_memory` — the arena statics are
 *    already zero-initialised by wasm's memory-zero guarantee, so re-applying
 *    the data section from workers is neither needed nor safe.
 *  - Spawns a pool of `workers` (default 4) kernel workers.
 *  - Provides parallel chunked dispatch for elementwise and reduction kernels.
 *
 * Allocator invariant (ADR-006):
 *  Workers NEVER call alloc/free/realloc.  All memory allocation is done by
 *  the main thread before dispatching work.  This means:
 *   • Workers only read from data buffers (reductions) or write to pre-allocated
 *     output buffers (elementwise).
 *   • There are no data races on the arena state (HEAP_TOP / FREE_HEAD / GENERATION).
 *
 * Bit-exactness note:
 *  f64 sum/mean with parallel dispatch is NOT bit-identical to single-thread.
 *  Single-thread uses 2-stripe accumulation over all elements; parallel dispatch
 *  computes per-chunk partial sums (also 2-striped within each chunk) and then
 *  combines them left-to-right.  The combination order differs, producing
 *  different floating-point rounding.  Integer sums are always exact (no FP).
 *  This is an ADR-006-scope deviation; results are still IEEE-754 correct and
 *  deterministic for a fixed worker count.  See docs/threads.md for details.
 *
 * Chunk boundary alignment:
 *  All chunk boundaries are multiples of 8 elements so that validity-bitmap byte
 *  offsets are integer-aligned.  The sub-bitmap pointer for chunk starting at
 *  element `s` (a multiple of 8) is `vpPtr + s/8`, which correctly addresses
 *  the first byte of that chunk's portion of the Arrow-LSB bitmap.
 */
/** Configuration for {@link enableThreads}. */
interface ThreadsConfig {
    /** Number of kernel workers (default 4). */
    workers?: number;
    /**
     * Directory containing `simd-threads.wasm`.
     * Node: filesystem path.  Browser: base URL.
     * Default: resolved relative to the loader module (same as scalar/simd.wasm).
     */
    wasmDir?: string | URL;
    /** Worker request timeout in ms (default 30 000).  0 = no timeout. */
    timeoutMs?: number;
    /** Initial shared memory pages (64 KiB each; default 16 = 1 MiB). */
    initialPages?: number;
    /** Maximum shared memory pages (default 16384 = 1 GiB). Must match --max-memory in build.sh. */
    maxPages?: number;
}
/** Handle returned by a successful {@link enableThreads} call. */
interface ThreadsHandle {
    /** Always `true` — threads are active. */
    readonly enabled: true;
    /** Number of active worker slots. */
    readonly workers: number;
    /**
     * The SAB-backed shared WebAssembly.Memory used by all workers.
     * Column data for parallel operations must reside in this memory.
     * Use {@link alloc} to allocate buffers here.
     */
    readonly memory: WebAssembly.Memory;
    /**
     * Allocate `bytes` in the shared memory arena (main-thread-only).
     * Returns a 16-byte-aligned pointer, or throws on OOM.
     * Workers NEVER call alloc — only the main thread does (ADR-006 invariant).
     */
    alloc(bytes: number): number;
    /** Free a pointer previously returned by {@link alloc}. */
    free(ptr: number): void;
    /**
     * Call a kernel function synchronously on the main thread (single-thread path).
     * Useful for correctness comparison: `callKernel('sum_f64_null', ptr, 0, len)`.
     */
    callKernel(fn: string, ...args: number[]): number;
    /**
     * Parallel f64 sum over elements [0, len).  Null lanes (vpPtr ≠ 0) are skipped.
     * Returns the sum of non-null values, or 0 if all null.
     * NOTE: result may differ from single-thread due to FP accumulation order; see
     * docs/threads.md for the formal deviation note.
     */
    sumF64(dataPtr: number, vpPtr: number, len: number): Promise<number>;
    /**
     * Parallel f64 mean.  Returns NaN if len == 0 or all null.
     * Computed as totalSum / totalCount (exact weights via count_null per chunk).
     */
    meanF64(dataPtr: number, vpPtr: number, len: number): Promise<number>;
    /**
     * Parallel f64 min (NaN-aware, null-skipping).
     * Returns NaN if no valid non-NaN elements exist.
     */
    minF64(dataPtr: number, vpPtr: number, len: number): Promise<number>;
    /**
     * Parallel f64 max (NaN-aware, null-skipping).
     * Returns NaN if no valid non-NaN elements exist.
     */
    maxF64(dataPtr: number, vpPtr: number, len: number): Promise<number>;
    /**
     * Parallel elementwise add_f64 over pre-allocated buffers in shared memory.
     * Workers write directly to the shared output buffer (zero-copy).
     */
    addF64(aPtr: number, bPtr: number, outPtr: number, len: number): Promise<void>;
    /** Parallel elementwise sub_f64 (shared memory). */
    subF64(aPtr: number, bPtr: number, outPtr: number, len: number): Promise<void>;
    /** Parallel elementwise mul_f64 (shared memory). */
    mulF64(aPtr: number, bPtr: number, outPtr: number, len: number): Promise<void>;
    /**
     * Run a generic parallel elementwise binary kernel by name.
     * The kernel must have signature (i32 a, i32 b, i32 out, i32 len) -> ().
     */
    parallelElementwiseBinary(fn: string, aPtr: number, bPtr: number, outPtr: number, len: number, elemBytes: number): Promise<void>;
    /**
     * Run a generic parallel reduction kernel by name.
     * The kernel must have signature (i32 data, i32 vp, i32 len) -> <scalar>.
     * Returns an array of per-chunk partial results (caller combines).
     */
    parallelReduce(fn: string, dataPtr: number, vpPtr: number, len: number, elemBytes: number): Promise<number[]>;
    /** Terminate all workers. The handle must not be used after this. */
    terminate(): void;
}
/**
 * Split [0, len) into at most `numWorkers` chunks, each starting at a
 * multiple of 8 elements (for Arrow-LSB validity-bitmap byte alignment).
 * Returns an array of [start, end) pairs.
 */
declare function splitChunks(len: number, numWorkers: number): Array<[number, number]>;
/**
 * Opt-in parallel mode (ADR-006).
 *
 * Returns a {@link ThreadsHandle} when threads are available and enabled,
 * or `false` (with a console.warn) when cross-origin isolation is absent.
 *
 * @example
 * ```ts
 * const th = await enableThreads({ workers: 4 });
 * if (th) {
 *   const sum = await th.sumF64(ptr, vp, len);
 *   // ...
 *   th.terminate();
 * }
 * ```
 */
declare function enableThreads(config?: ThreadsConfig): Promise<ThreadsHandle | false>;

export { type ThreadsConfig as T, type ThreadsHandle as a, enableThreads as e, splitChunks as s };
