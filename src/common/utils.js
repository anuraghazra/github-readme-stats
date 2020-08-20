const axios = require("axios");
const wrap = require("word-wrap");
const md5 = require("md5");
const hslRgb = require('hsl-rgb');
const themes = require("../../themes");

const renderError = (message, secondaryMessage = "") => {
  return `
    <svg width="495" height="120" viewBox="0 0 495 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }
    .gray { fill: #858585 }
    </style>
    <rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
    <text x="25" y="45" class="text">Something went wrong! file an issue at https://git.io/JJmN9</text>
    <text data-testid="message" x="25" y="55" class="text small">
      <tspan x="25" dy="18">${encodeHTML(message)}</tspan>
      <tspan x="25" dy="18" class="gray">${secondaryMessage}</tspan>
    </text>
    </svg>
  `;
};

// https://stackoverflow.com/a/48073476/10629172
function encodeHTML(str) {
  return str
    .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
      return "&#" + i.charCodeAt(0) + ";";
    })
    .replace(/\u0008/gim, "");
}

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

function isValidGradient(colors) {
  return isValidHexColor(colors[1]) && isValidHexColor(colors[2]);
}

function fallbackColor(color, fallbackColor) {
  let colors = color.split(",");
  let gradient = null;

  if (colors.length > 1 && isValidGradient(colors)) {
    gradient = colors;
  }

  return (
    (gradient ? gradient : isValidHexColor(color) && `#${color}`) ||
    fallbackColor
  );
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
    return `<g transform="${transform}">${item}</g>`;
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

function wrapTextMultiline(text, width = 60, maxLines = 3) {
  const wrapped = wrap(encodeHTML(text), { width })
    .split("\n") // Split wrapped lines to get an array of lines
    .map((line) => line.trim()); // Remove leading and trailing whitespace of each line

  const lines = wrapped.slice(0, maxLines); // Only consider maxLines lines

  // Add "..." to the last line if the text exceeds maxLines
  if (wrapped.length > maxLines) {
    lines[maxLines - 1] += "...";
  }

  // Remove empty lines if text fits in less than maxLines lines
  const multiLineText = lines.filter(Boolean);
  return multiLineText;
}

const noop = () => {};
// return console instance based on the environment
const logger =
  process.env.NODE_ENV !== "test" ? console : { log: noop, error: noop };

const CONSTANTS = {
  THIRTY_MINUTES: 1800,
  TWO_HOURS: 7200,
  FOUR_HOURS: 14400,
  ONE_DAY: 86400,
};

const SECONDARY_ERROR_MESSAGES = {
  MAX_RETRY:
    "Please add an env variable called PAT_1 with your github token in vercel",
  USER_NOT_FOUND: "Make sure the provided username is not an organization",
};

class CustomError extends Error {
  constructor(message, type) {
    super(message);
    this.type = type;
    this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || "adsad";
  }

  static MAX_RETRY = "MAX_RETRY";
  static USER_NOT_FOUND = "USER_NOT_FOUND";
}

function identiconColor(str){
  // ref. https://github.com/dgraham/identicon/blob/0127639a1abee39c5867aeea2e928922162deda9/src/lib.rs#L28-L40
  const md5Str = md5(str);
  const hue = parseInt(md5Str.substr(25, 3), 16) * 360 / 4095;
  const saturation = (65 - parseInt(md5Str.substr(28, 2), 16) * 20 / 255) / 100;
  const luminance = (75 - parseInt(md5Str.substr(30, 2), 16) * 20 / 255) / 100;

  const rgb = hslRgb(hue, saturation, luminance);

  const red = rgb[0].toString(16).padStart(2, "0");
  const green = rgb[1].toString(16).padStart(2, "0");
  const blue = rgb[2].toString(16).padStart(2, "0");

  return "#" + red + green + blue;
}

module.exports = {
  renderError,
  kFormatter,
  encodeHTML,
  isValidHexColor,
  request,
  parseArray,
  parseBoolean,
  fallbackColor,
  FlexLayout,
  getCardColors,
  clampValue,
  wrapTextMultiline,
  logger,
  CONSTANTS,
  CustomError,
  identiconColor,
};
