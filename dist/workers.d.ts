export { T as ThreadsConfig, a as ThreadsHandle, e as enableThreads, s as splitChunks } from './parallel-fv5h4BkA.js';

/**
 * KernelWorkerPool — manages a fixed set of Workers initialised with the
 * simd-threads WASM binary over a shared WebAssembly.Memory (ADR-006 / P5.1).
 *
 * Invariants:
 *  - Workers NEVER call alloc/free/realloc (the arena is main-thread-only).
 *  - Each worker holds its own WASM instance but they ALL share the same
 *    linear memory, so pointers from the main-thread arena are valid in workers.
 *  - Work items are dispatched round-robin; one pending item per worker at a time.
 *
 * Crash / timeout policy:
 *  - If a worker doesn't respond within `timeoutMs` (default 30 s) we replace
 *    it with a fresh instance and reject the pending promise.  This ensures the
 *    pool never deadlocks after a worker crash.
 */
declare class KernelWorkerPool {
    private readonly memory;
    private readonly wasmBytes;
    private readonly timeoutMs;
    private readonly slots;
    private nextId;
    private nextSlot;
    private terminated;
    /** Only {@link KernelWorkerPool.create} should be used (async init). */
    private constructor();
    /**
     * Create and fully initialise a pool of `numWorkers` workers.
     * Each worker receives the threads WASM binary and the shared memory.
     */
    static create(wasmBytes: Uint8Array, memory: WebAssembly.Memory, numWorkers: number, timeoutMs?: number): Promise<KernelWorkerPool>;
    /** Add one worker slot and wait for it to signal 'ready'. */
    private addWorker;
    private handleMessage;
    /**
     * Send a 'kernel' message to the next available worker (round-robin) and
     * return the numeric result. Times out after `this.timeoutMs`.
     */
    sendKernel(fn: string, args: number[]): Promise<number>;
    /**
     * Send a 'meta' (batched) message to the next worker (round-robin) and
     * return an array of numeric results (one per op in `ops`).
     */
    sendMeta(ops: Array<{
        fn: string;
        args: number[];
    }>): Promise<number[]>;
    /**
     * Dispatch work to ALL slots (one message per slot) and await all results.
     * Used for parallel chunk dispatch.
     */
    broadcastKernel(perSlot: Array<{
        fn: string;
        args: number[];
    }>): Promise<number[]>;
    /**
     * Dispatch meta (batched) calls to ALL slots, one message per slot.
     * Returns an array of arrays: `result[i][j]` = value j from slot i.
     */
    broadcastMeta(perSlot: Array<Array<{
        fn: string;
        args: number[];
    }>>): Promise<number[][]>;
    private sendToSlot;
    /** Replace a crashed slot with a fresh worker. */
    private replaceSlot;
    /** Number of active worker slots. */
    get size(): number;
    /** Terminate all workers. Pool must not be used after this. */
    terminate(): void;
}

export { KernelWorkerPool };
