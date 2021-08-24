import { createProgressNode } from "../../helpers/CardRenderer";
import { languageColors } from "../../utils/languages";

export const createLanguageTextNode = ({ langs, totalSize, x, y }) => {
  return langs.map((lang, index) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x: 25,
        y: 12.5 * index + y,
        totalSize,
        index,
      });
    }
    return createCompactLangNode({
      lang,
      x: 230,
      y: 12.5 + 12.5 * index,
      totalSize,
      index,
    });
  });
};

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

export const createTextNode = ({
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

export const noCodingActivityNode = ({ color, text }) => {
  return `
      <text x="25" y="11" class="stat bold" fill="${color}">${text}</text>
    `;
};
