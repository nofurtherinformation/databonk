import { DataFrame } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { AggregateFunction } from './aggregation.js';

export class Reshaper {
  static pivot(
    df: DataFrame,
    index: string[],
    columns: string,
    values: string,
    aggFunc: AggregateFunction = 'mean'
  ): DataFrame {
    const uniqueColumnValues = df.column(columns).unique();
    const pivotColumns = uniqueColumnValues.map(val => String(val));
    
    const groupBy = df.groupBy(index);
    const grouped = groupBy.agg({ [values]: aggFunc });
    
    const resultColumns: Record<string, Column> = {};
    
    index.forEach(indexCol => {
      resultColumns[indexCol] = grouped.column(indexCol);
    });
    
    pivotColumns.forEach(pivotCol => {
      const columnValues: any[] = [];
      
      for (let i = 0; i < grouped.length; i++) {
        const indexValues = index.map(col => grouped.column(col).get(i));
        
        const matchingRows = df.filter((row, idx) => {
          return index.every(col => row[col] === indexValues[index.indexOf(col)]) &&
                 row[columns] === pivotCol;
        });
        
        if (matchingRows.length > 0) {
          const column = matchingRows.column(values);
          columnValues.push(this.computeAggregateValue(column, aggFunc));
        } else {
          columnValues.push(null);
        }
      }
      
      resultColumns[pivotCol] = new Column(pivotCol, columnValues, 'float64');
    });
    
    return new DataFrame(resultColumns);
  }

  static melt(
    df: DataFrame,
    id_vars?: string[],
    value_vars?: string[],
    var_name: string = 'variable',
    value_name: string = 'value'
  ): DataFrame {
    const idColumns = id_vars || [];
    const valueColumns = value_vars || df.columnNames.filter(name => !idColumns.includes(name));
    
    const resultLength = df.length * valueColumns.length;
    const resultColumns: Record<string, Column> = {};
    
    idColumns.forEach(colName => {
      const values: any[] = [];
      const originalColumn = df.column(colName);
      
      for (let i = 0; i < df.length; i++) {
        for (let j = 0; j < valueColumns.length; j++) {
          values.push(originalColumn.get(i));
        }
      }
      
      resultColumns[colName] = new Column(colName, values, originalColumn.dataType);
    });
    
    const variableValues: string[] = [];
    const dataValues: any[] = [];
    
    for (let i = 0; i < df.length; i++) {
      for (const valueCol of valueColumns) {
        variableValues.push(valueCol);
        dataValues.push(df.column(valueCol).get(i));
      }
    }
    
    resultColumns[var_name] = new Column(var_name, variableValues, 'string');
    resultColumns[value_name] = new Column(value_name, dataValues);
    
    return new DataFrame(resultColumns);
  }

  static transpose(df: DataFrame): DataFrame {
    const resultColumns: Record<string, Column> = {};
    
    resultColumns['column'] = new Column('column', df.columnNames, 'string');
    
    for (let i = 0; i < df.length; i++) {
      const rowValues: any[] = [];
      df.columnNames.forEach(colName => {
        rowValues.push(df.column(colName).get(i));
      });
      
      resultColumns[`row_${i}`] = new Column(`row_${i}`, rowValues);
    }
    
    return new DataFrame(resultColumns);
  }

  static wide_to_long(
    df: DataFrame,
    stubnames: string[],
    i: string[],
    j: string = 'id',
    sep: string = '_'
  ): DataFrame {
    const idColumns = i;
    const wideColumns: string[][] = [];
    
    stubnames.forEach(stub => {
      const matchingCols = df.columnNames.filter(col => col.startsWith(stub + sep));
      wideColumns.push(matchingCols);
    });
    
    if (wideColumns.some(cols => cols.length === 0)) {
      throw new Error('No columns found matching stub pattern');
    }
    
    const suffixes = wideColumns[0].map(col => 
      col.substring(col.lastIndexOf(sep) + 1)
    );
    
    const resultLength = df.length * suffixes.length;
    const resultColumns: Record<string, Column> = {};
    
    idColumns.forEach(colName => {
      const values: any[] = [];
      const originalColumn = df.column(colName);
      
      for (let i = 0; i < df.length; i++) {
        for (let s = 0; s < suffixes.length; s++) {
          values.push(originalColumn.get(i));
        }
      }
      
      resultColumns[colName] = new Column(colName, values, originalColumn.dataType);
    });
    
    const jValues: string[] = [];
    for (let i = 0; i < df.length; i++) {
      suffixes.forEach(suffix => {
        jValues.push(suffix);
      });
    }
    resultColumns[j] = new Column(j, jValues, 'string');
    
    stubnames.forEach((stub, stubIndex) => {
      const values: any[] = [];
      
      for (let i = 0; i < df.length; i++) {
        suffixes.forEach(suffix => {
          const colName = stub + sep + suffix;
          if (df.hasColumn(colName)) {
            values.push(df.column(colName).get(i));
          } else {
            values.push(null);
          }
        });
      }
      
      resultColumns[stub] = new Column(stub, values);
    });
    
    return new DataFrame(resultColumns);
  }

  private static computeAggregateValue(column: Column, fn: AggregateFunction): number {
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
      default:
        throw new Error(`Unknown aggregate function: ${fn}`);
    }
  }
}

declare module '../core/dataframe.js' {
  interface DataFrame {
    pivot(
      index: string[],
      columns: string,
      values: string,
      aggFunc?: AggregateFunction
    ): DataFrame;
    melt(
      id_vars?: string[],
      value_vars?: string[],
      var_name?: string,
      value_name?: string
    ): DataFrame;
    transpose(): DataFrame;
  }
}

DataFrame.prototype.pivot = function(
  index: string[],
  columns: string,
  values: string,
  aggFunc: AggregateFunction = 'mean'
): DataFrame {
  return Reshaper.pivot(this, index, columns, values, aggFunc);
};

DataFrame.prototype.melt = function(
  id_vars?: string[],
  value_vars?: string[],
  var_name: string = 'variable',
  value_name: string = 'value'
): DataFrame {
  return Reshaper.melt(this, id_vars, value_vars, var_name, value_name);
};

DataFrame.prototype.transpose = function(): DataFrame {
  return Reshaper.transpose(this);
};