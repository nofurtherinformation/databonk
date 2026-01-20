import { DataFrame, SchemaValidator, SchemaBuilders, CommonSchemas } from '../src/index.js';
import { z } from 'zod';

console.log('=== Databonk.js Schema Validation Example ===\n');

// Sample data with some invalid entries
const userData = [
  { name: 'Alice', age: 25, email: 'alice@example.com', role: 'admin' },
  { name: 'Bob', age: 30, email: 'bob@example.com', role: 'user' },
  { name: '', age: -5, email: 'invalid-email', role: 'unknown' }, // Invalid
  { name: 'Charlie', age: 35, email: 'charlie@example.com', role: 'user' },
  { name: 'Diana', age: 150, email: 'diana@example.com', role: 'admin' }
];

const df = DataFrame.fromRows(userData);
console.log('Original data:');
console.log(df.toArray());
console.log();

// 1. Using built-in common schemas
console.log('=== Using CommonSchemas.person ===');
const personValidation = df.validate(CommonSchemas.person);
console.log(`Valid rows: ${personValidation.validRows}/${personValidation.totalRows}`);
console.log(`Success: ${personValidation.success}`);
if (personValidation.errors.length > 0) {
  console.log('Validation errors:');
  personValidation.errors.forEach(error => {
    console.log(`  Row ${error.row}, Column '${error.column}': ${error.message} (value: ${error.value})`);
  });
}
console.log();

// 2. Creating a custom schema
console.log('=== Custom Schema with Role Validation ===');
const customUserSchema = SchemaValidator.define({
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().min(0).max(120, 'Age must be realistic'),
  email: z.string().email('Must be a valid email'),
  role: z.enum(['admin', 'user', 'guest'], {
    errorMap: () => ({ message: 'Role must be admin, user, or guest' })
  })
});

const customValidation = df.validate(customUserSchema);
console.log(`Valid rows: ${customValidation.validRows}/${customValidation.totalRows}`);
console.log('Validation errors:');
customValidation.errors.forEach(error => {
  console.log(`  Row ${error.row}, Column '${error.column}': ${error.message}`);
});
console.log();

// 3. Filtering valid and invalid data
console.log('=== Filtering Valid/Invalid Data ===');
const validUsers = df.filterValid(customUserSchema);
console.log('Valid users:');
console.log(validUsers.toArray());
console.log();

const invalidUsers = df.getInvalid(customUserSchema);
console.log('Invalid users:');
console.log(invalidUsers.toArray());
console.log();

// 4. Schema transformation with coercion
console.log('=== Schema Transformation with Type Coercion ===');
const coercionData = [
  { id: '1', active: 'true', score: '95.5', created: '2023-01-01' },
  { id: '2', active: 'false', score: '87.2', created: '2023-01-02' },
  { id: '3', active: 'yes', score: 'invalid', created: '2023-01-03' }
];

const coercionDf = DataFrame.fromRows(coercionData);
console.log('Data before coercion:');
console.log(coercionDf.toArray());

const coercionSchema = SchemaValidator.define({
  id: z.coerce.number(),
  active: z.string().transform(val => val === 'true' || val === 'yes'),
  score: z.coerce.number(),
  created: z.string().pipe(z.coerce.date())
});

try {
  // This will work for valid rows and throw for invalid ones
  const validCoerced = coercionDf.filterValid(coercionSchema);
  const transformedDf = validCoerced.validateAndTransform(coercionSchema);
  console.log('Data after successful coercion:');
  console.log(transformedDf.toArray());
  console.log();
} catch (error) {
  console.log(`Transformation failed: ${error}`);
}

// 5. Advanced validation with custom logic
console.log('=== Advanced Validation with Custom Logic ===');
const advancedSchema = SchemaValidator.define({
  username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string().min(8),
  confirmPassword: z.string(),
  age: z.number().int().min(13, 'Must be at least 13 years old'),
  terms: z.boolean().refine(val => val === true, 'Must accept terms and conditions')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
});

const registrationData = [
  { 
    username: 'alice123', 
    password: 'password123', 
    confirmPassword: 'password123', 
    age: 25, 
    terms: true 
  },
  { 
    username: 'bob@invalid', 
    password: '123', 
    confirmPassword: '456', 
    age: 12, 
    terms: false 
  }
];

const regDf = DataFrame.fromRows(registrationData);
const regValidation = regDf.validate(advancedSchema);

console.log(`Registration validation - Valid: ${regValidation.validRows}/${regValidation.totalRows}`);
console.log('Errors:');
regValidation.errors.forEach(error => {
  console.log(`  ${error.column}: ${error.message}`);
});
console.log();

// 6. Working with product data
console.log('=== Product Data Validation ===');
const productData = [
  { id: 'P001', name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
  { id: 'P002', name: 'Book', price: 19.99, category: 'Books' },
  { id: '', name: 'Invalid Product', price: -50, category: 'Unknown', inStock: null }
];

const productDf = DataFrame.fromRows(productData);
const productValidation = productDf.validate(CommonSchemas.product);

console.log(`Product validation - Valid: ${productValidation.validRows}/${productValidation.totalRows}`);
console.log('Valid products:');
console.log(productDf.filterValid(CommonSchemas.product).toArray());
console.log();

// 7. Geographic data validation
console.log('=== Geographic Data Validation ===');
const locationData = [
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, altitude: 10 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Invalid Location', latitude: 91, longitude: -200, altitude: -1000 }
];

const locationDf = DataFrame.fromRows(locationData);
const locationSchema = SchemaValidator.define({
  name: z.string().min(1),
  ...CommonSchemas.coordinate.shape
});

const locationValidation = locationDf.validate(locationSchema);
console.log(`Location validation - Valid: ${locationValidation.validRows}/${locationValidation.totalRows}`);
console.log('Valid locations:');
console.log(locationDf.filterValid(locationSchema).toArray());

console.log('\n=== Schema Validation Examples Complete ===');