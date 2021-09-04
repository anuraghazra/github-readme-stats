import SVGRender from "../helpers/SVGRender";

interface Props {
  progress: number;
  radius?: number;
  transform?: any;
}
const CircleProgress: SVGRender.FunctionComponent<Props> = (
  { progress, radius = 40, transform = "translate(0, 0)" }: Props,
  children,
) => {
  return (
    <g data-testid="rank-circle" transform={transform}>
      <circle
        class="primary-stroke"
        cx="-10"
        cy="8"
        r={radius}
        style={{
          fill: "none",
          "stroke-width": 6,
          opacity: 0.2,
        }}
      />
      <circle
        class="primary-stroke"
        cx="-10"
        cy="8"
        r={radius}
        style={{
          "stroke-dasharray": 250,
          fill: "none",
          "stroke-width": 6,
          "stroke-linecap": "round",
          opacity: 0.8,
          "transform-origin": "-10px 8px",
          transform: "rotate(-90deg)",
          animation: "rankAnimation 1s forwards ease-in-out",
        }}
        css={getProgressAnimation(progress)}
      />
      <g
        class="text-fill"
        style={{
          animation: "scaleInAnimation 0.3s ease-in-out forwards",
        }}
        dominant-baseline="central"
        text-anchor="middle"
      >
        {children}
      </g>
    </g>
  );
};

const getProgressAnimation = (progress: number) => {
  const calculateCircleProgress = (value: number) => {
    let radius = 40;
    let c = Math.PI * (radius * 2);

    if (value < 0) value = 0;
    if (value > 100) value = 100;

    let percentage = ((100 - value) / 100) * c;
    return percentage;
  };

  return `
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: ${calculateCircleProgress(0)};
      }
      to {
        stroke-dashoffset: ${calculateCircleProgress(progress)};
      }
    }
  `;
};

export default CircleProgress;
