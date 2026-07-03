/**
 * WASM memory-core loader with SIMD feature detection (ADR-004).
 *
 * Feature-detects SIMD via `WebAssembly.validate` on a tiny inlined SIMD module,
 * then instantiates the matching binary — `simd.wasm` or `scalar.wasm` — over
 * either a Node filesystem path or a browser URL. The module exports the
 * Phase-1 memory core (ABI §9): `memory`, `alloc`, `free`, `realloc`,
 * `mem_generation`.
 *
 * View access is NOT done here — hold no `TypedArray` outside `viewOf`
 * (ADR-001). See {@link createViewOf} in `./views.ts`.
 */
/** True iff the current runtime supports wasm SIMD128 (ADR-004). */
declare function detectSimd(): boolean;
/** Raw exports of the memory-core wasm module (ABI §9, Phase 1). */
interface WasmExports {
    /** The module's single linear memory (ADR-001; all column bytes live here). */
    readonly memory: WebAssembly.Memory;
    /** `alloc(size) -> ptr`: 16-byte-aligned, `0` on OOM (ABI §3). */
    alloc(size: number): number;
    /** `free(ptr)`: `free(0)` is a no-op (ABI §3). */
    free(ptr: number): void;
    /** `realloc(ptr, newSize) -> ptr`: preserves contents; `0` on OOM (ABI §3). */
    realloc(ptr: number, newSize: number): number;
    /** `mem_generation()`: changes on every successful `memory.grow` (ABI §2). */
    mem_generation(): number;
}
/** A loaded memory-core module plus which build was selected. */
interface WasmMemoryModule extends WasmExports {
    /** `true` if the SIMD build was loaded, `false` for the scalar build. */
    readonly simd: boolean;
}
/** Options for {@link loadWasmModule}. */
interface LoadOptions {
    /** Force a build. Default: auto-detect via {@link detectSimd}. */
    simd?: boolean;
    /**
     * Location of `scalar.wasm` / `simd.wasm`.
     *  - Node: a filesystem directory path, or a `file:` / directory `URL`.
     *  - Browser: a base `URL` (or URL string) the two files are fetched under.
     *
     * Default: resolved relative to this module (the built binaries are copied
     * next to the JS bundle in `dist/`).
     */
    wasmDir?: string | URL;
}
/**
 * Feature-detect, load, and instantiate the memory-core wasm module.
 * Runs once per page/process (ADR-004); callers cache the returned module.
 */
declare function loadWasmModule(opts?: LoadOptions): Promise<WasmMemoryModule>;

/**
 * The single sanctioned `viewOf()` accessor (ADR-001, ABI §2).
 *
 * `memory.grow` detaches every `TypedArray` over the old `ArrayBuffer`. To stay
 * correct without copying, ALL view access goes through one accessor that:
 *   1. caches `(generation, view)` per registered column buffer,
 *   2. checks `mem_generation()` before every use, and
 *   3. on a mismatch, rebuilds ALL registered views over the current
 *      `memory.buffer`.
 *
 * No raw `TypedArray` may be cached anywhere else in the library.
 */

/** Storage dtypes whose data buffer maps to a numeric `TypedArray` (dtypes.md §1). `i64` maps to `BigInt64Array`. */
type ViewDType = 'f64' | 'f32' | 'i32' | 'u32' | 'u8' | 'bool' | 'i64';
/** Location + shape of a column buffer inside linear memory. */
interface ColumnBuffer {
    /** Byte offset into `memory.buffer` (16-byte aligned; ABI §3). */
    readonly ptr: number;
    /** Element count (NOT bytes; ABI §4.3). */
    readonly length: number;
    /** Determines the `TypedArray` kind; `bool` is `u8` storage (dtypes.md §1). */
    readonly dtype: ViewDType;
}
/** The concrete `TypedArray` kinds a column view can be. `BigInt64Array` is used for `i64` columns. */
type ColumnView = Float64Array | Float32Array | Int32Array | Uint32Array | Uint8Array | BigInt64Array;
/** The `viewOf` accessor returned by {@link createViewOf}. */
interface ViewOf {
    /**
     * Return a live `TypedArray` for `col` over the current `memory.buffer`,
     * rebuilding every registered view first if memory has grown since last use.
     * The returned view must not be cached by callers — call `viewOf` again.
     */
    (col: ColumnBuffer): ColumnView;
    /** The generation the cache is currently synced to. */
    generation(): number;
    /** Stop tracking `col` (drops it from the registry and cache). */
    forget(col: ColumnBuffer): void;
    /** Drop all tracked columns and cached views. */
    clear(): void;
}
/**
 * Build the memory context's single `viewOf` accessor over `mod`'s linear
 * memory and generation counter.
 */
declare function createViewOf(mod: Pick<WasmMemoryModule, 'memory' | 'mem_generation'>): ViewOf;

/**
 * A `MemoryContext` bundles the loaded wasm module (allocator + linear memory)
 * with its single {@link ViewOf} accessor (ADR-001). Every column / dictionary
 * operation in this layer takes a context: it allocates through `ctx.mod` and
 * reaches bytes only through `ctx.viewOf` — the one sanctioned TypedArray path.
 *
 * There is exactly **one** `viewOf` per module (one linear memory, one generation
 * counter), so there is exactly one context per module.
 */

/** The allocator + the single `viewOf` accessor over one module's linear memory. */
interface MemoryContext {
    /** The loaded memory-core module (`alloc`/`free`/`realloc`/`memory`, ABI §3/§9). */
    readonly mod: WasmMemoryModule;
    /** The one sanctioned `TypedArray` accessor over `mod.memory` (ADR-001). */
    readonly viewOf: ViewOf;
}
/** Build the single {@link MemoryContext} for a loaded module. */
declare function createMemoryContext(mod: WasmMemoryModule): MemoryContext;

/**
 * Schema / dtype registry (Phase 1, deliverable P1.2 §3).
 *
 * One descriptor per v1 storage dtype (`contracts/dtypes.md` §1). The descriptor
 * carries everything the column, dictionary, and (Phase 2) kernel/expr layers need
 * to lay a dtype out in linear memory and name its kernels:
 *   - `size`   — bytes per stored element (utf8 stores an `i32` dictionary index),
 *   - `view`   — the {@link ViewDType} its data buffer maps to through `viewOf`,
 *   - `ctor`   — the matching `TypedArray` constructor for a JS-side staging copy,
 *   - `wasm`   — the kernel-name dtype token (ABI §6 `[family_]op_dtype[_variant]`),
 *   - `float`  — whether `NaN`/`±inf` are *values* (floats), never nulls (dtypes.md §4).
 */

/**
 * The v2 column dtypes (`contracts/dtypes.md` §1/§6). `utf8` is dict-encoded; `i64` uses
 * BigInt64Array. `date32` and `timestamp` are logical dtypes that dispatch to i32/i64 physical
 * kernels respectively (ADR-010; `wasm` field carries the physical token).
 */
type DType = 'f64' | 'f32' | 'i32' | 'u32' | 'bool' | 'utf8' | 'i64' | 'date32' | 'timestamp';
/** `TypedArray` constructors a column data / auxiliary buffer can map to. */
type TypedArrayCtor = Float64ArrayConstructor | Float32ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Uint8ArrayConstructor | BigInt64ArrayConstructor;
/** Static description of one v1 dtype (see module doc). */
interface DTypeInfo {
    /** The dtype this describes. */
    readonly name: DType;
    /** Bytes per stored element. `utf8` = 4 (the `i32` index into its dictionary). */
    readonly size: number;
    /** `viewOf` dtype for this column's *data* buffer (`utf8` → its `i32` indices). */
    readonly view: ViewDType;
    /** `TypedArray` constructor matching {@link view} (for staging copies). */
    readonly ctor: TypedArrayCtor;
    /** Kernel-name dtype token (ABI §6). Same as {@link name} for every v1 dtype. */
    readonly wasm: string;
    /** True for `f64`/`f32`: a `NaN`/`±inf` is a valid *value*, never a null (dtypes.md §4). */
    readonly float: boolean;
}
/** The dtype registry: `DTYPES[dtype]` → its {@link DTypeInfo}. */
declare const DTYPES: Record<DType, DTypeInfo>;
/** Descriptor for `dtype`. Throws on an unknown dtype (helpful for API callers). */
declare function dtypeInfo(dtype: DType): DTypeInfo;

/**
 * Dictionary string store (Phase 1, deliverable P1.2 §2; ABI §4.4, ADR-002).
 *
 * A `utf8` column's strings are dictionary-encoded into three wasm buffers:
 *   - the column's own `i32[len]` **indices** (built in `column.ts`), plus this
 *     dictionary's shared:
 *   - **offsets** — `i32[count + 1]`, Arrow-style monotonic byte offsets,
 *     `offsets[0] == 0`, string `k` = `bytes[offsets[k] .. offsets[k+1])`;
 *   - **bytes** — `u8[offsets[count]]`, UTF-8 concatenation of the unique strings.
 *
 * Decode is **memoized per slot** on the JS side (ADR-002): each unique string
 * crosses the wasm→JS boundary at most once. The cache is keyed by *dictionary
 * identity* (a `WeakMap` on the `Dictionary` object) + slot index, so distinct
 * dictionaries never share decoded strings and the cache is GC'd with the dict.
 *
 * Unification (`unifyDictionaries`) is JS-side for Phase 1 — the wasm `unify_dict`
 * kernel arrives in Phase 2 (ABI §9, Agent D). It produces a merged unique list
 * plus per-slot index remaps so two columns can be compared under one dictionary.
 */

/**
 * The shared dictionary buffers of a `utf8` column (ABI §4.4). Immutable: build
 * once, decode many. `count == 0` is legal (all-null / empty column): `offsets`
 * is still `[0]` and `bytesLen == 0`.
 */
interface Dictionary {
    /** Number of unique strings. */
    readonly count: number;
    /** Byte offset of the `i32[count + 1]` offsets buffer. */
    readonly offsetsPtr: number;
    /** Byte offset of the `u8[bytesLen]` UTF-8 bytes buffer. */
    readonly bytesPtr: number;
    /** Total UTF-8 byte length (`offsets[count]`). */
    readonly bytesLen: number;
}
/**
 * Encode `uniques` (already-deduplicated strings) into fresh offsets + bytes
 * buffers in linear memory and return the {@link Dictionary} describing them.
 * Allocates all buffers *before* taking any view (a grow between alloc and write
 * would detach it, ADR-001).
 */
declare function writeDictionary(ctx: MemoryContext, uniques: readonly string[]): Dictionary;
/**
 * Decode dictionary slot `slot` to a string, memoized (ADR-002). First call for a
 * slot reads its UTF-8 bytes across the boundary (a *miss*); later calls reuse the
 * cached string (a *hit*). `slot` must be in `[0, dict.count)`.
 */
declare function decodeSlot(ctx: MemoryContext, dict: Dictionary, slot: number): string;
/** Decode every slot of `dict` into a `string[]` (memoized per slot). */
declare function decodeDictionary(ctx: MemoryContext, dict: Dictionary): string[];
/** Decode-cache accounting for `dict` (`{hits:0,misses:0}` if never decoded). */
declare function decodeStats(dict: Dictionary): {
    hits: number;
    misses: number;
};
/** Result of unifying two dictionaries into a single merged one (JS-side). */
interface DictUnifyResult {
    /** Merged unique strings; index `j` is a slot in the merged dictionary. */
    readonly merged: string[];
    /** `remapA[i]` = merged slot of dictionary-A slot `i` (`Int32Array`, ABI indices). */
    readonly remapA: Int32Array;
    /** `remapB[i]` = merged slot of dictionary-B slot `i`. */
    readonly remapB: Int32Array;
}
/**
 * Unify two dictionaries into one merged unique list plus per-slot index remaps
 * (JS-side; the wasm `unify_dict` kernel is Phase 2). Value-preserving by
 * construction: `merged[remapA[i]] === decode(dictA, i)` for every `i`. The
 * merged order is A's slots in order, then B's not-yet-seen slots.
 */
declare function unifyDictionaries(ctx: MemoryContext, dictA: Dictionary, dictB: Dictionary): DictUnifyResult;
/** Free a dictionary's buffers and drop them from the view registry. */
declare function freeDictionary(ctx: MemoryContext, dict: Dictionary): void;

/**
 * Column representation (Phase 1, deliverable P1.2 §1/§4; ABI §4).
 *
 * A {@link Column} is a small JS descriptor over buffers living in wasm linear
 * memory (ADR-001); JS never owns the bytes. Per ABI §4 it carries `dtype`,
 * `length`, a `dataPtr`, a `validityPtr` (`0` = all-valid), and — for `utf8` —
 * the shared {@link Dictionary}.
 *
 * ## Zero-copy slice & the offset convention (deliverable §4)
 * `sliceColumn` shares the parent's buffers; no bytes move. Two offset kinds:
 *
 *  - **data** is byte-addressable, so a slice bakes its start into `dataPtr`:
 *    `dataPtr = parent.dataPtr + start * dtype.size`. Element `i`'s data byte
 *    offset is `dataPtr + i * size`. **`dataPtr` is exactly the base pointer a
 *    kernel receives** — the byte-offset math happens here, in the memory layer,
 *    so Phase-2 kernels take `(dataPtr, len)` unchanged. Alignment is preserved:
 *    offsetting by whole elements keeps the natural alignment `alloc` guarantees.
 *
 *  - **validity** is *bit*-addressed, so a slice cannot move the pointer; it keeps
 *    the parent's `validityPtr` and records `validityBitOffset` (the bit index of
 *    element 0). Element `i`'s validity bit is `validityBitOffset + i` in the
 *    bitmap at `validityPtr`. For a root column `validityBitOffset == 0`. A
 *    Phase-2 kernel consuming a sliced column's validity must honor this bit
 *    offset (or the memory layer realigns first); root columns — the common case —
 *    pass `validityPtr` directly. `validityPtr == 0` always means all-valid.
 */

/** A column descriptor over wasm buffers (see module doc; ABI §4). */
interface Column {
    /** Storage dtype (`contracts/dtypes.md` §1/§6). */
    readonly dtype: DType;
    /** Element count of this (possibly sliced) column. */
    readonly length: number;
    /** Base byte offset of element 0's data (slice start already baked in). */
    readonly dataPtr: number;
    /** Validity bitmap pointer, or `0` for an all-valid column (ABI §4.1). */
    readonly validityPtr: number;
    /** Bit index of element 0 within the bitmap at `validityPtr` (0 for roots). */
    readonly validityBitOffset: number;
    /** The shared dictionary for a `utf8` column; `null` for every other dtype. */
    readonly dict: Dictionary | null;
    /** True if this column owns its buffers (a root); slices share and own nothing. */
    readonly owned: boolean;
    /**
     * IANA timezone string for `timestamp` columns (ADR-010 §10 display/accessor metadata only).
     * `undefined` = UTC. Not present for any other dtype. The stored value is always UTC epoch ms;
     * tz only affects how dt accessors and the printer interpret the instant.
     */
    readonly tz?: string;
}
/** JS value shapes accepted by {@link createColumn}, per dtype. */
type ColumnInput = ArrayLike<number | null | undefined> | ArrayLike<bigint | number | null | undefined> | ArrayLike<boolean | null | undefined> | ArrayLike<string | null | undefined> | ArrayLike<Date | null | undefined>;
/** One decoded column cell: a value, or `null` for a null slot. */
type Cell = number | bigint | boolean | string | null;
/**
 * Build a column from JS `values` for `dtype`. Two paths:
 *   - **fast path** — a matching `TypedArray` (no nulls possible): bulk-copy into
 *     linear memory, `validityPtr = 0`;
 *   - **slow path** — a plain array: detect `null`/`undefined` (only these are
 *     nulls — a `NaN` is a *value*, dtypes.md §4) and build the validity bitmap.
 *
 * Temporal dtypes (ADR-010):
 *   - `date32`: accepts `number` (days since epoch), `Int32Array` (fast path), or `Date` (→ day).
 *   - `timestamp`: accepts `bigint`/safe-int number (ms since epoch), `BigInt64Array`, `Date` (→ ms),
 *     or ISO-8601 string (only via explicit dtype). `toArray` returns `bigint` ms per dtypes.md §11.
 * Optional `tz` attached as metadata for `timestamp` (display/accessor only, ADR-010).
 */
declare function createColumn(ctx: MemoryContext, dtype: DType, values: ColumnInput, tz?: string): Column;
/**
 * Export a column back to a JS array, with null slots as `null` (deliverable §1).
 * `f64`/`f32` `NaN`s round-trip as values; `bool` yields `boolean`; `utf8` yields
 * memoized-decoded strings.
 *
 * Temporal boundary per dtypes.md §11:
 *   - `date32`  → `number` (days since epoch), matching the physical i32 storage.
 *   - `timestamp` → `bigint` (ms since epoch), matching the physical i64 storage.
 * Use `Series.toDates()` for convenient `Date[]` conversion.
 */
declare function columnToArray(ctx: MemoryContext, col: Column): Cell[];
/**
 * Zero-copy slice `[start, end)` sharing the parent's buffers (deliverable §4).
 * `start`/`end` are clamped to `[0, length]`; `end < start` yields an empty slice.
 * See the module doc for the data/validity offset convention. Slice-of-slice
 * composes: offsets accumulate, buffers stay shared.
 */
declare function sliceColumn(col: Column, start: number, end: number): Column;
/**
 * Free a column's owned buffers and drop them from the view registry. A no-op for
 * slices (`owned === false`) — they share buffers owned by the root. Frees the
 * dictionary too for an owned `utf8` column.
 */
declare function freeColumn(ctx: MemoryContext, col: Column): void;

/**
 * Expression AST (Phase 3, P3.1 deliverable §1).
 *
 * The public expression surface from spec §4. `col('a')` / `lit(v)` are the two
 * leaf builders; every operator is a chainable method returning a **new**
 * {@link Expr}. Nodes are immutable (deep-frozen), so an `Expr` can be shared and
 * re-compiled without aliasing hazards.
 *
 *   col('a').gt(5).and(col('b').eq('x'))
 *   col('a').add(col('b')).mul(2)
 *   col('a').cast('f32').sum()
 *
 * Type resolution (result dtype, the single int→float widening rule, cast-insertion
 * points, unsupported-mix errors) lives in `./dtypes.ts`; lowering to kernel calls
 * lives in `./compile.ts`. This file is pure data + ergonomics — no wasm, no memory.
 */

/** Binary arithmetic operators (dtypes.md §3.1/§3.2). */
type ArithOp = 'add' | 'sub' | 'mul' | 'div' | 'mod';
/** dt accessor field names (dtypes.md §10, ADR-010). */
type DtComponent = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond' | 'weekday' | 'dayOfYear' | 'quarter';
/** Comparison operators → boolean/mask (dtypes.md §4.1). */
type CompareOp = 'gt' | 'ge' | 'lt' | 'le' | 'eq' | 'ne';
/** Short-circuit-free three-valued boolean operators (dtypes.md §4.2). */
type BoolOp = 'and' | 'or';
/** Reduction operators (dtypes.md §4.3). */
type AggOp = 'sum' | 'mean' | 'min' | 'max' | 'count' | 'nunique' | 'std' | 'var' | 'first' | 'last';
/** A raw JS scalar that a literal / fill value can hold. */
type ScalarValue = number | bigint | string | boolean;
/** The immutable AST node inside every {@link Expr}. Discriminated on `kind`. */
type ExprNode = Readonly<{
    kind: 'col';
    name: string;
}> | Readonly<{
    kind: 'lit';
    value: ScalarValue;
    dtype: DType | null;
}> | Readonly<{
    kind: 'arith';
    op: ArithOp;
    left: Expr;
    right: Expr;
}> | Readonly<{
    kind: 'neg';
    operand: Expr;
}> | Readonly<{
    kind: 'compare';
    op: CompareOp;
    left: Expr;
    right: Expr;
}> | Readonly<{
    kind: 'bool';
    op: BoolOp;
    left: Expr;
    right: Expr;
}> | Readonly<{
    kind: 'not';
    operand: Expr;
}> | Readonly<{
    kind: 'isNull';
    operand: Expr;
}> | Readonly<{
    kind: 'fillNull';
    operand: Expr;
    value: ScalarValue;
}> | Readonly<{
    kind: 'cast';
    operand: Expr;
    to: DType;
}> | Readonly<{
    kind: 'agg';
    op: AggOp;
    operand: Expr;
}>
/** dt accessor: extract a calendar field from a date32 or timestamp column. */
 | Readonly<{
    kind: 'dt';
    component: DtComponent;
    operand: Expr;
}>;
/** Anything accepted where an expression operand is expected. Raw scalars wrap to `lit`. */
type ExprLike = Expr | ScalarValue;
/** Wrap an {@link ExprLike} into an {@link Expr} (raw scalar → `lit`). */
declare function toExpr(x: ExprLike): Expr;
/**
 * An immutable expression tree node with a chainable, pandas-familiar surface
 * (spec §4). Every method returns a new `Expr`; the receiver is never mutated.
 */
declare class Expr {
    /** The frozen AST node this expression wraps. */
    readonly node: ExprNode;
    /** @internal — construct via {@link col}/{@link lit} or a chained method. */
    constructor(node: ExprNode);
    add(other: ExprLike): Expr;
    sub(other: ExprLike): Expr;
    mul(other: ExprLike): Expr;
    div(other: ExprLike): Expr;
    mod(other: ExprLike): Expr;
    neg(): Expr;
    gt(other: ExprLike): Expr;
    ge(other: ExprLike): Expr;
    lt(other: ExprLike): Expr;
    le(other: ExprLike): Expr;
    eq(other: ExprLike): Expr;
    ne(other: ExprLike): Expr;
    and(other: ExprLike): Expr;
    or(other: ExprLike): Expr;
    not(): Expr;
    isNull(): Expr;
    /** `notNull` = `not(isNull)` (dtypes.md §4.5). */
    notNull(): Expr;
    fillNull(value: ScalarValue): Expr;
    cast(to: DType): Expr;
    sum(): Expr;
    mean(): Expr;
    min(): Expr;
    max(): Expr;
    count(): Expr;
    nunique(): Expr;
    std(): Expr;
    var(): Expr;
    first(): Expr;
    last(): Expr;
    /**
     * dt accessor namespace for date32 / timestamp columns (dtypes.md §10, ADR-010).
     * Returns a {@link DtProxy} with `.year()`, `.month()`, `.day()`, `.hour()`,
     * `.minute()`, `.second()`, `.millisecond()`, `.weekday()`, `.dayOfYear()`, `.quarter()`.
     * Each method returns an `i32` Expr.
     */
    get dt(): DtProxy;
    /** Readable, unambiguous rendering for `console.log` / error messages. */
    toString(): string;
}
/**
 * dt accessor proxy returned by `Expr.dt`. Every method produces an `i32` Expr
 * extracting the named calendar field from the parent date32 / timestamp column.
 */
declare class DtProxy {
    private readonly operand;
    constructor(operand: Expr);
    year(): Expr;
    month(): Expr;
    day(): Expr;
    hour(): Expr;
    minute(): Expr;
    second(): Expr;
    millisecond(): Expr;
    weekday(): Expr;
    dayOfYear(): Expr;
    quarter(): Expr;
}
/** Reference the frame column named `name`. */
declare function col(name: string): Expr;
/**
 * A scalar literal. Its dtype is normally inferred from the operand it is combined
 * with (an integer numeric literal adopts an integer column's dtype, a fractional
 * one triggers int→float widening — see `./dtypes.ts`). Pass `dtype` to pin it.
 */
declare function lit(value: ScalarValue, dtype?: DType): Expr;

/**
 * Type & validity resolution (Phase 3, P3.1 deliverable §2; dtypes.md §3.1 + §5).
 *
 * `resolve(expr, schema)` type-checks an {@link Expr} and lowers it to a **typed IR**
 * ({@link TExpr}) the compiler executes directly. It encodes:
 *
 *   - result-dtype inference (arith lattice dtypes.md §3.1, comparison/boolean → `bool`,
 *     aggregation result matrix dtypes.md §4.3),
 *   - the single implicit conversion — **int→float widening in mixed arithmetic** —
 *     materialised as an explicit {@link TCast} node so the compiler just emits a cast
 *     kernel (dtypes.md §5 "cast-insertion points"),
 *   - literal typing: a bare numeric literal adopts the dtype of the operand it is
 *     combined with; a *fractional* literal against an integer column triggers the same
 *     widening (documented extension of the §3.1 rule to literal operands),
 *   - unsupported-mix errors naming **both** dtypes and the op (spec §4 ergonomics).
 *
 * Identity casts survive as `TCast{from===to}`; the compiler elides the kernel
 * (dtypes.md §2). Range/validity nulling is a runtime concern handled by the cast /
 * div / mod kernels, not here.
 */

/** The dtype view of a frame the type checker needs (a subset of `FrameView`). */
interface Schema {
    /** Dtype of column `name`, or `undefined` if absent. */
    dtypeOf(name: string): DType | undefined;
    /** All column names (for nearest-match suggestions). */
    columnNames(): readonly string[];
}
/** Build a {@link Schema} from a plain `name → dtype` record (handy in tests). */
declare function schemaOf(record: Readonly<Record<string, DType>>): Schema;
/** A type-resolved expression node. `dtype` is the node's result dtype. */
type TExpr = Readonly<{
    kind: 'col';
    name: string;
    dtype: DType;
}> | Readonly<{
    kind: 'lit';
    value: ScalarValue;
    dtype: DType;
}> | Readonly<{
    kind: 'arith';
    op: ArithOp;
    dtype: DType;
    left: TExpr;
    right: TExpr;
}> | Readonly<{
    kind: 'neg';
    dtype: DType;
    operand: TExpr;
}> | Readonly<{
    kind: 'compare';
    op: CompareOp;
    dtype: 'bool';
    operandDtype: DType;
    left: TExpr;
    right: TExpr;
}> | Readonly<{
    kind: 'bool';
    op: BoolOp;
    dtype: 'bool';
    left: TExpr;
    right: TExpr;
}> | Readonly<{
    kind: 'not';
    dtype: 'bool';
    operand: TExpr;
}> | Readonly<{
    kind: 'isNull';
    dtype: 'bool';
    operand: TExpr;
}> | Readonly<{
    kind: 'fillNull';
    dtype: DType;
    operand: TExpr;
    value: ScalarValue;
}> | Readonly<{
    kind: 'cast';
    dtype: DType;
    from: DType;
    operand: TExpr;
}> | Readonly<{
    kind: 'agg';
    op: AggOp;
    dtype: DType;
    operandDtype: DType;
    operand: TExpr;
}>
/** dt accessor: extract a calendar field (result dtype = 'i32', dtypes.md §10). */
 | Readonly<{
    kind: 'dt';
    component: DtComponent;
    dtype: 'i32';
    operand: TExpr;
}>;
/** Resolve `expr` against `schema`, returning the typed IR. Throws {@link ExprError}. */
declare function resolve(expr: Expr, schema: Schema): TExpr;
/** Convenience: the top-level result dtype of `expr` (`'bool'` for predicates). */
declare function inferType(expr: Expr, schema: Schema): DType;
/** Result dtype of aggregation `op` over operand dtype `d`; throws if unsupported. */
declare function aggResult(op: AggOp, d: DType): DType;

/**
 * The surface the expression compiler consumes from a frame (Phase 3, P3.1).
 *
 * The DataFrame layer (P3.2) implements {@link FrameView} and hands it to
 * {@link compile}/{@link compileFilter}. It is deliberately tiny: column lookup by
 * name, a row count, and the memory + kernel handles the compiler needs to allocate
 * temporaries and dispatch kernels. Keeping it small keeps the compiler decoupled
 * from the concrete DataFrame implementation.
 */

/**
 * The loaded wasm instance's kernel exports. Every Phase-2 kernel (ABI §9) lives on
 * the **same** instance as the Phase-1 memory core, so `memory`/`alloc`/`free` here
 * are the identical bindings behind {@link MemoryContext.mod} — allocations made
 * through the context are visible to these kernels (same linear memory).
 *
 * Kernel functions are reached by their ABI name; {@link callKernel} does the typed
 * lookup so the rest of the compiler never touches the index signature directly.
 */
interface KernelWasm {
    readonly memory: WebAssembly.Memory;
    alloc(size: number): number;
    free(ptr: number): void;
    realloc(ptr: number, newSize: number): number;
    mem_generation(): number;
}
/** A kernel export: flat C ABI, wasm value types in/out (ABI §5). */
type KernelFn = (...args: number[]) => number;
/** Look up and invoke kernel `name` on `wasm` (ABI §6 naming). */
declare function callKernel(wasm: KernelWasm, name: string, args: readonly number[]): number;
/**
 * Everything the compiler needs from a frame to type-check, allocate, and run a plan.
 * Implements {@link Schema} (via `dtypeOf`/`columnNames`) so it doubles as the type
 * checker's schema.
 */
interface FrameView extends Schema {
    /** Row count (`size`, dtypes.md §4.4). Every column has this length. */
    readonly length: number;
    /** Allocator + the single `viewOf` accessor over the wasm linear memory. */
    readonly ctx: MemoryContext;
    /** The kernel exports (same instance as `ctx.mod`, see {@link KernelWasm}). */
    readonly wasm: KernelWasm;
    /** Resolve column `name` to its {@link Column}, or `undefined` if absent. */
    getColumn(name: string): Column | undefined;
}

/**
 * JS-side dispatch stubs for the hash kernel family (Phase 2, Agent D).
 *
 * Thin wrappers over the raw WASM exports that implement the two retry
 * protocols defined in wasm-abi.md §9 D (this is Phase 3's contract):
 *
 * 1. **HT-grow protocol** (`group_build`, `join_*`): if the kernel returns
 *    `-1` (hash table full), double `htCap`, re-zero the table, and re-call.
 *
 * 2. **Out-grow protocol** (`join_*`): if the kernel returns `n > outCap`,
 *    the caller should re-allocate `out_l_idx` and `out_r_idx` to `n` and
 *    re-call.  The JS stubs here implement that loop transparently.
 *
 * Both retry paths are tested in `tests/kernels/hash/` (including forced tiny
 * `htCap` / `outCap` variants).
 */
/**
 * The subset of WASM exports consumed by the hash family stubs.
 * The actual `WebAssembly.Instance.exports` object is cast to this at
 * load time; all hash_dt, group_build, and join exports live here.
 */
interface HashExports {
    /** `alloc(size) -> ptr` — 16-byte aligned, 0 on OOM (ABI §3). */
    alloc(size: number): number;
    /** `free(ptr)` — free(0) is a no-op (ABI §3). */
    free(ptr: number): void;
    /** Single linear memory shared by all kernels (ABI §2). */
    readonly memory: WebAssembly.Memory;
    /** `hash_i32(data, vp, out_hash, len) -> ()` */
    hash_i32(data: number, vp: number, outHash: number, len: number): void;
    /** `hash_u32(data, vp, out_hash, len) -> ()` */
    hash_u32(data: number, vp: number, outHash: number, len: number): void;
    /** `hash_f64(data, vp, out_hash, len) -> ()` */
    hash_f64(data: number, vp: number, outHash: number, len: number): void;
    /** `hash_f32(data, vp, out_hash, len) -> ()` */
    hash_f32(data: number, vp: number, outHash: number, len: number): void;
    /** `hash_i64(data, vp, out_hash, len) -> ()` — v2.3 i64 column hash. */
    hash_i64(data: number, vp: number, outHash: number, len: number): void;
    /** `hash_combine(acc_hash, add_hash, len) -> ()` — in-place multi-key mix. */
    hash_combine(accHash: number, addHash: number, len: number): void;
    /**
     * `group_build(hash_ptr, len, ht_ptr, ht_cap, out_group_ids) -> i32`
     *
     * Returns `group_count` (≥ 0) or `-1` if the HT is too small.
     */
    group_build(hashPtr: number, len: number, htPtr: number, htCap: number, outGroupIds: number): number;
    /**
     * `join_hash_inner / join_hash_left(...) -> i32`
     *
     * Returns total pair count, or `-1` if HT too small.
     */
    join_hash_inner(lhPtr: number, lVp: number, lLen: number, rhPtr: number, rVp: number, rLen: number, htPtr: number, htCap: number, outLIdx: number, outRIdx: number, outCap: number): number;
    join_hash_left(lhPtr: number, lVp: number, lLen: number, rhPtr: number, rVp: number, rLen: number, htPtr: number, htCap: number, outLIdx: number, outRIdx: number, outCap: number): number;
}

/**
 * DataFrame runtime: the wasm instance (allocator + memory + full kernel surface)
 * bundled with its MemoryContext. Instantiates the binary directly (loadWasmModule only
 * exposes the memory core) so the frame layer can reach every Phase-2 kernel by ABI name.
 * `init()` installs a process-wide default so `DataFrame.fromColumns({...})` needs no plumbing.
 */

type FrameWasm = KernelWasm & HashExports;
interface DfRuntime {
    readonly ctx: MemoryContext;
    readonly wasm: FrameWasm;
}
declare function runtimeFromExports(exports: WebAssembly.Exports, simd: boolean): DfRuntime;
declare function loadRuntime(opts?: LoadOptions): Promise<DfRuntime>;
declare function init(opts?: LoadOptions): Promise<DfRuntime>;
declare function useRuntime(rt: DfRuntime): void;
declare function defaultRuntime(): DfRuntime;

/** Series — one named column, zero-copy over a frame's buffers (spec §4 `df.col('a')`).
 * Borrows (does not own) its parent's column; valid while that frame lives. Read-only. */

/**
 * Series.dt accessor proxy. Returned by `series.dt`; provides per-field
 * methods that return a new Series (dtype=i32) with the extracted values.
 *
 * Rules (dtypes.md §10, ADR-010, ADR-012):
 *   - timestamp columns: all 9 fields are valid.
 *   - date32 columns: year/month/day/weekday/dayOfYear/quarter are valid;
 *     hour/minute/second/millisecond throw a TypeError naming the op.
 *   - tz metadata on a timestamp column gives local-time components (ADR-010).
 */
declare class SeriesDtProxy {
    private readonly series;
    constructor(series: Series);
    private extract;
    year(): Series;
    month(): Series;
    day(): Series;
    hour(): Series;
    minute(): Series;
    second(): Series;
    millisecond(): Series;
    weekday(): Series;
    dayOfYear(): Series;
    quarter(): Series;
}
declare class Series {
    readonly name: string;
    readonly dtype: DType;
    readonly length: number;
    private readonly ctx;
    private readonly column;
    constructor(ctx: MemoryContext, name: string, column: Column);
    get col(): Column;
    toArray(): Cell[];
    get(i: number): Cell;
    values(): ColumnView;
    /**
     * dt accessor namespace for date32 / timestamp columns (dtypes.md §10, ADR-010, ADR-012).
     * Returns a {@link SeriesDtProxy} with accessor methods for each calendar field.
     * Throws TypeError for disallowed fields (e.g. hour on date32).
     */
    get dt(): SeriesDtProxy;
    [Symbol.iterator](): IterableIterator<Cell>;
    toString(): string;
}

/**
 * Row proxy for the lambda escape hatch (ADR-003): one reusable proxy object moved across
 * rows (no per-row allocation), reading live viewOf buffers with memoized utf8 decode. This
 * is the documented SLOW PATH — the expression API (filter/withColumn) is the fast path.
 */

type Row = Record<string, Cell>;
interface RowCursor {
    at(i: number): Row;
}

/**
 * GroupBy + agg (spec §4; ADR-005 hash grouping). Group: hash key columns (`hash_dt` +
 * `hash_combine`) and assign first-occurrence ids via `group_build`; string keys hash their
 * dictionary indices (no unification needed within one frame); null keys form one group
 * (dtypes.md §4.5). Aggregate: each operand is materialised once over the frame then reduced
 * per group by one JS scatter pass (no per-group boundary chatter). skipna + result-dtype per §4.3.
 */

type AggName = AggOp | 'size';
type AggRequest = AggName | AggName[] | Expr;
type AggSpec = Record<string, AggRequest>;
interface NamedColumn {
    readonly name: string;
    readonly col: Column;
}
interface GroupBySource extends FrameView {
    readonly rt: DfRuntime;
    buildResult(named: NamedColumn[]): DataFrame;
}
declare class GroupBy {
    private readonly src;
    private readonly keys;
    constructor(src: GroupBySource, keys: string[]);
    agg(spec: AggSpec): DataFrame;
    private buildPlan;
    private columnPlan;
    private exprPlan;
}

/**
 * Hash join (spec §4; ADR-005). Builds on the right, probes left, via `join_hash_inner`/
 * `join_hash_left` (ABI §9 D; left emits r_idx=-1 → nulls). utf8 keys are dictionary-unified
 * (JS unifyDictionaries) so equal strings across frames share a merged index; bool widens to
 * i32; a null in any key excludes the row. Output = all left columns + right non-key columns
 * (colliding right names suffixed _right).
 */

type JoinHow = 'inner' | 'left';
interface JoinOptions {
    on: string | string[];
    how?: JoinHow;
}
type JoinSource = GroupBySource;

/**
 * DataFrame — the public columnar frame (spec §4). Every op returns a NEW frame; buffers are
 * shared zero-copy where no data changes (select/drop/untouched withColumn, head/tail/slice)
 * and reference-counted ({@link OwnedColumn}) so `dispose()` is order-independent. Expression
 * ops (filter/withColumn) run the P3.1 compiler (fast path); filterFn/mapFn are the ADR-003
 * slow path. Use `scope(fn)` to dispose a batch of intermediates.
 */

interface FrameOptions {
    readonly dtypes?: Readonly<Record<string, DType>>;
    readonly runtime?: DfRuntime;
    /**
     * IANA timezone strings for `timestamp` columns (ADR-010 §10 tz metadata).
     * Keys are column names; values are IANA tz strings (e.g. `"America/New_York"`).
     * Applied only to columns whose dtype is `'timestamp'`; ignored for other dtypes.
     * Used by Arrow/CSV IO layers to propagate tz metadata from the source format.
     */
    readonly tzs?: Readonly<Record<string, string>>;
}
interface SortOptions {
    readonly descending?: boolean | readonly boolean[];
}
interface WithColumnOptions {
    readonly dtype?: DType;
}
declare class DataFrame implements FrameView, GroupBySource {
    readonly length: number;
    private readonly _rt;
    private readonly entries;
    private readonly byName;
    private disposed;
    private constructor();
    get ctx(): MemoryContext;
    get wasm(): KernelWasm;
    get rt(): DfRuntime;
    getColumn(name: string): Column | undefined;
    dtypeOf(name: string): DType | undefined;
    columnNames(): readonly string[];
    buildResult(named: NamedColumn[]): DataFrame;
    static fromColumns(cols: Readonly<Record<string, ColumnInput>>, opts?: FrameOptions): DataFrame;
    static fromRecords(records: ReadonlyArray<Readonly<Record<string, Cell>>>, opts?: FrameOptions): DataFrame;
    private static fromRoots;
    get shape(): readonly [number, number];
    get columns(): readonly string[];
    get dtypes(): Readonly<Record<string, DType>>;
    col(name: string): Series;
    select(names: readonly string[]): DataFrame;
    drop(names: readonly string[]): DataFrame;
    withColumn(name: string, value: Expr | ColumnInput, opts?: WithColumnOptions): DataFrame;
    assign(name: string, value: Expr | ColumnInput, opts?: WithColumnOptions): DataFrame;
    filter(predicate: Expr): DataFrame;
    filterFn(fn: (row: Row) => boolean): DataFrame;
    mapFn<T>(fn: (row: Row) => T): T[];
    sortValues(by: string | readonly string[], opts?: SortOptions): DataFrame;
    groupby(keys: string | readonly string[]): GroupBy;
    join(other: DataFrame, opts: JoinOptions): DataFrame;
    head(n?: number): DataFrame;
    tail(n?: number): DataFrame;
    slice(start: number, end?: number): DataFrame;
    private sliceRange;
    toColumns(): Record<string, Cell[]>;
    toRecords(): Array<Record<string, Cell>>;
    describe(): DataFrame;
    dispose(): void;
    toString(): string;
    private entryOf;
    private retainEntry;
    private shareEntries;
    private materializeColumn;
    private gatherRows;
    private render;
}
declare function scope<T>(fn: (track: <F extends DataFrame>(df: F) => F) => T): T;

export { createMemoryContext as $, type AggName as A, type BoolOp as B, type Column as C, type DType as D, Expr as E, type FrameView as F, GroupBy as G, type SortOptions as H, type TypedArrayCtor as I, type JoinHow as J, type KernelFn as K, type LoadOptions as L, type MemoryContext as M, type NamedColumn as N, type ViewOf as O, type WasmMemoryModule as P, type WithColumnOptions as Q, type Row as R, type ScalarValue as S, type TExpr as T, aggResult as U, type ViewDType as V, type WasmExports as W, callKernel as X, col as Y, columnToArray as Z, createColumn as _, type Cell as a, createViewOf as a0, decodeDictionary as a1, decodeSlot as a2, decodeStats as a3, defaultRuntime as a4, detectSimd as a5, dtypeInfo as a6, freeColumn as a7, freeDictionary as a8, inferType as a9, init as aa, lit as ab, loadRuntime as ac, loadWasmModule as ad, resolve as ae, runtimeFromExports as af, schemaOf as ag, scope as ah, sliceColumn as ai, toExpr as aj, unifyDictionaries as ak, useRuntime as al, writeDictionary as am, type DfRuntime as b, DataFrame as c, type FrameOptions as d, type AggOp as e, type AggRequest as f, type AggSpec as g, type ArithOp as h, type ColumnBuffer as i, type ColumnInput as j, type ColumnView as k, type CompareOp as l, DTYPES as m, type DTypeInfo as n, type DictUnifyResult as o, type Dictionary as p, type ExprLike as q, type ExprNode as r, type FrameWasm as s, type GroupBySource as t, type JoinOptions as u, type JoinSource as v, type KernelWasm as w, type RowCursor as x, type Schema as y, Series as z };
