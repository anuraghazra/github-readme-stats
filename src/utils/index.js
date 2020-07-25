import React from "preact";
import axios from "axios";
import themes from "../../themes";

const renderError = (message) => {
  return (
    <svg
      width="495"
      height="100"
      viewBox="0 0 495 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .text {
          font: 600 16px "Segoe UI", Ubuntu, Sans-Serif;
          fill: #2f80ed;
        }
        .small {
          font: 600 12px "Segoe UI", Ubuntu, Sans-Serif;
          fill: #252525;
        }
      `}</style>
      <rect
        x="0.5"
        y="0.5"
        width="494"
        height="99%"
        rx="4.5"
        fill="#FFFEFE"
        stroke="#E4E2E2"
      />
      <text x="25" y="45" class="text">
        Something went wrong! file an issue at https://git.io/JJmN9
      </text>
      <text id="message" x="25" y="65" class="text small">
        {message}
      </text>
    </svg>
  );
};

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

function isValidHexColor(hexColor) {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/
  ).test(hexColor);
}

function parseBoolean(value) {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else {
    return value;
  }
}

function parseArray(str) {
  if (!str) return [];
  return str.split(",");
}

function clampValue(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function fallbackColor(color, fallbackColor) {
  return (isValidHexColor(color) && `#${color}`) || fallbackColor;
}

function request(data, headers) {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
}

/**
 *
 * @param {String[]} items
 * @param {Number} gap
 * @param {string} direction
 *
 * @description
 * Auto layout utility, allows us to layout things
 * vertically or horizontally with proper gaping
 */
function FlexLayout({ items, gap, direction }) {
  // filter() for filtering out empty strings
  return items.filter(Boolean).map((item, i) => {
    let transform = `translate(${gap * i}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${gap * i})`;
    }
    return <g transform={transform} dangerouslySetInnerHTML={{__html: item}} />;
  });
}

// returns theme based colors with proper overrides and defaults
function getCardColors({
  title_color,
  text_color,
  icon_color,
  bg_color,
  theme,
  fallbackTheme = "default",
}) {
  const defaultTheme = themes[fallbackTheme];
  const selectedTheme = themes[theme] || defaultTheme;

  // get the color provided by the user else the theme color
  // finally if both colors are invalid fallback to default theme
  const titleColor = fallbackColor(
    title_color || selectedTheme.title_color,
    "#" + defaultTheme.title_color
  );
  const iconColor = fallbackColor(
    icon_color || selectedTheme.icon_color,
    "#" + defaultTheme.icon_color
  );
  const textColor = fallbackColor(
    text_color || selectedTheme.text_color,
    "#" + defaultTheme.text_color
  );
  const bgColor = fallbackColor(
    bg_color || selectedTheme.bg_color,
    "#" + defaultTheme.bg_color
  );

  return { titleColor, iconColor, textColor, bgColor };
}

const fn = () => {};
// return console instance based on the environment
const logger =
  process.env.NODE_ENV !== "test" ? console : { log: fn, error: fn };

const CONSTANTS = {
  THIRTY_MINUTES: 1800,
  TWO_HOURS: 7200,
  ONE_DAY: 86400,
};

export {
  renderError,
  kFormatter,
  isValidHexColor,
  request,
  parseArray,
  parseBoolean,
  fallbackColor,
  FlexLayout,
  getCardColors,
  clampValue,
  logger,
  CONSTANTS,
};
