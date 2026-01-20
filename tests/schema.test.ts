import '../src/validation/schema';
import { DataFrame } from '../src/core/dataframe';
import { SchemaValidator, SchemaBuilders, CommonSchemas, DataFrameSchema } from '../src/validation/schema';
import { z } from 'zod';

describe('Schema Validation', () => {
  describe('SchemaValidator', () => {
    const validData = [
      { name: 'Alice', age: 25, email: 'alice@example.com' },
      { name: 'Bob', age: 30, email: 'bob@example.com' },
      { name: 'Charlie', age: 35, email: 'charlie@example.com' }
    ];

    const invalidData = [
      { name: 'Alice', age: 25, email: 'alice@example.com' },
      { name: '', age: -5, email: 'invalid-email' }, // invalid
      { name: 'Charlie', age: 35, email: 'charlie@example.com' }
    ];

    let validDf: DataFrame;
    let invalidDf: DataFrame;
    let personSchema: DataFrameSchema;

    beforeEach(() => {
      validDf = DataFrame.fromRows(validData);
      invalidDf = DataFrame.fromRows(invalidData);
      personSchema = SchemaValidator.define({
        name: z.string().min(1),
        age: z.number().int().min(0).max(150),
        email: z.string().email()
      });
    });

    describe('validation', () => {
      test('validates correct data successfully', () => {
        const result = validDf.validate(personSchema);
        
        expect(result.success).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.validRows).toBe(3);
        expect(result.totalRows).toBe(3);
      });

      test('detects validation errors', () => {
        const result = invalidDf.validate(personSchema);
        
        expect(result.success).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.validRows).toBe(2);
        expect(result.totalRows).toBe(3);
        
        // Check specific errors
        const errors = result.errors;
        expect(errors.some(e => e.column === 'name')).toBe(true);
        expect(errors.some(e => e.column === 'age')).toBe(true);
        expect(errors.some(e => e.column === 'email')).toBe(true);
      });

      test('stops on first error when requested', () => {
        const result = invalidDf.validate(personSchema, { stopOnFirst: true });
        
        expect(result.success).toBe(false);
        expect(result.validRows).toBe(1); // Only validated first row
      });

      test('provides detailed error information', () => {
        const result = invalidDf.validate(personSchema);
        
        const nameError = result.errors.find(e => e.column === 'name');
        expect(nameError).toBeDefined();
        expect(nameError!.row).toBe(1);
        expect(nameError!.value).toBe('');
        expect(nameError!.message).toContain('String must contain at least 1 character');

        const ageError = result.errors.find(e => e.column === 'age');
        expect(ageError).toBeDefined();
        expect(ageError!.row).toBe(1);
        expect(ageError!.value).toBe(-5);
      });
    });

    describe('transformation', () => {
      test('validates and transforms data', () => {
        const result = validDf.validateAndTransform(personSchema);
        
        expect(result.length).toBe(3);
        expect(result.columnNames).toEqual(['name', 'age', 'email']);
        expect(result.getRow(0)).toEqual(validData[0]);
      });

      test('throws error on invalid data during transformation', () => {
        expect(() => {
          invalidDf.validateAndTransform(personSchema);
        }).toThrow(/Validation failed at row 1/);
      });

      test('handles type coercion in transformation', () => {
        const coercionSchema = SchemaValidator.define({
          name: z.string(),
          age: z.coerce.number(),
          active: z.coerce.boolean()
        });

        const mixedData = [
          { name: 'Alice', age: '25', active: 'true' },
          { name: 'Bob', age: '30', active: 'false' }
        ];

        const df = DataFrame.fromRows(mixedData);
        const result = df.validateAndTransform(coercionSchema);

        expect(result.getRow(0).age).toBe(25);
        expect(result.getRow(0).active).toBe(true);
        expect(typeof result.getRow(0).age).toBe('number');
        expect(typeof result.getRow(0).active).toBe('boolean');
      });
    });

    describe('filtering', () => {
      test('filters valid rows', () => {
        const validRows = invalidDf.filterValid(personSchema);
        
        expect(validRows.length).toBe(2);
        expect(validRows.getRow(0).name).toBe('Alice');
        expect(validRows.getRow(1).name).toBe('Charlie');
      });

      test('returns invalid rows', () => {
        const invalidRows = invalidDf.getInvalid(personSchema);
        
        expect(invalidRows.length).toBe(1);
        expect(invalidRows.getRow(0).name).toBe('');
        expect(invalidRows.getRow(0).age).toBe(-5);
      });

      test('handles all valid data', () => {
        const validRows = validDf.filterValid(personSchema);
        expect(validRows.length).toBe(3);

        const invalidRows = validDf.getInvalid(personSchema);
        expect(invalidRows.length).toBe(0);
      });
    });
  });

  describe('SchemaBuilders', () => {
    test('creates numeric schema with constraints', () => {
      const schema = SchemaBuilders.numeric(0, 100);
      
      expect(() => schema.parse(50)).not.toThrow();
      expect(() => schema.parse(-1)).toThrow();
      expect(() => schema.parse(101)).toThrow();
    });

    test('creates string schema with length constraints', () => {
      const schema = SchemaBuilders.string(2, 10);
      
      expect(() => schema.parse('hello')).not.toThrow();
      expect(() => schema.parse('a')).toThrow();
      expect(() => schema.parse('this is too long')).toThrow();
    });

    test('creates email schema', () => {
      const schema = SchemaBuilders.email();
      
      expect(() => schema.parse('user@example.com')).not.toThrow();
      expect(() => schema.parse('invalid-email')).toThrow();
    });

    test('creates URL schema', () => {
      const schema = SchemaBuilders.url();
      
      expect(() => schema.parse('https://example.com')).not.toThrow();
      expect(() => schema.parse('not-a-url')).toThrow();
    });

    test('creates date schema with transformation', () => {
      const schema = SchemaBuilders.date();
      
      const date = new Date('2023-01-01');
      expect(schema.parse(date)).toBeInstanceOf(Date);
      expect(schema.parse('2023-01-01T00:00:00.000Z')).toBeInstanceOf(Date);
    });

    test('creates enum schema', () => {
      const schema = SchemaBuilders.enum(['red', 'green', 'blue']);
      
      expect(() => schema.parse('red')).not.toThrow();
      expect(() => schema.parse('yellow')).toThrow();
    });

    test('creates optional and nullable schemas', () => {
      const optionalSchema = SchemaBuilders.optional(z.string());
      const nullableSchema = SchemaBuilders.nullable(z.string());
      
      expect(() => optionalSchema.parse(undefined)).not.toThrow();
      expect(() => optionalSchema.parse('hello')).not.toThrow();
      
      expect(() => nullableSchema.parse(null)).not.toThrow();
      expect(() => nullableSchema.parse('hello')).not.toThrow();
    });

    test('creates array schema', () => {
      const schema = SchemaBuilders.array(z.number());
      
      expect(() => schema.parse([1, 2, 3])).not.toThrow();
      expect(() => schema.parse(['a', 'b', 'c'])).toThrow();
    });
  });

  describe('CommonSchemas', () => {
    test('person schema validation', () => {
      const personData = [
        { name: 'Alice', age: 25, email: 'alice@example.com' },
        { name: 'Bob', age: 30 }, // no email (optional)
        { name: '', age: -5, email: 'invalid' } // invalid
      ];

      const df = DataFrame.fromRows(personData);
      const result = df.validate(CommonSchemas.person);
      expect(result.validRows).toBe(2);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('product schema validation', () => {
      const productData = [
        { id: 'P001', name: 'Widget', price: 19.99, category: 'Tools' },
        { id: 123, name: 'Gadget', price: 29.99, category: 'Electronics', inStock: true },
        { id: 'P003', name: '', price: -10, category: 'Invalid' } // invalid
      ];

      const df = DataFrame.fromRows(productData);
      const result = df.validate(CommonSchemas.product);

      expect(result.validRows).toBe(2);
      
      const validProducts = df.filterValid(CommonSchemas.product);
      expect(validProducts.length).toBe(2);
    });

    test('transaction schema validation', () => {
      const transactionData = [
        { 
          id: '123e4567-e89b-12d3-a456-426614174000', 
          amount: 100.50, 
          currency: 'USD', 
          date: (new Date('2023-01-01')).toISOString(),
          description: 'Purchase'
        },
        { 
          id: 'invalid-uuid', 
          amount: 50.00, 
          currency: 'INVALID', 
          date: '2023-01-02T10:00:00Z'
        }
      ];

      const df = DataFrame.fromRows(transactionData);
      const result = df.validate(CommonSchemas.transaction);

      expect(result.validRows).toBe(1);
      expect(result.errors.some(e => e.column === 'id')).toBe(true);
      expect(result.errors.some(e => e.column === 'currency')).toBe(true);
    });

    test('coordinate schema validation', () => {
      const coordinateData = [
        { latitude: 40.7128, longitude: -74.0060, altitude: 10 },
        { latitude: 51.5074, longitude: -0.1278 }, // no altitude (optional)
        { latitude: 91, longitude: -200 } // invalid coordinates
      ];

      const df = DataFrame.fromRows(coordinateData);
      const result = df.validate(CommonSchemas.coordinate);

      expect(result.validRows).toBe(2);
      expect(result.errors.some(e => e.column === 'latitude')).toBe(true);
      expect(result.errors.some(e => e.column === 'longitude')).toBe(true);
    });
  });

  describe('performance and edge cases', () => {
    test('handles large datasets efficiently', () => {
      const largeData = Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        name: `User${i}`,
        email: `user${i}@example.com`,
        age: 20 + (i % 50)
      }));

      const df = DataFrame.fromRows(largeData);
      const start = Date.now();
      const result = df.validate(CommonSchemas.person);
      const duration = Date.now() - start;

      expect(result.success).toBe(true);
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    test('handles empty DataFrame', () => {
      const emptyDf = new DataFrame({});
      const result = emptyDf.validate(CommonSchemas.person);

      expect(result.success).toBe(true);
      expect(result.validRows).toBe(0);
      expect(result.totalRows).toBe(0);
      expect(result.errors).toHaveLength(0);
    });

    test('handles DataFrame with null values', () => {
      const dataWithNulls = [
        { name: 'Alice', age: null, email: 'alice@example.com' },
        { name: null, age: 30, email: null }
      ];

      const nullableSchema = SchemaValidator.define({
        name: z.string().nullable(),
        age: z.number().nullable(),
        email: z.string().email().nullable()
      });

      const df = DataFrame.fromRows(dataWithNulls);
      const result = df.validate(nullableSchema);

      expect(result.success).toBe(true);
      expect(result.validRows).toBe(2);
    });
  });
});