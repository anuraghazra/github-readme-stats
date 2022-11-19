import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";
import {
  chunkArray,
  clampValue,
  encodeHTML,
  fallbackColor,
  flexLayout,
  getCardColors,
  isValidGradient,
  isValidHexColor,
  kFormatter,
  lowercaseTrim,
  measureText,
  parseArray,
  parseBoolean,
  parseEmojis,
  renderError,
  wrapTextMultiline,
} from "../src/common/utils.js";

describe("Test utils.js", () => {
  it("should test renderError", () => {
    document.body.innerHTML = renderError("Something went wrong");
    expect(
      queryByTestId(document.body, "message").children[0],
    ).toHaveTextContent(/Something went wrong/gim);
    expect(
      queryByTestId(document.body, "message").children[1],
    ).toBeEmptyDOMElement(2);

    // Secondary message
    document.body.innerHTML = renderError(
      "Something went wrong",
      "Secondary Message",
    );
    expect(
      queryByTestId(document.body, "message").children[1],
    ).toHaveTextContent(/Secondary Message/gim);
  });

  it("should test encodeHTML", () => {
    expect(encodeHTML(`<html>hello world<,.#4^&^@%!))`)).toBe(
      "&#60;html&#62;hello world&#60;,.#4^&#38;^@%!))",
    );
  });

  it("should test kFormatter", () => {
    expect(kFormatter(1)).toBe(1);
    expect(kFormatter(-1)).toBe(-1);
    expect(kFormatter(500)).toBe(500);
    expect(kFormatter(1000)).toBe("1k");
    expect(kFormatter(10000)).toBe("10k");
    expect(kFormatter(12345)).toBe("12.3k");
    expect(kFormatter(9900000)).toBe("9900k");
  });

  it("should test isValidHexColor", () => {
    expect(isValidHexColor("00f000")).toBe(true);
    expect(isValidHexColor("00f0003f")).toBe(true);
    expect(isValidHexColor("0f03")).toBe(true);
    expect(isValidHexColor("0f0")).toBe(true);

    expect(isValidHexColor("00f00X")).toBe(false);
    expect(isValidHexColor("#")).toBe(false);
    expect(isValidHexColor("")).toBe(false);
    expect(isValidHexColor("0")).toBe(false);
    expect(isValidHexColor("00")).toBe(false);
    expect(isValidHexColor("00f00")).toBe(false);
    expect(isValidHexColor("00f00")).toBe(false);
  });

  it("should test parseBoolean", () => {
    expect(parseBoolean(true)).toBe(true);
    expect(parseBoolean(false)).toBe(false);

    expect(parseBoolean("true")).toBe(true);
    expect(parseBoolean("false")).toBe(false);

    expect(parseBoolean(undefined)).toBe(undefined);
  });

  it("should test parseArray", () => {
    expect(parseArray("1")).toEqual(["1"]);
    expect(parseArray("1,2,3")).toEqual(["1", "2", "3"]);
    expect(parseArray("test")).toEqual(["test"]);
  });

  it("should test clampValue", () => {
    expect(clampValue(1, 0, 2)).toBe(1);
    expect(clampValue(1, 2, 3)).toBe(2);
    expect(clampValue(1, 0, 0)).toBe(0);
    expect(clampValue(1, 0, -1)).toBe(0);
  });

  it("should test isValidGradient", () => {
    expect(isValidGradient(["90", "fff", "000"])).toBe(true);
    expect(isValidGradient(["90", "fff", "000", "fff"])).toBe(true);

    expect(isValidGradient(["fff", "fff", "fxf"])).toBe(false);
    expect(isValidGradient(["90", "fff", "fxf"])).toBe(false);
    expect(isValidGradient(["90", "fxf", ""])).toBe(false);
  });

  it("should test fallbackColor", () => {
    expect(fallbackColor("fff", "000")).toBe("#fff");
    expect(fallbackColor("fxf", "#000")).toBe("#000");
    expect(fallbackColor("90,fff,000", "#000")).toStrictEqual([
      "90",
      "fff",
      "000",
    ]);
    expect(fallbackColor("90,fff,fxf", "#000")).toBe("#000");
  });

  it("should test flexLayout", () => {
    const items = Array(2).fill(`<g></g>`);

    const columnLayout = flexLayout({
      items,
      gap: 25,
      direction: "column",
      sizes: [],
    });
    expect(columnLayout[0]).toContain("translate(0, 0)");
    expect(columnLayout[1]).toContain("translate(0, 25)");

    const rowLayout = flexLayout({
      items,
      gap: 25,
      direction: "row",
      sizes: [],
    });
    expect(rowLayout[0]).toContain("translate(0, 0)");
    expect(rowLayout[1]).toContain("translate(25, 0)");

    const sizedLayout = flexLayout({
      items,
      gap: 25,
      direction: "row",
      sizes: [25, 0],
    });
    expect(sizedLayout[0]).toContain("translate(0, 0)");
    expect(sizedLayout[1]).toContain("translate(50, 0)");
  });

  it("getCardColors: should return expected values", () => {
    let colors = getCardColors({
      title_color: "f00",
      text_color: "0f0",
      icon_color: "00f",
      bg_color: "fff",
      border_color: "fff",
      theme: "dark",
    });
    expect(colors).toStrictEqual({
      titleColor: "#f00",
      textColor: "#0f0",
      iconColor: "#00f",
      bgColor: "#fff",
      borderColor: "#fff",
    });
  });

  it("getCardColors: should fallback to default colors if color is invalid", () => {
    let colors = getCardColors({
      title_color: "invalidcolor",
      text_color: "0f0",
      icon_color: "00f",
      bg_color: "fff",
      border_color: "invalidColor",
      theme: "dark",
    });
    expect(colors).toStrictEqual({
      titleColor: "#2f80ed",
      textColor: "#0f0",
      iconColor: "#00f",
      bgColor: "#fff",
      borderColor: "#e4e2e2",
    });
  });

  it("getCardColors: should fallback to specified theme colors if is not defined", () => {
    let colors = getCardColors({
      theme: "dark",
    });
    expect(colors).toStrictEqual({
      titleColor: "#fff",
      textColor: "#9f9f9f",
      iconColor: "#79ff97",
      bgColor: "#151515",
      borderColor: "#e4e2e2",
    });
  });

  it("wrapTextMultiline: should not wrap small texts", () => {
    {
      let multiLineText = wrapTextMultiline("Small text should not wrap");
      expect(multiLineText).toEqual(["Small text should not wrap"]);
    }
  });

  it("wrapTextMultiline: should wrap large texts", () => {
    let multiLineText = wrapTextMultiline(
      "Hello world long long long text",
      20,
      3,
    );
    expect(multiLineText).toEqual(["Hello world long", "long long text"]);
  });

  it("wrapTextMultiline: should wrap large texts and limit max lines", () => {
    let multiLineText = wrapTextMultiline(
      "Hello world long long long text",
      10,
      2,
    );
    expect(multiLineText).toEqual(["Hello", "world long..."]);
  });

  it("wrapTextMultiline: should wrap chinese by punctuation", () => {
    let multiLineText = wrapTextMultiline(
      "专门为刚开始刷题的同学准备的算法基地，没有最细只有更细，立志用动画将晦涩难懂的算法说的通俗易懂！",
    );
    expect(multiLineText.length).toEqual(3);
    expect(multiLineText[0].length).toEqual(18 * 8); // &#xxxxx; x 8
  });

  it("should test measureText", () => {
    expect(measureText("test")).toEqual(16.078125);

    expect(measureText("test", 12)).toEqual(19.293750000000003);
  });

  it("should test lowercaseTrim", () => {
    expect(lowercaseTrim("test")).toEqual("test");
    expect(lowercaseTrim(" test ")).toEqual("test");
    expect(lowercaseTrim(" Test ")).toEqual("test");
  });

  it("should test chunkArray", () => {
    expect(chunkArray([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunkArray([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7],
    ]);
  });

  it("should test parseEmojis", () => {
    expect(parseEmojis("test")).toEqual("test");
    expect(parseEmojis("test :smile:")).toEqual("test 😄");
    expect(parseEmojis("test :smile: :+1:")).toEqual("test 😄 👍");
    expect(parseEmojis("test :smile: :+1: :smile:")).toEqual("test 😄 👍 😄");
  });
});
