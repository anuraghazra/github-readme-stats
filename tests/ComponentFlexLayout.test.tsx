import FlexLayout from "../src/components/FlexLayout";
import SVGRender, { render } from "../src/helpers/SVGRender";

it("should test flexLayout", () => {
  const svgString = render(
    <FlexLayout items={[<text>1</text>, <text>2</text>]} gap={60}></FlexLayout>,
  );

  expect(svgString).toBe(
    `<g transform=\"translate(0, 0)\"><text>1</text></g><g transform=\"translate(60, 0)\"><text>2</text></g>`,
  );

  const columns = render(
    <FlexLayout
      items={[<text>1</text>, <text>2</text>]}
      gap={60}
      direction="column"
    ></FlexLayout>,
  );

  expect(columns).toBe(
    `<g transform=\"translate(0, 0)\"><text>1</text></g><g transform=\"translate(0, 60)\"><text>2</text></g>`,
  );
});
