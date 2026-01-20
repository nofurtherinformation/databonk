import { AggregateFunction } from '../operations/aggregation.js';
/**
 * StatAccumulator tracks multiple statistics in a single pass through the data.
 * Uses Welford's online algorithm for numerically stable variance computation.
 */
export declare class StatAccumulator {
    count: number;
    sum: number;
    min: number;
    max: number;
    private mean_;
    private m2;
    /**
     * Add a single value to the accumulator.
     * Updates all statistics in O(1) time.
     */
    add(value: number): void;
    /**
     * Get the mean of all added values.
     */
    getMean(): number;
    /**
     * Get the sample variance (n-1 denominator).
     */
    getVariance(): number;
    /**
     * Get the sample standard deviation.
     */
    getStd(): number;
    /**
     * Get a specific aggregate value by function name.
     */
    getValue(fn: AggregateFunction): number;
    /**
     * Merge another accumulator into this one.
     * Useful for parallel aggregation.
     */
    merge(other: StatAccumulator): void;
    /**
     * Reset the accumulator for reuse.
     */
    reset(): void;
}
/**
 * GroupedAccumulators manages StatAccumulators for multiple groups and columns.
 * Enables single-pass aggregation across all groups and aggregate functions.
 */
export declare class GroupedAccumulators {
    private accumulators;
    private columns;
    constructor(columns: string[]);
    /**
     * Get or create the accumulator for a group and column.
     */
    getAccumulator(groupKey: string, columnName: string): StatAccumulator;
    /**
     * Add a value for a specific group and column.
     */
    add(groupKey: string, columnName: string, value: number | null): void;
    /**
     * Get all group keys.
     */
    getGroups(): string[];
    /**
     * Get the aggregate value for a group and column.
     */
    getValue(groupKey: string, columnName: string, fn: AggregateFunction): number;
    /**
     * Get the count for a group (same across all columns).
     */
    getGroupCount(groupKey: string): number;
}
/**
 * AggregationPlan represents the columns and functions to aggregate.
 */
export interface AggregationPlan {
    columns: string[];
    functions: Map<string, AggregateFunction[]>;
}
/**
 * Creates an aggregation plan from a spec object.
 */
export declare function createAggregationPlan(spec: Record<string, AggregateFunction | AggregateFunction[]>): AggregationPlan;
//# sourceMappingURL=aggregation-engine.d.ts.map