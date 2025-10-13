import { describe, expect, it } from "@jest/globals";
import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";
import {
  encodeHTML,
  formatBytes,
  kFormatter,
  parseBoolean,
  renderError,
  wrapTextMultiline,
} from "../src/common/utils.js";

describe("Test utils.js", () => {
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
    expect(parseBoolean(undefined)).toBe(undefined);
  });

  it("should test encodeHTML", () => {
    expect(encodeHTML(`<html>hello world<,.#4^&^@%!))`)).toBe(
      "&#60;html&#62;hello world&#60;,.#4^&#38;^@%!))",
    );
  });

  it("should test renderError", () => {
    document.body.innerHTML = renderError({ message: "Something went wrong" });
    expect(
      queryByTestId(document.body, "message").children[0],
    ).toHaveTextContent(/Something went wrong/gim);
    expect(
      queryByTestId(document.body, "message").children[1],
    ).toBeEmptyDOMElement(2);

    // Secondary message
    document.body.innerHTML = renderError({
      message: "Something went wrong",
      secondaryMessage: "Secondary Message",
    });
    expect(
      queryByTestId(document.body, "message").children[1],
    ).toHaveTextContent(/Secondary Message/gim);
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

describe("wrapTextMultiline", () => {
  it("should not wrap small texts", () => {
    {
      let multiLineText = wrapTextMultiline("Small text should not wrap");
      expect(multiLineText).toEqual(["Small text should not wrap"]);
    }
  });
  it("should wrap large texts", () => {
    let multiLineText = wrapTextMultiline(
      "Hello world long long long text",
      20,
      3,
    );
    expect(multiLineText).toEqual(["Hello world long", "long long text"]);
  });
  it("should wrap large texts and limit max lines", () => {
    let multiLineText = wrapTextMultiline(
      "Hello world long long long text",
      10,
      2,
    );
    expect(multiLineText).toEqual(["Hello", "world long..."]);
  });
  it("should wrap chinese by punctuation", () => {
    let multiLineText = wrapTextMultiline(
      "专门为刚开始刷题的同学准备的算法基地，没有最细只有更细，立志用动画将晦涩难懂的算法说的通俗易懂！",
    );
    expect(multiLineText.length).toEqual(3);
    expect(multiLineText[0].length).toEqual(18 * 8); // &#xxxxx; x 8
  });
});
