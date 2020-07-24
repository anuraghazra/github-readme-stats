import React from "preact";
import { getCardColors, FlexLayout, clampValue } from "../utils";
import { getTopLangsStyles } from "../styles";

const createProgressNode = ({ width, color, name, progress }) => {
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;

  return (
    <>
      <text data-testid="lang-name" x="2" y="15" class="lang-name">
        {name}
      </text>
      <text x={progressTextX} y="34" class="lang-name">
        {progress}%
      </text>
      <svg width={progressWidth}>
        <rect
          rx="5"
          ry="5"
          x="0"
          y="25"
          width={progressWidth}
          height="8"
          fill="#ddd"
        ></rect>
        <rect
          height="8"
          fill={color}
          rx="5"
          ry="5"
          x="0"
          y="25"
          data-testid="lang-progress"
          width={`${clampValue(progress, 2, 100)}%`}
        ></rect>
      </svg>
    </>
  );
};

const lowercaseTrim = (name) => name.toLowerCase().trim();

export default (topLangs, options = {}) => {
  const {
    hide_title,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide,
    theme,
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

  const width = isNaN(card_width) ? 300 : card_width;
  let height = 45 + (langs.length + 1) * 40;

  if (hide_title) {
    height -= 30;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{getTopLangsStyles({ titleColor, textColor })}</style>
      <rect
        data-testid="card-bg"
        x="0.5"
        y="0.5"
        width="99.7%"
        height="99%"
        rx="4.5"
        fill={bgColor}
        stroke="#E4E2E2"
      />
      {hide_title ? (
        ""
      ) : (
        <text data-testid="header" x="25" y="35" class="header">
          Top Languages
        </text>
      )}
      <svg data-testid="lang-items" x="25" y={hide_title ? 25 : 55}>
        {...FlexLayout({
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
  );
};
