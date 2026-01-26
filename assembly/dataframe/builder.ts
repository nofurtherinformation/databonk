/**
 * DataFrame Builder - Fluent API for constructing DataFrames
 */

import { DataFrame } from './dataframe';
import { NumericColumn, DataType } from '../core/numeric-column';
import { StringColumn } from '../core/string-column';
import { ColumnType } from '../core/schema';

@final
export class DataFrameBuilder {
  private df: DataFrame;
  private _rowCount: i32;
  private currentRowIndex: i32;

  constructor(rowCount: i32) {
    this.df = new DataFrame();
    this._rowCount = rowCount;
    this.currentRowIndex = 0;
  }

  /** Add an Int32 column with initial values from a pointer */
  addInt32ColumnFromPtr(name: string, dataPtr: usize, length: i32): DataFrameBuilder {
    if (length !== this._rowCount) {
      throw new Error('Column length mismatch');
    }
    const col = new NumericColumn(length, DataType.Int32);
    col.copyFromBuffer(dataPtr, length);
    this.df.addInt32Column(name, col);
    return this;
  }

  /** Add an Int64 column with initial values from a pointer */
  addInt64ColumnFromPtr(name: string, dataPtr: usize, length: i32): DataFrameBuilder {
    if (length !== this._rowCount) {
      throw new Error('Column length mismatch');
    }
    const col = new NumericColumn(length, DataType.Int64);
    col.copyFromBuffer(dataPtr, length);
    this.df.addInt64Column(name, col);
    return this;
  }

  /** Add a Float32 column with initial values from a pointer */
  addFloat32ColumnFromPtr(name: string, dataPtr: usize, length: i32): DataFrameBuilder {
    if (length !== this._rowCount) {
      throw new Error('Column length mismatch');
    }
    const col = new NumericColumn(length, DataType.Float32);
    col.copyFromBuffer(dataPtr, length);
    this.df.addFloat32Column(name, col);
    return this;
  }

  /** Add a Float64 column with initial values from a pointer */
  addFloat64ColumnFromPtr(name: string, dataPtr: usize, length: i32): DataFrameBuilder {
    if (length !== this._rowCount) {
      throw new Error('Column length mismatch');
    }
    const col = new NumericColumn(length, DataType.Float64);
    col.copyFromBuffer(dataPtr, length);
    this.df.addFloat64Column(name, col);
    return this;
  }

  /** Add an empty Int32 column */
  addInt32Column(name: string): DataFrameBuilder {
    const col = new NumericColumn(this._rowCount, DataType.Int32);
    this.df.addInt32Column(name, col);
    return this;
  }

  /** Add an empty Int64 column */
  addInt64Column(name: string): DataFrameBuilder {
    const col = new NumericColumn(this._rowCount, DataType.Int64);
    this.df.addInt64Column(name, col);
    return this;
  }

  /** Add an empty Float32 column */
  addFloat32Column(name: string): DataFrameBuilder {
    const col = new NumericColumn(this._rowCount, DataType.Float32);
    this.df.addFloat32Column(name, col);
    return this;
  }

  /** Add an empty Float64 column */
  addFloat64Column(name: string): DataFrameBuilder {
    const col = new NumericColumn(this._rowCount, DataType.Float64);
    this.df.addFloat64Column(name, col);
    return this;
  }

  /** Add an empty String column */
  addStringColumn(name: string, estimatedCharCapacity: i32 = 0): DataFrameBuilder {
    const col = new StringColumn(this._rowCount, estimatedCharCapacity);
    this.df.addStringColumn(name, col);
    return this;
  }

  /** Build and return the DataFrame */
  build(): DataFrame {
    return this.df;
  }

  /** Get the row count */
  get rowCount(): i32 {
    return this._rowCount;
  }
}

/** Create a new DataFrame builder */
export function createDataFrameBuilder(rowCount: i32): DataFrameBuilder {
  return new DataFrameBuilder(rowCount);
}

/**
 * Build a DataFrame from column arrays passed from JS
 * This is the main entry point for creating DataFrames from JavaScript
 */
export function buildDataFrameFromArrays(
  rowCount: i32,
  columnNames: string[],
  columnTypes: i32[],
  dataPtrs: usize[]
): DataFrame {
  const builder = new DataFrameBuilder(rowCount);

  for (let i = 0; i < columnNames.length; i++) {
    const name = columnNames[i];
    const colType = columnTypes[i] as ColumnType;
    const dataPtr = dataPtrs[i];

    switch (colType) {
      case ColumnType.Int32:
        builder.addInt32ColumnFromPtr(name, dataPtr, rowCount);
        break;
      case ColumnType.Int64:
        builder.addInt64ColumnFromPtr(name, dataPtr, rowCount);
        break;
      case ColumnType.Float32:
        builder.addFloat32ColumnFromPtr(name, dataPtr, rowCount);
        break;
      case ColumnType.Float64:
        builder.addFloat64ColumnFromPtr(name, dataPtr, rowCount);
        break;
      // String columns need special handling
      default:
        break;
    }
  }

  return builder.build();
}
