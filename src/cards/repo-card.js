// @ts-check
import { Card } from "../common/Card.js";
import { I18n } from "../common/I18n.js";
import { icons } from "../common/icons.js";
import {
  encodeHTML,
  flexLayout,
  getCardColors,
  kFormatter,
  measureText,
  parseEmojis,
  wrapTextMultiline,
} from "../common/utils.js";
import { repoCardLocales } from "../assets/translations.js";

/**
 * Retrieves the repository description and wraps it to fit the card width.
 *
 * @param {string} label The repository description.
 * @param {string} textColor The color of the text.
 * @returns {string} Wrapped repo description SVG object.
 */
const getBadgeSVG = (label, textColor) => `
  <g data-testid="badge" class="badge" transform="translate(320, -18)">
    <rect stroke="${textColor}" stroke-width="1" width="70" height="20" x="-12" y="-14" ry="10" rx="10"></rect>
    <text
      x="23" y="-5"
      alignment-baseline="central"
      dominant-baseline="central"
      text-anchor="middle"
      fill="${textColor}"
    >
      ${label}
    </text>
  </g>
`;

/**
 * Creates a node to display the primary programming language of the repository.
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

const ICON_SIZE = 16;

/**
 * Creates an icon with label to display repository stats like forks, stars, etc.
 *
 * @param {string} icon The icon to display.
 * @param {number|string} label The label to display.
 * @param {string} testid The testid to assign to the label.
 * @returns {string} Icon with label SVG object.
 */
const iconWithLabel = (icon, label, testid) => {
  if (label <= 0) return "";
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
 * Renders repository card details.
 *
 * @param {import('../fetchers/types').RepositoryData} repo Repository data.
 * @param {Partial<import("./types").RepoCardOptions>} options Card options.
 * @returns {string} Repository card SVG object.
 */
const renderRepoCard = (repo, options = {}) => {
  const {
    name,
    nameWithOwner,
    description,
    primaryLanguage,
    isArchived,
    isTemplate,
    starCount,
    forkCount,
  } = repo;
  const {
    hide_border = false,
    title_color,
    icon_color,
    text_color,
    bg_color,
    show_owner = false,
    theme = "default_repocard",
    border_radius,
    border_color,
    locale,
  } = options;

  const lineHeight = 10;
  const header = show_owner ? nameWithOwner : name;
  const langName = (primaryLanguage && primaryLanguage.name) || "Unspecified";
  const langColor = (primaryLanguage && primaryLanguage.color) || "#333";

  const desc = parseEmojis(description || "No description provided");
  const multiLineDescription = wrapTextMultiline(desc);
  const descriptionLines = multiLineDescription.length;
  const descriptionSvg = multiLineDescription
    .map((line) => `<tspan dy="1.2em" x="25">${encodeHTML(line)}</tspan>`)
    .join("");

  const height =
    (descriptionLines > 1 ? 120 : 110) + descriptionLines * lineHeight;

  const i18n = new I18n({
    locale,
    translations: repoCardLocales,
  });

  // returns theme based colors with proper overrides and defaults
  const colors = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });

  const svgLanguage = primaryLanguage
    ? createLanguageNode(langName, langColor)
    : "";

  const totalStars = kFormatter(starCount);
  const totalForks = kFormatter(forkCount);
  const svgStars = iconWithLabel(icons.star, totalStars, "stargazers");
  const svgForks = iconWithLabel(icons.fork, totalForks, "forkcount");

  const starAndForkCount = flexLayout({
    items: [svgLanguage, svgStars, svgForks],
    sizes: [
      measureText(langName, 12),
      ICON_SIZE + measureText(`${totalStars}`, 12),
      ICON_SIZE + measureText(`${totalForks}`, 12),
    ],
    gap: 25,
  }).join("");

  const card = new Card({
    defaultTitle: header.length > 35 ? `${header.slice(0, 35)}...` : header,
    titlePrefixIcon: icons.contribs,
    width: 400,
    height,
    border_radius,
    colors,
  });

  card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(false);
  card.setCSS(`
    .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.textColor} }
    .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.textColor} }
    .icon { fill: ${colors.iconColor} }
    .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; }
    .badge rect { opacity: 0.2 }
  `);

  return card.render(`
    ${
      isTemplate
        ? // @ts-ignore
          getBadgeSVG(i18n.t("repocard.template"), colors.textColor)
        : isArchived
        ? // @ts-ignore
          getBadgeSVG(i18n.t("repocard.archived"), colors.textColor)
        : ""
    }

    <text class="description" x="25" y="-5">
      ${descriptionSvg}
    </text>

    <g transform="translate(30, ${height - 75})">
      ${starAndForkCount}
    </g>
  `);
};

export { renderRepoCard };
export default renderRepoCard;
