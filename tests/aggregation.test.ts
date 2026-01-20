import '../src/operations/aggregation';
import { DataFrame } from '../src/core/dataframe';

describe('Aggregation Operations', () => {
  const salesData = [
    { product: 'Apple', region: 'North', quantity: 100, price: 1.2 },
    { product: 'Apple', region: 'South', quantity: 80, price: 1.3 },
    { product: 'Banana', region: 'North', quantity: 150, price: 0.8 },
    { product: 'Banana', region: 'South', quantity: 200, price: 0.9 },
    { product: 'Cherry', region: 'North', quantity: 50, price: 2.5 }
  ];

  let df: DataFrame;

  beforeEach(() => {
    df = DataFrame.fromRows(salesData);
  });

  describe('basic aggregations', () => {
    test('sum operation', () => {
      const result = df.sum(['quantity', 'price']);
      expect(result.length).toBe(1);
      // Total quantity: 580, total price: 6.7
    });

    test('mean operation', () => {
      const result = df.mean(['quantity']);
      expect(result.column('quantity_mean').get(0)).toBeCloseTo(116, 1);
    });

    test('count operation', () => {
      const result = df.count();
      expect(result.column('product_count').get(0)).toBe(5);
    });

    test('min and max operations', () => {
      const minResult = df.min(['quantity']);
      const maxResult = df.max(['quantity']);
      
      expect(minResult.column('quantity_min').get(0)).toBe(50);
      expect(maxResult.column('quantity_max').get(0)).toBe(200);
    });
  });

  describe('custom aggregations', () => {
    test('custom agg specification', () => {
      const result = df.agg({
        total_quantity: 'quantity',
        avg_price: 'price'
      });
      
      expect(result.length).toBe(1);
      expect(result.hasColumn('total_quantity')).toBe(true);
      expect(result.hasColumn('avg_price')).toBe(true);
    });

    test('multiple aggregations on same column', () => {
      const result = df.agg({
        quantity: ['sum', 'mean', 'count']
      });
      
      expect(result.hasColumn('quantity_sum')).toBe(true);
      expect(result.hasColumn('quantity_mean')).toBe(true);
      expect(result.hasColumn('quantity_count')).toBe(true);
    });
  });

  describe('describe operation', () => {
    test('generates summary statistics', () => {
      const result = df.describe();
      
      expect(result.hasColumn('stat')).toBe(true);
      expect(result.hasColumn('quantity')).toBe(true);
      expect(result.hasColumn('price')).toBe(true);
      
      const stats = result.column('stat').toArray();
      expect(stats).toContain('count');
      expect(stats).toContain('mean');
      expect(stats).toContain('std');
      expect(stats).toContain('min');
      expect(stats).toContain('max');
    });

    test('only includes numeric columns', () => {
      const result = df.describe();
      
      expect(result.hasColumn('quantity')).toBe(true);
      expect(result.hasColumn('price')).toBe(true);
      expect(result.hasColumn('product')).toBe(false); // string column
      expect(result.hasColumn('region')).toBe(false);  // string column
    });
  });

  test('handles empty DataFrame', () => {
    const empty = new DataFrame({});
    const result = empty.describe();
    expect(result.length).toBe(5); // 5 stat types
    expect(result.columnCount).toBe(1); // just the stat column
  });

  test('handles DataFrame with null values', () => {
    const dataWithNulls = [
      { value: 10 },
      { value: null },
      { value: 20 },
      { value: null },
      { value: 30 }
    ];
    
    const dfWithNulls = DataFrame.fromRows(dataWithNulls);
    const result = dfWithNulls.sum(['value']);
    
    expect(result.column('value_sum').get(0)).toBe(60); // 10 + 20 + 30
    
    const meanResult = dfWithNulls.mean(['value']);
    expect(meanResult.column('value_mean').get(0)).toBe(20); // 60 / 3
  });
});