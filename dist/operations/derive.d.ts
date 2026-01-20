import { DataFrame, RowObject } from '../core/dataframe.js';
import { DataType } from '../utils/types.js';
export type ColumnExpression<T = any> = (row: RowObject, index: number) => T;
export type ColumnTransform<T = any, U = any> = (value: T | null, index: number) => U;
export declare class ColumnDeriver {
    static withColumn<T>(df: DataFrame, name: string, expression: ColumnExpression<T>, dataType?: DataType): DataFrame;
    static withColumns(df: DataFrame, expressions: Record<string, ColumnExpression>): DataFrame;
    static transform<T, U>(df: DataFrame, columnName: string, transformer: ColumnTransform<T, U>, newColumnName?: string, dataType?: DataType): DataFrame;
    static assign(df: DataFrame, assignments: Record<string, ColumnExpression>): DataFrame;
    static fillna<T>(df: DataFrame, columnName: string, value: T): DataFrame;
    static dropna(df: DataFrame, columnNames?: string[]): DataFrame;
    static replace<T>(df: DataFrame, columnName: string, oldValue: T, newValue: T): DataFrame;
    static clip(df: DataFrame, columnName: string, lower?: number, upper?: number): DataFrame;
    static round(df: DataFrame, columnName: string, decimals?: number): DataFrame;
    static abs(df: DataFrame, columnName: string): DataFrame;
    static sqrt(df: DataFrame, columnName: string): DataFrame;
    static log(df: DataFrame, columnName: string, base?: number): DataFrame;
    static normalize(df: DataFrame, columnName: string): DataFrame;
    static rank(df: DataFrame, columnName: string, ascending?: boolean): DataFrame;
}
declare module '../core/dataframe.js' {
    interface DataFrame {
        withColumn<T>(name: string, expression: ColumnExpression<T>, dataType?: DataType): DataFrame;
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
//# sourceMappingURL=derive.d.ts.map