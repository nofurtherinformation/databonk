/**
 * Hash Join implementation for DataFrames
 */

import { DataFrame } from '../dataframe/dataframe';
import { NumericColumn, DataType } from '../core/numeric-column';
import { StringColumn } from '../core/string-column';
import { ColumnType } from '../core/schema';

// FNV-1a hash constants
const FNV_OFFSET: u32 = 2166136261;
const FNV_PRIME: u32 = 16777619;

/**
 * Hash table entry for join
 */
@final
class HashEntry {
  key: i32;
  rowIndex: i32;
  next: HashEntry | null;

  constructor(key: i32, rowIndex: i32) {
    this.key = key;
    this.rowIndex = rowIndex;
    this.next = null;
  }
}

/**
 * Hash table for join operations
 */
@final
class JoinHashTable {
  private buckets: StaticArray<HashEntry | null> = new StaticArray<HashEntry | null>(1);
  private numBuckets: i32 = 1;
  private size: i32 = 0;

  constructor(expectedSize: i32) {
    // Use power of 2 for fast modulo
    let numBuckets: i32 = 1;
    while (numBuckets < expectedSize * 2) {
      numBuckets <<= 1;
    }
    this.numBuckets = numBuckets;
    this.buckets = new StaticArray<HashEntry | null>(numBuckets);
    for (let i: i32 = 0; i < numBuckets; i++) {
      this.buckets[i] = null;
    }
    this.size = 0;
  }

  @inline
  private hash(key: i32): i32 {
    let hash = FNV_OFFSET;
    hash ^= key & 0xFF;
    hash = hash * FNV_PRIME;
    hash ^= (key >> 8) & 0xFF;
    hash = hash * FNV_PRIME;
    hash ^= (key >> 16) & 0xFF;
    hash = hash * FNV_PRIME;
    hash ^= (key >> 24) & 0xFF;
    hash = hash * FNV_PRIME;
    return <i32>(hash & (this.numBuckets - 1));
  }

  insert(key: i32, rowIndex: i32): void {
    const bucketIdx = this.hash(key);
    const entry = new HashEntry(key, rowIndex);
    entry.next = this.buckets[bucketIdx];
    this.buckets[bucketIdx] = entry;
    this.size++;
  }

  /** Find all matching row indices for a key */
  find(key: i32, results: i32[]): void {
    const bucketIdx = this.hash(key);
    let entry = this.buckets[bucketIdx];
    while (entry !== null) {
      if (entry.key === key) {
        results.push(entry.rowIndex);
      }
      entry = entry.next;
    }
  }

  /** Check if key exists */
  has(key: i32): bool {
    const bucketIdx = this.hash(key);
    let entry = this.buckets[bucketIdx];
    while (entry !== null) {
      if (entry.key === key) return true;
      entry = entry.next;
    }
    return false;
  }
}

/**
 * Inner join two DataFrames on integer key columns
 * Returns a new DataFrame with matched rows
 */
export function innerJoinI32(
  left: DataFrame,
  right: DataFrame,
  leftKeyColumn: string,
  rightKeyColumn: string
): DataFrame {
  const leftKey = left.getNumericColumn(leftKeyColumn);
  const rightKey = right.getNumericColumn(rightKeyColumn);

  if (leftKey === null || rightKey === null) {
    throw new Error('Key column not found');
  }

  const leftLen = left.rowCount;
  const rightLen = right.rowCount;
  const leftKeyPtr = leftKey!.dataPtr;
  const rightKeyPtr = rightKey!.dataPtr;

  // Build hash table on smaller table
  const buildOnLeft = leftLen <= rightLen;
  const buildLen = buildOnLeft ? leftLen : rightLen;
  const probeLen = buildOnLeft ? rightLen : leftLen;
  const buildKeyPtr = buildOnLeft ? leftKeyPtr : rightKeyPtr;
  const probeKeyPtr = buildOnLeft ? rightKeyPtr : leftKeyPtr;

  // Build phase
  const hashTable = new JoinHashTable(buildLen);
  for (let i: i32 = 0; i < buildLen; i++) {
    const key = load<i32>(buildKeyPtr + (i << 2));
    hashTable.insert(key, i);
  }

  // Probe phase - collect matching pairs
  const leftIndices: i32[] = [];
  const rightIndices: i32[] = [];
  const matchBuffer: i32[] = [];

  for (let i: i32 = 0; i < probeLen; i++) {
    const key = load<i32>(probeKeyPtr + (i << 2));
    matchBuffer.length = 0;
    hashTable.find(key, matchBuffer);

    for (let j: i32 = 0; j < matchBuffer.length; j++) {
      if (buildOnLeft) {
        leftIndices.push(matchBuffer[j]);
        rightIndices.push(i);
      } else {
        leftIndices.push(i);
        rightIndices.push(matchBuffer[j]);
      }
    }
  }

  // Build result DataFrame
  return buildJoinResult(left, right, leftIndices, rightIndices, leftKeyColumn, rightKeyColumn);
}

/**
 * Left join two DataFrames on integer key columns
 */
export function leftJoinI32(
  left: DataFrame,
  right: DataFrame,
  leftKeyColumn: string,
  rightKeyColumn: string
): DataFrame {
  const leftKey = left.getNumericColumn(leftKeyColumn);
  const rightKey = right.getNumericColumn(rightKeyColumn);

  if (leftKey === null || rightKey === null) {
    throw new Error('Key column not found');
  }

  const leftLen = left.rowCount;
  const rightLen = right.rowCount;
  const leftKeyPtr = leftKey!.dataPtr;
  const rightKeyPtr = rightKey!.dataPtr;

  // Build hash table on right table
  const hashTable = new JoinHashTable(rightLen);
  for (let i: i32 = 0; i < rightLen; i++) {
    const key = load<i32>(rightKeyPtr + (i << 2));
    hashTable.insert(key, i);
  }

  // Probe with left table
  const leftIndices: i32[] = [];
  const rightIndices: i32[] = [];
  const matchBuffer: i32[] = [];

  for (let i: i32 = 0; i < leftLen; i++) {
    const key = load<i32>(leftKeyPtr + (i << 2));
    matchBuffer.length = 0;
    hashTable.find(key, matchBuffer);

    if (matchBuffer.length === 0) {
      // No match - include left row with null right
      leftIndices.push(i);
      rightIndices.push(-1); // -1 indicates null
    } else {
      for (let j: i32 = 0; j < matchBuffer.length; j++) {
        leftIndices.push(i);
        rightIndices.push(matchBuffer[j]);
      }
    }
  }

  return buildJoinResult(left, right, leftIndices, rightIndices, leftKeyColumn, rightKeyColumn);
}

/**
 * Right join two DataFrames on integer key columns
 */
export function rightJoinI32(
  left: DataFrame,
  right: DataFrame,
  leftKeyColumn: string,
  rightKeyColumn: string
): DataFrame {
  // Right join is left join with swapped tables
  const result = leftJoinI32(right, left, rightKeyColumn, leftKeyColumn);
  // Columns will be in different order, but that's acceptable
  return result;
}

/**
 * Build the result DataFrame from matched indices
 */
function buildJoinResult(
  left: DataFrame,
  right: DataFrame,
  leftIndices: i32[],
  rightIndices: i32[],
  leftKeyColumn: string,
  rightKeyColumn: string
): DataFrame {
  const resultLen = leftIndices.length;
  const result = new DataFrame();

  // Copy columns from left table
  const leftColNames = left.getColumnNames();
  for (let c: i32 = 0; c < leftColNames.length; c++) {
    const colName = leftColNames[c];
    const colType = left.getColumnType(colName);

    if (colType !== ColumnType.String) {
      const srcCol = left.getNumericColumn(colName)!;
      const dstCol = new NumericColumn(resultLen, srcCol.dtype);

      copyColumnByIndices(srcCol, dstCol, leftIndices);

      switch (colType) {
        case ColumnType.Int32:
          result.addInt32Column(colName, dstCol);
          break;
        case ColumnType.Int64:
          result.addInt64Column(colName, dstCol);
          break;
        case ColumnType.Float32:
          result.addFloat32Column(colName, dstCol);
          break;
        case ColumnType.Float64:
          result.addFloat64Column(colName, dstCol);
          break;
      }
    }
  }

  // Copy columns from right table (excluding key column if same name)
  const rightColNames = right.getColumnNames();
  for (let c: i32 = 0; c < rightColNames.length; c++) {
    const colName = rightColNames[c];

    // Skip if it's the key column and left already has it
    if (colName === rightKeyColumn && left.hasColumn(leftKeyColumn)) {
      continue;
    }

    // Add suffix if name conflicts
    let resultColName = colName;
    if (result.hasColumn(colName)) {
      resultColName = colName + '_right';
    }

    const colType = right.getColumnType(colName);

    if (colType !== ColumnType.String) {
      const srcCol = right.getNumericColumn(colName)!;
      const dstCol = new NumericColumn(resultLen, srcCol.dtype);

      copyColumnByIndicesNullable(srcCol, dstCol, rightIndices);

      switch (colType) {
        case ColumnType.Int32:
          result.addInt32Column(resultColName, dstCol);
          break;
        case ColumnType.Int64:
          result.addInt64Column(resultColName, dstCol);
          break;
        case ColumnType.Float32:
          result.addFloat32Column(resultColName, dstCol);
          break;
        case ColumnType.Float64:
          result.addFloat64Column(resultColName, dstCol);
          break;
      }
    }
  }

  return result;
}

/**
 * Copy column values by index array
 */
function copyColumnByIndices(
  src: NumericColumn,
  dst: NumericColumn,
  indices: i32[]
): void {
  const srcPtr = src.dataPtr;
  const dstPtr = dst.dataPtr;
  const len = indices.length;

  switch (src.dtype) {
    case DataType.Int32:
    case DataType.Float32:
      for (let i: i32 = 0; i < len; i++) {
        const srcIdx = indices[i];
        store<i32>(dstPtr + (i << 2), load<i32>(srcPtr + (srcIdx << 2)));
      }
      break;
    case DataType.Int64:
    case DataType.Float64:
      for (let i: i32 = 0; i < len; i++) {
        const srcIdx = indices[i];
        store<i64>(dstPtr + (i << 3), load<i64>(srcPtr + (srcIdx << 3)));
      }
      break;
  }
}

/**
 * Copy column values by index array, handling -1 as null
 */
function copyColumnByIndicesNullable(
  src: NumericColumn,
  dst: NumericColumn,
  indices: i32[]
): void {
  const srcPtr = src.dataPtr;
  const dstPtr = dst.dataPtr;
  const len = indices.length;

  switch (src.dtype) {
    case DataType.Int32:
    case DataType.Float32:
      for (let i: i32 = 0; i < len; i++) {
        const srcIdx = indices[i];
        if (srcIdx >= 0) {
          store<i32>(dstPtr + (i << 2), load<i32>(srcPtr + (srcIdx << 2)));
        } else {
          store<i32>(dstPtr + (i << 2), 0);
          dst.setNull(i);
        }
      }
      break;
    case DataType.Int64:
    case DataType.Float64:
      for (let i: i32 = 0; i < len; i++) {
        const srcIdx = indices[i];
        if (srcIdx >= 0) {
          store<i64>(dstPtr + (i << 3), load<i64>(srcPtr + (srcIdx << 3)));
        } else {
          store<i64>(dstPtr + (i << 3), 0);
          dst.setNull(i);
        }
      }
      break;
  }
}
