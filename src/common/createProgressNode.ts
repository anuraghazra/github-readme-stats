import { clampValue } from "./utils";

interface IcreateProgressNode {
  x: number;
  y: number;
  width: number;
  color: string;
  progress: number;
  progressBarBackgroundColor: string;
}

const createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
}: IcreateProgressNode) => {
  const progressPercentage = clampValue(progress, 2, 100);

  return `
    <svg width="${width}" x="${x}" y="${y}">
      <rect rx="5" ry="5" x="0" y="0" width="${width}" height="8" fill="${progressBarBackgroundColor}"></rect>
      <rect
          height="8"
          fill="${color}"
          rx="5" ry="5" x="0" y="0"
          data-testid="lang-progress"
          width="${progressPercentage}%"
      >
      </rect>
    </svg>
  `;
};

export { createProgressNode };
export default createProgressNode;
