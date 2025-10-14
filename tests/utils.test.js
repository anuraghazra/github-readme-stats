// @ts-check

import { describe, expect, it } from "@jest/globals";
import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { encodeHTML, parseBoolean, renderError } from "../src/common/utils.js";
import { wrapTextMultiline } from "../src/common/fmt.js";

describe("Test utils.js", () => {
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
