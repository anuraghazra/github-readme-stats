import SVGRender from "../helpers/SVGRender";

interface Props {
  items: SVGRender.SVGElement[];
  gap: number;
  direction?: "column" | "row";
}
const FlexLayout: SVGRender.FunctionComponent<Props> = ({
  gap,
  items,
  direction = "row",
}) => {
  // filter() for filtering out empty strings
  return items.filter(Boolean).map((item, i) => {
    let transform = `translate(${gap * i}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${gap * i})`;
    }
    return <g transform={transform}>{item}</g>;
  });
};

export default FlexLayout;
