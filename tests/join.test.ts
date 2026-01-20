import '../src/operations/join';
import { DataFrame } from '../src/core/dataframe';

describe('Join Operations', () => {
  const employees = [
    { id: 1, name: 'Alice', dept_id: 10 },
    { id: 2, name: 'Bob', dept_id: 20 },
    { id: 3, name: 'Charlie', dept_id: 10 },
    { id: 4, name: 'Diana', dept_id: 30 }
  ];

  const departments = [
    { dept_id: 10, dept_name: 'Engineering', manager: 'John' },
    { dept_id: 20, dept_name: 'Marketing', manager: 'Jane' },
    { dept_id: 40, dept_name: 'Sales', manager: 'Mike' } // no matching employees
  ];

  let empDf: DataFrame;
  let deptDf: DataFrame;

  beforeEach(() => {
    empDf = DataFrame.fromRows(employees);
    deptDf = DataFrame.fromRows(departments);
  });

  describe('inner join', () => {
    test('joins on single column', () => {
      const result = empDf.join(deptDf, 'dept_id', 'inner');
      
      expect(result.length).toBe(3); // Alice, Bob, Charlie (Diana's dept not in departments)
      expect(result.columnNames).toContain('id');
      expect(result.columnNames).toContain('name');
      expect(result.columnNames).toContain('dept_id');
      expect(result.columnNames).toContain('dept_name');
      expect(result.columnNames).toContain('manager');
      
      const aliceRow = result.filter(row => row.name === 'Alice').getRow(0);
      expect(aliceRow.dept_name).toBe('Engineering');
      expect(aliceRow.manager).toBe('John');
    });

    test('joins on multiple columns', () => {
      const sales = [
        { year: 2023, quarter: 1, region: 'North', revenue: 100000 },
        { year: 2023, quarter: 2, region: 'North', revenue: 120000 },
        { year: 2023, quarter: 1, region: 'South', revenue: 80000 }
      ];

      const targets = [
        { year: 2023, quarter: 1, region: 'North', target: 95000 },
        { year: 2023, quarter: 2, region: 'North', target: 110000 },
        { year: 2023, quarter: 1, region: 'East', target: 70000 } // no matching sales
      ];

      const salesDf = DataFrame.fromRows(sales);
      const targetsDf = DataFrame.fromRows(targets);
      
      const result = salesDf.join(targetsDf, ['year', 'quarter', 'region'], 'inner');
      
      expect(result.length).toBe(2); // only 2 matching combinations
      expect(result.hasColumn('revenue')).toBe(true);
      expect(result.hasColumn('target')).toBe(true);
    });

    test('handles duplicate join keys', () => {
      const orders = [
        { customer_id: 1, order_id: 'A', amount: 100 },
        { customer_id: 1, order_id: 'B', amount: 200 },
        { customer_id: 2, order_id: 'C', amount: 150 }
      ];

      const customers = [
        { customer_id: 1, customer_name: 'Alice' },
        { customer_id: 1, customer_name: 'Alice' }, // duplicate
        { customer_id: 2, customer_name: 'Bob' }
      ];

      const ordersDf = DataFrame.fromRows(orders);
      const customersDf = DataFrame.fromRows(customers);
      
      const result = ordersDf.join(customersDf, 'customer_id', 'inner');
      
      expect(result.length).toBe(5); // 2*2 + 1*1 = 5 combinations
    });
  });

  describe('left join', () => {
    test('keeps all left rows', () => {
      const result = empDf.join(deptDf, 'dept_id', 'left');
      
      expect(result.length).toBe(4); // all employees kept
      
      const dianaRow = result.filter(row => row.name === 'Diana').getRow(0);
      expect(dianaRow.dept_name).toBeNull(); // no matching department
      expect(dianaRow.manager).toBeNull();
    });

    test('includes matched data where available', () => {
      const result = empDf.join(deptDf, 'dept_id', 'left');
      
      const aliceRow = result.filter(row => row.name === 'Alice').getRow(0);
      expect(aliceRow.dept_name).toBe('Engineering');
      expect(aliceRow.manager).toBe('John');
    });
  });

  describe('right join', () => {
    test('keeps all right rows', () => {
      const result = empDf.join(deptDf, 'dept_id', 'right');
      
      expect(result.length).toBe(4); // 3 matches + 1 unmatched department
      
      const salesRow = result.filter(row => row.dept_name === 'Sales').getRow(0);
      expect(salesRow.name).toBeNull(); // no matching employee
      expect(salesRow.id).toBeNull();
    });
  });

  describe('outer join', () => {
    test('keeps all rows from both sides', () => {
      const result = empDf.join(deptDf, 'dept_id', 'outer');
      
      expect(result.length).toBe(5); // 3 matches + 1 unmatched employee + 1 unmatched dept
      
      // Check unmatched employee (Diana)
      const dianaRow = result.filter(row => row.name === 'Diana').getRow(0);
      expect(dianaRow.dept_name).toBeNull();
      
      // Check unmatched department (Sales)
      const salesRow = result.filter(row => row.dept_name === 'Sales').getRow(0);
      expect(salesRow.name).toBeNull();
    });
  });

  describe('column naming with conflicts', () => {
    test('handles column name conflicts with suffixes', () => {
      const table1 = DataFrame.fromRows([
        { id: 1, value: 'A', common: 'X' },
        { id: 2, value: 'B', common: 'Y' }
      ]);

      const table2 = DataFrame.fromRows([
        { id: 1, value: 'C', common: 'Z' },
        { id: 2, value: 'D', common: 'W' }
      ]);

      const result = table1.join(table2, 'id', 'inner', ['_left', '_right']);
      
      expect(result.hasColumn('value_left')).toBe(true);
      expect(result.hasColumn('value_right')).toBe(true);
      expect(result.hasColumn('common_left')).toBe(true);
      expect(result.hasColumn('common_right')).toBe(true);
      expect(result.hasColumn('id')).toBe(true); // join key not suffixed
      
      const row1 = result.getRow(0);
      expect(row1.value_left).toBe('A');
      expect(row1.value_right).toBe('C');
    });
  });

  describe('error handling', () => {
    test('throws error for missing join column in left table', () => {
      expect(() => {
        empDf.join(deptDf, 'nonexistent_column', 'inner');
      }).toThrow();
    });

    test('throws error for missing join column in right table', () => {
      expect(() => {
        empDf.join(deptDf, 'name', 'inner'); // 'name' exists in left but not right
      }).toThrow();
    });

    test('throws error for invalid join type', () => {
      expect(() => {
        empDf.join(deptDf, 'dept_id', 'invalid' as any);
      }).toThrow();
    });
  });

  describe('null handling in join keys', () => {
    test('handles null values in join keys', () => {
      const leftData = [
        { key: 1, leftValue: 'A' },
        { key: null, leftValue: 'B' },
        { key: 2, leftValue: 'C' }
      ];

      const rightData = [
        { key: 1, rightValue: 'X' },
        { key: null, rightValue: 'Y' },
        { key: 3, rightValue: 'Z' }
      ];

      const leftDf = DataFrame.fromRows(leftData);
      const rightDf = DataFrame.fromRows(rightData);
      
      const result = leftDf.join(rightDf, 'key', 'inner');
      
      // Should match on key=1 and key=null
      expect(result.length).toBe(2);
      
      const nullKeyRow = result.filter(row => row.key === null).getRow(0);
      expect(nullKeyRow.leftValue).toBe('B');
      expect(nullKeyRow.rightValue).toBe('Y');
    });
  });
});