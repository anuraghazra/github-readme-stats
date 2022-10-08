// @ts-check
import { Card } from "../common/Card.js";
import { createProgressNode } from "../common/createProgressNode.js";
import { I18n } from "../common/I18n.js";
import {
  clampValue,
  flexLayout,
  getCardColors,
  lowercaseTrim,
} from "../common/utils.js";
import { getStyles } from "../getStyles.js";
import { wakatimeCardLocales } from "../translations.js";

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

/**
 * Creates the no coding activity SVG node.
 *
 * @param {{color: string, text: string}} The function prop
 */
const noCodingActivityNode = ({ color, text }) => {
  return `
    <text x="25" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
};

/**
 * Create compact WakaTime layout.
 *
 * @param {Object[]} args The function arguments.
 * @param {import("../fetchers/types").WakaTimeLang[]} languages The languages array.
 * @param {number} totalSize The total size of the languages.
 * @param {number} x The x position of the language node.
 * @param {number} y The y position of the language node.
 */
const createCompactLangNode = ({ lang, totalSize, x, y }) => {
  const color = languageColors[lang.name] || "#858585";

  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} - ${lang.text}
      </text>
    </g>
  `;
};

/**
 * Create WakaTime language text node item.
 *
 * @param {Object[]} args The function arguments.
 * @param {import("../fetchers/types").WakaTimeLang} lang The language object.
 * @param {number} totalSize The total size of the languages.
 * @param {number} x The x position of the language node.
 * @param {number} y The y position of the language node.
 */
const createLanguageTextNode = ({ langs, totalSize, x, y }) => {
  return langs.map((lang, index) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x: 25,
        y: 12.5 * index + y,
        totalSize,
      });
    }
    return createCompactLangNode({
      lang,
      x: 230,
      y: 12.5 + 12.5 * index,
      totalSize,
    });
  });
};

/**
 * Create WakaTime text item.
 *
 * @param {Object[]} args The function arguments.
 * @param {string} id The id of the text node item.
 * @param {string} label The label of the text node item.
 * @param {string} value The value of the text node item.
 * @param {number} index The index of the text node item.
 * @param {percent} percent Percentage of the text node item.
 * @param {boolean} hideProgress Whether to hide the progress bar.
 * @param {string} progressBarBackgroundColor The color of the progress bar background.
 */
const createTextNode = ({
  id,
  label,
  value,
  index,
  percent,
  hideProgress,
  progressBarColor,
  progressBarBackgroundColor,
}) => {
  const staggerDelay = (index + 3) * 150;

  const cardProgress = hideProgress
    ? null
    : createProgressNode({
        x: 110,
        y: 4,
        progress: percent,
        color: progressBarColor,
        width: 220,
        // @ts-ignore
        name: label,
        progressBarBackgroundColor,
      });

  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      <text class="stat bold" y="12.5" data-testid="${id}">${label}:</text>
      <text
        class="stat"
        x="${hideProgress ? 170 : 350}"
        y="12.5"
      >${value}</text>
      ${cardProgress}
    </g>
  `;
};

/**
 * Recalculating percentages so that, compact layout's progress bar does not break when
 * hiding languages.
 *
 * @param {import("../fetchers/types").WakaTimeLang[]} languages The languages array.
 * @return {import("../fetchers/types").WakaTimeLang[]} The recalculated languages array.
 */
const recalculatePercentages = (languages) => {
  const totalSum = languages.reduce(
    (totalSum, language) => totalSum + language.percent,
    0,
  );
  const weight = +(100 / totalSum).toFixed(2);
  languages.forEach((language) => {
    language.percent = +(language.percent * weight).toFixed(2);
  });
};

/**
 * Renders WakaTime card.
 *
 * @param {Partial<import('../fetchers/types').WakaTimeData>} stats WakaTime stats.
 * @param {Partial<import('./types').WakaTimeOptions>} options Card options.
 * @returns {string} WakaTime card SVG.
 */
const renderWakatimeCard = (stats = {}, options = { hide: [] }) => {
  let { languages } = stats;
  const {
    hide_title = false,
    hide_border = false,
    hide,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    hide_progress,
    custom_title,
    locale,
    layout,
    langs_count = languages ? languages.length : 0,
    border_radius,
    border_color,
  } = options;

  const shouldHideLangs = Array.isArray(hide) && hide.length > 0;
  if (shouldHideLangs && languages !== undefined) {
    const languagesToHide = new Set(hide.map((lang) => lowercaseTrim(lang)));
    languages = languages.filter(
      (lang) => !languagesToHide.has(lowercaseTrim(lang.name)),
    );
    recalculatePercentages(languages);
  }

  const i18n = new I18n({
    locale,
    translations: wakatimeCardLocales,
  });

  const lheight = parseInt(String(line_height), 10);

  const langsCount = clampValue(parseInt(String(langs_count)), 1, langs_count);

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

  const filteredLanguages = languages
    ? languages
        .filter((language) => language.hours || language.minutes)
        .slice(0, langsCount)
    : [];

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(45 + (filteredLanguages.length + 1) * lheight, 150);

  const cssStyles = getStyles({
    titleColor,
    textColor,
    ringColor: titleColor,
    iconColor,
  });

  let finalLayout = "";

  let width = 440;

  // RENDER COMPACT LAYOUT
  if (layout === "compact") {
    width = width + 50;
    height = 90 + Math.round(filteredLanguages.length / 2) * 25;

    // progressOffset holds the previous language's width and used to offset the next language
    // so that we can stack them one after another, like this: [--][----][---]
    let progressOffset = 0;
    const compactProgressBar = filteredLanguages
      .map((language) => {
        // const progress = (width * lang.percent) / 100;
        const progress = ((width - 25) * language.percent) / 100;

        const languageColor = languageColors[language.name] || "#858585";

        const output = `
          <rect
            mask="url(#rect-mask)"
            data-testid="lang-progress"
            x="${progressOffset}"
            y="0"
            width="${progress}"
            height="8"
            fill="${languageColor}"
          />
        `;
        progressOffset += progress;
        return output;
      })
      .join("");

    finalLayout = `
      <mask id="rect-mask">
      <rect x="25" y="0" width="${width - 50}" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
      ${createLanguageTextNode({
        x: 0,
        y: 25,
        langs: filteredLanguages,
        totalSize: 100,
      }).join("")}
    `;
  } else {
    finalLayout = flexLayout({
      items: filteredLanguages.length
        ? filteredLanguages.map((language) => {
            return createTextNode({
              id: language.name,
              label: language.name,
              value: language.text,
              percent: language.percent,
              // @ts-ignore
              progressBarColor: titleColor,
              // @ts-ignore
              progressBarBackgroundColor: textColor,
              hideProgress: hide_progress,
            });
          })
        : [
            noCodingActivityNode({
              // @ts-ignore
              color: textColor,
              text: i18n.t("wakatimecard.nocodingactivity"),
            }),
          ],
      gap: lheight,
      direction: "column",
    }).join("");
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("wakatimecard.title"),
    width: 495,
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
  card.setCSS(
    `
    ${cssStyles}
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    `,
  );

  return card.render(`
    <svg x="0" y="0" width="100%">
      ${finalLayout}
    </svg>
  `);
};

export { renderWakatimeCard };
export default renderWakatimeCard;
