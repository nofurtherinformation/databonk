import '../src/operations/groupby';
import { DataFrame } from '../src/core/dataframe';

describe('GroupBy Operations', () => {
  const salesData = [
    { product: 'Apple', region: 'North', quantity: 100, price: 1.2 },
    { product: 'Apple', region: 'South', quantity: 80, price: 1.3 },
    { product: 'Banana', region: 'North', quantity: 150, price: 0.8 },
    { product: 'Banana', region: 'South', quantity: 200, price: 0.9 },
    { product: 'Cherry', region: 'North', quantity: 50, price: 2.5 },
    { product: 'Apple', region: 'North', quantity: 120, price: 1.1 }
  ];

  let df: DataFrame;

  beforeEach(() => {
    df = DataFrame.fromRows(salesData);
  });

  describe('basic groupby operations', () => {
    test('groups by single column and aggregates', () => {
      const grouped = df.groupBy(['product']).agg({
        quantity: 'sum',
        price: 'mean'
      });
      
      expect(grouped.length).toBe(3); // Apple, Banana, Cherry
      expect(grouped.hasColumn('product')).toBe(true);
      expect(grouped.hasColumn('quantity')).toBe(true);
      expect(grouped.hasColumn('price')).toBe(true);
      
      // Check Apple totals (100 + 80 + 120 = 300)
      const appleRow = grouped.filter(row => row.product === 'Apple').getRow(0);
      expect(appleRow.quantity).toBe(300);
    });

    test('groups by multiple columns', () => {
      const grouped = df.groupBy(['product', 'region']).agg({
        quantity: 'sum'
      });
      
      expect(grouped.length).toBe(5); // unique product-region combinations
      expect(grouped.hasColumn('product')).toBe(true);
      expect(grouped.hasColumn('region')).toBe(true);
    });

    test('handles multiple aggregation functions', () => {
      const grouped = df.groupBy(['product']).agg({
        quantity: ['sum', 'mean', 'count'],
        price: 'mean'
      });
      
      expect(grouped.hasColumn('quantity_sum')).toBe(true);
      expect(grouped.hasColumn('quantity_mean')).toBe(true);
      expect(grouped.hasColumn('quantity_count')).toBe(true);
      expect(grouped.hasColumn('price')).toBe(true);
    });
  });

  describe('convenience methods', () => {
    test('count method', () => {
      const result = df.groupBy(['product']).count();
      
      expect(result.hasColumn('product')).toBe(true);
      expect(result.hasColumn('count')).toBe(true);
      
      const appleCount = result.filter(row => row.product === 'Apple').getRow(0).count;
      expect(appleCount).toBe(3); // Apple appears 3 times
    });

    test('sum method', () => {
      const result = df.groupBy(['region']).sum(['quantity']);
      
      const northRow = result.filter(row => row.region === 'North').getRow(0);
      expect(northRow.quantity).toBe(270); // 100 + 150 + 50 + 120
    });

    test('mean method', () => {
      const result = df.groupBy(['product']).mean(['price']);
      
      const appleRow = result.filter(row => row.product === 'Apple').getRow(0);
      expect(appleRow.price).toBeCloseTo((1.2 + 1.3 + 1.1) / 3, 2);
    });

    test('min and max methods', () => {
      const minResult = df.groupBy(['product']).min(['price']);
      const maxResult = df.groupBy(['product']).max(['price']);
      
      const appleMinRow = minResult.filter(row => row.product === 'Apple').getRow(0);
      const appleMaxRow = maxResult.filter(row => row.product === 'Apple').getRow(0);
      
      expect(appleMinRow.price).toBe(1.1);
      expect(appleMaxRow.price).toBe(1.3);
    });

    test('first method', () => {
      const result = df.groupBy(['product']).first();
      
      expect(result.length).toBe(3);
      const appleRow = result.filter(row => row.product === 'Apple').getRow(0);
      expect(appleRow.quantity).toBe(100); // first Apple entry
      expect(appleRow.region).toBe('North');
    });

    test('last method', () => {
      const result = df.groupBy(['product']).last();
      
      const appleRow = result.filter(row => row.product === 'Apple').getRow(0);
      expect(appleRow.quantity).toBe(120); // last Apple entry
      expect(appleRow.region).toBe('North');
    });

    test('size method', () => {
      const result = df.groupBy(['product']).size();
      
      expect(result.hasColumn('product')).toBe(true);
      expect(result.hasColumn('size')).toBe(true);
      
      const appleSizeRow = result.filter(row => row.product === 'Apple').getRow(0);
      expect(appleSizeRow.size).toBe(3);
    });
  });

  describe('edge cases', () => {
    test('handles null values in grouping columns', () => {
      const dataWithNulls = [
        { category: 'A', value: 10 },
        { category: null, value: 20 },
        { category: 'A', value: 30 },
        { category: null, value: 40 }
      ];
      
      const dfWithNulls = DataFrame.fromRows(dataWithNulls);
      const grouped = dfWithNulls.groupBy(['category']).sum(['value']);
      
      expect(grouped.length).toBe(2); // 'A' and null groups
      
      const nullGroup = grouped.filter(row => row.category === null).getRow(0);
      expect(nullGroup.value).toBe(60); // 20 + 40
    });

    test('handles single row groups', () => {
      const result = df.groupBy(['product']).agg({
        quantity: 'sum'
      });
      
      const cherryRow = result.filter(row => row.product === 'Cherry').getRow(0);
      expect(cherryRow.quantity).toBe(50); // only one Cherry entry
    });

    test('handles empty groups after filtering', () => {
      const filtered = df.filter(row => row.product === 'NonExistent');
      const grouped = filtered.groupBy(['product']).count();
      
      expect(grouped.length).toBe(0);
    });
  });

  test('preserves data types in group keys', () => {
    const numericGroups = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b' },
      { id: 1, value: 'c' }
    ];
    
    const df2 = DataFrame.fromRows(numericGroups);
    const grouped = df2.groupBy(['id']).count();
    
    const group1 = grouped.filter(row => row.id === 1).getRow(0);
    expect(typeof group1.id).toBe('number');
    expect(group1.count).toBe(2);
  });
});