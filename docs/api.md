# Databonk API Reference

Complete API documentation for the Databonk library.

## Table of Contents

- [Module Loading](#module-loading)
- [DataFrame Creation](#dataframe-creation)
- [DataFrame Properties](#dataframe-properties)
- [Aggregations](#aggregations)
- [Column Arithmetic](#column-arithmetic)
- [GroupBy Operations](#groupby-operations)
- [Joins](#joins)
- [Column Access](#column-access)
- [Memory Management](#memory-management)
- [Types](#types)

---

## Module Loading

### `loadDatabonk(options?)`

Loads the Databonk WASM module and returns a `DatabonkModule` instance.

```typescript
async function loadDatabonk(options?: LoaderOptions): Promise<DatabonkModule>
```

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `options.wasmPath` | `string` | `'build/release.wasm'` | Path to the WASM file |
| `options.initialMemory` | `number` | `256` | Initial memory pages (64KB each, 16MB default) |
| `options.maximumMemory` | `number` | `16384` | Maximum memory pages (1GB default) |
| `options.sharedMemory` | `boolean` | `false` | Enable SharedArrayBuffer for zero-copy views |

**Returns:** `Promise<DatabonkModule>`

**Example:**

```typescript
import { loadDatabonk } from 'databonk';

// Basic usage
const module = await loadDatabonk();

// With options
const module = await loadDatabonk({
  wasmPath: './custom/path/release.wasm',
  sharedMemory: true,
  initialMemory: 512,   // 32MB initial
  maximumMemory: 32768, // 2GB max
});
```

### `isSharedArrayBufferSupported()`

Checks if the environment supports SharedArrayBuffer.

```typescript
function isSharedArrayBufferSupported(): boolean
```

**Returns:** `true` if SharedArrayBuffer is available, `false` otherwise

**Example:**

```typescript
import { isSharedArrayBufferSupported } from 'databonk';

if (isSharedArrayBufferSupported()) {
  const module = await loadDatabonk({ sharedMemory: true });
}
```

---

## DataFrame Creation

### `DatabonkDataFrame.fromTypedArrays(module, columns)`

Creates a new DataFrame from an array of column specifications.

```typescript
static async fromTypedArrays(
  module: DatabonkModule,
  columns: ColumnSpec[]
): Promise<DatabonkDataFrame>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `module` | `DatabonkModule` | The loaded WASM module |
| `columns` | `ColumnSpec[]` | Array of column specifications |

**ColumnSpec Interface:**

```typescript
interface ColumnSpec {
  name: string;                                      // Column name
  data: Int32Array | Float32Array | Float64Array;   // Column data
  type?: ColumnType;                                 // Optional explicit type
}
```

**Throws:** Error if columns have different lengths

**Returns:** `Promise<DatabonkDataFrame>`

**Example:**

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'id', data: new Int32Array([1, 2, 3, 4, 5]) },
  { name: 'price', data: new Float32Array([9.99, 19.99, 29.99, 39.99, 49.99]) },
  { name: 'weight', data: new Float64Array([0.5, 1.0, 1.5, 2.0, 2.5]) },
]);
```

---

## DataFrame Properties

### `rowCount`

Returns the number of rows in the DataFrame.

```typescript
get rowCount(): number
```

### `columnCount`

Returns the number of columns in the DataFrame.

```typescript
get columnCount(): number
```

### `columns`

Returns an array of column names.

```typescript
get columns(): string[]
```

### `wasmPtr`

Returns the internal WASM pointer (for advanced usage).

```typescript
get wasmPtr(): number
```

**Example:**

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [...]);

console.log(df.rowCount);     // 1000000
console.log(df.columnCount);  // 5
console.log(df.columns);      // ['id', 'value', 'category', ...]
```

---

## Aggregations

All aggregation methods use SIMD-optimized implementations internally.

### `sum(columnName)`

Calculates the sum of all values in a column.

```typescript
sum(columnName: string): number
```

**Returns:** Sum as `number` (f64 precision)

### `mean(columnName)`

Calculates the arithmetic mean of a column.

```typescript
mean(columnName: string): number
```

**Returns:** Mean as `number`

### `min(columnName)`

Finds the minimum value in a column.

```typescript
min(columnName: string): number
```

**Returns:** Minimum value (returns `Infinity` for empty columns)

### `max(columnName)`

Finds the maximum value in a column.

```typescript
max(columnName: string): number
```

**Returns:** Maximum value (returns `-Infinity` for empty columns)

### `count(columnName)`

Counts the number of values in a column.

```typescript
count(columnName: string): number
```

**Returns:** Count as `number`

**Example:**

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'value', data: new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) }
]);

console.log(df.sum('value'));   // 55
console.log(df.mean('value'));  // 5.5
console.log(df.min('value'));   // 1
console.log(df.max('value'));   // 10
console.log(df.count('value')); // 10
```

---

## Column Arithmetic

All arithmetic methods return `this` for method chaining.

### `add(colA, colB, resultName)`

Adds two columns element-wise and stores in a new column.

```typescript
add(colA: string, colB: string, resultName: string): this
```

**Effect:** Creates `resultName = colA + colB`

### `sub(colA, colB, resultName)`

Subtracts two columns element-wise and stores in a new column.

```typescript
sub(colA: string, colB: string, resultName: string): this
```

**Effect:** Creates `resultName = colA - colB`

### `scalarMul(colName, scalar, resultName)`

Multiplies a column by a scalar and stores in a new column.

```typescript
scalarMul(colName: string, scalar: number, resultName: string): this
```

**Effect:** Creates `resultName = colName * scalar`

**Example:**

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'price', data: new Float32Array([100, 200, 300]) },
  { name: 'quantity', data: new Float32Array([2, 3, 1]) }
]);

// Method chaining
df.add('price', 'quantity', 'combined')
  .scalarMul('price', 1.1, 'price_with_tax')
  .sub('price_with_tax', 'price', 'tax_amount');

console.log(df.columns);
// ['price', 'quantity', 'combined', 'price_with_tax', 'tax_amount']
```

---

## GroupBy Operations

### `groupBy(keyColumn, maxKey?)`

Creates a GroupByBuilder for aggregating data by a key column.

```typescript
groupBy(keyColumn: string, maxKey?: number): GroupByBuilder
```

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keyColumn` | `string` | - | Column name containing integer keys |
| `maxKey` | `number` | `256` | Maximum expected key value |

**Returns:** `GroupByBuilder` instance

### `GroupByBuilder.sum(...valueColumns)`

Performs sum aggregation on the grouped data.

```typescript
sum(...valueColumns: string[]): DatabonkDataFrame
```

**Note:** Currently supports single column only.

**Returns:** New `DatabonkDataFrame` with aggregated results

### `GroupByBuilder.mean(...valueColumns)`

Performs mean aggregation on the grouped data.

```typescript
mean(...valueColumns: string[]): DatabonkDataFrame
```

**Note:** Currently supports single column only.

**Returns:** New `DatabonkDataFrame` with aggregated results

**Example:**

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'category', data: new Int32Array([0, 0, 1, 1, 2, 2, 2]) },
  { name: 'sales', data: new Float32Array([100, 150, 200, 250, 50, 75, 125]) }
]);

// Sum by category
const summed = df.groupBy('category', 10).sum('sales');
// category: [0, 1, 2], sales: [250, 450, 250]

// Mean by category
const averaged = df.groupBy('category', 10).mean('sales');
// category: [0, 1, 2], sales: [125, 225, 83.33]

summed.free();
averaged.free();
```

---

## Joins

### `innerJoin(other, leftKey, rightKey)`

Performs an inner join with another DataFrame.

```typescript
innerJoin(
  other: DatabonkDataFrame,
  leftKey: string,
  rightKey: string
): DatabonkDataFrame
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `other` | `DatabonkDataFrame` | DataFrame to join with |
| `leftKey` | `string` | Key column in left DataFrame |
| `rightKey` | `string` | Key column in right DataFrame |

**Returns:** New `DatabonkDataFrame` containing matched rows

**Behavior:**
- Only rows with matching keys are included
- Duplicate keys produce Cartesian product
- Key columns are not duplicated in result

**Example:**

```typescript
const orders = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'order_id', data: new Int32Array([1, 2, 3, 4]) },
  { name: 'customer_id', data: new Int32Array([101, 102, 101, 103]) },
  { name: 'amount', data: new Float32Array([50, 75, 100, 25]) }
]);

const customers = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'id', data: new Int32Array([101, 102, 104]) },
  { name: 'name_code', data: new Int32Array([1, 2, 3]) }
]);

const joined = orders.innerJoin(customers, 'customer_id', 'id');
// Contains orders for customers 101 and 102 (103 and 104 have no match)

console.log(joined.rowCount);  // 3 (customer 101 appears twice)
console.log(joined.columns);   // ['order_id', 'customer_id', 'amount', 'name_code']

orders.free();
customers.free();
joined.free();
```

---

## Column Access

### `hasColumn(columnName)`

Checks if a column exists in the DataFrame.

```typescript
hasColumn(columnName: string): boolean
```

**Returns:** `true` if column exists, `false` otherwise

### `getColumnView(columnName)`

Returns a zero-copy view of a column's data.

```typescript
getColumnView(
  columnName: string
): ColumnView<Int32Array | Float32Array | Float64Array> | null
```

**Returns:** `ColumnView` object or `null` if column doesn't exist

**Note:** When using `sharedMemory: true`, the view directly references WASM memory and modifications are visible across workers.

**Example:**

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [
  { name: 'values', data: new Float32Array([1.5, 2.5, 3.5, 4.5, 5.5]) }
]);

if (df.hasColumn('values')) {
  const view = df.getColumnView('values');

  // Read values
  console.log(view.get(0));    // 1.5
  console.log(view.length);    // 5

  // Iterate
  for (const value of view) {
    console.log(value);
  }

  // Convert to array (copies data)
  const arr = view.toArray();  // [1.5, 2.5, 3.5, 4.5, 5.5]

  // Slice (copies data)
  const slice = view.slice(1, 4);  // Float32Array [2.5, 3.5, 4.5]
}

df.free();
```

---

## Memory Management

### `free()`

Releases all WASM memory associated with the DataFrame.

```typescript
free(): void
```

**Effect:**
- Frees all column data in WASM memory
- Frees allocated string pointers
- Marks the DataFrame as freed
- Safe to call multiple times

**Important:** Always call `free()` when done with a DataFrame to prevent memory leaks.

**Example:**

```typescript
const df = await DatabonkDataFrame.fromTypedArrays(module, [...]);

// Use the DataFrame...
const sum = df.sum('value');
const grouped = df.groupBy('category', 10).sum('value');

// Clean up
grouped.free();
df.free();

// Safe to call again
df.free();  // No-op
```

---

## Types

### `ColumnType`

Enum representing supported column data types.

```typescript
enum ColumnType {
  Int32 = 0,
  Int64 = 1,
  Float32 = 2,
  Float64 = 3,
  String = 4
}
```

### `ColumnView<T>`

Class providing typed access to column data.

```typescript
class ColumnView<T extends TypedArray> {
  readonly data: T;           // Underlying typed array
  readonly ptr: number;       // WASM memory pointer
  readonly length: number;    // Number of elements
  readonly isShared: boolean; // Whether using SharedArrayBuffer

  get(index: number): number;
  set(index: number, value: number): void;
  [Symbol.iterator](): Iterator<number>;
  toArray(): number[];
  slice(start?: number, end?: number): T;
}
```

### `LoaderOptions`

Options for loading the WASM module.

```typescript
interface LoaderOptions {
  wasmPath?: string;
  initialMemory?: number;
  maximumMemory?: number;
  sharedMemory?: boolean;
}
```

### `DatabonkModule`

The loaded WASM module interface.

```typescript
interface DatabonkModule {
  exports: DatabonkWasm;
  memory: WebAssembly.Memory;
  isSharedMemory: boolean;

  // Memory view helpers
  getInt32View(ptr: number, length: number): Int32Array;
  getFloat32View(ptr: number, length: number): Float32Array;
  getFloat64View(ptr: number, length: number): Float64Array;
  getUint8View(ptr: number, length: number): Uint8Array;

  // String helpers
  allocString(str: string): number;
  freePtr(ptr: number): void;
}
```

### `ColumnSpec`

Specification for creating a column.

```typescript
interface ColumnSpec {
  name: string;
  data: Int32Array | Float32Array | Float64Array;
  type?: ColumnType;
}
```

---

## Utility Functions

### `getColumnTypeSize(type)`

Returns the byte size for a column type.

```typescript
function getColumnTypeSize(type: ColumnType): number
```

| Type | Size |
|------|------|
| `Int32` | 4 bytes |
| `Int64` | 8 bytes |
| `Float32` | 4 bytes |
| `Float64` | 8 bytes |

### `createTypedArrayView(module, ptr, length, type)`

Creates a ColumnView for a memory region.

```typescript
function createTypedArrayView(
  module: DatabonkModule,
  ptr: number,
  length: number,
  type: ColumnType
): ColumnView<NumericTypedArray>
```

### `allocateAndCopy(module, data)`

Allocates WASM memory and copies TypedArray data.

```typescript
function allocateAndCopy(
  module: DatabonkModule,
  data: TypedArray
): number  // Returns pointer
```

### `copyToWasm(module, data, ptr)`

Copies TypedArray data to existing WASM memory location.

```typescript
function copyToWasm(
  module: DatabonkModule,
  data: TypedArray,
  ptr: number
): void
```
