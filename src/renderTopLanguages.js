const { getCardColors, FlexLayout, clampValue } = require("../src/utils");

const createProgressNode = ({ width, color, name, progress }) => {
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;
  const progressPercentage = clampValue(progress, 2, 100);

  return `
    <text x="2" y="15" class="lang-name">${name}</text>
    <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
    <svg width="${progressWidth}">
      <rect rx="5" ry="5" x="0" y="25" width="${progressWidth}" height="8" fill="#ddd"></rect>
      <rect rx="5" ry="5" x="0" y="25" width="${progressPercentage}%" height="8" fill="${color}"></rect>
    </svg>
  `;
};

const renderTopLanguages = (topLangs, options = {}) => {
  const { title_color, text_color, bg_color, theme, card_width } = options;

  const langs = Object.values(topLangs);

  const totalSize = langs.reduce((acc, curr) => {
    return acc + curr.size;
  }, 0);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, bgColor } = getCardColors({
    title_color,
    text_color,
    bg_color,
    theme,
  });

  const width = isNaN(card_width) ? 300 : card_width;
  const height = 45 + (langs.length + 1) * 40;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor} }
        .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
      </style>
      <rect data-testid="card-bg" x="0.5" y="0.5" width="99.7%" height="99%" rx="4.5" fill="${bgColor}" stroke="#E4E2E2"/>

      <text x="25" y="35" class="header">Top Languages</text>

      <svg x="25" y="55">
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
      })}
      </svg>
    </svg>
  `;
};

module.exports = renderTopLanguages;
