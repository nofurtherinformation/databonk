/**
 * DataFrame - Main tabular data structure with columnar storage
 */

import { NumericColumn, DataType } from '../core/numeric-column';
import { StringColumn } from '../core/string-column';
import { Schema, ColumnType, isNumericType, columnTypeToDataType } from '../core/schema';

/** Union type for column storage */
@final
class ColumnEntry {
  numericColumn: NumericColumn | null;
  stringColumn: StringColumn | null;
  columnType: ColumnType;

  constructor(colType: ColumnType) {
    this.numericColumn = null;
    this.stringColumn = null;
    this.columnType = colType;
  }
}

@final
export class DataFrame {
  /** Column storage map: name -> ColumnEntry */
  private columns: Map<string, ColumnEntry>;
  /** Column order */
  private columnOrder: string[];
  /** Schema */
  private _schema: Schema;
  /** Number of rows */
  private _rowCount: i32;

  constructor() {
    this.columns = new Map<string, ColumnEntry>();
    this.columnOrder = [];
    this._schema = new Schema();
    this._rowCount = 0;
  }

  /** Get the number of rows */
  get rowCount(): i32 {
    return this._rowCount;
  }

  /** Get the number of columns */
  get columnCount(): i32 {
    return this.columnOrder.length;
  }

  /** Get the schema */
  get schema(): Schema {
    return this._schema;
  }

  /** Get column names */
  getColumnNames(): string[] {
    return this.columnOrder.slice(0);
  }

  /** Check if column exists */
  hasColumn(name: string): bool {
    return this.columns.has(name);
  }

  /** Get column type */
  getColumnType(name: string): ColumnType {
    if (!this.columns.has(name)) return ColumnType.Float64;
    return this.columns.get(name).columnType;
  }

  /** Add an Int32 column */
  addInt32Column(name: string, column: NumericColumn): void {
    this.addNumericColumn(name, column, ColumnType.Int32);
  }

  /** Add an Int64 column */
  addInt64Column(name: string, column: NumericColumn): void {
    this.addNumericColumn(name, column, ColumnType.Int64);
  }

  /** Add a Float32 column */
  addFloat32Column(name: string, column: NumericColumn): void {
    this.addNumericColumn(name, column, ColumnType.Float32);
  }

  /** Add a Float64 column */
  addFloat64Column(name: string, column: NumericColumn): void {
    this.addNumericColumn(name, column, ColumnType.Float64);
  }

  /** Internal: add a numeric column */
  private addNumericColumn(name: string, column: NumericColumn, colType: ColumnType): void {
    // Validate row count
    if (this._rowCount === 0) {
      this._rowCount = column.length;
    } else if (column.length !== this._rowCount) {
      throw new Error('Column length mismatch');
    }

    // Create entry
    const entry = new ColumnEntry(colType);
    entry.numericColumn = column;

    // Store
    this.columns.set(name, entry);
    this.columnOrder.push(name);
    this._schema.addField(name, colType, true);
  }

  /** Add a String column */
  addStringColumn(name: string, column: StringColumn): void {
    // Validate row count
    if (this._rowCount === 0) {
      this._rowCount = column.length;
    } else if (column.length !== this._rowCount) {
      throw new Error('Column length mismatch');
    }

    // Create entry
    const entry = new ColumnEntry(ColumnType.String);
    entry.stringColumn = column;

    // Store
    this.columns.set(name, entry);
    this.columnOrder.push(name);
    this._schema.addField(name, ColumnType.String, true);
  }

  /** Get a numeric column by name */
  getNumericColumn(name: string): NumericColumn | null {
    if (!this.columns.has(name)) return null;
    const entry = this.columns.get(name);
    return entry.numericColumn;
  }

  /** Get a string column by name */
  getStringColumn(name: string): StringColumn | null {
    if (!this.columns.has(name)) return null;
    const entry = this.columns.get(name);
    return entry.stringColumn;
  }

  /** Get column data pointer (for zero-copy access from JS) */
  getColumnDataPtr(name: string): usize {
    if (!this.columns.has(name)) return 0;
    const entry = this.columns.get(name);
    if (entry.numericColumn !== null) {
      return entry.numericColumn!.dataPtr;
    } else if (entry.stringColumn !== null) {
      return entry.stringColumn!.dataPtr;
    }
    return 0;
  }

  /** Get column validity bitmap pointer */
  getColumnValidityPtr(name: string): usize {
    if (!this.columns.has(name)) return 0;
    const entry = this.columns.get(name);
    if (entry.numericColumn !== null) {
      return entry.numericColumn!.validity.dataPtr;
    } else if (entry.stringColumn !== null) {
      return entry.stringColumn!.validity.dataPtr;
    }
    return 0;
  }

  /** Remove a column */
  removeColumn(name: string): bool {
    if (!this.columns.has(name)) return false;

    const entry = this.columns.get(name);
    if (entry.numericColumn !== null) {
      entry.numericColumn!.free();
    }
    if (entry.stringColumn !== null) {
      entry.stringColumn!.free();
    }

    this.columns.delete(name);

    // Remove from order
    const idx = this.columnOrder.indexOf(name);
    if (idx >= 0) {
      this.columnOrder.splice(idx, 1);
    }

    return true;
  }

  /** Select specific columns into a new DataFrame */
  select(columnNames: string[]): DataFrame {
    const result = new DataFrame();

    for (let i = 0; i < columnNames.length; i++) {
      const name = columnNames[i];
      if (!this.columns.has(name)) continue;

      const entry = this.columns.get(name);
      if (entry.numericColumn !== null) {
        const cloned = entry.numericColumn!.clone();
        result.addNumericColumn(name, cloned, entry.columnType);
      } else if (entry.stringColumn !== null) {
        const cloned = entry.stringColumn!.clone();
        result.addStringColumn(name, cloned);
      }
    }

    return result;
  }

  /** Slice rows into a new DataFrame */
  slice(start: i32, end: i32): DataFrame {
    const result = new DataFrame();

    for (let i = 0; i < this.columnOrder.length; i++) {
      const name = this.columnOrder[i];
      const entry = this.columns.get(name);

      if (entry.numericColumn !== null) {
        const sliced = entry.numericColumn!.slice(start, end);
        result.addNumericColumn(name, sliced, entry.columnType);
      }
      // String slicing would need separate implementation
    }

    return result;
  }

  /** Clone the entire DataFrame */
  clone(): DataFrame {
    const result = new DataFrame();

    for (let i = 0; i < this.columnOrder.length; i++) {
      const name = this.columnOrder[i];
      const entry = this.columns.get(name);

      if (entry.numericColumn !== null) {
        const cloned = entry.numericColumn!.clone();
        result.addNumericColumn(name, cloned, entry.columnType);
      } else if (entry.stringColumn !== null) {
        const cloned = entry.stringColumn!.clone();
        result.addStringColumn(name, cloned);
      }
    }

    return result;
  }

  /** Free all column memory */
  free(): void {
    const names = this.columnOrder.slice(0);
    for (let i = 0; i < names.length; i++) {
      this.removeColumn(names[i]);
    }
  }
}

/** Create an empty DataFrame with a specified row count */
export function createEmptyDataFrame(rowCount: i32): DataFrame {
  const df = new DataFrame();
  // Set row count directly - this is a bit of a hack but needed for building
  // We use a workaround by adding and removing a dummy column
  if (rowCount > 0) {
    const dummy = new NumericColumn(rowCount, DataType.Int32);
    df.addInt32Column('__dummy__', dummy);
    df.removeColumn('__dummy__');
  }
  return df;
}
