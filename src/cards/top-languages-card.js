// @ts-check
const Card = require("../common/Card");
const I18n = require("../common/I18n");
const { langCardLocales } = require("../translations");
const { createProgressNode } = require("../common/createProgressNode");
const {
  clampValue,
  getCardColors,
  flexLayout,
  lowercaseTrim,
  measureText,
  chunkArray,
} = require("../common/utils");

const DEFAULT_CARD_WIDTH = 300;
const DEFAULT_LANGS_COUNT = 5;
const DEFAULT_LANG_COLOR = "#858585";
const CARD_PADDING = 25;

/**
 * @typedef {import("../fetchers/types").Lang} Lang
 */

/**
 * @param {Lang[]} arr
 */
 const getLongestLang = (arr) =>
 arr.reduce(
   (savedLang, lang) =>
     lang.name.length > savedLang.name.length ? lang : savedLang,
   { name: "", size: null, color: "" },
 );

/**
 * @param {{
 *  width: number,
 *  color: string,
 *  name: string,
 *  progress: string,
 *  url: string
 * }} props
 */
const createProgressTextNode = ({ width, color, name, progress, url }) => {
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;

  return `
    <a href="${url}">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
      <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
    </a>
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

/**
 * @param {{ lang: Lang, totalSize: number }} props
 */
const createCompactLangNode = ({ lang, totalSize }) => {
  const percentage = ((lang.size / totalSize) * 100).toFixed(2);
  const color = lang.color || "#858585";

  return `
    <g>
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <a href="${lang.url}">
        <text data-testid="lang-name" x="15" y="10" class='lang-name'>
          ${lang.name} ${percentage}%
        </text>
      </a>
    </g>
  `;
};

/**
 * @param {{ langs: Lang[], totalSize: number }} props
 */
const createLanguageTextNode = ({ langs, totalSize }) => {
  const longestLang = getLongestLang(langs);
  const chunked = chunkArray(langs, langs.length / 2);
  const layouts = chunked.map((array) => {
    // @ts-ignore
    const items = array.map((lang, index) =>
      createCompactLangNode({
        lang,
        totalSize,
        // @ts-ignore
        index,
      }),
    );
    return flexLayout({
      items,
      gap: 25,
      direction: "column",
    }).join("");
  });

  const percent = ((longestLang.size / totalSize) * 100).toFixed(2);
  const minGap = 150;
  const maxGap = 20 + measureText(`${longestLang.name} ${percent}%`, 11);
  return flexLayout({
    items: layouts,
    gap: maxGap < minGap ? minGap : maxGap,
  }).join("");
};

/**
 * @param {Lang[]} langs
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
        url: lang.url
      });
    }),
    gap: 40,
    direction: "column",
  }).join("");
};

/**
 * @param {Lang[]} langs
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

    <g transform="translate(0, 25)">
      ${createLanguageTextNode({
        langs,
        totalSize: totalLanguageSize,
      })}
    </g>
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

/**
 *
 * @param {Record<string, Lang>} topLangs
 * @param {string[]} hide
 * @param {string} langs_count
 */
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

/**
 * @param {import('../fetchers/types').TopLangData} topLangs
 * @param {Partial<import("./types").TopLangOptions>} options
 * @returns {string}
 */
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
    String(langs_count),
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
