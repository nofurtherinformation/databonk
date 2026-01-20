import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { globalIndexCache } from '../core/index-cache.js';

export type JoinType = 'inner' | 'left' | 'right' | 'outer';

export class Joiner {
  static join(
    left: DataFrame,
    right: DataFrame,
    on: string | string[],
    how: JoinType = 'inner',
    suffixes: [string, string] = ['_x', '_y']
  ): DataFrame {
    const joinKeys = Array.isArray(on) ? on : [on];

    this.validateJoinKeys(left, right, joinKeys);

    const leftIndex = this.buildHashIndex(left, joinKeys);
    const rightIndex = this.buildHashIndex(right, joinKeys);

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

    leftColumns.forEach(colName => {
      const values: any[] = [];
      const leftCol = left.column(colName);

      for (const [leftIdx, rightIdx] of matches) {
        if (leftIdx !== null) {
          values.push(leftCol.get(leftIdx));
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
      suffixes?: [string, string]
    ): DataFrame;
  }
}

DataFrame.prototype.join = function(
  other: DataFrame,
  on: string | string[],
  how: JoinType = 'inner',
  suffixes: [string, string] = ['_x', '_y']
): DataFrame {
  return Joiner.join(this, other, on, how, suffixes);
};
