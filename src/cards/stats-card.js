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
}) => {
  const kValue = kFormatter(value);
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
    name = "GitHub User",
    totalStars = "2018",
    totalCommits = "29019",
    totalIssues = "203",
    totalPRs = "127",
    contributedTo = "232",
    rank = "S",
    starsTitle = "Total Stars:",
    commitsTitle = "Total Commits:",
    issuesTitle = "Total Issues:",
    PRsTitle = "Total PRs:",
    contribsTitle = "Total Contributions:",
    title = "Your GitHub Stats",
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
    locale,
    disable_animations = false,
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
      label: starsTitle,
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: icons.commits,
      label: commitsTitle,
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: icons.prs,
      label: PRsTitle,
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: icons.issues,
      label: issuesTitle,
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: icons.contribs,
      label: contribsTitle,
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
    return measureText(title);
  };

  /*
    When hide_rank=true, the minimum card width is 270 px + the title length and padding.
    When hide_rank=false, the minimum card_width is 340 px + the icon width (if show_icons=true).
    Numbers are picked by looking at existing dimensions on production.
  */
  const iconWidth = show_icons ? 16 : 0;
  const minCardWidth = hide_rank
    ? clampValue(50 /* padding */ + calculateTextWidth() * 2, 270, Infinity)
    : 340 + iconWidth;
  const defaultCardWidth = hide_rank ? 270 : 495;
  let width = isNaN(card_width) ? defaultCardWidth : card_width;
  if (width < minCardWidth) {
    width = minCardWidth;
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: title,
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
   * keeps respecting the padding.
   *
   * width > 450: The default left padding of 50 px will be used.
   * width < 450: The left and right padding will shrink equally.
   *
   * @returns {number} - Rank circle translation value.
   */
  const calculateRankXTranslation = () => {
    if (width < 450) {
      return width - 95 + (45 * (450 - 340)) / 110;
    } else {
      return width - 95;
    }
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
          <text
            x="-5"
            y="3"
            alignment-baseline="central"
            dominant-baseline="central"
            text-anchor="middle"
          >
            ${rank.level}
          </text>
        </g>
      </g>`;

  // Accessibility Labels
  const labels = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key) => {
      if (key === "commits") {
        return commitsTitle;
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
