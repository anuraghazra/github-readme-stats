// @ts-check

import {
  getCardColors,
  parseEmojis,
  wrapTextMultiline,
  encodeHTML,
  kFormatter,
  measureText,
  flexLayout,
} from "../common/utils.js";
import Card from "../common/Card.js";
import { icons } from "../common/icons.js";

/** Import language colors.
 *
 * @description Here we use the workaround found in
 * https://stackoverflow.com/questions/66726365/how-should-i-import-json-in-node
 * since vercel is using v16.14.0 which does not yet support json imports without the
 * --experimental-json-modules flag.
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const languageColors = require("../common/languageColors.json"); // now works

const ICON_SIZE = 16;
const CARD_DEFAULT_WIDTH = 400;
const HEADER_MAX_LENGTH = 35;

/**
 * Creates a node to display the primary programming language of the gist.
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
 * Creates an icon with label to display gist stats like forks, stars, etc.
 *
 * @param {string} icon The icon to display.
 * @param {number|string} label The label to display.
 * @param {string} testid The testid to assign to the label.
 * @returns {string} Icon with label SVG object.
 */
const iconWithLabel = (icon, label, testid) => {
  if (typeof label === "number" && label <= 0) return "";
  const iconSvg = `
      <svg
        class="icon"
        y="-12"
        viewBox="0 0 16 16"
        version="1.1"
        width="${ICON_SIZE}"
        height="${ICON_SIZE}"
      >
        ${icon}
      </svg>
    `;
  const text = `<text data-testid="${testid}" class="gray">${label}</text>`;
  return flexLayout({ items: [iconSvg, text], gap: 20 }).join("");
};

/**
 * @typedef {import('./types').GistCardOptions} GistCardOptions Gist card options.
 * @typedef {import('../fetchers/types').GistData} GistData Gist data.
 */

/**
 * Render gist card.
 *
 * @param {GistData} gistData Gist data.
 * @param {Partial<GistCardOptions>} options Gist card options.
 * @returns {string} Gist card.
 */
const renderGistCard = (gistData, options = {}) => {
  const { name, nameWithOwner, description, language, starsCount, forksCount } =
    gistData;
  const {
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    border_radius,
    border_color,
    show_owner = false,
    hide_border = false,
  } = options;

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor, borderColor } =
    getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

  const lineWidth = 59;
  const linesLimit = 10;
  const desc = parseEmojis(description || "No description provided");
  const multiLineDescription = wrapTextMultiline(desc, lineWidth, linesLimit);
  const descriptionLines = multiLineDescription.length;
  const descriptionSvg = multiLineDescription
    .map((line) => `<tspan dy="1.2em" x="25">${encodeHTML(line)}</tspan>`)
    .join("");

  const lineHeight = descriptionLines > 3 ? 12 : 10;
  const height =
    (descriptionLines > 1 ? 120 : 110) + descriptionLines * lineHeight;

  const totalStars = kFormatter(starsCount);
  const totalForks = kFormatter(forksCount);
  const svgStars = iconWithLabel(icons.star, totalStars, "starsCount");
  const svgForks = iconWithLabel(icons.fork, totalForks, "forksCount");

  const languageName = language || "Unspecified";
  const languageColor = languageColors[languageName] || "#858585";

  const svgLanguage = createLanguageNode(languageName, languageColor);

  const starAndForkCount = flexLayout({
    items: [svgLanguage, svgStars, svgForks],
    sizes: [
      measureText(languageName, 12),
      ICON_SIZE + measureText(`${totalStars}`, 12),
      ICON_SIZE + measureText(`${totalForks}`, 12),
    ],
    gap: 25,
  }).join("");

  const header = show_owner ? nameWithOwner : name;

  const card = new Card({
    defaultTitle:
      header.length > HEADER_MAX_LENGTH
        ? `${header.slice(0, HEADER_MAX_LENGTH)}...`
        : header,
    titlePrefixIcon: icons.gist,
    width: CARD_DEFAULT_WIDTH,
    height,
    border_radius,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
      borderColor,
    },
  });

  card.setCSS(`
    .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .icon { fill: ${iconColor} }
  `);
  card.setHideBorder(hide_border);

  return card.render(`
    <text class="description" x="25" y="-5">
        ${descriptionSvg}
    </text>

    <g transform="translate(30, ${height - 75})">
        ${starAndForkCount}
    </g>
  `);
};

export { renderGistCard, HEADER_MAX_LENGTH };
export default renderGistCard;
