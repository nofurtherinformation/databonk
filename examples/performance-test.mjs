// Performance test using built Databonk.js (ES modules)
import { DataFrame, PerformanceTimer, DataGenerator, MemoryProfiler } from '../dist/index.esm.js';

class PopulationPerformanceTest {
  constructor() {
    this.timer = new PerformanceTimer();
    this.memoryProfiler = new MemoryProfiler();
  }

  async runTest(rowCount = 1000000) {
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
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataGeneration'))}`);

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
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataFrameCreation'))}`);

    // Step 3: Join operation (without pre-built index)
    console.log('3. Performing join operation (no pre-built index)...');
    const joinedDf = this.timer.measure('joinOperation', () => {
      return populationDf.join(categoryDf, 'id', 'inner');
    });

    console.log(`   - Joined DataFrame: ${joinedDf.length.toLocaleString()} x ${joinedDf.columnCount} columns`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('joinOperation'))}`);

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
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('groupByAggregation'))}`);

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

  async runIndexedTest(rowCount = 1000000) {
    console.log(`\n=== Starting INDEXED Performance Test with ${rowCount.toLocaleString()} rows ===`);

    this.timer.reset();
    this.memoryProfiler.start();

    // Step 1: Generate test data
    console.log('1. Generating test data...');
    const { populationData, categoryData } = this.timer.measure('dataGeneration', () => {
      return DataGenerator.generateLargeDataset(rowCount, {
        includeNulls: false,
        skewCategories: true
      });
    });

    console.log(`   - Generated ${populationData.length.toLocaleString()} population rows`);
    console.log(`   - Generated ${categoryData.length.toLocaleString()} category rows`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataGeneration'))}`);

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
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataFrameCreation'))}`);

    // Step 3: Create indices
    console.log('3. Creating hash indices on join columns...');
    this.timer.measure('indexCreation', () => {
      populationDf.createIndex('id', { type: 'hash' });
      categoryDf.createIndex('id', { type: 'hash' });
    });

    console.log(`   - Population indices: ${populationDf.listIndices().join(', ')}`);
    console.log(`   - Category indices: ${categoryDf.listIndices().join(', ')}`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('indexCreation'))}`);

    // Step 4: Join operation (using pre-built index)
    console.log('4. Performing join operation (WITH pre-built index)...');
    const joinedDf = this.timer.measure('joinOperation', () => {
      return populationDf.join(categoryDf, 'id', 'inner', { useIndices: true });
    });

    console.log(`   - Joined DataFrame: ${joinedDf.length.toLocaleString()} x ${joinedDf.columnCount} columns`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('joinOperation'))}`);

    // Step 5: Second join on same index (should be faster - no index rebuild)
    console.log('5. Performing second join on same index...');
    const joinedDf2 = this.timer.measure('joinOperation2', () => {
      return populationDf.join(categoryDf, 'id', 'left', { useIndices: true });
    });

    console.log(`   - Second join DataFrame: ${joinedDf2.length.toLocaleString()} x ${joinedDf2.columnCount} columns`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('joinOperation2'))}`);

    // Step 6: Group by and aggregate
    console.log('6. Performing group-by aggregation...');
    const aggregatedDf = this.timer.measure('groupByAggregation', () => {
      return joinedDf.groupBy(['category']).agg({
        population1: 'sum',
        population2: 'sum',
        population3: 'sum',
        count: 'count'
      });
    });

    console.log(`   - Aggregated DataFrame: ${aggregatedDf.length.toLocaleString()} x ${aggregatedDf.columnCount} columns`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('groupByAggregation'))}`);

    // Calculate totals
    const measurements = this.timer.getAllMeasurements();
    const total = Object.values(measurements).reduce((sum, time) => sum + time, 0);
    const memoryUsed = this.memoryProfiler.end();

    // Get results for verification
    const finalResult = aggregatedDf.toArray().sort((a, b) => a.category.localeCompare(b.category));

    // Print detailed results
    this.printIndexedResults(finalResult, measurements, total, memoryUsed, rowCount);

    return {
      dataGeneration: measurements.dataGeneration,
      dataFrameCreation: measurements.dataFrameCreation,
      indexCreation: measurements.indexCreation,
      joinOperation: measurements.joinOperation,
      joinOperation2: measurements.joinOperation2,
      groupByAggregation: measurements.groupByAggregation,
      total,
      memoryUsed,
      rowCount,
      categoryCount: finalResult.length,
      finalResult
    };
  }

  async runSortMergeTest(rowCount = 1000000) {
    console.log(`\n=== Starting SORT-MERGE Join Test with ${rowCount.toLocaleString()} rows ===`);

    this.timer.reset();
    this.memoryProfiler.start();

    // Step 1: Generate test data
    console.log('1. Generating test data...');
    const { populationData, categoryData } = this.timer.measure('dataGeneration', () => {
      return DataGenerator.generateLargeDataset(rowCount, {
        includeNulls: false,
        skewCategories: true
      });
    });

    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataGeneration'))}`);

    // Step 2: Create DataFrames
    console.log('2. Creating DataFrames...');
    const { populationDf, categoryDf } = this.timer.measure('dataFrameCreation', () => {
      return {
        populationDf: DataFrame.fromRows(populationData),
        categoryDf: DataFrame.fromRows(categoryData)
      };
    });

    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('dataFrameCreation'))}`);

    // Step 3: Create sorted indices
    console.log('3. Creating SORTED indices...');
    this.timer.measure('sortedIndexCreation', () => {
      populationDf.createIndex('id', { type: 'sorted' });
      categoryDf.createIndex('id', { type: 'sorted' });
    });

    console.log(`   - Population index type: ${populationDf.getIndex(['id'])?.data.type}`);
    console.log(`   - Category index type: ${categoryDf.getIndex(['id'])?.data.type}`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('sortedIndexCreation'))}`);

    // Step 4: Hash join for comparison
    console.log('4. Performing HASH join...');
    const hashJoinedDf = this.timer.measure('hashJoin', () => {
      return populationDf.join(categoryDf, 'id', 'inner', { algorithm: 'hash' });
    });

    console.log(`   - Hash join result: ${hashJoinedDf.length.toLocaleString()} rows`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('hashJoin'))}`);

    // Step 5: Sort-merge join
    console.log('5. Performing SORT-MERGE join...');
    const mergeJoinedDf = this.timer.measure('sortMergeJoin', () => {
      return populationDf.join(categoryDf, 'id', 'inner', { algorithm: 'sort-merge' });
    });

    console.log(`   - Sort-merge join result: ${mergeJoinedDf.length.toLocaleString()} rows`);
    console.log(`   - Time: ${this.timer.formatTime(this.timer.getMeasurement('sortMergeJoin'))}`);

    // Calculate totals
    const measurements = this.timer.getAllMeasurements();
    const memoryUsed = this.memoryProfiler.end();

    // Print comparison
    console.log('\n=== Join Algorithm Comparison ===');
    console.log(`  Hash join      : ${this.timer.formatTime(measurements.hashJoin)}`);
    console.log(`  Sort-merge join: ${this.timer.formatTime(measurements.sortMergeJoin)}`);

    const speedup = measurements.hashJoin / measurements.sortMergeJoin;
    if (speedup > 1) {
      console.log(`  Sort-merge is ${speedup.toFixed(2)}x faster`);
    } else {
      console.log(`  Hash join is ${(1/speedup).toFixed(2)}x faster`);
    }

    console.log(`  Memory used: ${memoryUsed}`);
    console.log('================================\n');

    return {
      hashJoin: measurements.hashJoin,
      sortMergeJoin: measurements.sortMergeJoin,
      speedup,
      rowCount
    };
  }

  async runIndexComparisonTest(rowCount = 500000) {
    console.log(`\n=== Index vs No-Index Comparison (${rowCount.toLocaleString()} rows) ===`);

    // Generate data once
    const { populationData, categoryData } = DataGenerator.generateLargeDataset(rowCount, {
      includeNulls: false,
      skewCategories: true
    });

    // Test WITHOUT indices
    console.log('\n--- Without Pre-built Indices ---');
    const dfNoIndex = DataFrame.fromRows(populationData);
    const catNoIndex = DataFrame.fromRows(categoryData);

    this.timer.reset();

    // Multiple joins without index
    const noIndexTimes = [];
    for (let i = 0; i < 3; i++) {
      const time = this.timer.measure(`noIndex_${i}`, () => {
        dfNoIndex.join(catNoIndex, 'id', 'inner', { useIndices: false });
      });
      noIndexTimes.push(this.timer.getMeasurement(`noIndex_${i}`));
      console.log(`  Join ${i + 1}: ${this.timer.formatTime(this.timer.getMeasurement(`noIndex_${i}`))}`);
    }

    // Test WITH indices
    console.log('\n--- With Pre-built Indices ---');
    const dfWithIndex = DataFrame.fromRows(populationData);
    const catWithIndex = DataFrame.fromRows(categoryData);

    // Create indices once
    const indexTime = this.timer.measure('indexCreation', () => {
      dfWithIndex.createIndex('id', { type: 'hash' });
      catWithIndex.createIndex('id', { type: 'hash' });
    });
    console.log(`  Index creation: ${this.timer.formatTime(this.timer.getMeasurement('indexCreation'))}`);

    // Multiple joins with index
    const withIndexTimes = [];
    for (let i = 0; i < 3; i++) {
      const time = this.timer.measure(`withIndex_${i}`, () => {
        dfWithIndex.join(catWithIndex, 'id', 'inner', { useIndices: true });
      });
      withIndexTimes.push(this.timer.getMeasurement(`withIndex_${i}`));
      console.log(`  Join ${i + 1}: ${this.timer.formatTime(this.timer.getMeasurement(`withIndex_${i}`))}`);
    }

    // Summary
    const avgNoIndex = noIndexTimes.reduce((a, b) => a + b, 0) / noIndexTimes.length;
    const avgWithIndex = withIndexTimes.reduce((a, b) => a + b, 0) / withIndexTimes.length;
    const totalNoIndex = noIndexTimes.reduce((a, b) => a + b, 0);
    const totalWithIndex = this.timer.getMeasurement('indexCreation') + withIndexTimes.reduce((a, b) => a + b, 0);

    console.log('\n=== Summary ===');
    console.log(`  Avg join time (no index)  : ${this.timer.formatTime(avgNoIndex)}`);
    console.log(`  Avg join time (with index): ${this.timer.formatTime(avgWithIndex)}`);
    console.log(`  Join speedup with index   : ${(avgNoIndex / avgWithIndex).toFixed(2)}x`);
    console.log(`  Total time (3 joins, no index)  : ${this.timer.formatTime(totalNoIndex)}`);
    console.log(`  Total time (index + 3 joins)    : ${this.timer.formatTime(totalWithIndex)}`);
    console.log(`  Overall speedup: ${(totalNoIndex / totalWithIndex).toFixed(2)}x`);
    console.log('================\n');

    return {
      avgNoIndex,
      avgWithIndex,
      indexCreationTime: this.timer.getMeasurement('indexCreation'),
      joinSpeedup: avgNoIndex / avgWithIndex,
      overallSpeedup: totalNoIndex / totalWithIndex
    };
  }

  printDetailedResults(results, measurements, total, memoryUsed, rowCount) {
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
      console.log(`  ${i + 1}. ${row.category.toUpperCase()}: ${row.population1.toLocaleString()} (${row.count.toLocaleString()} records)`);
    });

    console.log('============================\n');
  }

  printIndexedResults(results, measurements, total, memoryUsed, rowCount) {
    console.log('\n=== Indexed Performance Summary ===');

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
    console.log(`  Index creation      : ${this.timer.formatTime(measurements.indexCreation)}`);
    console.log(`  First join (indexed): ${this.timer.formatTime(measurements.joinOperation)}`);
    console.log(`  Second join (reuse) : ${this.timer.formatTime(measurements.joinOperation2)}`);

    // Calculate join throughput
    const join1Throughput = Math.round(rowCount / (measurements.joinOperation / 1000));
    const join2Throughput = Math.round(rowCount / (measurements.joinOperation2 / 1000));
    console.log(`  Join 1 throughput   : ${join1Throughput.toLocaleString()} rows/sec`);
    console.log(`  Join 2 throughput   : ${join2Throughput.toLocaleString()} rows/sec`);

    // Data summary
    console.log('\nData Summary:');
    console.log(`  Categories found    : ${results.length}`);

    console.log('====================================\n');
  }

  async runBenchmarkSuite() {
    const testSizes = [10000, 50000, 100000, 500000, 1000000];
    const results = [];

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

  printBenchmarkComparison(results) {
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

// Parse command line arguments
const args = process.argv.slice(2);
const testType = args[0] || 'standard';
const rowCount = parseInt(args[1]) || 1000000;

const test = new PopulationPerformanceTest();

// Run appropriate test based on argument
switch (testType) {
  case 'indexed':
    test.runIndexedTest(rowCount).catch(console.error);
    break;
  case 'sortmerge':
    test.runSortMergeTest(rowCount).catch(console.error);
    break;
  case 'comparison':
    test.runIndexComparisonTest(rowCount).catch(console.error);
    break;
  case 'suite':
    test.runBenchmarkSuite().catch(console.error);
    break;
  case 'all':
    (async () => {
      console.log('Running all performance tests...\n');
      await test.runTest(rowCount);
      await test.runIndexedTest(rowCount);
      await test.runSortMergeTest(rowCount);
      await test.runIndexComparisonTest(Math.min(rowCount, 500000));
    })().catch(console.error);
    break;
  default:
    test.runTest(rowCount).catch(console.error);
}
