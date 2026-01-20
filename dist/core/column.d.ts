import { DataType } from '../utils/types.js';
export declare class Column<T = any> {
    readonly name: string;
    readonly dataType: DataType;
    private data;
    private nullBitmap;
    readonly length: number;
    constructor(name: string, values: T[], dataType?: DataType);
    private createDataArray;
    get(index: number): T | null;
    isNull(index: number): boolean;
    slice(start?: number, end?: number): Column<T>;
    filter(predicate: (value: T | null, index: number) => boolean): Column<T>;
    map<U>(fn: (value: T | null, index: number) => U, newDataType?: DataType): Column<U>;
    sum(): number;
    mean(): number;
    min(): number;
    max(): number;
    count(): number;
    unique(): T[];
    values(): Iterator<T | null>;
    toArray(): (T | null)[];
    static from<T>(name: string, values: T[], dataType?: DataType): Column<T>;
}
//# sourceMappingURL=column.d.ts.map