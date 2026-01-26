# Databonk Examples

Detailed code examples for common use cases with Databonk.

## Table of Contents

- [Basic DataFrame Operations](#basic-dataframe-operations)
- [Aggregating Large Datasets](#aggregating-large-datasets)
- [Zero-Copy Column Access](#zero-copy-column-access)
- [Inner Joins](#inner-joins)
- [GroupBy Aggregations](#groupby-aggregations)
- [Memory Cleanup Patterns](#memory-cleanup-patterns)
- [Column Arithmetic Pipelines](#column-arithmetic-pipelines)
- [Using SharedArrayBuffer](#using-sharedarraybuffer)
- [Performance Optimization Tips](#performance-optimization-tips)

---

## Basic DataFrame Operations

### Creating a DataFrame

```typescript
import { loadDatabonk, DatabonkDataFrame } from 'databonk';

async function basicExample() {
  // Load the WASM module
  const module = await loadDatabonk();

  // Create DataFrame from typed arrays
  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
    { name: 'name_code', data: new Int32Array([101, 102, 103, 104, 105]) },
    { name: 'value', data: new Float32Array([10.5, 20.5, 30.5, 40.5, 50.5]) },
    { name: 'weight', data: new Float64Array([0.1, 0.2, 0.3, 0.4, 0.5]) },
  ]);

  // Inspect DataFrame properties
  console.log('Row count:', df.rowCount);       // 5
  console.log('Column count:', df.columnCount); // 4
  console.log('Columns:', df.columns);          // ['id', 'name_code', 'value', 'weight']

  // Check column existence
  console.log('Has "value":', df.hasColumn('value'));     // true
  console.log('Has "missing":', df.hasColumn('missing')); // false

  // Clean up
  df.free();
}
```

### Basic Aggregations

```typescript
async function aggregationExample() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'value', data: new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) }
  ]);

  // All aggregation methods
  const sum = df.sum('value');     // 55
  const mean = df.mean('value');   // 5.5
  const min = df.min('value');     // 1
  const max = df.max('value');     // 10
  const count = df.count('value'); // 10

  console.log(`Sum: ${sum}, Mean: ${mean}, Min: ${min}, Max: ${max}, Count: ${count}`);

  df.free();
}
```

---

## Aggregating Large Datasets

### Million-Row Performance

```typescript
async function millionRowExample() {
  const module = await loadDatabonk();

  // Generate 1 million rows
  const rowCount = 1_000_000;
  const values = new Float32Array(rowCount);
  for (let i = 0; i < rowCount; i++) {
    values[i] = Math.random() * 1000;
  }

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'value', data: values }
  ]);

  // SIMD-accelerated aggregations (14x faster than JS)
  console.time('WASM Sum');
  const sum = df.sum('value');
  console.timeEnd('WASM Sum');  // ~0.3ms

  console.time('WASM Min');
  const min = df.min('value');
  console.timeEnd('WASM Min');  // ~0.4ms

  console.time('WASM Max');
  const max = df.max('value');
  console.timeEnd('WASM Max');  // ~0.4ms

  console.log(`Sum: ${sum.toFixed(2)}, Min: ${min.toFixed(2)}, Max: ${max.toFixed(2)}`);

  df.free();
}
```

### Comparing WASM vs JavaScript

```typescript
async function benchmarkComparison() {
  const module = await loadDatabonk();
  const rowCount = 1_000_000;
  const values = new Float32Array(rowCount);
  for (let i = 0; i < rowCount; i++) {
    values[i] = Math.random() * 1000;
  }

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'value', data: values }
  ]);

  // WASM SIMD sum
  console.time('WASM SIMD');
  const wasmSum = df.sum('value');
  console.timeEnd('WASM SIMD');

  // JavaScript baseline
  console.time('JavaScript');
  let jsSum = 0;
  for (let i = 0; i < values.length; i++) {
    jsSum += values[i];
  }
  console.timeEnd('JavaScript');

  console.log('Results match:', Math.abs(wasmSum - jsSum) < 1);

  df.free();
}
```

---

## Zero-Copy Column Access

### Reading Column Data

```typescript
async function columnAccessExample() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
    { name: 'score', data: new Float32Array([85.5, 92.0, 78.5, 95.0, 88.0]) }
  ]);

  // Get zero-copy view
  const scoreView = df.getColumnView('score');

  if (scoreView) {
    // Individual access
    console.log('First score:', scoreView.get(0));   // 85.5
    console.log('Last score:', scoreView.get(4));    // 88.0

    // Iteration
    console.log('All scores:');
    for (const score of scoreView) {
      console.log(`  ${score}`);
    }

    // Convert to array (copies data)
    const scoresArray = scoreView.toArray();
    console.log('As array:', scoresArray);

    // Slice (copies subset)
    const middleScores = scoreView.slice(1, 4);
    console.log('Middle scores:', middleScores);  // Float32Array [92, 78.5, 95]
  }

  df.free();
}
```

### Modifying Column Data In-Place

```typescript
async function modifyColumnExample() {
  // Enable shared memory for direct modifications
  const module = await loadDatabonk({ sharedMemory: true });

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'value', data: new Float32Array([1, 2, 3, 4, 5]) }
  ]);

  const view = df.getColumnView('value');
  if (view && view.isShared) {
    // Directly modify WASM memory
    view.set(0, 100);  // Change first value
    view.set(4, 500);  // Change last value

    // Verify changes
    console.log('Modified:', [...view]);  // [100, 2, 3, 4, 500]
    console.log('Sum:', df.sum('value')); // 609
  }

  df.free();
}
```

---

## Inner Joins

### Basic Join

```typescript
async function basicJoinExample() {
  const module = await loadDatabonk();

  // Orders table
  const orders = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'order_id', data: new Int32Array([1, 2, 3, 4, 5]) },
    { name: 'customer_id', data: new Int32Array([101, 102, 101, 103, 102]) },
    { name: 'amount', data: new Float32Array([50.00, 75.50, 100.00, 25.00, 80.00]) }
  ]);

  // Customers table
  const customers = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'id', data: new Int32Array([101, 102, 104]) },
    { name: 'tier', data: new Int32Array([1, 2, 1]) }  // 1=Silver, 2=Gold
  ]);

  // Inner join - only matching rows
  const joined = orders.innerJoin(customers, 'customer_id', 'id');

  console.log('Joined rows:', joined.rowCount);  // 4 (orders 1,2,3,5 match)
  console.log('Columns:', joined.columns);       // ['order_id', 'customer_id', 'amount', 'tier']

  // Customer 103 has no match in customers table
  // Customer 104 has no orders

  // Analyze by tier
  const totalAmount = joined.sum('amount');
  console.log('Total matched amount:', totalAmount);

  // Clean up all DataFrames
  orders.free();
  customers.free();
  joined.free();
}
```

### Join with Subsequent Aggregation

```typescript
async function joinAndAggregateExample() {
  const module = await loadDatabonk();

  const sales = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'product_id', data: new Int32Array([1, 1, 2, 2, 3, 3, 3]) },
    { name: 'quantity', data: new Int32Array([10, 15, 5, 8, 20, 12, 8]) }
  ]);

  const products = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'id', data: new Int32Array([1, 2, 3]) },
    { name: 'category', data: new Int32Array([0, 0, 1]) }  // 0=Electronics, 1=Clothing
  ]);

  // Join to get category for each sale
  const joined = sales.innerJoin(products, 'product_id', 'id');

  // Sum quantity by category
  const byCategory = joined.groupBy('category', 10).sum('quantity');

  console.log('Sales by category:');
  const catView = byCategory.getColumnView('category');
  const qtyView = byCategory.getColumnView('quantity');

  if (catView && qtyView) {
    for (let i = 0; i < byCategory.rowCount; i++) {
      const category = catView.get(i) === 0 ? 'Electronics' : 'Clothing';
      console.log(`  ${category}: ${qtyView.get(i)} units`);
    }
  }

  sales.free();
  products.free();
  joined.free();
  byCategory.free();
}
```

---

## GroupBy Aggregations

### Sum by Category

```typescript
async function groupBySumExample() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'region', data: new Int32Array([0, 0, 1, 1, 2, 2, 2, 0]) },
    { name: 'sales', data: new Float32Array([100, 150, 200, 250, 50, 75, 125, 175]) }
  ]);

  // Group by region, sum sales
  const grouped = df.groupBy('region', 10).sum('sales');

  console.log('Sales by region:');
  const regionView = grouped.getColumnView('region');
  const salesView = grouped.getColumnView('sales');

  if (regionView && salesView) {
    const regionNames = ['North', 'South', 'West'];
    for (let i = 0; i < grouped.rowCount; i++) {
      const regionIdx = regionView.get(i);
      console.log(`  ${regionNames[regionIdx]}: $${salesView.get(i)}`);
    }
  }

  df.free();
  grouped.free();
}
```

### Mean by Category

```typescript
async function groupByMeanExample() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'department', data: new Int32Array([0, 0, 0, 1, 1, 2, 2, 2, 2]) },
    { name: 'salary', data: new Float32Array([50000, 55000, 60000, 70000, 75000, 40000, 45000, 42000, 48000]) }
  ]);

  // Average salary by department
  const avgSalary = df.groupBy('department', 10).mean('salary');

  console.log('Average salary by department:');
  const deptView = avgSalary.getColumnView('department');
  const salaryView = avgSalary.getColumnView('salary');

  if (deptView && salaryView) {
    const depts = ['Engineering', 'Sales', 'Support'];
    for (let i = 0; i < avgSalary.rowCount; i++) {
      const deptIdx = deptView.get(i);
      console.log(`  ${depts[deptIdx]}: $${salaryView.get(i).toFixed(0)}`);
    }
  }

  df.free();
  avgSalary.free();
}
```

---

## Memory Cleanup Patterns

### Basic Cleanup

```typescript
async function basicCleanup() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'value', data: new Float32Array([1, 2, 3]) }
  ]);

  try {
    // Use DataFrame
    const sum = df.sum('value');
    console.log('Sum:', sum);
  } finally {
    // Always clean up
    df.free();
  }
}
```

### Multiple DataFrames

```typescript
async function multipleDataFrameCleanup() {
  const module = await loadDatabonk();
  const dataframes: DatabonkDataFrame[] = [];

  try {
    // Create multiple DataFrames
    const df1 = await DatabonkDataFrame.fromTypedArrays(module, [
      { name: 'a', data: new Float32Array([1, 2, 3]) }
    ]);
    dataframes.push(df1);

    const df2 = await DatabonkDataFrame.fromTypedArrays(module, [
      { name: 'b', data: new Float32Array([4, 5, 6]) }
    ]);
    dataframes.push(df2);

    // Operations that create new DataFrames
    const joined = df1.innerJoin(df2, 'a', 'b');
    dataframes.push(joined);

    // Use results...
    console.log('Joined rows:', joined.rowCount);
  } finally {
    // Clean up all DataFrames in reverse order
    for (let i = dataframes.length - 1; i >= 0; i--) {
      dataframes[i].free();
    }
  }
}
```

### Pipeline Cleanup Pattern

```typescript
async function pipelineCleanup() {
  const module = await loadDatabonk();

  const source = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'category', data: new Int32Array([0, 0, 1, 1, 2]) },
    { name: 'value', data: new Float32Array([10, 20, 30, 40, 50]) }
  ]);

  let intermediate: DatabonkDataFrame | null = null;

  try {
    // Pipeline: group -> aggregate
    intermediate = source.groupBy('category', 10).sum('value');

    // Final result
    const totalSum = intermediate.sum('value');
    console.log('Total:', totalSum);

    return totalSum;
  } finally {
    // Clean up in order
    intermediate?.free();
    source.free();
  }
}
```

---

## Column Arithmetic Pipelines

### Building Computed Columns

```typescript
async function computedColumnsExample() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'price', data: new Float32Array([100, 200, 150, 300, 250]) },
    { name: 'quantity', data: new Float32Array([2, 1, 3, 1, 2]) },
    { name: 'discount', data: new Float32Array([10, 0, 15, 25, 5]) }
  ]);

  // Build pipeline with chaining
  df.scalarMul('price', 1.0, 'unit_price')           // Copy price
    .add('price', 'discount', 'price_before')        // price + discount (undo discount)
    .scalarMul('quantity', 1.0, 'qty_copy')          // Copy quantity
    .scalarMul('price', 0.1, 'tax')                  // 10% tax
    .add('price', 'tax', 'price_with_tax');          // Final price

  console.log('Columns:', df.columns);
  // ['price', 'quantity', 'discount', 'unit_price', 'price_before', 'qty_copy', 'tax', 'price_with_tax']

  // Aggregate computed column
  const totalWithTax = df.sum('price_with_tax');
  console.log('Total with tax:', totalWithTax);

  df.free();
}
```

### Financial Calculations

```typescript
async function financialExample() {
  const module = await loadDatabonk();

  const portfolio = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'shares', data: new Float32Array([100, 50, 200, 75]) },
    { name: 'buy_price', data: new Float32Array([45.00, 120.50, 22.75, 88.00]) },
    { name: 'current_price', data: new Float32Array([52.00, 115.00, 28.50, 95.50]) }
  ]);

  // Calculate profit/loss
  portfolio
    .sub('current_price', 'buy_price', 'price_change')      // Change per share
    .scalarMul('shares', 1.0, 'shares_held')                // Copy shares
    .add('price_change', 'shares', 'total_change');         // Note: need element-wise multiply

  // For proper calculation, we'd need element-wise multiply
  // This example shows the API patterns

  const priceChangeView = portfolio.getColumnView('price_change');
  if (priceChangeView) {
    console.log('Price changes per share:', [...priceChangeView]);
  }

  portfolio.free();
}
```

---

## Using SharedArrayBuffer

### Web Worker Communication

```typescript
// main.ts
async function sharedMemoryExample() {
  // Check support first
  const { isSharedArrayBufferSupported, loadDatabonk, DatabonkDataFrame } = await import('databonk');

  if (!isSharedArrayBufferSupported()) {
    console.log('SharedArrayBuffer not supported');
    return;
  }

  // Load with shared memory enabled
  const module = await loadDatabonk({ sharedMemory: true });

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'value', data: new Float32Array([1, 2, 3, 4, 5]) }
  ]);

  const view = df.getColumnView('value');
  if (view && view.isShared) {
    console.log('Using SharedArrayBuffer');
    console.log('Data buffer:', view.data.buffer);

    // Can pass view.data.buffer to Web Worker
    // Worker can read/write directly without copying
  }

  df.free();
}
```

### Checking Shared Memory Status

```typescript
async function checkSharedMemory() {
  const module = await loadDatabonk({ sharedMemory: true });

  console.log('Module using shared memory:', module.isSharedMemory);

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'test', data: new Float32Array([1, 2, 3]) }
  ]);

  const view = df.getColumnView('test');
  if (view) {
    console.log('View is shared:', view.isShared);
    console.log('Buffer type:', view.data.buffer.constructor.name);
    // 'SharedArrayBuffer' if shared, 'ArrayBuffer' otherwise
  }

  df.free();
}
```

---

## Performance Optimization Tips

### Pre-allocate TypedArrays

```typescript
async function preallocationExample() {
  const module = await loadDatabonk();
  const rowCount = 1_000_000;

  // Good: Pre-allocate exact size
  const values = new Float32Array(rowCount);
  for (let i = 0; i < rowCount; i++) {
    values[i] = Math.random();
  }

  // Avoid: Growing arrays (creates garbage)
  // const values = [];
  // for (let i = 0; i < rowCount; i++) {
  //   values.push(Math.random());
  // }
  // new Float32Array(values);  // Extra copy

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'value', data: values }
  ]);

  df.free();
}
```

### Batch Operations

```typescript
async function batchOperationsExample() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'a', data: new Float32Array([1, 2, 3, 4, 5]) },
    { name: 'b', data: new Float32Array([5, 4, 3, 2, 1]) }
  ]);

  // Good: Chain operations (fewer WASM calls)
  df.add('a', 'b', 'sum')
    .sub('a', 'b', 'diff')
    .scalarMul('sum', 2, 'doubled');

  // Avoid: Separate statements (more overhead)
  // df.add('a', 'b', 'sum');
  // df.sub('a', 'b', 'diff');
  // df.scalarMul('sum', 2, 'doubled');

  df.free();
}
```

### Choose Appropriate Types

```typescript
async function typeSelectionExample() {
  const module = await loadDatabonk();

  // Use Int32 for integer keys and IDs
  const ids = new Int32Array([1, 2, 3, 4, 5]);

  // Use Float32 for most floating-point data (faster, less memory)
  const values = new Float32Array([1.5, 2.5, 3.5, 4.5, 5.5]);

  // Use Float64 only when precision is critical
  const precise = new Float64Array([1.123456789, 2.234567890]);

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'id', data: ids },
    { name: 'value', data: values },
    { name: 'precise_value', data: precise }
  ]);

  df.free();
}
```

### GroupBy Key Size

```typescript
async function groupByOptimization() {
  const module = await loadDatabonk();

  const df = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'category', data: new Int32Array([0, 1, 2, 0, 1, 2, 0, 1]) },
    { name: 'value', data: new Float32Array([10, 20, 30, 40, 50, 60, 70, 80]) }
  ]);

  // Good: Set maxKey close to actual max key value
  // If categories are 0-2, use maxKey=3 or slightly higher
  const grouped = df.groupBy('category', 10).sum('value');

  // Avoid: Very large maxKey when not needed
  // df.groupBy('category', 10000).sum('value');  // Wastes memory

  df.free();
  grouped.free();
}
```

---

## Full Pipeline Example

```typescript
import { loadDatabonk, DatabonkDataFrame } from 'databonk';

async function fullPipelineExample() {
  const module = await loadDatabonk();

  // Simulated e-commerce data
  const orders = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'order_id', data: new Int32Array([1, 2, 3, 4, 5, 6, 7, 8]) },
    { name: 'customer_id', data: new Int32Array([101, 102, 101, 103, 102, 101, 104, 103]) },
    { name: 'product_id', data: new Int32Array([1, 2, 1, 3, 2, 3, 1, 2]) },
    { name: 'quantity', data: new Int32Array([2, 1, 3, 1, 2, 1, 4, 2]) },
    { name: 'unit_price', data: new Float32Array([25, 50, 25, 15, 50, 15, 25, 50]) }
  ]);

  const products = await DatabonkDataFrame.fromTypedArrays(module, [
    { name: 'id', data: new Int32Array([1, 2, 3]) },
    { name: 'category', data: new Int32Array([0, 1, 0]) }  // 0=Electronics, 1=Books
  ]);

  console.log('=== E-commerce Analytics Pipeline ===\n');

  // Step 1: Calculate total per order line
  orders.scalarMul('unit_price', 1.0, 'price_copy');  // Using arithmetic
  console.log('Step 1: Added computed columns');
  console.log('Columns:', orders.columns);

  // Step 2: Join with products to get category
  const ordersWithCategory = orders.innerJoin(products, 'product_id', 'id');
  console.log('\nStep 2: Joined with products');
  console.log('Rows:', ordersWithCategory.rowCount);

  // Step 3: Group by category and sum quantities
  const salesByCategory = ordersWithCategory.groupBy('category', 5).sum('quantity');
  console.log('\nStep 3: Sales by category');

  const catView = salesByCategory.getColumnView('category');
  const qtyView = salesByCategory.getColumnView('quantity');
  if (catView && qtyView) {
    const categoryNames = ['Electronics', 'Books'];
    for (let i = 0; i < salesByCategory.rowCount; i++) {
      console.log(`  ${categoryNames[catView.get(i)]}: ${qtyView.get(i)} units`);
    }
  }

  // Step 4: Overall metrics
  console.log('\n=== Overall Metrics ===');
  console.log('Total orders:', orders.rowCount);
  console.log('Total quantity:', orders.sum('quantity'));
  console.log('Average order value:', orders.mean('unit_price').toFixed(2));

  // Cleanup
  orders.free();
  products.free();
  ordersWithCategory.free();
  salesByCategory.free();

  console.log('\nPipeline complete, memory cleaned up');
}

fullPipelineExample();
```
