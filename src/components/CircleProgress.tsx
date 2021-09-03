import SVGRender from "../helpers/SVGRender";

interface Props {
  containerHeight: number;
  text: string;
  progress: number;
}
export default function CircleProgress({
  containerHeight,
  text,
  progress,
}: Props): SVGRender.SVGElement {
  return (
    <g
      data-testid="rank-circle"
      transform={`translate(400, ${containerHeight / 2 - 50})`}
    >
      <circle
        class="primary-stroke"
        cx="-10"
        cy="8"
        r="40"
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
        r="40"
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
          font: "800 24px 'Segoe UI', Ubuntu, Sans-Serif",
          animation: "scaleInAnimation 0.3s ease-in-out forwards",
        }}
      >
        <text
          x={text.length === 1 ? "-4" : "0"}
          y="0"
          alignment-baseline="central"
          dominant-baseline="central"
          text-anchor="middle"
        >
          {text}
        </text>
      </g>
    </g>
  );
}

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
