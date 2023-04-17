// @ts-check
import { Card } from "../common/Card.js";
import { I18n } from "../common/I18n.js";
import { icons } from "../common/icons.js";
import {
  clampValue,
  flexLayout,
  getCardColors,
  kFormatter,
  measureText,
} from "../common/utils.js";
import { getStyles } from "../getStyles.js";
import { statCardLocales } from "../translations.js";

const CARD_MIN_WIDTH = 287;
const CARD_DEFAULT_WIDTH = 287;
const RANK_CARD_MIN_WIDTH = 420;
const RANK_CARD_DEFAULT_WIDTH = 450;

/**
 * Create a stats card text item.
 *
 * @param {object[]} createTextNodeParams Object that contains the createTextNode parameters.
 * @param {string} createTextNodeParams.label The label to display.
 * @param {string} createTextNodeParams.value The value to display.
 * @param {string} createTextNodeParams.id The id of the stat.
 * @param {number} createTextNodeParams.index The index of the stat.
 * @param {boolean} createTextNodeParams.showIcons Whether to show icons.
 * @param {number} createTextNodeParams.shiftValuePos Number of pixels the value has to be shifted to the right.
 * @param {boolean} createTextNodeParams.bold Whether to bold the label.
 * @returns
 */
const createTextNode = ({
  icon,
  label,
  value,
  id,
  index,
  showIcons,
  shiftValuePos,
  bold,
  number_format,
}) => {
  const kValue =
    number_format.toLowerCase() === "long" ? value : kFormatter(value);
  const staggerDelay = (index + 3) * 150;

  const labelOffset = showIcons ? `x="25"` : "";
  const iconSvg = showIcons
    ? `
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icon}
    </svg>
  `
    : "";
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      ${iconSvg}
      <text class="stat ${
        bold ? " bold" : "not_bold"
      }" ${labelOffset} y="12.5">${label}:</text>
      <text
        class="stat ${bold ? " bold" : "not_bold"}"
        x="${(showIcons ? 140 : 120) + shiftValuePos}"
        y="12.5"
        data-testid="${id}"
      >${kValue}</text>
    </g>
  `;
};

/**
 * Renders the stats card.
 *
 * @param {Partial<import('../fetchers/types').StatsData>} stats The stats data.
 * @param {Partial<import("./types").StatCardOptions>} options The card options.
 * @returns {string} The stats card SVG object.
 */
const renderStatsCard = (stats = {}, options = { hide: [] }) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    contributedTo,
    rank,
  } = stats;
  const {
    hide = [],
    show_icons = false,
    hide_title = false,
    hide_border = false,
    card_width,
    hide_rank = false,
    include_all_commits = false,
    line_height = 25,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold = true,
    bg_color,
    theme = "default",
    custom_title,
    border_radius,
    border_color,
    number_format = "short",
    locale,
    disable_animations = false,
    rank_icon = "default",
  } = options;

  const lheight = parseInt(String(line_height), 10);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, iconColor, textColor, bgColor, borderColor, ringColor } =
    getCardColors({
      title_color,
      text_color,
      icon_color,
      bg_color,
      border_color,
      ring_color,
      theme,
    });

  const apostrophe = ["x", "s"].includes(name.slice(-1).toLocaleLowerCase())
    ? ""
    : "s";
  const i18n = new I18n({
    locale,
    translations: statCardLocales({ name, apostrophe }),
  });

  // Meta data for creating text nodes with createTextNode function
  const STATS = {
    stars: {
      icon: icons.star,
      label: i18n.t("statcard.totalstars"),
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: icons.commits,
      label: `${i18n.t("statcard.commits")}${
        include_all_commits ? "" : ` (${new Date().getFullYear()})`
      }`,
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: icons.prs,
      label: i18n.t("statcard.prs"),
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: icons.issues,
      label: i18n.t("statcard.issues"),
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: icons.contribs,
      label: i18n.t("statcard.contribs") + " (last year)",
      value: contributedTo,
      id: "contribs",
    },
  };

  const longLocales = [
    "cn",
    "es",
    "fr",
    "pt-br",
    "ru",
    "uk-ua",
    "id",
    "my",
    "pl",
    "de",
    "nl",
    "zh-tw",
  ];
  const isLongLocale = longLocales.includes(locale) === true;

  // filter out hidden stats defined by user & create the text nodes
  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({
        ...STATS[key],
        index,
        showIcons: show_icons,
        shiftValuePos: 79.01 + (isLongLocale ? 50 : 0),
        bold: text_bold,
        number_format,
      }),
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150,
  );

  // the better user's score the the rank will be closer to zero so
  // subtracting 100 to get the progress in 100%
  const progress = 100 - rank.score;
  const cssStyles = getStyles({
    titleColor,
    ringColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });

  const calculateTextWidth = () => {
    return measureText(custom_title ? custom_title : i18n.t("statcard.title"));
  };

  /*
    When hide_rank=true, the minimum card width is 270 px + the title length and padding.
    When hide_rank=false, the minimum card_width is 340 px + the icon width (if show_icons=true).
    Numbers are picked by looking at existing dimensions on production.
  */
  const iconWidth = show_icons ? 16 + /* padding */ 1 : 0;
  const minCardWidth =
    (hide_rank
      ? clampValue(
          50 /* padding */ + calculateTextWidth() * 2,
          CARD_MIN_WIDTH,
          Infinity,
        )
      : RANK_CARD_MIN_WIDTH) + iconWidth;
  const defaultCardWidth =
    (hide_rank ? CARD_DEFAULT_WIDTH : RANK_CARD_DEFAULT_WIDTH) + iconWidth;
  let width = isNaN(card_width) ? defaultCardWidth : card_width;
  if (width < minCardWidth) {
    width = minCardWidth;
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("statcard.title"),
    width,
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

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(cssStyles);

  if (disable_animations) card.disableAnimations();

  /**
   * Calculates the right rank circle translation values such that the rank circle
   * keeps respecting the following padding:
   *
   * width > RANK_CARD_DEFAULT_WIDTH: The default right padding of 70 px will be used.
   * width < RANK_CARD_DEFAULT_WIDTH: The left and right padding will be enlarged
   *   equally from a certain minimum at RANK_CARD_MIN_WIDTH.
   *
   * @returns {number} - Rank circle translation value.
   */
  const calculateRankXTranslation = () => {
    const minXTranslation = RANK_CARD_MIN_WIDTH + iconWidth - 70;
    if (width > RANK_CARD_DEFAULT_WIDTH) {
      const xMaxExpansion = minXTranslation + (450 - minCardWidth) / 2;
      return xMaxExpansion + width - RANK_CARD_DEFAULT_WIDTH;
    } else {
      return minXTranslation + (width - minCardWidth) / 2;
    }
  };

  const rankIcon = () => {
    if (rank_icon === "github") {
      return `
        <svg x="-38" y="-30" height="66" width="66" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
      `;
    }

    return `
      <text
        x="-5"
        y="3"
        alignment-baseline="central"
        dominant-baseline="central"
        text-anchor="middle"
      >
        ${rank.level}
      </text>
    `;
  };

  // Conditionally rendered elements
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle"
          transform="translate(${calculateRankXTranslation()}, ${
        height / 2 - 50
      })">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <g class="rank-text">
          ${rankIcon()}
        </g>
      </g>`;

  // Accessibility Labels
  const labels = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key) => {
      if (key === "commits") {
        return `${i18n.t("statcard.commits")} ${
          include_all_commits ? "" : `in ${new Date().getFullYear()}`
        } : ${totalStars}`;
      }
      return `${STATS[key].label}: ${STATS[key].value}`;
    })
    .join(", ");

  card.setAccessibilityLabel({
    title: `${card.title}, Rank: ${rank.level}`,
    desc: labels,
  });

  return card.render(`
    ${rankCircle}
    <svg x="0" y="0">
      ${flexLayout({
        items: statItems,
        gap: lheight,
        direction: "column",
      }).join("")}
    </svg>
  `);
};

export { renderStatsCard };
export default renderStatsCard;
