import { clampValue } from "./utils.js";

/**
 * Create a node to indicate progress in percentage along a horizontal line
 *
 * @param {Object} createProgressNodeParams Object that contains the createProgressNode parameters.
 * @param {number} createProgressNodeParams.x x-axis position
 * @param {number} createProgressNodeParams.y y-axis position
 * @param {number} createProgressNodeParams.width width of progress bar
 * @param {string} createProgressNodeParams.color progress color
 * @param {string} createProgressNodeParams.progress progress value
 * @param {string} createProgressNodeParams.progressBarBackgroundColor progress bar bg color
 * @returns {string} progress node
 */
const createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
}) => {
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
