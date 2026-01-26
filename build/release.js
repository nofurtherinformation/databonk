async function instantiate(module, imports = {}) {
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    createDataFrame(rowCount, columnNames, columnTypes, dataPtrs) {
      // assembly/index/createDataFrame(i32, ~lib/array/Array<~lib/string/String>, ~lib/array/Array<i32>, ~lib/array/Array<usize>) => assembly/dataframe/dataframe/DataFrame
      columnNames = __retain(__lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, columnNames) || __notnull());
      columnTypes = __retain(__lowerArray(__setU32, 5, 2, columnTypes) || __notnull());
      dataPtrs = __lowerArray(__setU32, 6, 2, dataPtrs) || __notnull();
      try {
        return __liftInternref(exports.createDataFrame(rowCount, columnNames, columnTypes, dataPtrs) >>> 0);
      } finally {
        __release(columnNames);
        __release(columnTypes);
      }
    },
    getColumnPtr(df, columnName) {
      // assembly/index/getColumnPtr(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => usize
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.getColumnPtr(df, columnName) >>> 0;
      } finally {
        __release(df);
      }
    },
    getColumnLength(df, columnName) {
      // assembly/index/getColumnLength(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => i32
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.getColumnLength(df, columnName);
      } finally {
        __release(df);
      }
    },
    getRowCount(df) {
      // assembly/index/getRowCount(assembly/dataframe/dataframe/DataFrame) => i32
      df = __lowerInternref(df) || __notnull();
      return exports.getRowCount(df);
    },
    getColumnCount(df) {
      // assembly/index/getColumnCount(assembly/dataframe/dataframe/DataFrame) => i32
      df = __lowerInternref(df) || __notnull();
      return exports.getColumnCount(df);
    },
    innerJoin(left, right, leftKey, rightKey) {
      // assembly/index/innerJoin(assembly/dataframe/dataframe/DataFrame, assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/string/String) => assembly/dataframe/dataframe/DataFrame
      left = __retain(__lowerInternref(left) || __notnull());
      right = __retain(__lowerInternref(right) || __notnull());
      leftKey = __retain(__lowerString(leftKey) || __notnull());
      rightKey = __lowerString(rightKey) || __notnull();
      try {
        return __liftInternref(exports.innerJoin(left, right, leftKey, rightKey) >>> 0);
      } finally {
        __release(left);
        __release(right);
        __release(leftKey);
      }
    },
    groupBySum(df, keyColumn, valueColumns, maxKey) {
      // assembly/index/groupBySum(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/array/Array<~lib/string/String>, i32?) => assembly/dataframe/dataframe/DataFrame
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumn = __retain(__lowerString(keyColumn) || __notnull());
      valueColumns = __lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, valueColumns) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupBySum(df, keyColumn, valueColumns, maxKey) >>> 0);
      } finally {
        __release(df);
        __release(keyColumn);
      }
    },
    groupByMeanAgg(df, keyColumn, valueColumns, maxKey) {
      // assembly/index/groupByMeanAgg(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/array/Array<~lib/string/String>, i32?) => assembly/dataframe/dataframe/DataFrame
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumn = __retain(__lowerString(keyColumn) || __notnull());
      valueColumns = __lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, valueColumns) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupByMeanAgg(df, keyColumn, valueColumns, maxKey) >>> 0);
      } finally {
        __release(df);
        __release(keyColumn);
      }
    },
    allocateBuffer(byteLength) {
      // assembly/index/allocateBuffer(i32) => usize
      return exports.allocateBuffer(byteLength) >>> 0;
    },
    freeDataFrame(df) {
      // assembly/index/freeDataFrame(assembly/dataframe/dataframe/DataFrame) => void
      df = __lowerInternref(df) || __notnull();
      exports.freeDataFrame(df);
    },
    getColumnType(df, columnName) {
      // assembly/index/getColumnType(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => i32
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.getColumnType(df, columnName);
      } finally {
        __release(df);
      }
    },
    hasColumn(df, columnName) {
      // assembly/index/hasColumn(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => bool
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.hasColumn(df, columnName) != 0;
      } finally {
        __release(df);
      }
    },
    createEmptyDataFrameWithRows(rowCount) {
      // assembly/index/createEmptyDataFrameWithRows(i32) => assembly/dataframe/dataframe/DataFrame
      return __liftInternref(exports.createEmptyDataFrameWithRows(rowCount) >>> 0);
    },
    addInt32ColumnToDataFrame(df, name, dataPtr, length) {
      // assembly/index/addInt32ColumnToDataFrame(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, usize, i32) => void
      df = __retain(__lowerInternref(df) || __notnull());
      name = __lowerString(name) || __notnull();
      try {
        exports.addInt32ColumnToDataFrame(df, name, dataPtr, length);
      } finally {
        __release(df);
      }
    },
    addFloat32ColumnToDataFrame(df, name, dataPtr, length) {
      // assembly/index/addFloat32ColumnToDataFrame(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, usize, i32) => void
      df = __retain(__lowerInternref(df) || __notnull());
      name = __lowerString(name) || __notnull();
      try {
        exports.addFloat32ColumnToDataFrame(df, name, dataPtr, length);
      } finally {
        __release(df);
      }
    },
    addFloat64ColumnToDataFrame(df, name, dataPtr, length) {
      // assembly/index/addFloat64ColumnToDataFrame(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, usize, i32) => void
      df = __retain(__lowerInternref(df) || __notnull());
      name = __lowerString(name) || __notnull();
      try {
        exports.addFloat64ColumnToDataFrame(df, name, dataPtr, length);
      } finally {
        __release(df);
      }
    },
    addInt64ColumnToDataFrame(df, name, dataPtr, length) {
      // assembly/index/addInt64ColumnToDataFrame(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, usize, i32) => void
      df = __retain(__lowerInternref(df) || __notnull());
      name = __lowerString(name) || __notnull();
      try {
        exports.addInt64ColumnToDataFrame(df, name, dataPtr, length);
      } finally {
        __release(df);
      }
    },
    DataType: (values => (
      // assembly/core/numeric-column/DataType
      values[values.Int32 = 0] = "Int32",
      values[values.Int64 = 1] = "Int64",
      values[values.Float32 = 2] = "Float32",
      values[values.Float64 = 3] = "Float64",
      values
    ))({}),
    createInt32Column(length) {
      // assembly/core/numeric-column/createInt32Column(i32) => assembly/core/numeric-column/NumericColumn
      return __liftInternref(exports.createInt32Column(length) >>> 0);
    },
    createInt64Column(length) {
      // assembly/core/numeric-column/createInt64Column(i32) => assembly/core/numeric-column/NumericColumn
      return __liftInternref(exports.createInt64Column(length) >>> 0);
    },
    createFloat32Column(length) {
      // assembly/core/numeric-column/createFloat32Column(i32) => assembly/core/numeric-column/NumericColumn
      return __liftInternref(exports.createFloat32Column(length) >>> 0);
    },
    createFloat64Column(length) {
      // assembly/core/numeric-column/createFloat64Column(i32) => assembly/core/numeric-column/NumericColumn
      return __liftInternref(exports.createFloat64Column(length) >>> 0);
    },
    ColumnType: (values => (
      // assembly/core/schema/ColumnType
      values[values.Int32 = 0] = "Int32",
      values[values.Int64 = 1] = "Int64",
      values[values.Float32 = 2] = "Float32",
      values[values.Float64 = 3] = "Float64",
      values[values.String = 4] = "String",
      values
    ))({}),
    isNumericType(colType) {
      // assembly/core/schema/isNumericType(i32) => bool
      return exports.isNumericType(colType) != 0;
    },
    createEmptyDataFrame(rowCount) {
      // assembly/dataframe/dataframe/createEmptyDataFrame(i32) => assembly/dataframe/dataframe/DataFrame
      return __liftInternref(exports.createEmptyDataFrame(rowCount) >>> 0);
    },
    createDataFrameBuilder(rowCount) {
      // assembly/dataframe/builder/createDataFrameBuilder(i32) => assembly/dataframe/builder/DataFrameBuilder
      return __liftInternref(exports.createDataFrameBuilder(rowCount) >>> 0);
    },
    buildDataFrameFromArrays(rowCount, columnNames, columnTypes, dataPtrs) {
      // assembly/dataframe/builder/buildDataFrameFromArrays(i32, ~lib/array/Array<~lib/string/String>, ~lib/array/Array<i32>, ~lib/array/Array<usize>) => assembly/dataframe/dataframe/DataFrame
      columnNames = __retain(__lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, columnNames) || __notnull());
      columnTypes = __retain(__lowerArray(__setU32, 5, 2, columnTypes) || __notnull());
      dataPtrs = __lowerArray(__setU32, 6, 2, dataPtrs) || __notnull();
      try {
        return __liftInternref(exports.buildDataFrameFromArrays(rowCount, columnNames, columnTypes, dataPtrs) >>> 0);
      } finally {
        __release(columnNames);
        __release(columnTypes);
      }
    },
    columnSum(column) {
      // assembly/ops/aggregations/columnSum(assembly/core/numeric-column/NumericColumn) => f64
      column = __lowerInternref(column) || __notnull();
      return exports.columnSum(column);
    },
    columnMean(column) {
      // assembly/ops/aggregations/columnMean(assembly/core/numeric-column/NumericColumn) => f64
      column = __lowerInternref(column) || __notnull();
      return exports.columnMean(column);
    },
    columnMin(column) {
      // assembly/ops/aggregations/columnMin(assembly/core/numeric-column/NumericColumn) => f64
      column = __lowerInternref(column) || __notnull();
      return exports.columnMin(column);
    },
    columnMax(column) {
      // assembly/ops/aggregations/columnMax(assembly/core/numeric-column/NumericColumn) => f64
      column = __lowerInternref(column) || __notnull();
      return exports.columnMax(column);
    },
    columnCount(column) {
      // assembly/ops/aggregations/columnCount(assembly/core/numeric-column/NumericColumn) => i32
      column = __lowerInternref(column) || __notnull();
      return exports.columnCount(column);
    },
    columnVariance(column) {
      // assembly/ops/aggregations/columnVariance(assembly/core/numeric-column/NumericColumn) => f64
      column = __lowerInternref(column) || __notnull();
      return exports.columnVariance(column);
    },
    columnStdDev(column) {
      // assembly/ops/aggregations/columnStdDev(assembly/core/numeric-column/NumericColumn) => f64
      column = __lowerInternref(column) || __notnull();
      return exports.columnStdDev(column);
    },
    dfSum(df, columnName) {
      // assembly/ops/aggregations/dfSum(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => f64
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.dfSum(df, columnName);
      } finally {
        __release(df);
      }
    },
    dfMean(df, columnName) {
      // assembly/ops/aggregations/dfMean(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => f64
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.dfMean(df, columnName);
      } finally {
        __release(df);
      }
    },
    dfMin(df, columnName) {
      // assembly/ops/aggregations/dfMin(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => f64
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.dfMin(df, columnName);
      } finally {
        __release(df);
      }
    },
    dfMax(df, columnName) {
      // assembly/ops/aggregations/dfMax(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => f64
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.dfMax(df, columnName);
      } finally {
        __release(df);
      }
    },
    dfCount(df, columnName) {
      // assembly/ops/aggregations/dfCount(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => i32
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.dfCount(df, columnName);
      } finally {
        __release(df);
      }
    },
    dfVariance(df, columnName) {
      // assembly/ops/aggregations/dfVariance(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => f64
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.dfVariance(df, columnName);
      } finally {
        __release(df);
      }
    },
    dfStdDev(df, columnName) {
      // assembly/ops/aggregations/dfStdDev(assembly/dataframe/dataframe/DataFrame, ~lib/string/String) => f64
      df = __retain(__lowerInternref(df) || __notnull());
      columnName = __lowerString(columnName) || __notnull();
      try {
        return exports.dfStdDev(df, columnName);
      } finally {
        __release(df);
      }
    },
    columnAdd(a, b) {
      // assembly/ops/arithmetic/columnAdd(assembly/core/numeric-column/NumericColumn, assembly/core/numeric-column/NumericColumn) => assembly/core/numeric-column/NumericColumn
      a = __retain(__lowerInternref(a) || __notnull());
      b = __lowerInternref(b) || __notnull();
      try {
        return __liftInternref(exports.columnAdd(a, b) >>> 0);
      } finally {
        __release(a);
      }
    },
    columnSub(a, b) {
      // assembly/ops/arithmetic/columnSub(assembly/core/numeric-column/NumericColumn, assembly/core/numeric-column/NumericColumn) => assembly/core/numeric-column/NumericColumn
      a = __retain(__lowerInternref(a) || __notnull());
      b = __lowerInternref(b) || __notnull();
      try {
        return __liftInternref(exports.columnSub(a, b) >>> 0);
      } finally {
        __release(a);
      }
    },
    columnMul(a, b) {
      // assembly/ops/arithmetic/columnMul(assembly/core/numeric-column/NumericColumn, assembly/core/numeric-column/NumericColumn) => assembly/core/numeric-column/NumericColumn
      a = __retain(__lowerInternref(a) || __notnull());
      b = __lowerInternref(b) || __notnull();
      try {
        return __liftInternref(exports.columnMul(a, b) >>> 0);
      } finally {
        __release(a);
      }
    },
    columnDiv(a, b) {
      // assembly/ops/arithmetic/columnDiv(assembly/core/numeric-column/NumericColumn, assembly/core/numeric-column/NumericColumn) => assembly/core/numeric-column/NumericColumn
      a = __retain(__lowerInternref(a) || __notnull());
      b = __lowerInternref(b) || __notnull();
      try {
        return __liftInternref(exports.columnDiv(a, b) >>> 0);
      } finally {
        __release(a);
      }
    },
    columnScalarMul(col, scalar) {
      // assembly/ops/arithmetic/columnScalarMul(assembly/core/numeric-column/NumericColumn, f64) => assembly/core/numeric-column/NumericColumn
      col = __lowerInternref(col) || __notnull();
      return __liftInternref(exports.columnScalarMul(col, scalar) >>> 0);
    },
    columnScalarAdd(col, scalar) {
      // assembly/ops/arithmetic/columnScalarAdd(assembly/core/numeric-column/NumericColumn, f64) => assembly/core/numeric-column/NumericColumn
      col = __lowerInternref(col) || __notnull();
      return __liftInternref(exports.columnScalarAdd(col, scalar) >>> 0);
    },
    dfAdd(df, colA, colB, resultName) {
      // assembly/ops/arithmetic/dfAdd(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/string/String, ~lib/string/String) => void
      df = __retain(__lowerInternref(df) || __notnull());
      colA = __retain(__lowerString(colA) || __notnull());
      colB = __retain(__lowerString(colB) || __notnull());
      resultName = __lowerString(resultName) || __notnull();
      try {
        exports.dfAdd(df, colA, colB, resultName);
      } finally {
        __release(df);
        __release(colA);
        __release(colB);
      }
    },
    dfSub(df, colA, colB, resultName) {
      // assembly/ops/arithmetic/dfSub(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/string/String, ~lib/string/String) => void
      df = __retain(__lowerInternref(df) || __notnull());
      colA = __retain(__lowerString(colA) || __notnull());
      colB = __retain(__lowerString(colB) || __notnull());
      resultName = __lowerString(resultName) || __notnull();
      try {
        exports.dfSub(df, colA, colB, resultName);
      } finally {
        __release(df);
        __release(colA);
        __release(colB);
      }
    },
    dfScalarMul(df, colName, scalar, resultName) {
      // assembly/ops/arithmetic/dfScalarMul(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, f64, ~lib/string/String) => void
      df = __retain(__lowerInternref(df) || __notnull());
      colName = __retain(__lowerString(colName) || __notnull());
      resultName = __lowerString(resultName) || __notnull();
      try {
        exports.dfScalarMul(df, colName, scalar, resultName);
      } finally {
        __release(df);
        __release(colName);
      }
    },
    groupByIntegerKey(df, keyColumnName, maxKey) {
      // assembly/ops/groupby/groupByIntegerKey(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, i32?) => assembly/ops/groupby/GroupByResult
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumnName = __lowerString(keyColumnName) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupByIntegerKey(df, keyColumnName, maxKey) >>> 0);
      } finally {
        __release(df);
      }
    },
    groupBySumF32(df, keyColumnName, valueColumnNames, maxKey) {
      // assembly/ops/groupby/groupBySumF32(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/array/Array<~lib/string/String>, i32?) => assembly/ops/groupby/GroupByResult
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumnName = __retain(__lowerString(keyColumnName) || __notnull());
      valueColumnNames = __lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, valueColumnNames) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupBySumF32(df, keyColumnName, valueColumnNames, maxKey) >>> 0);
      } finally {
        __release(df);
        __release(keyColumnName);
      }
    },
    groupByMean(df, keyColumnName, valueColumnNames, maxKey) {
      // assembly/ops/groupby/groupByMean(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/array/Array<~lib/string/String>, i32?) => assembly/ops/groupby/GroupByResult
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumnName = __retain(__lowerString(keyColumnName) || __notnull());
      valueColumnNames = __lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, valueColumnNames) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupByMean(df, keyColumnName, valueColumnNames, maxKey) >>> 0);
      } finally {
        __release(df);
        __release(keyColumnName);
      }
    },
    groupByMin(df, keyColumnName, valueColumnNames, maxKey) {
      // assembly/ops/groupby/groupByMin(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/array/Array<~lib/string/String>, i32?) => assembly/ops/groupby/GroupByResult
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumnName = __retain(__lowerString(keyColumnName) || __notnull());
      valueColumnNames = __lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, valueColumnNames) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupByMin(df, keyColumnName, valueColumnNames, maxKey) >>> 0);
      } finally {
        __release(df);
        __release(keyColumnName);
      }
    },
    groupByMax(df, keyColumnName, valueColumnNames, maxKey) {
      // assembly/ops/groupby/groupByMax(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/array/Array<~lib/string/String>, i32?) => assembly/ops/groupby/GroupByResult
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumnName = __retain(__lowerString(keyColumnName) || __notnull());
      valueColumnNames = __lowerArray((pointer, value) => { __setU32(pointer, __lowerString(value) || __notnull()); }, 4, 2, valueColumnNames) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupByMax(df, keyColumnName, valueColumnNames, maxKey) >>> 0);
      } finally {
        __release(df);
        __release(keyColumnName);
      }
    },
    groupByCount(df, keyColumnName, maxKey) {
      // assembly/ops/groupby/groupByCount(assembly/dataframe/dataframe/DataFrame, ~lib/string/String, i32?) => assembly/ops/groupby/GroupByResult
      df = __retain(__lowerInternref(df) || __notnull());
      keyColumnName = __lowerString(keyColumnName) || __notnull();
      try {
        exports.__setArgumentsLength(arguments.length);
        return __liftInternref(exports.groupByCount(df, keyColumnName, maxKey) >>> 0);
      } finally {
        __release(df);
      }
    },
    innerJoinI32(left, right, leftKeyColumn, rightKeyColumn) {
      // assembly/ops/join/innerJoinI32(assembly/dataframe/dataframe/DataFrame, assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/string/String) => assembly/dataframe/dataframe/DataFrame
      left = __retain(__lowerInternref(left) || __notnull());
      right = __retain(__lowerInternref(right) || __notnull());
      leftKeyColumn = __retain(__lowerString(leftKeyColumn) || __notnull());
      rightKeyColumn = __lowerString(rightKeyColumn) || __notnull();
      try {
        return __liftInternref(exports.innerJoinI32(left, right, leftKeyColumn, rightKeyColumn) >>> 0);
      } finally {
        __release(left);
        __release(right);
        __release(leftKeyColumn);
      }
    },
    leftJoinI32(left, right, leftKeyColumn, rightKeyColumn) {
      // assembly/ops/join/leftJoinI32(assembly/dataframe/dataframe/DataFrame, assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/string/String) => assembly/dataframe/dataframe/DataFrame
      left = __retain(__lowerInternref(left) || __notnull());
      right = __retain(__lowerInternref(right) || __notnull());
      leftKeyColumn = __retain(__lowerString(leftKeyColumn) || __notnull());
      rightKeyColumn = __lowerString(rightKeyColumn) || __notnull();
      try {
        return __liftInternref(exports.leftJoinI32(left, right, leftKeyColumn, rightKeyColumn) >>> 0);
      } finally {
        __release(left);
        __release(right);
        __release(leftKeyColumn);
      }
    },
    rightJoinI32(left, right, leftKeyColumn, rightKeyColumn) {
      // assembly/ops/join/rightJoinI32(assembly/dataframe/dataframe/DataFrame, assembly/dataframe/dataframe/DataFrame, ~lib/string/String, ~lib/string/String) => assembly/dataframe/dataframe/DataFrame
      left = __retain(__lowerInternref(left) || __notnull());
      right = __retain(__lowerInternref(right) || __notnull());
      leftKeyColumn = __retain(__lowerString(leftKeyColumn) || __notnull());
      rightKeyColumn = __lowerString(rightKeyColumn) || __notnull();
      try {
        return __liftInternref(exports.rightJoinI32(left, right, leftKeyColumn, rightKeyColumn) >>> 0);
      } finally {
        __release(left);
        __release(right);
        __release(leftKeyColumn);
      }
    },
    allocAligned(size, alignment) {
      // assembly/memory/allocator/allocAligned(usize, usize?) => usize
      exports.__setArgumentsLength(arguments.length);
      return exports.allocAligned(size, alignment) >>> 0;
    },
    reallocAligned(ptr, oldSize, newSize, alignment) {
      // assembly/memory/allocator/reallocAligned(usize, usize, usize, usize?) => usize
      exports.__setArgumentsLength(arguments.length);
      return exports.reallocAligned(ptr, oldSize, newSize, alignment) >>> 0;
    },
    SIMD_ALIGNMENT: {
      // assembly/memory/allocator/SIMD_ALIGNMENT: usize
      valueOf() { return this.value; },
      get value() {
        return exports.SIMD_ALIGNMENT.value >>> 0;
      }
    },
    getMemoryBase() {
      // assembly/memory/shared/getMemoryBase() => usize
      return exports.getMemoryBase() >>> 0;
    },
    getMemorySize() {
      // assembly/memory/shared/getMemorySize() => usize
      return exports.getMemorySize() >>> 0;
    },
    createInt32View(ptr, length) {
      // assembly/memory/shared/createInt32View(usize, i32) => assembly/memory/shared/BufferView
      return __liftInternref(exports.createInt32View(ptr, length) >>> 0);
    },
    createFloat32View(ptr, length) {
      // assembly/memory/shared/createFloat32View(usize, i32) => assembly/memory/shared/BufferView
      return __liftInternref(exports.createFloat32View(ptr, length) >>> 0);
    },
    createFloat64View(ptr, length) {
      // assembly/memory/shared/createFloat64View(usize, i32) => assembly/memory/shared/BufferView
      return __liftInternref(exports.createFloat64View(ptr, length) >>> 0);
    },
    createUint8View(ptr, length) {
      // assembly/memory/shared/createUint8View(usize, i32) => assembly/memory/shared/BufferView
      return __liftInternref(exports.createUint8View(ptr, length) >>> 0);
    },
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __lowerString(value) {
    if (value == null) return 0;
    const
      length = value.length,
      pointer = exports.__new(length << 1, 2) >>> 0,
      memoryU16 = new Uint16Array(memory.buffer);
    for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
    return pointer;
  }
  function __lowerArray(lowerElement, id, align, values) {
    if (values == null) return 0;
    const
      length = values.length,
      buffer = exports.__pin(exports.__new(length << align, 1)) >>> 0,
      header = exports.__pin(exports.__new(16, id)) >>> 0;
    __setU32(header + 0, buffer);
    __dataview.setUint32(header + 4, buffer, true);
    __dataview.setUint32(header + 8, length << align, true);
    __dataview.setUint32(header + 12, length, true);
    for (let i = 0; i < length; ++i) lowerElement(buffer + (i << align >>> 0), values[i]);
    exports.__unpin(buffer);
    exports.__unpin(header);
    return header;
  }
  class Internref extends Number {}
  const registry = new FinalizationRegistry(__release);
  function __liftInternref(pointer) {
    if (!pointer) return null;
    const sentinel = new Internref(__retain(pointer));
    registry.register(sentinel, pointer);
    return sentinel;
  }
  function __lowerInternref(value) {
    if (value == null) return 0;
    if (value instanceof Internref) return value.valueOf();
    throw TypeError("internref expected");
  }
  const refcounts = new Map();
  function __retain(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount) refcounts.set(pointer, refcount + 1);
      else refcounts.set(exports.__pin(pointer), 1);
    }
    return pointer;
  }
  function __release(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount === 1) exports.__unpin(pointer), refcounts.delete(pointer);
      else if (refcount) refcounts.set(pointer, refcount - 1);
      else throw Error(`invalid refcount '${refcount}' for reference '${pointer}'`);
    }
  }
  function __notnull() {
    throw TypeError("value must not be null");
  }
  let __dataview = new DataView(memory.buffer);
  function __setU32(pointer, value) {
    try {
      __dataview.setUint32(pointer, value, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      __dataview.setUint32(pointer, value, true);
    }
  }
  return adaptedExports;
}
export const {
  memory,
  __new,
  __pin,
  __unpin,
  __collect,
  __rtti_base,
  createDataFrame,
  getColumnPtr,
  getColumnLength,
  getRowCount,
  getColumnCount,
  innerJoin,
  groupBySum,
  groupByMeanAgg,
  allocateBuffer,
  freeBuffer,
  freeDataFrame,
  getColumnType,
  hasColumn,
  createEmptyDataFrameWithRows,
  addInt32ColumnToDataFrame,
  addFloat32ColumnToDataFrame,
  addFloat64ColumnToDataFrame,
  addInt64ColumnToDataFrame,
  DataType,
  createInt32Column,
  createInt64Column,
  createFloat32Column,
  createFloat64Column,
  ColumnType,
  isNumericType,
  getColumnTypeSize,
  columnTypeToDataType,
  createEmptyDataFrame,
  createDataFrameBuilder,
  buildDataFrameFromArrays,
  columnSum,
  columnMean,
  columnMin,
  columnMax,
  columnCount,
  columnVariance,
  columnStdDev,
  dfSum,
  dfMean,
  dfMin,
  dfMax,
  dfCount,
  dfVariance,
  dfStdDev,
  columnAdd,
  columnSub,
  columnMul,
  columnDiv,
  columnScalarMul,
  columnScalarAdd,
  dfAdd,
  dfSub,
  dfScalarMul,
  groupByIntegerKey,
  groupBySumF32,
  groupByMean,
  groupByMin,
  groupByMax,
  groupByCount,
  innerJoinI32,
  leftJoinI32,
  rightJoinI32,
  simdSumF32,
  simdSumF64,
  simdMinF32,
  simdMinF64,
  simdMaxF32,
  simdMaxF64,
  simdAddF32,
  simdSubF32,
  simdMulF32,
  simdDivF32,
  simdScalarMulF32,
  simdAddF64,
  simdSubF64,
  simdMulF64,
  simdDivF64,
  simdScalarMulF64,
  allocAligned,
  freeAligned,
  reallocAligned,
  zeroMemory,
  copyMemory,
  getMemoryPages,
  growMemory,
  SIMD_ALIGNMENT,
  getMemoryBase,
  getMemorySize,
  createInt32View,
  createFloat32View,
  createFloat64View,
  createUint8View,
  atomicLoadI32,
  atomicStoreI32,
  atomicAddI32,
  memoryFence,
} = await (async url => instantiate(
  await (async () => {
    const isNodeOrBun = typeof process != "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
    if (isNodeOrBun) { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
    else { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
  })(), {
  }
))(new URL("release.wasm", import.meta.url));
