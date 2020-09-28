const Card = require("../common/Card");
const { getStyles } = require("../getStyles");
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
    lang = "en",
  } = options;

  const translations = {
    title: {
      cn: "Wakatime周统计",
      de: "Wakatime Week Stats",
      en: "Wakatime Week Stats",
      es: "Estadísticas de la semana de Wakatime",
      fr: "Statistiques de la semaine Wakatime",
      it: "Statistiche della settimana di Wakatime",
      ja: "ワカタイムウィーク統計",
      kr: "Wakatime 주간 통계",
      "pt-br": "Estatísticas da semana Wakatime",
    },
    noCodingActivity: {
      cn: "本周没有编码活动",
      de: "Keine Codierungsaktivität diese Woche",
      en: "No coding activity this week",
      es: "No hay actividad de codificación esta semana",
      fr: "Aucune activité de codage cette semaine",
      it: "Nessuna attività in questa settimana",
      ja: "今週のコーディング活動はありません",
      kr: "이번 주 코딩 활동 없음",
      "pt-br": "Nenhuma atividade de codificação esta semana",
    },
  }

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
    defaultTitle: translations.title[lang] || "Wakatime Week Stats",
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
      : [noCodingActivityNode({ color: textColor, text: translations.noCodingActivity[lang] || "No coding activity this week" })],
    gap: lheight,
    direction: "column",
  }).join("")}
    </svg> 
  `);
};

module.exports = renderWakatimeCard;
exports.createProgressNode = createProgressNode;
