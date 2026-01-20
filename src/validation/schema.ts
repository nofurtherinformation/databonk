import { z } from 'zod';
import { DataFrame, RowObject } from '../core/dataframe.js';
import { Column } from '../core/column.js';
import { DataType } from '../utils/types.js';

export type SchemaDefinition = z.ZodRawShape;
export type DataFrameSchema<T extends SchemaDefinition = SchemaDefinition> = z.ZodObject<T>;

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

  static validate<T extends SchemaDefinition>(
    df: DataFrame,
    schema: DataFrameSchema<T>,
    options: ValidationOptions = {}
  ): ValidationResult {
    const { stopOnFirst = false, coerce = false } = options;
    const errors: ValidationError[] = [];
    let validRows = 0;

    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      
      try {
        if (coerce) {
          schema.parse(row);
        } else {
          schema.strict().parse(row);
        }
        validRows++;
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

  static validateAndTransform<T extends SchemaDefinition>(
    df: DataFrame,
    schema: DataFrameSchema<T>
  ): DataFrame {
    const transformedRows: RowObject[] = [];
    
    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      try {
        const validatedRow = schema.parse(row);
        transformedRows.push(validatedRow);
      } catch (error) {
        throw new Error(`Validation failed at row ${i}: ${error}`);
      }
    }

    return DataFrame.fromRows(transformedRows);
  }

  static filterValid<T extends SchemaDefinition>(
    df: DataFrame,
    schema: DataFrameSchema<T>
  ): DataFrame {
    const validRows: RowObject[] = [];
    
    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      try {
        schema.parse(row);
        validRows.push(row);
      } catch (error) {
        // Skip invalid rows
      }
    }

    return DataFrame.fromRows(validRows);
  }

  static getInvalid<T extends SchemaDefinition>(
    df: DataFrame,
    schema: DataFrameSchema<T>
  ): DataFrame {
    const invalidIndices: number[] = [];
    
    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      try {
        schema.parse(row);
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
    validate<T extends SchemaDefinition>(
      schema: DataFrameSchema<T>,
      options?: ValidationOptions
    ): ValidationResult;
    
    validateAndTransform<T extends SchemaDefinition>(
      schema: DataFrameSchema<T>
    ): DataFrame;
    
    filterValid<T extends SchemaDefinition>(
      schema: DataFrameSchema<T>
    ): DataFrame;
    
    getInvalid<T extends SchemaDefinition>(
      schema: DataFrameSchema<T>
    ): DataFrame;
  }
}

DataFrame.prototype.validate = function<T extends SchemaDefinition>(
  schema: DataFrameSchema<T>,
  options: ValidationOptions = {}
): ValidationResult {
  return SchemaValidator.validate(this, schema, options);
};

DataFrame.prototype.validateAndTransform = function<T extends SchemaDefinition>(
  schema: DataFrameSchema<T>
): DataFrame {
  return SchemaValidator.validateAndTransform(this, schema);
};

DataFrame.prototype.filterValid = function<T extends SchemaDefinition>(
  schema: DataFrameSchema<T>
): DataFrame {
  return SchemaValidator.filterValid(this, schema);
};

DataFrame.prototype.getInvalid = function<T extends SchemaDefinition>(
  schema: DataFrameSchema<T>
): DataFrame {
  return SchemaValidator.getInvalid(this, schema);
};