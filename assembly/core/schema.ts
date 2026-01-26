/**
 * Schema - Column metadata and type definitions
 */

import { DataType } from './numeric-column';

/** Column types including strings */
export const enum ColumnType {
  Int32 = 0,
  Int64 = 1,
  Float32 = 2,
  Float64 = 3,
  String = 4,
}

/** Convert ColumnType to numeric DataType */
export function columnTypeToDataType(colType: ColumnType): DataType {
  switch (colType) {
    case ColumnType.Int32:
      return DataType.Int32;
    case ColumnType.Int64:
      return DataType.Int64;
    case ColumnType.Float32:
      return DataType.Float32;
    case ColumnType.Float64:
      return DataType.Float64;
    default:
      return DataType.Float64;
  }
}

/** Check if column type is numeric */
export function isNumericType(colType: ColumnType): bool {
  return colType !== ColumnType.String;
}

/** Get byte size for column type */
export function getColumnTypeSize(colType: ColumnType): i32 {
  switch (colType) {
    case ColumnType.Int32:
    case ColumnType.Float32:
      return 4;
    case ColumnType.Int64:
    case ColumnType.Float64:
      return 8;
    case ColumnType.String:
      return 0; // Variable length
    default:
      return 4;
  }
}

/** Column field definition */
@final
export class Field {
  name: string;
  type: ColumnType;
  nullable: bool;

  constructor(name: string, type: ColumnType, nullable: bool = true) {
    this.name = name;
    this.type = type;
    this.nullable = nullable;
  }
}

/** Schema - collection of fields */
@final
export class Schema {
  private fields: Field[];
  private fieldMap: Map<string, i32>;

  constructor() {
    this.fields = [];
    this.fieldMap = new Map<string, i32>();
  }

  /** Add a field to the schema */
  addField(name: string, type: ColumnType, nullable: bool = true): void {
    const index = this.fields.length;
    this.fields.push(new Field(name, type, nullable));
    this.fieldMap.set(name, index);
  }

  /** Get field by index */
  getField(index: i32): Field | null {
    if (index < 0 || index >= this.fields.length) return null;
    return this.fields[index];
  }

  /** Get field by name */
  getFieldByName(name: string): Field | null {
    if (!this.fieldMap.has(name)) return null;
    return this.fields[this.fieldMap.get(name)];
  }

  /** Get field index by name */
  getFieldIndex(name: string): i32 {
    if (!this.fieldMap.has(name)) return -1;
    return this.fieldMap.get(name);
  }

  /** Check if field exists */
  hasField(name: string): bool {
    return this.fieldMap.has(name);
  }

  /** Get number of fields */
  get numFields(): i32 {
    return this.fields.length;
  }

  /** Get all field names */
  getFieldNames(): string[] {
    const names: string[] = [];
    for (let i = 0; i < this.fields.length; i++) {
      names.push(this.fields[i].name);
    }
    return names;
  }

  /** Clone the schema */
  clone(): Schema {
    const newSchema = new Schema();
    for (let i = 0; i < this.fields.length; i++) {
      const f = this.fields[i];
      newSchema.addField(f.name, f.type, f.nullable);
    }
    return newSchema;
  }
}
