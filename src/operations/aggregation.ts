import { DataFrame } from '../core/dataframe.js';
import { Column } from '../core/column.js';

export type AggregateFunction = 'sum' | 'mean' | 'count' | 'min' | 'max' | 'std' | 'var';
export type AggregateSpec = Record<string, string | AggregateFunction | AggregateFunction[]>;

export class Aggregator {
  static agg(df: DataFrame, spec: AggregateSpec): DataFrame {
    const resultColumns: Record<string, Column> = {};
    
    Object.entries(spec).forEach(([resultName, columnSpec]) => {
      if (typeof columnSpec === 'string') {
        const column = df.column(columnSpec);
        resultColumns[resultName] = this.computeAggregates(column, ['count'])[0];
      } else if (Array.isArray(columnSpec)) {
        const column = df.column(resultName);
        const aggregatedColumns = this.computeAggregates(column, columnSpec);
        aggregatedColumns.forEach((col, i) => {
          resultColumns[`${resultName}_${columnSpec[i]}`] = col;
        });
      } else {
        throw new Error('Invalid aggregate specification');
      }
    });
    
    return new DataFrame(resultColumns);
  }

  static describe(df: DataFrame): DataFrame {
    const stats = ['count', 'mean', 'std', 'min', 'max'] as AggregateFunction[];
    const resultColumns: Record<string, Column> = {};
    
    const statNames = new Column('stat', stats);
    resultColumns['stat'] = statNames;
    
    df.columnNames.forEach(colName => {
      const column = df.column(colName);
      if (column.dataType !== 'string' && column.dataType !== 'boolean') {
        const values = stats.map(stat => this.computeSingleAggregate(column, stat));
        resultColumns[colName] = new Column(colName, values, 'float64');
      }
    });
    
    return new DataFrame(resultColumns);
  }

  private static computeAggregates(column: Column, functions: AggregateFunction[]): Column[] {
    return functions.map(fn => {
      const value = this.computeSingleAggregate(column, fn);
      return new Column(`${column.name}_${fn}`, [value], 'float64');
    });
  }

  private static computeSingleAggregate(column: Column, fn: AggregateFunction): number {
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

  private static computeVar(column: Column): number {
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

  private static computeStd(column: Column): number {
    return Math.sqrt(this.computeVar(column));
  }
}

declare module '../core/dataframe.js' {
  interface DataFrame {
    agg(spec: AggregateSpec): DataFrame;
    describe(): DataFrame;
    sum(columns?: string[]): DataFrame;
    mean(columns?: string[]): DataFrame;
    count(columns?: string[]): DataFrame;
    min(columns?: string[]): DataFrame;
    max(columns?: string[]): DataFrame;
  }
}

DataFrame.prototype.agg = function(spec: AggregateSpec): DataFrame {
  return Aggregator.agg(this, spec);
};

DataFrame.prototype.describe = function(): DataFrame {
  return Aggregator.describe(this);
};

DataFrame.prototype.sum = function(columns?: string[]): DataFrame {
  const cols = columns || this.columnNames.filter(name => {
    const col = this.column(name);
    return col.dataType !== 'string' && col.dataType !== 'boolean';
  });
  
  const spec: AggregateSpec = {};
  cols.forEach(col => {
    spec[col] = ['sum'];
  });
  
  return Aggregator.agg(this, spec);
};

DataFrame.prototype.mean = function(columns?: string[]): DataFrame {
  const cols = columns || this.columnNames.filter(name => {
    const col = this.column(name);
    return col.dataType !== 'string' && col.dataType !== 'boolean';
  });
  
  const spec: AggregateSpec = {};
  cols.forEach(col => {
    spec[col] = ['mean'];
  });
  
  return Aggregator.agg(this, spec);
};

DataFrame.prototype.count = function(columns?: string[]): DataFrame {
  const cols = columns || this.columnNames;
  const spec: AggregateSpec = {};
  cols.forEach(col => {
    spec[col] = ['count'];
  });
  
  return Aggregator.agg(this, spec);
};

DataFrame.prototype.min = function(columns?: string[]): DataFrame {
  const cols = columns || this.columnNames.filter(name => {
    const col = this.column(name);
    return col.dataType !== 'string' && col.dataType !== 'boolean';
  });
  
  const spec: AggregateSpec = {};
  cols.forEach(col => {
    spec[col] = ['min'];
  });
  
  return Aggregator.agg(this, spec);
};

DataFrame.prototype.max = function(columns?: string[]): DataFrame {
  const cols = columns || this.columnNames.filter(name => {
    const col = this.column(name);
    return col.dataType !== 'string' && col.dataType !== 'boolean';
  });
  
  const spec: AggregateSpec = {};
  cols.forEach(col => {
    spec[col] = ['max'];
  });
  
  return Aggregator.agg(this, spec);
};