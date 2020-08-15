const {
  getCardColors,
  FlexLayout,
} = require("../common/utils");
const { getStyles } = require("../getStyles");
const icons = require("../common/icons");
const Card = require("../common/Card");

const createTextNode = ({
  label,
  value,
  id,
  index,
  shiftValuePos,
}) => {
  const staggerDelay = (index + 3) * 150;

  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      <text class="stat bold" y="12.5">${label}:</text>
      <text 
        class="stat" 
        x="${shiftValuePos ? 170 : 150}" 
        y="12.5" 
        data-testid="${id}"
      >${value}</text>
    </g>
  `;
};

const renderWakatimeCard = (stats = {}, options = { hide: [] }) => {
  const {
    languages,
  } = stats;
  const {
    hide_title = false,
    hide_border = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
  } = options;

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
    .filter(language => language.hours || language.minutes)
    .map(language => {
      return createTextNode({
        icon: icons.contribs,
        label: language.name,
        value: language.text,
        id: language.name,
      })
    })

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    150
  );

  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
  });

  const card = new Card({
    title: 'Wakatime Stats',
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
  card.setCSS(cssStyles);

  return card.render(`
    <svg x="0" y="0" width="100%">
      ${FlexLayout({
    items: statItems,
    gap: lheight,
    direction: "column",
  }).join("")}
    </svg> 
  `);
};

module.exports = renderWakatimeCard;
