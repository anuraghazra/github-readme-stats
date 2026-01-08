import { describe, expect, it } from "@jest/globals";
import {
  parseBoolean,
  parseArray,
  clampValue,
  lowercaseTrim,
  chunkArray,
  parseEmojis,
  dateDiff,
} from "../src/common/ops.js";

describe("Test ops.js", () => {
  it("should test parseBoolean", () => {
    expect(parseBoolean(true)).toBe(true);
    expect(parseBoolean(false)).toBe(false);

    expect(parseBoolean("true")).toBe(true);
    expect(parseBoolean("false")).toBe(false);
    expect(parseBoolean("True")).toBe(true);
    expect(parseBoolean("False")).toBe(false);
    expect(parseBoolean("TRUE")).toBe(true);
    expect(parseBoolean("FALSE")).toBe(false);

    expect(parseBoolean("1")).toBe(undefined);
    expect(parseBoolean("0")).toBe(undefined);
    expect(parseBoolean("")).toBe(undefined);
    // @ts-ignore
    expect(parseBoolean(undefined)).toBe(undefined);
  });

  it("should test parseArray", () => {
    expect(parseArray("a,b,c")).toEqual(["a", "b", "c"]);
    expect(parseArray("a, b, c")).toEqual(["a", " b", " c"]); // preserves spaces
    expect(parseArray("")).toEqual([]);
    // @ts-ignore
    expect(parseArray(undefined)).toEqual([]);
  });

  it("should test clampValue", () => {
    expect(clampValue(5, 1, 10)).toBe(5);
    expect(clampValue(0, 1, 10)).toBe(1);
    expect(clampValue(15, 1, 10)).toBe(10);

    // string inputs are coerced numerically by Math.min/Math.max
    // @ts-ignore
    expect(clampValue("7", 1, 10)).toBe(7);

    // non-numeric and NaN fall back to min
    // @ts-ignore
    expect(clampValue("abc", 1, 10)).toBe(1);
    expect(clampValue(NaN, 2, 5)).toBe(2);
  });

  it("should test lowercaseTrim", () => {
    expect(lowercaseTrim("  Hello World  ")).toBe("hello world");
    expect(lowercaseTrim("already lower")).toBe("already lower");
  });

  it("should test chunkArray", () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunkArray([1, 2, 3, 4, 5], 1)).toEqual([[1], [2], [3], [4], [5]]);
    expect(chunkArray([1, 2, 3, 4, 5], 10)).toEqual([[1, 2, 3, 4, 5]]);
  });

  it("should test parseEmojis", () => {
    // unknown emoji name is stripped
    expect(parseEmojis("Hello :nonexistent:")).toBe("Hello ");
    // common emoji names should be replaced (at least token removed)
    const out = parseEmojis("I :heart: OSS");
    expect(out).not.toContain(":heart:");
    expect(out.startsWith("I ")).toBe(true);
    expect(out.endsWith(" OSS")).toBe(true);

    expect(() => parseEmojis("")).toThrow(/parseEmoji/);
    // @ts-ignore
    expect(() => parseEmojis()).toThrow(/parseEmoji/);
  });

  it("should test dateDiff", () => {
    const a = new Date("2020-01-01T00:10:00Z");
    const b = new Date("2020-01-01T00:00:00Z");
    expect(dateDiff(a, b)).toBe(10);

    const c = new Date("2020-01-01T00:00:00Z");
    const d = new Date("2020-01-01T00:10:30Z");
    // rounds to nearest minute
    expect(dateDiff(c, d)).toBe(-10);
  });
});
