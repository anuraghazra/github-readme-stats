import SVGRender from "../helpers/SVGRender";
import { clampValue } from "../utils/render";

interface Props {
  width: number;
  name: string;
  color?: string | null;
  progress: number;
  hideName?: boolean;
  hideLabel?: boolean;
  testid?: string;
  backgroundColor?: string;
  barColor?: string;
  hideProgress?: boolean;
  hideText?: boolean;
  labelFormatter?: (x: number) => string;
  x?: number;
  y?: number;
}
const Progress: SVGRender.FunctionComponent<Props> = ({
  width,
  name,
  color,
  hideLabel = false,
  progress,
  testid,
  backgroundColor = "#ddd",
  labelFormatter,
  hideName = false,
  x = 0,
  y = 0,
}) => {
  const progressTextX = width + 10;
  const progressPercentage = clampValue(progress, 2, 100) + "%";

  return (
    <g
      data-testid={testid}
      transform={`translate(${x}, ${y})`}
      style={{
        font: "400 11px 'Segoe UI', Ubuntu, Sans-Serif",
      }}
      class="text-fill"
    >
      {hideName ? null : (
        <text x="2" y="15">
          {name}
        </text>
      )}

      {hideLabel ? null : (
        <text x={progressTextX} y="34">
          {labelFormatter?.(progress) ?? `${progress}%`}
        </text>
      )}
      <svg width={width} x="0" y={hideLabel ? 0 : 25}>
        <rect
          rx="5"
          ry="5"
          x="0"
          y="0"
          width={width}
          height="8"
          fill={backgroundColor}
        ></rect>
        <rect
          height="8"
          fill={color || "#858585"}
          rx="5"
          ry="5"
          x="0"
          y="0"
          data-testid="progress"
          width={progressPercentage}
        ></rect>
      </svg>
    </g>
  );
};

export default {
  component: Progress,
  getHeight(count: number) {
    return 45 + (count + 1) * 40;
  },
};
