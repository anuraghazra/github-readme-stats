import "@testing-library/jest-dom";
import renderToString from "preact-render-to-string";
import {
  kFormatter,
  encodeHTML,
  renderError,
  getCardColors,
} from "../../src/utils";
import FlexLayout from "../../src/components/flexLayout";

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

  it("should test encodeHTML", () => {
    expect(encodeHTML(`<html>hello world<,.#4^&^@%!))`)).toBe(
      "&#60;html&#62;hello world&#60;,.#4^&#38;^@%!))"
    );
  });

  it("should test renderError", () => {
    document.body.innerHTML = renderToString(
      renderError("Something went wrong")
    );
    expect(document.getElementById("message").textContent).toBe(
      "Something went wrong"
    );
  });

  it("should test FlexLayout", () => {
    const layout = renderToString(
      FlexLayout({
        items: ["<text>1</text>", "<text>2</text>"],
        gap: 60,
      })
    );

    expect(layout).toBe(
      `<g transform="translate(0, 0)">&lt;text&gt;1&lt;/text&gt;</g><g transform="translate(60, 0)">&lt;text&gt;2&lt;/text&gt;</g>`
    );

    const columns = renderToString(
      FlexLayout({
        items: ["<text>1</text>", "<text>2</text>"],
        gap: 60,
        direction: "column",
      })
    );

    expect(columns).toBe(
      `<g transform="translate(0, 0)">&lt;text&gt;1&lt;/text&gt;</g><g transform="translate(0, 60)">&lt;text&gt;2&lt;/text&gt;</g>`
    );
  });

  it("getCardColors: should return expected values", () => {
    let colors = getCardColors({
      title_color: "f00",
      text_color: "0f0",
      icon_color: "00f",
      bg_color: "fff",
      theme: "dark",
    });
    expect(colors).toStrictEqual({
      titleColor: "#f00",
      textColor: "#0f0",
      iconColor: "#00f",
      bgColor: "#fff",
    });
  });

  it("getCardColors: should fallback to default colors if color is invalid", () => {
    let colors = getCardColors({
      title_color: "invalidcolor",
      text_color: "0f0",
      icon_color: "00f",
      bg_color: "fff",
      theme: "dark",
    });
    expect(colors).toStrictEqual({
      titleColor: "#2f80ed",
      textColor: "#0f0",
      iconColor: "#00f",
      bgColor: "#fff",
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
    });
  });
});
