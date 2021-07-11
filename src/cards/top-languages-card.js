const Card = require("../common/Card");
const I18n = require("../common/I18n");
const { langCardLocales } = require("../translations");
const { createProgressNode } = require("../common/createProgressNode");
const { clampValue, getCardColors, flexLayout } = require("../common/utils");

const DEFAULT_CARD_WIDTH = 300;
const DEFAULT_LANGS_COUNT = 5;
const DEFAULT_LANG_COLOR = "#858585";
const CARD_PADDING = 25;

const lowercaseTrim = (name) => name.toLowerCase().trim();

const createProgressTextNode = ({ width, color, name, progress }) => {
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;

  return `
    <text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
    <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
    ${createProgressNode({
      x: 0,
      y: 25,
      color,
      width: progressWidth,
      progress,
      progressBarBackgroundColor: "#ddd",
    })}
  `;
};

const createCompactLangNode = ({ lang, totalSize, x, y }) => {
  const percentage = ((lang.size / totalSize) * 100).toFixed(2);
  const color = lang.color || "#858585";

  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} ${percentage}%
      </text>
    </g>
  `;
};

const createLanguageTextNode = ({ langs, totalSize, x, y }) => {
  return langs.map((lang, index) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x,
        y: 12.5 * index + y,
        totalSize,
        index,
      });
    }
    return createCompactLangNode({
      lang,
      x: 150,
      y: 12.5 + 12.5 * index,
      totalSize,
      index,
    });
  });
};

/**
 *
 * @param {any[]} langs
 * @param {number} width
 * @param {number} totalLanguageSize
 * @returns {string}
 */
const renderNormalLayout = (langs, width, totalLanguageSize) => {
  return flexLayout({
    items: langs.map((lang) => {
      return createProgressTextNode({
        width: width,
        name: lang.name,
        color: lang.color || DEFAULT_LANG_COLOR,
        progress: ((lang.size / totalLanguageSize) * 100).toFixed(2),
      });
    }),
    gap: 40,
    direction: "column",
  }).join("");
};

/**
 *
 * @param {any[]} langs
 * @param {number} width
 * @param {number} totalLanguageSize
 * @returns {string}
 */
const renderCompactLayout = (langs, width, totalLanguageSize) => {
  const paddingRight = 50;
  const offsetWidth = width - paddingRight;
  // progressOffset holds the previous language's width and used to offset the next language
  // so that we can stack them one after another, like this: [--][----][---]
  let progressOffset = 0;
  const compactProgressBar = langs
    .map((lang) => {
      const percentage = parseFloat(
        ((lang.size / totalLanguageSize) * offsetWidth).toFixed(2),
      );

      const progress = percentage < 10 ? percentage + 10 : percentage;

      const output = `
        <rect
          mask="url(#rect-mask)"
          data-testid="lang-progress"
          x="${progressOffset}"
          y="0"
          width="${progress}"
          height="8"
          fill="${lang.color || "#858585"}"
        />
      `;
      progressOffset += percentage;
      return output;
    })
    .join("");

  return `
    <mask id="rect-mask">
      <rect x="0" y="0" width="${offsetWidth}" height="8" fill="white" rx="5" />
    </mask>
    ${compactProgressBar}
    ${createLanguageTextNode({
      x: 0,
      y: 25,
      langs,
      totalSize: totalLanguageSize,
    }).join("")}
  `;
};

/**
 * @param {number} totalLangs
 * @returns {number}
 */
const calculateCompactLayoutHeight = (totalLangs) => {
  return 90 + Math.round(totalLangs / 2) * 25;
};

/**
 * @param {number} totalLangs
 * @returns {number}
 */
const calculateNormalLayoutHeight = (totalLangs) => {
  return 45 + (totalLangs + 1) * 40;
};

const useLanguages = (topLangs, hide, langs_count) => {
  let langs = Object.values(topLangs);
  let langsToHide = {};
  let langsCount = clampValue(parseInt(langs_count), 1, 10);

  // populate langsToHide map for quick lookup
  // while filtering out
  if (hide) {
    hide.forEach((langName) => {
      langsToHide[lowercaseTrim(langName)] = true;
    });
  }

  // filter out langauges to be hidden
  langs = langs
    .sort((a, b) => b.size - a.size)
    .filter((lang) => {
      return !langsToHide[lowercaseTrim(lang.name)];
    })
    .slice(0, langsCount);

  const totalLanguageSize = langs.reduce((acc, curr) => acc + curr.size, 0);

  return { langs, totalLanguageSize };
};

const renderTopLanguages = (topLangs, options = {}) => {
  const {
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide,
    theme,
    layout,
    custom_title,
    locale,
    langs_count = DEFAULT_LANGS_COUNT,
    border_radius,
    border_color,
  } = options;

  const i18n = new I18n({
    locale,
    translations: langCardLocales,
  });

  const { langs, totalLanguageSize } = useLanguages(
    topLangs,
    hide,
    langs_count,
  );

  let width = isNaN(card_width) ? DEFAULT_CARD_WIDTH : card_width;
  let height = calculateNormalLayoutHeight(langs.length);

  let finalLayout = "";
  if (layout === "compact") {
    width = width + 50; // padding
    height = calculateCompactLayoutHeight(langs.length);

    finalLayout = renderCompactLayout(langs, width, totalLanguageSize);
  } else {
    finalLayout = renderNormalLayout(langs, width, totalLanguageSize);
  }

  // returns theme based colors with proper overrides and defaults
  const colors = getCardColors({
    title_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("langcard.title"),
    width,
    height,
    border_radius,
    colors,
  });

  card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(
    `.lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.textColor} }`,
  );

  return card.render(`
    <svg data-testid="lang-items" x="${CARD_PADDING}">
      ${finalLayout}
    </svg>
  `);
};

module.exports = renderTopLanguages;
