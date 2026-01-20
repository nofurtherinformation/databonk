import '../src/io/csv';
import { DataFrame } from '../src/core/dataframe';
import { CsvReader } from '../src/io/csv';

describe('CSV Operations', () => {
  describe('CSV Reading', () => {
    test('reads simple CSV with headers', () => {
      const csvData = `name,age,city
Alice,25,NYC
Bob,30,LA
Charlie,35,Chicago`;

      const df = CsvReader.fromString(csvData);
      
      expect(df.length).toBe(3);
      expect(df.columnNames).toEqual(['name', 'age', 'city']);
      expect(df.getRow(0)).toEqual({ name: 'Alice', age: 25, city: 'NYC' });
      expect(df.getRow(1)).toEqual({ name: 'Bob', age: 30, city: 'LA' });
    });

    test('reads CSV without headers', () => {
      const csvData = `Alice,25,NYC
Bob,30,LA`;

      const df = CsvReader.fromString(csvData, { header: false });
      
      expect(df.length).toBe(2);
      expect(df.columnNames).toEqual(['col_0', 'col_1', 'col_2']);
      expect(df.getRow(0)).toEqual({ col_0: 'Alice', col_1: 25, col_2: 'NYC' });
    });

    test('handles custom delimiter', () => {
      const csvData = `name|age|city
Alice|25|NYC
Bob|30|LA`;

      const df = CsvReader.fromString(csvData, { delimiter: '|' });
      
      expect(df.length).toBe(2);
      expect(df.getRow(0)).toEqual({ name: 'Alice', age: 25, city: 'NYC' });
    });

    test('handles quoted values with commas', () => {
      const csvData = `name,description,price
Apple,"Red, crisp fruit",1.20
Banana,"Yellow, tropical",0.80`;

      const df = CsvReader.fromString(csvData);
      
      expect(df.getRow(0).description).toBe('Red, crisp fruit');
      expect(df.getRow(1).description).toBe('Yellow, tropical');
    });

    test('handles escaped quotes', () => {
      const csvData = `name,quote
Alice,"She said ""Hello"" to me"
Bob,"He replied ""Hi there!""!"`;

      const df = CsvReader.fromString(csvData);
      
      expect(df.getRow(0).quote).toBe('She said "Hello" to me');
      expect(df.getRow(1).quote).toBe('He replied "Hi there!"!');
    });

    test('handles empty values and nulls', () => {
      const csvData = `name,age,city
Alice,,NYC
,30,
Charlie,35,null`;

      const df = CsvReader.fromString(csvData);
      
      expect(df.getRow(0)).toEqual({ name: 'Alice', age: null, city: 'NYC' });
      expect(df.getRow(1)).toEqual({ name: null, age: 30, city: null });
      expect(df.getRow(2)).toEqual({ name: 'Charlie', age: 35, city: null });
    });

    test('infers data types correctly', () => {
      const csvData = `name,age,salary,active
Alice,25,50000.50,true
Bob,30,60000,false`;

      const df = CsvReader.fromString(csvData);
      
      const row = df.getRow(0);
      expect(typeof row.name).toBe('string');
      expect(typeof row.age).toBe('number');
      expect(typeof row.salary).toBe('number');
      expect(typeof row.active).toBe('boolean');
      expect(row.salary).toBe(50000.50);
    });

    test('skips rows when specified', () => {
      const csvData = `# This is a comment
# Another comment
name,age,city
Alice,25,NYC
Bob,30,LA`;

      const df = CsvReader.fromString(csvData, { skipRows: 2 });
      
      expect(df.length).toBe(2);
      expect(df.columnNames).toEqual(['name', 'age', 'city']);
    });

    test('handles empty CSV', () => {
      const csvData = '';
      const df = CsvReader.fromString(csvData);
      
      expect(df.length).toBe(0);
      expect(df.columnCount).toBe(0);
    });

    test('disables type inference when requested', () => {
      const csvData = `name,age
Alice,25
Bob,30`;

      const df = CsvReader.fromString(csvData, { inferTypes: false });
      
      const row = df.getRow(0);
      expect(typeof row.age).toBe('string');
      expect(row.age).toBe('25');
    });
  });

  describe('CSV Writing', () => {
    let df: DataFrame;

    beforeEach(() => {
      df = DataFrame.fromRows([
        { name: 'Alice', age: 25, city: 'NYC', salary: 50000.50 },
        { name: 'Bob', age: 30, city: 'LA', salary: 60000 },
        { name: 'Charlie', age: null, city: 'Chicago', salary: null }
      ]);
    });

    test('writes CSV with headers', () => {
      const csv = df.toCsv();
      const lines = csv.split('\n');
      
      expect(lines[0]).toBe('name,age,city,salary');
      expect(lines[1]).toBe('Alice,25,NYC,50000.5');
      expect(lines[2]).toBe('Bob,30,LA,60000');
      expect(lines[3]).toBe('Charlie,,Chicago,');
    });

    test('writes CSV without headers', () => {
      const csv = df.toCsv({ header: false });
      const lines = csv.split('\n');
      
      expect(lines[0]).toBe('Alice,25,NYC,50000.5');
      expect(lines[1]).toBe('Bob,30,LA,60000');
    });

    test('uses custom delimiter', () => {
      const csv = df.toCsv({ delimiter: '|' });
      const lines = csv.split('\n');
      
      expect(lines[0]).toBe('name|age|city|salary');
      expect(lines[1]).toBe('Alice|25|NYC|50000.5');
    });

    test('escapes values with delimiters and quotes', () => {
      const specialDf = DataFrame.fromRows([
        { name: 'Alice, Jr.', description: 'She said "Hello"', value: 100 }
      ]);
      
      const csv = specialDf.toCsv();
      const lines = csv.split('\n');
      
      expect(lines[1]).toBe('"Alice, Jr.","She said ""Hello""",100');
    });

    test('handles newlines in data', () => {
      const specialDf = DataFrame.fromRows([
        { name: 'Alice', description: 'Line 1\nLine 2' }
      ]);
      
      const csv = specialDf.toCsv();
      expect(csv).toContain('"Line 1\nLine 2"');
    });
  });

  describe('Round-trip consistency', () => {
    test('maintains data integrity through read-write cycle', () => {
      const originalData = [
        { name: 'Alice', age: 25, city: 'NYC', active: true },
        { name: 'Bob', age: 30, city: 'LA', active: false },
        { name: 'Charlie', age: null, city: 'Chicago', active: true }
      ];
      
      const df1 = DataFrame.fromRows(originalData);
      const csv = df1.toCsv();
      const df2 = CsvReader.fromString(csv);
      
      expect(df2.length).toBe(df1.length);
      expect(df2.columnNames).toEqual(df1.columnNames);
      
      // Note: null values become null after round-trip
      const row0 = df2.getRow(0);
      expect(row0.name).toBe('Alice');
      expect(row0.age).toBe(25);
      expect(row0.active).toBe(true);
      
      const row2 = df2.getRow(2);
      expect(row2.name).toBe('Charlie');
      expect(row2.age).toBeNull();
      expect(row2.active).toBe(true);
    });
  });
});