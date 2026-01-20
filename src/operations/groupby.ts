import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { AggregateSpec, AggregateFunction, Aggregator } from './aggregation.js';
import { StatAccumulator, GroupedAccumulators, createAggregationPlan } from '../utils/aggregation-engine.js';

// Store the key and first row index for each group
interface GroupEntry {
  key: string;
  firstRowIndex: number;  // Index of first row in this group (for getting original values)
}

export class GroupBy {
  private df: DataFrame;
  private groupColumns: string[];
  private groups: Map<string, number[]>;
  private groupOrder: GroupEntry[] = [];  // Track insertion order for consistent output

  // Cached column references
  private cachedGroupCols: Column[];

  constructor(df: DataFrame, columns: string[]) {
    this.df = df;
    this.groupColumns = columns;

    // Cache column references once
    this.cachedGroupCols = columns.map(c => df.column(c));

    this.groups = new Map<string, number[]>();
    this.computeGroups();
  }

  private computeGroups(): void {
    for (let i = 0; i < this.df.length; i++) {
      const key = this.createGroupKey(i);

      const existingIndices = this.groups.get(key);
      if (existingIndices) {
        existingIndices.push(i);
      } else {
        this.groups.set(key, [i]);
        this.groupOrder.push({
          key,
          firstRowIndex: i
        });
      }
    }
  }

  /**
   * Create a simple string key for a row using '||' separator.
   */
  private createGroupKey(rowIndex: number): string {
    let key = '';
    for (let i = 0; i < this.cachedGroupCols.length; i++) {
      if (i > 0) key += '||';
      const val = this.cachedGroupCols[i].get(rowIndex);
      key += val === null ? '\0' : String(val);
    }
    return key;
  }

  /**
   * Perform aggregation using single-pass algorithm for efficiency.
   */
  agg(spec: Record<string, AggregateFunction | AggregateFunction[]>): DataFrame {
    const resultColumns: Record<string, Column> = {};

    // Build list of columns to aggregate and their functions
    const aggPlan = createAggregationPlan(spec);

    // Separate count-only columns from columns that need actual data
    const countOnlyColumns = new Set<string>();
    const dataColumns: string[] = [];

    for (const [colName, fns] of aggPlan.functions) {
      const fnArray = Array.isArray(fns) ? fns : [fns];
      const hasOnlyCount = fnArray.every(fn => fn === 'count');

      if (hasOnlyCount && !this.df.hasColumn(colName)) {
        // This is a count-only column (like { count: 'count' })
        countOnlyColumns.add(colName);
      } else {
        dataColumns.push(colName);
      }
    }

    // Cache column references for aggregation columns (excluding count-only)
    const aggColumnRefs = new Map<string, Column>();
    for (const colName of dataColumns) {
      aggColumnRefs.set(colName, this.df.column(colName));
    }

    // Single-pass aggregation: create accumulators for each group
    const groupedAccs = new GroupedAccumulators(dataColumns);

    // Iterate through data once, accumulating all stats
    for (let i = 0; i < this.df.length; i++) {
      // Compute group key
      const key = this.createGroupKey(i);

      // Add values to accumulators for each aggregation column
      for (const colName of dataColumns) {
        const value = aggColumnRefs.get(colName)!.get(i);
        if (value !== null && typeof value === 'number' && !isNaN(value)) {
          groupedAccs.getAccumulator(key, colName).add(value);
        } else if (value !== null) {
          // For count, we still need to track non-null values
          // Use a dummy add for tracking count
          groupedAccs.getAccumulator(key, colName);
        }
      }
    }

    // Build result columns for group keys (preserve original order)
    this.groupColumns.forEach((colName, colIdx) => {
      const groupValues: any[] = [];
      const column = this.cachedGroupCols[colIdx];

      for (const entry of this.groupOrder) {
        const indices = this.groups.get(entry.key);
        if (indices && indices.length > 0) {
          groupValues.push(column.get(indices[0]));
        }
      }
      resultColumns[colName] = new Column(colName, groupValues);
    });

    // Build result columns for aggregated values
    for (const [colName, fns] of aggPlan.functions) {
      for (const fn of fns) {
        const aggValues: number[] = [];

        for (const entry of this.groupOrder) {
          if (fn === 'count' || countOnlyColumns.has(colName)) {
            // For count, return number of rows in group
            const indices = this.groups.get(entry.key);
            aggValues.push(indices ? indices.length : 0);
          } else {
            aggValues.push(groupedAccs.getValue(entry.key, colName, fn));
          }
        }

        const resultColName = fns.length === 1 ? colName : `${colName}_${fn}`;
        resultColumns[resultColName] = new Column(resultColName, aggValues, 'float64');
      }
    }

    return new DataFrame(resultColumns);
  }

  private computeAggregateValue(column: Column, fn: AggregateFunction): number {
    switch (fn) {
      case 'sum':
        return column.sum();
      case 'mean':
        return column.mean();
      case 'count':
        return column.count();
      case 'min':
        return column.min();
      case 'max':
        return column.max();
      case 'std':
        return this.computeStd(column);
      case 'var':
        return this.computeVar(column);
      default:
        throw new Error(`Unknown aggregate function: ${fn}`);
    }
  }

  private computeVar(column: Column): number {
    if (column.dataType === 'string' || column.dataType === 'boolean') {
      return NaN;
    }

    const mean = column.mean();
    let sumSquaredDiffs = 0;
    let count = 0;

    for (let i = 0; i < column.length; i++) {
      if (!column.isNull(i)) {
        const value = column.get(i) as number;
        sumSquaredDiffs += (value - mean) ** 2;
        count++;
      }
    }

    return count > 1 ? sumSquaredDiffs / (count - 1) : 0;
  }

  private computeStd(column: Column): number {
    return Math.sqrt(this.computeVar(column));
  }

  count(): DataFrame {
    const resultColumns: Record<string, Column> = {};

    // Build group key columns
    this.groupColumns.forEach((colName, colIdx) => {
      const column = this.cachedGroupCols[colIdx];
      const values: any[] = [];

      for (const entry of this.groupOrder) {
        const indices = this.groups.get(entry.key);
        if (indices && indices.length > 0) {
          values.push(column.get(indices[0]));
        }
      }
      resultColumns[colName] = new Column(colName, values);
    });

    // Add count column
    const counts: number[] = [];
    for (const entry of this.groupOrder) {
      const indices = this.groups.get(entry.key);
      counts.push(indices ? indices.length : 0);
    }
    resultColumns['count'] = new Column('count', counts, 'int32');

    return new DataFrame(resultColumns);
  }

  sum(columns: string[]): DataFrame {
    const spec: Record<string, AggregateFunction> = {};
    columns.forEach(col => {
      spec[col] = 'sum';
    });
    return this.agg(spec);
  }

  mean(columns: string[]): DataFrame {
    const spec: Record<string, AggregateFunction> = {};
    columns.forEach(col => {
      spec[col] = 'mean';
    });
    return this.agg(spec);
  }

  min(columns: string[]): DataFrame {
    const spec: Record<string, AggregateFunction> = {};
    columns.forEach(col => {
      spec[col] = 'min';
    });
    return this.agg(spec);
  }

  max(columns: string[]): DataFrame {
    const spec: Record<string, AggregateFunction> = {};
    columns.forEach(col => {
      spec[col] = 'max';
    });
    return this.agg(spec);
  }

  first(): DataFrame {
    const resultColumns: Record<string, Column> = {};

    // Cache all column references
    const colRefs = new Map<string, Column>();
    for (const colName of this.df.columnNames) {
      colRefs.set(colName, this.df.column(colName));
    }

    this.df.columnNames.forEach(colName => {
      const values: any[] = [];

      for (const entry of this.groupOrder) {
        const indices = this.groups.get(entry.key);
        if (indices && indices.length > 0) {
          values.push(colRefs.get(colName)!.get(indices[0]));
        }
      }

      resultColumns[colName] = new Column(colName, values);
    });

    return new DataFrame(resultColumns);
  }

  last(): DataFrame {
    const resultColumns: Record<string, Column> = {};

    // Cache all column references
    const colRefs = new Map<string, Column>();
    for (const colName of this.df.columnNames) {
      colRefs.set(colName, this.df.column(colName));
    }

    this.df.columnNames.forEach(colName => {
      const values: any[] = [];

      for (const entry of this.groupOrder) {
        const indices = this.groups.get(entry.key);
        if (indices && indices.length > 0) {
          values.push(colRefs.get(colName)!.get(indices[indices.length - 1]));
        }
      }

      resultColumns[colName] = new Column(colName, values);
    });

    return new DataFrame(resultColumns);
  }

  size(): DataFrame {
    const resultColumns: Record<string, Column> = {};
    const groupSizes: number[] = [];

    // Build group key columns and sizes
    this.groupColumns.forEach((colName, colIdx) => {
      const column = this.cachedGroupCols[colIdx];
      const values: any[] = [];

      for (const entry of this.groupOrder) {
        const indices = this.groups.get(entry.key);
        if (indices && indices.length > 0) {
          values.push(column.get(indices[0]));
          // Only add to groupSizes on first column iteration
          if (colIdx === 0) {
            groupSizes.push(indices.length);
          }
        }
      }
      resultColumns[colName] = new Column(colName, values);
    });

    resultColumns['size'] = new Column('size', groupSizes, 'int32');

    return new DataFrame(resultColumns);
  }
}

declare module '../core/dataframe.js' {
  interface DataFrame {
    groupBy(columns: string[]): GroupBy;
  }
}

DataFrame.prototype.groupBy = function(columns: string[]): GroupBy {
  return new GroupBy(this, columns);
};
