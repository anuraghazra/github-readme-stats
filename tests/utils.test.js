require("@testing-library/jest-dom");
const {
  kmFormatter,
  encodeHTML,
  renderError,
  FlexLayout,
  getCardColors,
  wrapTextMultiline,
} = require("../src/common/utils");

const { queryByTestId } = require("@testing-library/dom");

describe("Test utils.js", () => {
  it("should test kmFormatter", () => {
    expect(kmFormatter(1)).toBe(1);
    expect(kmFormatter(-1)).toBe(-1);
    expect(kmFormatter(500)).toBe(500);
    expect(kmFormatter(1000)).toBe("1k");
    expect(kmFormatter(10000)).toBe("10k");
    expect(kmFormatter(12345)).toBe("12.3k");
    expect(kmFormatter(9900000)).toBe("9.9M");
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
    expect(queryByTestId(document.body, "message").children[1]).toBeEmptyDOMElement(2);

    // Secondary message
    document.body.innerHTML = renderError(
      "Something went wrong",
      "Secondary Message",
    );
    expect(
      queryByTestId(document.body, "message").children[1],
    ).toHaveTextContent(/Secondary Message/gim);
  });

  it("should test FlexLayout", () => {
    const layout = FlexLayout({
      items: ["<text>1</text>", "<text>2</text>"],
      gap: 60,
    }).join("");

    expect(layout).toBe(
      `<g transform=\"translate(0, 0)\"><text>1</text></g><g transform=\"translate(60, 0)\"><text>2</text></g>`,
    );

    const columns = FlexLayout({
      items: ["<text>1</text>", "<text>2</text>"],
      gap: 60,
      direction: "column",
    }).join("");

    expect(columns).toBe(
      `<g transform=\"translate(0, 0)\"><text>1</text></g><g transform=\"translate(0, 60)\"><text>2</text></g>`,
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
