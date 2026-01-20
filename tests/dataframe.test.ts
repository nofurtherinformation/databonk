import { DataFrame } from '../src/core/dataframe';
import { Column } from '../src/core/column';

describe('DataFrame', () => {
  const sampleData = [
    { name: 'Alice', age: 25, city: 'NYC', salary: 50000 },
    { name: 'Bob', age: 30, city: 'LA', salary: 60000 },
    { name: 'Charlie', age: 35, city: 'Chicago', salary: 70000 },
    { name: 'Diana', age: 28, city: 'NYC', salary: 55000 }
  ];

  describe('construction', () => {
    test('creates DataFrame from row objects', () => {
      const df = DataFrame.fromRows(sampleData);
      expect(df.length).toBe(4);
      expect(df.columnCount).toBe(4);
      expect(df.columnNames).toEqual(['name', 'age', 'city', 'salary']);
    });

    test('creates DataFrame from columns', () => {
      const df = DataFrame.fromColumns({
        name: ['Alice', 'Bob'],
        age: [25, 30]
      });
      expect(df.length).toBe(2);
      expect(df.columnNames).toEqual(['name', 'age']);
    });

    test('creates DataFrame from Column objects', () => {
      const nameCol = new Column('name', ['Alice', 'Bob']);
      const ageCol = new Column('age', [25, 30]);
      const df = new DataFrame([nameCol, ageCol]);
      expect(df.length).toBe(2);
      expect(df.columnNames).toEqual(['name', 'age']);
    });

    test('throws error for mismatched column lengths', () => {
      const nameCol = new Column('name', ['Alice', 'Bob']);
      const ageCol = new Column('age', [25, 30, 35]); // different length
      expect(() => new DataFrame([nameCol, ageCol])).toThrow();
    });

    test('handles empty DataFrame', () => {
      const df = new DataFrame({});
      expect(df.length).toBe(0);
      expect(df.columnCount).toBe(0);
    });
  });

  describe('basic operations', () => {
    let df: DataFrame;

    beforeEach(() => {
      df = DataFrame.fromRows(sampleData);
    });

    test('gets column by name', () => {
      const nameCol = df.column('name');
      expect(nameCol.name).toBe('name');
      expect(nameCol.get(0)).toBe('Alice');
    });

    test('checks if column exists', () => {
      expect(df.hasColumn('name')).toBe(true);
      expect(df.hasColumn('nonexistent')).toBe(false);
    });

    test('gets row by index', () => {
      const row = df.getRow(1);
      expect(row).toEqual({ name: 'Bob', age: 30, city: 'LA', salary: 60000 });
    });

    test('throws error for invalid row index', () => {
      expect(() => df.getRow(-1)).toThrow();
      expect(() => df.getRow(10)).toThrow();
    });

    test('iterates over rows', () => {
      const rows = Array.from(df.rows());
      expect(rows).toHaveLength(4);
      expect(rows[0]).toEqual(sampleData[0]);
    });

    test('converts to array', () => {
      expect(df.toArray()).toEqual(sampleData);
    });

    test('converts to columns format', () => {
      const columns = df.toColumns();
      expect(columns.name).toEqual(['Alice', 'Bob', 'Charlie', 'Diana']);
      expect(columns.age).toEqual([25, 30, 35, 28]);
    });
  });

  describe('selection and filtering', () => {
    let df: DataFrame;

    beforeEach(() => {
      df = DataFrame.fromRows(sampleData);
    });

    test('selects columns', () => {
      const selected = df.select(['name', 'age']);
      expect(selected.columnNames).toEqual(['name', 'age']);
      expect(selected.length).toBe(4);
    });

    test('throws error when selecting nonexistent column', () => {
      expect(() => df.select(['nonexistent'])).toThrow();
    });

    test('filters rows', () => {
      const filtered = df.filter(row => row.age > 30);
      expect(filtered.length).toBe(1);
      expect(filtered.getRow(0).name).toBe('Charlie');
    });

    test('slices DataFrame', () => {
      const sliced = df.slice(1, 3);
      expect(sliced.length).toBe(2);
      expect(sliced.getRow(0).name).toBe('Bob');
      expect(sliced.getRow(1).name).toBe('Charlie');
    });

    test('gets head of DataFrame', () => {
      const head = df.head(2);
      expect(head.length).toBe(2);
      expect(head.getRow(0).name).toBe('Alice');
    });

    test('gets tail of DataFrame', () => {
      const tail = df.tail(2);
      expect(tail.length).toBe(2);
      expect(tail.getRow(0).name).toBe('Charlie');
      expect(tail.getRow(1).name).toBe('Diana');
    });
  });

  describe('column operations', () => {
    let df: DataFrame;

    beforeEach(() => {
      df = DataFrame.fromRows(sampleData);
    });

    test('adds column', () => {
      const newCol = new Column('bonus', [5000, 6000, 7000, 5500]);
      const newDf = df.addColumn(newCol);
      expect(newDf.columnCount).toBe(5);
      expect(newDf.hasColumn('bonus')).toBe(true);
    });

    test('removes column', () => {
      const newDf = df.removeColumn('city');
      expect(newDf.columnCount).toBe(3);
      expect(newDf.hasColumn('city')).toBe(false);
    });

    test('throws error when removing nonexistent column', () => {
      expect(() => df.removeColumn('nonexistent')).toThrow();
    });

    test('drops multiple columns', () => {
      const newDf = df.drop(['city', 'salary']);
      expect(newDf.columnNames).toEqual(['name', 'age']);
    });

    test('renames columns', () => {
      const renamed = df.rename({ name: 'full_name', age: 'years' });
      expect(renamed.columnNames).toContain('full_name');
      expect(renamed.columnNames).toContain('years');
      expect(renamed.columnNames).not.toContain('name');
      expect(renamed.columnNames).not.toContain('age');
    });
  });

  describe('sorting', () => {
    let df: DataFrame;

    beforeEach(() => {
      df = DataFrame.fromRows(sampleData);
    });

    test('sorts by numeric column ascending', () => {
      const sorted = df.sort('age');
      const ages = sorted.column('age').toArray();
      expect(ages).toEqual([25, 28, 30, 35]);
    });

    test('sorts by numeric column descending', () => {
      const sorted = df.sort('age', false);
      const ages = sorted.column('age').toArray();
      expect(ages).toEqual([35, 30, 28, 25]);
    });

    test('sorts by string column', () => {
      const sorted = df.sort('name');
      const names = sorted.column('name').toArray();
      expect(names).toEqual(['Alice', 'Bob', 'Charlie', 'Diana']);
    });

    test('throws error for nonexistent column', () => {
      expect(() => df.sort('nonexistent')).toThrow();
    });
  });

  test('handles null values in operations', () => {
    const dataWithNulls = [
      { name: 'Alice', age: 25, city: null },
      { name: null, age: null, city: 'LA' },
      { name: 'Charlie', age: 35, city: 'Chicago' }
    ];
    
    const df = DataFrame.fromRows(dataWithNulls);
    expect(df.length).toBe(3);
    
    const filtered = df.filter(row => row.name !== null);
    expect(filtered.length).toBe(2);
  });
});