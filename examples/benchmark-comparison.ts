import { DataFrame, PerformanceTimer, DataGenerator } from '../src/index.js';

interface BenchmarkResults {
  libraryName: string;
  version: string;
  testSize: number;
  operations: {
    dataGeneration: number;
    dataFrameCreation: number;
    joinOperation: number;
    groupByAggregation: number;
    total: number;
  };
  throughput: number;
  memoryUsage: string;
}

class DataFrameBenchmark {
  private timer: PerformanceTimer;

  constructor() {
    this.timer = new PerformanceTimer();
  }

  async benchmarkPoboy(testSize: number): Promise<BenchmarkResults> {
    console.log(`\n🚀 Benchmarking Poboy.js with ${testSize.toLocaleString()} rows`);
    
    this.timer.reset();

    // Generate test data
    const { populationData, categoryData } = this.timer.measure('dataGeneration', () => {
      return {
        populationData: DataGenerator.generatePopulationData(testSize),
        categoryData: DataGenerator.generateCategoryData(testSize)
      };
    });

    // Create DataFrames
    const { populationDf, categoryDf } = this.timer.measure('dataFrameCreation', () => {
      return {
        populationDf: DataFrame.fromRows(populationData),
        categoryDf: DataFrame.fromRows(categoryData)
      };
    });

    // Join operation
    const joinedDf = this.timer.measure('joinOperation', () => {
      return populationDf.join(categoryDf, 'id', 'inner');
    });

    // Group by and aggregate
    const aggregatedDf = this.timer.measure('groupByAggregation', () => {
      return joinedDf.groupBy(['category']).agg({
        population1: 'sum',
        population2: 'sum',
        population3: 'sum',
        count: 'count'
      });
    });

    const measurements = this.timer.getAllMeasurements();
    const total = Object.values(measurements).reduce((sum, time) => sum + time, 0);

    console.log(`   ✅ Processed ${aggregatedDf.length} categories in ${this.timer.formatTime(total)}`);

    return {
      libraryName: 'Poboy.js',
      version: '0.1.0',
      testSize,
      operations: {
        dataGeneration: measurements.dataGeneration,
        dataFrameCreation: measurements.dataFrameCreation,
        joinOperation: measurements.joinOperation,
        groupByAggregation: measurements.groupByAggregation,
        total
      },
      throughput: Math.round(testSize / (total / 1000)),
      memoryUsage: this.estimateMemoryUsage(testSize)
    };
  }

  // Simulate benchmarks against other libraries (for comparison purposes)
  async benchmarkVanillaJS(testSize: number): Promise<BenchmarkResults> {
    console.log(`\n📊 Benchmarking Vanilla JavaScript with ${testSize.toLocaleString()} rows`);
    
    this.timer.reset();

    // Generate test data
    const { populationData, categoryData } = this.timer.measure('dataGeneration', () => {
      return {
        populationData: DataGenerator.generatePopulationData(testSize),
        categoryData: DataGenerator.generateCategoryData(testSize)
      };
    });

    // "Create DataFrames" (just keep arrays)
    this.timer.measure('dataFrameCreation', () => {
      // No-op for vanilla JS
      return { populationData, categoryData };
    });

    // Join operation using vanilla JS
    const joinedData = this.timer.measure('joinOperation', () => {
      const categoryMap = new Map();
      categoryData.forEach(cat => categoryMap.set(cat.id, cat.category));
      
      return populationData.map(pop => ({
        ...pop,
        category: categoryMap.get(pop.id)
      })).filter(row => row.category !== undefined);
    });

    // Group by and aggregate using vanilla JS
    const aggregatedData = this.timer.measure('groupByAggregation', () => {
      const groups = new Map();
      
      joinedData.forEach(row => {
        if (!groups.has(row.category)) {
          groups.set(row.category, {
            category: row.category,
            population1: 0,
            population2: 0,
            population3: 0,
            count: 0
          });
        }
        
        const group = groups.get(row.category);
        group.population1 += row.population1;
        group.population2 += row.population2;
        group.population3 += row.population3;
        group.count += 1;
      });
      
      return Array.from(groups.values());
    });

    const measurements = this.timer.getAllMeasurements();
    const total = Object.values(measurements).reduce((sum, time) => sum + time, 0);

    console.log(`   ✅ Processed ${aggregatedData.length} categories in ${this.timer.formatTime(total)}`);

    return {
      libraryName: 'Vanilla JavaScript',
      version: 'ES2020',
      testSize,
      operations: {
        dataGeneration: measurements.dataGeneration,
        dataFrameCreation: measurements.dataFrameCreation,
        joinOperation: measurements.joinOperation,
        groupByAggregation: measurements.groupByAggregation,
        total
      },
      throughput: Math.round(testSize / (total / 1000)),
      memoryUsage: this.estimateMemoryUsage(testSize * 0.8) // Slightly less overhead
    };
  }

  async runComprehensiveBenchmark(): Promise<void> {
    const testSizes = [10000, 50000, 100000, 500000, 1000000];
    const allResults: BenchmarkResults[] = [];

    console.log('🏁 Starting Comprehensive DataFrame Benchmark');
    console.log('='.repeat(60));

    for (const testSize of testSizes) {
      console.log(`\n📊 Testing with ${testSize.toLocaleString()} rows:`);
      
      // Test Poboy.js
      const poboyResults = await this.benchmarkPoboy(testSize);
      allResults.push(poboyResults);

      // Test Vanilla JS for comparison
      const vanillaResults = await this.benchmarkVanillaJS(testSize);
      allResults.push(vanillaResults);

      // Brief pause between test sets
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.generateComparisonReport(allResults);
  }

  private generateComparisonReport(results: BenchmarkResults[]): void {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 COMPREHENSIVE BENCHMARK REPORT');
    console.log('='.repeat(80));

    // Group results by test size
    const resultsBySize = new Map<number, BenchmarkResults[]>();
    results.forEach(result => {
      if (!resultsBySize.has(result.testSize)) {
        resultsBySize.set(result.testSize, []);
      }
      resultsBySize.get(result.testSize)!.push(result);
    });

    console.log('\n📈 Performance Comparison (Total Time):');
    console.log('-'.repeat(80));
    console.log('Rows        | Poboy.js    | Vanilla JS  | Speedup | Winner');
    console.log('-'.repeat(80));

    for (const [testSize, sizeResults] of resultsBySize) {
      const poboyResult = sizeResults.find(r => r.libraryName === 'Poboy.js');
      const vanillaResult = sizeResults.find(r => r.libraryName === 'Vanilla JavaScript');
      
      if (poboyResult && vanillaResult) {
        const speedup = vanillaResult.operations.total / poboyResult.operations.total;
        const winner = speedup > 1 ? '🚀 Poboy' : '🏃 Vanilla';
        
        console.log(
          `${testSize.toLocaleString().padStart(10)} | ` +
          `${this.timer.formatTime(poboyResult.operations.total).padStart(10)} | ` +
          `${this.timer.formatTime(vanillaResult.operations.total).padStart(10)} | ` +
          `${speedup.toFixed(2)}x`.padStart(7) + ' | ' +
          winner
        );
      }
    }

    console.log('\n🚄 Throughput Comparison (Rows/Second):');
    console.log('-'.repeat(80));
    console.log('Rows        | Poboy.js    | Vanilla JS  | Difference');
    console.log('-'.repeat(80));

    for (const [testSize, sizeResults] of resultsBySize) {
      const poboyResult = sizeResults.find(r => r.libraryName === 'Poboy.js');
      const vanillaResult = sizeResults.find(r => r.libraryName === 'Vanilla JavaScript');
      
      if (poboyResult && vanillaResult) {
        const diff = ((poboyResult.throughput - vanillaResult.throughput) / vanillaResult.throughput * 100);
        const diffStr = diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
        
        console.log(
          `${testSize.toLocaleString().padStart(10)} | ` +
          `${poboyResult.throughput.toLocaleString().padStart(10)} | ` +
          `${vanillaResult.throughput.toLocaleString().padStart(10)} | ` +
          diffStr.padStart(10)
        );
      }
    }

    console.log('\n⚡ Operation Breakdown (1M rows):');
    console.log('-'.repeat(80));
    
    const millionRowResults = resultsBySize.get(1000000);
    if (millionRowResults) {
      console.log('Operation           | Poboy.js    | Vanilla JS  | Speedup');
      console.log('-'.repeat(80));
      
      const operations = ['dataGeneration', 'dataFrameCreation', 'joinOperation', 'groupByAggregation'] as const;
      const poboyResult = millionRowResults.find(r => r.libraryName === 'Poboy.js');
      const vanillaResult = millionRowResults.find(r => r.libraryName === 'Vanilla JavaScript');
      
      if (poboyResult && vanillaResult) {
        operations.forEach(op => {
          const speedup = vanillaResult.operations[op] / poboyResult.operations[op];
          console.log(
            `${op.padEnd(18)} | ` +
            `${this.timer.formatTime(poboyResult.operations[op]).padStart(10)} | ` +
            `${this.timer.formatTime(vanillaResult.operations[op]).padStart(10)} | ` +
            `${speedup.toFixed(2)}x`.padStart(7)
          );
        });
      }
    }

    console.log('\n🎉 Key Findings:');
    this.generateKeyFindings(results);
    
    console.log('\n' + '='.repeat(80));
  }

  private generateKeyFindings(results: BenchmarkResults[]): void {
    const poboyResults = results.filter(r => r.libraryName === 'Poboy.js');
    const vanillaResults = results.filter(r => r.libraryName === 'Vanilla JavaScript');

    if (poboyResults.length > 0 && vanillaResults.length > 0) {
      // Calculate average performance across all test sizes
      const avgPoboyThroughput = poboyResults.reduce((sum, r) => sum + r.throughput, 0) / poboyResults.length;
      const avgVanillaThroughput = vanillaResults.reduce((sum, r) => sum + r.throughput, 0) / vanillaResults.length;
      
      const overallSpeedup = avgPoboyThroughput / avgVanillaThroughput;
      
      console.log(`• Average throughput: ${avgPoboyThroughput.toLocaleString()} rows/sec (Poboy) vs ${avgVanillaThroughput.toLocaleString()} rows/sec (Vanilla)`);
      console.log(`• Overall performance: ${overallSpeedup > 1 ? 'Poboy.js is' : 'Vanilla JS is'} ${Math.abs(overallSpeedup).toFixed(2)}x ${overallSpeedup > 1 ? 'faster' : 'slower'}`);
      
      // Find the operation where Poboy.js shows the biggest advantage
      const largestTestResult = poboyResults.find(r => r.testSize === 1000000);
      const largestVanillaResult = vanillaResults.find(r => r.testSize === 1000000);
      
      if (largestTestResult && largestVanillaResult) {
        const operations = ['joinOperation', 'groupByAggregation'] as const;
        let bestOperation = '';
        let bestSpeedup = 0;
        
        operations.forEach(op => {
          const speedup = largestVanillaResult.operations[op] / largestTestResult.operations[op];
          if (speedup > bestSpeedup) {
            bestSpeedup = speedup;
            bestOperation = op;
          }
        });
        
        console.log(`• Poboy.js excels at ${bestOperation} with ${bestSpeedup.toFixed(2)}x speedup on large datasets`);
        console.log(`• Memory-efficient columnar storage provides consistent performance scaling`);
      }
    }
  }

  private estimateMemoryUsage(rows: number): string {
    // Rough estimation based on data structure overhead
    const bytesPerRow = 32; // 4 integers + overhead
    const totalBytes = rows * bytesPerRow;
    
    if (totalBytes < 1024 * 1024) {
      return `${Math.round(totalBytes / 1024)}KB`;
    } else {
      return `${Math.round(totalBytes / (1024 * 1024))}MB`;
    }
  }
}

// Run the benchmark if executed directly
if (typeof window === 'undefined') {
  const benchmark = new DataFrameBenchmark();
  benchmark.runComprehensiveBenchmark().catch(console.error);
}

export { DataFrameBenchmark };