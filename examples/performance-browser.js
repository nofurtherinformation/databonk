// Browser-compatible performance test using built Databonk.js
import { DataFrame } from '../dist/index.esm.js';

class PerformanceTimer {
    constructor() {
        this.startTime = 0;
        this.measurements = new Map();
    }

    start() {
        this.startTime = performance.now();
    }

    end(label) {
        const endTime = performance.now();
        const duration = endTime - this.startTime;
        this.measurements.set(label, duration);
        return duration;
    }

    measure(label, fn) {
        this.start();
        const result = fn();
        this.end(label);
        return result;
    }

    getMeasurement(label) {
        return this.measurements.get(label);
    }

    getAllMeasurements() {
        return Object.fromEntries(this.measurements);
    }

    formatTime(ms) {
        if (ms < 1) return `${(ms * 1000).toFixed(2)}μs`;
        if (ms < 1000) return `${ms.toFixed(2)}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    }

    reset() {
        this.measurements.clear();
        this.startTime = 0;
    }
}

class DataGenerator {
    static generatePopulationData(count) {
        const data = new Array(count);
        
        for (let i = 0; i < count; i++) {
            data[i] = {
                id: i + 1,
                population1: Math.floor(Math.random() * 99000) + 1000,
                population2: Math.floor(Math.random() * 74500) + 500,
                population3: Math.floor(Math.random() * 49800) + 200
            };
        }
        
        return data;
    }

    static generateCategoryData(populationCount) {
        const categories = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const data = new Array(populationCount);
        
        for (let i = 0; i < populationCount; i++) {
            data[i] = {
                id: i + 1,
                category: categories[i % categories.length]
            };
        }
        
        return data;
    }
}

class MemoryProfiler {
    constructor() {
        this.initialMemory = 0;
    }

    start() {
        if (typeof performance !== 'undefined' && performance.memory) {
            this.initialMemory = performance.memory.usedJSHeapSize;
        }
    }

    getMemoryUsage() {
        if (typeof performance !== 'undefined' && performance.memory) {
            return performance.memory.usedJSHeapSize;
        }
        return 0;
    }

    getCurrentUsage() {
        return this.getMemoryUsage() - this.initialMemory;
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    end() {
        const currentUsage = this.getCurrentUsage();
        return this.formatBytes(currentUsage);
    }
}

export class PopulationPerformanceTest {
    constructor() {
        this.timer = new PerformanceTimer();
        this.memoryProfiler = new MemoryProfiler();
    }

    async runTest(rowCount = 1000000, progressCallback = null) {
        console.log(`Starting Performance Test with ${rowCount.toLocaleString()} rows`);
        
        this.timer.reset();
        this.memoryProfiler.start();

        if (progressCallback) progressCallback(0, 'Starting test...');

        // Step 1: Generate test data
        if (progressCallback) progressCallback(10, 'Generating test data...');
        
        const { populationData, categoryData } = this.timer.measure('dataGeneration', () => {
            return {
                populationData: DataGenerator.generatePopulationData(rowCount),
                categoryData: DataGenerator.generateCategoryData(rowCount)
            };
        });

        console.log(`Generated ${populationData.length.toLocaleString()} population rows`);
        console.log(`Generated ${categoryData.length.toLocaleString()} category rows`);

        // Step 2: Create DataFrames
        if (progressCallback) progressCallback(30, 'Creating DataFrames...');
        
        const { populationDf, categoryDf } = this.timer.measure('dataFrameCreation', () => {
            return {
                populationDf: DataFrame.fromRows(populationData),
                categoryDf: DataFrame.fromRows(categoryData)
            };
        });

        console.log(`Population DataFrame: ${populationDf.length.toLocaleString()} x ${populationDf.columnCount}`);
        console.log(`Category DataFrame: ${categoryDf.length.toLocaleString()} x ${categoryDf.columnCount}`);

        // Step 3: Join operation
        if (progressCallback) progressCallback(60, 'Performing join operation...');
        
        const joinedDf = this.timer.measure('joinOperation', () => {
            return populationDf.join(categoryDf, 'id', 'inner');
        });

        console.log(`Joined DataFrame: ${joinedDf.length.toLocaleString()} x ${joinedDf.columnCount}`);

        // Step 4: Group by and aggregate
        if (progressCallback) progressCallback(85, 'Performing group-by aggregation...');
        
        const aggregatedDf = this.timer.measure('groupByAggregation', () => {
            return joinedDf.groupBy(['category']).agg({
                population1: 'sum',
                population2: 'sum',
                population3: 'sum',
                count: 'count'
            });
        });

        console.log(`Aggregated DataFrame: ${aggregatedDf.length.toLocaleString()} x ${aggregatedDf.columnCount}`);

        if (progressCallback) progressCallback(100, 'Complete!');

        // Calculate results
        const measurements = this.timer.getAllMeasurements();
        const total = Object.values(measurements).reduce((sum, time) => sum + time, 0);
        const memoryUsed = this.memoryProfiler.end();
        const finalResult = aggregatedDf.toArray().sort((a, b) => a.category.localeCompare(b.category));

        // Print summary
        this.printSummary(measurements, total, memoryUsed, rowCount, finalResult);

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

    printSummary(measurements, total, memoryUsed, rowCount, results) {
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

        console.log('============================\n');
    }

    async runBenchmarkSuite(progressCallback = null) {
        const testSizes = [10000, 50000, 100000, 500000, 1000000];
        const results = [];

        console.log('=== Running Benchmark Suite ===');
        
        for (let i = 0; i < testSizes.length; i++) {
            const size = testSizes[i];
            console.log(`\n--- Testing with ${size.toLocaleString()} rows ---`);
            
            try {
                const result = await this.runTest(size, (progress, message) => {
                    const overallProgress = ((i / testSizes.length) + (progress / 100 / testSizes.length)) * 100;
                    if (progressCallback) {
                        progressCallback(overallProgress, `Test ${i + 1}/${testSizes.length}: ${message}`);
                    }
                });
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

// Make it available globally for the HTML page
window.PopulationPerformanceTest = PopulationPerformanceTest;
window.PerformanceTimer = PerformanceTimer;
window.DataGenerator = DataGenerator;
window.MemoryProfiler = MemoryProfiler;