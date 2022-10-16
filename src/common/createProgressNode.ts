import { clampValue } from "./utils";


/** CreateProgressNode properties. */
interface CreateProgressNodeProps {
  /** Progress bar item x position. */
  x: number;
  /** Progress bar item y position.. */
  y: number;
  /** Progress bar item width. */
  width: number;
  /** Progress bar item color. */
  color: string;
  /** Progress value. */
  progress: number;
  /** Progress bar item background color. */
  progressBarBackgroundColor: string;
}

const createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
}: CreateProgressNodeProps) => {
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
