import { DataFrame } from '../core/dataframe.js';
import { Column } from '../core/column.js';

export interface CsvOptions {
  delimiter?: string;
  header?: boolean;
  skipRows?: number;
  inferTypes?: boolean;
}

export class CsvReader {
  static fromString(csvString: string, options: CsvOptions = {}): DataFrame {
    const {
      delimiter = ',',
      header = true,
      skipRows = 0,
      inferTypes = true
    } = options;

    const lines = csvString.trim().split('\n').slice(skipRows);
    if (lines.length === 0) {
      return new DataFrame({});
    }

    const headerRow = header ? this.parseCsvLine(lines[0], delimiter) : 
                      lines[0].split(delimiter).map((_, i) => `col_${i}`);
    const dataLines = header ? lines.slice(1) : lines;

    const columns: Record<string, any[]> = {};
    headerRow.forEach(colName => {
      columns[colName] = [];
    });

    dataLines.forEach(line => {
      const values = this.parseCsvLine(line, delimiter);
      headerRow.forEach((colName, i) => {
        let value = values[i] || null;
        if (inferTypes && value !== null) {
          value = this.inferValue(value);
        }
        columns[colName].push(value);
      });
    });

    return DataFrame.fromColumns(columns);
  }

  static async fromUrl(url: string, options: CsvOptions = {}): Promise<DataFrame> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV from ${url}: ${response.statusText}`);
    }
    const csvString = await response.text();
    return this.fromString(csvString, options);
  }

  private static parseCsvLine(line: string, delimiter: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === delimiter && !inQuotes) {
        values.push(current.trim());
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }

    values.push(current.trim());
    return values;
  }

  private static inferValue(value: string): any {
    if (value === '' || value === 'null' || value === 'NULL') {
      return null;
    }

    if (value === 'true' || value === 'TRUE') return true;
    if (value === 'false' || value === 'FALSE') return false;

    const num = Number(value);
    if (!isNaN(num) && value.trim() !== '') {
      return num;
    }

    return value;
  }
}

export class CsvWriter {
  static toString(df: DataFrame, options: CsvOptions = {}): string {
    const { delimiter = ',', header = true } = options;
    
    const lines: string[] = [];
    
    if (header) {
      lines.push(df.columnNames.join(delimiter));
    }

    for (let i = 0; i < df.length; i++) {
      const row = df.getRow(i);
      const values = df.columnNames.map(colName => {
        const value = row[colName];
        return this.escapeValue(value, delimiter);
      });
      lines.push(values.join(delimiter));
    }

    return lines.join('\n');
  }

  private static escapeValue(value: any, delimiter: string): string {
    if (value === null || value === undefined) {
      return '';
    }

    const str = String(value);
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    
    return str;
  }
}

declare module '../core/dataframe.js' {
  interface DataFrame {
    toCsv(options?: CsvOptions): string;
  }
}

DataFrame.prototype.toCsv = function(options: CsvOptions = {}): string {
  return CsvWriter.toString(this, options);
};