import { Column } from './column';
export type RowObject = Record<string, any>;
/**
 * RowProxy provides zero-allocation row access for iteration.
 * Reuses a single object while iterating, avoiding object creation per row.
 */
export declare class RowProxy {
    private columnCache;
    private index;
    constructor(df: DataFrame);
    /**
     * Set the current row index.
     * @returns this for chaining
     */
    setIndex(i: number): this;
    /**
     * Get a value from the current row.
     */
    get(col: string): any;
    /**
     * Get a value without null checking (faster for non-null columns).
     */
    getRaw(col: string): any;
    /**
     * Check if a column value is null at the current row.
     */
    isNull(col: string): boolean;
    /**
     * Get the current row index.
     */
    getIndex(): number;
}
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
    /**
     * Filter rows using a predicate function that receives a RowProxy.
     * More efficient than filter() as it avoids creating a new object per row.
     */
    filterByIndex(predicate: (index: number, proxy: RowProxy) => boolean): DataFrame;
    /**
     * Create a RowProxy for efficient iteration.
     * Use this when you need to access multiple columns per row without allocation.
     */
    createRowProxy(): RowProxy;
    getRow(index: number): RowObject;
    rows(): IterableIterator<RowObject>;
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