import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";
import {
  encodeHTML,
  getCardColors,
  kFormatter,
  parseBoolean,
  renderError,
  wrapTextMultiline,
} from "../src/common/utils.js";
import { expect, it, describe } from "@jest/globals";

describe("Test utils.js", () => {
  it("should test kFormatter", () => {
    expect(kFormatter(1)).toBe(1);
    expect(kFormatter(-1)).toBe(-1);
    expect(kFormatter(500)).toBe(500);
    expect(kFormatter(1000)).toBe("1k");
    expect(kFormatter(10000)).toBe("10k");
    expect(kFormatter(12345)).toBe("12.3k");
    expect(kFormatter(9900000)).toBe("9900k");
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

  it("getCardColors: should return expected values", () => {
    let colors = getCardColors({
      title_color: "f00",
      text_color: "0f0",
      ring_color: "0000ff",
      icon_color: "00f",
      bg_color: "fff",
      border_color: "fff",
      theme: "dark",
    });
    expect(colors).toStrictEqual({
      titleColor: "#f00",
      textColor: "#0f0",
      iconColor: "#00f",
      ringColor: "#0000ff",
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
      ringColor: "#2f80ed",
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
      ringColor: "#fff",
      iconColor: "#79ff97",
      bgColor: "#151515",
      borderColor: "#e4e2e2",
    });
  });

  it("getCardColors: should return ring color equal to title color if not ring color is defined", () => {
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
      ringColor: "#f00",
      bgColor: "#fff",
      borderColor: "#fff",
    });
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
