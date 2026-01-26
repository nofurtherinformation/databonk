/**
 * Million-row benchmark for Databonk
 *
 * Tests performance of:
 * - DataFrame creation
 * - SIMD aggregations
 * - GroupBy operations
 * - Hash joins
 */

interface BenchmarkResult {
  name: string;
  rows: number;
  timeMs: number;
  rowsPerSecond: number;
}

const results: BenchmarkResult[] = [];

function benchmark(name: string, rows: number, fn: () => void): void {
  // Warm up
  for (let i = 0; i < 3; i++) {
    fn();
  }

  // Benchmark
  const iterations = 10;
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  }

  // Calculate median
  times.sort((a, b) => a - b);
  const median = times[Math.floor(times.length / 2)];

  results.push({
    name,
    rows,
    timeMs: median,
    rowsPerSecond: rows / (median / 1000),
  });

  console.log(`${name}: ${median.toFixed(2)}ms (${(rows / (median / 1000)).toExponential(2)} rows/s)`);
}

function generateData(rowCount: number) {
  // Generate random population data
  const ids = new Int32Array(rowCount);
  const pop1 = new Float32Array(rowCount);
  const pop2 = new Float32Array(rowCount);
  const pop3 = new Float32Array(rowCount);
  const pop4 = new Float32Array(rowCount);
  const pop5 = new Float32Array(rowCount);
  const zones = new Int32Array(rowCount);

  for (let i = 0; i < rowCount; i++) {
    ids[i] = i;
    pop1[i] = Math.random() * 1000;
    pop2[i] = Math.random() * 1000;
    pop3[i] = Math.random() * 1000;
    pop4[i] = Math.random() * 1000;
    pop5[i] = Math.random() * 1000;
    zones[i] = Math.floor(Math.random() * 5); // Zone 0-4
  }

  return { ids, pop1, pop2, pop3, pop4, pop5, zones };
}

async function runBenchmarks() {
  console.log('='.repeat(60));
  console.log('Databonk Million-Row Benchmark');
  console.log('='.repeat(60));

  const ROW_COUNT = 1_000_000;
  console.log(`\nGenerating ${ROW_COUNT.toLocaleString()} rows of test data...`);

  const data = generateData(ROW_COUNT);
  console.log(`Data generation complete.\n`);
  console.log('Memory usage:');
  console.log(`  - IDs: ${(data.ids.byteLength / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  - 5 Float32 columns: ${(5 * data.pop1.byteLength / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  - Zones: ${(data.zones.byteLength / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  - Total: ${((data.ids.byteLength + 5 * data.pop1.byteLength + data.zones.byteLength) / 1024 / 1024).toFixed(2)} MB\n`);

  // ==========================================================================
  // Aggregation benchmarks (pure JS baseline)
  // ==========================================================================

  console.log('-'.repeat(60));
  console.log('Aggregation Benchmarks (JS baseline)');
  console.log('-'.repeat(60));

  benchmark('Sum (JS reduce)', ROW_COUNT, () => {
    data.pop1.reduce((a, b) => a + b, 0);
  });

  benchmark('Sum (JS for loop)', ROW_COUNT, () => {
    let sum = 0;
    for (let i = 0; i < data.pop1.length; i++) {
      sum += data.pop1[i];
    }
    return sum;
  });

  benchmark('Min (JS)', ROW_COUNT, () => {
    let min = Infinity;
    for (let i = 0; i < data.pop1.length; i++) {
      if (data.pop1[i] < min) min = data.pop1[i];
    }
    return min;
  });

  benchmark('Max (JS)', ROW_COUNT, () => {
    let max = -Infinity;
    for (let i = 0; i < data.pop1.length; i++) {
      if (data.pop1[i] > max) max = data.pop1[i];
    }
    return max;
  });

  benchmark('Mean (JS)', ROW_COUNT, () => {
    let sum = 0;
    for (let i = 0; i < data.pop1.length; i++) {
      sum += data.pop1[i];
    }
    return sum / data.pop1.length;
  });

  // ==========================================================================
  // Column arithmetic benchmarks
  // ==========================================================================

  console.log('\n' + '-'.repeat(60));
  console.log('Column Arithmetic Benchmarks (JS baseline)');
  console.log('-'.repeat(60));

  const resultBuffer = new Float32Array(ROW_COUNT);

  benchmark('Column Add (JS)', ROW_COUNT, () => {
    for (let i = 0; i < ROW_COUNT; i++) {
      resultBuffer[i] = data.pop1[i] + data.pop2[i];
    }
  });

  benchmark('Scalar Multiply (JS)', ROW_COUNT, () => {
    const scalar = 2.5;
    for (let i = 0; i < ROW_COUNT; i++) {
      resultBuffer[i] = data.pop1[i] * scalar;
    }
  });

  // ==========================================================================
  // GroupBy benchmarks
  // ==========================================================================

  console.log('\n' + '-'.repeat(60));
  console.log('GroupBy Benchmarks (JS baseline)');
  console.log('-'.repeat(60));

  benchmark('GroupBy Sum (JS Map)', ROW_COUNT, () => {
    const groups = new Map<number, number>();
    for (let i = 0; i < ROW_COUNT; i++) {
      const key = data.zones[i];
      groups.set(key, (groups.get(key) || 0) + data.pop1[i]);
    }
    return groups;
  });

  benchmark('GroupBy Sum (JS Array - optimized for small keys)', ROW_COUNT, () => {
    const sums = new Float64Array(5); // 5 zones
    for (let i = 0; i < ROW_COUNT; i++) {
      sums[data.zones[i]] += data.pop1[i];
    }
    return sums;
  });

  benchmark('GroupBy Sum - 5 columns (JS Array)', ROW_COUNT, () => {
    const sums1 = new Float64Array(5);
    const sums2 = new Float64Array(5);
    const sums3 = new Float64Array(5);
    const sums4 = new Float64Array(5);
    const sums5 = new Float64Array(5);

    for (let i = 0; i < ROW_COUNT; i++) {
      const z = data.zones[i];
      sums1[z] += data.pop1[i];
      sums2[z] += data.pop2[i];
      sums3[z] += data.pop3[i];
      sums4[z] += data.pop4[i];
      sums5[z] += data.pop5[i];
    }
    return [sums1, sums2, sums3, sums4, sums5];
  });

  // ==========================================================================
  // Join benchmarks
  // ==========================================================================

  console.log('\n' + '-'.repeat(60));
  console.log('Join Benchmarks (JS baseline)');
  console.log('-'.repeat(60));

  // Create zone lookup table (smaller table for join)
  const zoneIds = new Int32Array(ROW_COUNT);
  const zoneAssignments = new Int32Array(ROW_COUNT);
  for (let i = 0; i < ROW_COUNT; i++) {
    zoneIds[i] = i;
    zoneAssignments[i] = Math.floor(Math.random() * 5);
  }

  benchmark('Hash Join Build (JS Map)', ROW_COUNT, () => {
    const hashTable = new Map<number, number>();
    for (let i = 0; i < ROW_COUNT; i++) {
      hashTable.set(zoneIds[i], i);
    }
    return hashTable;
  });

  benchmark('Hash Join Full (JS)', ROW_COUNT, () => {
    // Build phase
    const hashTable = new Map<number, number>();
    for (let i = 0; i < ROW_COUNT; i++) {
      hashTable.set(zoneIds[i], i);
    }

    // Probe phase
    let matchCount = 0;
    for (let i = 0; i < ROW_COUNT; i++) {
      if (hashTable.has(data.ids[i])) {
        matchCount++;
      }
    }
    return matchCount;
  });

  // ==========================================================================
  // Full pipeline benchmark
  // ==========================================================================

  console.log('\n' + '-'.repeat(60));
  console.log('Full Pipeline Benchmark (JS baseline)');
  console.log('-'.repeat(60));

  benchmark('Join + GroupBy + Sum 5 cols (JS)', ROW_COUNT, () => {
    // Build hash table for zone lookup
    const zoneMap = new Map<number, number>();
    for (let i = 0; i < ROW_COUNT; i++) {
      zoneMap.set(zoneIds[i], zoneAssignments[i]);
    }

    // Join and aggregate in one pass
    const sums1 = new Float64Array(5);
    const sums2 = new Float64Array(5);
    const sums3 = new Float64Array(5);
    const sums4 = new Float64Array(5);
    const sums5 = new Float64Array(5);

    for (let i = 0; i < ROW_COUNT; i++) {
      const id = data.ids[i];
      if (zoneMap.has(id)) {
        const zone = zoneMap.get(id)!;
        sums1[zone] += data.pop1[i];
        sums2[zone] += data.pop2[i];
        sums3[zone] += data.pop3[i];
        sums4[zone] += data.pop4[i];
        sums5[zone] += data.pop5[i];
      }
    }

    return { sums1, sums2, sums3, sums4, sums5 };
  });

  // ==========================================================================
  // Results summary
  // ==========================================================================

  console.log('\n' + '='.repeat(60));
  console.log('Results Summary');
  console.log('='.repeat(60));

  console.log('\n| Benchmark | Time (ms) | Throughput |');
  console.log('|-----------|-----------|------------|');

  for (const r of results) {
    const throughput = r.rowsPerSecond > 1e9
      ? `${(r.rowsPerSecond / 1e9).toFixed(2)}B/s`
      : r.rowsPerSecond > 1e6
        ? `${(r.rowsPerSecond / 1e6).toFixed(2)}M/s`
        : `${(r.rowsPerSecond / 1e3).toFixed(2)}K/s`;

    console.log(`| ${r.name.padEnd(30)} | ${r.timeMs.toFixed(2).padStart(9)} | ${throughput.padStart(10)} |`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Benchmark complete!');
  console.log('='.repeat(60));
}

// Run benchmarks
runBenchmarks().catch(console.error);
