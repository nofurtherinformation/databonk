export type DataType = 'int8' | 'int16' | 'int32' | 'float32' | 'float64' | 'string' | 'boolean';

export type TypedArrayConstructor = 
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor;

export type TypedArrayInstance = 
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array;

export const TYPE_CONSTRUCTORS: Record<DataType, TypedArrayConstructor | null> = {
  int8: Int8Array,
  int16: Int16Array,
  int32: Int32Array,
  float32: Float32Array,
  float64: Float64Array,
  string: null,
  boolean: null
};

export function inferDataType(value: any): DataType {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      if (value >= -128 && value <= 127) return 'int8';
      if (value >= -32768 && value <= 32767) return 'int16';
      if (value >= -2147483648 && value <= 2147483647) return 'int32';
    }
    return 'float64';
  }
  return 'float64';
}

export function inferArrayDataType(values: any[]): DataType {
  if (values.length === 0) return 'float64';
  
  let maxType: DataType = 'int8';
  
  for (const value of values) {
    if (value === null || value === undefined) continue;
    
    const type = inferDataType(value);
    if (type === 'string' || type === 'boolean') return type;
    
    if (type === 'float64' || type === 'float32') return 'float64';
    
    if (type === 'int32' && (maxType === 'int8' || maxType === 'int16')) {
      maxType = 'int32';
    } else if (type === 'int16' && maxType === 'int8') {
      maxType = 'int16';
    }
  }
  
  return maxType;
}