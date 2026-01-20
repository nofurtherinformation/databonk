import { Column } from './column.js';
export type RowObject = Record<string, any>;
export declare class DataFrame {
    private columns;
    readonly length: number;
    constructor(data: Record<string, Column> | Column[]);
    get columnNames(): string[];
    get columnCount(): number;
    column(name: string): Column;
    hasColumn(name: string): boolean;
    addColumn(column: Column): DataFrame;
    removeColumn(name: string): DataFrame;
    select(columns: string[]): DataFrame;
    filter(predicate: (row: RowObject, index: number) => boolean): DataFrame;
    slice(start?: number, end?: number): DataFrame;
    selectRows(indices: number[]): DataFrame;
    getRow(index: number): RowObject;
    rows(): Iterator<RowObject>;
    head(n?: number): DataFrame;
    tail(n?: number): DataFrame;
    sort(columnName: string, ascending?: boolean): DataFrame;
    drop(columns: string[]): DataFrame;
    rename(columnMapping: Record<string, string>): DataFrame;
    toArray(): RowObject[];
    toColumns(): Record<string, any[]>;
    static from(data: RowObject[] | Record<string, any[]>): DataFrame;
    static fromRows(rows: RowObject[]): DataFrame;
    static fromColumns(data: Record<string, any[]>): DataFrame;
}
//# sourceMappingURL=dataframe.d.ts.map