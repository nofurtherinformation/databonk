import { DataFrame } from '../core/dataframe.js';
export type AggregateFunction = 'sum' | 'mean' | 'count' | 'min' | 'max' | 'std' | 'var';
export type AggregateSpec = Record<string, string | AggregateFunction | AggregateFunction[]>;
export declare class Aggregator {
    static agg(df: DataFrame, spec: AggregateSpec): DataFrame;
    static describe(df: DataFrame): DataFrame;
    private static computeAggregates;
    private static computeSingleAggregate;
    private static computeVar;
    private static computeStd;
}
declare module '../core/dataframe.js' {
    interface DataFrame {
        agg(spec: AggregateSpec): DataFrame;
        describe(): DataFrame;
        sum(columns?: string[]): DataFrame;
        mean(columns?: string[]): DataFrame;
        count(columns?: string[]): DataFrame;
        min(columns?: string[]): DataFrame;
        max(columns?: string[]): DataFrame;
    }
}
//# sourceMappingURL=aggregation.d.ts.map