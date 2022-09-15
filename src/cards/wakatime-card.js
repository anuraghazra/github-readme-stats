// @ts-check
const Card = require("../common/Card");
const I18n = require("../common/I18n");
const { getStyles } = require("../getStyles");
const { wakatimeCardLocales } = require("../translations");
const languageColors = require("../common/languageColors.json");
const { createProgressNode } = require("../common/createProgressNode");
const {
  clampValue,
  getCardColors,
  flexLayout,
  lowercaseTrim,
} = require("../common/utils");

/**
 * @param {{color: string, text: string}} param0
 */
const noCodingActivityNode = ({ color, text }) => {
  return `
    <text x="25" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
};

/**
 *
 * @param {{
 *  lang: import("../fetchers/types").WakaTimeLang,
 *  totalSize: number,
 *  x: number,
 *  y: number
 * }} props
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
 * @param {{
 *  langs: import("../fetchers/types").WakaTimeLang[],
 *  totalSize: number,
 *  x: number,
 *  y: number
 * }} props
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
 *
 * @param {{
 *  id: string;
 *  label: string;
 *  value: string;
 *  index: number;
 *  percent: number;
 *  hideProgress: boolean;
 *  progressBarColor: string;
 *  progressBarBackgroundColor: string
 * }} props
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
 * @param {import("../fetchers/types").WakaTimeLang[]} languages
 */
const recalculatePercentages = (languages) => {
  // recalculating percentages so that,
  // compact layout's progress bar does not break when hiding languages
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
 * @param {Partial<import('../fetchers/types').WakaTimeData>} stats
 * @param {Partial<import('./types').WakaTimeOptions>} options
 * @returns {string}
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
    iconColor,
  });

  let finalLayout = "";

  let width = 440;

  // RENDER COMPACT LAYOUT
  if (layout === "compact") {
    width = width + 50;
    height = 90 + Math.round(filteredLanguages.length / 2) * 25;

    const totalPercentage = filteredLanguages.reduce((acc, language) => acc + language.percent, 0)
    // progressOffset holds the previous language's width and used to offset the next language
    // so that we can stack them one after another, like this: [--][----][---]
    let progressOffset = 0;
    const compactProgressBar = filteredLanguages
      .map((language) => {
        // const progress = (width * lang.percent) / 100;
        const progress = ((width - 25) * language.percent) / totalPercentage;

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

module.exports = renderWakatimeCard;
exports.createProgressNode = createProgressNode;
