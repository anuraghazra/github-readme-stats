import { createProgressNode, flexLayout } from "../../helpers/CardRenderer";

export const calculateCompactLayoutHeight = (totalLangs) => {
  return 90 + Math.round(totalLangs / 2) * 25;
};

/**
 * @param {number} totalLangs
 * @returns {number}
 */
export const calculateNormalLayoutHeight = (totalLangs) => {
  return 45 + (totalLangs + 1) * 40;
};

/**
 *
 * @param {any[]} langs
 * @param {number} width
 * @param {number} totalLanguageSize
 * @returns {string}
 */
 export const renderCompactLayout = (langs, width, totalLanguageSize) => {
    const paddingRight = 50;
    const offsetWidth = width - paddingRight;
    // progressOffset holds the previous language's width and used to offset the next language
    // so that we can stack them one after another, like this: [--][----][---]
    let progressOffset = 0;
    const compactProgressBar = langs
      .map((lang) => {
        const percentage = parseFloat(
          ((lang.size / totalLanguageSize) * offsetWidth).toFixed(2),
        );
  
        const progress = percentage < 10 ? percentage + 10 : percentage;
  
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
        progressOffset += percentage;
        return output;
      })
      .join("");
  
    return `
      <mask id="rect-mask">
        <rect x="0" y="0" width="${offsetWidth}" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
      ${createLanguageTextNode({
        x: 0,
        y: 25,
        langs,
        totalSize: totalLanguageSize,
      }).join("")}
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

  export const renderNormalLayout = (langs, width, totalLanguageSize) => {
    return flexLayout({
      items: langs.map((lang) => {
        return createProgressTextNode({
          width: width,
          name: lang.name,
          color: lang.color || "#858585",
          progress: ((lang.size / totalLanguageSize) * 100).toFixed(2),
        });
      }),
      gap: 40,
      direction: "column",
    }).join("");
  };
  

  const createProgressTextNode = ({ width, color, name, progress }) => {
    const paddingRight = 95;
    const progressTextX = width - paddingRight + 10;
    const progressWidth = width - paddingRight;
  
    return `
      <text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
      <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
      ${createProgressNode({
        x: 0,
        y: 25,
        color,
        width: progressWidth,
        progress,
        progressBarBackgroundColor: "#ddd",
      })}
    `;
  };
  