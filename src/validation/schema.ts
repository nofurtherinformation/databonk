import { z } from 'zod';
import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { DataType } from '../utils/types.js';

export type SchemaDefinition = z.ZodRawShape;
export type DataFrameSchema<T extends SchemaDefinition = SchemaDefinition> = z.ZodObject<T> | z.ZodTypeAny;

export interface ValidationResult {
  success: boolean;
  errors: ValidationError[];
  validRows: number;
  totalRows: number;
}

export interface ValidationError {
  row: number;
  column: string;
  value: any;
  message: string;
}

export class SchemaValidator {
  static define<T extends SchemaDefinition>(shape: T): DataFrameSchema<T> {
    return z.object(shape);
  }

  static validate(
    df: DataFrame,
    schema: DataFrameSchema | z.ZodTypeAny,
    options: ValidationOptions = {}
  ): ValidationResult {
    const { stopOnFirst = false, coerce = false } = options;
    const errors: ValidationError[] = [];
    let validRows = 0;

    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      
      try {
        let rowToValidate = row;
        
        // Try parsing with original row first (preserves null for nullable fields)
        try {
          if (coerce) {
            schema.parse(row);
          } else {
            schema.parse(row);
          }
          validRows++;
          continue;
        } catch (firstError) {
          // If parsing fails with null-related error, try normalizing null to undefined
          // This handles optional fields that don't accept null
          if (firstError instanceof z.ZodError) {
            const hasNullError = firstError.issues.some(issue => 
              issue.message.includes('null') && 
              (issue.code === 'invalid_type' || issue.message.includes('Expected'))
            );
            
            if (hasNullError) {
              // Normalize null to undefined for optional fields (recursively for nested objects)
              rowToValidate = normalizeNullToUndefined(row) as RowObject;
              
              // Retry with normalized row
              if (coerce) {
                schema.parse(rowToValidate);
              } else {
                schema.parse(rowToValidate);
              }
              validRows++;
              continue;
            }
          }
          // Re-throw if normalization didn't help
          throw firstError;
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          for (const issue of error.issues) {
            errors.push({
              row: i,
              column: issue.path[0] as string,
              value: row[issue.path[0] as string],
              message: issue.message
            });
          }
        }
        
        if (stopOnFirst) break;
      }
    }

    return {
      success: errors.length === 0,
      errors,
      validRows,
      totalRows: df.length
    };
  }

  static validateAndTransform(
    df: DataFrame,
    schema: DataFrameSchema | z.ZodTypeAny
  ): DataFrame {
    const transformedRows: RowObject[] = [];
    
    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      let rowToValidate = row;
      
      try {
        // Try with original row first
        schema.parse(row);
      } catch (firstError) {
        // If parsing fails with null-related error, try normalizing
        if (firstError instanceof z.ZodError) {
          const hasNullError = firstError.issues.some(issue => 
            issue.message.includes('null') && 
            (issue.code === 'invalid_type' || issue.message.includes('Expected'))
          );
          
          if (hasNullError) {
            rowToValidate = normalizeNullToUndefined(row) as RowObject;
          }
        }
      }
      
      try {
        const validatedRow = schema.parse(rowToValidate);
        transformedRows.push(validatedRow);
      } catch (error) {
        throw new Error(`Validation failed at row ${i}: ${error}`);
      }
    }

    return DataFrame.fromRows(transformedRows);
  }

  static filterValid(
    df: DataFrame,
    schema: DataFrameSchema | z.ZodTypeAny
  ): DataFrame {
    const validRows: RowObject[] = [];
    
    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      let rowToValidate = row;
      
      try {
        // Try with original row first
        schema.parse(row);
      } catch (firstError) {
        // If parsing fails with null-related error, try normalizing
        if (firstError instanceof z.ZodError) {
          const hasNullError = firstError.issues.some(issue => 
            issue.message.includes('null') && 
            (issue.code === 'invalid_type' || issue.message.includes('Expected'))
          );
          
          if (hasNullError) {
            rowToValidate = normalizeNullToUndefined(row) as RowObject;
          }
        }
      }
      
      try {
        schema.parse(rowToValidate);
        validRows.push(row); // Keep original row with null values
      } catch (error) {
        // Skip invalid rows
      }
    }

    return DataFrame.fromRows(validRows);
  }

  static getInvalid(
    df: DataFrame,
    schema: DataFrameSchema | z.ZodTypeAny
  ): DataFrame {
    const invalidIndices: number[] = [];
    
    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      let rowToValidate = row;
      
      try {
        // Try with original row first
        schema.parse(row);
      } catch (firstError) {
        // If parsing fails with null-related error, try normalizing
        if (firstError instanceof z.ZodError) {
          const hasNullError = firstError.issues.some(issue => 
            issue.message.includes('null') && 
            (issue.code === 'invalid_type' || issue.message.includes('Expected'))
          );
          
          if (hasNullError) {
            rowToValidate = normalizeNullToUndefined(row) as RowObject;
          }
        }
      }
      
      try {
        schema.parse(rowToValidate);
      } catch (error) {
        invalidIndices.push(i);
      }
    }

    return df.selectRows(invalidIndices);
  }
}

export interface ValidationOptions {
  stopOnFirst?: boolean;
  coerce?: boolean;
}

// Recursively normalize null to undefined for optional fields
function normalizeNullToUndefined(value: any): any {
  if (value === null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map(normalizeNullToUndefined);
  }
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, normalizeNullToUndefined(val)])
    );
  }
  return value;
}

// Common schema builders
export class SchemaBuilders {
  static numeric(min?: number, max?: number): z.ZodNumber {
    let schema = z.number();
    if (min !== undefined) schema = schema.min(min);
    if (max !== undefined) schema = schema.max(max);
    return schema;
  }

  static string(minLength?: number, maxLength?: number): z.ZodString {
    let schema = z.string();
    if (minLength !== undefined) schema = schema.min(minLength);
    if (maxLength !== undefined) schema = schema.max(maxLength);
    return schema;
  }

  static email(): z.ZodString {
    return z.string().email();
  }

  static url(): z.ZodString {
    return z.string().url();
  }

  static date(): z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date> {
    return z.date().or(z.string().datetime()).transform(val => 
      val instanceof Date ? val : new Date(val)
    );
  }

  static enum(values: [string, ...string[]]): z.ZodEnum<[string, ...string[]]> {
    return z.enum(values);
  }

  static optional<T extends z.ZodTypeAny>(schema: T): z.ZodOptional<T> {
    return schema.optional();
  }

  static nullable<T extends z.ZodTypeAny>(schema: T): z.ZodNullable<T> {
    return schema.nullable();
  }

  static array<T extends z.ZodTypeAny>(schema: T): z.ZodArray<T> {
    return z.array(schema);
  }
}

// Pre-built common schemas
export const CommonSchemas = {
  person: SchemaValidator.define({
    name: z.string().min(1),
    age: z.number().int().min(0).max(150),
    email: SchemaBuilders.optional(SchemaBuilders.email())
  }),

  product: SchemaValidator.define({
    id: z.string().or(z.number()),
    name: z.string().min(1),
    price: z.number().positive(),
    category: z.string(),
    inStock: z.boolean().optional()
  }),

  transaction: SchemaValidator.define({
    id: z.string().uuid(),
    amount: z.number(),
    currency: z.enum(['USD', 'EUR', 'GBP', 'JPY']),
    date: SchemaBuilders.date(),
    description: SchemaBuilders.optional(z.string())
  }),

  coordinate: SchemaValidator.define({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    altitude: SchemaBuilders.optional(z.number())
  })
};

declare module '../core/dataframe.js' {
  interface DataFrame {
    validate(
      schema: DataFrameSchema | z.ZodTypeAny,
      options?: ValidationOptions
    ): ValidationResult;
    
    validateAndTransform(
      schema: DataFrameSchema | z.ZodTypeAny
    ): DataFrame;
    
    filterValid(
      schema: DataFrameSchema | z.ZodTypeAny
    ): DataFrame;
    
    getInvalid(
      schema: DataFrameSchema | z.ZodTypeAny
    ): DataFrame;
  }
}

DataFrame.prototype.validate = function(
  schema: DataFrameSchema | z.ZodTypeAny,
  options: ValidationOptions = {}
): ValidationResult {
  return SchemaValidator.validate(this, schema, options);
};

DataFrame.prototype.validateAndTransform = function(
  schema: DataFrameSchema | z.ZodTypeAny
): DataFrame {
  return SchemaValidator.validateAndTransform(this, schema);
};

DataFrame.prototype.filterValid = function(
  schema: DataFrameSchema | z.ZodTypeAny
): DataFrame {
  return SchemaValidator.filterValid(this, schema);
};

DataFrame.prototype.getInvalid = function(
  schema: DataFrameSchema | z.ZodTypeAny
): DataFrame {
  return SchemaValidator.getInvalid(this, schema);
};