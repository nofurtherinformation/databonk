import { DataFrame } from '../src/index.js';
import { PerformanceTimer, DataGenerator, MemoryProfiler } from '../src/utils/performance.js';

export interface PerformanceTestResult {
  dataGeneration: number;
  dataFrameCreation: number;
  joinOperation: number;
  groupByAggregation: number;
  total: number;
  memoryUsed: string;
  rowCount: number;
  categoryCount: number;
  finalResult: any[];
}

export class PopulationPerformanceTest {
  private timer: PerformanceTimer;
  private memoryProfiler: MemoryProfiler;

  constructor() {
    this.timer = new PerformanceTimer();
    this.memoryProfiler = new MemoryProfiler();
  }

  async runTest(rowCount: number = 1000000): Promise<PerformanceTestResult> {
    console.log(`\n=== Starting Performance Test with ${rowCount.toLocaleString()} rows ===`);
    
    this.timer.reset();
    this.memoryProfiler.start();

    // Step 1: Generate test data
    console.log('1. Generating test data...');
    const { populationData, categoryData } = this.timer.measure('dataGeneration', () => {
      return DataGenerator.generateLargeDataset(rowCount, {
        includeNulls: false,
        skewCategories: true // This makes the test more realistic
      });
    });

    console.log(`   - Generated ${populationData.length.toLocaleString()} population rows`);
    console.log(`   - Generated ${categoryData.length.toLocaleString()} category rows`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataGeneration')!)}`);

    // Step 2: Create DataFrames
    console.log('2. Creating DataFrames...');
    const { populationDf, categoryDf } = this.timer.measure('dataFrameCreation', () => {
      return {
        populationDf: DataFrame.fromRows(populationData),
        categoryDf: DataFrame.fromRows(categoryData)
      };
    });

    console.log(`   - Population DataFrame: ${populationDf.length.toLocaleString()} x ${populationDf.columnCount} columns`);
    console.log(`   - Category DataFrame: ${categoryDf.length.toLocaleString()} x ${categoryDf.columnCount} columns`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataFrameCreation')!)}`);

    // Step 3: Join operation
    console.log('3. Performing join operation...');
    const joinedDf = this.timer.measure('joinOperation', () => {
      return populationDf.join(categoryDf, 'id', 'inner');
    });

    console.log(`   - Joined DataFrame: ${joinedDf.length.toLocaleString()} x ${joinedDf.columnCount} columns`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('joinOperation')!)}`);

    // Step 4: Group by and aggregate
    console.log('4. Performing group-by aggregation...');
    const aggregatedDf = this.timer.measure('groupByAggregation', () => {
      return joinedDf.groupBy(['category']).agg({
        population1: 'sum',
        population2: 'sum',
        population3: 'sum',
        count: 'count'
      });
    });

    console.log(`   - Aggregated DataFrame: ${aggregatedDf.length.toLocaleString()} x ${aggregatedDf.columnCount} columns`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('groupByAggregation')!)}`);

    // Calculate totals
    const measurements = this.timer.getAllMeasurements();
    const total = Object.values(measurements).reduce((sum, time) => sum + time, 0);
    const memoryUsed = this.memoryProfiler.end();

    // Get results for verification
    const finalResult = aggregatedDf.toArray().sort((a, b) => a.category.localeCompare(b.category));

    // Print detailed results
    this.printDetailedResults(finalResult, measurements, total, memoryUsed, rowCount);

    return {
      dataGeneration: measurements.dataGeneration,
      dataFrameCreation: measurements.dataFrameCreation,
      joinOperation: measurements.joinOperation,
      groupByAggregation: measurements.groupByAggregation,
      total,
      memoryUsed,
      rowCount,
      categoryCount: finalResult.length,
      finalResult
    };
  }

  private printDetailedResults(
    results: any[],
    measurements: Record<string, number>,
    total: number,
    memoryUsed: string,
    rowCount: number
  ): void {
    console.log('\n=== Performance Summary ===');
    
    // Timing results
    console.log('Timing Results:');
    Object.entries(measurements).forEach(([step, time]) => {
      const percentage = (time / total) * 100;
      console.log(`  ${step.padEnd(20)}: ${this.timer.formatTime(time).padStart(10)} (${percentage.toFixed(1)}%)`);
    });
    console.log(`  ${'Total'.padEnd(20)}: ${this.timer.formatTime(total).padStart(10)}`);
    
    // Performance metrics
    console.log('\nPerformance Metrics:');
    console.log(`  Rows processed      : ${rowCount.toLocaleString()}`);
    console.log(`  Memory used         : ${memoryUsed}`);
    console.log(`  Rows per second     : ${Math.round(rowCount / (total / 1000)).toLocaleString()}`);
    console.log(`  Join throughput     : ${Math.round(rowCount / (measurements.joinOperation / 1000)).toLocaleString()} rows/sec`);
    console.log(`  Aggregation speed   : ${Math.round(rowCount / (measurements.groupByAggregation / 1000)).toLocaleString()} rows/sec`);

    // Data summary
    console.log('\nData Summary:');
    console.log(`  Categories found    : ${results.length}`);
    
    const totalPop1 = results.reduce((sum, row) => sum + row.population1, 0);
    const totalPop2 = results.reduce((sum, row) => sum + row.population2, 0);
    const totalPop3 = results.reduce((sum, row) => sum + row.population3, 0);
    const totalCount = results.reduce((sum, row) => sum + row.count, 0);
    
    console.log(`  Total population1   : ${totalPop1.toLocaleString()}`);
    console.log(`  Total population2   : ${totalPop2.toLocaleString()}`);
    console.log(`  Total population3   : ${totalPop3.toLocaleString()}`);
    console.log(`  Total records       : ${totalCount.toLocaleString()}`);

    // Top 5 categories by population1
    console.log('\nTop 5 Categories by Population1:');
    const top5 = [...results]
      .sort((a, b) => b.population1 - a.population1)
      .slice(0, 5);
    
    top5.forEach((row, i) => {
      console.log(`  ${i + 1}. ${row.category}: ${row.population1.toLocaleString()} (${row.count.toLocaleString()} records)`);
    });

    console.log('============================\n');
  }

  // Method to run multiple test sizes for comparison
  async runBenchmarkSuite(): Promise<PerformanceTestResult[]> {
    const testSizes = [10000, 50000, 100000, 500000, 1000000];
    const results: PerformanceTestResult[] = [];

    console.log('=== Running Benchmark Suite ===');
    
    for (const size of testSizes) {
      console.log(`\n--- Testing with ${size.toLocaleString()} rows ---`);
      try {
        const result = await this.runTest(size);
        results.push(result);
        
        // Brief pause between tests
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error testing ${size} rows:`, error);
      }
    }

    this.printBenchmarkComparison(results);
    return results;
  }

  private printBenchmarkComparison(results: PerformanceTestResult[]): void {
    console.log('\n=== Benchmark Comparison ===');
    console.log('Rows        | Data Gen  | DataFrame | Join      | GroupBy   | Total     | Rows/sec');
    console.log('------------|-----------|-----------|-----------|-----------|-----------|----------');
    
    results.forEach(result => {
      const rowsPerSec = Math.round(result.rowCount / (result.total / 1000));
      console.log(
        `${result.rowCount.toLocaleString().padStart(10)} | ` +
        `${this.timer.formatTime(result.dataGeneration).padStart(9)} | ` +
        `${this.timer.formatTime(result.dataFrameCreation).padStart(9)} | ` +
        `${this.timer.formatTime(result.joinOperation).padStart(9)} | ` +
        `${this.timer.formatTime(result.groupByAggregation).padStart(9)} | ` +
        `${this.timer.formatTime(result.total).padStart(9)} | ` +
        `${rowsPerSec.toLocaleString().padStart(9)}`
      );
    });
    
    console.log('================================\n');
  }
}

// Export for use in browser or Node.js
if (typeof window === 'undefined') {
  // Node.js environment - run test if this file is executed directly
  const test = new PopulationPerformanceTest();
  test.runTest(1000000).catch(console.error);
}