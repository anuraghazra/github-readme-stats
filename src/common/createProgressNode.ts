import { clampValue } from "../common/utils";

export function createProgressNode({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
}: {
  x: number;
  y: number;
  width: number;
  color: string;
  progress: string;
  progressBarBackgroundColor: string;
}) {
  const progressPercentage = clampValue(parseInt(progress), 2, 100);

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
}
