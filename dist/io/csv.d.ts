import { DataFrame } from '../core/dataframe.js';
export interface CsvOptions {
    delimiter?: string;
    header?: boolean;
    skipRows?: number;
    inferTypes?: boolean;
}
export declare class CsvReader {
    static fromString(csvString: string, options?: CsvOptions): DataFrame;
    static fromUrl(url: string, options?: CsvOptions): Promise<DataFrame>;
    private static parseCsvLine;
    private static inferValue;
}
export declare class CsvWriter {
    static toString(df: DataFrame, options?: CsvOptions): string;
    private static escapeValue;
}
declare module '../core/dataframe.js' {
    interface DataFrame {
        toCsv(options?: CsvOptions): string;
    }
}
//# sourceMappingURL=csv.d.ts.map