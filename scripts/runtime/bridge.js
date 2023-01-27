/**
 *  Data Types:
 *
 *  JavaScript -> Golang
 *  ---------------------------------------------------
 *  | JavaScript            | Golang                  |
 *  ---------------------------------------------------
 *  | null                  | nil                     |
 *  | undefined             | bridge.Undefined        |
 *  | boolean               | bool                    |
 *  | number(int)           | int                     |
 *  | number(float)         | float64                 |
 *  | bigint                | int64                   |
 *  | string                | string                  |
 *  | object                | map[string]interface{}  |
 *  | array                 | []interface{}           |
 *  | object(Uint8Array)    | []byte                  |
 *  | object(Promise)       | bridge.Promise          |
 *  | function              | bridge.Function         |
 *  ---------------------------------------------------
 *
 *  Golang -> JavaScript
 *  ---------------------------------------------------
 *  | Golang                  | Javascript            |
 *  ---------------------------------------------------
 *  | nil                     | null                  |
 *  | bool                    | boolean               |
 *  | int                     | number(int)           |
 *  | uint                    | number(int)           |
 *  | uint8                   | number(int)           |
 *  | uint16                  | number(int)           |
 *  | uint32                  | number(int)           |
 *  | int8                    | number(int)           |
 *  | int16                   | number(int)           |
 *  | int32                   | number(int)           |
 *  | float32                 | number(float)         |
 *  | float64                 | number(float)         |
 *  | int64                   | bigint                |
 *  | uint64                  | bigint                |
 *  | string                  | string                |
 *  | map[string]interface{}  | object                |
 *  | []interface{}           | array                 |
 *  | []byte                  | object(Uint8Array)    |
 *  | struct                  | object                |
 *  | func                    | function              |
 *  ---------------------------------------------------
 *
 */

// js: null  go: nil
function ValueOfNull(value) {
  return { typeof: typeof value, check: value === null }; // "object" go: nil
}
function ReturnNull() {
  return null;
}

// js: undefined  go: bridge.Undefined
function ValueOfUndefined(value) {
  return { typeof: typeof value, check: value === undefined }; // "undefined"  go: undefined
}
function ReturnUndefined() {
  return undefined;
}

// js: boolean  go: bool
function ValueOfBoolean(value) {
  return { typeof: typeof value, check: value === true || value === false }; // "boolean"  go: bool
}
function ReturnBoolean() {
  return true;
}

// js: number(int)  go: int
function ValueOfNumberInt(value) {
  return { typeof: typeof value, check: value === 99 }; // "number" | int  go: int
}
function ReturnNumberInt() {
  return 99;
}

// js: number(float)  go: float64
function ValueOfNumberFloat(value) {
  return {
    typeof: typeof value,
    check: value.toFixed(3) === "0.618",
    value: `${value}`,
  }; // "number" | float  go: float64
}
function ReturnNumberFloat() {
  return 0.618;
}

// js: bigint  go: int64
function ValueOfBigInt(value) {
  return { typeof: typeof value, check: value === BigInt(99) }; // "bigint"  go: int64
}
function ReturnBigInt() {
  return BigInt(99);
}

// js: string  go: string
function ValueOfString(value) {
  return { typeof: typeof value, check: value === "hello world" }; // "string"  go: string
}
function ReturnString() {
  return "hello world";
}

// js: object  go: map[string]interface{}
function ValueOfObject(value) {
  const jsValue = {
    string: "foo",
    int: 99,
    bigint: 99,
    float: 0.618,
    nests: { string: "foo", int: 99, float: 0.618, bigint: 99 },
  };
  const compare = (o1, o2) => {
    if (o1.string != o2.string) {
      return false;
    }
    if (o1.int != o2.int) {
      return false;
    }
    if (o1.bigint != o2.bigint) {
      return false;
    }
    if (o1.float != o2.float) {
      return false;
    }
    return true;
  };

  return {
    typeof: typeof value,
    check: compare(jsValue, value) && compare(jsValue.nests, value.nests),
    value: jsValue,
  }; // "object"  go: map[string]interface{}
}

function ReturnObject() {
  return {
    string: "foo",
    int: 99,
    bigint: BigInt(99),
    float: 0.618,
    nests: { string: "foo", int: 99, float: 0.618, bigint: BigInt(99) },
  };
}

// js: object(array)  go: []interface{}
function ValueOfArray(value) {
  return {
    typeof: typeof value,
    check:
      value ===
      [
        "foo",
        99,
        0.618,
        BigInt(99),
        {
          string: "foo",
          int: 99,
          bigint: BigInt(99),
          float: 0.618,
          nests: { int: 99, float: 0.618, bigint: BigInt(99) },
        },
        [
          "foo",
          99,
          0.618,
          BigInt(99),
          {
            string: "foo",
            int: 99,
            bigint: BigInt(99),
            float: 0.618,
            nests: { int: 99, float: 0.618, bigint: BigInt(99) },
          },
        ],
      ],
  };
} // "object" go: []interface{}
function ReturnArray() {
  return [
    "foo",
    99,
    0.618,
    BigInt(99),
    {
      string: "foo",
      int: 99,
      bigint: BigInt(99),
      float: 0.618,
      nests: { int: 99, float: 0.618, bigint: BigInt(99) },
    },
    [
      "foo",
      99,
      0.618,
      BigInt(99),
      {
        string: "foo",
        int: 99,
        bigint: BigInt(99),
        float: 0.618,
        nests: { int: 99, float: 0.618, bigint: BigInt(99) },
      },
    ],
  ];
}

// js: object(Int32Array)  go: []byte
function ValueOfInt32Array(value) {
  const int32 = new Int32Array(2);
  int32[0] = 42;
  return { typeof: typeof value, check: value === int32 }; // "object" go: []byte
}
function ReturnInt32Array() {
  const int32 = new Int32Array(2);
  int32[0] = 42;
  return int32;
}

function ValueOfFunction(callback) {
  return callback("hello");
}
function ReturnFunction() {
  return (arg) => {
    return arg;
  };
}

async function ReturnAsync(callback, value) {
  try {
    const res = await callback(value);
    return res;
  } catch (err) {
    return err;
  }
}

function ReturnPromiseString(value) {
  return new Promise((resole, reject) => {
    if (value == "hello") {
      resole(value);
      return;
    }
    reject(new Error("PromiseString Error"));
  });
}

function ReturnPromiseInt(value) {
  value = parseInt(value);
  return new Promise((resole, reject) => {
    if (value == 1) {
      resole(value);
      return;
    }
    reject(new Error("PromiseInt Error"));
  });
}
