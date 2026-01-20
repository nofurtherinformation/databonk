import { AggregateFunction } from '../operations/aggregation.js';

/**
 * StatAccumulator tracks multiple statistics in a single pass through the data.
 * Uses Welford's online algorithm for numerically stable variance computation.
 */
export class StatAccumulator {
  count: number = 0;
  sum: number = 0;
  min: number = Infinity;
  max: number = -Infinity;
  private mean_: number = 0;
  private m2: number = 0;  // Sum of squares of differences from current mean

  /**
   * Add a single value to the accumulator.
   * Updates all statistics in O(1) time.
   */
  add(value: number): void {
    this.count++;
    this.sum += value;

    if (value < this.min) this.min = value;
    if (value > this.max) this.max = value;

    // Welford's online algorithm for stable variance
    const delta = value - this.mean_;
    this.mean_ += delta / this.count;
    const delta2 = value - this.mean_;
    this.m2 += delta * delta2;
  }

  /**
   * Get the mean of all added values.
   */
  getMean(): number {
    return this.count > 0 ? this.mean_ : 0;
  }

  /**
   * Get the sample variance (n-1 denominator).
   */
  getVariance(): number {
    return this.count > 1 ? this.m2 / (this.count - 1) : 0;
  }

  /**
   * Get the sample standard deviation.
   */
  getStd(): number {
    return Math.sqrt(this.getVariance());
  }

  /**
   * Get a specific aggregate value by function name.
   */
  getValue(fn: AggregateFunction): number {
    switch (fn) {
      case 'sum':
        return this.sum;
      case 'mean':
        return this.getMean();
      case 'min':
        return this.count > 0 ? this.min : NaN;
      case 'max':
        return this.count > 0 ? this.max : NaN;
      case 'count':
        return this.count;
      case 'var':
        return this.getVariance();
      case 'std':
        return this.getStd();
      default:
        throw new Error(`Unknown aggregate function: ${fn}`);
    }
  }

  /**
   * Merge another accumulator into this one.
   * Useful for parallel aggregation.
   */
  merge(other: StatAccumulator): void {
    if (other.count === 0) return;
    if (this.count === 0) {
      this.count = other.count;
      this.sum = other.sum;
      this.min = other.min;
      this.max = other.max;
      this.mean_ = other.mean_;
      this.m2 = other.m2;
      return;
    }

    const totalCount = this.count + other.count;
    const delta = other.mean_ - this.mean_;

    // Combined mean
    this.mean_ = (this.count * this.mean_ + other.count * other.mean_) / totalCount;

    // Combined M2 using parallel algorithm
    this.m2 = this.m2 + other.m2 + delta * delta * this.count * other.count / totalCount;

    this.sum += other.sum;
    this.count = totalCount;
    if (other.min < this.min) this.min = other.min;
    if (other.max > this.max) this.max = other.max;
  }

  /**
   * Reset the accumulator for reuse.
   */
  reset(): void {
    this.count = 0;
    this.sum = 0;
    this.min = Infinity;
    this.max = -Infinity;
    this.mean_ = 0;
    this.m2 = 0;
  }
}

/**
 * GroupedAccumulators manages StatAccumulators for multiple groups and columns.
 * Enables single-pass aggregation across all groups and aggregate functions.
 */
export class GroupedAccumulators {
  // Map of groupKey -> columnName -> StatAccumulator
  private accumulators: Map<string, Map<string, StatAccumulator>> = new Map();
  private columns: string[];

  constructor(columns: string[]) {
    this.columns = columns;
  }

  /**
   * Get or create the accumulator for a group and column.
   */
  getAccumulator(groupKey: string, columnName: string): StatAccumulator {
    let groupAccs = this.accumulators.get(groupKey);
    if (!groupAccs) {
      groupAccs = new Map();
      this.accumulators.set(groupKey, groupAccs);
    }

    let acc = groupAccs.get(columnName);
    if (!acc) {
      acc = new StatAccumulator();
      groupAccs.set(columnName, acc);
    }

    return acc;
  }

  /**
   * Add a value for a specific group and column.
   */
  add(groupKey: string, columnName: string, value: number | null): void {
    if (value !== null && !isNaN(value)) {
      this.getAccumulator(groupKey, columnName).add(value);
    }
  }

  /**
   * Get all group keys.
   */
  getGroups(): string[] {
    return Array.from(this.accumulators.keys());
  }

  /**
   * Get the aggregate value for a group and column.
   */
  getValue(groupKey: string, columnName: string, fn: AggregateFunction): number {
    const acc = this.accumulators.get(groupKey)?.get(columnName);
    if (!acc) {
      return fn === 'count' ? 0 : NaN;
    }
    return acc.getValue(fn);
  }

  /**
   * Get the count for a group (same across all columns).
   */
  getGroupCount(groupKey: string): number {
    const groupAccs = this.accumulators.get(groupKey);
    if (!groupAccs) return 0;

    // Return count from the first column accumulator
    for (const acc of groupAccs.values()) {
      return acc.count;
    }
    return 0;
  }
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
export function createAggregationPlan(
  spec: Record<string, AggregateFunction | AggregateFunction[]>
): AggregationPlan {
  const columns: string[] = [];
  const functions = new Map<string, AggregateFunction[]>();

  for (const [colName, fns] of Object.entries(spec)) {
    const fnArray = Array.isArray(fns) ? fns : [fns];
    columns.push(colName);
    functions.set(colName, fnArray);
  }

  return { columns, functions };
}
