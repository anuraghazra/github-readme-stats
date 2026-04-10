// @ts-check

import { SECONDARY_ERROR_MESSAGES, TRY_AGAIN_LATER } from "./error.js";
import { getCardColors } from "./color.js";
import { encodeHTML } from "./html.js";
import { clampValue } from "./ops.js";

/**
 * Auto layout utility, allows us to layout things vertically or horizontally with
 * proper gaping.
 *
 * @param {object} props Function properties.
 * @param {string[]} props.items Array of items to layout.
 * @param {number} props.gap Gap between items.
 * @param {"column" | "row"=} props.direction Direction to layout items.
 * @param {number[]=} props.sizes Array of sizes for each item.
 * @returns {string[]} Array of items with proper layout.
 */
const flexLayout = ({ items, gap, direction, sizes = [] }) => {
  let lastSize = 0;
  // filter() for filtering out empty strings
  return items.filter(Boolean).map((item, i) => {
    const size = sizes[i] || 0;
    let transform = `translate(${lastSize}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${lastSize})`;
    }
    lastSize += size + gap;
    return `<g transform="${transform}">${item}</g>`;
  });
};

/**
 * Creates a node to display the primary programming language of the repository/gist.
 *
 * @param {string} langName Language name.
 * @param {string} langColor Language color.
 * @returns {string} Language display SVG object.
 */
const createLanguageNode = (langName, langColor) => {
  return `
    <g data-testid="primary-lang">
      <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
      <text data-testid="lang-name" class="gray" x="15">${langName}</text>
    </g>
    `;
};

/**
 * Create a node to indicate progress in percentage along a horizontal line.
 *
 * @param {Object} params Object that contains the createProgressNode parameters.
 * @param {number} params.x X-axis position.
 * @param {number} params.y Y-axis position.
 * @param {number} params.width Width of progress bar.
 * @param {string} params.color Progress color.
 * @param {number} params.progress Progress value.
 * @param {string} params.progressBarBackgroundColor Progress bar bg color.
 * @param {number} params.delay Delay before animation starts.
 * @returns {string} Progress node.
 */
const createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
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
    </svg>
  `;
};

/**
 * Creates an icon with label to display repository/gist stats like forks, stars, etc.
 *
 * @param {string} icon The icon to display.
 * @param {number|string} label The label to display.
 * @param {string} testid The testid to assign to the label.
 * @param {number} iconSize The size of the icon.
 * @returns {string} Icon with label SVG object.
 */
const iconWithLabel = (icon, label, testid, iconSize) => {
  if (typeof label === "number" && label <= 0) {
    return "";
  }
  const iconSvg = `
      <svg
        class="icon"
        y="-12"
        viewBox="0 0 16 16"
        version="1.1"
        width="${iconSize}"
        height="${iconSize}"
      >
        ${icon}
      </svg>
    `;
  const text = `<text data-testid="${testid}" class="gray">${label}</text>`;
  return flexLayout({ items: [iconSvg, text], gap: 20 }).join("");
};

// Script parameters.
const ERROR_CARD_LENGTH = 576.5;

const UPSTREAM_API_ERRORS = [
  TRY_AGAIN_LATER,
  SECONDARY_ERROR_MESSAGES.MAX_RETRY,
];

/**
 * Renders error message on the card.
 *
 * @param {object} args Function arguments.
 * @param {string} args.message Main error message.
 * @param {string} [args.secondaryMessage=""] The secondary error message.
 * @param {object} [args.renderOptions={}] Render options.
 * @param {string=} args.renderOptions.title_color Card title color.
 * @param {string=} args.renderOptions.text_color Card text color.
 * @param {string=} args.renderOptions.bg_color Card background color.
 * @param {string=} args.renderOptions.border_color Card border color.
 * @param {Parameters<typeof getCardColors>[0]["theme"]=} args.renderOptions.theme Card theme.
 * @param {boolean=} args.renderOptions.show_repo_link Whether to show repo link or not.
 * @returns {string} The SVG markup.
 */
const renderError = ({
  message,
  secondaryMessage = "",
  renderOptions = {},
}) => {
  const {
    title_color,
    text_color,
    bg_color,
    border_color,
    theme = "default",
    show_repo_link = true,
  } = renderOptions;

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, bgColor, borderColor } = getCardColors({
    title_color,
    text_color,
    icon_color: "",
    bg_color,
    border_color,
    ring_color: "",
    theme,
  });

  return `
    <svg width="${ERROR_CARD_LENGTH}"  height="120" viewBox="0 0 ${ERROR_CARD_LENGTH} 120" fill="${bgColor}" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor} }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .gray { fill: #858585 }
    </style>
    <rect x="0.5" y="0.5" width="${
      ERROR_CARD_LENGTH - 1
    }" height="99%" rx="4.5" fill="${bgColor}" stroke="${borderColor}"/>
    <text x="25" y="45" class="text">Something went wrong!${
      UPSTREAM_API_ERRORS.includes(secondaryMessage) || !show_repo_link
        ? ""
        : " file an issue at https://tiny.one/readme-stats"
    }</text>
    <text data-testid="message" x="25" y="55" class="text small">
      <tspan x="25" dy="18">${encodeHTML(message)}</tspan>
      <tspan x="25" dy="18" class="gray">${secondaryMessage}</tspan>
    </text>
    </svg>
  `;
};

/**
 * Retrieve text length based on Segoe UI font.
 *
 * @see https://stackoverflow.com/a/48172630/10629172
 * @param {string} str String to measure.
 * @param {number} fontSize Font size.
 * @returns {number} Text length.
 */
const measureText = (str, fontSize = 10) => {
  // prettier-ignore
  const widths = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2733333110809326,0.28499999046325686,0.39166667461395266,0.5900000095367431,0.5383333206176758,0.8183333396911621,0.8,0.22999999523162842,0.30166666507720946,0.30166666507720946,0.41666665077209475,0.6833333492279052,0.21666667461395264,0.4,0.21666667461395264,0.3900000095367432,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.5383333206176758,0.21666667461395264,0.21666667461395264,0.6833333492279052,0.6833333492279052,0.6833333492279052,0.4483333110809326,0.9550000190734863,0.6449999809265137,0.5733333110809327,0.6183333396911621,0.7016666889190674,0.5066666603088379,0.48833332061767576,0.6866666793823242,0.7099999904632568,0.26666667461395266,0.35666666030883787,0.5800000190734863,0.4699999809265137,0.8983333587646485,0.7483333110809326,0.753333330154419,0.5599999904632569,0.753333330154419,0.5983333110809326,0.5316666603088379,0.5233333110809326,0.6866666793823242,0.621666669845581,0.9333333015441895,0.5900000095367431,0.553333330154419,0.5699999809265137,0.30166666507720946,0.37833333015441895,0.30166666507720946,0.6833333492279052,0.41500000953674315,0.26833333969116213,0.5083333492279053,0.5883333206176757,0.4616666793823242,0.5883333206176757,0.5233333110809326,0.3133333444595337,0.5883333206176757,0.5666666507720948,0.24166667461395264,0.24166667461395264,0.49666666984558105,0.24166667461395264,0.8616666793823242,0.5666666507720948,0.5866666793823242,0.5883333206176757,0.5883333206176757,0.3483333349227905,0.425,0.33833334445953367,0.5666666507720948,0.4783333301544189,0.7233333110809326,0.45833334922790525,0.4833333492279053,0.45166668891906736,0.30166666507720946,0.24000000953674316,0.30166666507720946,0.6833333492279052
  ];

  const avg = 0.5131403493881227;
  return (
    str
      .split("")
      .map((c) =>
        c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg,
      )
      .reduce((cur, acc) => acc + cur) * fontSize
  );
};

export {
  ERROR_CARD_LENGTH,
  renderError,
  createLanguageNode,
  createProgressNode,
  iconWithLabel,
  flexLayout,
  measureText,
};
