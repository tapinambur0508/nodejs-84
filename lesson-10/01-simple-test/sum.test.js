const sum = require("./sum");

// const result1 = sum(1, 2);
// if (result1 !== 3) {
//   throw new Error(`Expected 3, but got ${result1}`);
// }

// const result2 = sum(1, -2);
// if (result2 !== -1) {
//   throw new Error(`Expected -1, but got ${result2}`);
// }

// const result3 = sum("1", "-2");
// if (result3 !== -1) {
//   throw new Error(`Expected -1, but got ${result3}`);
// }

// console.log("OK");

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
      }
    },
  };
}

function describe(text, cb) {
  console.log(text);
  cb();
}

function test(text, cb) {
  console.log(`  ${text}`);
  cb();
}

describe("sum", () => {
  test("1 + 2 should return 3", () => {
    const result = sum(1, 2); // Act
    expect(result).toBe(3); // Assert
  });

  test("1 + (-2) should return -1", () => {
    const result = sum(1, -2);
    expect(result).toBe(-1);
  });

  test("'1' + '-2' should return -1", () => {
    const result = sum("1", "-2");
    expect(result).toBe(-1);
  });

  console.log("OK");
});
