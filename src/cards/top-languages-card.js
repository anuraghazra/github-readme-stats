// @ts-check
import { Card } from "../common/Card.js";
import { createProgressNode } from "../common/createProgressNode.js";
import { I18n } from "../common/I18n.js";
import {
  chunkArray,
  clampValue,
  flexLayout,
  getCardColors,
  lowercaseTrim,
  measureText,
} from "../common/utils.js";
import { langCardLocales } from "../translations.js";

const DEFAULT_CARD_WIDTH = 300;
const MIN_CARD_WIDTH = 230;
const DEFAULT_LANGS_COUNT = 5;
const DEFAULT_LANG_COLOR = "#858585";
const CARD_PADDING = 25;

/**
 * @typedef {import("../fetchers/types").Lang} Lang
 */

/**
 * Retrieves the programming language whose name is the longest.
 *
 * @param {Lang[]} arr Array of programming languages.
 * @returns {Object} Longest programming language object.
 */
const getLongestLang = (arr) =>
  arr.reduce(
    (savedLang, lang) =>
      lang.name.length > savedLang.name.length ? lang : savedLang,
    { name: "", size: null, color: "" },
  );

/**
 * Creates a node to display usage of a programming language in percentage
 * using text and a horizontal progress bar.
 *
 * @param {object[]} props Function properties.
 * @param {number} props.width The card width
 * @param {string} props.name Name of the programming language.
 * @param {string} props.color Color of the programming language.
 * @param {string} props.progress Usage of the programming language in percentage.
 * @returns {string} Programming language SVG node.
 */
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

/**
 * Creates a text only node to display usage of a programming language in percentage.
 *
 * @param {object[]} props Function properties.
 * @param {Lang} props.lang Programming language object.
 * @param {number} props.totalSize Total size of all languages.
 * @returns {string} Compact layout programming language SVG node.
 */
const createCompactLangNode = ({ lang, totalSize }) => {
  const percentage = ((lang.size / totalSize) * 100).toFixed(2);
  const color = lang.color || "#858585";

  return `
    <g>
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} ${percentage}%
      </text>
    </g>
  `;
};

/**
 * Creates compact layout of text only language nodes.
 *
 * @param {object[]} props Function properties.
 * @param {Lang[]} props.langs Array of programming languages.
 * @param {number} props.totalSize Total size of all languages.
 * @returns {string} Programming languages SVG node.
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
 * Renders layout to display user's most frequently used programming languages.
 *
 * @param {Lang[]} langs Array of programming languages.
 * @param {number} width Card width.
 * @param {number} totalLanguageSize Total size of all languages.
 * @returns {string} Normal layout card SVG object.
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
 * Renders compact layout to display user's most frequently used programming languages.
 *
 * @param {Lang[]} langs Array of programming languages.
 * @param {number} width Card width.
 * @param {number} totalLanguageSize Total size of all languages.
 * @returns {string} Compact layout card SVG object.
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
 * Calculates height for the compact layout.
 *
 * @param {number} totalLangs Total number of languages.
 * @returns {number} Card height.
 */
const calculateCompactLayoutHeight = (totalLangs) => {
  return 90 + Math.round(totalLangs / 2) * 25;
};

/**
 * Calculates height for the normal layout.
 *
 * @param {number} totalLangs Total number of languages.
 * @returns {number} Card height.
 */
const calculateNormalLayoutHeight = (totalLangs) => {
  return 45 + (totalLangs + 1) * 40;
};

/**
 *  Hides languages and trims the list to show only the top N languages.
 *
 * @param {Record<string, Lang>} topLangs Top languages.
 * @param {string[]} hide Languages to hide.
 * @param {string} langs_count Number of languages to show.
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

  // filter out languages to be hidden
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
 * Renders card to display user's most frequently used programming languages.
 *
 * @param {import('../fetchers/types').TopLangData} topLangs User's most frequently used programming languages.
 * @param {Partial<import("./types").TopLangOptions>} options Card options.
 * @returns {string} Language card SVG object.
 */
const renderTopLanguages = (topLangs, options = {}) => {
  const {
    hide_title = false,
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

  let width = isNaN(card_width)
    ? DEFAULT_CARD_WIDTH
    : card_width < MIN_CARD_WIDTH
    ? MIN_CARD_WIDTH
    : card_width;
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

export { renderTopLanguages, MIN_CARD_WIDTH };
