import { flexLayout } from "../src/common/utils.js";

describe("flexLayout", () => {
  it("should work with row & col layouts", () => {
    const layout = flexLayout({
      items: ["<text>1</text>", "<text>2</text>"],
      gap: 60,
    });

    expect(layout).toStrictEqual([
      `<g transform="translate(0, 0)"><text>1</text></g>`,
      `<g transform="translate(60, 0)"><text>2</text></g>`,
    ]);

    const columns = flexLayout({
      items: ["<text>1</text>", "<text>2</text>"],
      gap: 60,
      direction: "column",
    });

    expect(columns).toStrictEqual([
      `<g transform="translate(0, 0)"><text>1</text></g>`,
      `<g transform="translate(0, 60)"><text>2</text></g>`,
    ]);
  });

  it("should work with sizes", () => {
    const layout = flexLayout({
      items: [
        "<text>1</text>",
        "<text>2</text>",
        "<text>3</text>",
        "<text>4</text>",
      ],
      gap: 20,
      sizes: [200, 100, 55, 25],
    });

    expect(layout).toStrictEqual([
      `<g transform="translate(0, 0)"><text>1</text></g>`,
      `<g transform="translate(220, 0)"><text>2</text></g>`,
      `<g transform="translate(340, 0)"><text>3</text></g>`,
      `<g transform="translate(415, 0)"><text>4</text></g>`,
    ]);
  });
});
