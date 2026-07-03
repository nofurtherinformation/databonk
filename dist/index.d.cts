import { D as DType, C as Column, a as Cell, E as Expr, F as FrameView, b as DfRuntime, c as DataFrame, d as FrameOptions } from './dataframe-Bz1B7bIr.cjs';
export { A as AggName, e as AggOp, f as AggRequest, g as AggSpec, h as ArithOp, B as BoolOp, i as ColumnBuffer, j as ColumnInput, k as ColumnView, l as CompareOp, m as DTYPES, n as DTypeInfo, o as DictUnifyResult, p as Dictionary, q as DtProxy, r as ExprLike, s as ExprNode, t as FrameWasm, G as GroupBy, u as GroupBySource, J as JoinHow, v as JoinOptions, w as JoinSource, K as KernelFn, x as KernelWasm, L as LoadOptions, M as MemoryContext, N as NamedColumn, R as Row, y as RowCursor, S as ScalarValue, z as Schema, H as Series, I as SeriesStrProxy, O as SortOptions, P as StrOp, Q as StrProxy, T as TExpr, U as TypedArrayCtor, V as ViewDType, W as ViewOf, X as WasmExports, Y as WasmMemoryModule, Z as WithColumnOptions, _ as aggResult, $ as callKernel, a0 as col, a1 as columnToArray, a2 as createColumn, a3 as createMemoryContext, a4 as createViewOf, a5 as decodeDictionary, a6 as decodeSlot, a7 as decodeStats, a8 as defaultRuntime, a9 as detectSimd, aa as dtypeInfo, ab as freeColumn, ac as freeDictionary, ad as inferType, ae as init, af as lit, ag as loadRuntime, ah as loadWasmModule, ai as resolve, aj as runtimeFromExports, ak as schemaOf, al as scope, am as sliceColumn, an as toExpr, ao as unifyDictionaries, ap as useRuntime, aq as writeDictionary, ar as writeDictionaryFromRawBytes } from './dataframe-Bz1B7bIr.cjs';
export { T as ThreadsConfig, a as ThreadsHandle } from './parallel-fv5h4BkA.cjs';

/**
 * Arrow validity-bitmap helpers (ABI §4.1): **LSB-first, `1 = valid`, `0 = null`**.
 *
 * A bitmap is `ceil(len / 8)` bytes; element `i` is valid iff
 * `bitmap[i >> 3] & (1 << (i & 7))` is nonzero. Bits past `len` in the final byte
 * are padding and are written `0` (kernels must not depend on them). These helpers
 * operate on a `Uint8Array` view obtained through `viewOf` — never a cached view.
 *
 * NOTE ON SLICES: a sliced column shares its parent's bitmap and reads it at a
 * *bit offset* (`Column.validityBitOffset`). Callers pass `bitOffset + i` here, so
 * these primitives stay offset-agnostic (`i` is an absolute bit index).
 */
/** Bytes needed for a `len`-bit validity bitmap: `ceil(len / 8)`. */
declare function validityBytes(len: number): number;
/** True iff bit `i` is set (element valid) in an LSB-first bitmap. */
declare function getBit(bitmap: Uint8Array, i: number): boolean;
/** Set bit `i` (mark element valid). */
declare function setBit(bitmap: Uint8Array, i: number): void;
/** Clear bit `i` (mark element null). */
declare function clearBit(bitmap: Uint8Array, i: number): void;

/**
 * Expression-layer errors (Phase 3, P3.1). Spec §4 ergonomics: dtype mismatches
 * name **both** dtypes and the operation; unknown column names suggest the nearest
 * match. All expression-time failures are {@link ExprError} so the frame layer can
 * catch and re-surface them uniformly.
 */

/** Base class for every expression compile/eval error. */
declare class ExprError extends Error {
    constructor(message: string);
}
/**
 * A binary op was handed two dtypes it cannot combine (dtypes.md §3.1: only
 * int→float widening is implicit). Message names both dtypes and the op.
 */
declare function dtypeMismatch(op: string, left: DType, right: DType, hint?: string): ExprError;
/** An op was applied to a dtype it does not support at all (e.g. arithmetic on utf8). */
declare function unsupportedDtype(op: string, dtype: DType, hint?: string): ExprError;
/** A cast that is not in the v1 matrix (dtypes.md §2, the ✗ cells). */
declare function unsupportedCast(from: DType, to: DType): ExprError;
/** Column `name` was not found; suggest the closest known column if any. */
declare function unknownColumn(name: string, known: readonly string[]): ExprError;
/** A literal value's JS type does not match the dtype it must adopt. */
declare function badLiteral(value: unknown, dtype: DType, op: string): ExprError;
/** Closest known name to `name` within a small edit distance, else `null`. */
declare function nearest(name: string, known: readonly string[]): string | null;

/**
 * Compiler runtime (Phase 3, P3.1 deliverable §3 buffer lifecycle).
 *
 * A {@link Runtime} wraps a {@link FrameView}'s memory context + kernel exports and
 * is the single owner of every **temporary** the compiler allocates. It:
 *
 *   - allocates/free's through the arena, tracking live temp pointers so the plan
 *     leaves **zero** leaked buffers (verified against the arena high-water / free
 *     balance in the leak tests),
 *   - dispatches kernels by ABI name (ABI §6) and records an ordered {@link Trace}
 *     of kernel calls + allocations so fusion is verifiable by plan inspection,
 *   - hands out `viewOf` views (never cached — ADR-001).
 *
 * Ownership model: a pointer is in {@link Runtime.owned} iff the runtime allocated it
 * and has neither freed nor *transferred* it. Source-column buffers are never owned.
 * At the end of a plan the result's buffers are transferred out; everything else is
 * freed.
 */

/** Derived, test-friendly counters over a {@link Trace}. */
interface ExecStats {
    /** Total kernel invocations. */
    readonly kernelCalls: number;
    /** Kernel names in call order. */
    readonly kernels: readonly string[];
    /** Total temp allocations. */
    readonly allocations: number;
    /** Data-buffer allocations only (the elementwise-fusion metric). */
    readonly dataAllocations: number;
    /** Mask-buffer allocations only (the compare→filter fusion metric). */
    readonly maskAllocations: number;
    /** Free calls issued. */
    readonly frees: number;
}

/**
 * Expression compiler + executor (Phase 3, P3.1 deliverables §3/§4).
 *
 * `compile(expr, frame)` type-checks (`./dtypes.ts`) then lowers the typed IR to an
 * ordered sequence of Phase-2 kernel calls over the frame's {@link Column}s, and runs
 * it. `compileFilter(predicate, frame)` produces a reusable {@link Selection} for the
 * `df.filter` path.
 *
 * ## Validity handling (dtypes.md §5)
 * Elementwise arithmetic/comparison kernels are data-only; null propagation is a
 * separate `validity_and` / unary copy. Integer `div`/`mod` additionally null out
 * zero-divisor rows (dtypes.md §3.2) via a `divisor != 0` mask AND'd into validity —
 * the data-only kernels cannot express that themselves.
 *
 * ## Fusion (spec P3.1)
 *  - **compare → filter**: a comparison lowers straight to a 1-bit mask that `filter`
 *    consumes; no bool column is materialised (see {@link compileFilter} /
 *    {@link Selection.compact}). One mask, one compaction per column.
 *  - **elementwise chains**: an op whose operand is an *owned* temp writes its output
 *    **in place** into that buffer, so a linear chain reuses ONE data buffer instead
 *    of allocating one per node (see {@link Runtime}).
 *
 * ## Buffer lifecycle
 * Every temporary is owned by the {@link Runtime}; the result's buffers are transferred
 * out (fully owned by the returned {@link Column}) and everything else is freed — no
 * leaks (verified against arena stats in the leak tests).
 */

/** Whether a compiled expression yields a column or a single scalar (aggregation). */
type ResultKind = 'column' | 'scalar';
/** A scalar (aggregation) result. */
interface ScalarResult {
    readonly value: Cell;
    readonly dtype: DType;
}
/** The outcome of {@link CompiledPlan.execute}. */
interface PlanResult {
    readonly kind: ResultKind;
    /** Present iff `kind === 'column'`. Caller owns it — free via `freeColumn`. */
    readonly column?: Column;
    /** Present iff `kind === 'scalar'`. */
    readonly scalar?: ScalarResult;
    /** Kernel-call + allocation counters for the run (plan inspection). */
    readonly stats: ExecStats;
}
/** A type-checked, ready-to-run expression. */
interface CompiledPlan {
    /** Result dtype (`'bool'` for predicates; the scalar dtype for aggregations). */
    readonly dtype: DType;
    /** Whether {@link execute} yields a column or a scalar. */
    readonly resultKind: ResultKind;
    /** Run the plan over the bound frame, returning the result + stats. */
    execute(): PlanResult;
}
/**
 * Type-check `expr` against `frame` and bind it for execution. Throws
 * {@link ExprError} on any dtype/column error (before running anything).
 */
declare function compile(expr: Expr, frame: FrameView): CompiledPlan;
/**
 * A compiled selection over a frame: the effective row mask plus a `compact` that
 * materialises the kept rows of any column. Fusion (a): a bare comparison predicate
 * lowers to ONE mask; each `compact` is ONE `filter` kernel — no bool column.
 */
interface Selection {
    /** Number of selected rows. */
    readonly count: number;
    /** Compact `col` to the selected rows (caller owns the result — `freeColumn`). */
    compact(col: Column): Column;
    /** Release the mask + scratch. Call once after all `compact`s. */
    free(): void;
    /** Live kernel/alloc counters (accumulates across `compact` calls). */
    readonly stats: ExecStats;
}
/** A type-checked predicate ready to produce a {@link Selection}. */
interface CompiledFilter {
    execute(): Selection;
}
/**
 * Type-check `predicate` (must be boolean) and bind it as a filter. The `df.filter`
 * path calls `execute()` once, then `compact`s each surviving column.
 */
declare function compileFilter(predicate: Expr, frame: FrameView): CompiledFilter;

/** Frame-layer errors (spec §4): unknown column suggests the nearest name (shared
 * Levenshtein), dtype mismatch names both dtypes + the op. FrameError extends Error. */

declare class FrameError extends Error {
    constructor(message: string);
}

/**
 * RFC-4180 CSV parser with typed column inference.
 *
 * Key features:
 *   - Quoted fields, escaped quotes (""), embedded newlines and delimiters.
 *   - CRLF and bare LF line endings; lone CR treated as data.
 *   - Streaming-friendly internal design: `ChunkParser` is a stateful, chunk-fed
 *     parser (feed(s)/finish()). `fromCSV` drives it synchronously over the full text.
 *     ReadableStream adapter is a v2 nice-to-have (see ponytail note below).
 *
 * Type inference ladder (applied column-by-column over a sample of up to
 * `INFER_ROWS` rows after null-value stripping):
 *
 *   1. i32   — integer in [-(2^31), 2^31-1], no decimal point, no exponent.
 *   2. i64   — integer text exceeding Number.MAX_SAFE_INTEGER (|x| > 2^53-1, per ADR-009).
 *              Promotes when any non-null cell is a valid strict-integer string whose
 *              absolute value is above 9_007_199_254_740_991 (2^53−1) but within i64 range.
 *              Once promoted, the column stays i64 even if later cells are in safe range.
 *              Cells whose BigInt value overflows i64 → utf8 fallback.
 *   3. f64   — any string parseable by `Number()` that is finite (or ±Infinity),
 *              i.e. `!isNaN(n)` after trimming.
 *   4. bool  — case-insensitive "true" / "false".
 *   5. utf8  — fallback.
 *
 * Explicit dtype overrides (`dtypes` option):
 *   - `'i64'`       — parse via BigInt(text); throws on non-integer strings.
 *   - `'date32'`    — parse via strict 'yyyy-MM-dd'; throws on invalid format.
 *   - `'timestamp'` — parse via strict ISO-8601 with 'Z' or explicit UTC offset;
 *                     throws on ambiguous local-time strings (no silent tz guessing).
 *
 * Null values: the `nullValues` option (default `['', 'null', 'NA']`) is
 * checked BEFORE inference. A null-value cell becomes `null` in any dtype column.
 *
 * v2 nice-to-have (not shipped): ReadableStream adapter wrapping ChunkParser.
 * // ponytail: fromCSVStream(stream, opts) → v2 when ReadableStream usage is confirmed
 */

interface FromCsvOptions {
    /** Column delimiter (default: ','). */
    readonly delimiter?: string;
    /** If true (default), treat first row as column headers. */
    readonly header?: boolean;
    /**
     * Override column names (used when header=false, or to rename columns).
     * When header=true, these override the parsed header names.
     */
    readonly columns?: readonly string[];
    /** Force specific dtypes (column name → dtype). Skips inference for those columns. */
    readonly dtypes?: Readonly<Record<string, DType>>;
    /**
     * Values treated as null (case-sensitive). Default: `['', 'null', 'NA']`.
     * An empty string means the empty field is null (the default for CSV).
     */
    readonly nullValues?: readonly string[];
    /** Skip this many rows from the top (before header if present). */
    readonly skipRows?: number;
    /** Maximum number of data rows to read (not counting header or skipped rows). */
    readonly maxRows?: number;
    /** Runtime to use. If omitted, uses the default runtime. */
    readonly runtime?: DfRuntime;
}
/**
 * Stateful RFC-4180 CSV parser.
 * Feed text chunks with `feed(s)` and call `finish()` to flush the last row.
 * Each completed row is passed to the `onRow` callback.
 *
 * Design: simple state machine over a single `remaining` string. Performance is
 * not critical here (CSV ingestion is I/O-bound); correctness is.
 */
declare class ChunkParser {
    private buf;
    private row;
    private field;
    private inQuote;
    private readonly delim;
    private readonly onRow;
    constructor(delimiter: string, onRow: (row: string[]) => void);
    feed(chunk: string): void;
    finish(): void;
    private parse;
    private emitRow;
}
/**
 * Parse a CSV string into a DataFrame.
 *
 * @param text   - Full CSV text (a chunk-fed path for streaming is internal).
 * @param opts   - Parsing and inference options.
 *
 * @throws If there are ragged rows (inconsistent column count) or unterminated quotes.
 */
declare function fromCSV(text: string, opts?: FromCsvOptions): DataFrame;

/**
 * JSON I/O thin wrappers.
 *
 * The spec (§4 + §7) asks for fromJSON/toJSON — but DataFrame.fromRecords and
 * df.toRecords() already ARE the JSON path:
 *
 *   df.toRecords()          → Array<Record<string, Cell>> — serialize with JSON.stringify
 *   DataFrame.fromRecords() → DataFrame                  — parse with JSON.parse first
 *
 * This module exports `fromJSON` and `toJSON` as thin wrappers so callers have a
 * discoverable one-liner, but the parallel implementation is intentionally avoided:
 * these delegates call through to the existing frame-layer implementation (no duplicate
 * column-building code). They add value only in ergonomics, not behavior.
 *
 * fromRecords / toRecords remain the canonical JSON path per the spec.
 */

/**
 * Parse a JSON array-of-records string into a DataFrame.
 * Equivalent to `DataFrame.fromRecords(JSON.parse(json), opts)`.
 *
 * @param json - A JSON string encoding an array of plain objects.
 * @param opts - Forwarded to DataFrame.fromRecords.
 * @throws SyntaxError if `json` is not valid JSON.
 * @throws TypeError if the parsed value is not an array.
 */
declare function fromJSON(json: string, opts?: FrameOptions): DataFrame;
/**
 * Serialize a DataFrame to a compact JSON string (array of record objects).
 * Equivalent to `JSON.stringify(df.toRecords())`.
 *
 * @param df - The DataFrame to serialize.
 * @returns A JSON string. Null cells serialize as JSON `null`.
 */
declare function toJSON(df: DataFrame): string;

/**
 * Arrow IPC stream encode/decode for databonk DataFrames (ADR-002, ADR-009, ADR-010).
 *
 * Our layout is Arrow-compatible by design:
 *   - Numeric columns: contiguous TypedArray → Arrow primitive buffer (zero-transform).
 *   - Validity bitmaps: LSB-first, 1=valid — already Arrow format (zero-transform).
 *   - utf8 columns: i32 indices + (i32 offsets + u8 bytes) dict → Arrow Dict<Int32, Utf8>.
 *   - bool: u8[n] per-element → bit-pack to Arrow's 1-bit-per-element format (one transform).
 *   - i64 → Arrow Int(64, signed); date32 → Arrow Date(DAY); timestamp → Arrow Timestamp(MILLI, tz?).
 *
 * IPC stream per message: [int32 -1] [int32 meta_size] [meta bytes, pad→8B] [body bytes, pad→8B]
 * EOS: [int32 -1] [int32 0]
 *
 * FlatBuffers field-index constants — sourced from the Arrow FlatBuffers IDL:
 *   Message:          version(0), header_type(1), header(2), bodyLength(3)
 *   Schema:           endianness(0), fields(1)
 *   Field:            name(0), nullable(1), type_type(2), type(3), dictionary(4), children(5)
 *   RecordBatch:      length(0), nodes(1), buffers(2)
 *   DictionaryBatch:  id(0), data(1), isDelta(2)
 *   DictionaryEncoding: id(0), indexType(1), isOrdered(2)
 *   Int:              bitWidth(0), isSigned(1)
 *   FloatingPoint:    precision(0)
 *   Date:             unit(0) — DateUnit: DAY=0, MILLISECOND=1 (FlatBuffers default=1)
 *   Timestamp:        unit(0) — TimeUnit: SECOND=0, MILLISECOND=1, MICROSECOND=2, NANOSECOND=3;
 *                     timezone(1) — optional IANA tz string
 *
 * MessageHeader union tags: Schema=1, DictionaryBatch=2, RecordBatch=3
 * Type union tags:          Int=2, FloatingPoint=3, Utf8=5, Bool=6, Date=8, Timestamp=10, LargeUtf8=20
 * MetadataVersion V5=4
 * FloatingPoint.Precision: HALF=0, SINGLE=1, DOUBLE=2
 */

/**
 * Encode a DataFrame to an Arrow IPC stream (Uint8Array).
 *
 * Stream: Schema message → DictionaryBatch per utf8 column → RecordBatch → EOS.
 * Dictionary-encoded columns use Arrow Dict<Int32, Utf8>; our offsets/bytes
 * buffers pass through directly (ADR-002 "nearly free").
 * Bool columns are repacked from u8 to bit-packed (the ONE real transform).
 */
declare function toArrow(df: DataFrame): Uint8Array;
/**
 * Decode an Arrow IPC stream buffer into a DataFrame.
 *
 * Supported Arrow types: Int32, Int64, UInt32, Float32, Float64, Bool,
 * Dict<Int32, Utf8> (written by our toArrow), plain Utf8 (builds a dict internally),
 * Date32(DAY) (→ date32), Timestamp(any unit, optional tz) (→ timestamp, rescaled to ms).
 * Any other type throws a clear error naming the type tag.
 */
declare function fromArrow(buf: Uint8Array, rt: DfRuntime): DataFrame;

/**
 * dataframe — columnar WASM dataframe library
 */

declare const VERSION = "0.2.0";
/** Returns a greeting string. Placeholder retained for the scaffold smoke test. */
declare function hello(name?: string): string;

export { Cell, ChunkParser, Column, type CompiledFilter, type CompiledPlan, DType, DataFrame, DfRuntime, type ExecStats, Expr, ExprError, FrameError, FrameOptions, FrameView, type FromCsvOptions, type PlanResult, type ResultKind, type ScalarResult, type Selection, VERSION, badLiteral, clearBit, compile, compileFilter, dtypeMismatch, fromArrow, fromCSV, fromJSON, getBit, hello, nearest, setBit, toArrow, toJSON, unknownColumn, unsupportedCast, unsupportedDtype, validityBytes };
