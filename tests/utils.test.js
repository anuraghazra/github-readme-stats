const {
  kFormatter,
  encodeHTML,
  renderError,
  FlexLayout,
} = require("../src/utils");

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
    document.body.innerHTML = renderError("Something went wrong");
    expect(document.getElementById("message").textContent).toBe(
      "Something went wrong"
    );
  });

  it("should test FlexLayout", () => {
    const layout = FlexLayout({
      items: ["<text>1</text>", "<text>2</text>"],
      gap: 60,
    }).join("");

    expect(layout).toBe(
      `<g transform=\"translate(0, 0)\"><text>1</text></g><g transform=\"translate(60, 0)\"><text>2</text></g>`
    );

    const columns = FlexLayout({
      items: ["<text>1</text>", "<text>2</text>"],
      gap: 60,
      direction: "column",
    }).join("");

    expect(columns).toBe(
      `<g transform=\"translate(0, 0)\"><text>1</text></g><g transform=\"translate(0, 60)\"><text>2</text></g>`
    );
  });
});
