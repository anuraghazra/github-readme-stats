import "@testing-library/jest-dom";
import { getCardColors, clampValue } from "../src/utils/render";

describe("Test card render utils", () => {
  it("should test clampValue", () => {
    expect(clampValue(2, 1, 10)).toBe(2);
    expect(clampValue(-1, 1, 10)).toBe(1);
    expect(clampValue(12, 1, 10)).toBe(10);
  });

  describe("getCardColors", () => {
    it("should return expected values", () => {
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

    it("should fallback to default colors if color is invalid", () => {
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

    it("should fallback to specified theme colors if is not defined", () => {
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
  });
});
