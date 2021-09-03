import SVGRender from "../helpers/SVGRender";

SVGRender;
interface Props {
  testid?: string;
  color: string;
  name: string;
  x: number;
  y: number;
  size?: "middle" | "small";
}
const LanguageLabel: SVGRender.FunctionComponent<Props> = ({
  testid,
  color,
  name,
  x,
  y,
  size = "middle",
}) => {
  const size2Data = {
    middle: {
      cx: 0,
      cy: -5,
      r: 6,
      x: 15,
      fontSize: 12,
    },
    small: {
      cx: 5,
      cy: 6,
      r: 5,
      x: 15,
      y: 10,
      fontSize: 11,
    },
  };
  const s = size2Data[size];
  return (
    <g data-testid={testid} transform={`translate(${x}, ${y})`}>
      <circle
        data-testid="lang-color"
        cx={s.cx}
        cy={s.cy}
        r={s.r}
        fill={color}
      />
      <text
        data-testid="lang-name"
        style={{
          font: `400 ${s.fontSize}px 'Segoe UI', Ubuntu, Sans-Serif`,
        }}
        class="text-fill"
        x={s.x}
        y={s.y}
      >
        {name}
      </text>
    </g>
  );
};

export default LanguageLabel;
