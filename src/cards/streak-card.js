import Card from "../common/Card.js";
import I18n from "../common/I18n.js";
import { flexLayout, getCardColors, kFormatter } from "../common/utils.js";
import { getStyles } from "../getStyles.js";
import { streakCardLocales } from "../translations.js";

const CARD_MIN_WIDTH = 300;
const CARD_DEFAULT_WIDTH = 300;

const createTextNode = ({
  value,
  label,
  id,
  index,
  shiftValuePos,
  bold,
  number_format,
}) => {
  const kValue = number_format === "long" ? value : kFormatter(value);
  const staggerDelay = (index + 3) * 150;

  return `
  <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25,0)">
    <text class="stat ${bold ? "bold" : "not_bold"}" y="12.5">${label}:</text>
    <text class="stat ${bold ? "bold" : "not_bold"}" x="${
      shiftValuePos + 120
    }" y="12.5" data-testid="${id}">${kValue}</text>
  </g>
  `;
};

const renderStreaksCard = (streaksData, options = {}) => {
  const {
    user_name,
    longest_streak_weekly,
    current_streak_weekly,
    longest_streak_daily,
    current_streak_daily,
    total_contributions,
  } = streaksData;
  const {
    hide = [],
    hide_border = false,
    card_width,
    line_height = 25,
    title_color,
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
  } = options;

  const lheight = String(parseInt(line_height), 10);

  const { titleColor, textColor, bgColor, borderColor } = getCardColors({
    title_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });

  const apostrophe = ["x", "s"].includes(user_name.slice(-1)) ? "" : "s";

  const i18n = new I18n({
    locale,
    translations: streakCardLocales({ user_name, apostrophe }),
  });

  const STREAKS = {};

  STREAKS.totalContributions = {
    label: i18n.t("streakcard.totalcontributions"),
    value: total_contributions,
    id: "total contributions",
  };

  STREAKS.weeklyLongest = {
    label: i18n.t("streakcard.longest"),
    value: longest_streak_weekly + " weeks",
    id: "weekly longest streak",
  };

  STREAKS.weeklyCurrent = {
    label: i18n.t("streakcard.current"),
    value: current_streak_weekly + " weeks",
    id: "weekly current streak",
  };

  STREAKS.dailyLongest = {
    label: i18n.t("streakcard.longest"),
    value: longest_streak_daily + " days",
    id: "daily longest streak",
  };

  STREAKS.dailyCurrent = {
    label: i18n.t("streakcard.current"),
    value: current_streak_daily + " days",
    id: "daily longest streak",
  };
  const longLocales = [
    "cn",
    "es",
    "fr",
    "pt-br",
    "ru",
    "uk-ua",
    "id",
    "ml",
    "my",
    "pl",
    "de",
    "nl",
    "zh-tw",
    "uz",
  ];
  const isLongLocale = locale ? longLocales.includes(locale) : false;

  const streakItems = Object.keys(STREAKS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({
        label: STREAKS[key].label,
        value: STREAKS[key].value,
        id: STREAKS[key].id,
        index,
        shiftValuePos: 79.01 + (isLongLocale ? 50 : 0),
        bold: text_bold,
        number_format,
      }),
    );

  const cssStyles = getStyles({
    titleColor,
    textColor,
  });

  let height = 45 + (streakItems.length + 1) * lheight;

  const minCardWidth = CARD_MIN_WIDTH;
  const defaultCardWidth = CARD_DEFAULT_WIDTH;
  let width = card_width
    ? isNaN(card_width)
      ? defaultCardWidth
      : card_width
    : defaultCardWidth;
  if (width < minCardWidth) {
    width = minCardWidth;
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: streakItems.length
      ? i18n.t("streakcard.title")
      : i18n.t("streakcard.title"),
    width,
    height,
    border_radius,
    colors: {
      titleColor,
      textColor,
      bgColor,
      borderColor,
    },
  });

  card.setHideBorder(hide_border);
  card.setCSS(cssStyles);

  if (disable_animations) card.disableAnimations();

  card.setAccessibilityLabel({
    title: `${card.title}`,
  });

  return card.render(`
    <svg x="0" y="0">
      ${flexLayout({
        items: streakItems,
        gap: Number(lheight),
        direction: "column",
      }).join("")}
    </svg>
  `);
};

export { renderStreaksCard };
export default renderStreaksCard;
