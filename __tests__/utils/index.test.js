import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/preact";
import {
  kFormatter,
  renderError,
  FlexLayout,
  getCardColors,
} from "../../src/utils";

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

  it("should test renderError", () => {
    const testMessage = "Something went wrong";
    const { getByText } = render(renderError(testMessage));
    expect(getByText(testMessage)).toBeInTheDocument();
  });

  it("should test FlexLayout", () => {
    const render1 = render(
      FlexLayout({
        items: ["<text>1</text>", "<text>2</text>"],
        gap: 60,
      })
    );
    expect(render1.container.innerHTML).toMatchInlineSnapshot(
      `"<g transform=\\"translate(0, 0)\\" __source=\\"[object Object]\\"><text>1</text></g><g transform=\\"translate(60, 0)\\" __source=\\"[object Object]\\"><text>2</text></g>"`
    );

    const render2 = render(
      FlexLayout({
        items: ["<text>1</text>", "<text>2</text>"],
        gap: 60,
        direction: "column",
      })
    );

    expect(render2.container.innerHTML).toMatchInlineSnapshot(
      `"<g transform=\\"translate(0, 0)\\" __source=\\"[object Object]\\"><text>1</text></g><g transform=\\"translate(0, 60)\\" __source=\\"[object Object]\\"><text>2</text></g>"`
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
