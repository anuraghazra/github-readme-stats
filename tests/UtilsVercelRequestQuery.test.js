import "@testing-library/jest-dom";
import {
  toBoolean,
  toString,
  toStringArray,
  toInteger,
  toFloatingNumber,
} from "../src/utils/vercelRequestQuery";

describe("toBoolean", () => {
  it("should return boolean when value is 'true' or 'false'", () => {
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean("true")).toBe(true);
  });
  it("should return undefined when value is others", () => {
    expect(toBoolean(true)).toBeUndefined();
    expect(toBoolean(false)).toBeUndefined();
    expect(toBoolean(1)).toBeUndefined();
    expect(toBoolean("yes")).toBeUndefined();
    expect(toBoolean(["true"])).toBeUndefined();
    expect(toBoolean(undefined)).toBeUndefined();
  });
});

describe("toString", () => {
  it("should return original string when value is string", () => {
    expect(toString("abc")).toBe("abc");
  });
  it("should return first element when value is string array", () => {
    expect(toString(["abc", "cde"])).toBe("abc");
  });
  it("should return undefined when value is empty", () => {
    expect(toString("")).toBeUndefined();
    expect(toString([])).toBeUndefined();
  });
  it("should return undefined when value is other type", () => {
    expect(toString(undefined)).toBeUndefined();
    expect(toString(1)).toBeUndefined();
    expect(toString({})).toBeUndefined();
    expect(toString([1, "abc"])).toBeUndefined();
  });
});

describe("toStringArray", () => {
  it("should return original array when value is string array", () => {
    expect(toStringArray(["a", "b"])).toEqual(["a", "b"]);
  });
  it("should return string array when value string", () => {
    expect(toStringArray("a")).toEqual(["a"]);
  });
  it("should return empty array when value is empty", () => {
    expect(toStringArray("")).toEqual([]);
    expect(toStringArray([])).toEqual([]);
  });
  it("should return empty array when value is other type", () => {
    expect(toStringArray([1, "a"])).toEqual([]);
    expect(toStringArray(1)).toEqual([]);
    expect(toStringArray(undefined)).toEqual([]);
  });
});

describe("toInteger", () => {
  it("should return integer when value can parse to a number", () => {
    expect(toInteger(1.01)).toBe(1);
    expect(toInteger("1.01")).toBe(1);
    expect(toInteger("1.61")).toBe(1);
    expect(toInteger("1.31ax")).toBe(1);
  });

  it("should return integer when value's first element can parse to a number", () => {
    expect(toInteger(["1.01", "aaa"])).toBe(1);
  });

  it("should return undefined when value can not parse to a number", () => {
    expect(toInteger("aaa")).toBeUndefined();
  });

  it("should return undefined when value's first element can not parse to a number", () => {
    expect(toInteger(["", "0.1"])).toBeUndefined();
  });

  it("should return undefined when value is undefined", () => {
    expect(toInteger(undefined)).toBeUndefined();
  });
});

describe("toFloatingNumber", () => {
  it("should return floating number when value can parse to a number", () => {
    expect(toFloatingNumber(1)).toBe(1);
    expect(toFloatingNumber("1.01")).toBe(1.01);
    expect(toFloatingNumber("1.61")).toBe(1.61);
    expect(toFloatingNumber("1.31ax")).toBe(1.31);
  });

  it("should return floating number when value's first element can parse to a number", () => {
    expect(toFloatingNumber(["1.01", "aaa"])).toBe(1.01);
  });

  it("should return undefined when value can not parse to a number", () => {
    expect(toFloatingNumber("aaa")).toBeUndefined();
  });

  it("should return undefined when value's first element can not parse to a number", () => {
    expect(toFloatingNumber(["", "0.1"])).toBeUndefined();
  });

  it("should return undefined when value is undefined", () => {
    expect(toFloatingNumber(undefined)).toBeUndefined();
  });
});
