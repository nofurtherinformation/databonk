import { b as DfRuntime, c as DataFrame } from './dataframe-BggBYXYm.js';

/**
 * databonk/parquet — Parquet I/O subpath export (ADR-011).
 *
 * Exported API:
 *   readParquet(bytes, rt)  → Promise<DataFrame>   (async; hyparquet reader)
 *   writeParquet(df, opts?) → Uint8Array            (sync; hyparquet-writer)
 *
 * Supported profile (ADR-011 §supported-profile):
 *   dtypes:      f64 f32 i32 u32 i64 bool utf8 date32 timestamp (+ nulls everywhere)
 *   compression: snappy and uncompressed
 *   utf8:        dictionary-encoded when beneficial
 *   timestamp:   INT64 + TIMESTAMP(MILLIS, isAdjustedToUTC); tz round-trips in
 *                file key_value_metadata as "databonk:tz:<colname>"
 *
 * Anything outside the profile raises a clear "unsupported" Error naming the feature —
 * never a silent wrong result (ADR-011 §Consequences).
 *
 * Dependencies (runtime):
 *   hyparquet        — reader (native Snappy decompressor included)
 *   hyparquet-writer — writer (native Snappy included, default UNCOMPRESSED)
 * Neither dependency leaks into the main "." entry — this subpath is the firewall.
 */

/** Write options for {@link writeParquet}. */
interface ParquetWriteOptions {
    /**
     * Compression codec.  Only `'snappy'` and `'uncompressed'` are supported
     * (ADR-011).  Defaults to `'uncompressed'`.
     */
    readonly compression?: 'snappy' | 'uncompressed';
}
/**
 * Read a Parquet file into a databonk {@link DataFrame}.
 *
 * @param bytes - The raw Parquet file bytes.
 * @param rt    - The databonk runtime (from `init()` / `defaultRuntime()`).
 *
 * @throws {Error} if the file uses any out-of-profile feature (ADR-011):
 *   compression other than SNAPPY/UNCOMPRESSED, nested/repeated columns,
 *   INT96 timestamps, DECIMAL, FIXED_LEN_BYTE_ARRAY, etc.
 */
declare function readParquet(bytes: Uint8Array | ArrayBuffer, rt: DfRuntime): Promise<DataFrame>;
/**
 * Encode a databonk {@link DataFrame} as a Parquet file (Uint8Array).
 *
 * All databonk dtypes are supported (ADR-011 §supported-profile).
 * Only `'snappy'` and `'uncompressed'` are valid `compression` values —
 * any other string throws a clear "unsupported" error.
 *
 * @param df   - The DataFrame to encode.
 * @param opts - Optional write options (compression, default `'uncompressed'`).
 */
declare function writeParquet(df: DataFrame, opts?: ParquetWriteOptions): Uint8Array;

export { type ParquetWriteOptions, readParquet, writeParquet };
