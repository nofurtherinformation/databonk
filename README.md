# Databonk.js

A lightweight, fast data frame library for JavaScript and TypeScript with built-in schema validation.

## Features

- **Lightweight**: Minimal dependencies, tree-shakeable modules
- **Fast**: Columnar storage using TypedArrays for performance
- **Simple**: Clean API for common data operations
- **Flexible**: Works with regular arrays, TypedArrays, or Apache Arrow
- **Schema Validation**: Built-in Zod integration for data validation
- **Type Safe**: Full TypeScript support with inferred types

## Installation

```bash
npm install databonk zod
```

## Quick Start

```javascript
import { DataFrame, SchemaValidator, CommonSchemas } from 'databonk';

// Create a DataFrame
const df = DataFrame.from({
  name: ['Alice', 'Bob', 'Charlie'],
  age: [25, 30, 35],
  city: ['NYC', 'LA', 'Chicago']
});

// Basic operations
const adults = df.filter(row => row.age >= 30);
const avgAge = df.column('age').mean();
const grouped = df.groupBy(['city']).agg({ avgAge: 'mean' });

// Schema validation
const result = df.validate(CommonSchemas.person);
console.log(`Valid rows: ${result.validRows}/${result.totalRows}`);
```

## Core Features

### Data Operations
- **Filtering & Selection**: Powerful row/column filtering with predicate functions
- **Joins**: Inner, left, right, and outer joins with multiple keys
- **Aggregations**: Sum, mean, count, min, max, std, variance with group-by support
- **Reshaping**: Pivot, melt, transpose operations for data transformation
- **Sorting**: Multi-column sorting with custom comparators

### Schema Validation
- **Built-in Schemas**: Common patterns for users, products, transactions, coordinates
- **Custom Validation**: Define your own schemas with Zod
- **Data Cleaning**: Filter valid/invalid rows, transform data types
- **Error Reporting**: Detailed validation errors with row/column information

### I/O Support
- **CSV**: Read/write CSV files with automatic type inference
- **Apache Arrow**: Optional integration for columnar data exchange
- **Streaming**: Memory-efficient processing of large datasets

## Examples

### Schema Validation

```javascript
import { DataFrame, SchemaValidator } from 'databonk';
import { z } from 'zod';

// Define a custom schema
const userSchema = SchemaValidator.define({
  name: z.string().min(1),
  age: z.number().int().min(0).max(150),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest'])
});

const userData = [
  { name: 'Alice', age: 25, email: 'alice@example.com', role: 'admin' },
  { name: '', age: -5, email: 'invalid', role: 'unknown' } // Invalid
];

const df = DataFrame.fromRows(userData);

// Validate data
const validation = df.validate(userSchema);
console.log(`Errors: ${validation.errors.length}`);

// Filter valid rows
const validUsers = df.filterValid(userSchema);

// Transform data with type coercion
const cleanData = df.validateAndTransform(userSchema);
```

### Advanced Data Operations

```javascript
// Join operations
const sales = DataFrame.fromRows([
  { product_id: 1, quantity: 100, region: 'North' },
  { product_id: 2, quantity: 150, region: 'South' }
]);

const products = DataFrame.fromRows([
  { product_id: 1, name: 'Widget', price: 10.99 },
  { product_id: 2, name: 'Gadget', price: 15.99 }
]);

const joined = sales.join(products, 'product_id', 'inner');

// Group by with multiple aggregations
const summary = joined
  .groupBy(['region'])
  .agg({
    quantity: ['sum', 'mean'],
    price: 'mean'
  });

// Add calculated columns
const withRevenue = joined.withColumn('revenue', 
  row => row.quantity * row.price
);

// Pivot tables
const pivot = sales.pivot(['region'], 'product_id', 'quantity', 'sum');
```

## Docker Development

```bash
# Build and start development environment
make docker-dev

# Run tests in Docker
make docker-test

# Open shell in container
make docker-shell
```

## Development

```bash
# Local development
npm install
npm run build
npm test

# With Docker
make setup
make dev
```

## Performance

Databonk.js is designed for small to medium datasets (up to ~1M rows) with:
- **Memory efficient**: Columnar storage with TypedArrays
- **Fast operations**: Optimized algorithms for joins, aggregations
- **Minimal overhead**: Zero-copy operations where possible
- **Tree-shakeable**: Only import what you use