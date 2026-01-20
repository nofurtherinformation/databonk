import { DataFrame } from '../core/dataframe.js';
import { AggregateFunction } from './aggregation.js';
export declare class GroupBy {
    private df;
    private groupColumns;
    private groups;
    private groupOrder;
    private cachedGroupCols;
    constructor(df: DataFrame, columns: string[]);
    private computeGroups;
    /**
     * Create a simple string key for a row using '||' separator.
     */
    private createGroupKey;
    /**
     * Perform aggregation using single-pass algorithm for efficiency.
     */
    agg(spec: Record<string, AggregateFunction | AggregateFunction[]>): DataFrame;
    private computeAggregateValue;
    private computeVar;
    private computeStd;
    count(): DataFrame;
    sum(columns: string[]): DataFrame;
    mean(columns: string[]): DataFrame;
    min(columns: string[]): DataFrame;
    max(columns: string[]): DataFrame;
    first(): DataFrame;
    last(): DataFrame;
    size(): DataFrame;
}
declare module '../core/dataframe.js' {
    interface DataFrame {
        groupBy(columns: string[]): GroupBy;
    }
}
//# sourceMappingURL=groupby.d.ts.map