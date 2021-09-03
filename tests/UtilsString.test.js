import "@testing-library/jest-dom";
import {
  encodeHTML,
  lowercaseTrim,
  wrapTextMultiline,
  kFormatter,
} from "../src/utils/string";

describe("Test string utils", () => {
  it("should test encodeHTML", () => {
    expect(encodeHTML(`<html>hello world<,.#4^&^@%!))`)).toBe(
      "&#60;html&#62;hello world&#60;,.#4^&#38;^@%!))",
    );
  });

  it("should test lowercaseTrim", () => {
    expect(lowercaseTrim("  Upper case ")).toBe("upper case");
  });

  it("should test kFormatter", () => {
    expect(kFormatter(1)).toBe("1");
    expect(kFormatter(-1)).toBe("-1");
    expect(kFormatter(500)).toBe("500");
    expect(kFormatter(1000)).toBe("1k");
    expect(kFormatter(10000)).toBe("10k");
    expect(kFormatter(12345)).toBe("12.3k");
    expect(kFormatter(9900000)).toBe("9900k");
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
  });
});
