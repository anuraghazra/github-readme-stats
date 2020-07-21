const { getCardColors, FlexLayout, clampValue } = require("../src/utils");

const createProgressNode = ({ width, color, name, progress }) => {
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;
  const progressPercentage = clampValue(progress, 2, 100);

  return `
    <text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
    <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
    <svg width="${progressWidth}">
      <rect rx="5" ry="5" x="0" y="25" width="${progressWidth}" height="8" fill="#ddd"></rect>
      <rect 
        height="8" 
        fill="${color}"
        rx="5" ry="5" x="0" y="25" 
        data-testid="lang-progress" 
        width="${progressPercentage}%"
      >
      </rect>
    </svg>
  `;
};

const renderTopLanguages = (topLangs, options = {}) => {
  const {
    hide_title,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide_langs_below,
    theme,
  } = options;

  let langs = Object.values(topLangs);

  const totalSize = langs.reduce((acc, curr) => {
    return acc + curr.size;
  }, 0);

  // hide langs
  langs = langs
    .sort((a, b) => b.size - a.size)
    .filter((lang) => {
      if (!hide_langs_below) return true;
      return (lang.size / totalSize) * 100 > hide_langs_below;
    });

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, bgColor } = getCardColors({
    title_color,
    text_color,
    bg_color,
    theme,
  });

  const width = isNaN(card_width) ? 300 : card_width;
  let height = 45 + (langs.length + 1) * 40;

  if (hide_title) {
    height -= 30;
  }
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor} }
        .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
      </style>
      <rect data-testid="card-bg" x="0.5" y="0.5" width="99.7%" height="99%" rx="4.5" fill="${bgColor}" stroke="#E4E2E2"/>

      
      ${
        hide_title
          ? ""
          : `<text data-testid="header" x="25" y="35" class="header">Top Languages</text>`
      }

      <svg data-testid="lang-items" x="25" y="${hide_title ? 25 : 55}">
      ${FlexLayout({
        items: langs.map((lang) => {
          return createProgressNode({
            width: width,
            name: lang.name,
            color: lang.color || "#858585",
            progress: ((lang.size / totalSize) * 100).toFixed(2),
          });
        }),
        gap: 40,
        direction: "column",
      }).join("")}
      </svg>
    </svg>
  `;
};

module.exports = renderTopLanguages;
