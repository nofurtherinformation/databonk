import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { DataType } from '../utils/types.js';

export type ColumnExpression<T = any> = (row: RowObject, index: number) => T;
export type ColumnTransform<T = any, U = any> = (value: T | null, index: number) => U;

export class ColumnDeriver {
  static withColumn<T>(
    df: DataFrame,
    name: string,
    expression: ColumnExpression<T>,
    dataType?: DataType
  ): DataFrame {
    const values: T[] = [];
    
    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      values.push(expression(row, i));
    }
    
    const newColumn = new Column(name, values, dataType);
    return df.addColumn(newColumn);
  }

  static withColumns(
    df: DataFrame,
    expressions: Record<string, ColumnExpression>
  ): DataFrame {
    let result = df;
    
    Object.entries(expressions).forEach(([name, expression]) => {
      result = this.withColumn(result, name, expression);
    });
    
    return result;
  }

  static transform<T, U>(
    df: DataFrame,
    columnName: string,
    transformer: ColumnTransform<T, U>,
    newColumnName?: string,
    dataType?: DataType
  ): DataFrame {
    if (!df.hasColumn(columnName)) {
      throw new Error(`Column '${columnName}' not found`);
    }
    
    const column = df.column(columnName);
    const transformedValues: U[] = [];
    
    for (let i = 0; i < column.length; i++) {
      const value = column.get(i) as T;
      transformedValues.push(transformer(value, i));
    }
    
    const resultColumnName = newColumnName || columnName;
    const transformedColumn = new Column(resultColumnName, transformedValues, dataType);
    
    if (newColumnName && newColumnName !== columnName) {
      return df.addColumn(transformedColumn);
    } else {
      return df.removeColumn(columnName).addColumn(transformedColumn);
    }
  }

  static assign(df: DataFrame, assignments: Record<string, ColumnExpression>): DataFrame {
    return this.withColumns(df, assignments);
  }

  static fillna<T>(df: DataFrame, columnName: string, value: T): DataFrame {
    return this.transform(df, columnName, (val) => val === null ? value : val, columnName);
  }

  static dropna(df: DataFrame, columnNames?: string[]): DataFrame {
    const columnsToCheck = columnNames || df.columnNames;
    
    return df.filter(row => {
      return columnsToCheck.every(colName => row[colName] !== null);
    });
  }

  static replace<T>(
    df: DataFrame,
    columnName: string,
    oldValue: T,
    newValue: T
  ): DataFrame {
    return this.transform(
      df,
      columnName,
      (val) => val === oldValue ? newValue : val,
      columnName
    );
  }

  static clip(
    df: DataFrame,
    columnName: string,
    lower?: number,
    upper?: number
  ): DataFrame {
    const column = df.column(columnName);
    if (column.dataType === 'string' || column.dataType === 'boolean') {
      throw new Error('Cannot clip non-numeric column');
    }

    return this.transform(
      df,
      columnName,
      (val: number | null) => {
        if (val === null) return null;
        let clipped = val;
        if (lower !== undefined && clipped < lower) clipped = lower;
        if (upper !== undefined && clipped > upper) clipped = upper;
        return clipped;
      },
      columnName,
      'float64'
    );
  }

  static round(df: DataFrame, columnName: string, decimals: number = 0): DataFrame {
    const column = df.column(columnName);
    if (column.dataType === 'string' || column.dataType === 'boolean') {
      throw new Error('Cannot round non-numeric column');
    }

    const multiplier = Math.pow(10, decimals);
    
    return this.transform(
      df,
      columnName,
      (val: number | null) => {
        if (val === null) return null;
        return Math.round(val * multiplier) / multiplier;
      },
      columnName,
      'float64'
    );
  }

  static abs(df: DataFrame, columnName: string): DataFrame {
    const column = df.column(columnName);
    if (column.dataType === 'string' || column.dataType === 'boolean') {
      throw new Error('Cannot take absolute value of non-numeric column');
    }

    return this.transform(
      df,
      columnName,
      (val: number | null) => val === null ? null : Math.abs(val),
      columnName,
      'float64'
    );
  }

  static sqrt(df: DataFrame, columnName: string): DataFrame {
    const column = df.column(columnName);
    if (column.dataType === 'string' || column.dataType === 'boolean') {
      throw new Error('Cannot take square root of non-numeric column');
    }

    return this.transform(
      df,
      columnName,
      (val: number | null) => val === null ? null : Math.sqrt(val),
      columnName,
      'float64'
    );
  }

  static log(df: DataFrame, columnName: string, base?: number): DataFrame {
    const column = df.column(columnName);
    if (column.dataType === 'string' || column.dataType === 'boolean') {
      throw new Error('Cannot take logarithm of non-numeric column');
    }

    const logFn = base ? (x: number) => Math.log(x) / Math.log(base) : Math.log;

    return this.transform(
      df,
      columnName,
      (val: number | null) => val === null || val <= 0 ? null : logFn(val),
      columnName,
      'float64'
    );
  }

  static normalize(df: DataFrame, columnName: string): DataFrame {
    const column = df.column(columnName);
    if (column.dataType === 'string' || column.dataType === 'boolean') {
      throw new Error('Cannot normalize non-numeric column');
    }

    const mean = column.mean();
    const values = column.toArray().filter(v => v !== null) as number[];
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
    const std = Math.sqrt(variance);

    return this.transform(
      df,
      columnName,
      (val: number | null) => val === null ? null : (val - mean) / std,
      columnName,
      'float64'
    );
  }

  static rank(df: DataFrame, columnName: string, ascending: boolean = true): DataFrame {
    const column = df.column(columnName);
    const values = column.toArray();
    
    const indexedValues = values.map((val, idx) => ({ value: val, index: idx }))
      .filter(item => item.value !== null);

    indexedValues.sort((a, b) => {
      const comparison = a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
      return ascending ? comparison : -comparison;
    });

    const ranks: number[] = new Array(column.length).fill(null);
    indexedValues.forEach((item, rank) => {
      ranks[item.index] = rank + 1;
    });

    return this.withColumn(df, `${columnName}_rank`, (row, i) => ranks[i], 'int32');
  }
}

declare module '../core/dataframe.js' {
  interface DataFrame {
    withColumn<T>(
      name: string,
      expression: ColumnExpression<T>,
      dataType?: DataType
    ): DataFrame;
    withColumns(expressions: Record<string, ColumnExpression>): DataFrame;
    assign(assignments: Record<string, ColumnExpression>): DataFrame;
    fillna<T>(columnName: string, value: T): DataFrame;
    dropna(columnNames?: string[]): DataFrame;
    replace<T>(columnName: string, oldValue: T, newValue: T): DataFrame;
    clip(columnName: string, lower?: number, upper?: number): DataFrame;
    round(columnName: string, decimals?: number): DataFrame;
    abs(columnName: string): DataFrame;
    sqrt(columnName: string): DataFrame;
    log(columnName: string, base?: number): DataFrame;
    normalize(columnName: string): DataFrame;
    rank(columnName: string, ascending?: boolean): DataFrame;
  }
}

DataFrame.prototype.withColumn = function<T>(
  name: string,
  expression: ColumnExpression<T>,
  dataType?: DataType
): DataFrame {
  return ColumnDeriver.withColumn(this, name, expression, dataType);
};

DataFrame.prototype.withColumns = function(
  expressions: Record<string, ColumnExpression>
): DataFrame {
  return ColumnDeriver.withColumns(this, expressions);
};

DataFrame.prototype.assign = function(
  assignments: Record<string, ColumnExpression>
): DataFrame {
  return ColumnDeriver.assign(this, assignments);
};

DataFrame.prototype.fillna = function<T>(columnName: string, value: T): DataFrame {
  return ColumnDeriver.fillna(this, columnName, value);
};

DataFrame.prototype.dropna = function(columnNames?: string[]): DataFrame {
  return ColumnDeriver.dropna(this, columnNames);
};

DataFrame.prototype.replace = function<T>(
  columnName: string,
  oldValue: T,
  newValue: T
): DataFrame {
  return ColumnDeriver.replace(this, columnName, oldValue, newValue);
};

DataFrame.prototype.clip = function(
  columnName: string,
  lower?: number,
  upper?: number
): DataFrame {
  return ColumnDeriver.clip(this, columnName, lower, upper);
};

DataFrame.prototype.round = function(columnName: string, decimals: number = 0): DataFrame {
  return ColumnDeriver.round(this, columnName, decimals);
};

DataFrame.prototype.abs = function(columnName: string): DataFrame {
  return ColumnDeriver.abs(this, columnName);
};

DataFrame.prototype.sqrt = function(columnName: string): DataFrame {
  return ColumnDeriver.sqrt(this, columnName);
};

DataFrame.prototype.log = function(columnName: string, base?: number): DataFrame {
  return ColumnDeriver.log(this, columnName, base);
};

DataFrame.prototype.normalize = function(columnName: string): DataFrame {
  return ColumnDeriver.normalize(this, columnName);
};

DataFrame.prototype.rank = function(columnName: string, ascending: boolean = true): DataFrame {
  return ColumnDeriver.rank(this, columnName, ascending);
};