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
 * @param {object} props The function properties.
 * @param {string} props.color No coding activity text color.
 * @param {string} props.text No coding activity translated text.
 * @returns {string} No coding activity SVG node string.
 */
const noCodingActivityNode = ({ color, text }) => {
  return `
    <text x="25" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
};

/**
 * Create compact WakaTime layout.
 *
 * @param {Object} args The function arguments.
 * @param {import("../fetchers/types").WakaTimeLang} args.lang The languages array.
 * @param {number} args.x The x position of the language node.
 * @param {number} args.y The y position of the language node.
 * @returns {string} The compact layout language SVG node.
 */
const createCompactLangNode = ({ lang, x, y }) => {
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
 * @param {Object} args The function arguments.
 * @param {import("../fetchers/types").WakaTimeLang[]} args.langs The language objects.
 * @param {number} args.y The y position of the language node.
 * @returns {string[]} The language text node items.
 */
const createLanguageTextNode = ({ langs, y }) => {
  return langs.map((lang, index) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x: 25,
        y: 12.5 * index + y,
      });
    }
    return createCompactLangNode({
      lang,
      x: 230,
      y: 12.5 + 12.5 * index,
    });
  });
};

/**
 * Create WakaTime text item.
 *
 * @param {Object} args The function arguments.
 * @param {string} args.id The id of the text node item.
 * @param {string} args.label The label of the text node item.
 * @param {string} args.value The value of the text node item.
 * @param {number} args.index The index of the text node item.
 * @param {string} args.percent Percentage of the text node item.
 * @param {boolean} args.hideProgress Whether to hide the progress bar.
 * @param {string} args.progressBarColor The color of the progress bar.
 * @param {string} args.progressBarBackgroundColor The color of the progress bar background.
 * @returns {string} The text SVG node.
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
        delay: staggerDelay + 300,
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
 * @returns {void} The recalculated languages array.
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
  let { languages = [] } = stats;
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
    langs_count = languages.length,
    border_radius,
    border_color,
  } = options;

  const shouldHideLangs = Array.isArray(hide) && hide.length > 0;
  if (shouldHideLangs) {
    const languagesToHide = new Set(hide.map((lang) => lowercaseTrim(lang)));
    languages = languages.filter(
      (lang) => !languagesToHide.has(lowercaseTrim(lang.name)),
    );
  }

  // Since the percentages are sorted in descending order, we can just
  // slice from the beginning without sorting.
  languages = languages.slice(0, langs_count);
  recalculatePercentages(languages);

  const i18n = new I18n({
    locale,
    translations: wakatimeCardLocales,
  });

  const lheight = parseInt(String(line_height), 10);

  const langsCount = clampValue(langs_count, 1, langs_count);

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
    .filter((language) => language.hours || language.minutes)
    .slice(0, langsCount);

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
      ${
        filteredLanguages.length
          ? createLanguageTextNode({
              y: 25,
              langs: filteredLanguages,
            }).join("")
          : noCodingActivityNode({
              // @ts-ignore
              color: textColor,
              text: !stats.is_coding_activity_visible
                ? i18n.t("wakatimecard.notpublic")
                : stats.is_other_usage_visible
                ? i18n.t("wakatimecard.nocodingactivity")
                : i18n.t("wakatimecard.nocodedetails"),
            })
      }
    `;
  } else {
    finalLayout = flexLayout({
      items: filteredLanguages.length
        ? filteredLanguages.map((language, index) => {
            return createTextNode({
              id: language.name,
              label: language.name,
              value: language.text,
              index,
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
              text: !stats.is_coding_activity_visible
                ? i18n.t("wakatimecard.notpublic")
                : stats.is_other_usage_visible
                ? i18n.t("wakatimecard.nocodingactivity")
                : i18n.t("wakatimecard.nocodedetails"),
            }),
          ],
      gap: lheight,
      direction: "column",
    }).join("");
  }

  // Get title range text
  let titleText = i18n.t("wakatimecard.title");
  switch (stats.range) {
    case "last_7_days":
      titleText += ` (${i18n.t("wakatimecard.last7days")})`;
      break;
    case "last_year":
      titleText += ` (${i18n.t("wakatimecard.lastyear")})`;
      break;
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: titleText,
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
    @keyframes slideInAnimation {
      from {
        width: 0;
      }
      to {
        width: calc(100%-100px);
      }
    }
    @keyframes growWidthAnimation {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    #rect-mask rect{
      animation: slideInAnimation 1s ease-in-out forwards;
    }
    .lang-progress{
      animation: growWidthAnimation 0.6s ease-in-out forwards;
    }
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
