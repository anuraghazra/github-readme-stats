import { describe, expect, it } from "@jest/globals";
import { formatBytes, kFormatter } from "../src/common/fmt.js";

describe("Test fmt.js", () => {
  it("should test kFormatter default behavior", () => {
    expect(kFormatter(1)).toBe(1);
    expect(kFormatter(-1)).toBe(-1);
    expect(kFormatter(500)).toBe(500);
    expect(kFormatter(1000)).toBe("1k");
    expect(kFormatter(1200)).toBe("1.2k");
    expect(kFormatter(10000)).toBe("10k");
    expect(kFormatter(12345)).toBe("12.3k");
    expect(kFormatter(99900)).toBe("99.9k");
    expect(kFormatter(9900000)).toBe("9900k");
  });

  it("should test kFormatter with 0 decimal precision", () => {
    expect(kFormatter(1, 0)).toBe("0k");
    expect(kFormatter(-1, 0)).toBe("-0k");
    expect(kFormatter(500, 0)).toBe("1k");
    expect(kFormatter(1000, 0)).toBe("1k");
    expect(kFormatter(1200, 0)).toBe("1k");
    expect(kFormatter(10000, 0)).toBe("10k");
    expect(kFormatter(12345, 0)).toBe("12k");
    expect(kFormatter(99000, 0)).toBe("99k");
    expect(kFormatter(99900, 0)).toBe("100k");
    expect(kFormatter(9900000, 0)).toBe("9900k");
  });

  it("should test kFormatter with 1 decimal precision", () => {
    expect(kFormatter(1, 1)).toBe("0.0k");
    expect(kFormatter(-1, 1)).toBe("-0.0k");
    expect(kFormatter(500, 1)).toBe("0.5k");
    expect(kFormatter(1000, 1)).toBe("1.0k");
    expect(kFormatter(1200, 1)).toBe("1.2k");
    expect(kFormatter(10000, 1)).toBe("10.0k");
    expect(kFormatter(12345, 1)).toBe("12.3k");
    expect(kFormatter(99900, 1)).toBe("99.9k");
    expect(kFormatter(9900000, 1)).toBe("9900.0k");
  });

  it("should test kFormatter with 2 decimal precision", () => {
    expect(kFormatter(1, 2)).toBe("0.00k");
    expect(kFormatter(-1, 2)).toBe("-0.00k");
    expect(kFormatter(500, 2)).toBe("0.50k");
    expect(kFormatter(1000, 2)).toBe("1.00k");
    expect(kFormatter(1200, 2)).toBe("1.20k");
    expect(kFormatter(10000, 2)).toBe("10.00k");
    expect(kFormatter(12345, 2)).toBe("12.35k");
    expect(kFormatter(99900, 2)).toBe("99.90k");
    expect(kFormatter(9900000, 2)).toBe("9900.00k");
  });

  it("formatBytes: should return expected values", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(100)).toBe("100.0 B");
    expect(formatBytes(1024)).toBe("1.0 KB");
    expect(formatBytes(1024 * 1024)).toBe("1.0 MB");
    expect(formatBytes(1024 * 1024 * 1024)).toBe("1.0 GB");
    expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe("1.0 TB");
    expect(formatBytes(1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.0 PB");
    expect(formatBytes(1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.0 EB");

    expect(formatBytes(1234 * 1024)).toBe("1.2 MB");
    expect(formatBytes(123.4 * 1024)).toBe("123.4 KB");
  });
});
