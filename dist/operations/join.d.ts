import { DataFrame } from '../core/dataframe.js';
export type JoinType = 'inner' | 'left' | 'right' | 'outer';
export declare class Joiner {
    static join(left: DataFrame, right: DataFrame, on: string | string[], how?: JoinType, suffixes?: [string, string]): DataFrame;
    private static validateJoinKeys;
    private static buildHashIndex;
    /**
     * Create a simple string key for a row using '||' separator.
     */
    private static createJoinKey;
    private static innerJoin;
    private static leftJoin;
    private static rightJoin;
    private static outerJoin;
    private static buildJoinedDataFrame;
}
declare module '../core/dataframe.js' {
    interface DataFrame {
        join(other: DataFrame, on: string | string[], how?: JoinType, suffixes?: [string, string]): DataFrame;
    }
}
//# sourceMappingURL=join.d.ts.map