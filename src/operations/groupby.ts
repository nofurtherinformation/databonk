import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { AggregateSpec, AggregateFunction, Aggregator } from './aggregation.js';

export class GroupBy {
  private df: DataFrame;
  private groupColumns: string[];
  private groups: Map<string, number[]> = new Map();

  constructor(df: DataFrame, columns: string[]) {
    this.df = df;
    this.groupColumns = columns;
    this.computeGroups();
  }

  private computeGroups(): void {
    for (let i = 0; i < this.df.length; i++) {
      const key = this.createGroupKey(i);
      if (!this.groups.has(key)) {
        this.groups.set(key, []);
      }
      this.groups.get(key)!.push(i);
    }
  }

  private createGroupKey(rowIndex: number): string {
    const keyParts = this.groupColumns.map(colName => {
      const column = this.df.column(colName);
      const value = column.get(rowIndex);
      return value === null ? '__NULL__' : String(value);
    });
    return keyParts.join('||');
  }

  private parseGroupKey(key: string): any[] {
    return key.split('||').map(part => part === '__NULL__' ? null : part);
  }

  agg(spec: Record<string, AggregateFunction | AggregateFunction[]>): DataFrame {
    const resultColumns: Record<string, Column> = {};
    
    this.groupColumns.forEach(colName => {
      const groupValues: any[] = [];
      for (const key of this.groups.keys()) {
        const keyValues = this.parseGroupKey(key);
        const colIndex = this.groupColumns.indexOf(colName);
        groupValues.push(keyValues[colIndex]);
      }
      resultColumns[colName] = new Column(colName, groupValues);
    });

    Object.entries(spec).forEach(([colName, functions]) => {
      const funcArray = Array.isArray(functions) ? functions : [functions];
      
      funcArray.forEach(fn => {
        const aggValues: number[] = [];
        
        for (const indices of this.groups.values()) {
          let value: number;
          
          if (fn === 'count') {
            // Count doesn't need actual column values, just the number of rows
            value = indices.length;
          } else {
            // For other aggregations, we need the actual column values
            const groupValues = indices.map(i => this.df.column(colName).get(i));
            const groupColumn = new Column(`temp_${colName}`, groupValues);
            value = this.computeAggregateValue(groupColumn, fn);
          }
          
          aggValues.push(value);
        }
        
        const resultColName = funcArray.length === 1 ? colName : `${colName}_${fn}`;
        resultColumns[resultColName] = new Column(resultColName, aggValues, 'float64');
      });
    });

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
    return this.agg({ count: 'count' });
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
    
    this.df.columnNames.forEach(colName => {
      const values: any[] = [];
      
      if (this.groupColumns.includes(colName)) {
        for (const key of this.groups.keys()) {
          const keyValues = this.parseGroupKey(key);
          const colIndex = this.groupColumns.indexOf(colName);
          values.push(keyValues[colIndex]);
        }
      } else {
        for (const indices of this.groups.values()) {
          const firstIndex = indices[0];
          values.push(this.df.column(colName).get(firstIndex));
        }
      }
      
      resultColumns[colName] = new Column(colName, values);
    });

    return new DataFrame(resultColumns);
  }

  last(): DataFrame {
    const resultColumns: Record<string, Column> = {};
    
    this.df.columnNames.forEach(colName => {
      const values: any[] = [];
      
      if (this.groupColumns.includes(colName)) {
        for (const key of this.groups.keys()) {
          const keyValues = this.parseGroupKey(key);
          const colIndex = this.groupColumns.indexOf(colName);
          values.push(keyValues[colIndex]);
        }
      } else {
        for (const indices of this.groups.values()) {
          const lastIndex = indices[indices.length - 1];
          values.push(this.df.column(colName).get(lastIndex));
        }
      }
      
      resultColumns[colName] = new Column(colName, values);
    });

    return new DataFrame(resultColumns);
  }

  size(): DataFrame {
    const groupKeys = Array.from(this.groups.keys());
    const groupSizes = Array.from(this.groups.values()).map(indices => indices.length);
    
    const resultColumns: Record<string, Column> = {};
    
    this.groupColumns.forEach(colName => {
      const values = groupKeys.map(key => {
        const keyValues = this.parseGroupKey(key);
        const colIndex = this.groupColumns.indexOf(colName);
        return keyValues[colIndex];
      });
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