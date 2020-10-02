const Card = require("../common/Card");
const I18n = require("../common/I18n");
const { getStyles } = require("../getStyles");
const { wakatimeCardLocales } = require("../translations");
const { getCardColors, FlexLayout } = require("../common/utils");
const { createProgressNode } = require("../common/createProgressNode");

const noCodingActivityNode = ({ color, text }) => {
  return `
    <text x="25" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
};

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
        name: label,
        progressBarBackgroundColor,
      });

  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      <text class="stat bold" y="12.5">${label}:</text>
      <text 
        class="stat" 
        x="${hideProgress ? 170 : 350}" 
        y="12.5" 
        data-testid="${id}"
      >${value}</text>
      ${cardProgress}
    </g>
  `;
};

const renderWakatimeCard = (stats = {}, options = { hide: [] }) => {
  const { languages } = stats;
  const {
    hide_title = false,
    hide_border = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    hide_progress,
    custom_title,
    locale,
  } = options;

  const i18n = new I18n({
    locale,
    translations: wakatimeCardLocales,
  });

  const lheight = parseInt(line_height, 10);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
  });

  const statItems = languages
    ? languages
        .filter((language) => language.hours || language.minutes)
        .map((language) => {
          return createTextNode({
            id: language.name,
            label: language.name,
            value: language.text,
            percent: language.percent,
            progressBarColor: titleColor,
            progressBarBackgroundColor: textColor,
            hideProgress: hide_progress,
          });
        })
    : [];

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(45 + (statItems.length + 1) * lheight, 150);

  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
  });

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("title"),
    width: 495,
    height,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
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
      ${FlexLayout({
        items: statItems.length
          ? statItems
          : [
              noCodingActivityNode({
                color: textColor,
                text: i18n.t("nocodingactivity"),
              }),
            ],
        gap: lheight,
        direction: "column",
      }).join("")}
    </svg> 
  `);
};

module.exports = renderWakatimeCard;
exports.createProgressNode = createProgressNode;
