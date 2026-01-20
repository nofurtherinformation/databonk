import { DataFrame } from '../src/index.js';

// Basic usage example
console.log('=== Databonk.js Basic Example ===\n');

// Create a DataFrame from row data
const sales = DataFrame.from([
  { date: '2024-01-01', product: 'Apple', quantity: 100, price: 1.2, region: 'North' },
  { date: '2024-01-01', product: 'Banana', quantity: 150, price: 0.8, region: 'North' },
  { date: '2024-01-01', product: 'Apple', quantity: 80, price: 1.3, region: 'South' },
  { date: '2024-01-02', product: 'Apple', quantity: 120, price: 1.1, region: 'North' },
  { date: '2024-01-02', product: 'Banana', quantity: 200, price: 0.9, region: 'South' },
  { date: '2024-01-02', product: 'Cherry', quantity: 50, price: 2.5, region: 'North' }
]);

console.log('Original DataFrame:');
console.log(sales.toArray());
console.log(`Shape: ${sales.length} rows x ${sales.columnCount} columns\n`);

// Basic filtering
const apples = sales.filter(row => row.product === 'Apple');
console.log('Filtered (Apples only):');
console.log(apples.toArray());
console.log();

// Column selection
const priceQuantity = sales.select(['product', 'quantity', 'price']);
console.log('Selected columns:');
console.log(priceQuantity.head(3).toArray());
console.log();

// Add derived column
const withRevenue = sales.withColumn('revenue', row => row.quantity * row.price);
console.log('With revenue column:');
console.log(withRevenue.head(3).toArray());
console.log();

// Group by operations
const productStats = sales.groupBy(['product']).agg({
  total_quantity: 'sum',
  avg_price: 'mean',
  count: 'count'
});
console.log('Product statistics:');
console.log(productStats.toArray());
console.log();

// Aggregations
const summary = sales.describe();
console.log('Summary statistics:');
console.log(summary.toArray());
console.log();

// Sorting
const sortedByPrice = sales.sort('price', false); // descending
console.log('Sorted by price (descending):');
console.log(sortedByPrice.head(3).toArray());
console.log();

// Join example
const regions = DataFrame.from([
  { region: 'North', manager: 'Alice', tax_rate: 0.08 },
  { region: 'South', manager: 'Bob', tax_rate: 0.06 },
  { region: 'East', manager: 'Charlie', tax_rate: 0.07 }
]);

const joined = sales.join(regions, 'region', 'inner');
console.log('Joined with region data:');
console.log(joined.head(3).toArray());
console.log();

// Pivot example
const pivot = sales.pivot(['product'], 'region', 'quantity', 'sum');
console.log('Pivoted by product and region:');
console.log(pivot.toArray());
console.log();

console.log('=== Example Complete ===');