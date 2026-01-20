import { Column } from './column.js';
import { DataType } from '../utils/types.js';

export type RowObject = Record<string, any>;

export class DataFrame {
  private columns: Map<string, Column> = new Map();
  public readonly length: number;

  constructor(data: Record<string, Column> | Column[]) {
    if (Array.isArray(data)) {
      data.forEach(col => this.columns.set(col.name, col));
    } else {
      Object.entries(data).forEach(([name, col]) => this.columns.set(name, col));
    }

    const lengths = Array.from(this.columns.values()).map(col => col.length);
    if (lengths.length === 0) {
      this.length = 0;
    } else if (new Set(lengths).size > 1) {
      throw new Error('All columns must have the same length');
    } else {
      this.length = lengths[0];
    }
  }

  get columnNames(): string[] {
    return Array.from(this.columns.keys());
  }

  get columnCount(): number {
    return this.columns.size;
  }

  column(name: string): Column {
    const col = this.columns.get(name);
    if (!col) {
      throw new Error(`Column '${name}' not found`);
    }
    return col;
  }

  hasColumn(name: string): boolean {
    return this.columns.has(name);
  }

  addColumn(column: Column): DataFrame {
    if (this.length > 0 && column.length !== this.length) {
      throw new Error('Column length must match DataFrame length');
    }
    
    const newColumns = new Map(this.columns);
    newColumns.set(column.name, column);
    return new DataFrame(Object.fromEntries(newColumns));
  }

  removeColumn(name: string): DataFrame {
    if (!this.hasColumn(name)) {
      throw new Error(`Column '${name}' not found`);
    }
    
    const newColumns = new Map(this.columns);
    newColumns.delete(name);
    return new DataFrame(Object.fromEntries(newColumns));
  }

  select(columns: string[]): DataFrame {
    const selectedColumns: Record<string, Column> = {};
    
    columns.forEach(name => {
      if (!this.hasColumn(name)) {
        throw new Error(`Column '${name}' not found`);
      }
      selectedColumns[name] = this.columns.get(name)!;
    });
    
    return new DataFrame(selectedColumns);
  }

  filter(predicate: (row: RowObject, index: number) => boolean): DataFrame {
    const indices: number[] = [];
    
    for (let i = 0; i < this.length; i++) {
      const row = this.getRow(i);
      if (predicate(row, i)) {
        indices.push(i);
      }
    }
    
    return this.selectRows(indices);
  }

  slice(start?: number, end?: number): DataFrame {
    const sliceStart = start || 0;
    const sliceEnd = end || this.length;
    
    const slicedColumns: Record<string, Column> = {};
    
    this.columns.forEach((column, name) => {
      slicedColumns[name] = column.slice(sliceStart, sliceEnd);
    });
    
    return new DataFrame(slicedColumns);
  }

  selectRows(indices: number[]): DataFrame {
    const selectedColumns: Record<string, Column> = {};
    
    this.columns.forEach((column, name) => {
      const values = indices.map(i => column.get(i));
      selectedColumns[name] = new Column(name, values, column.dataType);
    });
    
    return new DataFrame(selectedColumns);
  }

  getRow(index: number): RowObject {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    
    const row: RowObject = {};
    this.columns.forEach((column, name) => {
      row[name] = column.get(index);
    });
    
    return row;
  }

  *rows(): Iterator<RowObject> {
    for (let i = 0; i < this.length; i++) {
      yield this.getRow(i);
    }
  }

  head(n: number = 5): DataFrame {
    return this.slice(0, Math.min(n, this.length));
  }

  tail(n: number = 5): DataFrame {
    return this.slice(Math.max(0, this.length - n));
  }

  sort(columnName: string, ascending: boolean = true): DataFrame {
    if (!this.hasColumn(columnName)) {
      throw new Error(`Column '${columnName}' not found`);
    }
    
    const indices = Array.from({ length: this.length }, (_, i) => i);
    const column = this.columns.get(columnName)!;
    
    indices.sort((a, b) => {
      const valueA = column.get(a);
      const valueB = column.get(b);
      
      if (valueA === null && valueB === null) return 0;
      if (valueA === null) return ascending ? 1 : -1;
      if (valueB === null) return ascending ? -1 : 1;
      
      let comparison: number;
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else {
        comparison = (valueA as number) - (valueB as number);
      }
      
      return ascending ? comparison : -comparison;
    });
    
    return this.selectRows(indices);
  }

  drop(columns: string[]): DataFrame {
    const remainingColumns: Record<string, Column> = {};
    
    this.columns.forEach((column, name) => {
      if (!columns.includes(name)) {
        remainingColumns[name] = column;
      }
    });
    
    return new DataFrame(remainingColumns);
  }

  rename(columnMapping: Record<string, string>): DataFrame {
    const renamedColumns: Record<string, Column> = {};
    
    this.columns.forEach((column, oldName) => {
      const newName = columnMapping[oldName] || oldName;
      renamedColumns[newName] = new Column(newName, column.toArray(), column.dataType);
    });
    
    return new DataFrame(renamedColumns);
  }

  toArray(): RowObject[] {
    const result: RowObject[] = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.getRow(i));
    }
    return result;
  }

  toColumns(): Record<string, any[]> {
    const result: Record<string, any[]> = {};
    this.columns.forEach((column, name) => {
      result[name] = column.toArray();
    });
    return result;
  }

  static from(data: RowObject[] | Record<string, any[]>): DataFrame {
    if (Array.isArray(data)) {
      return DataFrame.fromRows(data);
    } else {
      return DataFrame.fromColumns(data);
    }
  }

  static fromRows(rows: RowObject[]): DataFrame {
    if (rows.length === 0) {
      return new DataFrame({});
    }
    
    const columnNames = Object.keys(rows[0]);
    const columns: Record<string, Column> = {};
    
    columnNames.forEach(name => {
      const values = rows.map(row => row[name]);
      columns[name] = new Column(name, values);
    });
    
    return new DataFrame(columns);
  }

  static fromColumns(data: Record<string, any[]>): DataFrame {
    const columns: Record<string, Column> = {};
    
    Object.entries(data).forEach(([name, values]) => {
      columns[name] = new Column(name, values);
    });
    
    return new DataFrame(columns);
  }
}