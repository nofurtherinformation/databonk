import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';

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

  private static buildHashIndex(df: DataFrame, keys: string[]): Map<string, number[]> {
    const index = new Map<string, number[]>();
    
    for (let i = 0; i < df.length; i++) {
      const keyValue = this.createJoinKey(df, i, keys);
      if (!index.has(keyValue)) {
        index.set(keyValue, []);
      }
      index.get(keyValue)!.push(i);
    }
    
    return index;
  }

  private static createJoinKey(df: DataFrame, rowIndex: number, keys: string[]): string {
    const keyParts = keys.map(key => {
      const column = df.column(key);
      const value = column.get(rowIndex);
      return value === null ? '__NULL__' : String(value);
    });
    return keyParts.join('||');
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
    
    for (const [key, leftIndices] of leftIndex) {
      const rightIndices = rightIndex.get(key);
      if (rightIndices) {
        for (const leftIdx of leftIndices) {
          for (const rightIdx of rightIndices) {
            matches.push([leftIdx, rightIdx]);
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
    
    for (const [key, leftIndices] of leftIndex) {
      const rightIndices = rightIndex.get(key);
      if (rightIndices) {
        for (const leftIdx of leftIndices) {
          for (const rightIdx of rightIndices) {
            matches.push([leftIdx, rightIdx]);
          }
        }
      } else {
        for (const leftIdx of leftIndices) {
          matches.push([leftIdx, null]);
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
    
    for (const [key, rightIndices] of rightIndex) {
      const leftIndices = leftIndex.get(key);
      if (leftIndices) {
        for (const rightIdx of rightIndices) {
          for (const leftIdx of leftIndices) {
            matches.push([leftIdx, rightIdx]);
          }
        }
      } else {
        for (const rightIdx of rightIndices) {
          matches.push([null, rightIdx]);
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
    
    for (const [key, leftIndices] of leftIndex) {
      const rightIndices = rightIndex.get(key);
      if (rightIndices) {
        processedRightKeys.add(key);
        for (const leftIdx of leftIndices) {
          for (const rightIdx of rightIndices) {
            matches.push([leftIdx, rightIdx]);
          }
        }
      } else {
        for (const leftIdx of leftIndices) {
          matches.push([leftIdx, null]);
        }
      }
    }
    
    for (const [key, rightIndices] of rightIndex) {
      if (!processedRightKeys.has(key)) {
        for (const rightIdx of rightIndices) {
          matches.push([null, rightIdx]);
        }
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