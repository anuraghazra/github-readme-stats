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
  iconWithLabel,
  createLanguageNode,
  clampValue,
  buildSearchFilter,
} from "../common/utils.js";
import { repoCardLocales } from "../translations.js";
import { createTextNode } from "./stats-card.js";

const ICON_SIZE = 16;
const DESCRIPTION_LINE_WIDTH = 59;
const DESCRIPTION_MAX_LINES = 3;

/**
 * Retrieves the repository description and wraps it to fit the card width.
 *
 * @param {string} label The repository description.
 * @param {string} textColor The color of the text.
 * @returns {string} Wrapped repo description SVG object.
 */
const getBadgeSVG = (label, textColor, xOffset = 0) => `
  <g data-testid="badge" class="badge" transform="translate(${320 + xOffset}, -18)">
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
 * @typedef {import("../fetchers/types").RepositoryData} RepositoryData Repository data.
 * @typedef {import("./types").RepoCardOptions} RepoCardOptions Repo card options.
 */

/**
 * Renders repository card details.
 *
 * @param {RepositoryData} repo Repository data.
 * @param {Partial<RepoCardOptions>} options Card options.
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
    totalPRsAuthored,
    totalPRsCommented,
    totalPRsReviewed,
    totalIssuesAuthored,
    totalIssuesCommented,
  } = repo;
  const {
    hide_border = false,
    title_color,
    icon_color,
    text_color,
    bg_color,
    card_width_input,
    show_owner = false,
    show = [],
    show_icons = true,
    number_format = "short",
    text_bold,
    line_height = 22,
    username,
    theme = "default_repocard",
    border_radius,
    border_color,
    locale,
    description_lines_count,
  } = options;

  const card_width = card_width_input
    ? isNaN(card_width_input)
      ? 400
      : card_width_input
    : 400;

  const i18n = new I18n({
    locale,
    translations: repoCardLocales,
  });

  let repoFilter = buildSearchFilter([nameWithOwner], []);
  const STATS = {};
  if (show.includes("prs_authored")) {
    STATS.prs_authored = {
      icon: icons.prs,
      label: i18n.t("repocard.prs-authored"),
      value: totalPRsAuthored,
      id: "prs_authored",
      link: `https://github.com/search?q=${repoFilter}author%3A${username}&amp;type=pullrequests`,
    };
  }
  if (show.includes("prs_commented")) {
    STATS.prs_commented = {
      icon: icons.comments,
      label: i18n.t("repocard.prs-commented"),
      value: totalPRsCommented,
      id: "prs_commented",
      link: `https://github.com/search?q=${repoFilter}commenter%3A${username}+-author%3A${username}&amp;type=pullrequests`,
    };
  }
  if (show.includes("prs_reviewed")) {
    STATS.prs_reviewed = {
      icon: icons.reviews,
      label: i18n.t("repocard.prs-reviewed"),
      value: totalPRsReviewed,
      id: "prs_reviewed",
      link: `https://github.com/search?q=${repoFilter}reviewed-by%3A${username}+-author%3A${username}&amp;type=pullrequests`,
    };
  }
  if (show.includes("issues_authored")) {
    STATS.issues_authored = {
      icon: icons.issues,
      label: i18n.t("repocard.issues-authored"),
      value: totalIssuesAuthored,
      id: "issues_authored",
      link: `https://github.com/search?q=${repoFilter}author%3A${username}&amp;type=issues`,
    };
  }
  if (show.includes("issues_commented")) {
    STATS.issues_commented = {
      icon: icons.discussions_started,
      label: i18n.t("repocard.issues-commented"),
      value: totalIssuesCommented,
      id: "issues_commented",
      link: `https://github.com/search?q=${repoFilter}commenter%3A${username}+-author%3A${username}&amp;type=issues`,
    };
  }

  const statItems = Object.keys(STATS).map((key, index) =>
    // create the text nodes, and pass index so that we can calculate the line spacing
    createTextNode({
      icon: STATS[key].icon,
      label: STATS[key].label,
      value: STATS[key].value,
      id: STATS[key].id,
      unitSymbol: STATS[key].unitSymbol,
      index,
      showIcons: show_icons,
      shiftValuePos: 29.01,
      bold: text_bold,
      number_format,
      link: STATS[key].link,
      labelXOffset: 23,
    }),
  );

  const extraLHeight = parseInt(String(line_height), 10);
  const lineHeight = 10;
  const header = show_owner ? nameWithOwner : name;
  const langName = (primaryLanguage && primaryLanguage.name) || "Unspecified";
  const langColor = (primaryLanguage && primaryLanguage.color) || "#333";
  const descriptionMaxLines = description_lines_count
    ? clampValue(description_lines_count, 1, DESCRIPTION_MAX_LINES)
    : DESCRIPTION_MAX_LINES;

  const desc = parseEmojis(description || "No description provided");
  const multiLineDescription = wrapTextMultiline(
    desc,
    Math.round((card_width - 400) / 5.93 + DESCRIPTION_LINE_WIDTH),
    descriptionMaxLines,
  );
  const descriptionLinesCount = description_lines_count
    ? clampValue(description_lines_count, 1, DESCRIPTION_MAX_LINES)
    : multiLineDescription.length;

  const descriptionSvg = multiLineDescription
    .map((line) => `<tspan dy="1.2em" x="25">${encodeHTML(line)}</tspan>`)
    .join("");

  const extraHeight = Object.keys(STATS).length
    ? -7 + (statItems.length + 1) * extraLHeight
    : 0;
  const height =
    (descriptionLinesCount > 1 ? 120 : 110) +
    descriptionLinesCount * lineHeight +
    extraHeight;

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
  const svgStars = iconWithLabel(
    icons.star,
    totalStars,
    "stargazers",
    ICON_SIZE,
  );
  const svgForks = iconWithLabel(
    icons.fork,
    totalForks,
    "forkcount",
    ICON_SIZE,
  );

  const starAndForkCount = flexLayout({
    items: [svgLanguage, svgStars, svgForks],
    sizes: [
      measureText(langName, 12),
      ICON_SIZE + measureText(`${totalStars}`, 12),
      ICON_SIZE + measureText(`${totalForks}`, 12),
    ],
    gap: 25,
  }).join("");

  const extraItems = `
  <svg x="0" y="0"><g transform="translate(-3, ${height - 52 - extraHeight})">
      ${flexLayout({
        items: statItems,
        gap: extraLHeight,
        direction: "column",
      }).join("")}
    </g></svg>
    `;

  const card = new Card({
    defaultTitle: header.length > 35 ? `${header.slice(0, 35)}...` : header,
    titlePrefixIcon: icons.contribs,
    width: card_width,
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
    .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; }
    .badge rect { opacity: 0.2 }
    
    .stat { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.textColor} }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .not_bold { font-weight: 400 }
    .bold { font-weight: 700 }
    .icon {
      fill: ${colors.iconColor};
      display: block;
    }
  `);

  return card.render(`
    ${
      isTemplate
        ? // @ts-ignore
          getBadgeSVG(i18n.t("repocard.template"), colors.textColor, card_width - 400)
        : isArchived
          ? // @ts-ignore
            getBadgeSVG(i18n.t("repocard.archived"), colors.textColor, card_width - 400)
          : ""
    }

    <text class="description" x="25" y="-5">
      ${descriptionSvg}
    </text>

    <g transform="translate(30, ${height - 75 - extraHeight})">
      ${starAndForkCount}
    </g>
    ${extraItems}
  `);
};

export { renderRepoCard };
export default renderRepoCard;
