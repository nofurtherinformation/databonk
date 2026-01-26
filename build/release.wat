(module
 (type $0 (func (param i32 i32) (result i32)))
 (type $1 (func (param i32) (result i32)))
 (type $2 (func (param i32 i32 i32 i32) (result i32)))
 (type $3 (func (param i32 i32 i32 i32)))
 (type $4 (func (param i32 i32 i32)))
 (type $5 (func (param i32)))
 (type $6 (func (param i32) (result f64)))
 (type $7 (func (param i32 i32)))
 (type $8 (func (param i32 i32) (result f64)))
 (type $9 (func (param i32 i32 i32) (result i32)))
 (type $10 (func))
 (type $11 (func (result i32)))
 (type $12 (func (param i32 f64) (result i32)))
 (type $13 (func (param i32 i32) (result f32)))
 (type $14 (func (param i32 i32 i64)))
 (type $15 (func (param i32 i32 i32 i32 i32)))
 (type $16 (func (param i32 f32 i32 i32)))
 (type $17 (func (param i32 f64 i32 i32)))
 (type $18 (func (param i32 i32 i32 i32 i32 i32) (result i32)))
 (type $19 (func (param i32 i32 f64)))
 (type $20 (func (param i32 i32 f64 i32)))
 (import "env" "memory" (memory $0 256 16384 shared))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $assembly/core/numeric-column/DataType.Int32 i32 (i32.const 0))
 (global $assembly/core/numeric-column/DataType.Int64 i32 (i32.const 1))
 (global $assembly/core/numeric-column/DataType.Float32 i32 (i32.const 2))
 (global $assembly/core/numeric-column/DataType.Float64 i32 (i32.const 3))
 (global $assembly/core/schema/ColumnType.Int32 i32 (i32.const 0))
 (global $assembly/core/schema/ColumnType.Int64 i32 (i32.const 1))
 (global $assembly/core/schema/ColumnType.Float32 i32 (i32.const 2))
 (global $assembly/core/schema/ColumnType.Float64 i32 (i32.const 3))
 (global $assembly/core/schema/ColumnType.String i32 (i32.const 4))
 (global $assembly/memory/allocator/SIMD_ALIGNMENT i32 (i32.const 64))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~argumentsLength (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 3280))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 36164))
 (data $0 (i32.const 1036) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e\00\00\00\00\00")
 (data $1 (i32.const 1100) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $2 (i32.const 1168) "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $3 (i32.const 1200) "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $4 (i32.const 1228) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e\00\00\00\00\00\00\00\00\00")
 (data $5 (i32.const 1292) ",\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s\00\00\00\00\00\00\00\00\00")
 (data $6 (i32.const 1344) "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $7 (i32.const 1372) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $8 (i32.const 1436) ",\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h\00")
 (data $9 (i32.const 1484) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s\00\00\00\00\00\00\00")
 (data $10 (i32.const 1548) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $11 (i32.const 1580) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $12 (i32.const 1612) ",\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s\00\00\00")
 (data $13 (i32.const 1660) "|\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00^\00\00\00E\00l\00e\00m\00e\00n\00t\00 \00t\00y\00p\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00n\00u\00l\00l\00a\00b\00l\00e\00 \00i\00f\00 \00a\00r\00r\00a\00y\00 \00i\00s\00 \00h\00o\00l\00e\00y\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $14 (i32.const 1788) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00,\00\00\00C\00o\00l\00u\00m\00n\00 \00l\00e\00n\00g\00t\00h\00 \00m\00i\00s\00m\00a\00t\00c\00h\00")
 (data $15 (i32.const 1852) "L\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00:\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00d\00a\00t\00a\00f\00r\00a\00m\00e\00/\00b\00u\00i\00l\00d\00e\00r\00.\00t\00s\00\00\00")
 (data $16 (i32.const 1932) "\\\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00>\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00d\00a\00t\00a\00f\00r\00a\00m\00e\00/\00d\00a\00t\00a\00f\00r\00a\00m\00e\00.\00t\00s\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $17 (i32.const 2028) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00$\00\00\00K\00e\00y\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00\00\00\00\00\00\00\00\00")
 (data $18 (i32.const 2092) ",\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\16\00\00\00~\00l\00i\00b\00/\00m\00a\00p\00.\00t\00s\00\00\00\00\00\00\00")
 (data $19 (i32.const 2140) "|\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00^\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00\'\00n\00u\00l\00l\00\'\00 \00(\00n\00o\00t\00 \00a\00s\00s\00i\00g\00n\00e\00d\00 \00o\00r\00 \00f\00a\00i\00l\00e\00d\00 \00c\00a\00s\00t\00)\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $20 (i32.const 2268) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00(\00\00\00K\00e\00y\00 \00c\00o\00l\00u\00m\00n\00 \00n\00o\00t\00 \00f\00o\00u\00n\00d\00\00\00\00\00")
 (data $21 (i32.const 2332) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00(\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00o\00p\00s\00/\00j\00o\00i\00n\00.\00t\00s\00\00\00\00\00")
 (data $22 (i32.const 2396) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s\00\00\00\00\00\00\00")
 (data $23 (i32.const 2460) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $24 (i32.const 2492) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $25 (i32.const 2524) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $26 (i32.const 2556) "\1c\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\0c\00\00\00_\00r\00i\00g\00h\00t\00")
 (data $27 (i32.const 2588) "\1c\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $28 (i32.const 2620) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00,\00\00\00K\00e\00y\00 \00c\00o\00l\00u\00m\00n\00 \00n\00o\00t\00 \00f\00o\00u\00n\00d\00:\00 \00")
 (data $29 (i32.const 2684) "L\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00.\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00o\00p\00s\00/\00g\00r\00o\00u\00p\00b\00y\00.\00t\00s\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $30 (i32.const 2764) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $31 (i32.const 2796) "\1c\00\00\00\00\00\00\00\00\00\00\00\19\00\00\00\08\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00")
 (data $32 (i32.const 2828) ",\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\12\00\00\00_\00_\00d\00u\00m\00m\00y\00_\00_\00\00\00\00\00\00\00\00\00\00\00")
 (data $33 (i32.const 2876) "L\00\00\00\00\00\00\00\00\00\00\00\02\00\00\004\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00o\00p\00s\00/\00a\00r\00i\00t\00h\00m\00e\00t\00i\00c\00.\00t\00s\00\00\00\00\00\00\00\00\00")
 (data $34 (i32.const 2956) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00 \00\00\00C\00o\00l\00u\00m\00n\00 \00n\00o\00t\00 \00f\00o\00u\00n\00d\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $35 (i32.const 3020) "\1c\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\n\00\00\00c\00o\00u\00n\00t\00\00\00")
 (data $36 (i32.const 3052) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $37 (i32.const 3084) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $38 (i32.const 3116) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data $39 (i32.const 3148) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00*\00\00\00O\00b\00j\00e\00c\00t\00 \00a\00l\00r\00e\00a\00d\00y\00 \00p\00i\00n\00n\00e\00d\00\00\00")
 (data $40 (i32.const 3212) "<\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00(\00\00\00O\00b\00j\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00p\00i\00n\00n\00e\00d\00\00\00\00\00")
 (data $41 (i32.const 3280) "\1c\00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00\02A\00\00\02\t\00\00\02\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00 \00\00\00\00\00\00\00\10A\82\00\00\00\00\00\00\00\00\00\02A\00\00\10\t\82\00\00\00\00\00\00\00\00\00\00\00\00\00\04a\00\00\00\00\00\00\10\t\12\00\10A\82\00$\t\00\00\00\00\00\00$\1a\00\00 \00\00\00")
 (table $0 2 2 funcref)
 (elem $0 (i32.const 1) $assembly/ops/groupby/groupByIntegerKey~anonymous|0)
 (export "allocateBuffer" (func $assembly/index/allocateBuffer))
 (export "freeBuffer" (func $assembly/index/freeBuffer))
 (export "createEmptyDataFrameWithRows" (func $assembly/index/createEmptyDataFrameWithRows))
 (export "DataType.Int32" (global $assembly/core/numeric-column/DataType.Int32))
 (export "DataType.Int64" (global $assembly/core/numeric-column/DataType.Int64))
 (export "DataType.Float32" (global $assembly/core/numeric-column/DataType.Float32))
 (export "DataType.Float64" (global $assembly/core/numeric-column/DataType.Float64))
 (export "createInt32Column" (func $assembly/core/numeric-column/createInt32Column))
 (export "createInt64Column" (func $assembly/core/numeric-column/createInt64Column))
 (export "createFloat32Column" (func $assembly/core/numeric-column/createFloat32Column))
 (export "createFloat64Column" (func $assembly/core/numeric-column/createFloat64Column))
 (export "ColumnType.Int32" (global $assembly/core/schema/ColumnType.Int32))
 (export "ColumnType.Int64" (global $assembly/core/schema/ColumnType.Int64))
 (export "ColumnType.Float32" (global $assembly/core/schema/ColumnType.Float32))
 (export "ColumnType.Float64" (global $assembly/core/schema/ColumnType.Float64))
 (export "ColumnType.String" (global $assembly/core/schema/ColumnType.String))
 (export "isNumericType" (func $assembly/core/schema/isNumericType))
 (export "getColumnTypeSize" (func $assembly/core/schema/getColumnTypeSize))
 (export "columnTypeToDataType" (func $assembly/core/schema/columnTypeToDataType))
 (export "createEmptyDataFrame" (func $assembly/dataframe/dataframe/createEmptyDataFrame))
 (export "createDataFrameBuilder" (func $assembly/dataframe/builder/createDataFrameBuilder))
 (export "simdSumF32" (func $assembly/simd/simd-aggregations/simdSumF32))
 (export "simdSumF64" (func $assembly/simd/simd-aggregations/simdSumF64))
 (export "simdMinF32" (func $assembly/simd/simd-aggregations/simdMinF32))
 (export "simdMinF64" (func $assembly/simd/simd-aggregations/simdMinF64))
 (export "simdMaxF32" (func $assembly/simd/simd-aggregations/simdMaxF32))
 (export "simdMaxF64" (func $assembly/simd/simd-aggregations/simdMaxF64))
 (export "simdAddF32" (func $assembly/simd/simd-arithmetic/simdAddF32))
 (export "simdSubF32" (func $assembly/simd/simd-arithmetic/simdSubF32))
 (export "simdMulF32" (func $assembly/simd/simd-arithmetic/simdMulF32))
 (export "simdDivF32" (func $assembly/simd/simd-arithmetic/simdDivF32))
 (export "simdScalarMulF32" (func $assembly/simd/simd-arithmetic/simdScalarMulF32))
 (export "simdAddF64" (func $assembly/simd/simd-arithmetic/simdAddF64))
 (export "simdSubF64" (func $assembly/simd/simd-arithmetic/simdSubF64))
 (export "simdMulF64" (func $assembly/simd/simd-arithmetic/simdMulF64))
 (export "simdDivF64" (func $assembly/simd/simd-arithmetic/simdDivF64))
 (export "simdScalarMulF64" (func $assembly/simd/simd-arithmetic/simdScalarMulF64))
 (export "allocAligned" (func $assembly/memory/allocator/allocAligned@varargs))
 (export "freeAligned" (func $assembly/memory/allocator/freeAligned))
 (export "reallocAligned" (func $assembly/memory/allocator/reallocAligned@varargs))
 (export "zeroMemory" (func $assembly/memory/allocator/zeroMemory))
 (export "copyMemory" (func $assembly/memory/allocator/copyMemory))
 (export "getMemoryPages" (func $assembly/memory/allocator/getMemoryPages))
 (export "growMemory" (func $assembly/memory/allocator/growMemory))
 (export "SIMD_ALIGNMENT" (global $assembly/memory/allocator/SIMD_ALIGNMENT))
 (export "getMemoryBase" (func $assembly/memory/shared/getMemoryBase))
 (export "getMemorySize" (func $assembly/memory/shared/getMemorySize))
 (export "createInt32View" (func $assembly/memory/shared/createInt32View))
 (export "createFloat32View" (func $assembly/memory/shared/createInt32View))
 (export "createFloat64View" (func $assembly/memory/shared/createFloat64View))
 (export "createUint8View" (func $assembly/memory/shared/createUint8View))
 (export "atomicLoadI32" (func $assembly/memory/shared/atomicLoadI32))
 (export "atomicStoreI32" (func $assembly/memory/shared/atomicStoreI32))
 (export "atomicAddI32" (func $assembly/memory/shared/atomicAddI32))
 (export "memoryFence" (func $assembly/memory/shared/memoryFence))
 (export "__new" (func $~lib/rt/itcms/__new))
 (export "__pin" (func $~lib/rt/itcms/__pin))
 (export "__unpin" (func $~lib/rt/itcms/__unpin))
 (export "__collect" (func $~lib/rt/itcms/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (export "__setArgumentsLength" (func $~setArgumentsLength))
 (export "createDataFrame" (func $export:assembly/index/createDataFrame))
 (export "getColumnPtr" (func $export:assembly/index/getColumnPtr))
 (export "getColumnLength" (func $export:assembly/index/getColumnLength))
 (export "getRowCount" (func $export:assembly/index/getRowCount))
 (export "getColumnCount" (func $export:assembly/index/getColumnCount))
 (export "innerJoin" (func $export:assembly/index/innerJoin))
 (export "groupBySum" (func $export:assembly/index/groupBySum@varargs))
 (export "groupByMeanAgg" (func $export:assembly/index/groupByMeanAgg@varargs))
 (export "freeDataFrame" (func $export:assembly/index/freeDataFrame))
 (export "getColumnType" (func $export:assembly/index/getColumnType))
 (export "hasColumn" (func $export:assembly/index/hasColumn))
 (export "addInt32ColumnToDataFrame" (func $export:assembly/index/addInt32ColumnToDataFrame))
 (export "addFloat32ColumnToDataFrame" (func $export:assembly/index/addFloat32ColumnToDataFrame))
 (export "addFloat64ColumnToDataFrame" (func $export:assembly/index/addFloat64ColumnToDataFrame))
 (export "addInt64ColumnToDataFrame" (func $export:assembly/index/addInt64ColumnToDataFrame))
 (export "buildDataFrameFromArrays" (func $export:assembly/dataframe/builder/buildDataFrameFromArrays))
 (export "columnSum" (func $export:assembly/ops/aggregations/columnSum))
 (export "columnMean" (func $export:assembly/ops/aggregations/columnMean))
 (export "columnMin" (func $export:assembly/ops/aggregations/columnMin))
 (export "columnMax" (func $export:assembly/ops/aggregations/columnMax))
 (export "columnCount" (func $export:assembly/ops/aggregations/columnCount))
 (export "columnVariance" (func $export:assembly/ops/aggregations/columnVariance))
 (export "columnStdDev" (func $export:assembly/ops/aggregations/columnStdDev))
 (export "dfSum" (func $export:assembly/ops/aggregations/dfSum))
 (export "dfMean" (func $export:assembly/ops/aggregations/dfMean))
 (export "dfMin" (func $export:assembly/ops/aggregations/dfMin))
 (export "dfMax" (func $export:assembly/ops/aggregations/dfMax))
 (export "dfCount" (func $export:assembly/ops/aggregations/dfCount))
 (export "dfVariance" (func $export:assembly/ops/aggregations/dfVariance))
 (export "dfStdDev" (func $export:assembly/ops/aggregations/dfStdDev))
 (export "columnAdd" (func $export:assembly/ops/arithmetic/columnAdd))
 (export "columnSub" (func $export:assembly/ops/arithmetic/columnSub))
 (export "columnMul" (func $export:assembly/ops/arithmetic/columnMul))
 (export "columnDiv" (func $export:assembly/ops/arithmetic/columnDiv))
 (export "columnScalarMul" (func $export:assembly/ops/arithmetic/columnScalarMul))
 (export "columnScalarAdd" (func $export:assembly/ops/arithmetic/columnScalarAdd))
 (export "dfAdd" (func $export:assembly/ops/arithmetic/dfAdd))
 (export "dfSub" (func $export:assembly/ops/arithmetic/dfSub))
 (export "dfScalarMul" (func $export:assembly/ops/arithmetic/dfScalarMul))
 (export "groupByIntegerKey" (func $export:assembly/ops/groupby/groupByIntegerKey@varargs))
 (export "groupBySumF32" (func $export:assembly/ops/groupby/groupBySumF32@varargs))
 (export "groupByMean" (func $export:assembly/ops/groupby/groupByMean@varargs))
 (export "groupByMin" (func $export:assembly/ops/groupby/groupByMin@varargs))
 (export "groupByMax" (func $export:assembly/ops/groupby/groupByMax@varargs))
 (export "groupByCount" (func $export:assembly/ops/groupby/groupByCount@varargs))
 (export "innerJoinI32" (func $export:assembly/ops/join/innerJoinI32))
 (export "leftJoinI32" (func $export:assembly/ops/join/leftJoinI32))
 (export "rightJoinI32" (func $export:assembly/ops/join/rightJoinI32))
 (start $~start)
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  i32.const 1248
  call $~lib/rt/itcms/__visit
  i32.const 1456
  call $~lib/rt/itcms/__visit
  i32.const 1680
  call $~lib/rt/itcms/__visit
  i32.const 2048
  call $~lib/rt/itcms/__visit
  i32.const 1056
  call $~lib/rt/itcms/__visit
  i32.const 3168
  call $~lib/rt/itcms/__visit
  i32.const 3232
  call $~lib/rt/itcms/__visit
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1120
     i32.const 160
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#unlink (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.tee $1
  i32.eqz
  if
   local.get $0
   i32.load offset=8
   i32.eqz
   local.get $0
   i32.const 36164
   i32.lt_u
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1120
    i32.const 128
    i32.const 18
    call $~lib/builtins/abort
    unreachable
   end
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  i32.eqz
  if
   i32.const 0
   i32.const 1120
   i32.const 132
   i32.const 16
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  global.get $~lib/rt/itcms/iter
  i32.eq
  if
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1120
    i32.const 148
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  local.get $0
  call $~lib/rt/itcms/Object#unlink
  global.get $~lib/rt/itcms/toSpace
  local.set $1
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 2
  i32.le_u
  if (result i32)
   i32.const 1
  else
   local.get $2
   i32.const 3280
   i32.load
   i32.gt_u
   if
    i32.const 1248
    i32.const 1312
    i32.const 21
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.const 2
   i32.shl
   i32.const 3284
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  local.set $3
  local.get $1
  i32.load offset=8
  local.set $2
  local.get $0
  global.get $~lib/rt/itcms/white
  i32.eqz
  i32.const 2
  local.get $3
  select
  local.get $1
  i32.or
  i32.store offset=4
  local.get $0
  local.get $2
  i32.store offset=8
  local.get $2
  local.get $0
  local.get $2
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=8
 )
 (func $~lib/rt/itcms/__visit (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/itcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $2
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $1
  local.get $0
  local.get $2
  i32.const 4
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.tee $1
  i32.load offset=96
  i32.eq
  if
   local.get $1
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $3
    i32.rotl
    i32.and
    local.set $3
    local.get $1
    local.get $3
    i32.store offset=4
    local.get $3
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $2
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1392
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $1
  i32.const 4
  i32.add
  local.get $2
  i32.add
  i32.ne
  if
   i32.const 0
   i32.const 1392
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $2
   local.get $2
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $2
  local.get $1
  i64.extend_i32_u
  i64.lt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 382
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $3
  if
   local.get $3
   i32.const 4
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1392
    i32.const 389
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $1
   i32.const 16
   i32.sub
   local.tee $5
   i32.eq
   if
    local.get $3
    i32.load
    local.set $4
    local.get $5
    local.set $1
   end
  else
   local.get $0
   i32.const 1572
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1392
    i32.const 402
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.wrap_i64
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.and
  local.get $3
  i32.const 8
  i32.sub
  local.tee $3
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 4
  i32.add
  local.get $3
  i32.add
  local.tee $3
  i32.const 2
  i32.store
  local.get $0
  local.get $3
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 36176
  i32.const 0
  i32.store
  i32.const 37744
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 36176
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $0
      i32.const 4
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.const 36176
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 36176
  i32.const 37748
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 36176
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/tlsf/__free (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 36164
  i32.lt_u
  if
   return
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.set $2
  local.get $0
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.const 15
  i32.and
  i32.const 1
  local.get $0
  select
  if (result i32)
   i32.const 1
  else
   local.get $1
   i32.load
   i32.const 1
   i32.and
  end
  if
   i32.const 0
   i32.const 1392
   i32.const 562
   i32.const 3
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $1
  i32.load
  i32.const 1
  i32.or
  i32.store
  local.get $2
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $break|0
   block $case2|0
    block $case1|0
     block $case0|0
      global.get $~lib/rt/itcms/state
      br_table $case0|0 $case1|0 $case2|0 $break|0
     end
     i32.const 1
     global.set $~lib/rt/itcms/state
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/iter
     global.get $~lib/rt/itcms/visitCount
     return
    end
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.set $1
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    loop $while-continue|1
     local.get $0
     global.get $~lib/rt/itcms/toSpace
     i32.ne
     if
      local.get $0
      global.set $~lib/rt/itcms/iter
      local.get $1
      local.get $0
      i32.load offset=4
      local.tee $2
      i32.const 3
      i32.and
      i32.ne
      if
       local.get $0
       local.get $2
       i32.const -4
       i32.and
       local.get $1
       i32.or
       i32.store offset=4
       i32.const 0
       global.set $~lib/rt/itcms/visitCount
       local.get $0
       i32.const 20
       i32.add
       call $~lib/rt/__visit_members
       global.get $~lib/rt/itcms/visitCount
       return
      end
      local.get $0
      i32.load offset=4
      i32.const -4
      i32.and
      local.set $0
      br $while-continue|1
     end
    end
    i32.const 0
    global.set $~lib/rt/itcms/visitCount
    call $~lib/rt/itcms/visitRoots
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.const 36164
      i32.lt_u
      if
       local.get $0
       i32.load
       call $~lib/rt/itcms/__visit
       local.get $0
       i32.const 4
       i32.add
       local.set $0
       br $while-continue|0
      end
     end
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|2
      local.get $0
      global.get $~lib/rt/itcms/toSpace
      i32.ne
      if
       local.get $1
       local.get $0
       i32.load offset=4
       local.tee $2
       i32.const 3
       i32.and
       i32.ne
       if
        local.get $0
        local.get $2
        i32.const -4
        i32.and
        local.get $1
        i32.or
        i32.store offset=4
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
       end
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       local.set $0
       br $while-continue|2
      end
     end
     global.get $~lib/rt/itcms/fromSpace
     local.set $0
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/fromSpace
     local.get $0
     global.set $~lib/rt/itcms/toSpace
     local.get $1
     global.set $~lib/rt/itcms/white
     local.get $0
     i32.load offset=4
     i32.const -4
     i32.and
     global.set $~lib/rt/itcms/iter
     i32.const 2
     global.set $~lib/rt/itcms/state
    end
    global.get $~lib/rt/itcms/visitCount
    return
   end
   global.get $~lib/rt/itcms/iter
   local.tee $0
   global.get $~lib/rt/itcms/toSpace
   i32.ne
   if
    local.get $0
    i32.load offset=4
    local.tee $1
    i32.const -4
    i32.and
    global.set $~lib/rt/itcms/iter
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.get $1
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1120
     i32.const 229
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 36164
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/itcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/itcms/total
     local.get $0
     i32.const 4
     i32.add
     call $~lib/rt/tlsf/__free
    end
    i32.const 10
    return
   end
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=4
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=8
   i32.const 0
   global.set $~lib/rt/itcms/state
  end
  i32.const 0
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if
   local.get $1
   i32.const 4
   i32.shr_u
   local.set $1
  else
   local.get $1
   i32.const 536870910
   i32.lt_u
   if
    local.get $1
    i32.const 1
    i32.const 27
    local.get $1
    i32.clz
    i32.sub
    i32.shl
    i32.add
    i32.const 1
    i32.sub
    local.set $1
   end
   local.get $1
   i32.const 31
   local.get $1
   i32.clz
   i32.sub
   local.tee $2
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
   local.set $1
   local.get $2
   i32.const 7
   i32.sub
   local.set $2
  end
  local.get $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 334
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1392
     i32.const 347
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1392
   i32.const 461
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.const 12
  i32.le_u
  if (result i32)
   i32.const 12
  else
   local.get $1
   i32.const 19
   i32.add
   i32.const -16
   i32.and
   i32.const 4
   i32.sub
  end
  local.tee $3
  call $~lib/rt/tlsf/searchBlock
  local.tee $1
  i32.eqz
  if
   memory.size
   local.tee $1
   local.get $3
   i32.const 256
   i32.ge_u
   if (result i32)
    local.get $3
    i32.const 536870910
    i32.lt_u
    if (result i32)
     local.get $3
     i32.const 1
     i32.const 27
     local.get $3
     i32.clz
     i32.sub
     i32.shl
     i32.add
     i32.const 1
     i32.sub
    else
     local.get $3
    end
   else
    local.get $3
   end
   i32.const 4
   local.get $0
   i32.load offset=1568
   local.get $1
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $2
   local.get $1
   local.get $2
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $2
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $0
   local.get $1
   i32.const 16
   i32.shl
   memory.size
   i64.extend_i32_s
   i64.const 16
   i64.shl
   call $~lib/rt/tlsf/addMemory
   local.get $0
   local.get $3
   call $~lib/rt/tlsf/searchBlock
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1392
    i32.const 499
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $3
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.gt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 501
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/removeBlock
  local.get $1
  i32.load
  local.set $4
  local.get $3
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1392
   i32.const 361
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const -4
  i32.and
  local.get $3
  i32.sub
  local.tee $2
  i32.const 16
  i32.ge_u
  if
   local.get $1
   local.get $3
   local.get $4
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $3
   i32.add
   local.tee $3
   local.get $2
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $3
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $1
   local.get $4
   i32.const -2
   i32.and
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $0
   local.get $0
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $1
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 261
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt$68
    i32.const 2048
    local.set $2
    loop $do-loop|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt$68
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-loop|0
    end
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  global.get $~lib/rt/itcms/fromSpace
  local.tee $1
  i32.load offset=8
  local.set $3
  local.get $2
  local.get $1
  global.get $~lib/rt/itcms/white
  i32.or
  i32.store offset=4
  local.get $2
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $2
  local.get $3
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  global.get $~lib/rt/itcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $1
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
 )
 (func $~lib/rt/itcms/__link (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.eqz
  if
   return
  end
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 1120
   i32.const 295
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $0
   i32.load offset=4
   i32.const 3
   i32.and
   local.tee $3
   global.get $~lib/rt/itcms/white
   i32.eqz
   i32.eq
   if
    local.get $0
    local.get $1
    local.get $2
    select
    call $~lib/rt/itcms/Object#makeGray
   else
    global.get $~lib/rt/itcms/state
    i32.const 1
    i32.eq
    local.get $3
    i32.const 3
    i32.eq
    i32.and
    if
     local.get $1
     call $~lib/rt/itcms/Object#makeGray
    end
   end
  end
 )
 (func $assembly/ops/groupby/groupByIntegerKey~anonymous|0 (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.sub
 )
 (func $~lib/util/sort/insertionSort<i32> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $1
  local.get $3
  local.get $2
  local.get $1
  i32.sub
  i32.const 1
  i32.add
  local.tee $4
  local.get $3
  i32.sub
  i32.const 1
  i32.and
  i32.sub
  local.get $4
  i32.const 1
  i32.and
  local.get $3
  select
  i32.add
  local.set $6
  loop $for-loop|0
   local.get $2
   local.get $6
   i32.ge_s
   if
    local.get $0
    local.get $6
    i32.const 2
    i32.shl
    i32.add
    local.tee $4
    i32.load
    local.set $3
    local.get $4
    i32.load offset=4
    local.tee $5
    local.set $4
    i32.const 2
    global.set $~argumentsLength
    local.get $3
    local.get $5
    i32.const 2816
    i32.load
    call_indirect (type $0)
    i32.const 0
    i32.le_s
    if
     local.get $3
     local.set $4
     local.get $5
     local.set $3
    end
    local.get $6
    i32.const 1
    i32.sub
    local.set $5
    loop $while-continue|1
     local.get $1
     local.get $5
     i32.le_s
     if
      block $while-break|1
       local.get $0
       local.get $5
       i32.const 2
       i32.shl
       i32.add
       local.tee $8
       i32.load
       local.set $7
       i32.const 2
       global.set $~argumentsLength
       local.get $7
       local.get $3
       i32.const 2816
       i32.load
       call_indirect (type $0)
       i32.const 0
       i32.le_s
       br_if $while-break|1
       local.get $8
       local.get $7
       i32.store offset=8
       local.get $5
       i32.const 1
       i32.sub
       local.set $5
       br $while-continue|1
      end
     end
    end
    local.get $0
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    local.get $3
    i32.store offset=8
    loop $while-continue|2
     local.get $1
     local.get $5
     i32.le_s
     if
      block $while-break|2
       local.get $0
       local.get $5
       i32.const 2
       i32.shl
       i32.add
       local.tee $3
       i32.load
       local.set $7
       i32.const 2
       global.set $~argumentsLength
       local.get $7
       local.get $4
       i32.const 2816
       i32.load
       call_indirect (type $0)
       i32.const 0
       i32.le_s
       br_if $while-break|2
       local.get $3
       local.get $7
       i32.store offset=4
       local.get $5
       i32.const 1
       i32.sub
       local.set $5
       br $while-continue|2
      end
     end
    end
    local.get $0
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    local.get $4
    i32.store offset=4
    local.get $6
    i32.const 2
    i32.add
    local.set $6
    br $for-loop|0
   end
  end
 )
 (func $~lib/util/sort/extendRunRight<i32> (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  local.get $2
  i32.eq
  if
   local.get $1
   return
  end
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $4
  local.get $0
  local.get $1
  i32.const 1
  i32.add
  local.tee $3
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $5
  i32.const 2
  global.set $~argumentsLength
  local.get $4
  local.get $5
  i32.const 2816
  i32.load
  call_indirect (type $0)
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    local.get $2
    local.get $3
    i32.gt_s
    if (result i32)
     local.get $0
     local.get $3
     i32.const 2
     i32.shl
     i32.add
     local.tee $4
     i32.load offset=4
     local.set $5
     local.get $4
     i32.load
     local.set $4
     i32.const 2
     global.set $~argumentsLength
     local.get $5
     local.get $4
     i32.const 2816
     i32.load
     call_indirect (type $0)
     i32.const 31
     i32.shr_u
    else
     i32.const 0
    end
    if
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $while-continue|0
    end
   end
   local.get $3
   local.set $2
   loop $while-continue|1
    local.get $1
    local.get $2
    i32.lt_s
    if
     local.get $0
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     local.tee $4
     i32.load
     local.set $5
     local.get $4
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     i32.add
     local.tee $4
     i32.load
     i32.store
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     local.get $4
     local.get $5
     i32.store
     local.get $2
     i32.const 1
     i32.sub
     local.set $2
     br $while-continue|1
    end
   end
  else
   loop $while-continue|2
    local.get $2
    local.get $3
    i32.gt_s
    if (result i32)
     local.get $0
     local.get $3
     i32.const 2
     i32.shl
     i32.add
     local.tee $1
     i32.load offset=4
     local.set $4
     local.get $1
     i32.load
     local.set $1
     i32.const 2
     global.set $~argumentsLength
     local.get $4
     local.get $1
     i32.const 2816
     i32.load
     call_indirect (type $0)
     i32.const 0
     i32.ge_s
    else
     i32.const 0
    end
    if
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $while-continue|2
    end
   end
  end
  local.get $3
 )
 (func $~lib/util/sort/mergeRuns<i32> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $2
  i32.const 1
  i32.sub
  local.tee $5
  local.get $3
  i32.add
  local.set $6
  local.get $5
  i32.const 1
  i32.add
  local.set $2
  loop $for-loop|0
   local.get $1
   local.get $2
   i32.lt_s
   if
    local.get $2
    i32.const 1
    i32.sub
    local.tee $2
    i32.const 2
    i32.shl
    local.tee $7
    local.get $4
    i32.add
    local.get $0
    local.get $7
    i32.add
    i32.load
    i32.store
    br $for-loop|0
   end
  end
  loop $for-loop|1
   local.get $3
   local.get $5
   i32.gt_s
   if
    local.get $4
    local.get $6
    local.get $5
    i32.sub
    i32.const 2
    i32.shl
    i32.add
    local.get $0
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    i32.store
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|1
   end
  end
  loop $for-loop|2
   local.get $1
   local.get $3
   i32.le_s
   if
    local.get $4
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $6
    local.get $4
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $7
    i32.const 2
    global.set $~argumentsLength
    local.get $6
    local.get $7
    i32.const 2816
    i32.load
    call_indirect (type $0)
    i32.const 0
    i32.lt_s
    if
     local.get $0
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     local.get $6
     i32.store
     local.get $5
     i32.const 1
     i32.sub
     local.set $5
    else
     local.get $0
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     local.get $7
     i32.store
     local.get $2
     i32.const 1
     i32.add
     local.set $2
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
 )
 (func $assembly/index/allocateBuffer (param $0 i32) (result i32)
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  call $~lib/rt/tlsf/allocateBlock
  i32.const 4
  i32.add
 )
 (func $assembly/index/freeBuffer (param $0 i32)
  local.get $0
  call $~lib/rt/tlsf/__free
 )
 (func $assembly/index/createEmptyDataFrameWithRows (param $0 i32) (result i32)
  local.get $0
  call $assembly/dataframe/dataframe/createEmptyDataFrame
 )
 (func $assembly/core/numeric-column/createInt32Column (param $0 i32) (result i32)
  local.get $0
  i32.const 0
  call $assembly/core/numeric-column/NumericColumn#constructor
 )
 (func $assembly/core/numeric-column/createInt64Column (param $0 i32) (result i32)
  local.get $0
  i32.const 1
  call $assembly/core/numeric-column/NumericColumn#constructor
 )
 (func $assembly/core/numeric-column/createFloat32Column (param $0 i32) (result i32)
  local.get $0
  i32.const 2
  call $assembly/core/numeric-column/NumericColumn#constructor
 )
 (func $assembly/core/numeric-column/createFloat64Column (param $0 i32) (result i32)
  local.get $0
  i32.const 3
  call $assembly/core/numeric-column/NumericColumn#constructor
 )
 (func $assembly/core/schema/isNumericType (param $0 i32) (result i32)
  local.get $0
  i32.const 4
  i32.ne
 )
 (func $assembly/core/schema/getColumnTypeSize (param $0 i32) (result i32)
  block $case5|0
   block $case4|0
    block $case3|0
     block $case1|0
      local.get $0
      br_table $case1|0 $case3|0 $case1|0 $case3|0 $case4|0 $case5|0
     end
     i32.const 4
     return
    end
    i32.const 8
    return
   end
   i32.const 0
   return
  end
  i32.const 4
 )
 (func $assembly/core/schema/columnTypeToDataType (param $0 i32) (result i32)
  block $case4|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $0
       br_table $case0|0 $case1|0 $case2|0 $case3|0 $case4|0
      end
      i32.const 0
      return
     end
     i32.const 1
     return
    end
    i32.const 2
    return
   end
   i32.const 3
   return
  end
  i32.const 3
 )
 (func $assembly/dataframe/builder/createDataFrameBuilder (param $0 i32) (result i32)
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#constructor
 )
 (func $assembly/simd/simd-aggregations/simdSumF32 (param $0 i32) (param $1 i32) (result f32)
  (local $2 i32)
  (local $3 v128)
  (local $4 f32)
  (local $5 v128)
  (local $6 v128)
  (local $7 v128)
  (local $8 i32)
  local.get $1
  i32.const -16
  i32.and
  local.tee $8
  i32.const 0
  i32.gt_s
  if (result f32)
   loop $while-continue|0
    local.get $2
    local.get $8
    i32.lt_s
    if
     local.get $3
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.add
     local.set $3
     local.get $5
     local.get $0
     local.get $2
     i32.const 4
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.add
     local.set $5
     local.get $6
     local.get $0
     local.get $2
     i32.const 8
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.add
     local.set $6
     local.get $7
     local.get $0
     local.get $2
     i32.const 12
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.add
     local.set $7
     local.get $2
     i32.const 16
     i32.add
     local.set $2
     br $while-continue|0
    end
   end
   local.get $3
   local.get $5
   f32x4.add
   local.get $6
   local.get $7
   f32x4.add
   f32x4.add
   local.tee $3
   f32x4.extract_lane 0
   local.get $3
   f32x4.extract_lane 1
   f32.add
   local.get $3
   f32x4.extract_lane 2
   f32.add
   local.get $3
   f32x4.extract_lane 3
   f32.add
  else
   f32.const 0
  end
  local.set $4
  loop $while-continue|1
   local.get $1
   local.get $2
   i32.gt_s
   if
    local.get $4
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    f32.load
    f32.add
    local.set $4
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $while-continue|1
   end
  end
  local.get $4
 )
 (func $assembly/simd/simd-aggregations/simdSumF64 (param $0 i32) (param $1 i32) (result f64)
  (local $2 i32)
  (local $3 v128)
  (local $4 f64)
  (local $5 v128)
  (local $6 v128)
  (local $7 v128)
  (local $8 i32)
  local.get $1
  i32.const -8
  i32.and
  local.tee $8
  i32.const 0
  i32.gt_s
  if (result f64)
   loop $while-continue|0
    local.get $2
    local.get $8
    i32.lt_s
    if
     local.get $3
     local.get $0
     local.get $2
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.add
     local.set $3
     local.get $5
     local.get $0
     local.get $2
     i32.const 2
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.add
     local.set $5
     local.get $6
     local.get $0
     local.get $2
     i32.const 4
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.add
     local.set $6
     local.get $7
     local.get $0
     local.get $2
     i32.const 6
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.add
     local.set $7
     local.get $2
     i32.const 8
     i32.add
     local.set $2
     br $while-continue|0
    end
   end
   local.get $3
   local.get $5
   f64x2.add
   local.get $6
   local.get $7
   f64x2.add
   f64x2.add
   local.tee $3
   f64x2.extract_lane 0
   local.get $3
   f64x2.extract_lane 1
   f64.add
  else
   f64.const 0
  end
  local.set $4
  loop $while-continue|1
   local.get $1
   local.get $2
   i32.gt_s
   if
    local.get $4
    local.get $0
    local.get $2
    i32.const 3
    i32.shl
    i32.add
    f64.load
    f64.add
    local.set $4
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $while-continue|1
   end
  end
  local.get $4
 )
 (func $assembly/simd/simd-aggregations/simdMinF32 (param $0 i32) (param $1 i32) (result f32)
  (local $2 f32)
  (local $3 f32)
  (local $4 v128)
  (local $5 i32)
  (local $6 v128)
  (local $7 v128)
  (local $8 v128)
  (local $9 i32)
  local.get $1
  i32.eqz
  if
   f32.const inf
   return
  end
  local.get $1
  i32.const -16
  i32.and
  local.tee $5
  i32.const 0
  i32.gt_s
  if (result f32)
   v128.const i32x4 0x7f800000 0x7f800000 0x7f800000 0x7f800000
   local.set $8
   v128.const i32x4 0x7f800000 0x7f800000 0x7f800000 0x7f800000
   local.set $7
   v128.const i32x4 0x7f800000 0x7f800000 0x7f800000 0x7f800000
   local.set $6
   v128.const i32x4 0x7f800000 0x7f800000 0x7f800000 0x7f800000
   local.set $4
   loop $while-continue|0
    local.get $5
    local.get $9
    i32.gt_s
    if
     local.get $8
     local.get $0
     local.get $9
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.min
     local.set $8
     local.get $7
     local.get $0
     local.get $9
     i32.const 4
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.min
     local.set $7
     local.get $6
     local.get $0
     local.get $9
     i32.const 8
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.min
     local.set $6
     local.get $4
     local.get $0
     local.get $9
     i32.const 12
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.min
     local.set $4
     local.get $9
     i32.const 16
     i32.add
     local.set $9
     br $while-continue|0
    end
   end
   local.get $8
   local.get $7
   f32x4.min
   local.get $6
   local.get $4
   f32x4.min
   f32x4.min
   local.tee $4
   f32x4.extract_lane 0
   local.get $4
   f32x4.extract_lane 1
   f32.min
   local.get $4
   f32x4.extract_lane 2
   local.get $4
   f32x4.extract_lane 3
   f32.min
   f32.min
  else
   f32.const inf
  end
  local.set $3
  loop $while-continue|1
   local.get $1
   local.get $9
   i32.gt_s
   if
    local.get $0
    local.get $9
    i32.const 2
    i32.shl
    i32.add
    f32.load
    local.tee $2
    local.get $3
    f32.lt
    if
     local.get $2
     local.set $3
    end
    local.get $9
    i32.const 1
    i32.add
    local.set $9
    br $while-continue|1
   end
  end
  local.get $3
 )
 (func $assembly/simd/simd-aggregations/simdMinF64 (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  (local $3 f64)
  (local $4 v128)
  (local $5 i32)
  (local $6 v128)
  (local $7 v128)
  (local $8 v128)
  (local $9 i32)
  local.get $1
  i32.eqz
  if
   f64.const inf
   return
  end
  local.get $1
  i32.const -8
  i32.and
  local.tee $5
  i32.const 0
  i32.gt_s
  if (result f64)
   v128.const i32x4 0x00000000 0x7ff00000 0x00000000 0x7ff00000
   local.set $8
   v128.const i32x4 0x00000000 0x7ff00000 0x00000000 0x7ff00000
   local.set $7
   v128.const i32x4 0x00000000 0x7ff00000 0x00000000 0x7ff00000
   local.set $6
   v128.const i32x4 0x00000000 0x7ff00000 0x00000000 0x7ff00000
   local.set $4
   loop $while-continue|0
    local.get $5
    local.get $9
    i32.gt_s
    if
     local.get $8
     local.get $0
     local.get $9
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.min
     local.set $8
     local.get $7
     local.get $0
     local.get $9
     i32.const 2
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.min
     local.set $7
     local.get $6
     local.get $0
     local.get $9
     i32.const 4
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.min
     local.set $6
     local.get $4
     local.get $0
     local.get $9
     i32.const 6
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.min
     local.set $4
     local.get $9
     i32.const 8
     i32.add
     local.set $9
     br $while-continue|0
    end
   end
   local.get $8
   local.get $7
   f64x2.min
   local.get $6
   local.get $4
   f64x2.min
   f64x2.min
   local.tee $4
   f64x2.extract_lane 0
   local.get $4
   f64x2.extract_lane 1
   f64.min
  else
   f64.const inf
  end
  local.set $3
  loop $while-continue|1
   local.get $1
   local.get $9
   i32.gt_s
   if
    local.get $0
    local.get $9
    i32.const 3
    i32.shl
    i32.add
    f64.load
    local.tee $2
    local.get $3
    f64.lt
    if
     local.get $2
     local.set $3
    end
    local.get $9
    i32.const 1
    i32.add
    local.set $9
    br $while-continue|1
   end
  end
  local.get $3
 )
 (func $assembly/simd/simd-aggregations/simdMaxF32 (param $0 i32) (param $1 i32) (result f32)
  (local $2 f32)
  (local $3 f32)
  (local $4 v128)
  (local $5 i32)
  (local $6 v128)
  (local $7 v128)
  (local $8 v128)
  (local $9 i32)
  local.get $1
  i32.eqz
  if
   f32.const -inf
   return
  end
  local.get $1
  i32.const -16
  i32.and
  local.tee $5
  i32.const 0
  i32.gt_s
  if (result f32)
   v128.const i32x4 0xff800000 0xff800000 0xff800000 0xff800000
   local.set $8
   v128.const i32x4 0xff800000 0xff800000 0xff800000 0xff800000
   local.set $7
   v128.const i32x4 0xff800000 0xff800000 0xff800000 0xff800000
   local.set $6
   v128.const i32x4 0xff800000 0xff800000 0xff800000 0xff800000
   local.set $4
   loop $while-continue|0
    local.get $5
    local.get $9
    i32.gt_s
    if
     local.get $8
     local.get $0
     local.get $9
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.max
     local.set $8
     local.get $7
     local.get $0
     local.get $9
     i32.const 4
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.max
     local.set $7
     local.get $6
     local.get $0
     local.get $9
     i32.const 8
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.max
     local.set $6
     local.get $4
     local.get $0
     local.get $9
     i32.const 12
     i32.add
     i32.const 2
     i32.shl
     i32.add
     v128.load
     f32x4.max
     local.set $4
     local.get $9
     i32.const 16
     i32.add
     local.set $9
     br $while-continue|0
    end
   end
   local.get $8
   local.get $7
   f32x4.max
   local.get $6
   local.get $4
   f32x4.max
   f32x4.max
   local.tee $4
   f32x4.extract_lane 0
   local.get $4
   f32x4.extract_lane 1
   f32.max
   local.get $4
   f32x4.extract_lane 2
   local.get $4
   f32x4.extract_lane 3
   f32.max
   f32.max
  else
   f32.const -inf
  end
  local.set $3
  loop $while-continue|1
   local.get $1
   local.get $9
   i32.gt_s
   if
    local.get $0
    local.get $9
    i32.const 2
    i32.shl
    i32.add
    f32.load
    local.tee $2
    local.get $3
    f32.gt
    if
     local.get $2
     local.set $3
    end
    local.get $9
    i32.const 1
    i32.add
    local.set $9
    br $while-continue|1
   end
  end
  local.get $3
 )
 (func $assembly/simd/simd-aggregations/simdMaxF64 (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  (local $3 f64)
  (local $4 v128)
  (local $5 i32)
  (local $6 v128)
  (local $7 v128)
  (local $8 v128)
  (local $9 i32)
  local.get $1
  i32.eqz
  if
   f64.const -inf
   return
  end
  local.get $1
  i32.const -8
  i32.and
  local.tee $5
  i32.const 0
  i32.gt_s
  if (result f64)
   v128.const i32x4 0x00000000 0xfff00000 0x00000000 0xfff00000
   local.set $8
   v128.const i32x4 0x00000000 0xfff00000 0x00000000 0xfff00000
   local.set $7
   v128.const i32x4 0x00000000 0xfff00000 0x00000000 0xfff00000
   local.set $6
   v128.const i32x4 0x00000000 0xfff00000 0x00000000 0xfff00000
   local.set $4
   loop $while-continue|0
    local.get $5
    local.get $9
    i32.gt_s
    if
     local.get $8
     local.get $0
     local.get $9
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.max
     local.set $8
     local.get $7
     local.get $0
     local.get $9
     i32.const 2
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.max
     local.set $7
     local.get $6
     local.get $0
     local.get $9
     i32.const 4
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.max
     local.set $6
     local.get $4
     local.get $0
     local.get $9
     i32.const 6
     i32.add
     i32.const 3
     i32.shl
     i32.add
     v128.load
     f64x2.max
     local.set $4
     local.get $9
     i32.const 8
     i32.add
     local.set $9
     br $while-continue|0
    end
   end
   local.get $8
   local.get $7
   f64x2.max
   local.get $6
   local.get $4
   f64x2.max
   f64x2.max
   local.tee $4
   f64x2.extract_lane 0
   local.get $4
   f64x2.extract_lane 1
   f64.max
  else
   f64.const -inf
  end
  local.set $3
  loop $while-continue|1
   local.get $1
   local.get $9
   i32.gt_s
   if
    local.get $0
    local.get $9
    i32.const 3
    i32.shl
    i32.add
    f64.load
    local.tee $2
    local.get $3
    f64.gt
    if
     local.get $2
     local.set $3
    end
    local.get $9
    i32.const 1
    i32.add
    local.set $9
    br $while-continue|1
   end
  end
  local.get $3
 )
 (func $assembly/simd/simd-arithmetic/simdAddF32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -4
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f32x4.add
    v128.store
    local.get $4
    i32.const 4
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  loop $while-continue|1
   local.get $3
   local.get $4
   i32.gt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    f32.load
    local.get $1
    local.get $5
    i32.add
    f32.load
    f32.add
    f32.store
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $while-continue|1
   end
  end
 )
 (func $assembly/simd/simd-arithmetic/simdAddF64 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -2
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 3
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f64x2.add
    v128.store
    local.get $4
    i32.const 2
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  local.get $3
  local.get $4
  i32.gt_s
  if
   local.get $4
   i32.const 3
   i32.shl
   local.tee $3
   local.get $2
   i32.add
   local.get $0
   local.get $3
   i32.add
   f64.load
   local.get $1
   local.get $3
   i32.add
   f64.load
   f64.add
   f64.store
  end
 )
 (func $assembly/simd/simd-arithmetic/simdSubF32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -4
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f32x4.sub
    v128.store
    local.get $4
    i32.const 4
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  loop $while-continue|1
   local.get $3
   local.get $4
   i32.gt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    f32.load
    local.get $1
    local.get $5
    i32.add
    f32.load
    f32.sub
    f32.store
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $while-continue|1
   end
  end
 )
 (func $assembly/simd/simd-arithmetic/simdSubF64 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -2
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 3
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f64x2.sub
    v128.store
    local.get $4
    i32.const 2
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  local.get $3
  local.get $4
  i32.gt_s
  if
   local.get $4
   i32.const 3
   i32.shl
   local.tee $3
   local.get $2
   i32.add
   local.get $0
   local.get $3
   i32.add
   f64.load
   local.get $1
   local.get $3
   i32.add
   f64.load
   f64.sub
   f64.store
  end
 )
 (func $assembly/simd/simd-arithmetic/simdMulF32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -4
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f32x4.mul
    v128.store
    local.get $4
    i32.const 4
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  loop $while-continue|1
   local.get $3
   local.get $4
   i32.gt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    f32.load
    local.get $1
    local.get $5
    i32.add
    f32.load
    f32.mul
    f32.store
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $while-continue|1
   end
  end
 )
 (func $assembly/simd/simd-arithmetic/simdMulF64 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -2
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 3
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f64x2.mul
    v128.store
    local.get $4
    i32.const 2
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  local.get $3
  local.get $4
  i32.gt_s
  if
   local.get $4
   i32.const 3
   i32.shl
   local.tee $3
   local.get $2
   i32.add
   local.get $0
   local.get $3
   i32.add
   f64.load
   local.get $1
   local.get $3
   i32.add
   f64.load
   f64.mul
   f64.store
  end
 )
 (func $assembly/simd/simd-arithmetic/simdDivF32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -4
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f32x4.div
    v128.store
    local.get $4
    i32.const 4
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  loop $while-continue|1
   local.get $3
   local.get $4
   i32.gt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    f32.load
    local.get $1
    local.get $5
    i32.add
    f32.load
    f32.div
    f32.store
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $while-continue|1
   end
  end
 )
 (func $assembly/simd/simd-arithmetic/simdDivF64 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $3
  i32.const -2
  i32.and
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $4
    i32.const 3
    i32.shl
    local.tee $5
    local.get $2
    i32.add
    local.get $0
    local.get $5
    i32.add
    v128.load
    local.get $1
    local.get $5
    i32.add
    v128.load
    f64x2.div
    v128.store
    local.get $4
    i32.const 2
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  local.get $3
  local.get $4
  i32.gt_s
  if
   local.get $4
   i32.const 3
   i32.shl
   local.tee $3
   local.get $2
   i32.add
   local.get $0
   local.get $3
   i32.add
   f64.load
   local.get $1
   local.get $3
   i32.add
   f64.load
   f64.div
   f64.store
  end
 )
 (func $assembly/simd/simd-arithmetic/simdScalarMulF32 (param $0 i32) (param $1 f32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 v128)
  (local $6 i32)
  (local $7 i32)
  local.get $3
  i32.const -4
  i32.and
  local.set $7
  local.get $1
  f32x4.splat
  local.set $5
  loop $while-continue|0
   local.get $4
   local.get $7
   i32.lt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $6
    local.get $2
    i32.add
    local.get $0
    local.get $6
    i32.add
    v128.load
    local.get $5
    f32x4.mul
    v128.store
    local.get $4
    i32.const 4
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  loop $while-continue|1
   local.get $3
   local.get $4
   i32.gt_s
   if
    local.get $4
    i32.const 2
    i32.shl
    local.tee $6
    local.get $2
    i32.add
    local.get $0
    local.get $6
    i32.add
    f32.load
    local.get $1
    f32.mul
    f32.store
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $while-continue|1
   end
  end
 )
 (func $assembly/simd/simd-arithmetic/simdScalarMulF64 (param $0 i32) (param $1 f64) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 v128)
  (local $7 i32)
  local.get $3
  i32.const -2
  i32.and
  local.set $5
  local.get $1
  f64x2.splat
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $5
   i32.lt_s
   if
    local.get $4
    i32.const 3
    i32.shl
    local.tee $7
    local.get $2
    i32.add
    local.get $0
    local.get $7
    i32.add
    v128.load
    local.get $6
    f64x2.mul
    v128.store
    local.get $4
    i32.const 2
    i32.add
    local.set $4
    br $while-continue|0
   end
  end
  local.get $3
  local.get $4
  i32.gt_s
  if
   local.get $4
   i32.const 3
   i32.shl
   local.tee $3
   local.get $2
   i32.add
   local.get $0
   local.get $3
   i32.add
   f64.load
   local.get $1
   f64.mul
   f64.store
  end
 )
 (func $assembly/memory/allocator/allocAligned@varargs (param $0 i32) (param $1 i32) (result i32)
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~argumentsLength
     i32.const 1
     i32.sub
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   i32.const 64
   local.set $1
  end
  local.get $0
  local.get $1
  i32.add
  i32.const 1
  i32.sub
  local.get $1
  i32.div_u
  local.get $1
  i32.mul
  local.set $0
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  call $~lib/rt/tlsf/allocateBlock
  i32.const 4
  i32.add
 )
 (func $assembly/memory/allocator/freeAligned (param $0 i32)
  local.get $0
  if
   local.get $0
   call $~lib/rt/tlsf/__free
  end
 )
 (func $assembly/memory/allocator/reallocAligned@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~argumentsLength
     i32.const 3
     i32.sub
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   i32.const 64
   local.set $3
  end
  local.get $2
  local.get $3
  i32.add
  i32.const 1
  i32.sub
  local.get $3
  i32.div_u
  local.get $3
  i32.mul
  local.set $3
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $3
  call $~lib/rt/tlsf/allocateBlock
  i32.const 4
  i32.add
  local.tee $3
  local.get $0
  local.get $1
  local.get $2
  local.get $1
  local.get $2
  i32.lt_u
  select
  memory.copy
  local.get $0
  if
   local.get $0
   call $~lib/rt/tlsf/__free
  end
  local.get $3
 )
 (func $assembly/memory/allocator/zeroMemory (param $0 i32) (param $1 i32)
  local.get $0
  i32.const 0
  local.get $1
  memory.fill
 )
 (func $assembly/memory/allocator/copyMemory (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  local.get $1
  local.get $2
  memory.copy
 )
 (func $assembly/memory/allocator/getMemoryPages (result i32)
  memory.size
 )
 (func $assembly/memory/allocator/growMemory (param $0 i32) (result i32)
  local.get $0
  memory.grow
 )
 (func $assembly/memory/shared/getMemoryBase (result i32)
  i32.const 0
 )
 (func $assembly/memory/shared/getMemorySize (result i32)
  memory.size
  i32.const 16
  i32.shl
 )
 (func $assembly/memory/shared/createInt32View (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 4
  call $assembly/memory/shared/BufferView#constructor
 )
 (func $assembly/memory/shared/createFloat64View (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 8
  call $assembly/memory/shared/BufferView#constructor
 )
 (func $assembly/memory/shared/createUint8View (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 1
  call $assembly/memory/shared/BufferView#constructor
 )
 (func $assembly/memory/shared/atomicLoadI32 (param $0 i32) (result i32)
  local.get $0
  i32.atomic.load
 )
 (func $assembly/memory/shared/atomicStoreI32 (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.atomic.store
 )
 (func $assembly/memory/shared/atomicAddI32 (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.atomic.rmw.add
 )
 (func $assembly/memory/shared/memoryFence
 )
 (func $~lib/rt/itcms/__pin (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $1
   i32.load offset=4
   i32.const 3
   i32.and
   i32.const 3
   i32.eq
   if
    i32.const 3168
    i32.const 1120
    i32.const 338
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   global.get $~lib/rt/itcms/pinSpace
   local.tee $3
   i32.load offset=8
   local.set $2
   local.get $1
   local.get $3
   i32.const 3
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $1
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   i32.or
   i32.store offset=4
   local.get $3
   local.get $1
   i32.store offset=8
  end
  local.get $0
 )
 (func $~lib/rt/itcms/__unpin (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.const 3
  i32.ne
  if
   i32.const 3232
   i32.const 1120
   i32.const 352
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/state
  i32.const 1
  i32.eq
  if
   local.get $1
   call $~lib/rt/itcms/Object#makeGray
  else
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   global.get $~lib/rt/itcms/fromSpace
   local.tee $0
   i32.load offset=8
   local.set $2
   local.get $1
   local.get $0
   global.get $~lib/rt/itcms/white
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $1
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   i32.or
   i32.store offset=4
   local.get $0
   local.get $1
   i32.store offset=8
  end
 )
 (func $~lib/rt/itcms/__collect
  global.get $~lib/rt/itcms/state
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    global.get $~lib/rt/itcms/state
    if
     call $~lib/rt/itcms/step
     drop
     br $while-continue|0
    end
   end
  end
  call $~lib/rt/itcms/step
  drop
  loop $while-continue|1
   global.get $~lib/rt/itcms/state
   if
    call $~lib/rt/itcms/step
    drop
    br $while-continue|1
   end
  end
  global.get $~lib/rt/itcms/total
  i64.extend_i32_u
  i64.const 200
  i64.mul
  i64.const 100
  i64.div_u
  i32.wrap_i64
  i32.const 1024
  i32.add
  global.set $~lib/rt/itcms/threshold
 )
 (func $~lib/array/Array<~lib/string/String>~visit (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.const 2
  i32.shl
  i32.add
  local.set $2
  loop $while-continue|0
   local.get $1
   local.get $2
   i32.lt_u
   if
    local.get $1
    i32.load
    local.tee $3
    if
     local.get $3
     call $~lib/rt/itcms/__visit
    end
    local.get $1
    i32.const 4
    i32.add
    local.set $1
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  call $~lib/rt/itcms/__visit
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<i32>~visit (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  call $~lib/rt/itcms/__visit
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/dataframe/dataframe/ColumnEntry~visit (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load
  local.tee $1
  if
   local.get $1
   call $~lib/rt/itcms/__visit
  end
  local.get $0
  i32.load offset=4
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
 )
 (func $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>~visit" (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  call $~lib/rt/itcms/__visit
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=8
  local.tee $2
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=16
  i32.const 12
  i32.mul
  i32.add
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.gt_u
   if
    local.get $1
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     local.get $1
     i32.load
     call $~lib/rt/itcms/__visit
     local.get $1
     i32.load offset=4
     call $~lib/rt/itcms/__visit
    end
    local.get $1
    i32.const 12
    i32.add
    local.set $1
    br $while-continue|0
   end
  end
  local.get $2
  call $~lib/rt/itcms/__visit
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $folding-inner3
   block $folding-inner2
    block $folding-inner1
     block $folding-inner0
      block $invalid
       block $assembly/memory/shared/BufferView
        block $~lib/staticarray/StaticArray<f64>
         block $~lib/function/Function<%28i32%2Ci32%29=>i32>
          block $~lib/staticarray/StaticArray<i32>
           block $"~lib/map/Map<~lib/string/String,assembly/core/numeric-column/NumericColumn>"
            block $"~lib/map/Map<i32,i32>"
             block $assembly/ops/groupby/GroupByResult
              block $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>
               block $"~lib/map/Map<~lib/string/String,i32>"
                block $~lib/array/Array<assembly/core/schema/Field>
                 block $assembly/core/schema/Schema
                  block $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>"
                   block $assembly/core/string-column/StringColumn
                    block $assembly/core/validity-bitmap/ValidityBitmap
                     block $assembly/core/numeric-column/NumericColumn
                      block $assembly/dataframe/dataframe/ColumnEntry
                       block $assembly/dataframe/dataframe/DataFrame
                        block $~lib/array/Array<usize>
                         block $~lib/array/Array<i32>
                          block $~lib/array/Array<~lib/string/String>
                           block $~lib/string/String
                            block $~lib/arraybuffer/ArrayBuffer
                             block $~lib/object/Object
                              local.get $0
                              i32.const 8
                              i32.sub
                              i32.load
                              br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner1 $~lib/array/Array<~lib/string/String> $~lib/array/Array<i32> $~lib/array/Array<usize> $assembly/dataframe/dataframe/DataFrame $assembly/dataframe/dataframe/ColumnEntry $assembly/core/numeric-column/NumericColumn $assembly/core/validity-bitmap/ValidityBitmap $assembly/core/string-column/StringColumn $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>" $assembly/core/schema/Schema $folding-inner1 $~lib/array/Array<assembly/core/schema/Field> $"~lib/map/Map<~lib/string/String,i32>" $folding-inner1 $folding-inner1 $folding-inner3 $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null> $assembly/ops/groupby/GroupByResult $"~lib/map/Map<i32,i32>" $"~lib/map/Map<~lib/string/String,assembly/core/numeric-column/NumericColumn>" $~lib/staticarray/StaticArray<i32> $~lib/function/Function<%28i32%2Ci32%29=>i32> $~lib/staticarray/StaticArray<f64> $assembly/memory/shared/BufferView $invalid
                             end
                             return
                            end
                            return
                           end
                           return
                          end
                          local.get $0
                          call $~lib/array/Array<~lib/string/String>~visit
                          return
                         end
                         local.get $0
                         call $~lib/array/Array<i32>~visit
                         return
                        end
                        local.get $0
                        call $~lib/array/Array<i32>~visit
                        return
                       end
                       local.get $0
                       i32.load
                       local.tee $1
                       if
                        local.get $1
                        call $~lib/rt/itcms/__visit
                       end
                       local.get $0
                       i32.load offset=4
                       local.tee $1
                       if
                        local.get $1
                        call $~lib/rt/itcms/__visit
                       end
                       br $folding-inner3
                      end
                      local.get $0
                      call $assembly/dataframe/dataframe/ColumnEntry~visit
                      return
                     end
                     local.get $0
                     i32.load offset=16
                     local.tee $0
                     if
                      local.get $0
                      call $~lib/rt/itcms/__visit
                     end
                     return
                    end
                    return
                   end
                   local.get $0
                   i32.load offset=28
                   local.tee $0
                   if
                    local.get $0
                    call $~lib/rt/itcms/__visit
                   end
                   return
                  end
                  local.get $0
                  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>~visit"
                  return
                 end
                 local.get $0
                 call $assembly/dataframe/dataframe/ColumnEntry~visit
                 return
                end
                local.get $0
                call $~lib/array/Array<~lib/string/String>~visit
                return
               end
               global.get $~lib/memory/__stack_pointer
               i32.const 4
               i32.sub
               global.set $~lib/memory/__stack_pointer
               global.get $~lib/memory/__stack_pointer
               i32.const 3396
               i32.lt_s
               br_if $folding-inner0
               global.get $~lib/memory/__stack_pointer
               i32.const 0
               i32.store
               global.get $~lib/memory/__stack_pointer
               local.get $0
               i32.store
               local.get $0
               i32.load
               call $~lib/rt/itcms/__visit
               global.get $~lib/memory/__stack_pointer
               local.get $0
               i32.store
               local.get $0
               i32.load offset=8
               local.tee $2
               local.set $1
               global.get $~lib/memory/__stack_pointer
               local.get $0
               i32.store
               local.get $1
               local.get $0
               i32.load offset=16
               i32.const 12
               i32.mul
               i32.add
               local.set $0
               loop $while-continue|0
                local.get $0
                local.get $1
                i32.gt_u
                if
                 local.get $1
                 i32.load offset=8
                 i32.const 1
                 i32.and
                 i32.eqz
                 if
                  local.get $1
                  i32.load
                  call $~lib/rt/itcms/__visit
                 end
                 local.get $1
                 i32.const 12
                 i32.add
                 local.set $1
                 br $while-continue|0
                end
               end
               local.get $2
               call $~lib/rt/itcms/__visit
               br $folding-inner2
              end
              local.get $0
              local.get $0
              i32.const 20
              i32.sub
              i32.load offset=16
              i32.add
              local.set $1
              loop $while-continue|01
               local.get $0
               local.get $1
               i32.lt_u
               if
                local.get $0
                i32.load
                local.tee $2
                if
                 local.get $2
                 call $~lib/rt/itcms/__visit
                end
                local.get $0
                i32.const 4
                i32.add
                local.set $0
                br $while-continue|01
               end
              end
              return
             end
             local.get $0
             i32.load
             local.tee $1
             if
              local.get $1
              call $~lib/rt/itcms/__visit
             end
             local.get $0
             i32.load offset=8
             local.tee $1
             if
              local.get $1
              call $~lib/rt/itcms/__visit
             end
             local.get $0
             i32.load offset=12
             local.tee $0
             if
              local.get $0
              call $~lib/rt/itcms/__visit
             end
             return
            end
            global.get $~lib/memory/__stack_pointer
            i32.const 4
            i32.sub
            global.set $~lib/memory/__stack_pointer
            global.get $~lib/memory/__stack_pointer
            i32.const 3396
            i32.lt_s
            br_if $folding-inner0
            global.get $~lib/memory/__stack_pointer
            i32.const 0
            i32.store
            global.get $~lib/memory/__stack_pointer
            local.get $0
            i32.store
            local.get $0
            i32.load
            call $~lib/rt/itcms/__visit
            global.get $~lib/memory/__stack_pointer
            local.get $0
            i32.store
            local.get $0
            i32.load offset=8
            call $~lib/rt/itcms/__visit
            br $folding-inner2
           end
           local.get $0
           call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>~visit"
           return
          end
          return
         end
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.sub
         global.set $~lib/memory/__stack_pointer
         global.get $~lib/memory/__stack_pointer
         i32.const 3396
         i32.lt_s
         br_if $folding-inner0
         global.get $~lib/memory/__stack_pointer
         i32.const 0
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store
         local.get $0
         i32.load offset=4
         call $~lib/rt/itcms/__visit
         br $folding-inner2
        end
        return
       end
       return
      end
      unreachable
     end
     i32.const 36192
     i32.const 36240
     i32.const 1
     i32.const 1
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.load
    local.tee $0
    if
     local.get $0
     call $~lib/rt/itcms/__visit
    end
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
 )
 (func $~setArgumentsLength (param $0 i32)
  local.get $0
  global.set $~argumentsLength
 )
 (func $~start
  memory.size
  i32.const 16
  i32.shl
  i32.const 36164
  i32.sub
  i32.const 1
  i32.shr_u
  global.set $~lib/rt/itcms/threshold
  i32.const 1172
  i32.const 1168
  i32.store
  i32.const 1176
  i32.const 1168
  i32.store
  i32.const 1168
  global.set $~lib/rt/itcms/pinSpace
  i32.const 1204
  i32.const 1200
  i32.store
  i32.const 1208
  i32.const 1200
  i32.store
  i32.const 1200
  global.set $~lib/rt/itcms/toSpace
  i32.const 1348
  i32.const 1344
  i32.store
  i32.const 1352
  i32.const 1344
  i32.store
  i32.const 1344
  global.set $~lib/rt/itcms/fromSpace
 )
 (func $assembly/dataframe/dataframe/DataFrame#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.const 7
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store
   local.get $0
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=8
   local.get $0
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.const 12
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   i32.const 16
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $1
   local.get $2
   i32.store
   local.get $1
   local.get $2
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   i32.const 48
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $1
   local.get $2
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 4
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $0
   local.get $1
   i32.store
   local.get $0
   local.get $1
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   i32.const 0
   i32.const 4
   i32.const 1568
   call $~lib/rt/__newArray
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $0
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   block $__inlined_func$assembly/core/schema/Schema#constructor$1 (result i32)
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.sub
    global.set $~lib/memory/__stack_pointer
    block $folding-inner00
     global.get $~lib/memory/__stack_pointer
     i32.const 3396
     i32.lt_s
     br_if $folding-inner00
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.const 13
     call $~lib/rt/itcms/__new
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     local.get $1
     i32.const 0
     i32.store
     local.get $1
     i32.const 0
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     local.get $1
     i32.const 0
     i32.store offset=4
     local.get $1
     i32.const 0
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     i32.const 0
     i32.const 15
     i32.const 1600
     call $~lib/rt/__newArray
     local.set $2
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=8
     local.get $1
     local.get $2
     i32.store
     local.get $1
     local.get $2
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 3396
     i32.lt_s
     br_if $folding-inner00
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     i32.const 24
     i32.const 16
     call $~lib/rt/itcms/__new
     local.tee $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     i32.const 16
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=8
     local.get $2
     local.get $3
     i32.store
     local.get $2
     local.get $3
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $2
     i32.const 3
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     i32.const 48
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=8
     local.get $2
     local.get $3
     i32.store offset=8
     local.get $2
     local.get $3
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $2
     i32.const 4
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $2
     i32.const 0
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $2
     i32.const 0
     i32.store offset=20
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=8
     local.get $1
     local.get $2
     i32.store offset=4
     local.get $1
     local.get $2
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $1
     br $__inlined_func$assembly/core/schema/Schema#constructor$1
    end
    br $folding-inner1
   end
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $0
   local.get $1
   i32.store offset=8
   local.get $0
   local.get $1
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/dataframe/builder/DataFrameBuilder#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.const 17
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  call $assembly/dataframe/dataframe/DataFrame#constructor
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $1
  local.get $2
  i32.store
  local.get $1
  local.get $2
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/array/Array<~lib/string/String>#get:length (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=12
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<~lib/string/String>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   i32.const 1248
   i32.const 1632
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=4
  local.get $0
  i32.eqz
  if
   i32.const 1680
   i32.const 1632
   i32.const 118
   i32.const 40
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<i32>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   i32.const 1248
   i32.const 1632
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/core/validity-bitmap/ValidityBitmap#free (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load
   call $~lib/rt/tlsf/__free
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.const 0
   i32.store
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/core/validity-bitmap/ValidityBitmap#constructor (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.const 10
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $0
  i32.const 7
  i32.add
  i32.const 3
  i32.shr_s
  i32.const 63
  i32.add
  i32.const 64
  i32.div_s
  i32.const 6
  i32.shl
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $1
  i32.load offset=8
  local.set $0
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  local.get $1
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  call $~lib/rt/tlsf/allocateBlock
  i32.const 4
  i32.add
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 255
  local.get $1
  i32.load offset=8
  memory.fill
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/core/numeric-column/NumericColumn#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 21
  i32.const 9
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 2
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  i32.const 0
  call $assembly/core/validity-bitmap/ValidityBitmap#constructor
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=8
  local.get $2
  local.get $3
  i32.store offset=16
  local.get $2
  local.get $3
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 1
  i32.store8 offset=20
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 1
  i32.store8 offset=20
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  block $assembly/core/numeric-column/getTypeSize|inlined.0 (result i32)
   block $case4|0
    block $case2|0
     block $case0|0
      local.get $1
      br_table $case0|0 $case2|0 $case0|0 $case2|0 $case4|0
     end
     i32.const 4
     br $assembly/core/numeric-column/getTypeSize|inlined.0
    end
    i32.const 8
    br $assembly/core/numeric-column/getTypeSize|inlined.0
   end
   i32.const 4
  end
  local.get $0
  i32.mul
  i32.const 63
  i32.add
  i32.const 64
  i32.div_s
  i32.const 6
  i32.shl
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $2
  i32.load offset=8
  local.set $1
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  local.get $2
  global.get $~lib/rt/tlsf/ROOT
  local.get $1
  call $~lib/rt/tlsf/allocateBlock
  i32.const 4
  i32.add
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.load
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  i32.load offset=8
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.load offset=16
  local.tee $1
  i32.store offset=4
  local.get $1
  call $assembly/core/validity-bitmap/ValidityBitmap#free
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $0
  call $assembly/core/validity-bitmap/ValidityBitmap#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=16
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/core/numeric-column/NumericColumn#copyFromBuffer (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $assembly/core/numeric-column/getTypeSize|inlined.1 (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   block $case4|0
    block $case2|0
     block $case0|0
      local.get $0
      i32.load offset=12
      br_table $case0|0 $case2|0 $case0|0 $case2|0 $case4|0
     end
     i32.const 4
     br $assembly/core/numeric-column/getTypeSize|inlined.1
    end
    i32.const 8
    br $assembly/core/numeric-column/getTypeSize|inlined.1
   end
   i32.const 4
  end
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  local.get $1
  local.get $4
  local.get $2
  local.get $3
  local.get $2
  local.get $3
  i32.lt_s
  select
  i32.mul
  memory.copy
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/core/numeric-column/NumericColumn#get:length (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/util/hash/HASH<~lib/string/String> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $~lib/util/hash/hashStr|inlined.0 (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   i32.const 0
   local.get $0
   i32.eqz
   br_if $~lib/util/hash/hashStr|inlined.0
   drop
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.tee $1
   i32.store offset=4
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const -2
   i32.and
   local.tee $3
   i32.const 16
   i32.ge_u
   if (result i32)
    i32.const 606290984
    local.set $2
    i32.const -2048144777
    local.set $4
    i32.const 1640531535
    local.set $5
    local.get $1
    local.get $3
    i32.add
    i32.const 16
    i32.sub
    local.set $7
    loop $while-continue|0
     local.get $1
     local.get $7
     i32.le_u
     if
      local.get $2
      local.get $1
      i32.load
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $2
      local.get $4
      local.get $1
      i32.load offset=4
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $4
      local.get $6
      local.get $1
      i32.load offset=8
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $6
      local.get $5
      local.get $1
      i32.load offset=12
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $5
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    local.get $3
    local.get $2
    i32.const 1
    i32.rotl
    local.get $4
    i32.const 7
    i32.rotl
    i32.add
    local.get $6
    i32.const 12
    i32.rotl
    i32.add
    local.get $5
    i32.const 18
    i32.rotl
    i32.add
    i32.add
   else
    local.get $3
    i32.const 374761393
    i32.add
   end
   local.set $2
   local.get $0
   local.get $3
   i32.add
   i32.const 4
   i32.sub
   local.set $4
   loop $while-continue|1
    local.get $1
    local.get $4
    i32.le_u
    if
     local.get $2
     local.get $1
     i32.load
     i32.const -1028477379
     i32.mul
     i32.add
     i32.const 17
     i32.rotl
     i32.const 668265263
     i32.mul
     local.set $2
     local.get $1
     i32.const 4
     i32.add
     local.set $1
     br $while-continue|1
    end
   end
   local.get $0
   local.get $3
   i32.add
   local.set $0
   loop $while-continue|2
    local.get $0
    local.get $1
    i32.gt_u
    if
     local.get $2
     local.get $1
     i32.load8_u
     i32.const 374761393
     i32.mul
     i32.add
     i32.const 11
     i32.rotl
     i32.const -1640531535
     i32.mul
     local.set $2
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $while-continue|2
    end
   end
   local.get $2
   local.get $2
   i32.const 15
   i32.shr_u
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $0
   local.get $0
   i32.const 13
   i32.shr_u
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $0
   local.get $0
   i32.const 16
   i32.shr_u
   i32.xor
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String.__eq (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  local.get $1
  i32.eq
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  block $folding-inner0
   local.get $1
   i32.eqz
   local.get $0
   i32.eqz
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $3
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.ne
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $3
   local.tee $0
   i32.const 4
   i32.ge_u
   if (result i32)
    local.get $2
    i32.const 7
    i32.and
    local.get $1
    i32.const 7
    i32.and
    i32.or
   else
    i32.const 1
   end
   i32.eqz
   if
    loop $do-loop|0
     local.get $2
     i64.load
     local.get $1
     i64.load
     i64.eq
     if
      local.get $2
      i32.const 8
      i32.add
      local.set $2
      local.get $1
      i32.const 8
      i32.add
      local.set $1
      local.get $0
      i32.const 4
      i32.sub
      local.tee $0
      i32.const 4
      i32.ge_u
      br_if $do-loop|0
     end
    end
   end
   block $__inlined_func$~lib/util/string/compareImpl$198
    loop $while-continue|1
     local.get $0
     local.tee $3
     i32.const 1
     i32.sub
     local.set $0
     local.get $3
     if
      local.get $2
      i32.load16_u
      local.tee $5
      local.get $1
      i32.load16_u
      local.tee $4
      i32.sub
      local.set $3
      local.get $4
      local.get $5
      i32.ne
      br_if $__inlined_func$~lib/util/string/compareImpl$198
      local.get $2
      i32.const 2
      i32.add
      local.set $2
      local.get $1
      i32.const 2
      i32.add
      local.set $1
      br $while-continue|1
     end
    end
    i32.const 0
    local.set $3
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   i32.eqz
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#find" (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $3
  local.get $2
  local.get $0
  i32.load offset=4
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $2
  loop $while-continue|0
   local.get $2
   if
    local.get $2
    i32.load offset=8
    local.tee $0
    i32.const 1
    i32.and
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.load
     local.tee $3
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     local.get $3
     local.get $1
     call $~lib/string/String.__eq
    end
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $2
     return
    end
    local.get $0
    i32.const -2
    i32.and
    local.set $2
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#rehash" (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 1
  i32.add
  local.tee $2
  i32.const 2
  i32.shl
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $7
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.const 3
  i32.shl
  i32.const 3
  i32.div_s
  local.tee $6
  i32.const 12
  i32.mul
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  i32.load offset=8
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $8
  local.get $0
  i32.load offset=16
  i32.const 12
  i32.mul
  i32.add
  local.set $5
  local.get $3
  local.set $2
  loop $while-continue|0
   local.get $5
   local.get $8
   i32.ne
   if
    local.get $8
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.load
     local.tee $9
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=8
     local.get $2
     local.get $9
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.load offset=4
     local.tee $4
     i32.store offset=8
     local.get $2
     local.get $4
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=8
     local.get $2
     local.get $7
     local.get $9
     call $~lib/util/hash/HASH<~lib/string/String>
     local.get $1
     i32.and
     i32.const 2
     i32.shl
     i32.add
     local.tee $4
     i32.load
     i32.store offset=8
     local.get $4
     local.get $2
     i32.store
     local.get $2
     i32.const 12
     i32.add
     local.set $2
    end
    local.get $8
    i32.const 12
    i32.add
    local.set $8
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store offset=16
  local.get $0
  local.get $7
  i32.store
  local.get $0
  local.get $7
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=16
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $0
  local.get $3
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $6
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=16
  local.get $0
  local.get $0
  i32.load offset=20
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#set" (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  local.get $3
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#find"
  local.tee $4
  if
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $4
   local.get $2
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 1
   call $~lib/rt/itcms/__link
  else
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=16
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $4
   local.get $0
   i32.load offset=12
   i32.eq
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=20
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $4
    local.get $0
    i32.load offset=12
    i32.const 3
    i32.mul
    i32.const 4
    i32.div_s
    i32.lt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     i32.load offset=4
    else
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     i32.load offset=4
     i32.const 1
     i32.shl
     i32.const 1
     i32.or
    end
    call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#rehash"
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=8
   local.tee $4
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $0
   i32.load offset=16
   local.tee $5
   i32.const 1
   i32.add
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $4
   local.get $5
   i32.const 12
   i32.mul
   i32.add
   local.tee $4
   local.get $1
   i32.store
   local.get $0
   local.get $1
   i32.const 1
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $4
   local.get $2
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 1
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $0
   i32.load offset=20
   i32.const 1
   i32.add
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $4
   local.get $1
   local.get $3
   local.get $0
   i32.load offset=4
   i32.and
   i32.const 2
   i32.shl
   i32.add
   local.tee $0
   i32.load
   i32.store offset=8
   local.get $0
   local.get $4
   i32.store
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/ensureCapacity (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $4
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $1
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1456
    i32.const 1632
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load
   local.set $3
   i32.const 8
   local.get $1
   local.get $1
   i32.const 8
   i32.le_u
   select
   i32.const 2
   i32.shl
   local.set $1
   local.get $2
   if
    i32.const 1073741820
    local.get $4
    i32.const 1
    i32.shl
    local.tee $2
    local.get $2
    i32.const 1073741820
    i32.ge_u
    select
    local.tee $2
    local.get $1
    local.get $1
    local.get $2
    i32.lt_u
    select
    local.set $1
   end
   block $__inlined_func$~lib/rt/itcms/__renew$866
    local.get $3
    i32.const 20
    i32.sub
    local.tee $4
    i32.load
    i32.const -4
    i32.and
    i32.const 16
    i32.sub
    local.get $1
    i32.ge_u
    if
     local.get $4
     local.get $1
     i32.store offset=16
     local.get $3
     local.set $2
     br $__inlined_func$~lib/rt/itcms/__renew$866
    end
    local.get $1
    local.get $4
    i32.load offset=12
    call $~lib/rt/itcms/__new
    local.tee $2
    local.get $3
    local.get $1
    local.get $4
    i32.load offset=16
    local.tee $4
    local.get $1
    local.get $4
    i32.lt_u
    select
    memory.copy
   end
   local.get $2
   local.get $3
   i32.ne
   if
    local.get $0
    local.get $2
    i32.store
    local.get $0
    local.get $2
    i32.store offset=4
    local.get $0
    local.get $2
    i32.const 0
    call $~lib/rt/itcms/__link
   end
   local.get $0
   local.get $1
   i32.store offset=8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<~lib/string/String>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.add
  local.tee $3
  i32.const 1
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.const 1
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $3
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $"~lib/map/Map<~lib/string/String,i32>#set" (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   call $~lib/util/hash/HASH<~lib/string/String>
   local.set $7
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   local.get $7
   call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#find"
   local.tee $3
   if
    local.get $3
    local.get $2
    i32.store offset=4
   else
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=16
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $3
    local.get $0
    i32.load offset=12
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     i32.load offset=20
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $3
     local.get $0
     i32.load offset=12
     i32.const 3
     i32.mul
     i32.const 4
     i32.div_s
     i32.lt_s
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      local.get $0
      i32.load offset=4
     else
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      local.get $0
      i32.load offset=4
      i32.const 1
      i32.shl
      i32.const 1
      i32.or
     end
     local.set $8
     global.get $~lib/memory/__stack_pointer
     i32.const 20
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 3396
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.const 20
     memory.fill
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.const 1
     i32.add
     local.tee $3
     i32.const 2
     i32.shl
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $9
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 3
     i32.shl
     i32.const 3
     i32.div_s
     local.tee $6
     i32.const 12
     i32.mul
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $4
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     i32.load offset=8
     local.set $10
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $10
     local.get $0
     i32.load offset=16
     i32.const 12
     i32.mul
     i32.add
     local.set $5
     local.get $4
     local.set $3
     loop $while-continue|0
      local.get $5
      local.get $10
      i32.ne
      if
       local.get $10
       i32.load offset=8
       i32.const 1
       i32.and
       i32.eqz
       if
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.load
        local.tee $11
        i32.store offset=12
        global.get $~lib/memory/__stack_pointer
        local.get $11
        i32.store offset=8
        local.get $3
        local.get $11
        i32.store
        local.get $3
        local.get $10
        i32.load offset=4
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $11
        i32.store offset=8
        local.get $3
        local.get $9
        local.get $11
        call $~lib/util/hash/HASH<~lib/string/String>
        local.get $8
        i32.and
        i32.const 2
        i32.shl
        i32.add
        local.tee $11
        i32.load
        i32.store offset=8
        local.get $11
        local.get $3
        i32.store
        local.get $3
        i32.const 12
        i32.add
        local.set $3
       end
       local.get $10
       i32.const 12
       i32.add
       local.set $10
       br $while-continue|0
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=16
     local.get $0
     local.get $9
     i32.store
     local.get $0
     local.get $9
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     local.get $8
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=16
     local.get $0
     local.get $4
     i32.store offset=8
     local.get $0
     local.get $4
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     local.get $6
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=16
     local.get $0
     local.get $0
     i32.load offset=20
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     i32.const 20
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $3
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $0
    i32.load offset=16
    local.tee $4
    i32.const 1
    i32.add
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $3
    local.get $4
    i32.const 12
    i32.mul
    i32.add
    local.tee $3
    local.get $1
    i32.store
    local.get $0
    local.get $1
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $3
    local.get $2
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $0
    i32.load offset=20
    i32.const 1
    i32.add
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $3
    local.get $1
    local.get $7
    local.get $0
    i32.load offset=4
    i32.and
    i32.const 2
    i32.shl
    i32.add
    local.tee $0
    i32.load
    i32.store offset=8
    local.get $0
    local.get $3
    i32.store
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/dataframe/dataframe/DataFrame#addNumericColumn (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 20
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=12
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    call $assembly/core/numeric-column/NumericColumn#get:length
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $4
    local.get $0
    i32.load offset=12
    i32.ne
    if
     i32.const 1808
     i32.const 1952
     i32.const 98
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
   else
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=4
    local.get $0
    local.get $2
    call $assembly/core/numeric-column/NumericColumn#get:length
    i32.store offset=12
   end
   global.get $~lib/memory/__stack_pointer
   local.set $4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 8
   call $~lib/rt/itcms/__new
   local.tee $5
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store
   local.get $5
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store
   local.get $5
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   local.get $3
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $4
   local.get $5
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   local.get $5
   local.get $2
   i32.store
   local.get $5
   local.get $2
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=12
   local.get $2
   local.get $1
   local.get $5
   call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#set"
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $2
   local.get $1
   call $~lib/array/Array<~lib/string/String>#push
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=8
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store
   local.get $2
   call $~lib/array/Array<~lib/string/String>#get:length
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 9
   i32.const 14
   call $~lib/rt/itcms/__new
   local.tee $5
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store
   local.get $5
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 0
   i32.store8 offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $5
   local.get $1
   i32.store
   local.get $5
   local.get $1
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   local.get $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   i32.const 1
   i32.store8 offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $4
   local.get $5
   call $~lib/array/Array<~lib/string/String>#push
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   local.get $2
   call $"~lib/map/Map<~lib/string/String,i32>#set"
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/dataframe/dataframe/DataFrame#addInt32Column (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $2
  i32.const 0
  call $assembly/dataframe/dataframe/DataFrame#addNumericColumn
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/dataframe/dataframe/DataFrame#addInt64Column (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $2
  i32.const 1
  call $assembly/dataframe/dataframe/DataFrame#addNumericColumn
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/dataframe/dataframe/DataFrame#addFloat32Column (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $2
  i32.const 2
  call $assembly/dataframe/dataframe/DataFrame#addNumericColumn
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/dataframe/dataframe/DataFrame#addFloat64Column (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $2
  i32.const 3
  call $assembly/dataframe/dataframe/DataFrame#addNumericColumn
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/dataframe/builder/DataFrameBuilder#build (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/dataframe/builder/buildDataFrameFromArrays (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $assembly/dataframe/builder/DataFrameBuilder#constructor
   local.tee $4
   i32.store
   loop $for-loop|0
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    local.get $1
    call $~lib/array/Array<~lib/string/String>#get:length
    local.get $6
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $1
     local.get $6
     call $~lib/array/Array<~lib/string/String>#__get
     local.tee $5
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $2
     local.get $6
     call $~lib/array/Array<i32>#__get
     local.set $7
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 3396
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $6
     local.get $3
     i32.load offset=12
     i32.ge_u
     if
      i32.const 1248
      i32.const 1632
      i32.const 114
      i32.const 42
      call $~lib/builtins/abort
      unreachable
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $3
     i32.load offset=4
     local.get $6
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.set $8
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     block $break|1
      block $case3|1
       block $case2|1
        block $case1|1
         block $case0|1
          local.get $7
          br_table $case0|1 $case1|1 $case2|1 $case3|1 $break|1
         end
         global.get $~lib/memory/__stack_pointer
         local.get $4
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $5
         i32.store offset=12
         global.get $~lib/memory/__stack_pointer
         i32.const 20
         i32.sub
         global.set $~lib/memory/__stack_pointer
         global.get $~lib/memory/__stack_pointer
         i32.const 3396
         i32.lt_s
         br_if $folding-inner0
         global.get $~lib/memory/__stack_pointer
         i32.const 0
         i32.const 20
         memory.fill
         global.get $~lib/memory/__stack_pointer
         local.get $4
         i32.store
         local.get $0
         local.get $4
         i32.load offset=4
         i32.ne
         if
          i32.const 1808
          i32.const 1872
          i32.const 25
          i32.const 7
          call $~lib/builtins/abort
          unreachable
         end
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.const 0
         call $assembly/core/numeric-column/NumericColumn#constructor
         local.tee $7
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $7
         i32.store
         local.get $7
         local.get $8
         local.get $0
         call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
         global.get $~lib/memory/__stack_pointer
         local.get $4
         i32.store offset=16
         global.get $~lib/memory/__stack_pointer
         local.get $4
         i32.load
         local.tee $8
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $5
         i32.store offset=8
         global.get $~lib/memory/__stack_pointer
         local.get $7
         i32.store offset=12
         local.get $8
         local.get $5
         local.get $7
         call $assembly/dataframe/dataframe/DataFrame#addInt32Column
         global.get $~lib/memory/__stack_pointer
         i32.const 20
         i32.add
         global.set $~lib/memory/__stack_pointer
         br $break|1
        end
        global.get $~lib/memory/__stack_pointer
        local.get $4
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store offset=12
        global.get $~lib/memory/__stack_pointer
        i32.const 20
        i32.sub
        global.set $~lib/memory/__stack_pointer
        global.get $~lib/memory/__stack_pointer
        i32.const 3396
        i32.lt_s
        br_if $folding-inner0
        global.get $~lib/memory/__stack_pointer
        i32.const 0
        i32.const 20
        memory.fill
        global.get $~lib/memory/__stack_pointer
        local.get $4
        i32.store
        local.get $0
        local.get $4
        i32.load offset=4
        i32.ne
        if
         i32.const 1808
         i32.const 1872
         i32.const 36
         i32.const 7
         call $~lib/builtins/abort
         unreachable
        end
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.const 1
        call $assembly/core/numeric-column/NumericColumn#constructor
        local.tee $7
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $7
        i32.store
        local.get $7
        local.get $8
        local.get $0
        call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
        global.get $~lib/memory/__stack_pointer
        local.get $4
        i32.store offset=16
        global.get $~lib/memory/__stack_pointer
        local.get $4
        i32.load
        local.tee $8
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store offset=8
        global.get $~lib/memory/__stack_pointer
        local.get $7
        i32.store offset=12
        local.get $8
        local.get $5
        local.get $7
        call $assembly/dataframe/dataframe/DataFrame#addInt64Column
        global.get $~lib/memory/__stack_pointer
        i32.const 20
        i32.add
        global.set $~lib/memory/__stack_pointer
        br $break|1
       end
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $5
       i32.store offset=12
       global.get $~lib/memory/__stack_pointer
       i32.const 20
       i32.sub
       global.set $~lib/memory/__stack_pointer
       global.get $~lib/memory/__stack_pointer
       i32.const 3396
       i32.lt_s
       br_if $folding-inner0
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       i32.const 20
       memory.fill
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store
       local.get $0
       local.get $4
       i32.load offset=4
       i32.ne
       if
        i32.const 1808
        i32.const 1872
        i32.const 47
        i32.const 7
        call $~lib/builtins/abort
        unreachable
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.const 2
       call $assembly/core/numeric-column/NumericColumn#constructor
       local.tee $7
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store
       local.get $7
       local.get $8
       local.get $0
       call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=16
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.load
       local.tee $8
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $5
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store offset=12
       local.get $8
       local.get $5
       local.get $7
       call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
       global.get $~lib/memory/__stack_pointer
       i32.const 20
       i32.add
       global.set $~lib/memory/__stack_pointer
       br $break|1
      end
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      i32.const 20
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 3396
      i32.lt_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.const 20
      memory.fill
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store
      local.get $0
      local.get $4
      i32.load offset=4
      i32.ne
      if
       i32.const 1808
       i32.const 1872
       i32.const 58
       i32.const 7
       call $~lib/builtins/abort
       unreachable
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.const 3
      call $assembly/core/numeric-column/NumericColumn#constructor
      local.tee $7
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store
      local.get $7
      local.get $8
      local.get $0
      call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.load
      local.tee $8
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store offset=12
      local.get $8
      local.get $5
      local.get $7
      call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
      global.get $~lib/memory/__stack_pointer
      i32.const 20
      i32.add
      global.set $~lib/memory/__stack_pointer
     end
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   call $assembly/dataframe/builder/DataFrameBuilder#build
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#has" (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#find"
  i32.const 0
  i32.ne
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#get" (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#find"
  local.tee $0
  i32.eqz
  if
   i32.const 2048
   i32.const 2112
   i32.const 105
   i32.const 17
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/dataframe/dataframe/DataFrame#getNumericColumn (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $2
  local.get $1
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#has"
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#get"
  local.tee $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1248
   i32.const 2416
   i32.const 93
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  local.get $0
  local.get $2
  i32.const 1
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/ops/join/JoinHashTable#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.const 18
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  i32.const 1
  call $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#constructor
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $1
  local.get $2
  i32.store
  local.get $1
  local.get $2
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  i32.const 1
  local.set $2
  loop $while-continue|0
   local.get $2
   local.get $0
   i32.const 1
   i32.shl
   i32.lt_s
   if
    local.get $2
    i32.const 1
    i32.shl
    local.set $2
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $2
  call $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__link
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   local.get $2
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.load
    local.tee $3
    i32.store offset=4
    local.get $3
    local.get $0
    i32.const 0
    call $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#__set
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1248
   i32.const 2416
   i32.const 78
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/ops/join/JoinHashTable#insert (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 24
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.load offset=4
   i32.const 1
   i32.sub
   local.get $1
   i32.const 255
   i32.and
   i32.const -2128831035
   i32.xor
   i32.const 16777619
   i32.mul
   local.get $1
   i32.const 8
   i32.shr_s
   i32.const 255
   i32.and
   i32.xor
   i32.const 16777619
   i32.mul
   local.get $1
   i32.const 16
   i32.shr_s
   i32.const 255
   i32.and
   i32.xor
   i32.const 16777619
   i32.mul
   local.get $1
   i32.const 24
   i32.shr_s
   i32.const 255
   i32.and
   i32.xor
   i32.const 16777619
   i32.mul
   i32.and
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.set $5
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 19
   call $~lib/rt/itcms/__new
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $3
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $3
   i32.const 0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $3
   i32.const 0
   i32.store offset=8
   local.get $3
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $3
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $3
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $3
   i32.const 0
   i32.store offset=8
   local.get $3
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $5
   local.get $3
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $1
   i32.store offset=16
   local.get $1
   local.get $4
   call $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#__get
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=12
   local.get $3
   local.get $1
   i32.store offset=8
   local.get $3
   local.get $1
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   local.get $1
   local.get $4
   local.get $3
   call $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#__set
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   local.get $0
   local.get $0
   i32.load offset=8
   i32.const 1
   i32.add
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/array/Array<i32>#set:length (param $0 i32) (param $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<i32>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.add
  local.tee $3
  i32.const 1
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $3
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/ops/join/JoinHashTable#find (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.load offset=4
  i32.const 1
  i32.sub
  local.get $1
  i32.const 255
  i32.and
  i32.const -2128831035
  i32.xor
  i32.const 16777619
  i32.mul
  local.get $1
  i32.const 8
  i32.shr_s
  i32.const 255
  i32.and
  i32.xor
  i32.const 16777619
  i32.mul
  local.get $1
  i32.const 16
  i32.shr_s
  i32.const 255
  i32.and
  i32.xor
  i32.const 16777619
  i32.mul
  local.get $1
  i32.const 24
  i32.shr_s
  i32.const 255
  i32.and
  i32.xor
  i32.const 16777619
  i32.mul
  i32.and
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $3
  call $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#__get
  local.tee $0
  i32.store offset=12
  loop $while-continue|0
   local.get $0
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $1
    local.get $0
    i32.load
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $2
     local.get $0
     i32.load offset=4
     call $~lib/array/Array<i32>#push
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $0
    i32.store offset=12
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<~lib/string/String>#slice@varargs (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   block $2of2
    block $1of2
     block $outOfRange
      global.get $~argumentsLength
      br_table $1of2 $1of2 $2of2 $outOfRange
     end
     unreachable
    end
    i32.const 2147483647
    local.set $1
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=12
   local.tee $2
   i32.const 0
   local.get $2
   i32.const 0
   i32.le_s
   select
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $1
   local.get $2
   local.get $1
   local.get $2
   i32.lt_s
   select
   local.get $3
   i32.sub
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.gt_s
   select
   local.tee $2
   i32.const 4
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   i32.load offset=4
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=4
   local.get $3
   i32.const 2
   i32.shl
   i32.add
   local.set $3
   i32.const 0
   local.set $0
   local.get $2
   i32.const 2
   i32.shl
   local.set $2
   loop $while-continue|0
    local.get $0
    local.get $2
    i32.lt_u
    if
     local.get $0
     local.get $4
     i32.add
     local.get $0
     local.get $3
     i32.add
     i32.load
     local.tee $5
     i32.store
     local.get $1
     local.get $5
     i32.const 1
     call $~lib/rt/itcms/__link
     local.get $0
     i32.const 4
     i32.add
     local.set $0
     br $while-continue|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/dataframe/dataframe/DataFrame#getColumnNames (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=4
  local.tee $0
  i32.store
  i32.const 1
  global.set $~argumentsLength
  local.get $0
  call $~lib/array/Array<~lib/string/String>#slice@varargs
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/dataframe/dataframe/DataFrame#getColumnType (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $2
  local.get $1
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#has"
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 3
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#get"
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=8
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/dataframe/dataframe/DataFrame#hasColumn (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#has"
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String.__concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.tee $2
   i32.store
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const -2
   i32.and
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   block $__inlined_func$~lib/string/String#concat$939
    local.get $1
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const -2
    i32.and
    local.tee $4
    local.get $3
    i32.add
    local.tee $0
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 2608
     local.set $0
     br $__inlined_func$~lib/string/String#concat$939
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.const 2
    call $~lib/rt/itcms/__new
    local.tee $0
    i32.store offset=4
    local.get $0
    local.get $2
    local.get $3
    memory.copy
    local.get $0
    local.get $3
    i32.add
    local.get $1
    local.get $4
    memory.copy
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/ops/join/copyColumnByIndicesNullable (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $break|0
   block $case2|0
    block $case0|0
     local.get $0
     call $~lib/array/Array<~lib/string/String>#get:length
     br_table $case0|0 $case2|0 $case0|0 $case2|0 $break|0
    end
    i32.const 0
    local.set $0
    loop $for-loop|1
     local.get $0
     local.get $5
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store
      local.get $2
      local.get $0
      call $~lib/array/Array<i32>#__get
      local.tee $6
      i32.const 0
      i32.ge_s
      if
       local.get $3
       local.get $0
       i32.const 2
       i32.shl
       i32.add
       local.get $4
       local.get $6
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.store
      else
       local.get $3
       local.get $0
       i32.const 2
       i32.shl
       i32.add
       i32.const 0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.load offset=16
       local.tee $6
       i32.store offset=8
       local.get $0
       i32.const 0
       i32.lt_s
       if (result i32)
        i32.const 1
       else
        global.get $~lib/memory/__stack_pointer
        local.get $6
        i32.store
        local.get $0
        local.get $6
        i32.load offset=4
        i32.ge_s
       end
       i32.eqz
       if
        global.get $~lib/memory/__stack_pointer
        local.get $6
        i32.store
        local.get $0
        i32.const 3
        i32.shr_s
        local.tee $7
        local.get $6
        i32.load
        i32.add
        i32.load8_u
        local.set $8
        global.get $~lib/memory/__stack_pointer
        local.get $6
        i32.store
        local.get $7
        local.get $6
        i32.load
        i32.add
        local.get $8
        i32.const -2
        local.get $0
        i32.const 7
        i32.and
        i32.rotl
        i32.and
        i32.store8
       end
      end
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|1
     end
    end
    br $break|0
   end
   i32.const 0
   local.set $0
   loop $for-loop|2
    local.get $0
    local.get $5
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     local.get $0
     call $~lib/array/Array<i32>#__get
     local.tee $6
     i32.const 0
     i32.ge_s
     if
      local.get $3
      local.get $0
      i32.const 3
      i32.shl
      i32.add
      local.get $4
      local.get $6
      i32.const 3
      i32.shl
      i32.add
      i64.load
      i64.store
     else
      local.get $3
      local.get $0
      i32.const 3
      i32.shl
      i32.add
      i64.const 0
      i64.store
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.load offset=16
      local.tee $6
      i32.store offset=16
      local.get $0
      i32.const 0
      i32.lt_s
      if (result i32)
       i32.const 1
      else
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       local.get $0
       local.get $6
       i32.load offset=4
       i32.ge_s
      end
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       local.get $0
       i32.const 3
       i32.shr_s
       local.tee $7
       local.get $6
       i32.load
       i32.add
       i32.load8_u
       local.set $8
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       local.get $7
       local.get $6
       i32.load
       i32.add
       local.get $8
       i32.const -2
       local.get $0
       i32.const 7
       i32.and
       i32.rotl
       i32.and
       i32.store8
      end
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|2
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/ops/join/buildJoinResult (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  (local $18 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 60
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 60
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   call $~lib/array/Array<~lib/string/String>#get:length
   local.set $10
   global.get $~lib/memory/__stack_pointer
   call $assembly/dataframe/dataframe/DataFrame#constructor
   local.tee $13
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $assembly/dataframe/dataframe/DataFrame#getColumnNames
   local.tee $14
   i32.store offset=8
   loop $for-loop|0
    global.get $~lib/memory/__stack_pointer
    local.get $14
    i32.store
    local.get $14
    call $~lib/array/Array<~lib/string/String>#get:length
    local.get $11
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $14
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $14
     local.get $11
     call $~lib/array/Array<~lib/string/String>#__get
     local.tee $15
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $15
     i32.store offset=16
     local.get $0
     local.get $15
     call $assembly/dataframe/dataframe/DataFrame#getColumnType
     local.tee $16
     i32.const 4
     i32.ne
     if
      global.get $~lib/memory/__stack_pointer
      local.set $6
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $15
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      local.get $0
      local.get $15
      call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
      local.tee $17
      i32.store offset=20
      local.get $17
      i32.eqz
      if
       i32.const 2160
       i32.const 2352
       i32.const 249
       i32.const 22
       call $~lib/builtins/abort
       unreachable
      end
      local.get $6
      local.get $17
      i32.store offset=24
      global.get $~lib/memory/__stack_pointer
      local.get $17
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $10
      local.get $17
      call $~lib/array/Array<~lib/string/String>#get:length
      call $assembly/core/numeric-column/NumericColumn#constructor
      local.tee $18
      i32.store offset=28
      global.get $~lib/memory/__stack_pointer
      local.get $17
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $18
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=32
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 3396
      i32.lt_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $17
      i32.store
      local.get $17
      call $assembly/dataframe/builder/DataFrameBuilder#build
      local.set $9
      global.get $~lib/memory/__stack_pointer
      local.get $18
      i32.store
      local.get $18
      call $assembly/dataframe/builder/DataFrameBuilder#build
      local.set $8
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store
      local.get $2
      call $~lib/array/Array<~lib/string/String>#get:length
      local.set $7
      global.get $~lib/memory/__stack_pointer
      local.get $17
      i32.store
      block $break|0
       block $case2|0
        block $case0|0
         local.get $17
         call $~lib/array/Array<~lib/string/String>#get:length
         br_table $case0|0 $case2|0 $case0|0 $case2|0 $break|0
        end
        i32.const 0
        local.set $6
        loop $for-loop|1
         local.get $6
         local.get $7
         i32.lt_s
         if
          global.get $~lib/memory/__stack_pointer
          local.get $2
          i32.store
          local.get $8
          local.get $6
          i32.const 2
          i32.shl
          i32.add
          local.get $9
          local.get $2
          local.get $6
          call $~lib/array/Array<i32>#__get
          i32.const 2
          i32.shl
          i32.add
          i32.load
          i32.store
          local.get $6
          i32.const 1
          i32.add
          local.set $6
          br $for-loop|1
         end
        end
        br $break|0
       end
       i32.const 0
       local.set $6
       loop $for-loop|2
        local.get $6
        local.get $7
        i32.lt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $2
         i32.store
         local.get $8
         local.get $6
         i32.const 3
         i32.shl
         i32.add
         local.get $9
         local.get $2
         local.get $6
         call $~lib/array/Array<i32>#__get
         i32.const 3
         i32.shl
         i32.add
         i64.load
         i64.store
         local.get $6
         i32.const 1
         i32.add
         local.set $6
         br $for-loop|2
        end
       end
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      block $break|1
       block $case3|1
        block $case2|1
         block $case1|1
          block $case0|1
           local.get $16
           br_table $case0|1 $case1|1 $case2|1 $case3|1 $break|1
          end
          global.get $~lib/memory/__stack_pointer
          local.get $13
          i32.store
          global.get $~lib/memory/__stack_pointer
          local.get $15
          i32.store offset=16
          global.get $~lib/memory/__stack_pointer
          local.get $18
          i32.store offset=32
          local.get $13
          local.get $15
          local.get $18
          call $assembly/dataframe/dataframe/DataFrame#addInt32Column
          br $break|1
         end
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store offset=16
         global.get $~lib/memory/__stack_pointer
         local.get $18
         i32.store offset=32
         local.get $13
         local.get $15
         local.get $18
         call $assembly/dataframe/dataframe/DataFrame#addInt64Column
         br $break|1
        end
        global.get $~lib/memory/__stack_pointer
        local.get $13
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.store offset=16
        global.get $~lib/memory/__stack_pointer
        local.get $18
        i32.store offset=32
        local.get $13
        local.get $15
        local.get $18
        call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
        br $break|1
       end
       global.get $~lib/memory/__stack_pointer
       local.get $13
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.store offset=16
       global.get $~lib/memory/__stack_pointer
       local.get $18
       i32.store offset=32
       local.get $13
       local.get $15
       local.get $18
       call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
      end
     end
     local.get $11
     i32.const 1
     i32.add
     local.set $11
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getColumnNames
   local.tee $7
   i32.store offset=36
   loop $for-loop|20
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store
    local.get $7
    call $~lib/array/Array<~lib/string/String>#get:length
    local.get $12
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $7
     local.get $12
     call $~lib/array/Array<~lib/string/String>#__get
     local.tee $6
     i32.store offset=40
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=16
     local.get $6
     local.get $5
     call $~lib/string/String.__eq
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=16
      local.get $0
      local.get $4
      call $assembly/dataframe/dataframe/DataFrame#hasColumn
     else
      i32.const 0
     end
     i32.eqz
     if
      local.get $6
      local.set $2
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store offset=44
      global.get $~lib/memory/__stack_pointer
      local.get $13
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store offset=16
      local.get $13
      local.get $6
      call $assembly/dataframe/dataframe/DataFrame#hasColumn
      if
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       i32.const 2576
       i32.store offset=16
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.const 2576
       call $~lib/string/String.__concat
       local.tee $2
       i32.store offset=44
      end
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store offset=16
      local.get $1
      local.get $6
      call $assembly/dataframe/dataframe/DataFrame#getColumnType
      local.tee $8
      i32.const 4
      i32.ne
      if
       global.get $~lib/memory/__stack_pointer
       local.set $9
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store offset=16
       global.get $~lib/memory/__stack_pointer
       local.get $1
       local.get $6
       call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
       local.tee $6
       i32.store offset=48
       local.get $6
       i32.eqz
       if
        i32.const 2160
        i32.const 2352
        i32.const 290
        i32.const 22
        call $~lib/builtins/abort
        unreachable
       end
       local.get $9
       local.get $6
       i32.store offset=52
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $10
       local.get $6
       call $~lib/array/Array<~lib/string/String>#get:length
       call $assembly/core/numeric-column/NumericColumn#constructor
       local.tee $9
       i32.store offset=56
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=16
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=32
       local.get $6
       local.get $9
       local.get $3
       call $assembly/ops/join/copyColumnByIndicesNullable
       block $break|3
        block $case3|3
         block $case2|3
          block $case1|3
           block $case0|3
            local.get $8
            br_table $case0|3 $case1|3 $case2|3 $case3|3 $break|3
           end
           global.get $~lib/memory/__stack_pointer
           local.get $13
           i32.store
           global.get $~lib/memory/__stack_pointer
           local.get $2
           i32.store offset=16
           global.get $~lib/memory/__stack_pointer
           local.get $9
           i32.store offset=32
           local.get $13
           local.get $2
           local.get $9
           call $assembly/dataframe/dataframe/DataFrame#addInt32Column
           br $break|3
          end
          global.get $~lib/memory/__stack_pointer
          local.get $13
          i32.store
          global.get $~lib/memory/__stack_pointer
          local.get $2
          i32.store offset=16
          global.get $~lib/memory/__stack_pointer
          local.get $9
          i32.store offset=32
          local.get $13
          local.get $2
          local.get $9
          call $assembly/dataframe/dataframe/DataFrame#addInt64Column
          br $break|3
         end
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $2
         i32.store offset=16
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store offset=32
         local.get $13
         local.get $2
         local.get $9
         call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
         br $break|3
        end
        global.get $~lib/memory/__stack_pointer
        local.get $13
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $2
        i32.store offset=16
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store offset=32
        local.get $13
        local.get $2
        local.get $9
        call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
       end
      end
     end
     local.get $12
     i32.const 1
     i32.add
     local.set $12
     br $for-loop|20
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 60
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $13
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/ops/join/innerJoinI32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 48
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $2
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $7
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  local.get $3
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $8
  i32.store offset=12
  local.get $8
  i32.eqz
  local.get $7
  i32.eqz
  i32.or
  if
   i32.const 2288
   i32.const 2352
   i32.const 113
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $~lib/array/Array<~lib/string/String>#get:length
  local.tee $10
  local.get $9
  i32.ge_s
  local.set $6
  local.get $10
  local.get $9
  local.get $6
  select
  local.set $11
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store
  local.get $7
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $7
  global.get $~lib/memory/__stack_pointer
  local.get $8
  i32.store
  local.get $7
  local.get $8
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.tee $8
  local.get $6
  select
  local.set $12
  local.get $8
  local.get $7
  local.get $6
  select
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $9
  local.get $10
  local.get $6
  select
  local.tee $7
  call $assembly/ops/join/JoinHashTable#constructor
  local.tee $9
  i32.store offset=16
  loop $for-loop|0
   local.get $4
   local.get $7
   i32.lt_s
   if
    local.get $12
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $10
    global.get $~lib/memory/__stack_pointer
    local.get $9
    i32.store
    local.get $9
    local.get $10
    local.get $4
    call $assembly/ops/join/JoinHashTable#insert
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 5
  i32.const 2480
  call $~lib/rt/__newArray
  local.tee $7
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 5
  i32.const 2512
  call $~lib/rt/__newArray
  local.tee $10
  i32.store offset=24
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 5
  i32.const 2544
  call $~lib/rt/__newArray
  local.tee $12
  i32.store offset=28
  loop $for-loop|1
   local.get $5
   local.get $11
   i32.lt_s
   if
    local.get $8
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $12
    i32.store
    local.get $12
    i32.const 0
    call $~lib/array/Array<i32>#set:length
    global.get $~lib/memory/__stack_pointer
    local.get $9
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $12
    i32.store offset=4
    local.get $9
    local.get $4
    local.get $12
    call $assembly/ops/join/JoinHashTable#find
    i32.const 0
    local.set $4
    loop $for-loop|2
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     local.get $12
     call $~lib/array/Array<~lib/string/String>#get:length
     local.get $4
     i32.gt_s
     if
      local.get $6
      if
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $12
       i32.store offset=4
       local.get $7
       local.get $12
       local.get $4
       call $~lib/array/Array<i32>#__get
       call $~lib/array/Array<i32>#push
       global.get $~lib/memory/__stack_pointer
       local.get $10
       i32.store
       local.get $10
       local.get $5
       call $~lib/array/Array<i32>#push
      else
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store
       local.get $7
       local.get $5
       call $~lib/array/Array<i32>#push
       global.get $~lib/memory/__stack_pointer
       local.get $10
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $12
       i32.store offset=4
       local.get $10
       local.get $12
       local.get $4
       call $~lib/array/Array<i32>#__get
       call $~lib/array/Array<i32>#push
      end
      local.get $4
      i32.const 1
      i32.add
      local.set $4
      br $for-loop|2
     end
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store offset=32
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store offset=36
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=40
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=44
  local.get $0
  local.get $1
  local.get $7
  local.get $10
  local.get $2
  local.get $3
  call $assembly/ops/join/buildJoinResult
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<i32>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1248
   i32.const 2416
   i32.const 93
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/staticarray/StaticArray<i32>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1248
   i32.const 2416
   i32.const 78
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/util/sort/SORT<i32> (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i64)
  (local $13 i32)
  (local $14 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $1
   i32.const 48
   i32.le_s
   if
    local.get $1
    i32.const 1
    i32.le_s
    br_if $folding-inner0
    block $break|0
     block $case1|0
      local.get $1
      i32.const 3
      i32.ne
      if
       local.get $1
       i32.const 2
       i32.eq
       br_if $case1|0
       br $break|0
      end
      local.get $0
      i32.load
      local.set $1
      local.get $0
      i32.load offset=4
      local.set $2
      i32.const 2
      global.set $~argumentsLength
      local.get $0
      local.get $2
      local.get $1
      local.get $1
      local.get $2
      i32.const 2816
      i32.load
      call_indirect (type $0)
      i32.const 0
      i32.gt_s
      local.tee $3
      select
      i32.store
      local.get $0
      i32.load offset=8
      local.set $4
      i32.const 2
      global.set $~argumentsLength
      local.get $1
      local.get $2
      local.get $3
      select
      local.tee $1
      local.get $4
      i32.const 2816
      i32.load
      call_indirect (type $0)
      i32.const 0
      i32.gt_s
      local.set $2
      local.get $0
      local.get $4
      local.get $1
      local.get $2
      select
      i32.store offset=4
      local.get $0
      local.get $1
      local.get $4
      local.get $2
      select
      i32.store offset=8
     end
     local.get $0
     i32.load
     local.set $1
     local.get $0
     i32.load offset=4
     local.set $2
     i32.const 2
     global.set $~argumentsLength
     local.get $0
     local.get $2
     local.get $1
     local.get $1
     local.get $2
     i32.const 2816
     i32.load
     call_indirect (type $0)
     i32.const 0
     i32.gt_s
     local.tee $3
     select
     i32.store
     local.get $0
     local.get $1
     local.get $2
     local.get $3
     select
     i32.store offset=4
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 2816
    i32.store
    local.get $0
    i32.const 0
    local.get $1
    i32.const 1
    i32.sub
    i32.const 0
    call $~lib/util/sort/insertionSort<i32>
    br $folding-inner0
   end
   i32.const 33
   local.get $1
   i32.clz
   i32.sub
   local.tee $3
   i32.const 2
   i32.shl
   local.tee $4
   i32.const 1
   i32.shl
   local.set $5
   global.get $~lib/rt/tlsf/ROOT
   i32.eqz
   if
    call $~lib/rt/tlsf/initialize
   end
   local.get $4
   global.get $~lib/rt/tlsf/ROOT
   local.get $5
   call $~lib/rt/tlsf/allocateBlock
   i32.const 4
   i32.add
   local.tee $9
   i32.add
   local.set $10
   loop $for-loop|1
    local.get $2
    local.get $3
    i32.lt_u
    if
     local.get $9
     local.get $2
     i32.const 2
     i32.shl
     i32.add
     i32.const -1
     i32.store
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|1
    end
   end
   global.get $~lib/rt/tlsf/ROOT
   i32.eqz
   if
    call $~lib/rt/tlsf/initialize
   end
   global.get $~lib/rt/tlsf/ROOT
   local.get $1
   i32.const 2
   i32.shl
   call $~lib/rt/tlsf/allocateBlock
   i32.const 4
   i32.add
   local.set $11
   global.get $~lib/memory/__stack_pointer
   i32.const 2816
   i32.store
   local.get $0
   i32.const 0
   local.get $1
   i32.const 1
   i32.sub
   local.tee $8
   call $~lib/util/sort/extendRunRight<i32>
   local.tee $4
   i32.const 1
   i32.add
   local.tee $1
   i32.const 32
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 2816
    i32.store
    local.get $0
    i32.const 0
    i32.const 31
    local.get $8
    local.get $8
    i32.const 31
    i32.ge_s
    select
    local.tee $4
    local.get $1
    call $~lib/util/sort/insertionSort<i32>
   end
   i32.const 0
   local.set $1
   i32.const 0
   local.set $2
   loop $while-continue|2
    local.get $4
    local.get $8
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 2816
     i32.store
     local.get $0
     local.get $4
     i32.const 1
     i32.add
     local.tee $5
     local.get $8
     call $~lib/util/sort/extendRunRight<i32>
     local.tee $3
     local.get $5
     i32.sub
     i32.const 1
     i32.add
     local.tee $6
     i32.const 32
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 2816
      i32.store
      local.get $0
      local.get $5
      local.get $8
      local.get $5
      i32.const 31
      i32.add
      local.tee $3
      local.get $3
      local.get $8
      i32.gt_s
      select
      local.tee $3
      local.get $6
      call $~lib/util/sort/insertionSort<i32>
     end
     local.get $2
     local.get $5
     i32.add
     i64.extend_i32_u
     i64.const 30
     i64.shl
     local.get $8
     i32.const 1
     i32.add
     i64.extend_i32_u
     local.tee $12
     i64.div_u
     local.get $3
     local.get $5
     i32.add
     i32.const 1
     i32.add
     i64.extend_i32_u
     i64.const 30
     i64.shl
     local.get $12
     i64.div_u
     i64.xor
     i32.wrap_i64
     i32.clz
     local.set $6
     loop $for-loop|3
      local.get $1
      local.get $6
      i32.gt_u
      if
       local.get $1
       i32.const 2
       i32.shl
       local.tee $13
       local.get $9
       i32.add
       local.tee $14
       i32.load
       local.tee $7
       i32.const -1
       i32.ne
       if
        local.get $10
        local.get $13
        i32.add
        i32.load
        i32.const 1
        i32.add
        local.set $2
        global.get $~lib/memory/__stack_pointer
        i32.const 2816
        i32.store
        local.get $0
        local.get $7
        local.get $2
        local.get $4
        local.get $11
        call $~lib/util/sort/mergeRuns<i32>
        local.get $14
        i32.const -1
        i32.store
        local.get $7
        local.set $2
       end
       local.get $1
       i32.const 1
       i32.sub
       local.set $1
       br $for-loop|3
      end
     end
     local.get $6
     i32.const 2
     i32.shl
     local.tee $1
     local.get $9
     i32.add
     local.get $2
     i32.store
     local.get $1
     local.get $10
     i32.add
     local.get $4
     i32.store
     local.get $5
     local.set $2
     local.get $3
     local.set $4
     local.get $6
     local.set $1
     br $while-continue|2
    end
   end
   loop $for-loop|4
    local.get $1
    if
     local.get $1
     i32.const 2
     i32.shl
     local.tee $2
     local.get $9
     i32.add
     i32.load
     local.tee $3
     i32.const -1
     i32.ne
     if
      local.get $2
      local.get $10
      i32.add
      i32.load
      i32.const 1
      i32.add
      local.set $2
      global.get $~lib/memory/__stack_pointer
      i32.const 2816
      i32.store
      local.get $0
      local.get $3
      local.get $2
      local.get $8
      local.get $11
      call $~lib/util/sort/mergeRuns<i32>
     end
     local.get $1
     i32.const 1
     i32.sub
     local.set $1
     br $for-loop|4
    end
   end
   local.get $11
   call $~lib/rt/tlsf/__free
   local.get $9
   call $~lib/rt/tlsf/__free
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $"~lib/map/Map<i32,i32>#find" (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $3
  local.get $2
  local.get $0
  i32.load offset=4
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  loop $while-continue|0
   local.get $0
   if
    local.get $0
    i32.load offset=8
    local.tee $2
    i32.const 1
    i32.and
    if (result i32)
     i32.const 0
    else
     local.get $1
     local.get $0
     i32.load
     i32.eq
    end
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $0
     return
    end
    local.get $2
    i32.const -2
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $"~lib/map/Map<i32,i32>#set" (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $1
   local.get $1
   i32.const -1028477379
   i32.mul
   i32.const 374761397
   i32.add
   i32.const 17
   i32.rotl
   i32.const 668265263
   i32.mul
   local.tee $3
   i32.const 15
   i32.shr_u
   local.get $3
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $3
   i32.const 13
   i32.shr_u
   local.get $3
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $3
   i32.const 16
   i32.shr_u
   local.get $3
   i32.xor
   local.tee $7
   call $"~lib/map/Map<i32,i32>#find"
   local.tee $3
   if
    local.get $3
    local.get $2
    i32.store offset=4
   else
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=16
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $3
    local.get $0
    i32.load offset=12
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     i32.load offset=20
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $3
     local.get $0
     i32.load offset=12
     i32.const 3
     i32.mul
     i32.const 4
     i32.div_s
     i32.lt_s
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      local.get $0
      i32.load offset=4
     else
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      local.get $0
      i32.load offset=4
      i32.const 1
      i32.shl
      i32.const 1
      i32.or
     end
     local.set $8
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 3396
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.const 1
     i32.add
     local.tee $3
     i32.const 2
     i32.shl
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $9
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 3
     i32.shl
     i32.const 3
     i32.div_s
     local.tee $6
     i32.const 12
     i32.mul
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $4
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     i32.load offset=8
     local.set $10
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $10
     local.get $0
     i32.load offset=16
     i32.const 12
     i32.mul
     i32.add
     local.set $5
     local.get $4
     local.set $3
     loop $while-continue|0
      local.get $5
      local.get $10
      i32.ne
      if
       local.get $10
       i32.load offset=8
       i32.const 1
       i32.and
       i32.eqz
       if
        local.get $3
        local.get $10
        i32.load
        local.tee $11
        i32.store
        local.get $3
        local.get $10
        i32.load offset=4
        i32.store offset=4
        local.get $3
        local.get $9
        local.get $8
        local.get $11
        i32.const -1028477379
        i32.mul
        i32.const 374761397
        i32.add
        i32.const 17
        i32.rotl
        i32.const 668265263
        i32.mul
        local.tee $11
        local.get $11
        i32.const 15
        i32.shr_u
        i32.xor
        i32.const -2048144777
        i32.mul
        local.tee $11
        local.get $11
        i32.const 13
        i32.shr_u
        i32.xor
        i32.const -1028477379
        i32.mul
        local.tee $11
        local.get $11
        i32.const 16
        i32.shr_u
        i32.xor
        i32.and
        i32.const 2
        i32.shl
        i32.add
        local.tee $11
        i32.load
        i32.store offset=8
        local.get $11
        local.get $3
        i32.store
        local.get $3
        i32.const 12
        i32.add
        local.set $3
       end
       local.get $10
       i32.const 12
       i32.add
       local.set $10
       br $while-continue|0
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=12
     local.get $0
     local.get $9
     i32.store
     local.get $0
     local.get $9
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     local.get $8
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=12
     local.get $0
     local.get $4
     i32.store offset=8
     local.get $0
     local.get $4
     i32.const 0
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     local.get $6
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     local.get $0
     local.get $0
     i32.load offset=20
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $3
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $0
    i32.load offset=16
    local.tee $4
    i32.const 1
    i32.add
    i32.store offset=16
    local.get $3
    local.get $4
    i32.const 12
    i32.mul
    i32.add
    local.tee $3
    local.get $1
    i32.store
    local.get $3
    local.get $2
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $0
    i32.load offset=20
    i32.const 1
    i32.add
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $3
    local.get $1
    local.get $7
    local.get $0
    i32.load offset=4
    i32.and
    i32.const 2
    i32.shl
    i32.add
    local.tee $0
    i32.load
    i32.store offset=8
    local.get $0
    local.get $3
    i32.store
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/ops/groupby/groupByIntegerKey (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 36
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 36
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $4
   i32.store offset=8
   local.get $4
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 2640
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    i32.const 2640
    local.get $1
    call $~lib/string/String.__concat
    i32.const 2704
    i32.const 115
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/array/Array<~lib/string/String>#get:length
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   local.get $4
   call $assembly/dataframe/builder/DataFrameBuilder#build
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.const 1
   i32.add
   call $~lib/staticarray/StaticArray<i32>#constructor
   local.tee $5
   i32.store offset=12
   i32.const 0
   local.set $0
   loop $for-loop|0
    local.get $0
    local.get $2
    i32.le_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     local.get $5
     local.get $0
     i32.const 0
     call $~lib/staticarray/StaticArray<i32>#__set
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 5
   i32.const 2784
   call $~lib/rt/__newArray
   local.tee $0
   i32.store offset=16
   loop $for-loop|1
    local.get $1
    local.get $3
    i32.gt_s
    if
     local.get $4
     local.get $3
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $6
     local.get $2
     i32.le_s
     local.get $6
     i32.const 0
     i32.ge_s
     i32.and
     if
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $5
      local.get $6
      call $~lib/staticarray/StaticArray<i32>#__get
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $0
       local.get $6
       call $~lib/array/Array<i32>#push
      end
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=4
      local.get $5
      local.get $6
      local.get $5
      local.get $6
      call $~lib/staticarray/StaticArray<i32>#__get
      i32.const 1
      i32.add
      call $~lib/staticarray/StaticArray<i32>#__set
     end
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|1
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 2816
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.load offset=4
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.load offset=12
   local.set $2
   global.get $~lib/memory/__stack_pointer
   i32.const 2816
   i32.store
   local.get $1
   local.get $2
   call $~lib/util/sort/SORT<i32>
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/array/Array<~lib/string/String>#get:length
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.const 22
   call $~lib/rt/itcms/__new
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   i32.const 16
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $4
   local.get $2
   i32.store
   local.get $4
   local.get $2
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   i32.const 3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   i32.const 48
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $4
   local.get $2
   i32.store offset=8
   local.get $4
   local.get $2
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   i32.const 4
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   i32.const 0
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   i32.const 0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   local.get $4
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.const 0
   call $assembly/core/numeric-column/NumericColumn#constructor
   local.tee $5
   i32.store offset=24
   i32.const 0
   local.set $1
   loop $for-loop|2
    local.get $1
    local.get $3
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $1
     call $~lib/array/Array<i32>#__get
     local.set $2
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store
     local.get $4
     local.get $2
     local.get $1
     call $"~lib/map/Map<i32,i32>#set"
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=28
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     local.get $5
     i32.load
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     local.get $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.load offset=16
     local.tee $6
     i32.store offset=32
     local.get $1
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      local.get $1
      local.get $6
      i32.load offset=4
      i32.ge_s
     end
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      local.get $1
      i32.const 3
      i32.shr_s
      local.tee $2
      local.get $6
      i32.load
      i32.add
      i32.load8_u
      local.set $7
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      local.get $2
      local.get $6
      i32.load
      i32.add
      i32.const 1
      local.get $1
      i32.const 7
      i32.and
      i32.shl
      local.get $7
      i32.or
      i32.store8
     end
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|2
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.const 21
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store
   local.get $0
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=8
   local.get $0
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=12
   local.get $0
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=8
   local.get $0
   local.get $5
   i32.store
   local.get $0
   local.get $5
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=8
   local.get $0
   local.get $4
   i32.store offset=8
   local.get $0
   local.get $4
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.const 23
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   i32.const 16
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $1
   local.get $2
   i32.store
   local.get $1
   local.get $2
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   i32.const 48
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $1
   local.get $2
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 4
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $0
   local.get $1
   i32.store offset=12
   local.get $0
   local.get $1
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 36
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/staticarray/StaticArray<f64>#__set (param $0 i32) (param $1 i32) (param $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 3
  i32.shr_u
  i32.ge_u
  if
   i32.const 1248
   i32.const 2416
   i32.const 93
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  local.get $2
  f64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/ops/groupby/GroupByResult#getGroupIndex (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   local.get $1
   local.get $1
   i32.const -1028477379
   i32.mul
   i32.const 374761397
   i32.add
   i32.const 17
   i32.rotl
   i32.const 668265263
   i32.mul
   local.tee $3
   local.get $3
   i32.const 15
   i32.shr_u
   local.tee $2
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $4
   local.get $4
   i32.const 13
   i32.shr_u
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $4
   local.get $4
   i32.const 16
   i32.shr_u
   i32.xor
   call $"~lib/map/Map<i32,i32>#find"
   i32.const 0
   i32.ne
   local.set $4
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $4
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 3396
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $1
    local.get $2
    local.get $3
    i32.xor
    i32.const -2048144777
    i32.mul
    local.tee $0
    local.get $0
    i32.const 13
    i32.shr_u
    i32.xor
    i32.const -1028477379
    i32.mul
    local.tee $0
    local.get $0
    i32.const 16
    i32.shr_u
    i32.xor
    call $"~lib/map/Map<i32,i32>#find"
    local.tee $0
    i32.eqz
    if
     i32.const 2048
     i32.const 2112
     i32.const 105
     i32.const 17
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.load offset=4
    local.set $0
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/staticarray/StaticArray<f64>#__get (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 3
  i32.shr_u
  i32.ge_u
  if
   i32.const 1248
   i32.const 2416
   i32.const 78
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  f64.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/ops/groupby/groupBySumF32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 f32)
  (local $8 f64)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 60
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 60
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  local.get $3
  call $assembly/ops/groupby/groupByIntegerKey
  local.tee $10
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store
  local.get $10
  i32.load offset=4
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $1
  i32.store offset=12
  local.get $1
  i32.eqz
  if
   i32.const 2160
   i32.const 2704
   i32.const 173
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  local.get $6
  local.get $1
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $6
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   call $~lib/array/Array<~lib/string/String>#get:length
   local.get $4
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $2
    local.get $4
    call $~lib/array/Array<~lib/string/String>#__get
    local.tee $11
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $11
    call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
    local.tee $1
    i32.store offset=24
    local.get $1
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $assembly/dataframe/builder/DataFrameBuilder#build
     local.set $12
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $~lib/array/Array<~lib/string/String>#get:length
     i32.const 2
     i32.eq
     local.set $13
     global.get $~lib/memory/__stack_pointer
     local.get $3
     call $~lib/staticarray/StaticArray<f64>#constructor
     local.tee $9
     i32.store offset=28
     i32.const 0
     local.set $1
     loop $for-loop|1
      local.get $1
      local.get $3
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store
       local.get $9
       local.get $1
       f64.const 0
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|1
      end
     end
     local.get $13
     if
      i32.const 0
      local.set $1
      loop $for-loop|2
       local.get $1
       local.get $5
       i32.lt_s
       if
        local.get $1
        i32.const 2
        i32.shl
        local.tee $14
        local.get $6
        i32.add
        i32.load
        local.set $15
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store
        local.get $10
        local.get $15
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $15
        i32.const 0
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store offset=4
         local.get $9
         local.get $15
         local.get $9
         local.get $15
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $12
         local.get $14
         i32.add
         f32.load
         f64.promote_f32
         f64.add
         call $~lib/staticarray/StaticArray<f64>#__set
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|2
       end
      end
     else
      i32.const 0
      local.set $1
      loop $for-loop|3
       local.get $1
       local.get $5
       i32.lt_s
       if
        local.get $6
        local.get $1
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.set $14
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store
        local.get $10
        local.get $14
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $14
        i32.const 0
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store offset=4
         local.get $9
         local.get $14
         local.get $9
         local.get $14
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $12
         local.get $1
         i32.const 3
         i32.shl
         i32.add
         f64.load
         f64.add
         call $~lib/staticarray/StaticArray<f64>#__set
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|3
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 2
     i32.const 3
     local.get $13
     select
     call $assembly/core/numeric-column/NumericColumn#constructor
     local.tee $12
     i32.store offset=32
     local.get $13
     if
      i32.const 0
      local.set $1
      loop $for-loop|4
       local.get $1
       local.get $3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store offset=36
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store
        local.get $9
        local.get $1
        call $~lib/staticarray/StaticArray<f64>#__get
        f32.demote_f64
        local.set $7
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        i32.load
        local.get $1
        i32.const 2
        i32.shl
        i32.add
        local.get $7
        f32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.load offset=16
        local.tee $13
        i32.store offset=40
        local.get $1
        i32.const 0
        i32.lt_s
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         local.get $13
         i32.load offset=4
         i32.ge_s
        end
        i32.eqz
        if
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         i32.const 3
         i32.shr_s
         local.tee $14
         local.get $13
         i32.load
         i32.add
         i32.load8_u
         local.set $15
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $14
         local.get $13
         i32.load
         i32.add
         i32.const 1
         local.get $1
         i32.const 7
         i32.and
         i32.shl
         local.get $15
         i32.or
         i32.store8
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|4
       end
      end
     else
      i32.const 0
      local.set $1
      loop $for-loop|5
       local.get $1
       local.get $3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store offset=44
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store
        local.get $9
        local.get $1
        call $~lib/staticarray/StaticArray<f64>#__get
        local.set $8
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        i32.load
        local.get $1
        i32.const 3
        i32.shl
        i32.add
        local.get $8
        f64.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.load offset=16
        local.tee $13
        i32.store offset=48
        local.get $1
        i32.const 0
        i32.lt_s
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         local.get $13
         i32.load offset=4
         i32.ge_s
        end
        i32.eqz
        if
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         i32.const 3
         i32.shr_s
         local.tee $14
         local.get $13
         i32.load
         i32.add
         i32.load8_u
         local.set $15
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $14
         local.get $13
         i32.load
         i32.add
         i32.const 1
         local.get $1
         i32.const 7
         i32.and
         i32.shl
         local.get $15
         i32.or
         i32.store8
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|5
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $10
     i32.store offset=56
     global.get $~lib/memory/__stack_pointer
     local.get $10
     i32.load offset=12
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $11
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store offset=52
     local.get $1
     local.get $11
     local.get $12
     call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#set"
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 60
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $10
 )
 (func $"~lib/map/Map<~lib/string/String,assembly/core/numeric-column/NumericColumn>#keys" (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=8
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=16
   local.set $2
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.const 4
   call $~lib/rt/itcms/__new
   local.tee $6
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $6
   i32.const 0
   i32.store
   local.get $6
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $6
   i32.const 0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $6
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $6
   i32.const 0
   i32.store offset=12
   local.get $2
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1456
    i32.const 1632
    i32.const 70
    i32.const 60
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   local.get $2
   local.get $2
   i32.const 8
   i32.le_u
   select
   i32.const 2
   i32.shl
   local.tee $0
   i32.const 1
   call $~lib/rt/itcms/__new
   local.tee $5
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=12
   local.get $6
   local.get $5
   i32.store
   local.get $6
   local.get $5
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $6
   local.get $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $6
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $6
   local.get $2
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   loop $for-loop|0
    local.get $2
    local.get $3
    i32.gt_s
    if
     local.get $4
     local.get $3
     i32.const 12
     i32.mul
     i32.add
     local.tee $5
     i32.load offset=8
     i32.const 1
     i32.and
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      local.get $1
      local.tee $0
      i32.const 1
      i32.add
      local.set $1
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.load
      local.tee $7
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 3396
      i32.lt_s
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      local.get $0
      local.get $6
      i32.load offset=12
      i32.ge_u
      if
       local.get $0
       i32.const 0
       i32.lt_s
       if
        i32.const 1248
        i32.const 1632
        i32.const 130
        i32.const 22
        call $~lib/builtins/abort
        unreachable
       end
       local.get $6
       local.get $0
       i32.const 1
       i32.add
       local.tee $5
       i32.const 1
       call $~lib/array/ensureCapacity
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       local.get $6
       local.get $5
       i32.store offset=12
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      local.get $6
      i32.load offset=4
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      local.get $7
      i32.store
      local.get $6
      local.get $7
      i32.const 1
      call $~lib/rt/itcms/__link
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
     end
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store
   local.get $6
   local.get $1
   call $~lib/array/Array<i32>#set:length
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $6
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/ops/groupby/GroupByResult#toDataFrame (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 32
  memory.fill
  global.get $~lib/memory/__stack_pointer
  call $assembly/dataframe/dataframe/DataFrame#constructor
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $4
  i32.store offset=12
  local.get $2
  local.get $1
  local.get $4
  call $assembly/dataframe/dataframe/DataFrame#addInt32Column
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=12
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  call $"~lib/map/Map<~lib/string/String,assembly/core/numeric-column/NumericColumn>#keys"
  local.tee $1
  i32.store offset=20
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   call $~lib/array/Array<~lib/string/String>#get:length
   local.get $3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    local.get $3
    call $~lib/array/Array<~lib/string/String>#__get
    local.tee $4
    i32.store offset=24
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=12
    local.tee $5
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $5
    local.get $4
    call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#get"
    local.tee $5
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=4
    local.get $5
    call $~lib/array/Array<~lib/string/String>#get:length
    i32.const 2
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=12
     local.get $2
     local.get $4
     local.get $5
     call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
    else
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=12
     local.get $2
     local.get $4
     local.get $5
     call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/ops/groupby/groupByMean (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 f64)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const -64
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 64
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  local.get $3
  call $assembly/ops/groupby/groupByIntegerKey
  local.tee $12
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $12
  i32.store
  local.get $12
  i32.load offset=4
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $1
  i32.store offset=12
  local.get $1
  i32.eqz
  if
   i32.const 2160
   i32.const 2704
   i32.const 243
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  local.get $5
  local.get $1
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $7
  global.get $~lib/memory/__stack_pointer
  local.get $3
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.tee $13
  i32.store offset=20
  loop $for-loop|0
   local.get $3
   local.get $4
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $13
    i32.store
    local.get $13
    local.get $4
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__set
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $4
  loop $for-loop|1
   local.get $4
   local.get $6
   i32.lt_s
   if
    local.get $7
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $12
    i32.store
    local.get $12
    local.get $1
    call $assembly/ops/groupby/GroupByResult#getGroupIndex
    local.tee $1
    i32.const 0
    i32.ge_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $13
     i32.store offset=4
     local.get $13
     local.get $1
     local.get $13
     local.get $1
     call $~lib/staticarray/StaticArray<i32>#__get
     i32.const 1
     i32.add
     call $~lib/staticarray/StaticArray<i32>#__set
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|1
   end
  end
  loop $for-loop|2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   call $~lib/array/Array<~lib/string/String>#get:length
   local.get $8
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $2
    local.get $8
    call $~lib/array/Array<~lib/string/String>#__get
    local.tee $5
    i32.store offset=24
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $5
    call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
    local.tee $1
    i32.store offset=28
    local.get $1
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $assembly/dataframe/builder/DataFrameBuilder#build
     local.set $4
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $~lib/array/Array<~lib/string/String>#get:length
     i32.const 2
     i32.eq
     local.set $11
     global.get $~lib/memory/__stack_pointer
     local.get $3
     call $~lib/staticarray/StaticArray<f64>#constructor
     local.tee $10
     i32.store offset=32
     i32.const 0
     local.set $1
     loop $for-loop|3
      local.get $1
      local.get $3
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $10
       i32.store
       local.get $10
       local.get $1
       f64.const 0
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|3
      end
     end
     local.get $11
     if
      i32.const 0
      local.set $1
      loop $for-loop|4
       local.get $1
       local.get $6
       i32.lt_s
       if
        local.get $1
        i32.const 2
        i32.shl
        local.tee $11
        local.get $7
        i32.add
        i32.load
        local.set $14
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        local.get $14
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $14
        i32.const 0
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $10
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $10
         i32.store offset=4
         local.get $10
         local.get $14
         local.get $10
         local.get $14
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $4
         local.get $11
         i32.add
         f32.load
         f64.promote_f32
         f64.add
         call $~lib/staticarray/StaticArray<f64>#__set
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|4
       end
      end
     else
      i32.const 0
      local.set $1
      loop $for-loop|5
       local.get $1
       local.get $6
       i32.lt_s
       if
        local.get $7
        local.get $1
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.set $11
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        local.get $11
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $11
        i32.const 0
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $10
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $10
         i32.store offset=4
         local.get $10
         local.get $11
         local.get $10
         local.get $11
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $4
         local.get $1
         i32.const 3
         i32.shl
         i32.add
         f64.load
         f64.add
         call $~lib/staticarray/StaticArray<f64>#__set
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|5
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 3
     call $assembly/core/numeric-column/NumericColumn#constructor
     local.tee $14
     i32.store offset=36
     i32.const 0
     local.set $4
     loop $for-loop|6
      local.get $3
      local.get $4
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $13
       i32.store
       local.get $13
       local.get $4
       call $~lib/staticarray/StaticArray<i32>#__get
       i32.const 0
       i32.gt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.store offset=40
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store
        local.get $10
        local.get $4
        call $~lib/staticarray/StaticArray<f64>#__get
        local.set $9
        global.get $~lib/memory/__stack_pointer
        local.get $13
        i32.store
        local.get $9
        local.get $13
        local.get $4
        call $~lib/staticarray/StaticArray<i32>#__get
        f64.convert_i32_s
        f64.div
        local.set $9
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.store
        local.get $14
        i32.load
        local.get $4
        i32.const 3
        i32.shl
        i32.add
        local.get $9
        f64.store
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.load offset=16
        local.tee $1
        i32.store offset=44
       else
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.store offset=48
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.store
        local.get $14
        i32.load
        local.get $4
        i32.const 3
        i32.shl
        i32.add
        f64.const 0
        f64.store
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $14
        i32.load offset=16
        local.tee $1
        i32.store offset=52
       end
       local.get $4
       i32.const 0
       i32.lt_s
       if (result i32)
        i32.const 1
       else
        global.get $~lib/memory/__stack_pointer
        local.get $1
        i32.store
        local.get $4
        local.get $1
        i32.load offset=4
        i32.ge_s
       end
       i32.eqz
       if
        global.get $~lib/memory/__stack_pointer
        local.get $1
        i32.store
        local.get $4
        i32.const 3
        i32.shr_s
        local.tee $11
        local.get $1
        i32.load
        i32.add
        i32.load8_u
        local.set $15
        global.get $~lib/memory/__stack_pointer
        local.get $1
        i32.store
        local.get $11
        local.get $1
        i32.load
        i32.add
        i32.const 1
        local.get $4
        i32.const 7
        i32.and
        i32.shl
        local.get $15
        i32.or
        i32.store8
       end
       local.get $4
       i32.const 1
       i32.add
       local.set $4
       br $for-loop|6
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store offset=60
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.load offset=12
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $14
     i32.store offset=56
     local.get $1
     local.get $5
     local.get $14
     call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#set"
    end
    local.get $8
    i32.const 1
    i32.add
    local.set $8
    br $for-loop|2
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const -64
  i32.sub
  global.set $~lib/memory/__stack_pointer
  local.get $12
 )
 (func $assembly/dataframe/dataframe/DataFrame#removeColumn (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 24
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $2
   local.get $1
   call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#has"
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 24
    i32.add
    global.set $~lib/memory/__stack_pointer
    return
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   local.get $1
   call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#get"
   local.tee $2
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   i32.load
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.load
    local.tee $3
    i32.store offset=16
    local.get $3
    i32.eqz
    if
     i32.const 2160
     i32.const 1952
     i32.const 174
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 3396
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    local.get $3
    i32.load8_u offset=20
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $3
     i32.load
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $3
     i32.load
     call $~lib/rt/tlsf/__free
    end
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    local.get $3
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.load offset=16
    local.tee $3
    i32.store
    local.get $3
    call $assembly/core/validity-bitmap/ValidityBitmap#free
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   i32.load offset=4
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.load offset=4
    local.tee $2
    i32.store offset=20
    local.get $2
    i32.eqz
    if
     i32.const 2160
     i32.const 1952
     i32.const 177
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 3396
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    i32.load
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     i32.load
     call $~lib/rt/tlsf/__free
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     i32.const 0
     i32.store
    end
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    i32.load offset=4
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     i32.load offset=4
     call $~lib/rt/tlsf/__free
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     i32.const 0
     i32.store offset=4
    end
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.load offset=28
    local.tee $2
    i32.store
    local.get $2
    call $assembly/core/validity-bitmap/ValidityBitmap#free
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $2
   local.get $1
   local.get $1
   call $~lib/util/hash/HASH<~lib/string/String>
   call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#find"
   local.tee $3
   if
    local.get $3
    local.get $3
    i32.load offset=8
    i32.const 1
    i32.or
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=4
    local.get $2
    local.get $2
    i32.load offset=20
    i32.const 1
    i32.sub
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    i32.load offset=4
    i32.const 1
    i32.shr_u
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $3
    i32.const 1
    i32.add
    i32.const 4
    local.get $2
    i32.load offset=20
    local.tee $4
    local.get $4
    i32.const 4
    i32.lt_u
    select
    i32.ge_u
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     i32.load offset=20
     local.set $4
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $4
     local.get $2
     i32.load offset=12
     i32.const 3
     i32.mul
     i32.const 4
     i32.div_s
     i32.lt_s
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     local.get $3
     call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#rehash"
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   local.set $2
   i32.const 0
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store
   block $__inlined_func$~lib/array/Array<~lib/string/String>#indexOf$898
    local.get $3
    i32.load offset=12
    local.tee $4
    i32.eqz
    local.get $4
    i32.const 0
    i32.le_s
    i32.or
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const -1
     local.set $1
     br $__inlined_func$~lib/array/Array<~lib/string/String>#indexOf$898
    end
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    local.get $3
    i32.load offset=4
    local.set $3
    loop $while-continue|0
     local.get $1
     local.get $4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $3
      local.get $1
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.tee $5
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=4
      local.get $5
      local.get $2
      call $~lib/string/String.__eq
      if
       global.get $~lib/memory/__stack_pointer
       i32.const 8
       i32.add
       global.set $~lib/memory/__stack_pointer
       br $__inlined_func$~lib/array/Array<~lib/string/String>#indexOf$898
      end
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const -1
    local.set $1
   end
   local.get $1
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=4
    local.tee $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 3396
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 1
    local.get $0
    i32.load offset=12
    local.tee $2
    local.get $1
    i32.const 0
    i32.lt_s
    if (result i32)
     local.get $1
     local.get $2
     i32.add
     local.tee $1
     i32.const 0
     local.get $1
     i32.const 0
     i32.gt_s
     select
    else
     local.get $1
     local.get $2
     local.get $1
     local.get $2
     i32.lt_s
     select
    end
    local.tee $1
    i32.sub
    local.tee $3
    local.get $3
    i32.const 1
    i32.gt_s
    select
    local.tee $3
    i32.const 0
    local.get $3
    i32.const 0
    i32.gt_s
    select
    local.tee $3
    i32.const 4
    i32.const 0
    call $~lib/rt/__newArray
    local.tee $4
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store
    local.get $4
    i32.load offset=4
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $4
    local.get $0
    i32.load offset=4
    local.tee $4
    local.get $1
    i32.const 2
    i32.shl
    i32.add
    local.tee $5
    local.get $3
    i32.const 2
    i32.shl
    memory.copy
    local.get $2
    local.get $1
    local.get $3
    i32.add
    local.tee $1
    i32.ne
    if
     local.get $5
     local.get $4
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     local.get $2
     local.get $1
     i32.sub
     i32.const 2
     i32.shl
     memory.copy
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $2
    local.get $3
    i32.sub
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/dataframe/dataframe/createEmptyDataFrame (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  call $assembly/dataframe/dataframe/DataFrame#constructor
  local.tee $1
  i32.store
  local.get $0
  i32.const 0
  i32.gt_s
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.const 0
   call $assembly/core/numeric-column/NumericColumn#constructor
   local.tee $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2848
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   local.get $1
   i32.const 2848
   local.get $0
   call $assembly/dataframe/dataframe/DataFrame#addInt32Column
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2848
   i32.store offset=12
   local.get $1
   i32.const 2848
   call $assembly/dataframe/dataframe/DataFrame#removeColumn
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/ops/aggregations/columnSum (param $0 i32) (result f64)
  (local $1 i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $folding-inner0
   block $case4|0
    block $case3|0
     block $case2|0
      block $case1|0
       block $case0|0
        local.get $0
        call $~lib/array/Array<~lib/string/String>#get:length
        br_table $case2|0 $case3|0 $case0|0 $case1|0 $case4|0
       end
       local.get $2
       local.get $4
       call $assembly/simd/simd-aggregations/simdSumF32
       f64.promote_f32
       local.set $5
       br $folding-inner0
      end
      local.get $2
      local.get $4
      call $assembly/simd/simd-aggregations/simdSumF64
      local.set $5
      br $folding-inner0
     end
     local.get $4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|0
      local.get $0
      local.get $1
      i32.gt_s
      if
       local.get $2
       local.get $1
       i32.const 3
       i32.add
       i32.const 2
       i32.shl
       i32.add
       i64.load32_s
       local.get $2
       local.get $1
       i32.const 2
       i32.add
       i32.const 2
       i32.shl
       i32.add
       i64.load32_s
       local.get $2
       local.get $1
       i32.const 1
       i32.add
       i32.const 2
       i32.shl
       i32.add
       i64.load32_s
       local.get $3
       local.get $2
       local.get $1
       i32.const 2
       i32.shl
       i32.add
       i64.load32_s
       i64.add
       i64.add
       i64.add
       i64.add
       local.set $3
       local.get $1
       i32.const 4
       i32.add
       local.set $1
       br $while-continue|0
      end
     end
     loop $while-continue|1
      local.get $1
      local.get $4
      i32.lt_s
      if
       local.get $3
       local.get $2
       local.get $1
       i32.const 2
       i32.shl
       i32.add
       i64.load32_s
       i64.add
       local.set $3
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $while-continue|1
      end
     end
     local.get $3
     f64.convert_i64_s
     local.set $5
     br $folding-inner0
    end
    loop $for-loop|1
     local.get $1
     local.get $4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $3
      local.get $0
      i32.load
      local.get $1
      i32.const 3
      i32.shl
      i32.add
      i64.load
      i64.add
      local.set $3
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $3
    f64.convert_i64_s
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   f64.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $5
 )
 (func $assembly/ops/aggregations/columnMean (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   f64.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnSum
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  f64.convert_i32_s
  f64.div
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/ops/aggregations/columnMin (param $0 i32) (result f64)
  (local $1 i64)
  (local $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 v128)
  (local $7 v128)
  (local $8 v128)
  (local $9 f64)
  (local $10 v128)
  (local $11 i32)
  (local $12 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $folding-inner0
   block $case4|0
    block $case3|0
     block $case2|0
      block $case1|0
       block $case0|0
        local.get $0
        call $~lib/array/Array<~lib/string/String>#get:length
        br_table $case2|0 $case3|0 $case0|0 $case1|0 $case4|0
       end
       local.get $4
       local.get $5
       call $assembly/simd/simd-aggregations/simdMinF32
       f64.promote_f32
       local.set $9
       br $folding-inner0
      end
      local.get $4
      local.get $5
      call $assembly/simd/simd-aggregations/simdMinF64
      local.set $9
      br $folding-inner0
     end
     i32.const 2147483647
     local.set $3
     local.get $5
     if
      local.get $5
      i32.const -16
      i32.and
      local.tee $0
      i32.const 0
      i32.gt_s
      if (result i32)
       v128.const i32x4 0x7fffffff 0x7fffffff 0x7fffffff 0x7fffffff
       local.set $10
       v128.const i32x4 0x7fffffff 0x7fffffff 0x7fffffff 0x7fffffff
       local.set $8
       v128.const i32x4 0x7fffffff 0x7fffffff 0x7fffffff 0x7fffffff
       local.set $7
       v128.const i32x4 0x7fffffff 0x7fffffff 0x7fffffff 0x7fffffff
       local.set $6
       loop $while-continue|0
        local.get $0
        local.get $11
        i32.gt_s
        if
         local.get $10
         local.get $4
         local.get $11
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.min_s
         local.set $10
         local.get $8
         local.get $4
         local.get $11
         i32.const 4
         i32.add
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.min_s
         local.set $8
         local.get $7
         local.get $4
         local.get $11
         i32.const 8
         i32.add
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.min_s
         local.set $7
         local.get $6
         local.get $4
         local.get $11
         i32.const 12
         i32.add
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.min_s
         local.set $6
         local.get $11
         i32.const 16
         i32.add
         local.set $11
         br $while-continue|0
        end
       end
       local.get $10
       local.get $8
       i32x4.min_s
       local.get $7
       local.get $6
       i32x4.min_s
       i32x4.min_s
       local.tee $6
       i32x4.extract_lane 0
       local.tee $0
       local.get $6
       i32x4.extract_lane 1
       local.tee $3
       local.get $0
       local.get $3
       i32.lt_s
       select
       local.tee $3
       local.get $6
       i32x4.extract_lane 2
       local.tee $12
       local.get $6
       i32x4.extract_lane 3
       local.tee $0
       local.get $0
       local.get $12
       i32.gt_s
       select
       local.tee $0
       local.get $0
       local.get $3
       i32.gt_s
       select
      else
       i32.const 2147483647
      end
      local.set $3
      loop $while-continue|1
       local.get $5
       local.get $11
       i32.gt_s
       if
        local.get $4
        local.get $11
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.tee $0
        local.get $3
        i32.lt_s
        if
         local.get $0
         local.set $3
        end
        local.get $11
        i32.const 1
        i32.add
        local.set $11
        br $while-continue|1
       end
      end
     end
     local.get $3
     f64.convert_i32_s
     local.set $9
     br $folding-inner0
    end
    i64.const 9223372036854775807
    local.set $2
    loop $for-loop|1
     local.get $3
     local.get $5
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      i32.load
      local.get $3
      i32.const 3
      i32.shl
      i32.add
      i64.load
      local.tee $1
      local.get $2
      i64.lt_s
      if
       local.get $1
       local.set $2
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $2
    f64.convert_i64_s
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   f64.const inf
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $9
 )
 (func $assembly/ops/aggregations/columnMax (param $0 i32) (result f64)
  (local $1 i64)
  (local $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 v128)
  (local $7 v128)
  (local $8 v128)
  (local $9 f64)
  (local $10 v128)
  (local $11 i32)
  (local $12 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $folding-inner0
   block $case4|0
    block $case3|0
     block $case2|0
      block $case1|0
       block $case0|0
        local.get $0
        call $~lib/array/Array<~lib/string/String>#get:length
        br_table $case2|0 $case3|0 $case0|0 $case1|0 $case4|0
       end
       local.get $4
       local.get $5
       call $assembly/simd/simd-aggregations/simdMaxF32
       f64.promote_f32
       local.set $9
       br $folding-inner0
      end
      local.get $4
      local.get $5
      call $assembly/simd/simd-aggregations/simdMaxF64
      local.set $9
      br $folding-inner0
     end
     i32.const -2147483648
     local.set $3
     local.get $5
     if
      local.get $5
      i32.const -16
      i32.and
      local.tee $0
      i32.const 0
      i32.gt_s
      if (result i32)
       v128.const i32x4 0x80000000 0x80000000 0x80000000 0x80000000
       local.set $10
       v128.const i32x4 0x80000000 0x80000000 0x80000000 0x80000000
       local.set $8
       v128.const i32x4 0x80000000 0x80000000 0x80000000 0x80000000
       local.set $7
       v128.const i32x4 0x80000000 0x80000000 0x80000000 0x80000000
       local.set $6
       loop $while-continue|0
        local.get $0
        local.get $11
        i32.gt_s
        if
         local.get $10
         local.get $4
         local.get $11
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.max_s
         local.set $10
         local.get $8
         local.get $4
         local.get $11
         i32.const 4
         i32.add
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.max_s
         local.set $8
         local.get $7
         local.get $4
         local.get $11
         i32.const 8
         i32.add
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.max_s
         local.set $7
         local.get $6
         local.get $4
         local.get $11
         i32.const 12
         i32.add
         i32.const 2
         i32.shl
         i32.add
         v128.load
         i32x4.max_s
         local.set $6
         local.get $11
         i32.const 16
         i32.add
         local.set $11
         br $while-continue|0
        end
       end
       local.get $10
       local.get $8
       i32x4.max_s
       local.get $7
       local.get $6
       i32x4.max_s
       i32x4.max_s
       local.tee $6
       i32x4.extract_lane 0
       local.tee $0
       local.get $6
       i32x4.extract_lane 1
       local.tee $3
       local.get $0
       local.get $3
       i32.gt_s
       select
       local.tee $3
       local.get $6
       i32x4.extract_lane 2
       local.tee $12
       local.get $6
       i32x4.extract_lane 3
       local.tee $0
       local.get $0
       local.get $12
       i32.lt_s
       select
       local.tee $0
       local.get $0
       local.get $3
       i32.lt_s
       select
      else
       i32.const -2147483648
      end
      local.set $3
      loop $while-continue|1
       local.get $5
       local.get $11
       i32.gt_s
       if
        local.get $4
        local.get $11
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.tee $0
        local.get $3
        i32.gt_s
        if
         local.get $0
         local.set $3
        end
        local.get $11
        i32.const 1
        i32.add
        local.set $11
        br $while-continue|1
       end
      end
     end
     local.get $3
     f64.convert_i32_s
     local.set $9
     br $folding-inner0
    end
    i64.const -9223372036854775808
    local.set $2
    loop $for-loop|1
     local.get $3
     local.get $5
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      i32.load
      local.get $3
      i32.const 3
      i32.shl
      i32.add
      i64.load
      local.tee $1
      local.get $2
      i64.gt_s
      if
       local.get $1
       local.set $2
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $2
    f64.convert_i64_s
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   f64.const -inf
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $9
 )
 (func $assembly/ops/aggregations/columnCount (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=16
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   i32.const 0
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   i32.load offset=4
   i32.const 3
   i32.shr_s
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   i32.load offset=4
   i32.const 7
   i32.and
   local.set $5
   local.get $4
   i32.const 3
   i32.shr_s
   local.set $6
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   i32.load
   local.set $2
   loop $for-loop|0
    local.get $3
    local.get $6
    i32.lt_s
    if
     local.get $0
     local.get $2
     i64.load
     i64.popcnt
     i32.wrap_i64
     i32.add
     local.set $0
     local.get $2
     i32.const 8
     i32.add
     local.set $2
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|0
    end
   end
   local.get $4
   i32.const 7
   i32.and
   local.set $6
   i32.const 0
   local.set $3
   loop $for-loop|1
    local.get $3
    local.get $6
    i32.lt_s
    if
     local.get $0
     local.get $2
     i32.load8_u
     i32.popcnt
     i32.add
     local.set $0
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|1
    end
   end
   local.get $5
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $0
    local.get $4
    local.get $1
    i32.load
    i32.add
    i32.load8_u
    i32.const 1
    local.get $5
    i32.shl
    i32.const 1
    i32.sub
    i32.and
    i32.popcnt
    i32.add
    local.set $0
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/ops/aggregations/columnVariance (param $0 i32) (result f64)
  (local $1 f64)
  (local $2 i32)
  (local $3 i32)
  (local $4 f64)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.tee $3
  i32.const 2
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   f64.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnMean
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $break|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $0
       call $~lib/array/Array<~lib/string/String>#get:length
       br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
      end
      i32.const 0
      local.set $0
      loop $for-loop|1
       local.get $0
       local.get $3
       i32.lt_s
       if
        local.get $1
        local.get $5
        local.get $0
        i32.const 2
        i32.shl
        i32.add
        f32.load
        f64.promote_f32
        local.get $4
        f64.sub
        local.tee $1
        local.get $1
        f64.mul
        f64.add
        local.set $1
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $for-loop|1
       end
      end
      br $break|0
     end
     i32.const 0
     local.set $0
     loop $for-loop|2
      local.get $0
      local.get $3
      i32.lt_s
      if
       local.get $1
       local.get $5
       local.get $0
       i32.const 3
       i32.shl
       i32.add
       f64.load
       local.get $4
       f64.sub
       local.tee $1
       local.get $1
       f64.mul
       f64.add
       local.set $1
       local.get $0
       i32.const 1
       i32.add
       local.set $0
       br $for-loop|2
      end
     end
     br $break|0
    end
    i32.const 0
    local.set $0
    loop $for-loop|3
     local.get $0
     local.get $3
     i32.lt_s
     if
      local.get $1
      local.get $5
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      i32.load
      f64.convert_i32_s
      local.get $4
      f64.sub
      local.tee $1
      local.get $1
      f64.mul
      f64.add
      local.set $1
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|3
     end
    end
    br $break|0
   end
   loop $for-loop|4
    local.get $2
    local.get $3
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $1
     local.get $0
     i32.load
     local.get $2
     i32.const 3
     i32.shl
     i32.add
     i64.load
     f64.convert_i64_s
     local.get $4
     f64.sub
     local.tee $1
     local.get $1
     f64.mul
     f64.add
     local.set $1
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|4
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
  local.get $3
  i32.const 1
  i32.sub
  f64.convert_i32_s
  f64.div
 )
 (func $assembly/ops/aggregations/columnStdDev (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnVariance
  f64.sqrt
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/ops/arithmetic/columnAdd (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 24
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.get $4
  i32.ne
  if
   i32.const 1808
   i32.const 2896
   i32.const 35
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $4
  local.get $6
  call $assembly/core/numeric-column/NumericColumn#constructor
  local.tee $7
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store
  local.get $7
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $5
  block $break|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $6
       br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
      end
      i32.const 0
      local.set $0
      local.get $4
      i32.const -4
      i32.and
      local.set $1
      loop $while-continue|0
       local.get $0
       local.get $1
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $2
        local.get $5
        i32.add
        local.get $2
        local.get $8
        i32.add
        v128.load
        local.get $2
        local.get $9
        i32.add
        v128.load
        f32x4.add
        v128.store
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      loop $while-continue|1
       local.get $0
       local.get $4
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $1
        local.get $5
        i32.add
        local.get $1
        local.get $8
        i32.add
        f32.load
        local.get $1
        local.get $9
        i32.add
        f32.load
        f32.add
        f32.store
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $while-continue|1
       end
      end
      br $break|0
     end
     i32.const 0
     local.set $0
     local.get $4
     i32.const -2
     i32.and
     local.set $1
     loop $while-continue|00
      local.get $0
      local.get $1
      i32.lt_s
      if
       local.get $0
       i32.const 3
       i32.shl
       local.tee $2
       local.get $5
       i32.add
       local.get $2
       local.get $8
       i32.add
       v128.load
       local.get $2
       local.get $9
       i32.add
       v128.load
       f64x2.add
       v128.store
       local.get $0
       i32.const 2
       i32.add
       local.set $0
       br $while-continue|00
      end
     end
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 3
      i32.shl
      local.tee $0
      local.get $5
      i32.add
      local.get $0
      local.get $8
      i32.add
      f64.load
      local.get $0
      local.get $9
      i32.add
      f64.load
      f64.add
      f64.store
     end
     br $break|0
    end
    i32.const 0
    local.set $0
    local.get $4
    i32.const -4
    i32.and
    local.set $1
    loop $while-continue|01
     local.get $0
     local.get $1
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $2
      local.get $5
      i32.add
      local.get $2
      local.get $8
      i32.add
      v128.load
      local.get $2
      local.get $9
      i32.add
      v128.load
      i32x4.add
      v128.store
      local.get $0
      i32.const 4
      i32.add
      local.set $0
      br $while-continue|01
     end
    end
    loop $while-continue|11
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $1
      local.get $5
      i32.add
      local.get $1
      local.get $8
      i32.add
      i32.load
      local.get $1
      local.get $9
      i32.add
      i32.load
      i32.add
      i32.store
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $while-continue|11
     end
    end
    br $break|0
   end
   loop $for-loop|1
    local.get $2
    local.get $4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $2
     i32.const 3
     i32.shl
     local.tee $5
     local.get $0
     i32.load
     i32.add
     i64.load
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $3
     local.get $1
     i32.load
     local.get $5
     i32.add
     i64.load
     i64.add
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     local.get $7
     i32.load
     local.get $5
     i32.add
     local.get $3
     i64.store
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.load offset=16
     local.tee $5
     i32.store offset=20
     local.get $2
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $2
      local.get $5
      i32.load offset=4
      i32.ge_s
     end
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $2
      i32.const 3
      i32.shr_s
      local.tee $6
      local.get $5
      i32.load
      i32.add
      i32.load8_u
      local.set $8
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $6
      local.get $5
      i32.load
      i32.add
      i32.const 1
      local.get $2
      i32.const 7
      i32.and
      i32.shl
      local.get $8
      i32.or
      i32.store8
     end
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|1
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
 )
 (func $assembly/ops/arithmetic/columnSub (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 24
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.get $4
  i32.ne
  if
   i32.const 1808
   i32.const 2896
   i32.const 71
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $4
  local.get $6
  call $assembly/core/numeric-column/NumericColumn#constructor
  local.tee $7
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store
  local.get $7
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $5
  block $break|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $6
       br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
      end
      i32.const 0
      local.set $0
      local.get $4
      i32.const -4
      i32.and
      local.set $1
      loop $while-continue|0
       local.get $0
       local.get $1
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $2
        local.get $5
        i32.add
        local.get $2
        local.get $8
        i32.add
        v128.load
        local.get $2
        local.get $9
        i32.add
        v128.load
        f32x4.sub
        v128.store
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      loop $while-continue|1
       local.get $0
       local.get $4
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $1
        local.get $5
        i32.add
        local.get $1
        local.get $8
        i32.add
        f32.load
        local.get $1
        local.get $9
        i32.add
        f32.load
        f32.sub
        f32.store
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $while-continue|1
       end
      end
      br $break|0
     end
     i32.const 0
     local.set $0
     local.get $4
     i32.const -2
     i32.and
     local.set $1
     loop $while-continue|00
      local.get $0
      local.get $1
      i32.lt_s
      if
       local.get $0
       i32.const 3
       i32.shl
       local.tee $2
       local.get $5
       i32.add
       local.get $2
       local.get $8
       i32.add
       v128.load
       local.get $2
       local.get $9
       i32.add
       v128.load
       f64x2.sub
       v128.store
       local.get $0
       i32.const 2
       i32.add
       local.set $0
       br $while-continue|00
      end
     end
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 3
      i32.shl
      local.tee $0
      local.get $5
      i32.add
      local.get $0
      local.get $8
      i32.add
      f64.load
      local.get $0
      local.get $9
      i32.add
      f64.load
      f64.sub
      f64.store
     end
     br $break|0
    end
    i32.const 0
    local.set $0
    local.get $4
    i32.const -4
    i32.and
    local.set $1
    loop $while-continue|01
     local.get $0
     local.get $1
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $2
      local.get $5
      i32.add
      local.get $2
      local.get $8
      i32.add
      v128.load
      local.get $2
      local.get $9
      i32.add
      v128.load
      i32x4.sub
      v128.store
      local.get $0
      i32.const 4
      i32.add
      local.set $0
      br $while-continue|01
     end
    end
    loop $while-continue|11
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $1
      local.get $5
      i32.add
      local.get $1
      local.get $8
      i32.add
      i32.load
      local.get $1
      local.get $9
      i32.add
      i32.load
      i32.sub
      i32.store
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $while-continue|11
     end
    end
    br $break|0
   end
   loop $for-loop|1
    local.get $2
    local.get $4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $2
     i32.const 3
     i32.shl
     local.tee $5
     local.get $0
     i32.load
     i32.add
     i64.load
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $3
     local.get $1
     i32.load
     local.get $5
     i32.add
     i64.load
     i64.sub
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     local.get $7
     i32.load
     local.get $5
     i32.add
     local.get $3
     i64.store
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.load offset=16
     local.tee $5
     i32.store offset=20
     local.get $2
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $2
      local.get $5
      i32.load offset=4
      i32.ge_s
     end
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $2
      i32.const 3
      i32.shr_s
      local.tee $6
      local.get $5
      i32.load
      i32.add
      i32.load8_u
      local.set $8
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $6
      local.get $5
      i32.load
      i32.add
      i32.const 1
      local.get $2
      i32.const 7
      i32.and
      i32.shl
      local.get $8
      i32.or
      i32.store8
     end
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|1
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
 )
 (func $assembly/ops/arithmetic/columnMul (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 24
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.get $4
  i32.ne
  if
   i32.const 1808
   i32.const 2896
   i32.const 107
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $4
  local.get $6
  call $assembly/core/numeric-column/NumericColumn#constructor
  local.tee $7
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store
  local.get $7
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $5
  block $break|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $6
       br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
      end
      i32.const 0
      local.set $0
      local.get $4
      i32.const -4
      i32.and
      local.set $1
      loop $while-continue|0
       local.get $0
       local.get $1
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $2
        local.get $5
        i32.add
        local.get $2
        local.get $8
        i32.add
        v128.load
        local.get $2
        local.get $9
        i32.add
        v128.load
        f32x4.mul
        v128.store
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      loop $while-continue|1
       local.get $0
       local.get $4
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $1
        local.get $5
        i32.add
        local.get $1
        local.get $8
        i32.add
        f32.load
        local.get $1
        local.get $9
        i32.add
        f32.load
        f32.mul
        f32.store
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $while-continue|1
       end
      end
      br $break|0
     end
     i32.const 0
     local.set $0
     local.get $4
     i32.const -2
     i32.and
     local.set $1
     loop $while-continue|00
      local.get $0
      local.get $1
      i32.lt_s
      if
       local.get $0
       i32.const 3
       i32.shl
       local.tee $2
       local.get $5
       i32.add
       local.get $2
       local.get $8
       i32.add
       v128.load
       local.get $2
       local.get $9
       i32.add
       v128.load
       f64x2.mul
       v128.store
       local.get $0
       i32.const 2
       i32.add
       local.set $0
       br $while-continue|00
      end
     end
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 3
      i32.shl
      local.tee $0
      local.get $5
      i32.add
      local.get $0
      local.get $8
      i32.add
      f64.load
      local.get $0
      local.get $9
      i32.add
      f64.load
      f64.mul
      f64.store
     end
     br $break|0
    end
    i32.const 0
    local.set $0
    local.get $4
    i32.const -4
    i32.and
    local.set $1
    loop $while-continue|01
     local.get $0
     local.get $1
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $2
      local.get $5
      i32.add
      local.get $2
      local.get $8
      i32.add
      v128.load
      local.get $2
      local.get $9
      i32.add
      v128.load
      i32x4.mul
      v128.store
      local.get $0
      i32.const 4
      i32.add
      local.set $0
      br $while-continue|01
     end
    end
    loop $while-continue|11
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $1
      local.get $5
      i32.add
      local.get $1
      local.get $8
      i32.add
      i32.load
      local.get $1
      local.get $9
      i32.add
      i32.load
      i32.mul
      i32.store
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $while-continue|11
     end
    end
    br $break|0
   end
   loop $for-loop|1
    local.get $2
    local.get $4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $2
     i32.const 3
     i32.shl
     local.tee $5
     local.get $0
     i32.load
     i32.add
     i64.load
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $3
     local.get $1
     i32.load
     local.get $5
     i32.add
     i64.load
     i64.mul
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     local.get $7
     i32.load
     local.get $5
     i32.add
     local.get $3
     i64.store
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.load offset=16
     local.tee $5
     i32.store offset=20
     local.get $2
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $2
      local.get $5
      i32.load offset=4
      i32.ge_s
     end
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $2
      i32.const 3
      i32.shr_s
      local.tee $6
      local.get $5
      i32.load
      i32.add
      i32.load8_u
      local.set $8
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store
      local.get $6
      local.get $5
      i32.load
      i32.add
      i32.const 1
      local.get $2
      i32.const 7
      i32.and
      i32.shl
      local.get $8
      i32.or
      i32.store8
     end
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|1
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
 )
 (func $assembly/ops/arithmetic/columnDiv (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i64)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 32
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.get $2
  i32.ne
  if
   i32.const 1808
   i32.const 2896
   i32.const 143
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $7
  global.get $~lib/memory/__stack_pointer
  local.get $6
  local.get $7
  call $assembly/core/numeric-column/NumericColumn#constructor
  local.tee $4
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.store
  local.get $4
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $2
  block $break|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $7
       br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
      end
      i32.const 0
      local.set $0
      local.get $6
      i32.const -4
      i32.and
      local.set $1
      loop $while-continue|0
       local.get $0
       local.get $1
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $3
        local.get $2
        i32.add
        local.get $3
        local.get $8
        i32.add
        v128.load
        local.get $3
        local.get $9
        i32.add
        v128.load
        f32x4.div
        v128.store
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      loop $while-continue|1
       local.get $0
       local.get $6
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $1
        local.get $2
        i32.add
        local.get $1
        local.get $8
        i32.add
        f32.load
        local.get $1
        local.get $9
        i32.add
        f32.load
        f32.div
        f32.store
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $while-continue|1
       end
      end
      br $break|0
     end
     i32.const 0
     local.set $0
     local.get $6
     i32.const -2
     i32.and
     local.set $1
     loop $while-continue|00
      local.get $0
      local.get $1
      i32.lt_s
      if
       local.get $0
       i32.const 3
       i32.shl
       local.tee $3
       local.get $2
       i32.add
       local.get $3
       local.get $8
       i32.add
       v128.load
       local.get $3
       local.get $9
       i32.add
       v128.load
       f64x2.div
       v128.store
       local.get $0
       i32.const 2
       i32.add
       local.set $0
       br $while-continue|00
      end
     end
     local.get $0
     local.get $6
     i32.lt_s
     if
      local.get $0
      i32.const 3
      i32.shl
      local.tee $0
      local.get $2
      i32.add
      local.get $0
      local.get $8
      i32.add
      f64.load
      local.get $0
      local.get $9
      i32.add
      f64.load
      f64.div
      f64.store
     end
     br $break|0
    end
    i32.const 0
    local.set $0
    loop $for-loop|1
     local.get $0
     local.get $6
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $1
      local.get $9
      i32.add
      i32.load
      local.tee $3
      if
       local.get $1
       local.get $2
       i32.add
       local.get $1
       local.get $8
       i32.add
       i32.load
       local.get $3
       i32.div_s
       i32.store
      else
       local.get $2
       local.get $0
       i32.const 2
       i32.shl
       i32.add
       i32.const 0
       i32.store
      end
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|1
     end
    end
    br $break|0
   end
   loop $for-loop|2
    local.get $3
    local.get $6
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $3
     i32.const 3
     i32.shl
     local.tee $2
     local.get $1
     i32.load
     i32.add
     i64.load
     local.tee $5
     i64.const 0
     i64.ne
     if
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      i32.load
      local.get $2
      i32.add
      i64.load
      local.get $5
      i64.div_s
      local.set $5
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store
      local.get $4
      i32.load
      local.get $2
      i32.add
      local.get $5
      i64.store
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.load offset=16
      local.tee $2
      i32.store offset=20
     else
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=24
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store
      local.get $4
      i32.load
      local.get $3
      i32.const 3
      i32.shl
      i32.add
      i64.const 0
      i64.store
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.load offset=16
      local.tee $2
      i32.store offset=28
     end
     local.get $3
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store
      local.get $3
      local.get $2
      i32.load offset=4
      i32.ge_s
     end
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store
      local.get $3
      i32.const 3
      i32.shr_s
      local.tee $7
      local.get $2
      i32.load
      i32.add
      i32.load8_u
      local.set $8
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store
      local.get $7
      local.get $2
      i32.load
      i32.add
      i32.const 1
      local.get $3
      i32.const 7
      i32.and
      i32.shl
      local.get $8
      i32.or
      i32.store8
     end
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|2
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $assembly/ops/arithmetic/columnScalarMul (param $0 i32) (param $1 f64) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 v128)
  (local $6 f32)
  (local $7 i64)
  (local $8 i64)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $3
  local.get $9
  call $assembly/core/numeric-column/NumericColumn#constructor
  local.tee $4
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $10
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.store
  local.get $4
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $11
  block $break|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $9
       br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
      end
      i32.const 0
      local.set $0
      local.get $3
      i32.const -4
      i32.and
      local.set $2
      local.get $1
      f32.demote_f64
      local.tee $6
      f32x4.splat
      local.set $5
      loop $while-continue|0
       local.get $0
       local.get $2
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $9
        local.get $11
        i32.add
        local.get $9
        local.get $10
        i32.add
        v128.load
        local.get $5
        f32x4.mul
        v128.store
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      loop $while-continue|1
       local.get $0
       local.get $3
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $2
        local.get $11
        i32.add
        local.get $2
        local.get $10
        i32.add
        f32.load
        local.get $6
        f32.mul
        f32.store
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $while-continue|1
       end
      end
      br $break|0
     end
     i32.const 0
     local.set $0
     local.get $3
     i32.const -2
     i32.and
     local.set $2
     local.get $1
     f64x2.splat
     local.set $5
     loop $while-continue|01
      local.get $0
      local.get $2
      i32.lt_s
      if
       local.get $0
       i32.const 3
       i32.shl
       local.tee $9
       local.get $11
       i32.add
       local.get $9
       local.get $10
       i32.add
       v128.load
       local.get $5
       f64x2.mul
       v128.store
       local.get $0
       i32.const 2
       i32.add
       local.set $0
       br $while-continue|01
      end
     end
     local.get $0
     local.get $3
     i32.lt_s
     if
      local.get $0
      i32.const 3
      i32.shl
      local.tee $0
      local.get $11
      i32.add
      local.get $0
      local.get $10
      i32.add
      f64.load
      local.get $1
      f64.mul
      f64.store
     end
     br $break|0
    end
    i32.const 0
    local.set $0
    local.get $3
    i32.const -4
    i32.and
    local.set $9
    local.get $1
    i32.trunc_sat_f64_s
    local.tee $12
    i32x4.splat
    local.set $5
    loop $while-continue|02
     local.get $0
     local.get $9
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $2
      local.get $11
      i32.add
      local.get $2
      local.get $10
      i32.add
      v128.load
      local.get $5
      i32x4.mul
      v128.store
      local.get $0
      i32.const 4
      i32.add
      local.set $0
      br $while-continue|02
     end
    end
    loop $while-continue|14
     local.get $0
     local.get $3
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $2
      local.get $11
      i32.add
      local.get $2
      local.get $10
      i32.add
      i32.load
      local.get $12
      i32.mul
      i32.store
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $while-continue|14
     end
    end
    br $break|0
   end
   local.get $1
   i64.trunc_sat_f64_s
   local.set $7
   loop $for-loop|1
    local.get $2
    local.get $3
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $7
     local.get $2
     i32.const 3
     i32.shl
     local.tee $9
     local.get $0
     i32.load
     i32.add
     i64.load
     i64.mul
     local.set $8
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store
     local.get $4
     i32.load
     local.get $9
     i32.add
     local.get $8
     i64.store
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.load offset=16
     local.tee $9
     i32.store offset=16
     local.get $2
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $9
      i32.store
      local.get $2
      local.get $9
      i32.load offset=4
      i32.ge_s
     end
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $9
      i32.store
      local.get $2
      i32.const 3
      i32.shr_s
      local.tee $10
      local.get $9
      i32.load
      i32.add
      i32.load8_u
      local.set $11
      global.get $~lib/memory/__stack_pointer
      local.get $9
      i32.store
      local.get $10
      local.get $9
      i32.load
      i32.add
      i32.const 1
      local.get $2
      i32.const 7
      i32.and
      i32.shl
      local.get $11
      i32.or
      i32.store8
     end
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|1
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $assembly/ops/arithmetic/columnScalarAdd (param $0 i32) (param $1 f64) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 v128)
  (local $6 f32)
  (local $7 i64)
  (local $8 i64)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/core/numeric-column/NumericColumn#get:length
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $4
  local.get $9
  call $assembly/core/numeric-column/NumericColumn#constructor
  local.tee $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $10
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store
  local.get $3
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $11
  block $break|0
   block $case3|0
    block $case2|0
     block $case1|0
      block $case0|0
       local.get $9
       br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
      end
      i32.const 0
      local.set $0
      local.get $4
      i32.const -4
      i32.and
      local.set $2
      local.get $1
      f32.demote_f64
      local.tee $6
      f32x4.splat
      local.set $5
      loop $while-continue|0
       local.get $0
       local.get $2
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $9
        local.get $11
        i32.add
        local.get $9
        local.get $10
        i32.add
        v128.load
        local.get $5
        f32x4.add
        v128.store
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      loop $while-continue|1
       local.get $0
       local.get $4
       i32.lt_s
       if
        local.get $0
        i32.const 2
        i32.shl
        local.tee $2
        local.get $11
        i32.add
        local.get $2
        local.get $10
        i32.add
        f32.load
        local.get $6
        f32.add
        f32.store
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $while-continue|1
       end
      end
      br $break|0
     end
     i32.const 0
     local.set $0
     local.get $4
     i32.const -2
     i32.and
     local.set $2
     local.get $1
     f64x2.splat
     local.set $5
     loop $while-continue|01
      local.get $0
      local.get $2
      i32.lt_s
      if
       local.get $0
       i32.const 3
       i32.shl
       local.tee $9
       local.get $11
       i32.add
       local.get $9
       local.get $10
       i32.add
       v128.load
       local.get $5
       f64x2.add
       v128.store
       local.get $0
       i32.const 2
       i32.add
       local.set $0
       br $while-continue|01
      end
     end
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 3
      i32.shl
      local.tee $0
      local.get $11
      i32.add
      local.get $0
      local.get $10
      i32.add
      f64.load
      local.get $1
      f64.add
      f64.store
     end
     br $break|0
    end
    local.get $1
    i32.trunc_sat_f64_s
    local.set $2
    i32.const 0
    local.set $0
    loop $for-loop|1
     local.get $0
     local.get $4
     i32.lt_s
     if
      local.get $0
      i32.const 2
      i32.shl
      local.tee $9
      local.get $11
      i32.add
      local.get $9
      local.get $10
      i32.add
      i32.load
      local.get $2
      i32.add
      i32.store
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|1
     end
    end
    br $break|0
   end
   local.get $1
   i64.trunc_sat_f64_s
   local.set $7
   loop $for-loop|2
    local.get $2
    local.get $4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $7
     local.get $2
     i32.const 3
     i32.shl
     local.tee $9
     local.get $0
     i32.load
     i32.add
     i64.load
     i64.add
     local.set $8
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $3
     i32.load
     local.get $9
     i32.add
     local.get $8
     i64.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.load offset=16
     local.tee $9
     i32.store offset=16
     local.get $2
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $9
      i32.store
      local.get $2
      local.get $9
      i32.load offset=4
      i32.ge_s
     end
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $9
      i32.store
      local.get $2
      i32.const 3
      i32.shr_s
      local.tee $10
      local.get $9
      i32.load
      i32.add
      i32.load8_u
      local.set $11
      global.get $~lib/memory/__stack_pointer
      local.get $9
      i32.store
      local.get $10
      local.get $9
      i32.load
      i32.add
      i32.const 1
      local.get $2
      i32.const 7
      i32.and
      i32.shl
      local.get $11
      i32.or
      i32.store8
     end
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|2
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $assembly/ops/groupby/groupByMin (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 f64)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 f32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 60
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 60
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  local.get $3
  call $assembly/ops/groupby/groupByIntegerKey
  local.tee $10
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store
  local.get $10
  i32.load offset=4
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.set $7
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $1
  i32.store offset=12
  local.get $1
  i32.eqz
  if
   i32.const 2160
   i32.const 2704
   i32.const 323
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  local.get $7
  local.get $1
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $7
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   call $~lib/array/Array<~lib/string/String>#get:length
   local.get $5
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $2
    local.get $5
    call $~lib/array/Array<~lib/string/String>#__get
    local.tee $11
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $11
    call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
    local.tee $1
    i32.store offset=24
    local.get $1
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $assembly/dataframe/builder/DataFrameBuilder#build
     local.set $12
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $~lib/array/Array<~lib/string/String>#get:length
     i32.const 2
     i32.eq
     local.set $13
     global.get $~lib/memory/__stack_pointer
     local.get $3
     call $~lib/staticarray/StaticArray<f64>#constructor
     local.tee $9
     i32.store offset=28
     i32.const 0
     local.set $1
     loop $for-loop|1
      local.get $1
      local.get $3
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store
       local.get $9
       local.get $1
       f64.const inf
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|1
      end
     end
     local.get $13
     if
      i32.const 0
      local.set $1
      loop $for-loop|2
       local.get $1
       local.get $6
       i32.lt_s
       if
        local.get $1
        i32.const 2
        i32.shl
        local.tee $14
        local.get $7
        i32.add
        i32.load
        local.set $15
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store
        local.get $10
        local.get $15
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $15
        i32.const 0
        i32.ge_s
        if
         local.get $12
         local.get $14
         i32.add
         f32.load
         f64.promote_f32
         local.set $4
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store
         local.get $9
         local.get $15
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $4
         f64.gt
         if
          global.get $~lib/memory/__stack_pointer
          local.get $9
          i32.store
          local.get $9
          local.get $15
          local.get $4
          call $~lib/staticarray/StaticArray<f64>#__set
         end
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|2
       end
      end
     else
      i32.const 0
      local.set $1
      loop $for-loop|3
       local.get $1
       local.get $6
       i32.lt_s
       if
        local.get $7
        local.get $1
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.set $14
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store
        local.get $10
        local.get $14
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $14
        i32.const 0
        i32.ge_s
        if
         local.get $12
         local.get $1
         i32.const 3
         i32.shl
         i32.add
         f64.load
         local.set $4
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store
         local.get $9
         local.get $14
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $4
         f64.gt
         if
          global.get $~lib/memory/__stack_pointer
          local.get $9
          i32.store
          local.get $9
          local.get $14
          local.get $4
          call $~lib/staticarray/StaticArray<f64>#__set
         end
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|3
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 2
     i32.const 3
     local.get $13
     select
     call $assembly/core/numeric-column/NumericColumn#constructor
     local.tee $12
     i32.store offset=32
     local.get $13
     if
      i32.const 0
      local.set $1
      loop $for-loop|4
       local.get $1
       local.get $3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store offset=36
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store
        local.get $9
        local.get $1
        call $~lib/staticarray/StaticArray<f64>#__get
        f32.demote_f64
        local.set $8
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        i32.load
        local.get $1
        i32.const 2
        i32.shl
        i32.add
        local.get $8
        f32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.load offset=16
        local.tee $13
        i32.store offset=40
        local.get $1
        i32.const 0
        i32.lt_s
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         local.get $13
         i32.load offset=4
         i32.ge_s
        end
        i32.eqz
        if
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         i32.const 3
         i32.shr_s
         local.tee $14
         local.get $13
         i32.load
         i32.add
         i32.load8_u
         local.set $15
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $14
         local.get $13
         i32.load
         i32.add
         i32.const 1
         local.get $1
         i32.const 7
         i32.and
         i32.shl
         local.get $15
         i32.or
         i32.store8
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|4
       end
      end
     else
      i32.const 0
      local.set $1
      loop $for-loop|5
       local.get $1
       local.get $3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store offset=44
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store
        local.get $9
        local.get $1
        call $~lib/staticarray/StaticArray<f64>#__get
        local.set $4
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        i32.load
        local.get $1
        i32.const 3
        i32.shl
        i32.add
        local.get $4
        f64.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.load offset=16
        local.tee $13
        i32.store offset=48
        local.get $1
        i32.const 0
        i32.lt_s
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         local.get $13
         i32.load offset=4
         i32.ge_s
        end
        i32.eqz
        if
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         i32.const 3
         i32.shr_s
         local.tee $14
         local.get $13
         i32.load
         i32.add
         i32.load8_u
         local.set $15
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $14
         local.get $13
         i32.load
         i32.add
         i32.const 1
         local.get $1
         i32.const 7
         i32.and
         i32.shl
         local.get $15
         i32.or
         i32.store8
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|5
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $10
     i32.store offset=56
     global.get $~lib/memory/__stack_pointer
     local.get $10
     i32.load offset=12
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $11
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store offset=52
     local.get $1
     local.get $11
     local.get $12
     call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#set"
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 60
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $10
 )
 (func $assembly/ops/groupby/groupByMax (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 f64)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 f32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 60
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 60
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  local.get $3
  call $assembly/ops/groupby/groupByIntegerKey
  local.tee $10
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store
  local.get $10
  i32.load offset=4
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.set $7
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $1
  i32.store offset=12
  local.get $1
  i32.eqz
  if
   i32.const 2160
   i32.const 2704
   i32.const 389
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  local.get $7
  local.get $1
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $7
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   call $~lib/array/Array<~lib/string/String>#get:length
   local.get $5
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $2
    local.get $5
    call $~lib/array/Array<~lib/string/String>#__get
    local.tee $11
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $11
    call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
    local.tee $1
    i32.store offset=24
    local.get $1
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $assembly/dataframe/builder/DataFrameBuilder#build
     local.set $12
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     call $~lib/array/Array<~lib/string/String>#get:length
     i32.const 2
     i32.eq
     local.set $13
     global.get $~lib/memory/__stack_pointer
     local.get $3
     call $~lib/staticarray/StaticArray<f64>#constructor
     local.tee $9
     i32.store offset=28
     i32.const 0
     local.set $1
     loop $for-loop|1
      local.get $1
      local.get $3
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store
       local.get $9
       local.get $1
       f64.const -inf
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|1
      end
     end
     local.get $13
     if
      i32.const 0
      local.set $1
      loop $for-loop|2
       local.get $1
       local.get $6
       i32.lt_s
       if
        local.get $1
        i32.const 2
        i32.shl
        local.tee $14
        local.get $7
        i32.add
        i32.load
        local.set $15
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store
        local.get $10
        local.get $15
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $15
        i32.const 0
        i32.ge_s
        if
         local.get $12
         local.get $14
         i32.add
         f32.load
         f64.promote_f32
         local.set $4
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store
         local.get $9
         local.get $15
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $4
         f64.lt
         if
          global.get $~lib/memory/__stack_pointer
          local.get $9
          i32.store
          local.get $9
          local.get $15
          local.get $4
          call $~lib/staticarray/StaticArray<f64>#__set
         end
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|2
       end
      end
     else
      i32.const 0
      local.set $1
      loop $for-loop|3
       local.get $1
       local.get $6
       i32.lt_s
       if
        local.get $7
        local.get $1
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.set $14
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store
        local.get $10
        local.get $14
        call $assembly/ops/groupby/GroupByResult#getGroupIndex
        local.tee $14
        i32.const 0
        i32.ge_s
        if
         local.get $12
         local.get $1
         i32.const 3
         i32.shl
         i32.add
         f64.load
         local.set $4
         global.get $~lib/memory/__stack_pointer
         local.get $9
         i32.store
         local.get $9
         local.get $14
         call $~lib/staticarray/StaticArray<f64>#__get
         local.get $4
         f64.lt
         if
          global.get $~lib/memory/__stack_pointer
          local.get $9
          i32.store
          local.get $9
          local.get $14
          local.get $4
          call $~lib/staticarray/StaticArray<f64>#__set
         end
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|3
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 2
     i32.const 3
     local.get $13
     select
     call $assembly/core/numeric-column/NumericColumn#constructor
     local.tee $12
     i32.store offset=32
     local.get $13
     if
      i32.const 0
      local.set $1
      loop $for-loop|4
       local.get $1
       local.get $3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store offset=36
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store
        local.get $9
        local.get $1
        call $~lib/staticarray/StaticArray<f64>#__get
        f32.demote_f64
        local.set $8
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        i32.load
        local.get $1
        i32.const 2
        i32.shl
        i32.add
        local.get $8
        f32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.load offset=16
        local.tee $13
        i32.store offset=40
        local.get $1
        i32.const 0
        i32.lt_s
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         local.get $13
         i32.load offset=4
         i32.ge_s
        end
        i32.eqz
        if
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         i32.const 3
         i32.shr_s
         local.tee $14
         local.get $13
         i32.load
         i32.add
         i32.load8_u
         local.set $15
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $14
         local.get $13
         i32.load
         i32.add
         i32.const 1
         local.get $1
         i32.const 7
         i32.and
         i32.shl
         local.get $15
         i32.or
         i32.store8
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|4
       end
      end
     else
      i32.const 0
      local.set $1
      loop $for-loop|5
       local.get $1
       local.get $3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store offset=44
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store
        local.get $9
        local.get $1
        call $~lib/staticarray/StaticArray<f64>#__get
        local.set $4
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        i32.load
        local.get $1
        i32.const 3
        i32.shl
        i32.add
        local.get $4
        f64.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.load offset=16
        local.tee $13
        i32.store offset=48
        local.get $1
        i32.const 0
        i32.lt_s
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         local.get $13
         i32.load offset=4
         i32.ge_s
        end
        i32.eqz
        if
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $1
         i32.const 3
         i32.shr_s
         local.tee $14
         local.get $13
         i32.load
         i32.add
         i32.load8_u
         local.set $15
         global.get $~lib/memory/__stack_pointer
         local.get $13
         i32.store
         local.get $14
         local.get $13
         i32.load
         i32.add
         i32.const 1
         local.get $1
         i32.const 7
         i32.and
         i32.shl
         local.get $15
         i32.or
         i32.store8
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|5
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $10
     i32.store offset=56
     global.get $~lib/memory/__stack_pointer
     local.get $10
     i32.load offset=12
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $11
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store offset=52
     local.get $1
     local.get $11
     local.get $12
     call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#set"
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 60
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $10
 )
 (func $assembly/ops/groupby/groupByCount (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 44
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 44
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  local.get $2
  call $assembly/ops/groupby/groupByIntegerKey
  local.tee $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  i32.load offset=4
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $0
  i32.store offset=12
  local.get $0
  i32.eqz
  if
   i32.const 2160
   i32.const 2704
   i32.const 454
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  local.get $6
  local.get $0
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $4
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.tee $6
  i32.store offset=20
  i32.const 0
  local.set $1
  loop $for-loop|0
   local.get $1
   local.get $4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    local.get $6
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__set
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  loop $for-loop|1
   local.get $3
   local.get $5
   i32.lt_s
   if
    local.get $0
    local.get $3
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    local.get $1
    call $assembly/ops/groupby/GroupByResult#getGroupIndex
    local.tee $1
    i32.const 0
    i32.ge_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=4
     local.get $6
     local.get $1
     local.get $6
     local.get $1
     call $~lib/staticarray/StaticArray<i32>#__get
     i32.const 1
     i32.add
     call $~lib/staticarray/StaticArray<i32>#__set
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.const 0
  call $assembly/core/numeric-column/NumericColumn#constructor
  local.tee $3
  i32.store offset=24
  i32.const 0
  local.set $1
  loop $for-loop|2
   local.get $1
   local.get $4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    local.get $6
    local.get $1
    call $~lib/staticarray/StaticArray<i32>#__get
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    local.get $3
    i32.load
    local.get $1
    i32.const 2
    i32.shl
    i32.add
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.load offset=16
    local.tee $5
    i32.store offset=32
    local.get $1
    i32.const 0
    i32.lt_s
    if (result i32)
     i32.const 1
    else
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     local.get $1
     local.get $5
     i32.load offset=4
     i32.ge_s
    end
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     local.get $1
     i32.const 3
     i32.shr_s
     local.tee $0
     local.get $5
     i32.load
     i32.add
     i32.load8_u
     local.set $7
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     local.get $0
     local.get $5
     i32.load
     i32.add
     i32.const 1
     local.get $1
     i32.const 7
     i32.and
     i32.shl
     local.get $7
     i32.or
     i32.store8
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=40
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.load offset=12
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 3040
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=36
  local.get $0
  i32.const 3040
  local.get $3
  call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#set"
  global.get $~lib/memory/__stack_pointer
  i32.const 44
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/ops/join/leftJoinI32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 48
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $2
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $7
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  local.get $3
  call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
  local.tee $8
  i32.store offset=12
  local.get $8
  i32.eqz
  local.get $7
  i32.eqz
  i32.or
  if
   i32.const 2288
   i32.const 2352
   i32.const 173
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $~lib/array/Array<~lib/string/String>#get:length
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store
  local.get $7
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $7
  global.get $~lib/memory/__stack_pointer
  local.get $8
  i32.store
  local.get $8
  call $assembly/dataframe/builder/DataFrameBuilder#build
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $9
  call $assembly/ops/join/JoinHashTable#constructor
  local.tee $10
  i32.store offset=16
  loop $for-loop|0
   local.get $4
   local.get $9
   i32.lt_s
   if
    local.get $8
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $11
    global.get $~lib/memory/__stack_pointer
    local.get $10
    i32.store
    local.get $10
    local.get $11
    local.get $4
    call $assembly/ops/join/JoinHashTable#insert
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 5
  i32.const 3072
  call $~lib/rt/__newArray
  local.tee $8
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 5
  i32.const 3104
  call $~lib/rt/__newArray
  local.tee $9
  i32.store offset=24
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 5
  i32.const 3136
  call $~lib/rt/__newArray
  local.tee $11
  i32.store offset=28
  loop $for-loop|1
   local.get $5
   local.get $6
   i32.lt_s
   if
    local.get $7
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store
    local.get $11
    i32.const 0
    call $~lib/array/Array<i32>#set:length
    global.get $~lib/memory/__stack_pointer
    local.get $10
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store offset=4
    local.get $10
    local.get $4
    local.get $11
    call $assembly/ops/join/JoinHashTable#find
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store
    local.get $11
    call $~lib/array/Array<~lib/string/String>#get:length
    if
     i32.const 0
     local.set $4
     loop $for-loop|2
      global.get $~lib/memory/__stack_pointer
      local.get $11
      i32.store
      local.get $11
      call $~lib/array/Array<~lib/string/String>#get:length
      local.get $4
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $8
       i32.store
       local.get $8
       local.get $5
       call $~lib/array/Array<i32>#push
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $11
       i32.store offset=4
       local.get $9
       local.get $11
       local.get $4
       call $~lib/array/Array<i32>#__get
       call $~lib/array/Array<i32>#push
       local.get $4
       i32.const 1
       i32.add
       local.set $4
       br $for-loop|2
      end
     end
    else
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.store
     local.get $8
     local.get $5
     call $~lib/array/Array<i32>#push
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store
     local.get $9
     i32.const -1
     call $~lib/array/Array<i32>#push
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $8
  i32.store offset=32
  global.get $~lib/memory/__stack_pointer
  local.get $9
  i32.store offset=36
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=40
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=44
  local.get $0
  local.get $1
  local.get $8
  local.get $9
  local.get $2
  local.get $3
  call $assembly/ops/join/buildJoinResult
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/memory/shared/BufferView#constructor (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.const 27
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  local.get $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1456
   i32.const 1504
   i32.const 52
   i32.const 43
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.set $5
  local.get $0
  i32.const 2
  i32.shl
  local.tee $4
  i32.const 1
  call $~lib/rt/itcms/__new
  local.set $3
  local.get $2
  if
   local.get $3
   local.get $2
   local.get $4
   memory.copy
  end
  local.get $5
  local.get $3
  i32.store
  i32.const 16
  local.get $1
  call $~lib/rt/itcms/__new
  local.tee $1
  local.get $3
  i32.store
  local.get $1
  local.get $3
  i32.const 0
  call $~lib/rt/itcms/__link
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $4
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/staticarray/StaticArray<assembly/ops/join/HashEntry|null>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1456
   i32.const 2416
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.shl
  i32.const 20
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<i32>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1456
   i32.const 2416
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.shl
  i32.const 24
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<f64>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 134217727
  i32.gt_u
  if
   i32.const 1456
   i32.const 2416
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 3
  i32.shl
  i32.const 26
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/index/createDataFrame (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=8
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/dataframe/builder/buildDataFrameFromArrays
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/getColumnPtr (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner2
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner2
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner2
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   block $__inlined_func$assembly/dataframe/dataframe/DataFrame#getColumnDataPtr$10 (result i32)
    global.get $~lib/memory/__stack_pointer
    i32.const 24
    i32.sub
    global.set $~lib/memory/__stack_pointer
    block $folding-inner1
     global.get $~lib/memory/__stack_pointer
     i32.const 3396
     i32.lt_s
     br_if $folding-inner2
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.const 24
     memory.fill
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     local.get $2
     local.get $1
     call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#has"
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 24
      i32.add
      global.set $~lib/memory/__stack_pointer
      i32.const 0
      br $__inlined_func$assembly/dataframe/dataframe/DataFrame#getColumnDataPtr$10
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     local.get $1
     call $"~lib/map/Map<~lib/string/String,assembly/dataframe/dataframe/ColumnEntry>#get"
     local.tee $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=16
      local.get $0
      i32.eqz
      if
       i32.const 2160
       i32.const 1952
       i32.const 149
       i32.const 14
       call $~lib/builtins/abort
       unreachable
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      call $assembly/dataframe/builder/DataFrameBuilder#build
      local.set $0
      br $folding-inner1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      i32.load offset=4
      if
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load offset=4
       local.tee $0
       i32.store offset=20
       local.get $0
       i32.eqz
       if
        i32.const 2160
        i32.const 1952
        i32.const 151
        i32.const 14
        call $~lib/builtins/abort
        unreachable
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.sub
       global.set $~lib/memory/__stack_pointer
       global.get $~lib/memory/__stack_pointer
       i32.const 3396
       i32.lt_s
       br_if $folding-inner2
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $0
       i32.load offset=4
       local.set $0
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.add
       global.set $~lib/memory/__stack_pointer
       br $folding-inner1
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 24
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 0
     br $__inlined_func$assembly/dataframe/dataframe/DataFrame#getColumnDataPtr$10
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 24
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
   end
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/getColumnLength (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   local.get $0
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/core/numeric-column/NumericColumn#get:length
   else
    i32.const 0
   end
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/getRowCount (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/array/Array<~lib/string/String>#get:length
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/getColumnCount (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $0
   i32.store
   local.get $0
   call $~lib/array/Array<~lib/string/String>#get:length
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/innerJoin (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/ops/join/innerJoinI32
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/groupBySum@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 3
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $3
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/ops/groupby/groupBySumF32
   local.tee $0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   call $assembly/ops/groupby/GroupByResult#toDataFrame
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/groupByMeanAgg@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 3
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $3
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/ops/groupby/groupByMean
   local.tee $0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   call $assembly/ops/groupby/GroupByResult#toDataFrame
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/freeDataFrame (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $2
   i32.store
   i32.const 1
   global.set $~argumentsLength
   global.get $~lib/memory/__stack_pointer
   local.get $2
   call $~lib/array/Array<~lib/string/String>#slice@varargs
   local.tee $2
   i32.store offset=8
   loop $for-loop|0
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    call $~lib/array/Array<~lib/string/String>#get:length
    local.get $1
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=12
     local.get $2
     local.get $1
     call $~lib/array/Array<~lib/string/String>#__get
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     local.get $0
     local.get $3
     call $assembly/dataframe/dataframe/DataFrame#removeColumn
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/getColumnType (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getColumnType
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/hasColumn (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#hasColumn
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/addInt32ColumnToDataFrame (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.const 0
   call $assembly/core/numeric-column/NumericColumn#constructor
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   local.get $2
   local.get $3
   call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=12
   local.get $0
   local.get $1
   local.get $4
   call $assembly/dataframe/dataframe/DataFrame#addInt32Column
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/addFloat32ColumnToDataFrame (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.const 2
   call $assembly/core/numeric-column/NumericColumn#constructor
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   local.get $2
   local.get $3
   call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=12
   local.get $0
   local.get $1
   local.get $4
   call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/addFloat64ColumnToDataFrame (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.const 3
   call $assembly/core/numeric-column/NumericColumn#constructor
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   local.get $2
   local.get $3
   call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=12
   local.get $0
   local.get $1
   local.get $4
   call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/index/addInt64ColumnToDataFrame (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.const 1
   call $assembly/core/numeric-column/NumericColumn#constructor
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $4
   local.get $2
   local.get $3
   call $assembly/core/numeric-column/NumericColumn#copyFromBuffer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=12
   local.get $0
   local.get $1
   local.get $4
   call $assembly/dataframe/dataframe/DataFrame#addInt64Column
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/dataframe/builder/buildDataFrameFromArrays (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/dataframe/builder/buildDataFrameFromArrays
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/aggregations/columnSum (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnSum
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:assembly/ops/aggregations/columnMean (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnMean
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:assembly/ops/aggregations/columnMin (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnMin
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:assembly/ops/aggregations/columnMax (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnMax
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:assembly/ops/aggregations/columnCount (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnCount
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/aggregations/columnVariance (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnVariance
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:assembly/ops/aggregations/columnStdDev (param $0 i32) (result f64)
  (local $1 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/ops/aggregations/columnStdDev
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:assembly/ops/aggregations/dfSum (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   local.get $0
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/ops/aggregations/columnSum
    local.set $2
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/aggregations/dfMean (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   local.get $0
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/ops/aggregations/columnMean
    local.set $2
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/aggregations/dfMin (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   block $__inlined_func$assembly/ops/aggregations/dfMin$916
    local.get $0
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     f64.const inf
     local.set $2
     br $__inlined_func$assembly/ops/aggregations/dfMin$916
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/ops/aggregations/columnMin
    local.set $2
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/aggregations/dfMax (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   block $__inlined_func$assembly/ops/aggregations/dfMax$917
    local.get $0
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     f64.const -inf
     local.set $2
     br $__inlined_func$assembly/ops/aggregations/dfMax$917
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/ops/aggregations/columnMax
    local.set $2
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/aggregations/dfCount (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   block $__inlined_func$assembly/ops/aggregations/dfCount$918
    local.get $0
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 0
     local.set $0
     br $__inlined_func$assembly/ops/aggregations/dfCount$918
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/ops/aggregations/columnCount
    local.set $0
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/aggregations/dfVariance (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   local.get $0
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/ops/aggregations/columnVariance
    local.set $2
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/aggregations/dfStdDev (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $0
   i32.store offset=8
   local.get $0
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/ops/aggregations/columnStdDev
    local.set $2
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/arithmetic/columnAdd (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $assembly/ops/arithmetic/columnAdd
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/arithmetic/columnSub (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $assembly/ops/arithmetic/columnSub
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/arithmetic/columnMul (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $assembly/ops/arithmetic/columnMul
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/arithmetic/columnDiv (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $assembly/ops/arithmetic/columnDiv
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/arithmetic/columnScalarMul (param $0 i32) (param $1 f64) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  call $assembly/ops/arithmetic/columnScalarMul
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/arithmetic/columnScalarAdd (param $0 i32) (param $1 f64) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  call $assembly/ops/arithmetic/columnScalarAdd
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/arithmetic/dfAdd (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 24
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $2
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $2
   i32.store offset=12
   local.get $2
   i32.eqz
   local.get $1
   i32.eqz
   i32.or
   if
    i32.const 2976
    i32.const 2896
    i32.const 274
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   local.get $2
   call $assembly/ops/arithmetic/columnAdd
   local.tee $2
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   block $break|0
    block $case3|0
     block $case2|0
      block $case1|0
       block $case0|0
        local.get $1
        call $~lib/array/Array<~lib/string/String>#get:length
        br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=20
       local.get $0
       local.get $3
       local.get $2
       call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
       br $break|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=20
      local.get $0
      local.get $3
      local.get $2
      call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
      br $break|0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=20
     local.get $0
     local.get $3
     local.get $2
     call $assembly/dataframe/dataframe/DataFrame#addInt32Column
     br $break|0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=20
    local.get $0
    local.get $3
    local.get $2
    call $assembly/dataframe/dataframe/DataFrame#addInt64Column
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/arithmetic/dfSub (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 24
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $2
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $2
   i32.store offset=12
   local.get $2
   i32.eqz
   local.get $1
   i32.eqz
   i32.or
   if
    i32.const 2976
    i32.const 2896
    i32.const 307
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   local.get $2
   call $assembly/ops/arithmetic/columnSub
   local.tee $2
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   block $break|0
    block $case3|0
     block $case2|0
      block $case1|0
       block $case0|0
        local.get $1
        call $~lib/array/Array<~lib/string/String>#get:length
        br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=20
       local.get $0
       local.get $3
       local.get $2
       call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
       br $break|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=20
      local.get $0
      local.get $3
      local.get $2
      call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
      br $break|0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=20
     local.get $0
     local.get $3
     local.get $2
     call $assembly/dataframe/dataframe/DataFrame#addInt32Column
     br $break|0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=20
    local.get $0
    local.get $3
    local.get $2
    call $assembly/dataframe/dataframe/DataFrame#addInt64Column
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/arithmetic/dfScalarMul (param $0 i32) (param $1 i32) (param $2 f64) (param $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 20
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   call $assembly/dataframe/dataframe/DataFrame#getNumericColumn
   local.tee $4
   i32.store offset=8
   local.get $4
   i32.eqz
   if
    i32.const 2976
    i32.const 2896
    i32.const 339
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   local.get $2
   call $assembly/ops/arithmetic/columnScalarMul
   local.tee $1
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   block $break|0
    block $case3|0
     block $case2|0
      block $case1|0
       block $case0|0
        local.get $4
        call $~lib/array/Array<~lib/string/String>#get:length
        br_table $case2|0 $case3|0 $case0|0 $case1|0 $break|0
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store offset=16
       local.get $0
       local.get $3
       local.get $1
       call $assembly/dataframe/dataframe/DataFrame#addFloat32Column
       br $break|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=16
      local.get $0
      local.get $3
      local.get $1
      call $assembly/dataframe/dataframe/DataFrame#addFloat64Column
      br $break|0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     local.get $0
     local.get $3
     local.get $1
     call $assembly/dataframe/dataframe/DataFrame#addInt32Column
     br $break|0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=16
    local.get $0
    local.get $3
    local.get $1
    call $assembly/dataframe/dataframe/DataFrame#addInt64Column
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/groupby/groupByIntegerKey@varargs (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 2
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $2
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   local.get $2
   call $assembly/ops/groupby/groupByIntegerKey
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/groupby/groupBySumF32@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 3
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $3
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/ops/groupby/groupBySumF32
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/groupby/groupByMean@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 3
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $3
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/ops/groupby/groupByMean
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/groupby/groupByMin@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 3
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $3
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/ops/groupby/groupByMin
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/groupby/groupByMax@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 3
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $3
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/ops/groupby/groupByMax
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/groupby/groupByCount@varargs (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   block $1of1
    block $0of1
     block $outOfRange
      global.get $~argumentsLength
      i32.const 2
      i32.sub
      br_table $0of1 $1of1 $outOfRange
     end
     unreachable
    end
    i32.const 256
    local.set $2
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   local.get $2
   call $assembly/ops/groupby/groupByCount
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/ops/join/innerJoinI32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=12
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/ops/join/innerJoinI32
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/join/leftJoinI32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 3396
  i32.lt_s
  if
   i32.const 36192
   i32.const 36240
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=12
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/ops/join/leftJoinI32
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/ops/join/rightJoinI32 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 3396
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 20
   memory.fill
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $1
   local.get $0
   local.get $3
   local.get $2
   call $assembly/ops/join/leftJoinI32
   local.tee $0
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 36192
  i32.const 36240
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
)
