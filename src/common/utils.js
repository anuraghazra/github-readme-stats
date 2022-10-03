// @ts-check
import axios from "axios";
import toEmoji from "emoji-name-map";
import wrap from "word-wrap";
import { themes } from "../../themes/index.js";

/**
 * @param {string} message
 * @param {string} secondaryMessage
 * @returns {string}
 */
const renderError = (message, secondaryMessage = "") => {
  return `
    <svg width="495" height="120" viewBox="0 0 495 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }
    .gray { fill: #858585 }
    </style>
    <rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
    <text x="25" y="45" class="text">Something went wrong! file an issue at https://tiny.one/readme-stats</text>
    <text data-testid="message" x="25" y="55" class="text small">
      <tspan x="25" dy="18">${encodeHTML(message)}</tspan>
      <tspan x="25" dy="18" class="gray">${secondaryMessage}</tspan>
    </text>
    </svg>
  `;
};

/**
 * @see https://stackoverflow.com/a/48073476/10629172
 * @param {string} str
 * @returns {string}
 */
function encodeHTML(str) {
  return str
    .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
      return "&#" + i.charCodeAt(0) + ";";
    })
    .replace(/\u0008/gim, "");
}

/**
 * @param {number} num
 */
function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + "k"
    : Math.sign(num) * Math.abs(num);
}

/**
 * @param {string} hexColor
 * @returns {boolean}
 */
function isValidHexColor(hexColor) {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/,
  ).test(hexColor);
}

/**
 * @param {string} value
 * @returns {boolean | string}
 */
function parseBoolean(value) {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else {
    return value;
  }
}

/**
 * @param {string} str
 * @returns {string[]}

 */
function parseArray(str) {
  if (!str) return [];
  return str.split(",");
}

/**
 * @param {number} number
 * @param {number} min
 * @param {number} max
 * returns {number}
 */
function clampValue(number, min, max) {
  // @ts-ignore
  if (Number.isNaN(parseInt(number))) return min;
  return Math.max(min, Math.min(number, max));
}

/**
 * @param {string[]} colors
 * returns {boolean} 
 */
function isValidGradient(colors) {
  return isValidHexColor(colors[1]) && isValidHexColor(colors[2]);
}

/**
 * @param {string} color
 * @param {string} fallbackColor
 * @returns {string | string[]}
 */
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

/**
 * @param {import('axios').AxiosRequestConfig['data']} data
 * @param {import('axios').AxiosRequestConfig['headers']} headers
 */
function request(data, headers) {
  // @ts-ignore
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
}

/**
 * @param {object} props
 * @param {string[]} props.items
 * @param {number} props.gap
 * @param {number[]?=} props.sizes
 * @param {"column" | "row"?=} props.direction
 *
 * @returns {string[]}
 *
 * @description
 * Auto layout utility, allows us to layout things
 * vertically or horizontally with proper gaping
 */
function flexLayout({ items, gap, direction, sizes = [] }) {
  let lastSize = 0;
  // filter() for filtering out empty strings
  return items.filter(Boolean).map((item, i) => {
    const size = sizes[i] || 0;
    let transform = `translate(${lastSize}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${lastSize})`;
    }
    lastSize += size + gap;
    return `<g transform="${transform}">${item}</g>`;
  });
}

/**
 * @typedef {object} CardColors
 * @prop {string?=} title_color
 * @prop {string?=} text_color
 * @prop {string?=} icon_color
 * @prop {string?=} bg_color
 * @prop {string?=} border_color
 * @prop {keyof typeof import('../../themes')?=} fallbackTheme
 * @prop {keyof typeof import('../../themes')?=} theme
 */
/**
 * returns theme based colors with proper overrides and defaults
 * @param {CardColors} options
 */
function getCardColors({
  title_color,
  text_color,
  icon_color,
  bg_color,
  border_color,
  theme,
  fallbackTheme = "default",
}) {
  const defaultTheme = themes[fallbackTheme];
  const selectedTheme = themes[theme] || defaultTheme;
  const defaultBorderColor =
    selectedTheme.border_color || defaultTheme.border_color;

  // get the color provided by the user else the theme color
  // finally if both colors are invalid fallback to default theme
  const titleColor = fallbackColor(
    title_color || selectedTheme.title_color,
    "#" + defaultTheme.title_color,
  );
  const iconColor = fallbackColor(
    icon_color || selectedTheme.icon_color,
    "#" + defaultTheme.icon_color,
  );
  const textColor = fallbackColor(
    text_color || selectedTheme.text_color,
    "#" + defaultTheme.text_color,
  );
  const bgColor = fallbackColor(
    bg_color || selectedTheme.bg_color,
    "#" + defaultTheme.bg_color,
  );

  const borderColor = fallbackColor(
    border_color || defaultBorderColor,
    "#" + defaultBorderColor,
  );

  return { titleColor, iconColor, textColor, bgColor, borderColor };
}

/**
 * @param {string} text
 * @param {number} width
 * @param {number} maxLines
 * @returns {string[]}
 */
function wrapTextMultiline(text, width = 59, maxLines = 3) {
  const fullWidthComma = "，";
  const encoded = encodeHTML(text);
  const isChinese = encoded.includes(fullWidthComma);

  let wrapped = [];

  if (isChinese) {
    wrapped = encoded.split(fullWidthComma); // Chinese full punctuation
  } else {
    wrapped = wrap(encoded, {
      width,
    }).split("\n"); // Split wrapped lines to get an array of lines
  }

  const lines = wrapped.map((line) => line.trim()).slice(0, maxLines); // Only consider maxLines lines

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
  /**
   * @param {string} message
   * @param {string} type
   */
  constructor(message, type) {
    super(message);
    this.type = type;
    this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || type;
  }

  static MAX_RETRY = "MAX_RETRY";
  static USER_NOT_FOUND = "USER_NOT_FOUND";
}

class MissingParamError extends Error {
  /**
   * @param {string[]} missedParams
   * @param {string?=} secondaryMessage
   */
  constructor(missedParams, secondaryMessage) {
    const msg = `Missing params ${missedParams
      .map((p) => `"${p}"`)
      .join(", ")} make sure you pass the parameters in URL`;
    super(msg);
    this.missedParams = missedParams;
    this.secondaryMessage = secondaryMessage;
  }
}

/**
 * @see https://stackoverflow.com/a/48172630/10629172
 * @param {string} str
 * @param {number} fontSize
 * @returns
 */
function measureText(str, fontSize = 10) {
  // prettier-ignore
  const widths = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0.2796875, 0.2765625,
    0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625,
    0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125,
    0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875,
    1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625,
    0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625,
    0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625,
    0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375,
    0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625,
    0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5,
    0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875,
    0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875,
    0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875,
    0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625,
  ];

  const avg = 0.5279276315789471;
  return (
    str
      .split("")
      .map((c) =>
        c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg,
      )
      .reduce((cur, acc) => acc + cur) * fontSize
  );
}

/** @param {string} name */
const lowercaseTrim = (name) => name.toLowerCase().trim();

/**
 * @template T
 * @param {Array<T>} arr
 * @param {number} perChunk
 * @returns {Array<T>}
 */
function chunkArray(arr, perChunk) {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
function parseEmojis(str) {
  if (!str) throw new Error("[parseEmoji]: str argument not provided");
  return str.replace(/:\w+:/gm, (emoji) => {
    return toEmoji.get(emoji) || "";
  });
}

export {
  renderError,
  kFormatter,
  encodeHTML,
  isValidHexColor,
  request,
  parseArray,
  parseBoolean,
  fallbackColor,
  flexLayout,
  getCardColors,
  clampValue,
  wrapTextMultiline,
  measureText,
  logger,
  CONSTANTS,
  CustomError,
  MissingParamError,
  lowercaseTrim,
  chunkArray,
  parseEmojis,
};
