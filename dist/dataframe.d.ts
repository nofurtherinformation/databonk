/**
 * JavaScript DataFrame wrapper for Databonk WASM module
 * Provides a Pandas-like API
 */
import type { DatabonkModule } from './loader';
import { ColumnType, ColumnView } from './shared-memory';
/** Column specification for creating DataFrames */
export interface ColumnSpec {
    name: string;
    data: Int32Array | Float32Array | Float64Array;
    type?: ColumnType;
}
/** GroupBy builder for fluent aggregation API */
export declare class GroupByBuilder {
    private df;
    private keyColumn;
    private maxKey;
    constructor(df: DatabonkDataFrame, keyColumn: string, maxKey?: number);
    /** Sum aggregation on specified columns */
    sum(...valueColumns: string[]): DatabonkDataFrame;
    /** Mean aggregation on specified columns */
    mean(...valueColumns: string[]): DatabonkDataFrame;
}
/**
 * Main DataFrame class
 * Wraps the WASM DataFrame with a JavaScript-friendly API
 */
export declare class DatabonkDataFrame {
    private module;
    private ptr;
    private _columnNames;
    private _rowCount;
    private stringPtrs;
    constructor(module: DatabonkModule, ptr: number);
    /** Get the number of rows */
    get rowCount(): number;
    /** Get the number of columns */
    get columnCount(): number;
    /** Get column names */
    get columns(): string[];
    /** Get the internal WASM pointer */
    get wasmPtr(): number;
    /**
     * Create a DataFrame from typed arrays
     */
    static fromTypedArrays(module: DatabonkModule, columns: ColumnSpec[]): Promise<DatabonkDataFrame>;
    /** Allocate a string in WASM memory and track it for cleanup */
    private allocString;
    /** Free tracked string pointers */
    private freeStrings;
    /** Sum of a column */
    sum(columnName: string): number;
    /** Mean of a column */
    mean(columnName: string): number;
    /** Minimum of a column */
    min(columnName: string): number;
    /** Maximum of a column */
    max(columnName: string): number;
    /** Count non-null values in a column */
    count(columnName: string): number;
    /** Add two columns, storing result in a new column */
    add(colA: string, colB: string, resultName: string): this;
    /** Subtract columns (colA - colB), storing result in a new column */
    sub(colA: string, colB: string, resultName: string): this;
    /** Multiply column by scalar, storing result in a new column */
    scalarMul(colName: string, scalar: number, resultName: string): this;
    /** Start a GroupBy operation */
    groupBy(keyColumn: string, maxKey?: number): GroupByBuilder;
    /** Internal: Perform groupBy sum */
    _groupBySum(keyColumn: string, valueColumns: string[], maxKey: number): DatabonkDataFrame;
    /** Internal: Perform groupBy mean */
    _groupByMean(keyColumn: string, valueColumns: string[], maxKey: number): DatabonkDataFrame;
    /** Inner join with another DataFrame */
    innerJoin(other: DatabonkDataFrame, leftKey: string, rightKey: string): DatabonkDataFrame;
    /** Get a zero-copy view of a column's data */
    getColumnView(columnName: string): ColumnView<Int32Array | Float32Array | Float64Array> | null;
    /** Check if a column exists */
    hasColumn(columnName: string): boolean;
    /** Free the DataFrame and associated WASM memory */
    free(): void;
}
//# sourceMappingURL=dataframe.d.ts.map