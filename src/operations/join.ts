import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { globalIndexCache } from '../core/index-cache.js';
import { IndexEntry, SortedIndexData } from '../core/index.js';

export type JoinType = 'inner' | 'left' | 'right' | 'outer';

/**
 * Join algorithm selection:
 * - 'hash': Hash join - good for most cases, O(n+m) with good hash distribution
 * - 'sort-merge': Sort-merge join - better cache locality for large sorted datasets
 * - 'auto': Automatically select based on available indices
 */
export type JoinAlgorithm = 'hash' | 'sort-merge' | 'auto';

/**
 * Options for join operations.
 */
export interface JoinOptions {
  /** Column name suffixes for overlapping non-key columns. Default: ['_x', '_y'] */
  suffixes?: [string, string];
  /** Join algorithm to use. Default: 'auto' */
  algorithm?: JoinAlgorithm;
  /** Whether to use existing indices. Default: true */
  useIndices?: boolean;
}

export class Joiner {
  static join(
    left: DataFrame,
    right: DataFrame,
    on: string | string[],
    how: JoinType = 'inner',
    options: JoinOptions | [string, string] = {}
  ): DataFrame {
    // Support legacy signature: join(df, on, how, suffixes)
    const opts: JoinOptions = Array.isArray(options)
      ? { suffixes: options }
      : options;

    const joinKeys = Array.isArray(on) ? on : [on];
    const suffixes = opts.suffixes || ['_x', '_y'];
    const useIndices = opts.useIndices !== false;
    const algorithm = opts.algorithm || 'auto';

    this.validateJoinKeys(left, right, joinKeys);

    // Determine which algorithm to use
    const selectedAlgorithm = this.selectAlgorithm(
      left,
      right,
      joinKeys,
      algorithm,
      useIndices
    );

    if (selectedAlgorithm === 'sort-merge') {
      return this.sortMergeJoin(left, right, joinKeys, how, suffixes, useIndices);
    }

    // Use hash join
    const leftIndex = this.getOrBuildHashIndex(left, joinKeys, useIndices);
    const rightIndex = this.getOrBuildHashIndex(right, joinKeys, useIndices);

    switch (how) {
      case 'inner':
        return this.innerJoin(left, right, leftIndex, rightIndex, joinKeys, suffixes);
      case 'left':
        return this.leftJoin(left, right, leftIndex, rightIndex, joinKeys, suffixes);
      case 'right':
        return this.rightJoin(left, right, leftIndex, rightIndex, joinKeys, suffixes);
      case 'outer':
        return this.outerJoin(left, right, leftIndex, rightIndex, joinKeys, suffixes);
      default:
        throw new Error(`Unknown join type: ${how}`);
    }
  }

  /**
   * Select the best join algorithm based on available indices and data characteristics.
   */
  private static selectAlgorithm(
    left: DataFrame,
    right: DataFrame,
    joinKeys: string[],
    requested: JoinAlgorithm,
    useIndices: boolean
  ): 'hash' | 'sort-merge' {
    if (requested === 'hash') return 'hash';
    if (requested === 'sort-merge') {
      // Verify we can do sort-merge (need sorted indices or will build them)
      return 'sort-merge';
    }

    // Auto-selection logic
    if (!useIndices) return 'hash';

    // Check if both sides have sorted indices
    const leftIndex = left.getIndex(joinKeys);
    const rightIndex = right.getIndex(joinKeys);

    if (
      leftIndex?.data.type === 'sorted' &&
      rightIndex?.data.type === 'sorted'
    ) {
      // Use sort-merge for large datasets with sorted indices
      // Threshold: sort-merge is typically better for large datasets
      if (left.length > 10000 || right.length > 10000) {
        return 'sort-merge';
      }
    }

    return 'hash';
  }

  /**
   * Get an existing hash index or build a new one.
   */
  private static getOrBuildHashIndex(
    df: DataFrame,
    keys: string[],
    useIndices: boolean
  ): Map<string, number[]> {
    if (useIndices) {
      // Check for existing user-created index
      const existingIndex = df.getIndex(keys);
      if (existingIndex) {
        // Convert any index type to hash map format
        return df.indexManager.toHashMap(existingIndex.name)!;
      }
    }

    // Fall back to building/caching with the existing system
    return this.buildHashIndex(df, keys, true);
  }

  private static validateJoinKeys(left: DataFrame, right: DataFrame, keys: string[]): void {
    keys.forEach(key => {
      if (!left.hasColumn(key)) {
        throw new Error(`Left DataFrame does not have column '${key}'`);
      }
      if (!right.hasColumn(key)) {
        throw new Error(`Right DataFrame does not have column '${key}'`);
      }
    });
  }

  private static buildHashIndex(
    df: DataFrame,
    keys: string[],
    useCache: boolean = true
  ): Map<string, number[]> {
    // Check cache first
    if (useCache) {
      const cached = globalIndexCache.getIndex(df, keys);
      if (cached) {
        return cached;
      }
    }

    const index = new Map<string, number[]>();

    // Cache column references once before the loop
    const columns = keys.map(k => df.column(k));

    for (let i = 0; i < df.length; i++) {
      const key = this.createJoinKey(columns, i);

      const indices = index.get(key);
      if (indices) {
        indices.push(i);
      } else {
        index.set(key, [i]);
      }
    }

    // Store in cache
    if (useCache) {
      globalIndexCache.setIndex(df, keys, index);
    }

    return index;
  }

  /**
   * Create a simple string key for a row using '||' separator.
   */
  private static createJoinKey(
    columns: Column[],
    rowIndex: number
  ): string {
    let key = '';
    for (let i = 0; i < columns.length; i++) {
      if (i > 0) key += '||';
      const val = columns[i].get(rowIndex);
      key += val === null ? '\0' : String(val);
    }
    return key;
  }

  private static innerJoin(
    left: DataFrame,
    right: DataFrame,
    leftIndex: Map<string, number[]>,
    rightIndex: Map<string, number[]>,
    joinKeys: string[],
    suffixes: [string, string]
  ): DataFrame {
    const matches: Array<[number, number]> = [];

    // Cache column references for key lookups
    const leftColumns = joinKeys.map(k => left.column(k));

    // Track which left rows have been processed to avoid duplicates
    const processedLeft = new Set<number>();

    // Iterate through left rows in original order
    for (let leftIdx = 0; leftIdx < left.length; leftIdx++) {
      if (processedLeft.has(leftIdx)) continue;

      const key = this.createJoinKey(leftColumns, leftIdx);

      const rightIndices = rightIndex.get(key);
      if (rightIndices) {
        // Get all left rows with the same key
        const leftIndices = leftIndex.get(key);
        if (leftIndices) {
          for (const lIdx of leftIndices) {
            processedLeft.add(lIdx);
            for (const rightIdx of rightIndices) {
              matches.push([lIdx, rightIdx]);
            }
          }
        }
      }
    }

    return this.buildJoinedDataFrame(left, right, matches, joinKeys, suffixes);
  }

  private static leftJoin(
    left: DataFrame,
    right: DataFrame,
    leftIndex: Map<string, number[]>,
    rightIndex: Map<string, number[]>,
    joinKeys: string[],
    suffixes: [string, string]
  ): DataFrame {
    const matches: Array<[number, number | null]> = [];

    const leftColumns = joinKeys.map(k => left.column(k));
    const processedLeft = new Set<number>();

    // Iterate through left rows in original order
    for (let leftIdx = 0; leftIdx < left.length; leftIdx++) {
      if (processedLeft.has(leftIdx)) continue;

      const key = this.createJoinKey(leftColumns, leftIdx);

      const rightIndices = rightIndex.get(key);
      const leftIndices = leftIndex.get(key);

      if (leftIndices) {
        for (const lIdx of leftIndices) {
          processedLeft.add(lIdx);
          if (rightIndices) {
            for (const rightIdx of rightIndices) {
              matches.push([lIdx, rightIdx]);
            }
          } else {
            matches.push([lIdx, null]);
          }
        }
      }
    }

    return this.buildJoinedDataFrame(left, right, matches, joinKeys, suffixes);
  }

  private static rightJoin(
    left: DataFrame,
    right: DataFrame,
    leftIndex: Map<string, number[]>,
    rightIndex: Map<string, number[]>,
    joinKeys: string[],
    suffixes: [string, string]
  ): DataFrame {
    const matches: Array<[number | null, number]> = [];

    const rightColumns = joinKeys.map(k => right.column(k));
    const processedRight = new Set<number>();

    // Iterate through right rows in original order
    for (let rightIdx = 0; rightIdx < right.length; rightIdx++) {
      if (processedRight.has(rightIdx)) continue;

      const key = this.createJoinKey(rightColumns, rightIdx);

      const leftIndices = leftIndex.get(key);
      const rightIndices = rightIndex.get(key);

      if (rightIndices) {
        for (const rIdx of rightIndices) {
          processedRight.add(rIdx);
          if (leftIndices) {
            for (const leftIdx of leftIndices) {
              matches.push([leftIdx, rIdx]);
            }
          } else {
            matches.push([null, rIdx]);
          }
        }
      }
    }

    return this.buildJoinedDataFrame(left, right, matches, joinKeys, suffixes);
  }

  private static outerJoin(
    left: DataFrame,
    right: DataFrame,
    leftIndex: Map<string, number[]>,
    rightIndex: Map<string, number[]>,
    joinKeys: string[],
    suffixes: [string, string]
  ): DataFrame {
    const matches: Array<[number | null, number | null]> = [];
    const processedRightKeys = new Set<string>();
    const processedLeft = new Set<number>();

    const leftColumns = joinKeys.map(k => left.column(k));
    const rightColumns = joinKeys.map(k => right.column(k));

    // Process left side first (in original order)
    for (let leftIdx = 0; leftIdx < left.length; leftIdx++) {
      if (processedLeft.has(leftIdx)) continue;

      const key = this.createJoinKey(leftColumns, leftIdx);

      const rightIndices = rightIndex.get(key);
      const leftIndices = leftIndex.get(key);

      if (leftIndices) {
        for (const lIdx of leftIndices) {
          processedLeft.add(lIdx);
          if (rightIndices) {
            processedRightKeys.add(key);
            for (const rightIdx of rightIndices) {
              matches.push([lIdx, rightIdx]);
            }
          } else {
            matches.push([lIdx, null]);
          }
        }
      }
    }

    // Add unmatched right rows (in original order)
    for (let rightIdx = 0; rightIdx < right.length; rightIdx++) {
      const key = this.createJoinKey(rightColumns, rightIdx);

      if (!processedRightKeys.has(key)) {
        matches.push([null, rightIdx]);
        processedRightKeys.add(key);  // Mark this key as processed
      }
    }

    return this.buildJoinedDataFrame(left, right, matches, joinKeys, suffixes);
  }

  /**
   * Sort-merge join algorithm.
   * Efficient when both sides have sorted indices - uses sequential access pattern
   * which is more cache-friendly for large datasets.
   */
  private static sortMergeJoin(
    left: DataFrame,
    right: DataFrame,
    joinKeys: string[],
    how: JoinType,
    suffixes: [string, string],
    useIndices: boolean
  ): DataFrame {
    // Get or build sorted indices
    const leftSorted = this.getOrBuildSortedEntries(left, joinKeys, useIndices);
    const rightSorted = this.getOrBuildSortedEntries(right, joinKeys, useIndices);

    const matches: Array<[number | null, number | null]> = [];
    const matchedLeftKeys = new Set<string>();
    const matchedRightKeys = new Set<string>();

    let leftPtr = 0;
    let rightPtr = 0;

    // Merge phase - walk through both sorted lists
    while (leftPtr < leftSorted.length && rightPtr < rightSorted.length) {
      const leftEntry = leftSorted[leftPtr];
      const rightEntry = rightSorted[rightPtr];

      const cmp = leftEntry.key.localeCompare(rightEntry.key);

      if (cmp < 0) {
        // Left key is smaller - no match on right
        if (how === 'left' || how === 'outer') {
          for (const leftIdx of leftEntry.indices) {
            matches.push([leftIdx, null]);
          }
        }
        matchedLeftKeys.add(leftEntry.key);
        leftPtr++;
      } else if (cmp > 0) {
        // Right key is smaller - no match on left
        if (how === 'right' || how === 'outer') {
          for (const rightIdx of rightEntry.indices) {
            matches.push([null, rightIdx]);
          }
        }
        matchedRightKeys.add(rightEntry.key);
        rightPtr++;
      } else {
        // Keys match - produce cartesian product of matching rows
        matchedLeftKeys.add(leftEntry.key);
        matchedRightKeys.add(rightEntry.key);

        for (const leftIdx of leftEntry.indices) {
          for (const rightIdx of rightEntry.indices) {
            matches.push([leftIdx, rightIdx]);
          }
        }
        leftPtr++;
        rightPtr++;
      }
    }

    // Handle remaining left entries
    while (leftPtr < leftSorted.length) {
      const leftEntry = leftSorted[leftPtr];
      if (how === 'left' || how === 'outer') {
        for (const leftIdx of leftEntry.indices) {
          matches.push([leftIdx, null]);
        }
      }
      leftPtr++;
    }

    // Handle remaining right entries
    while (rightPtr < rightSorted.length) {
      const rightEntry = rightSorted[rightPtr];
      if (how === 'right' || how === 'outer') {
        for (const rightIdx of rightEntry.indices) {
          matches.push([null, rightIdx]);
        }
      }
      rightPtr++;
    }

    return this.buildJoinedDataFrame(left, right, matches, joinKeys, suffixes);
  }

  /**
   * Get sorted entries from an existing sorted index or build them.
   */
  private static getOrBuildSortedEntries(
    df: DataFrame,
    keys: string[],
    useIndices: boolean
  ): Array<{ key: string; indices: number[] }> {
    if (useIndices) {
      const existingIndex = df.getIndex(keys);
      if (existingIndex?.data.type === 'sorted') {
        return (existingIndex.data as SortedIndexData).entries;
      }
    }

    // Build sorted entries on the fly
    const map = new Map<string, number[]>();
    const cols = keys.map(k => df.column(k));

    for (let i = 0; i < df.length; i++) {
      const key = this.createJoinKey(cols, i);
      const existing = map.get(key);
      if (existing) {
        existing.push(i);
      } else {
        map.set(key, [i]);
      }
    }

    // Sort and convert to array
    const sortedKeys = Array.from(map.keys()).sort();
    return sortedKeys.map(key => ({ key, indices: map.get(key)! }));
  }

  private static buildJoinedDataFrame(
    left: DataFrame,
    right: DataFrame,
    matches: Array<[number | null, number | null]>,
    joinKeys: string[],
    suffixes: [string, string]
  ): DataFrame {
    const resultColumns: Record<string, Column> = {};
    const resultLength = matches.length;

    const leftColumns = left.columnNames;
    const rightColumns = right.columnNames.filter(name => !joinKeys.includes(name));
    const joinKeySet = new Set(joinKeys);

    leftColumns.forEach(colName => {
      const values: any[] = [];
      const leftCol = left.column(colName);
      const isJoinKey = joinKeySet.has(colName);
      // For join keys, we may need to get the value from the right side when left is null
      const rightCol = isJoinKey ? right.column(colName) : null;

      for (const [leftIdx, rightIdx] of matches) {
        if (leftIdx !== null) {
          values.push(leftCol.get(leftIdx));
        } else if (isJoinKey && rightIdx !== null && rightCol) {
          // For join keys, get value from right side when left is null (right/outer join)
          values.push(rightCol.get(rightIdx));
        } else {
          values.push(null);
        }
      }

      const finalName = rightColumns.includes(colName) ? colName + suffixes[0] : colName;
      resultColumns[finalName] = new Column(finalName, values, leftCol.dataType);
    });

    rightColumns.forEach(colName => {
      const values: any[] = [];
      const rightCol = right.column(colName);

      for (const [leftIdx, rightIdx] of matches) {
        if (rightIdx !== null) {
          values.push(rightCol.get(rightIdx));
        } else {
          values.push(null);
        }
      }

      const finalName = leftColumns.includes(colName) ? colName + suffixes[1] : colName;
      resultColumns[finalName] = new Column(finalName, values, rightCol.dataType);
    });

    return new DataFrame(resultColumns);
  }
}

declare module '../core/dataframe.js' {
  interface DataFrame {
    join(
      other: DataFrame,
      on: string | string[],
      how?: JoinType,
      options?: JoinOptions | [string, string]
    ): DataFrame;
  }
}

DataFrame.prototype.join = function(
  other: DataFrame,
  on: string | string[],
  how: JoinType = 'inner',
  options: JoinOptions | [string, string] = {}
): DataFrame {
  return Joiner.join(this, other, on, how, options);
};
