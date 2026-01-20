export type DataType = 'int8' | 'int16' | 'int32' | 'float32' | 'float64' | 'string' | 'boolean';
export type TypedArrayConstructor = Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export type TypedArrayInstance = Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
export declare const TYPE_CONSTRUCTORS: Record<DataType, TypedArrayConstructor | null>;
export declare function inferDataType(value: any): DataType;
export declare function inferArrayDataType(values: any[]): DataType;
//# sourceMappingURL=types.d.ts.map