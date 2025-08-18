// @ts-check

import { clampValue } from "./utils.js";

/**
 * Create a node to indicate progress in percentage along a horizontal line.
 *
 * @param {Object} createProgressNodeParams Object that contains the createProgressNode parameters.
 * @param {number} createProgressNodeParams.x X-axis position.
 * @param {number} createProgressNodeParams.y Y-axis position.
 * @param {number} createProgressNodeParams.width Width of progress bar.
 * @param {string} createProgressNodeParams.color Progress color.
 * @param {number} createProgressNodeParams.progress Progress value.
 * @param {string} createProgressNodeParams.progressBarBackgroundColor Progress bar bg color.
 * @param {string} createProgressNodeParams.progressBarBorderColor Progress bar border color.
 * @param {number} createProgressNodeParams.progressBarBorderThickness Progress bar border thickness.
 * @param {number} createProgressNodeParams.delay Delay before animation starts.
 * @returns {string} Progress node.
 */
const createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
  progressBarBorderColor,
  progressBarBorderThickness,
  delay,
}) => {
  const progressPercentage = clampValue(progress, 2, 100);

  return `
    <svg width="${width}" x="${x}" y="${y}">
      <rect rx="5" ry="5" x="0" y="0" width="${width}" height="8" fill="${progressBarBackgroundColor}"></rect>
      <svg data-testid="lang-progress" width="${progressPercentage}%">
        <rect
            height="8"
            fill="${color}"
            rx="5" ry="5" x="0" y="0"
            class="lang-progress"
            style="animation-delay: ${delay}ms;"
        />
      </svg>
      <script>console.log("${progressBarBorderColor}", ${progressBarBorderThickness});</script>
      <rect
        data-testid="lang-progress-border"
        x="${progressBarBorderThickness / 2}"
        y="${progressBarBorderThickness / 2}"
        width="${width - progressBarBorderThickness}"
        height="${8 - progressBarBorderThickness}"
        stroke="${progressBarBorderColor}"
        stroke-width="${progressBarBorderThickness}"
        fill="none"
        rx="${5 - progressBarBorderThickness}"
      />
    </svg>
  `;
};

export { createProgressNode };
export default createProgressNode;
