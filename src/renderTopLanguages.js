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

const createCompactLangNode = ({ lang, totalSize, x, y }) => {
  const percentage = ((lang.size / totalSize) * 100).toFixed(2);
  const color = lang.color || "#858585";

  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} ${percentage}%
      </text>
    </g>
  `;
};

const createLanguageTextNode = ({ langs, totalSize, x, y }) => {
  return langs.map((lang, index) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x,
        y: 12.5 * index + y,
        totalSize,
        index,
      });
    }
    return createCompactLangNode({
      lang,
      x: 150,
      y: 12.5 + 12.5 * index,
      totalSize,
      index,
    });
  });
};

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
    layout,
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

  const totalLanguageSize = langs.reduce((acc, curr) => {
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

  let finalLayout = "";

  // RENDER COMPACT LAYOUT
  if (layout === "compact") {
    width = width + 50;
    height = 30 + (langs.length / 2 + 1) * 40;

    // progressOffset holds the previous language's width and used to offset the next language
    // so that we can stack them one after another, like this: [--][----][---]
    let progressOffset = 0;
    const compactProgressBar = langs
      .map((lang) => {
        const percentage = (
          (lang.size / totalLanguageSize) *
          (width - 50)
        ).toFixed(2);

        const progress =
          percentage < 10 ? parseFloat(percentage) + 10 : percentage;

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
        progressOffset += parseFloat(percentage);
        return output;
      })
      .join("");

    finalLayout = `
      <mask id="rect-mask">
        <rect x="0" y="0" width="${
          width - 50
        }" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
      ${createLanguageTextNode({
        x: 0,
        y: 25,
        langs,
        totalSize: totalLanguageSize,
      }).join("")}
    `;
  } else {
    finalLayout = FlexLayout({
      items: langs.map((lang) => {
        return createProgressNode({
          width: width,
          name: lang.name,
          color: lang.color || "#858585",
          progress: ((lang.size / totalLanguageSize) * 100).toFixed(2),
        });
      }),
      gap: 40,
      direction: "column",
    }).join("");
  }

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
          : `<text data-testid="header" x="25" y="35" class="header">Most Used Languages</text>`
      }

      <svg data-testid="lang-items" x="25" y="${hide_title ? 25 : 55}">
        ${finalLayout}
      </svg>
    </svg>
  `;
};

module.exports = renderTopLanguages;
