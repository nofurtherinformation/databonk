/**
 * GroupBy operations for DataFrames
 * Optimized for integer keys (zone representation)
 */

import { DataFrame } from '../dataframe/dataframe';
import { NumericColumn, DataType } from '../core/numeric-column';
import { ColumnType } from '../core/schema';
import { simdSumF32, simdSumF64 } from '../simd/simd-aggregations';

// FNV-1a hash constants
const FNV_OFFSET: u32 = 2166136261;
const FNV_PRIME: u32 = 16777619;

/**
 * Hash function for i32 keys (FNV-1a)
 */
@inline
function hashI32(value: i32): u32 {
  let hash = FNV_OFFSET;
  hash ^= value & 0xFF;
  hash = hash * FNV_PRIME;
  hash ^= (value >> 8) & 0xFF;
  hash = hash * FNV_PRIME;
  hash ^= (value >> 16) & 0xFF;
  hash = hash * FNV_PRIME;
  hash ^= (value >> 24) & 0xFF;
  hash = hash * FNV_PRIME;
  return hash;
}

/**
 * Hash function for i64 keys
 */
@inline
function hashI64(value: i64): u32 {
  let hash = FNV_OFFSET;
  for (let i: i32 = 0; i < 8; i++) {
    hash ^= <u32>((value >> (i * 8)) & 0xFF);
    hash = hash * FNV_PRIME;
  }
  return hash;
}

/**
 * GroupBy result structure
 */
@final
export class GroupByResult {
  /** Unique group keys */
  keys: NumericColumn;
  /** Number of groups */
  numGroups: i32;
  /** Map from group key to group index */
  private groupMap: Map<i32, i32>;
  /** Aggregated columns */
  aggregatedColumns: Map<string, NumericColumn>;

  constructor(keyColumn: NumericColumn, numGroups: i32, groupMap: Map<i32, i32>) {
    this.keys = keyColumn;
    this.numGroups = numGroups;
    this.groupMap = groupMap;
    this.aggregatedColumns = new Map<string, NumericColumn>();
  }

  /** Get the group index for a key */
  getGroupIndex(key: i32): i32 {
    if (this.groupMap.has(key)) {
      return this.groupMap.get(key);
    }
    return -1;
  }

  /** Convert to DataFrame */
  toDataFrame(keyColumnName: string): DataFrame {
    const df = new DataFrame();
    df.addInt32Column(keyColumnName, this.keys);

    const colNames = this.aggregatedColumns.keys();
    for (let i = 0; i < colNames.length; i++) {
      const name = colNames[i];
      const col = this.aggregatedColumns.get(name);
      // Determine type based on column's dtype
      if (col.dtype === DataType.Float32) {
        df.addFloat32Column(name, col);
      } else {
        df.addFloat64Column(name, col);
      }
    }

    return df;
  }

  /** Free resources */
  free(): void {
    this.keys.free();
    const colNames = this.aggregatedColumns.keys();
    for (let i = 0; i < colNames.length; i++) {
      this.aggregatedColumns.get(colNames[i]).free();
    }
  }
}

/**
 * Optimized GroupBy for small integer keys (like zone 0-4)
 * Uses direct array indexing instead of hash table
 */
export function groupByIntegerKey(
  df: DataFrame,
  keyColumnName: string,
  maxKey: i32 = 256
): GroupByResult {
  const keyColumn = df.getNumericColumn(keyColumnName);
  if (keyColumn === null) {
    throw new Error('Key column not found: ' + keyColumnName);
  }

  const rowCount = df.rowCount;
  const keyPtr = keyColumn!.dataPtr;

  // Count occurrences of each key
  const counts = new StaticArray<i32>(maxKey + 1);
  for (let i: i32 = 0; i <= maxKey; i++) {
    counts[i] = 0;
  }

  // First pass: count keys and find unique values
  const uniqueKeys: i32[] = [];
  for (let i: i32 = 0; i < rowCount; i++) {
    const key = load<i32>(keyPtr + (i << 2));
    if (key >= 0 && key <= maxKey) {
      if (counts[key] === 0) {
        uniqueKeys.push(key);
      }
      counts[key]++;
    }
  }

  // Sort unique keys for consistent ordering
  uniqueKeys.sort((a, b) => a - b);

  const numGroups = uniqueKeys.length;

  // Create group map and result key column
  const groupMap = new Map<i32, i32>();
  const resultKeys = new NumericColumn(numGroups, DataType.Int32);

  for (let i: i32 = 0; i < numGroups; i++) {
    const key = uniqueKeys[i];
    groupMap.set(key, i);
    resultKeys.setI32(i, key);
  }

  return new GroupByResult(resultKeys, numGroups, groupMap);
}

/**
 * GroupBy with sum aggregation for Float32 columns
 * Optimized for small integer keys
 */
export function groupBySumF32(
  df: DataFrame,
  keyColumnName: string,
  valueColumnNames: string[],
  maxKey: i32 = 256
): GroupByResult {
  // Get initial grouping
  const result = groupByIntegerKey(df, keyColumnName, maxKey);
  const numGroups = result.numGroups;
  const rowCount = df.rowCount;

  // Get key column
  const keyColumn = df.getNumericColumn(keyColumnName)!;
  const keyPtr = keyColumn.dataPtr;

  // Process each value column
  for (let c: i32 = 0; c < valueColumnNames.length; c++) {
    const colName = valueColumnNames[c];
    const valueColumn = df.getNumericColumn(colName);
    if (valueColumn === null) continue;

    const valuePtr = valueColumn!.dataPtr;
    const isFloat32 = valueColumn!.dtype === DataType.Float32;

    // Allocate sum accumulators
    const sums = new StaticArray<f64>(numGroups);
    for (let i: i32 = 0; i < numGroups; i++) {
      sums[i] = 0;
    }

    // Accumulate sums
    if (isFloat32) {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          sums[groupIdx] += <f64>load<f32>(valuePtr + (i << 2));
        }
      }
    } else {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          sums[groupIdx] += load<f64>(valuePtr + (i << 3));
        }
      }
    }

    // Create result column (use Float32 if input was Float32)
    const resultColumn = new NumericColumn(numGroups, isFloat32 ? DataType.Float32 : DataType.Float64);
    if (isFloat32) {
      for (let i: i32 = 0; i < numGroups; i++) {
        resultColumn.setF32(i, <f32>sums[i]);
      }
    } else {
      for (let i: i32 = 0; i < numGroups; i++) {
        resultColumn.setF64(i, sums[i]);
      }
    }

    result.aggregatedColumns.set(colName, resultColumn);
  }

  return result;
}

/**
 * GroupBy with mean aggregation
 */
export function groupByMean(
  df: DataFrame,
  keyColumnName: string,
  valueColumnNames: string[],
  maxKey: i32 = 256
): GroupByResult {
  // Get initial grouping
  const result = groupByIntegerKey(df, keyColumnName, maxKey);
  const numGroups = result.numGroups;
  const rowCount = df.rowCount;

  // Get key column
  const keyColumn = df.getNumericColumn(keyColumnName)!;
  const keyPtr = keyColumn.dataPtr;

  // Count per group
  const counts = new StaticArray<i32>(numGroups);
  for (let i: i32 = 0; i < numGroups; i++) {
    counts[i] = 0;
  }

  for (let i: i32 = 0; i < rowCount; i++) {
    const key = load<i32>(keyPtr + (i << 2));
    const groupIdx = result.getGroupIndex(key);
    if (groupIdx >= 0) {
      counts[groupIdx]++;
    }
  }

  // Process each value column
  for (let c: i32 = 0; c < valueColumnNames.length; c++) {
    const colName = valueColumnNames[c];
    const valueColumn = df.getNumericColumn(colName);
    if (valueColumn === null) continue;

    const valuePtr = valueColumn!.dataPtr;
    const isFloat32 = valueColumn!.dtype === DataType.Float32;

    // Allocate sum accumulators
    const sums = new StaticArray<f64>(numGroups);
    for (let i: i32 = 0; i < numGroups; i++) {
      sums[i] = 0;
    }

    // Accumulate sums
    if (isFloat32) {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          sums[groupIdx] += <f64>load<f32>(valuePtr + (i << 2));
        }
      }
    } else {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          sums[groupIdx] += load<f64>(valuePtr + (i << 3));
        }
      }
    }

    // Create result column with means
    const resultColumn = new NumericColumn(numGroups, DataType.Float64);
    for (let i: i32 = 0; i < numGroups; i++) {
      if (counts[i] > 0) {
        resultColumn.setF64(i, sums[i] / <f64>counts[i]);
      } else {
        resultColumn.setF64(i, 0);
      }
    }

    result.aggregatedColumns.set(colName, resultColumn);
  }

  return result;
}

/**
 * GroupBy with min aggregation
 */
export function groupByMin(
  df: DataFrame,
  keyColumnName: string,
  valueColumnNames: string[],
  maxKey: i32 = 256
): GroupByResult {
  const result = groupByIntegerKey(df, keyColumnName, maxKey);
  const numGroups = result.numGroups;
  const rowCount = df.rowCount;

  const keyColumn = df.getNumericColumn(keyColumnName)!;
  const keyPtr = keyColumn.dataPtr;

  for (let c: i32 = 0; c < valueColumnNames.length; c++) {
    const colName = valueColumnNames[c];
    const valueColumn = df.getNumericColumn(colName);
    if (valueColumn === null) continue;

    const valuePtr = valueColumn!.dataPtr;
    const isFloat32 = valueColumn!.dtype === DataType.Float32;

    const mins = new StaticArray<f64>(numGroups);
    for (let i: i32 = 0; i < numGroups; i++) {
      mins[i] = Infinity;
    }

    if (isFloat32) {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          const val = <f64>load<f32>(valuePtr + (i << 2));
          if (val < mins[groupIdx]) mins[groupIdx] = val;
        }
      }
    } else {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          const val = load<f64>(valuePtr + (i << 3));
          if (val < mins[groupIdx]) mins[groupIdx] = val;
        }
      }
    }

    const resultColumn = new NumericColumn(numGroups, isFloat32 ? DataType.Float32 : DataType.Float64);
    if (isFloat32) {
      for (let i: i32 = 0; i < numGroups; i++) {
        resultColumn.setF32(i, <f32>mins[i]);
      }
    } else {
      for (let i: i32 = 0; i < numGroups; i++) {
        resultColumn.setF64(i, mins[i]);
      }
    }

    result.aggregatedColumns.set(colName, resultColumn);
  }

  return result;
}

/**
 * GroupBy with max aggregation
 */
export function groupByMax(
  df: DataFrame,
  keyColumnName: string,
  valueColumnNames: string[],
  maxKey: i32 = 256
): GroupByResult {
  const result = groupByIntegerKey(df, keyColumnName, maxKey);
  const numGroups = result.numGroups;
  const rowCount = df.rowCount;

  const keyColumn = df.getNumericColumn(keyColumnName)!;
  const keyPtr = keyColumn.dataPtr;

  for (let c: i32 = 0; c < valueColumnNames.length; c++) {
    const colName = valueColumnNames[c];
    const valueColumn = df.getNumericColumn(colName);
    if (valueColumn === null) continue;

    const valuePtr = valueColumn!.dataPtr;
    const isFloat32 = valueColumn!.dtype === DataType.Float32;

    const maxs = new StaticArray<f64>(numGroups);
    for (let i: i32 = 0; i < numGroups; i++) {
      maxs[i] = -Infinity;
    }

    if (isFloat32) {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          const val = <f64>load<f32>(valuePtr + (i << 2));
          if (val > maxs[groupIdx]) maxs[groupIdx] = val;
        }
      }
    } else {
      for (let i: i32 = 0; i < rowCount; i++) {
        const key = load<i32>(keyPtr + (i << 2));
        const groupIdx = result.getGroupIndex(key);
        if (groupIdx >= 0) {
          const val = load<f64>(valuePtr + (i << 3));
          if (val > maxs[groupIdx]) maxs[groupIdx] = val;
        }
      }
    }

    const resultColumn = new NumericColumn(numGroups, isFloat32 ? DataType.Float32 : DataType.Float64);
    if (isFloat32) {
      for (let i: i32 = 0; i < numGroups; i++) {
        resultColumn.setF32(i, <f32>maxs[i]);
      }
    } else {
      for (let i: i32 = 0; i < numGroups; i++) {
        resultColumn.setF64(i, maxs[i]);
      }
    }

    result.aggregatedColumns.set(colName, resultColumn);
  }

  return result;
}

/**
 * GroupBy with count aggregation
 */
export function groupByCount(
  df: DataFrame,
  keyColumnName: string,
  maxKey: i32 = 256
): GroupByResult {
  const result = groupByIntegerKey(df, keyColumnName, maxKey);
  const numGroups = result.numGroups;
  const rowCount = df.rowCount;

  const keyColumn = df.getNumericColumn(keyColumnName)!;
  const keyPtr = keyColumn.dataPtr;

  const counts = new StaticArray<i32>(numGroups);
  for (let i: i32 = 0; i < numGroups; i++) {
    counts[i] = 0;
  }

  for (let i: i32 = 0; i < rowCount; i++) {
    const key = load<i32>(keyPtr + (i << 2));
    const groupIdx = result.getGroupIndex(key);
    if (groupIdx >= 0) {
      counts[groupIdx]++;
    }
  }

  const countColumn = new NumericColumn(numGroups, DataType.Int32);
  for (let i: i32 = 0; i < numGroups; i++) {
    countColumn.setI32(i, counts[i]);
  }

  result.aggregatedColumns.set('count', countColumn);

  return result;
}
