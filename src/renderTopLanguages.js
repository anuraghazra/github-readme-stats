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

const createLanguageTextNode = ({langs, totalSize,x,y}) => {
  let output = ``

  for (let i = 0; i < langs.length; i = i+2) {
    output+= `
      <g transform="translate(0, ${12.5 * i})">
        <circle cx="${5+x}" cy="${6+y}" r="5" fill="${langs[i].color || '#858585'}" />
        <text data-testid="lang-name" x="${15+x}" y="${10+y}" class='lang-name'>${langs[i].name} ${((langs[i].size / totalSize) * 100).toFixed(2)}%</text>
      </g>
      ${langs[i+1] ? `
        <g transform="translate(150, ${12.5 * i})">
          <circle cx="${5+x}" cy="${6+y}" r="5" fill="${langs[i+1].color || '#858585'}" />
          <text data-testid="lang-name" x="${15+x}" y="${10+y}" fill='#333' class='lang-name'>${langs[i+1].name} ${((langs[i+1].size / totalSize) * 100).toFixed(2)}%</text>
        </g>
      ` : ''}
    `
  }

  return output
}

const lowercaseTrim = (name) => name.toLowerCase().trim();

const renderTopLanguages = (topLangs, options = {}) => {
  const {
    hide_title,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide,
    theme,
    layout
  } = options;

  let langs = Object.values(topLangs);
  let langsToHide = {};

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
    });

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

  let width = isNaN(card_width) ? 300 : card_width;
  let height = 45 + (langs.length + 1) * 40;
  let offset = 0

  if (hide_title) {
    height -= 30;
  }

  if (layout === 'compact') {
    width = width + 50
    height = height - 120
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
      ${layout === 'compact' ? `
        ${langs.map((lang, idx) => {
          const percentage = ((lang.size / totalSize) * (width - 50)).toFixed(2)
          const output = `<rect data-testid="lang-progress" x='${offset}' y='0' width='${idx === 0 ? parseFloat(+percentage + 5).toFixed(2): percentage}' height='8' fill='${lang.color}' ${idx === 0 || idx === langs.length - 1 ? "rx='5'": ''} />`
          offset += +percentage
          return output
        }).join('')}
        ${createLanguageTextNode({langs, totalSize, x: 0, y: 25})}
      ` : FlexLayout({
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
