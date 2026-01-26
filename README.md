# Databonk

**WASM-powered DataFrame library with SIMD acceleration**

Databonk is a high-performance columnar DataFrame library built with AssemblyScript and WebAssembly, featuring SIMD-optimized operations and optional SharedArrayBuffer support for zero-copy data access.

## Key Features

- **14x faster** than JavaScript for aggregations (sum, mean, min, max)
- **SIMD acceleration** with 4-way parallel computation
- **Zero-copy access** to column data via SharedArrayBuffer
- **Full TypeScript support** with comprehensive type definitions
- **Memory efficient** columnar storage design
- **Fluent API** for method chaining

## Installation

```bash
npm install databonk
```

## Quick Start

```typescript
import { loadDatabonk, DatabonkDataFrame } from 'databonk';

// Load the WASM module
const module = await loadDatabonk();

// Create a DataFrame from typed arrays
const df = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
  { name: 'value', data: new Float32Array([10.5, 20.5, 30.5, 40.5, 50.5]) },
]);

// Aggregations
console.log('Sum:', df.sum('value'));     // 152.5
console.log('Mean:', df.mean('value'));   // 30.5
console.log('Min:', df.min('value'));     // 10.5
console.log('Max:', df.max('value'));     // 50.5
console.log('Rows:', df.rowCount);        // 5

// Clean up when done
df.free();
```

## Performance

Benchmarks on 1 million rows (Float32):

| Operation | WASM SIMD | JavaScript | Speedup |
|-----------|-----------|------------|---------|
| Sum       | ~0.3ms    | ~4.2ms     | **14x** |
| Min       | ~0.4ms    | ~4.8ms     | **12x** |
| Max       | ~0.4ms    | ~4.8ms     | **12x** |
| Mean      | ~0.3ms    | ~5.0ms     | **16x** |

## API Overview

### Module Loading

```typescript
const module = await loadDatabonk({
  wasmPath: './build/release.wasm',  // Optional: custom WASM path
  sharedMemory: true,                 // Optional: enable SharedArrayBuffer
  initialMemory: 256,                 // Optional: initial memory pages (16MB default)
  maximumMemory: 16384,               // Optional: max memory pages (1GB default)
});
```

### DataFrame Creation

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'int_col', data: new Int32Array([1, 2, 3]) },
  { name: 'float_col', data: new Float32Array([1.5, 2.5, 3.5]) },
  { name: 'double_col', data: new Float64Array([1.1, 2.2, 3.3]) },
]);
```

### Aggregations

```typescript
df.sum('column');    // Sum of values
df.mean('column');   // Average
df.min('column');    // Minimum
df.max('column');    // Maximum
df.count('column');  // Count of values
```

### Column Arithmetic

```typescript
df.add('a', 'b', 'sum')           // sum = a + b
  .sub('a', 'b', 'diff')          // diff = a - b
  .scalarMul('a', 2.5, 'scaled'); // scaled = a * 2.5
```

### GroupBy

```typescript
const grouped = df.groupBy('category', 256)  // maxKey parameter
  .sum('value');  // or .mean('value')
```

### Inner Join

```typescript
const result = left.innerJoin(right, 'left_key', 'right_key');
```

### Zero-Copy Column Access

```typescript
const view = df.getColumnView('value');
if (view) {
  console.log(view.get(0));      // First value
  console.log([...view]);        // Iterate
  console.log(view.toArray());   // Copy to regular array
}
```

### Memory Management

```typescript
df.free();  // Always free DataFrames when done
```

## Documentation

- [API Reference](./docs/api.md) - Full API documentation
- [Examples](./docs/examples.md) - Detailed code examples

## Supported Column Types

| Type | TypedArray | Use Case |
|------|------------|----------|
| Int32 | `Int32Array` | Integer keys, IDs, counts |
| Float32 | `Float32Array` | Standard floating-point values |
| Float64 | `Float64Array` | High-precision values |

## Current Limitations

- GroupBy currently supports single value column aggregation
- Join keys must be Int32 values
- String columns are supported for storage but not for operations

## Development

```bash
# Install dependencies
npm install

# Build WASM module
npm run asbuild

# Run tests
npm test

# Run benchmarks
npm run benchmark
```

## License

MIT
