import "@testing-library/jest-dom";
import {
  encodeHTML,
  lowercaseTrim,
  wrapTextMultiline,
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
