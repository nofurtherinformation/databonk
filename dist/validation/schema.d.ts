import { z } from 'zod';
import { DataFrame } from '../core/dataframe.js';
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
export declare class SchemaValidator {
    static define<T extends SchemaDefinition>(shape: T): DataFrameSchema<T>;
    static validate<T extends SchemaDefinition>(df: DataFrame, schema: DataFrameSchema<T>, options?: ValidationOptions): ValidationResult;
    static validateAndTransform<T extends SchemaDefinition>(df: DataFrame, schema: DataFrameSchema<T>): DataFrame;
    static filterValid<T extends SchemaDefinition>(df: DataFrame, schema: DataFrameSchema<T>): DataFrame;
    static getInvalid<T extends SchemaDefinition>(df: DataFrame, schema: DataFrameSchema<T>): DataFrame;
}
export interface ValidationOptions {
    stopOnFirst?: boolean;
    coerce?: boolean;
}
export declare class SchemaBuilders {
    static numeric(min?: number, max?: number): z.ZodNumber;
    static string(minLength?: number, maxLength?: number): z.ZodString;
    static email(): z.ZodString;
    static url(): z.ZodString;
    static date(): z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
    static enum(values: [string, ...string[]]): z.ZodEnum<[string, ...string[]]>;
    static optional<T extends z.ZodTypeAny>(schema: T): z.ZodOptional<T>;
    static nullable<T extends z.ZodTypeAny>(schema: T): z.ZodNullable<T>;
    static array<T extends z.ZodTypeAny>(schema: T): z.ZodArray<T>;
}
export declare const CommonSchemas: {
    person: DataFrameSchema<{
        name: z.ZodString;
        age: z.ZodNumber;
        email: z.ZodOptional<z.ZodString>;
    }>;
    product: DataFrameSchema<{
        id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        name: z.ZodString;
        price: z.ZodNumber;
        category: z.ZodString;
        inStock: z.ZodOptional<z.ZodBoolean>;
    }>;
    transaction: DataFrameSchema<{
        id: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodEnum<["USD", "EUR", "GBP", "JPY"]>;
        date: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
        description: z.ZodOptional<z.ZodString>;
    }>;
    coordinate: DataFrameSchema<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        altitude: z.ZodOptional<z.ZodNumber>;
    }>;
};
declare module '../core/dataframe.js' {
    interface DataFrame {
        validate<T extends SchemaDefinition>(schema: DataFrameSchema<T>, options?: ValidationOptions): ValidationResult;
        validateAndTransform<T extends SchemaDefinition>(schema: DataFrameSchema<T>): DataFrame;
        filterValid<T extends SchemaDefinition>(schema: DataFrameSchema<T>): DataFrame;
        getInvalid<T extends SchemaDefinition>(schema: DataFrameSchema<T>): DataFrame;
    }
}
//# sourceMappingURL=schema.d.ts.map