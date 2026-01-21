import { DataFrame } from '../src/core/dataframe';
import { IndexManager } from '../src/core/index-manager';
import '../src/operations/join';

describe('Index Management', () => {
  const userData = [
    { id: 1, name: 'Alice', department: 'Engineering', age: 30 },
    { id: 2, name: 'Bob', department: 'Marketing', age: 25 },
    { id: 3, name: 'Charlie', department: 'Engineering', age: 35 },
    { id: 4, name: 'Diana', department: 'Sales', age: 28 },
    { id: 5, name: 'Eve', department: 'Engineering', age: 32 },
  ];

  let df: DataFrame;

  beforeEach(() => {
    df = DataFrame.fromRows(userData);
  });

  describe('createIndex', () => {
    test('creates a hash index on single column', () => {
      df.createIndex('id');

      expect(df.hasIndex('id')).toBe(true);
      expect(df.listIndices()).toContain('idx_hash_id');
    });

    test('creates a hash index on multiple columns', () => {
      df.createIndex(['department', 'age']);

      expect(df.hasIndex(['department', 'age'])).toBe(true);
      expect(df.listIndices()).toContain('idx_hash_department_age');
    });

    test('creates a sorted index', () => {
      df.createIndex('name', { type: 'sorted' });

      expect(df.hasIndex('name')).toBe(true);
      const index = df.getIndex(['name']);
      expect(index?.data.type).toBe('sorted');
    });

    test('creates a unique index', () => {
      df.createIndex('id', { type: 'unique' });

      expect(df.hasIndex('id')).toBe(true);
      const index = df.getIndex(['id']);
      expect(index?.data.type).toBe('unique');
    });

    test('allows custom index name', () => {
      df.createIndex('department', { name: 'my_dept_index' });

      expect(df.listIndices()).toContain('my_dept_index');
    });

    test('returns this for chaining', () => {
      const result = df.createIndex('id').createIndex('department');

      expect(result).toBe(df);
      expect(df.listIndices().length).toBe(2);
    });

    test('throws error for non-existent column', () => {
      expect(() => {
        df.createIndex('nonexistent');
      }).toThrow("Column 'nonexistent' not found");
    });

    test('throws error for duplicate index name', () => {
      df.createIndex('id', { name: 'my_index' });

      expect(() => {
        df.createIndex('name', { name: 'my_index' });
      }).toThrow("Index 'my_index' already exists");
    });
  });

  describe('unique index constraint', () => {
    test('throws error on duplicate values', () => {
      expect(() => {
        df.createIndex('department', { type: 'unique' });
      }).toThrow(/Duplicate value found/);
    });

    test('succeeds on truly unique column', () => {
      expect(() => {
        df.createIndex('id', { type: 'unique' });
      }).not.toThrow();
    });
  });

  describe('dropIndex', () => {
    test('drops an existing index', () => {
      df.createIndex('id');
      expect(df.hasIndex('id')).toBe(true);

      const dropped = df.dropIndex('idx_hash_id');

      expect(dropped).toBe(true);
      expect(df.hasIndex('id')).toBe(false);
    });

    test('returns false for non-existent index', () => {
      const dropped = df.dropIndex('nonexistent');
      expect(dropped).toBe(false);
    });
  });

  describe('hasIndex', () => {
    test('returns true for existing index by columns', () => {
      df.createIndex('department');
      expect(df.hasIndex('department')).toBe(true);
    });

    test('returns true for multi-column index', () => {
      df.createIndex(['department', 'age']);
      expect(df.hasIndex(['department', 'age'])).toBe(true);
    });

    test('returns false for non-existent index', () => {
      expect(df.hasIndex('name')).toBe(false);
    });
  });

  describe('getIndex', () => {
    test('returns index entry by name', () => {
      df.createIndex('id', { name: 'primary_key' });

      const index = df.getIndex('primary_key');

      expect(index).not.toBeNull();
      expect(index?.name).toBe('primary_key');
      expect(index?.columns).toEqual(['id']);
    });

    test('returns index entry by columns', () => {
      df.createIndex(['department', 'age']);

      const index = df.getIndex(['department', 'age']);

      expect(index).not.toBeNull();
      expect(index?.columns).toContain('department');
      expect(index?.columns).toContain('age');
    });

    test('returns null for non-existent index', () => {
      expect(df.getIndex('nonexistent')).toBeNull();
    });
  });

  describe('listIndices', () => {
    test('returns empty array when no indices', () => {
      expect(df.listIndices()).toEqual([]);
    });

    test('returns all index names', () => {
      df.createIndex('id', { name: 'idx_id' });
      df.createIndex('department', { name: 'idx_dept' });

      const indices = df.listIndices();

      expect(indices).toContain('idx_id');
      expect(indices).toContain('idx_dept');
    });
  });
});

describe('IndexManager', () => {
  const userData = [
    { id: 1, name: 'Alice', score: 85 },
    { id: 2, name: 'Bob', score: 92 },
    { id: 3, name: 'Charlie', score: 78 },
  ];

  let df: DataFrame;
  let manager: IndexManager;

  beforeEach(() => {
    df = DataFrame.fromRows(userData);
    manager = new IndexManager();
  });

  describe('lookup', () => {
    test('looks up values in hash index', () => {
      manager.createIndex(df, 'name', { type: 'hash' });

      const result = manager.lookup('idx_hash_name', 'Alice');

      expect(result.found).toBe(true);
      expect(result.indices).toEqual([0]);
    });

    test('looks up values in unique index', () => {
      manager.createIndex(df, 'id', { type: 'unique' });

      const result = manager.lookup('idx_unique_id', '2');

      expect(result.found).toBe(true);
      expect(result.indices).toEqual([1]);
    });

    test('looks up values in sorted index', () => {
      manager.createIndex(df, 'name', { type: 'sorted' });

      const result = manager.lookup('idx_sorted_name', 'Bob');

      expect(result.found).toBe(true);
      expect(result.indices).toEqual([1]);
    });

    test('returns not found for non-existent key', () => {
      manager.createIndex(df, 'name', { type: 'hash' });

      const result = manager.lookup('idx_hash_name', 'Zara');

      expect(result.found).toBe(false);
      expect(result.indices).toEqual([]);
    });
  });

  describe('toHashMap', () => {
    test('converts hash index to map', () => {
      manager.createIndex(df, 'name', { type: 'hash' });

      const map = manager.toHashMap('idx_hash_name');

      expect(map).not.toBeNull();
      expect(map?.get('Alice')).toEqual([0]);
      expect(map?.get('Bob')).toEqual([1]);
    });

    test('converts sorted index to map', () => {
      manager.createIndex(df, 'name', { type: 'sorted' });

      const map = manager.toHashMap('idx_sorted_name');

      expect(map).not.toBeNull();
      expect(map?.get('Alice')).toEqual([0]);
    });

    test('converts unique index to map', () => {
      manager.createIndex(df, 'id', { type: 'unique' });

      const map = manager.toHashMap('idx_unique_id');

      expect(map).not.toBeNull();
      expect(map?.get('1')).toEqual([0]);
    });
  });

  describe('getIndexForColumns', () => {
    test('finds exact match', () => {
      manager.createIndex(df, ['id', 'name']);

      const index = manager.getIndexForColumns(['id', 'name']);

      expect(index).not.toBeNull();
    });

    test('returns null when no matching index', () => {
      manager.createIndex(df, 'id');

      const index = manager.getIndexForColumns(['name']);

      expect(index).toBeNull();
    });
  });
});

describe('Indexed Joins', () => {
  const users = [
    { user_id: 1, name: 'Alice' },
    { user_id: 2, name: 'Bob' },
    { user_id: 3, name: 'Charlie' },
    { user_id: 4, name: 'Diana' },
  ];

  const orders = [
    { order_id: 101, user_id: 1, amount: 100 },
    { order_id: 102, user_id: 2, amount: 200 },
    { order_id: 103, user_id: 1, amount: 150 },
    { order_id: 104, user_id: 5, amount: 300 }, // no matching user
  ];

  let usersDf: DataFrame;
  let ordersDf: DataFrame;

  beforeEach(() => {
    usersDf = DataFrame.fromRows(users);
    ordersDf = DataFrame.fromRows(orders);
  });

  test('uses existing hash index for join', () => {
    usersDf.createIndex('user_id', { type: 'hash' });
    ordersDf.createIndex('user_id', { type: 'hash' });

    const result = usersDf.join(ordersDf, 'user_id', 'inner');

    expect(result.length).toBe(3); // Alice twice, Bob once
    expect(result.columnNames).toContain('name');
    expect(result.columnNames).toContain('amount');
  });

  test('uses existing unique index for join', () => {
    usersDf.createIndex('user_id', { type: 'unique' });

    const result = usersDf.join(ordersDf, 'user_id', 'inner');

    expect(result.length).toBe(3);
  });

  test('join results match with and without indices', () => {
    // Join without indices
    const resultWithoutIndex = usersDf.join(ordersDf, 'user_id', 'left');

    // Create new DataFrames with indices
    const usersIndexed = DataFrame.fromRows(users).createIndex('user_id');
    const ordersIndexed = DataFrame.fromRows(orders).createIndex('user_id');

    const resultWithIndex = usersIndexed.join(ordersIndexed, 'user_id', 'left');

    expect(resultWithIndex.length).toBe(resultWithoutIndex.length);
    expect(resultWithIndex.columnNames).toEqual(resultWithoutIndex.columnNames);
  });

  test('useIndices option can be disabled', () => {
    usersDf.createIndex('user_id');
    ordersDf.createIndex('user_id');

    const result = usersDf.join(ordersDf, 'user_id', 'inner', { useIndices: false });

    expect(result.length).toBe(3);
  });
});

describe('Sort-Merge Join', () => {
  const sales = [
    { region: 'East', year: 2022, revenue: 1000 },
    { region: 'East', year: 2023, revenue: 1200 },
    { region: 'North', year: 2022, revenue: 800 },
    { region: 'North', year: 2023, revenue: 900 },
    { region: 'South', year: 2023, revenue: 600 },
    { region: 'West', year: 2022, revenue: 700 },
  ];

  const targets = [
    { region: 'East', year: 2022, target: 950 },
    { region: 'East', year: 2023, target: 1100 },
    { region: 'North', year: 2022, target: 750 },
    { region: 'North', year: 2023, target: 850 },
    { region: 'West', year: 2023, target: 500 }, // no matching sales
  ];

  let salesDf: DataFrame;
  let targetsDf: DataFrame;

  beforeEach(() => {
    salesDf = DataFrame.fromRows(sales);
    targetsDf = DataFrame.fromRows(targets);
  });

  test('explicit sort-merge join produces correct results', () => {
    const result = salesDf.join(targetsDf, ['region', 'year'], 'inner', {
      algorithm: 'sort-merge',
    });

    expect(result.length).toBe(4); // 4 matching region-year combinations
    expect(result.hasColumn('revenue')).toBe(true);
    expect(result.hasColumn('target')).toBe(true);
  });

  test('sort-merge join matches hash join results', () => {
    const hashResult = salesDf.join(targetsDf, ['region', 'year'], 'inner', {
      algorithm: 'hash',
    });

    const mergeResult = salesDf.join(targetsDf, ['region', 'year'], 'inner', {
      algorithm: 'sort-merge',
    });

    expect(mergeResult.length).toBe(hashResult.length);

    // Verify same data (may be in different order)
    const hashRows = hashResult.toArray().sort((a, b) =>
      `${a.region}${a.year}`.localeCompare(`${b.region}${b.year}`)
    );
    const mergeRows = mergeResult.toArray().sort((a, b) =>
      `${a.region}${a.year}`.localeCompare(`${b.region}${b.year}`)
    );

    expect(mergeRows).toEqual(hashRows);
  });

  test('sort-merge left join keeps unmatched left rows', () => {
    const result = salesDf.join(targetsDf, ['region', 'year'], 'left', {
      algorithm: 'sort-merge',
    });

    // Should have all 6 sales rows
    expect(result.length).toBe(6);

    // South 2023 and West 2022 should have null targets
    const southRow = result.filter(r => r.region === 'South').getRow(0);
    expect(southRow.target).toBeNull();
  });

  test('sort-merge right join keeps unmatched right rows', () => {
    const result = salesDf.join(targetsDf, ['region', 'year'], 'right', {
      algorithm: 'sort-merge',
    });

    // Should have 4 matches + 1 unmatched (West 2023)
    expect(result.length).toBe(5);

    const westRow = result.filter(r => r.region === 'West' && r.year === 2023).getRow(0);
    expect(westRow.revenue).toBeNull();
    expect(westRow.target).toBe(500);
  });

  test('sort-merge outer join keeps all rows', () => {
    const result = salesDf.join(targetsDf, ['region', 'year'], 'outer', {
      algorithm: 'sort-merge',
    });

    // 4 matches + 2 unmatched left (South 2023, West 2022) + 1 unmatched right (West 2023)
    expect(result.length).toBe(7);
  });

  test('uses sorted indices when available with auto algorithm', () => {
    // Create sorted indices
    salesDf.createIndex(['region', 'year'], { type: 'sorted' });
    targetsDf.createIndex(['region', 'year'], { type: 'sorted' });

    // Auto should pick sort-merge for sorted indices
    const result = salesDf.join(targetsDf, ['region', 'year'], 'inner');

    expect(result.length).toBe(4);
  });
});

describe('Join with JoinOptions object', () => {
  const left = [
    { id: 1, value: 'A', common: 'X' },
    { id: 2, value: 'B', common: 'Y' },
  ];

  const right = [
    { id: 1, value: 'C', common: 'Z' },
    { id: 2, value: 'D', common: 'W' },
  ];

  let leftDf: DataFrame;
  let rightDf: DataFrame;

  beforeEach(() => {
    leftDf = DataFrame.fromRows(left);
    rightDf = DataFrame.fromRows(right);
  });

  test('accepts suffixes in options object', () => {
    const result = leftDf.join(rightDf, 'id', 'inner', {
      suffixes: ['_left', '_right'],
    });

    expect(result.hasColumn('value_left')).toBe(true);
    expect(result.hasColumn('value_right')).toBe(true);
  });

  test('accepts all options together', () => {
    leftDf.createIndex('id');
    rightDf.createIndex('id');

    const result = leftDf.join(rightDf, 'id', 'inner', {
      suffixes: ['_l', '_r'],
      algorithm: 'hash',
      useIndices: true,
    });

    expect(result.length).toBe(2);
    expect(result.hasColumn('value_l')).toBe(true);
    expect(result.hasColumn('value_r')).toBe(true);
  });

  test('backward compatible with array suffixes', () => {
    const result = leftDf.join(rightDf, 'id', 'inner', ['_a', '_b']);

    expect(result.hasColumn('value_a')).toBe(true);
    expect(result.hasColumn('value_b')).toBe(true);
  });
});

describe('Index Creation at Construction', () => {
  const userData = [
    { id: 1, name: 'Alice', department: 'Engineering', age: 30 },
    { id: 2, name: 'Bob', department: 'Marketing', age: 25 },
    { id: 3, name: 'Charlie', department: 'Engineering', age: 35 },
    { id: 4, name: 'Diana', department: 'Sales', age: 28 },
    { id: 5, name: 'Eve', department: 'Engineering', age: 32 },
  ];

  describe('DataFrame.fromRows with indices option', () => {
    test('creates single hash index', () => {
      const df = DataFrame.fromRows(userData, {
        indices: [{ columns: 'department' }],
      });

      expect(df.hasIndex('department')).toBe(true);
      expect(df.listIndices()).toHaveLength(1);
    });

    test('creates unique index', () => {
      const df = DataFrame.fromRows(userData, {
        indices: [{ columns: 'id', type: 'unique' }],
      });

      expect(df.hasIndex('id')).toBe(true);
      const index = df.getIndex(['id']);
      expect(index?.data.type).toBe('unique');
    });

    test('creates sorted index', () => {
      const df = DataFrame.fromRows(userData, {
        indices: [{ columns: 'name', type: 'sorted' }],
      });

      expect(df.hasIndex('name')).toBe(true);
      const index = df.getIndex(['name']);
      expect(index?.data.type).toBe('sorted');
    });

    test('creates multi-column index', () => {
      const df = DataFrame.fromRows(userData, {
        indices: [{ columns: ['department', 'age'], type: 'sorted' }],
      });

      expect(df.hasIndex(['department', 'age'])).toBe(true);
    });

    test('creates multiple indices', () => {
      const df = DataFrame.fromRows(userData, {
        indices: [
          { columns: 'id', type: 'unique' },
          { columns: 'department' },
          { columns: ['name', 'age'], type: 'sorted' },
        ],
      });

      expect(df.listIndices()).toHaveLength(3);
      expect(df.hasIndex('id')).toBe(true);
      expect(df.hasIndex('department')).toBe(true);
      expect(df.hasIndex(['name', 'age'])).toBe(true);
    });

    test('creates index with custom name', () => {
      const df = DataFrame.fromRows(userData, {
        indices: [{ columns: 'id', type: 'unique', name: 'primary_key' }],
      });

      expect(df.listIndices()).toContain('primary_key');
    });

    test('is chainable', () => {
      const df = DataFrame.fromRows(userData, {
        indices: [{ columns: 'id', type: 'unique' }],
      }).filter(row => row.age > 25);

      expect(df.length).toBe(4);
    });
  });

  describe('DataFrame.fromColumns with indices option', () => {
    const columnData = {
      id: [1, 2, 3],
      name: ['Alice', 'Bob', 'Charlie'],
      score: [85, 92, 78],
    };

    test('creates indices from column data', () => {
      const df = DataFrame.fromColumns(columnData, {
        indices: [
          { columns: 'id', type: 'unique' },
          { columns: 'name' },
        ],
      });

      expect(df.hasIndex('id')).toBe(true);
      expect(df.hasIndex('name')).toBe(true);
    });
  });

  describe('DataFrame.from with indices option', () => {
    test('creates indices from row array', () => {
      const df = DataFrame.from(userData, {
        indices: [{ columns: 'id', type: 'unique' }],
      });

      expect(df.hasIndex('id')).toBe(true);
    });

    test('creates indices from column object', () => {
      const df = DataFrame.from(
        {
          id: [1, 2, 3],
          value: ['a', 'b', 'c'],
        },
        {
          indices: [{ columns: 'id', type: 'unique' }],
        }
      );

      expect(df.hasIndex('id')).toBe(true);
    });
  });

  describe('error handling', () => {
    test('throws error for non-existent column in index', () => {
      expect(() => {
        DataFrame.fromRows(userData, {
          indices: [{ columns: 'nonexistent' }],
        });
      }).toThrow("Column 'nonexistent' not found");
    });

    test('throws error for duplicate values in unique index', () => {
      expect(() => {
        DataFrame.fromRows(userData, {
          indices: [{ columns: 'department', type: 'unique' }],
        });
      }).toThrow(/Duplicate value found/);
    });
  });

  describe('empty options', () => {
    test('works without indices option', () => {
      const df = DataFrame.fromRows(userData, {});

      expect(df.listIndices()).toHaveLength(0);
      expect(df.length).toBe(5);
    });

    test('works without options parameter', () => {
      const df = DataFrame.fromRows(userData);

      expect(df.listIndices()).toHaveLength(0);
      expect(df.length).toBe(5);
    });
  });
});
