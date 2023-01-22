// @ts-check
import axios from "axios";
import toEmoji from "emoji-name-map";
import wrap from "word-wrap";
import { themes } from "../../themes/index.js";

// Script parameters.
const ERROR_CARD_LENGTH = 576.5;

/**
 * Renders error message on the card.
 *
 * @param {string} message Main error message.
 * @param {string} secondaryMessage The secondary error message.
 * @returns {string} The SVG markup.
 */
const renderError = (message, secondaryMessage = "") => {
  return `
    <svg width="${ERROR_CARD_LENGTH}" height="120" viewBox="0 0 ${ERROR_CARD_LENGTH} 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }
    .gray { fill: #858585 }
    </style>
    <rect x="0.5" y="0.5" width="${ERROR_CARD_LENGTH - 1
    }" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
    <text x="25" y="45" class="text">Something went wrong! file an issue at https://tiny.one/readme-stats</text>
    <text data-testid="message" x="25" y="55" class="text small">
      <tspan x="25" dy="18">${encodeHTML(message)}</tspan>
      <tspan x="25" dy="18" class="gray">${secondaryMessage}</tspan>
    </text>
    </svg>
  `;
};

/**
 * Encode string as HTML.
 *
 * @see https://stackoverflow.com/a/48073476/10629172
 *
 * @param {string} str String to encode.
 * @returns {string} Encoded string.
 */
const encodeHTML = (str) => {
  return str
    .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
      return "&#" + i.charCodeAt(0) + ";";
    })
    .replace(/\u0008/gim, "");
};

/**
 * Retrieves num with suffix k(thousands) precise to 1 decimal if greater than 999.
 *
 * @param {number} num The number to format.
 * @returns {string|number} The formatted number.
 */
const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + "k"
    : Math.sign(num) * Math.abs(num);
};

/**
 * Checks if a string is a valid hex color.
 *
 * @param {string} hexColor String to check.
 * @returns {boolean} True if the given string is a valid hex color.
 */
const isValidHexColor = (hexColor) => {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/,
  ).test(hexColor);
};

/**
 * Returns boolean if value is either "true" or "false" else the value as it is.
 *
 * @param {string | boolean} value The value to parse.
 * @returns {boolean | undefined } The parsed value.
 */
const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    } else if (value.toLowerCase() === "false") {
      return false;
    }
  }
  return undefined;
};

/**
 * Parse string to array of strings.
 *
 * @param {string} str The string to parse.
 * @returns {string[]} The array of strings.
 */
const parseArray = (str) => {
  if (!str) return [];
  return str.split(",");
};

/**
 * Clamp the given number between the given range.
 *
 * @param {number} number The number to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * returns {number} The clamped number.
 */
const clampValue = (number, min, max) => {
  // @ts-ignore
  if (Number.isNaN(parseInt(number))) return min;
  return Math.max(min, Math.min(number, max));
};

/**
 * Check if the given string is a valid gradient.
 *
 * @param {string[]} colors Array of colors.
 * @returns {boolean} True if the given string is a valid gradient.
 */
const isValidGradient = (colors) => {
  return isValidHexColor(colors[1]) && isValidHexColor(colors[2]);
};

/**
 * Retrieves a gradient if color has more than one valid hex codes else a single color.
 *
 * @param {string} color The color to parse.
 * @param {string} fallbackColor The fallback color.
 * @returns {string | string[]} The gradient or color.
 */
const fallbackColor = (color, fallbackColor) => {
  let gradient = null;

  let colors = color ? color.split(",") : [];
  if (colors.length > 1 && isValidGradient(colors)) {
    gradient = colors;
  }

  return (
    (gradient ? gradient : isValidHexColor(color) && `#${color}`) ||
    fallbackColor
  );
};

/**
 * Send GraphQL request to GitHub API.
 *
 * @param {import('axios').AxiosRequestConfig['data']} data Request data.
 * @param {import('axios').AxiosRequestConfig['headers']} headers Request headers.
 * @returns {Promise<any>} Request response.
 */
const request = (data, headers) => {
  // @ts-ignore
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};

/**
 * Auto layout utility, allows us to layout things vertically or horizontally with
 * proper gaping.
 *
 * @param {object} props Function properties.
 * @param {string[]} props.items Array of items to layout.
 * @param {number} props.gap Gap between items.
 * @param {number[]?=} props.sizes Array of sizes for each item.
 * @param {"column" | "row"?=} props.direction Direction to layout items.
 * @returns {string[]} Array of items with proper layout.
 */
const flexLayout = ({ items, gap, direction, sizes = [] }) => {
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
};

/**
 * Returns theme based colors with proper overrides and defaults.
 *
 * @param {Object[]} args Function arguments.
 * @param {string} args.title_color Card title color.
 * @param {string} args.text_color Card text color.
 * @param {string} args.icon_color Card icon color.
 * @param {string} args.bg_color Card background color.
 * @param {string} args.border_color Card border color.
 * @param {string} args.theme Card theme.
 * @param {string} args.fallbackTheme Fallback theme.
 *
 */
const getCardColors = ({
  title_color,
  text_color,
  icon_color,
  bg_color,
  border_color,
  ring_color,
  theme,
  fallbackTheme = "default",
}) => {
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

  // get the color provided by the user else the theme color
  // finally if both colors are invalid we use the titleColor
  const ringColor = fallbackColor(
    ring_color || selectedTheme.ring_color,
    titleColor,
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

  return { titleColor, iconColor, textColor, bgColor, borderColor, ringColor };
};

/**
 * Split text over multiple lines based on the card width.
 *
 * @param {string} text Text to split.
 * @param {number} width Line width in number of characters.
 * @param {number} maxLines Maximum number of lines.
 * @returns {string[]} Array of lines.
 */
const wrapTextMultiline = (text, width = 59, maxLines = 3) => {
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
};

const noop = () => { };
// return console instance based on the environment
const logger =
  process.env.NODE_ENV !== "test" ? console : { log: noop, error: noop };

// Cache settings.
const CARD_CACHE_SECONDS = 14400;
const ERROR_CACHE_SECONDS = 600;

const CONSTANTS = {
  ONE_MINUTE: 60,
  FIVE_MINUTES: 300,
  TEN_MINUTES: 600,
  FIFTEEN_MINUTES: 900,
  THIRTY_MINUTES: 1800,
  TWO_HOURS: 7200,
  FOUR_HOURS: 14400,
  ONE_DAY: 86400,
  CARD_CACHE_SECONDS: CARD_CACHE_SECONDS,
  ERROR_CACHE_SECONDS: ERROR_CACHE_SECONDS,
};

/**
 * Retrieve text length.
 *
 * @see https://stackoverflow.com/a/48172630/10629172
 * @param {string} str String to measure.
 * @param {number} fontSize Font size.
 * @returns {number} Text length.
 */
const measureText = (str, fontSize = 10) => {
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
};

/** @param {string} name */
const lowercaseTrim = (name) => name.toLowerCase().trim();

/**
 * Split array of languages in two columns.
 *
 * @template T Langauge object.
 * @param {Array<T>} arr Array of languages.
 * @param {number} perChunk Number of languages per column.
 * @returns {Array<T>} Array of languages split in two columns.
 */
const chunkArray = (arr, perChunk) => {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
};

/**
 * Parse emoji from string.
 *
 * @param {string} str String to parse emoji from.
 * @returns {string} String with emoji parsed.
 */
const parseEmojis = (str) => {
  if (!str) throw new Error("[parseEmoji]: str argument not provided");
  return str.replace(/:\w+:/gm, (emoji) => {
    return toEmoji.get(emoji) || "";
  });
};

export {
  ERROR_CARD_LENGTH,
  renderError,
  encodeHTML,
  kFormatter,
  isValidHexColor,
  parseBoolean,
  parseArray,
  clampValue,
  isValidGradient,
  fallbackColor,
  request,
  flexLayout,
  getCardColors,
  wrapTextMultiline,
  logger,
  CONSTANTS,
  measureText,
  lowercaseTrim,
  chunkArray,
  parseEmojis,
};
