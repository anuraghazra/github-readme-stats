// @ts-check

import axios from "axios";
import toEmoji from "emoji-name-map";
import wrap from "word-wrap";
import { SECONDARY_ERROR_MESSAGES, TRY_AGAIN_LATER } from "./error.js";
import { getCardColors } from "./color.js";

/**
 * Auto layout utility, allows us to layout things vertically or horizontally with
 * proper gaping.
 *
 * @param {object} props Function properties.
 * @param {string[]} props.items Array of items to layout.
 * @param {number} props.gap Gap between items.
 * @param {"column" | "row"=} props.direction Direction to layout items.
 * @param {number[]=} props.sizes Array of sizes for each item.
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
 * Creates a node to display the primary programming language of the repository/gist.
 *
 * @param {string} langName Language name.
 * @param {string} langColor Language color.
 * @returns {string} Language display SVG object.
 */
const createLanguageNode = (langName, langColor) => {
  return `
    <g data-testid="primary-lang">
      <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
      <text data-testid="lang-name" class="gray" x="15">${langName}</text>
    </g>
    `;
};

/**
 * Creates an icon with label to display repository/gist stats like forks, stars, etc.
 *
 * @param {string} icon The icon to display.
 * @param {number|string} label The label to display.
 * @param {string} testid The testid to assign to the label.
 * @param {number} iconSize The size of the icon.
 * @returns {string} Icon with label SVG object.
 */
const iconWithLabel = (icon, label, testid, iconSize) => {
  if (typeof label === "number" && label <= 0) {
    return "";
  }
  const iconSvg = `
      <svg
        class="icon"
        y="-12"
        viewBox="0 0 16 16"
        version="1.1"
        width="${iconSize}"
        height="${iconSize}"
      >
        ${icon}
      </svg>
    `;
  const text = `<text data-testid="${testid}" class="gray">${label}</text>`;
  return flexLayout({ items: [iconSvg, text], gap: 20 }).join("");
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
 * Returns boolean if value is either "true" or "false" else the value as it is.
 *
 * @param {string | boolean} value The value to parse.
 * @returns {boolean | undefined } The parsed value.
 */
const parseBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

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
  if (!str) {
    return [];
  }
  return str.split(",");
};

/**
 * Clamp the given number between the given range.
 *
 * @param {number} number The number to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} The clamped number.
 */
const clampValue = (number, min, max) => {
  // @ts-ignore
  if (Number.isNaN(parseInt(number, 10))) {
    return min;
  }
  return Math.max(min, Math.min(number, max));
};

/**
 * @typedef {import('axios').AxiosRequestConfig['data']} AxiosRequestConfigData Axios request data.
 * @typedef {import('axios').AxiosRequestConfig['headers']} AxiosRequestConfigHeaders Axios request headers.
 */

/**
 * Send GraphQL request to GitHub API.
 *
 * @param {AxiosRequestConfigData} data Request data.
 * @param {AxiosRequestConfigHeaders} headers Request headers.
 * @returns {Promise<any>} Request response.
 */
const request = (data, headers) => {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};

// Script parameters.
const ERROR_CARD_LENGTH = 576.5;

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

const UPSTREAM_API_ERRORS = [
  TRY_AGAIN_LATER,
  SECONDARY_ERROR_MESSAGES.MAX_RETRY,
];

/**
 * Renders error message on the card.
 *
 * @param {object} args Function arguments.
 * @param {string} args.message Main error message.
 * @param {string} [args.secondaryMessage=""] The secondary error message.
 * @param {object} [args.renderOptions={}] Render options.
 * @param {string=} args.renderOptions.title_color Card title color.
 * @param {string=} args.renderOptions.text_color Card text color.
 * @param {string=} args.renderOptions.bg_color Card background color.
 * @param {string=} args.renderOptions.border_color Card border color.
 * @param {Parameters<typeof getCardColors>[0]["theme"]=} args.renderOptions.theme Card theme.
 * @param {boolean=} args.renderOptions.show_repo_link Whether to show repo link or not.
 * @returns {string} The SVG markup.
 */
const renderError = ({
  message,
  secondaryMessage = "",
  renderOptions = {},
}) => {
  const {
    title_color,
    text_color,
    bg_color,
    border_color,
    theme = "default",
    show_repo_link = true,
  } = renderOptions;

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, bgColor, borderColor } = getCardColors({
    title_color,
    text_color,
    icon_color: "",
    bg_color,
    border_color,
    ring_color: "",
    theme,
  });

  return `
    <svg width="${ERROR_CARD_LENGTH}"  height="120" viewBox="0 0 ${ERROR_CARD_LENGTH} 120" fill="${bgColor}" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor} }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .gray { fill: #858585 }
    </style>
    <rect x="0.5" y="0.5" width="${
      ERROR_CARD_LENGTH - 1
    }" height="99%" rx="4.5" fill="${bgColor}" stroke="${borderColor}"/>
    <text x="25" y="45" class="text">Something went wrong!${
      UPSTREAM_API_ERRORS.includes(secondaryMessage) || !show_repo_link
        ? ""
        : " file an issue at https://tiny.one/readme-stats"
    }</text>
    <text data-testid="message" x="25" y="55" class="text small">
      <tspan x="25" dy="18">${encodeHTML(message)}</tspan>
      <tspan x="25" dy="18" class="gray">${secondaryMessage}</tspan>
    </text>
    </svg>
  `;
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

const noop = () => {};
// return console instance based on the environment
const logger =
  process.env.NODE_ENV === "test" ? { log: noop, error: noop } : console;

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

/**
 * Lowercase and trim string.
 *
 * @param {string} name String to lowercase and trim.
 * @returns {string} Lowercased and trimmed string.
 */
const lowercaseTrim = (name) => name.toLowerCase().trim();

/**
 * Split array of languages in two columns.
 *
 * @template T Language object.
 * @param {Array<T>} arr Array of languages.
 * @param {number} perChunk Number of languages per column.
 * @returns {Array<T>} Array of languages split in two columns.
 */
const chunkArray = (arr, perChunk) => {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      // @ts-ignore
      resultArray[chunkIndex] = []; // start a new chunk
    }

    // @ts-ignore
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
  if (!str) {
    throw new Error("[parseEmoji]: str argument not provided");
  }
  return str.replace(/:\w+:/gm, (emoji) => {
    return toEmoji.get(emoji) || "";
  });
};

/**
 * Get diff in minutes between two dates.
 *
 * @param {Date} d1 First date.
 * @param {Date} d2 Second date.
 * @returns {number} Number of minutes between the two dates.
 */
const dateDiff = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diff = date1.getTime() - date2.getTime();
  return Math.round(diff / (1000 * 60));
};

/**
 * Convert bytes to a human-readable string representation.
 *
 * @param {number} bytes The number of bytes to convert.
 * @returns {string} The human-readable representation of bytes.
 * @throws {Error} If bytes is negative or too large.
 */
const formatBytes = (bytes) => {
  if (bytes < 0) {
    throw new Error("Bytes must be a non-negative number");
  }

  if (bytes === 0) {
    return "0 B";
  }

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  const base = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(base));

  if (i >= sizes.length) {
    throw new Error("Bytes is too large to convert to a human-readable string");
  }

  return `${(bytes / Math.pow(base, i)).toFixed(1)} ${sizes[i]}`;
};

export {
  ERROR_CARD_LENGTH,
  renderError,
  createLanguageNode,
  iconWithLabel,
  encodeHTML,
  kFormatter,
  parseBoolean,
  parseArray,
  clampValue,
  request,
  flexLayout,
  wrapTextMultiline,
  logger,
  measureText,
  lowercaseTrim,
  chunkArray,
  parseEmojis,
  dateDiff,
  formatBytes,
};
