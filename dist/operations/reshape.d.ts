import { DataFrame } from '../core/dataframe.js';
import { AggregateFunction } from './aggregation.js';
export declare class Reshaper {
    static pivot(df: DataFrame, index: string[], columns: string, values: string, aggFunc?: AggregateFunction): DataFrame;
    static melt(df: DataFrame, id_vars?: string[], value_vars?: string[], var_name?: string, value_name?: string): DataFrame;
    static transpose(df: DataFrame): DataFrame;
    static wide_to_long(df: DataFrame, stubnames: string[], i: string[], j?: string, sep?: string): DataFrame;
    private static computeAggregateValue;
}
declare module '../core/dataframe.js' {
    interface DataFrame {
        pivot(index: string[], columns: string, values: string, aggFunc?: AggregateFunction): DataFrame;
        melt(id_vars?: string[], value_vars?: string[], var_name?: string, value_name?: string): DataFrame;
        transpose(): DataFrame;
    }
}
//# sourceMappingURL=reshape.d.ts.map