var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// api/index.js
var api_exports = {};
__export(api_exports, {
  default: () => api_default,
});
module.exports = __toCommonJS(api_exports);

// src/getStyles.js
var calculateCircleProgress = (value) => {
  const radius = 40;
  const c = Math.PI * (radius * 2);
  if (value < 0) value = 0;
  if (value > 100) value = 100;
  return ((100 - value) / 100) * c;
};
var getProgressAnimation = ({ progress }) => {
  return `
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: ${calculateCircleProgress(0)};
      }
      to {
        stroke-dashoffset: ${calculateCircleProgress(progress)};
      }
    }
  `;
};
var getAnimations = () => {
  return `
    /* Animations */
    @keyframes scaleInAnimation {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeInAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
};
var getStyles = ({
  // eslint-disable-next-line no-unused-vars
  titleColor,
  textColor,
  iconColor,
  ringColor,
  show_icons,
  progress,
}) => {
  return `
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor};
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    .rank-percentile-header {
      font-size: 14px;
    }
    .rank-percentile-text {
      font-size: 16px;
    }
    
    .not_bold { font-weight: 400 }
    .bold { font-weight: 700 }
    .icon {
      fill: ${iconColor};
      display: ${!!show_icons ? "block" : "none"};
    }

    .rank-circle-rim {
      stroke: ${ringColor};
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: ${ringColor};
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    ${process.env.NODE_ENV === "test" ? "" : getProgressAnimation({ progress })}
  `;
};

// src/common/utils.js
var import_axios = __toESM(require("axios"), 1);
var import_emoji_name_map = __toESM(require("emoji-name-map"), 1);
var import_word_wrap = __toESM(require("word-wrap"), 1);

// themes/index.js
var themes = {
  default: {
    title_color: "2f80ed",
    icon_color: "4c71f2",
    text_color: "434d58",
    bg_color: "fffefe",
    border_color: "e4e2e2",
  },
  default_repocard: {
    title_color: "2f80ed",
    icon_color: "586069",
    // icon color is different
    text_color: "434d58",
    bg_color: "fffefe",
  },
  transparent: {
    title_color: "006AFF",
    icon_color: "0579C3",
    text_color: "417E87",
    bg_color: "ffffff00",
  },
  shadow_red: {
    title_color: "9A0000",
    text_color: "444",
    icon_color: "4F0000",
    border_color: "4F0000",
    bg_color: "ffffff00",
  },
  shadow_green: {
    title_color: "007A00",
    text_color: "444",
    icon_color: "003D00",
    border_color: "003D00",
    bg_color: "ffffff00",
  },
  shadow_blue: {
    title_color: "00779A",
    text_color: "444",
    icon_color: "004450",
    border_color: "004490",
    bg_color: "ffffff00",
  },
  dark: {
    title_color: "fff",
    icon_color: "79ff97",
    text_color: "9f9f9f",
    bg_color: "151515",
  },
  radical: {
    title_color: "fe428e",
    icon_color: "f8d847",
    text_color: "a9fef7",
    bg_color: "141321",
  },
  merko: {
    title_color: "abd200",
    icon_color: "b7d364",
    text_color: "68b587",
    bg_color: "0a0f0b",
  },
  gruvbox: {
    title_color: "fabd2f",
    icon_color: "fe8019",
    text_color: "8ec07c",
    bg_color: "282828",
  },
  gruvbox_light: {
    title_color: "b57614",
    icon_color: "af3a03",
    text_color: "427b58",
    bg_color: "fbf1c7",
  },
  tokyonight: {
    title_color: "70a5fd",
    icon_color: "bf91f3",
    text_color: "38bdae",
    bg_color: "1a1b27",
  },
  onedark: {
    title_color: "e4bf7a",
    icon_color: "8eb573",
    text_color: "df6d74",
    bg_color: "282c34",
  },
  cobalt: {
    title_color: "e683d9",
    icon_color: "0480ef",
    text_color: "75eeb2",
    bg_color: "193549",
  },
  synthwave: {
    title_color: "e2e9ec",
    icon_color: "ef8539",
    text_color: "e5289e",
    bg_color: "2b213a",
  },
  highcontrast: {
    title_color: "e7f216",
    icon_color: "00ffff",
    text_color: "fff",
    bg_color: "000",
  },
  dracula: {
    title_color: "ff6e96",
    icon_color: "79dafa",
    text_color: "f8f8f2",
    bg_color: "282a36",
  },
  prussian: {
    title_color: "bddfff",
    icon_color: "38a0ff",
    text_color: "6e93b5",
    bg_color: "172f45",
  },
  monokai: {
    title_color: "eb1f6a",
    icon_color: "e28905",
    text_color: "f1f1eb",
    bg_color: "272822",
  },
  vue: {
    title_color: "41b883",
    icon_color: "41b883",
    text_color: "273849",
    bg_color: "fffefe",
  },
  "vue-dark": {
    title_color: "41b883",
    icon_color: "41b883",
    text_color: "fffefe",
    bg_color: "273849",
  },
  "shades-of-purple": {
    title_color: "fad000",
    icon_color: "b362ff",
    text_color: "a599e9",
    bg_color: "2d2b55",
  },
  nightowl: {
    title_color: "c792ea",
    icon_color: "ffeb95",
    text_color: "7fdbca",
    bg_color: "011627",
  },
  buefy: {
    title_color: "7957d5",
    icon_color: "ff3860",
    text_color: "363636",
    bg_color: "ffffff",
  },
  "blue-green": {
    title_color: "2f97c1",
    icon_color: "f5b700",
    text_color: "0cf574",
    bg_color: "040f0f",
  },
  algolia: {
    title_color: "00AEFF",
    icon_color: "2DDE98",
    text_color: "FFFFFF",
    bg_color: "050F2C",
  },
  "great-gatsby": {
    title_color: "ffa726",
    icon_color: "ffb74d",
    text_color: "ffd95b",
    bg_color: "000000",
  },
  darcula: {
    title_color: "BA5F17",
    icon_color: "84628F",
    text_color: "BEBEBE",
    bg_color: "242424",
  },
  bear: {
    title_color: "e03c8a",
    icon_color: "00AEFF",
    text_color: "bcb28d",
    bg_color: "1f2023",
  },
  "solarized-dark": {
    title_color: "268bd2",
    icon_color: "b58900",
    text_color: "859900",
    bg_color: "002b36",
  },
  "solarized-light": {
    title_color: "268bd2",
    icon_color: "b58900",
    text_color: "859900",
    bg_color: "fdf6e3",
  },
  "chartreuse-dark": {
    title_color: "7fff00",
    icon_color: "00AEFF",
    text_color: "fff",
    bg_color: "000",
  },
  nord: {
    title_color: "81a1c1",
    text_color: "d8dee9",
    icon_color: "88c0d0",
    bg_color: "2e3440",
  },
  gotham: {
    title_color: "2aa889",
    icon_color: "599cab",
    text_color: "99d1ce",
    bg_color: "0c1014",
  },
  "material-palenight": {
    title_color: "c792ea",
    icon_color: "89ddff",
    text_color: "a6accd",
    bg_color: "292d3e",
  },
  graywhite: {
    title_color: "24292e",
    icon_color: "24292e",
    text_color: "24292e",
    bg_color: "ffffff",
  },
  "vision-friendly-dark": {
    title_color: "ffb000",
    icon_color: "785ef0",
    text_color: "ffffff",
    bg_color: "000000",
  },
  "ayu-mirage": {
    title_color: "f4cd7c",
    icon_color: "73d0ff",
    text_color: "c7c8c2",
    bg_color: "1f2430",
  },
  "midnight-purple": {
    title_color: "9745f5",
    icon_color: "9f4bff",
    text_color: "ffffff",
    bg_color: "000000",
  },
  calm: {
    title_color: "e07a5f",
    icon_color: "edae49",
    text_color: "ebcfb2",
    bg_color: "373f51",
  },
  "flag-india": {
    title_color: "ff8f1c",
    icon_color: "250E62",
    text_color: "509E2F",
    bg_color: "ffffff",
  },
  omni: {
    title_color: "FF79C6",
    icon_color: "e7de79",
    text_color: "E1E1E6",
    bg_color: "191622",
  },
  react: {
    title_color: "61dafb",
    icon_color: "61dafb",
    text_color: "ffffff",
    bg_color: "20232a",
  },
  jolly: {
    title_color: "ff64da",
    icon_color: "a960ff",
    text_color: "ffffff",
    bg_color: "291B3E",
  },
  maroongold: {
    title_color: "F7EF8A",
    icon_color: "F7EF8A",
    text_color: "E0AA3E",
    bg_color: "260000",
  },
  yeblu: {
    title_color: "ffff00",
    icon_color: "ffff00",
    text_color: "ffffff",
    bg_color: "002046",
  },
  blueberry: {
    title_color: "82aaff",
    icon_color: "89ddff",
    text_color: "27e8a7",
    bg_color: "242938",
  },
  slateorange: {
    title_color: "faa627",
    icon_color: "faa627",
    text_color: "ffffff",
    bg_color: "36393f",
  },
  kacho_ga: {
    title_color: "bf4a3f",
    icon_color: "a64833",
    text_color: "d9c8a9",
    bg_color: "402b23",
  },
  outrun: {
    title_color: "ffcc00",
    icon_color: "ff1aff",
    text_color: "8080ff",
    bg_color: "141439",
  },
  ocean_dark: {
    title_color: "8957B2",
    icon_color: "FFFFFF",
    text_color: "92D534",
    bg_color: "151A28",
  },
  city_lights: {
    title_color: "5D8CB3",
    icon_color: "4798FF",
    text_color: "718CA1",
    bg_color: "1D252C",
  },
  github_dark: {
    title_color: "58A6FF",
    icon_color: "1F6FEB",
    text_color: "C3D1D9",
    bg_color: "0D1117",
  },
  github_dark_dimmed: {
    title_color: "539bf5",
    icon_color: "539bf5",
    text_color: "ADBAC7",
    bg_color: "24292F",
    border_color: "373E47",
  },
  discord_old_blurple: {
    title_color: "7289DA",
    icon_color: "7289DA",
    text_color: "FFFFFF",
    bg_color: "2C2F33",
  },
  aura_dark: {
    title_color: "ff7372",
    icon_color: "6cffd0",
    text_color: "dbdbdb",
    bg_color: "252334",
  },
  panda: {
    title_color: "19f9d899",
    icon_color: "19f9d899",
    text_color: "FF75B5",
    bg_color: "31353a",
  },
  noctis_minimus: {
    title_color: "d3b692",
    icon_color: "72b7c0",
    text_color: "c5cdd3",
    bg_color: "1b2932",
  },
  cobalt2: {
    title_color: "ffc600",
    icon_color: "ffffff",
    text_color: "0088ff",
    bg_color: "193549",
  },
  swift: {
    title_color: "000000",
    icon_color: "f05237",
    text_color: "000000",
    bg_color: "f7f7f7",
  },
  aura: {
    title_color: "a277ff",
    icon_color: "ffca85",
    text_color: "61ffca",
    bg_color: "15141b",
  },
  apprentice: {
    title_color: "ffffff",
    icon_color: "ffffaf",
    text_color: "bcbcbc",
    bg_color: "262626",
  },
  moltack: {
    title_color: "86092C",
    icon_color: "86092C",
    text_color: "574038",
    bg_color: "F5E1C0",
  },
  codeSTACKr: {
    title_color: "ff652f",
    icon_color: "FFE400",
    text_color: "ffffff",
    bg_color: "09131B",
    border_color: "0c1a25",
  },
  rose_pine: {
    title_color: "9ccfd8",
    icon_color: "ebbcba",
    text_color: "e0def4",
    bg_color: "191724",
  },
  date_night: {
    title_color: "DA7885",
    text_color: "E1B2A2",
    icon_color: "BB8470",
    border_color: "170F0C",
    bg_color: "170F0C",
  },
  one_dark_pro: {
    title_color: "61AFEF",
    text_color: "E5C06E",
    icon_color: "C678DD",
    border_color: "3B4048",
    bg_color: "23272E",
  },
  rose: {
    title_color: "8d192b",
    text_color: "862931",
    icon_color: "B71F36",
    border_color: "e9d8d4",
    bg_color: "e9d8d4",
  },
  holi: {
    title_color: "5FABEE",
    text_color: "D6E7FF",
    icon_color: "5FABEE",
    border_color: "85A4C0",
    bg_color: "030314",
  },
  neon: {
    title_color: "00EAD3",
    text_color: "FF449F",
    icon_color: "00EAD3",
    border_color: "ffffff",
    bg_color: "000000",
  },
};

// src/common/utils.js
var ERROR_CARD_LENGTH = 576.5;
var renderError = (message, secondaryMessage = "") => {
  return `
    <svg width="${ERROR_CARD_LENGTH}" height="120" viewBox="0 0 ${ERROR_CARD_LENGTH} 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }
    .gray { fill: #858585 }
    </style>
    <rect x="0.5" y="0.5" width="${
      ERROR_CARD_LENGTH - 1
    }" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
    <text x="25" y="45" class="text">Something went wrong! file an issue at https://tiny.one/readme-stats</text>
    <text data-testid="message" x="25" y="55" class="text small">
      <tspan x="25" dy="18">${encodeHTML(message)}</tspan>
      <tspan x="25" dy="18" class="gray">${secondaryMessage}</tspan>
    </text>
    </svg>
  `;
};
var encodeHTML = (str) => {
  return str
    .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
      return "&#" + i.charCodeAt(0) + ";";
    })
    .replace(/\u0008/gim, "");
};
var kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * parseFloat((Math.abs(num) / 1e3).toFixed(1)) + "k"
    : Math.sign(num) * Math.abs(num);
};
var isValidHexColor = (hexColor) => {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/,
  ).test(hexColor);
};
var parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    } else if (value.toLowerCase() === "false") {
      return false;
    }
  }
  return void 0;
};
var parseArray = (str) => {
  if (!str) return [];
  return str.split(",");
};
var clampValue = (number, min, max) => {
  if (Number.isNaN(parseInt(number))) return min;
  return Math.max(min, Math.min(number, max));
};
var isValidGradient = (colors) => {
  return isValidHexColor(colors[1]) && isValidHexColor(colors[2]);
};
var fallbackColor = (color, fallbackColor2) => {
  let gradient = null;
  let colors = color ? color.split(",") : [];
  if (colors.length > 1 && isValidGradient(colors)) {
    gradient = colors;
  }
  return (
    (gradient ? gradient : isValidHexColor(color) && `#${color}`) ||
    fallbackColor2
  );
};
var request = (data, headers) => {
  return (0, import_axios.default)({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};
var flexLayout = ({ items, gap, direction, sizes = [] }) => {
  let lastSize = 0;
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
var getCardColors = ({
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
  const titleColor = fallbackColor(
    title_color || selectedTheme.title_color,
    "#" + defaultTheme.title_color,
  );
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
var wrapTextMultiline = (text, width = 59, maxLines = 3) => {
  const fullWidthComma = "\uFF0C";
  const encoded = encodeHTML(text);
  const isChinese = encoded.includes(fullWidthComma);
  let wrapped = [];
  if (isChinese) {
    wrapped = encoded.split(fullWidthComma);
  } else {
    wrapped = (0, import_word_wrap.default)(encoded, {
      width,
    }).split("\n");
  }
  const lines = wrapped.map((line) => line.trim()).slice(0, maxLines);
  if (wrapped.length > maxLines) {
    lines[maxLines - 1] += "...";
  }
  const multiLineText = lines.filter(Boolean);
  return multiLineText;
};
var noop = () => {};
var logger =
  process.env.NODE_ENV !== "test" ? console : { log: noop, error: noop };
var CONSTANTS = {
  THIRTY_MINUTES: 1800,
  TWO_HOURS: 7200,
  FOUR_HOURS: 14400,
  ONE_DAY: 86400,
};
var SECONDARY_ERROR_MESSAGES = {
  MAX_RETRY:
    "Please add an env variable called PAT_1 with your github token in vercel",
  USER_NOT_FOUND: "Make sure the provided username is not an organization",
  GRAPHQL_ERROR: "Please try again later",
  WAKATIME_USER_NOT_FOUND: "Make sure you have a public WakaTime profile",
};
var CustomError = class extends Error {
  /**
   * @param {string} message Error message.
   * @param {string} type Error type.
   */
  constructor(message, type) {
    super(message);
    this.type = type;
    this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || type;
  }
  static MAX_RETRY = "MAX_RETRY";
  static USER_NOT_FOUND = "USER_NOT_FOUND";
  static GRAPHQL_ERROR = "GRAPHQL_ERROR";
  static WAKATIME_ERROR = "WAKATIME_ERROR";
};
var MissingParamError = class extends Error {
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
};
var measureText = (str, fontSize = 10) => {
  const widths = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875,
    0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125,
    0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875,
    0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625,
    0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625,
    0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875,
    0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875,
    0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875,
    0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5,
    0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625,
    0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5,
    0.3546875, 0.259375, 0.353125, 0.5890625,
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

// src/common/Card.js
var Card = class {
  /**
   * Creates a new card instance.
   *
   * @param {object} args Card arguments.
   * @param {number?=} args.width Card width.
   * @param {number?=} args.height Card height.
   * @param {number?=} args.border_radius Card border radius.
   * @param {string?=} args.customTitle Card custom title.
   * @param {string?=} args.defaultTitle Card default title.
   * @param {string?=} args.titlePrefixIcon Card title prefix icon.
   * @param {object?=} args.colors Card colors arguments.
   * @param {string} args.colors.titleColor Card title color.
   * @param {string} args.colors.textColor Card text color.
   * @param {string} args.colors.iconColor Card icon color.
   * @param {string|Array} args.colors.bgColor Card background color.
   * @param {string} args.colors.borderColor Card border color.
   * @returns {Card} Card instance.
   */
  constructor({
    width = 100,
    height = 100,
    border_radius = 4.5,
    colors = {},
    customTitle,
    defaultTitle = "",
    titlePrefixIcon,
  }) {
    this.width = width;
    this.height = height;
    this.hideBorder = false;
    this.hideTitle = false;
    this.border_radius = border_radius;
    this.colors = colors;
    this.title =
      customTitle !== void 0
        ? encodeHTML(customTitle)
        : encodeHTML(defaultTitle);
    this.css = "";
    this.paddingX = 25;
    this.paddingY = 35;
    this.titlePrefixIcon = titlePrefixIcon;
    this.animations = true;
    this.a11yTitle = "";
    this.a11yDesc = "";
  }
  /**
   * @returns {void}
   */
  disableAnimations() {
    this.animations = false;
  }
  /**
   * @param {Object} props The props object.
   * @param {string} props.title Accessibility title.
   * @param {string} props.desc Accessibility description.
   * @returns {void}
   */
  setAccessibilityLabel({ title, desc }) {
    this.a11yTitle = title;
    this.a11yDesc = desc;
  }
  /**
   * @param {string} value The CSS to add to the card.
   * @returns {void}
   */
  setCSS(value) {
    this.css = value;
  }
  /**
   * @param {boolean} value Whether to hide the border or not.
   * @returns {void}
   */
  setHideBorder(value) {
    this.hideBorder = value;
  }
  /**
   * @param {boolean} value Whether to hide the title or not.
   * @returns {void}
   */
  setHideTitle(value) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }
  /**
   * @param {string} text The title to set.
   * @returns {void}
   */
  setTitle(text) {
    this.title = text;
  }
  /**
   * @returns {string} The rendered card title.
   */
  renderTitle() {
    const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >${this.title}</text>
    `;
    const prefixIcon = `
      <svg
        class="icon"
        x="0"
        y="-13"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
      >
        ${this.titlePrefixIcon}
      </svg>
    `;
    return `
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX}, ${this.paddingY})"
      >
        ${flexLayout({
          items: [this.titlePrefixIcon && prefixIcon, titleText],
          gap: 25,
        }).join("")}
      </g>
    `;
  }
  /**
   * @returns {string} The rendered card gradient.
   */
  renderGradient() {
    if (typeof this.colors.bgColor !== "object") return "";
    const gradients = this.colors.bgColor.slice(1);
    return typeof this.colors.bgColor === "object"
      ? `
        <defs>
          <linearGradient
            id="gradient"
            gradientTransform="rotate(${this.colors.bgColor[0]})"
            gradientUnits="userSpaceOnUse"
          >
            ${gradients.map((grad, index) => {
              let offset = (index * 100) / (gradients.length - 1);
              return `<stop offset="${offset}%" stop-color="#${grad}" />`;
            })}
          </linearGradient>
        </defs>
        `
      : "";
  }
  /**
   * @param {string} body The inner body of the card.
   * @returns {string} The rendered card.
   */
  render(body) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
      >
        <title id="titleId">${this.a11yTitle}</title>
        <desc id="descId">${this.a11yDesc}</desc>
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: ${this.colors.titleColor};
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          @supports(-moz-appearance: auto) {
            /* Selector detects Firefox */
            .header { font-size: 15.5px; }
          }
          ${this.css}

          ${process.env.NODE_ENV === "test" ? "" : getAnimations()}
          ${
            this.animations === false
              ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
              : ""
          }
        </style>

        ${this.renderGradient()}

        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="${this.border_radius}"
          height="99%"
          stroke="${this.colors.borderColor}"
          width="${this.width - 1}"
          fill="${
            typeof this.colors.bgColor === "object"
              ? "url(#gradient)"
              : this.colors.bgColor
          }"
          stroke-opacity="${this.hideBorder ? 0 : 1}"
        />

        ${this.hideTitle ? "" : this.renderTitle()}

        <g
          data-testid="main-card-body"
          transform="translate(0, ${
            this.hideTitle ? this.paddingX : this.paddingY + 20
          })"
        >
          ${body}
        </g>
      </svg>
    `;
  }
};

// src/common/I18n.js
var I18n = class {
  constructor({ locale, translations }) {
    this.locale = locale;
    this.translations = translations;
    this.fallbackLocale = "en";
  }
  t(str) {
    const locale = this.locale || this.fallbackLocale;
    if (!this.translations[str]) {
      throw new Error(`${str} Translation string not found`);
    }
    if (!this.translations[str][locale]) {
      throw new Error(`'${str}' translation not found for locale '${locale}'`);
    }
    return this.translations[str][locale];
  }
};

// src/common/icons.js
var icons = {
  star: `<path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>`,
  commits: `<path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>`,
  prs: `<path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>`,
  issues: `<path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>`,
  icon: `<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>`,
  contribs: `<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>`,
  fork: `<path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>`,
  reviews: `<path fill-rule="evenodd" d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"/>`,
  discussions_started: `<path fill-rule="evenodd" d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z" />`,
  discussions_answered: `<path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />`,
};
var rankIcon = (rankIcon2, rankLevel, percentile) => {
  switch (rankIcon2) {
    case "github":
      return `
        <svg x="-38" y="-30" height="66" width="66" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" data-testid="github-rank-icon">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
      `;
    case "percentile":
      return `
        <text x="-5" y="-12" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" data-testid="percentile-top-header" class="rank-percentile-header">
          Top
        </text>
        <text x="-5" y="12" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" data-testid="percentile-rank-value" class="rank-percentile-text">
          ${percentile.toFixed(1)}%
        </text>
      `;
    case "default":
    default:
      return `
        <text x="-5" y="3" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" data-testid="level-rank-icon">
          ${rankLevel}
        </text>
      `;
  }
};

// src/translations.js
var statCardLocales = ({ name, apostrophe }) => {
  const encodedName = encodeHTML(name);
  return {
    "statcard.title": {
      ar: `${encodedName} \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u063A\u064A\u062A \u0647\u0627\u0628`,
      cn: `${encodedName} \u7684 GitHub \u7EDF\u8BA1\u6570\u636E`,
      "zh-tw": `${encodedName} \u7684 GitHub \u7D71\u8A08\u6578\u64DA`,
      cs: `GitHub statistiky u\u017Eivatele ${encodedName}`,
      de: `${encodedName + apostrophe} GitHub-Statistiken`,
      en: `${encodedName}'${apostrophe} GitHub Stats`,
      bn: `${encodedName} \u098F\u09B0 GitHub \u09AA\u09B0\u09BF\u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09A8`,
      es: `Estad\xEDsticas de GitHub de ${encodedName}`,
      fr: `Statistiques GitHub de ${encodedName}`,
      hu: `${encodedName} GitHub statisztika`,
      it: `Statistiche GitHub di ${encodedName}`,
      ja: `${encodedName}\u306E GitHub \u7D71\u8A08`,
      kr: `${encodedName}\uC758 GitHub \uD1B5\uACC4`,
      nl: `${encodedName}'${apostrophe} GitHub-statistieken`,
      "pt-pt": `Estat\xEDsticas do GitHub de ${encodedName}`,
      "pt-br": `Estat\xEDsticas do GitHub de ${encodedName}`,
      np: `${encodedName}'${apostrophe} \u0917\u093F\u091F\u0939\u092C \u0924\u0925\u094D\u092F\u093E\u0919\u094D\u0915`,
      el: `\u03A3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC GitHub \u03C4\u03BF\u03C5 ${encodedName}`,
      ru: `\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 GitHub \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F ${encodedName}`,
      "uk-ua": `\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 GitHub \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 ${encodedName}`,
      id: `Statistik GitHub ${encodedName}`,
      ml: `${encodedName}'${apostrophe} \u0D17\u0D3F\u0D31\u0D4D\u0D31\u0D4D\u0D39\u0D2C\u0D4D \u0D38\u0D4D\u0D25\u0D3F\u0D24\u0D3F\u0D35\u0D3F\u0D35\u0D30\u0D15\u0D4D\u0D15\u0D23\u0D15\u0D4D\u0D15\u0D41\u0D15\u0D7E`,
      my: `Statistik GitHub ${encodedName}`,
      sk: `GitHub \u0161tatistiky pou\u017E\xEDvate\u013Ea ${encodedName}`,
      tr: `${encodedName} Hesab\u0131n\u0131n GitHub Y\u0131ld\u0131zlar\u0131`,
      pl: `Statystyki GitHub u\u017Cytkownika ${encodedName}`,
      uz: `${encodedName}ning GitHub'dagi statistikasi`,
      vi: `Th\u1ED1ng K\xEA GitHub ${encodedName}`,
      se: `GitHubstatistik f\xF6r ${encodedName}`,
    },
    "statcard.ranktitle": {
      ar: `${encodedName} \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u063A\u064A\u062A \u0647\u0627\u0628`,
      cn: `${encodedName} \u7684 GitHub \u7EDF\u8BA1\u6570\u636E`,
      "zh-tw": `${encodedName} \u7684 GitHub \u7D71\u8A08\u6578\u64DA`,
      cs: `GitHub statistiky u\u017Eivatele ${encodedName}`,
      de: `${encodedName + apostrophe} GitHub-Statistiken`,
      en: `${encodedName}'${apostrophe} GitHub Rank`,
      bn: `${encodedName} \u098F\u09B0 GitHub \u09AA\u09B0\u09BF\u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09A8`,
      es: `Estad\xEDsticas de GitHub de ${encodedName}`,
      fr: `Statistiques GitHub de ${encodedName}`,
      hu: `${encodedName} GitHub statisztika`,
      it: `Statistiche GitHub di ${encodedName}`,
      ja: `${encodedName} \u306E GitHub \u30E9\u30F3\u30AF`,
      kr: `${encodedName}\uC758 GitHub \uD1B5\uACC4`,
      nl: `${encodedName}'${apostrophe} GitHub-statistieken`,
      "pt-pt": `Estat\xEDsticas do GitHub de ${encodedName}`,
      "pt-br": `Estat\xEDsticas do GitHub de ${encodedName}`,
      np: `${encodedName}'${apostrophe} \u0917\u093F\u091F\u0939\u092C \u0924\u0925\u094D\u092F\u093E\u0919\u094D\u0915`,
      el: `\u03A3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC GitHub \u03C4\u03BF\u03C5 ${encodedName}`,
      ru: `\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 GitHub \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F ${encodedName}`,
      "uk-ua": `\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 GitHub \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 ${encodedName}`,
      id: `Statistik GitHub ${encodedName}`,
      ml: `${encodedName}'${apostrophe} \u0D17\u0D3F\u0D31\u0D4D\u0D31\u0D4D\u0D39\u0D2C\u0D4D \u0D38\u0D4D\u0D25\u0D3F\u0D24\u0D3F\u0D35\u0D3F\u0D35\u0D30\u0D15\u0D4D\u0D15\u0D23\u0D15\u0D4D\u0D15\u0D41\u0D15\u0D7E`,
      my: `Statistik GitHub ${encodedName}`,
      sk: `GitHub \u0161tatistiky pou\u017E\xEDvate\u013Ea ${encodedName}`,
      tr: `${encodedName} Hesab\u0131n\u0131n GitHub Y\u0131ld\u0131zlar\u0131`,
      pl: `Statystyki GitHub u\u017Cytkownika ${encodedName}`,
      uz: `${encodedName}ning GitHub'dagi statistikasi`,
      vi: `Th\u1ED1ng K\xEA GitHub ${encodedName}`,
      se: `GitHubstatistik f\xF6r ${encodedName}`,
    },
    "statcard.totalstars": {
      ar: "\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0646\u062C\u0648\u0645",
      cn: "\u83B7\u6807\u661F\u6570\uFF08star\uFF09",
      "zh-tw": "\u7372\u6A19\u661F\u6578\uFF08star\uFF09",
      cs: "Celkem hv\u011Bzd",
      de: "Insgesamt erhaltene Sterne",
      en: "Total Stars Earned",
      bn: "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F Star",
      es: "Estrellas totales",
      fr: "Total d'\xE9toiles",
      hu: "Csillagok",
      it: "Stelle totali",
      ja: "\u30B9\u30BF\u30FC\u3055\u308C\u305F\u6570",
      kr: "\uBC1B\uC740 \uC2A4\uD0C0 \uC218",
      nl: "Totaal Sterren Ontvangen",
      "pt-pt": "Total de estrelas",
      "pt-br": "Total de estrelas",
      np: "\u0915\u0941\u0932 \u0924\u093E\u0930\u093E\u0939\u0930\u0942",
      el: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF \u0391\u03C3\u03C4\u03B5\u03C1\u03B9\u03CE\u03BD",
      ru: "\u0412\u0441\u0435\u0433\u043E \u0437\u0432\u0435\u0437\u0434",
      "uk-ua":
        "\u0412\u0441\u044C\u043E\u0433\u043E \u0437\u0456\u0440\u043E\u043A",
      id: "Total Bintang",
      ml: "\u0D06\u0D15\u0D46 \u0D28\u0D15\u0D4D\u0D37\u0D24\u0D4D\u0D30\u0D19\u0D4D\u0D19\u0D7E",
      my: "Jumlah Bintang",
      sk: "Hviezdy",
      tr: "Toplam Y\u0131ld\u0131z",
      pl: "Liczba otrzymanych gwiazdek",
      uz: "Yulduzchalar",
      vi: "T\u1ED5ng S\u1ED1 Sao",
      se: "Antal intj\xE4nade stj\xE4rnor",
    },
    "statcard.commits": {
      ar: "\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u062D\u0641\u0638",
      cn: "\u7D2F\u8BA1\u63D0\u4EA4\u6570\uFF08commit\uFF09",
      "zh-tw": "\u7D2F\u8A08\u63D0\u4EA4\u6578\uFF08commit\uFF09",
      cs: "Celkem commit\u016F",
      de: "Anzahl Commits",
      en: "Total Commits",
      bn: "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F Commit",
      es: "Commits totales",
      fr: "Total des Commits",
      hu: "\xD6sszes commit",
      it: "Commit totali",
      ja: "\u5408\u8A08\u30B3\u30DF\u30C3\u30C8\u6570",
      kr: "\uC804\uCCB4 \uCEE4\uBC0B \uC218",
      nl: "Aantal commits",
      "pt-pt": "Total de Commits",
      "pt-br": "Total de Commits",
      np: "\u0915\u0941\u0932 Commits",
      el: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF Commits",
      ru: "\u0412\u0441\u0435\u0433\u043E \u043A\u043E\u043C\u043C\u0438\u0442\u043E\u0432",
      "uk-ua":
        "\u0412\u0441\u044C\u043E\u0433\u043E \u043A\u043E\u043C\u043C\u0456\u0442\u043E\u0432",
      id: "Total Komitmen",
      ml: "\u0D06\u0D15\u0D46 \u0D15\u0D2E\u0D4D\u0D2E\u0D3F\u0D31\u0D4D\u0D31\u0D41\u0D15\u0D7E",
      my: "Jumlah Komitmen",
      sk: "V\u0161etky commity",
      tr: "Toplam Commit",
      pl: "Wszystkie commity",
      uz: "'Commit'lar",
      vi: "T\u1ED5ng S\u1ED1 Cam K\u1EBFt",
      se: "Totalt antal commits",
    },
    "statcard.prs": {
      ar: "\u0645\u062C\u0645\u0648\u0639 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0633\u062D\u0628",
      cn: "\u62C9\u53D6\u8BF7\u6C42\u6570\uFF08PR\uFF09",
      "zh-tw": "\u62C9\u53D6\u8ACB\u6C42\u6578\uFF08PR\uFF09",
      cs: "Celkem PRs",
      de: "PRs Insgesamt",
      en: "Total PRs",
      bn: "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F PR",
      es: "PRs totales",
      fr: "Total des PRs",
      hu: "\xD6sszes PR",
      it: "PR totali",
      ja: "\u5408\u8A08 PR",
      kr: "PR \uD69F\uC218",
      nl: "Aantal PR's",
      "pt-pt": "Total de PRs",
      "pt-br": "Total de PRs",
      np: "\u0915\u0941\u0932 PRs",
      el: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF PRs",
      ru: "\u0412\u0441\u0435\u0433\u043E pull request`\u043E\u0432",
      "uk-ua": "\u0412\u0441\u044C\u043E\u0433\u043E pull request`i\u0432",
      id: "Total Permintaan Tarik",
      ml: "\u0D06\u0D15\u0D46 \u0D2A\u0D41\u0D7E \u0D05\u0D2D\u0D4D\u0D2F\u0D7C\u0D24\u0D4D\u0D25\u0D28\u0D15\u0D7E",
      my: "Jumlah PR",
      sk: "V\u0161etky PR",
      tr: "Toplam PR",
      pl: "Wszystkie PR-y",
      uz: "'Pull Request'lar",
      vi: "T\u1ED5ng S\u1ED1 PR",
      se: "Totalt antal PR",
    },
    "statcard.issues": {
      ar: "\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u062A\u062D\u0633\u064A\u0646\u0627\u062A",
      cn: "\u6307\u51FA\u95EE\u9898\u6570\uFF08issue\uFF09",
      "zh-tw": "\u6307\u51FA\u554F\u984C\u6578\uFF08issue\uFF09",
      cs: "Celkem probl\xE9m\u016F",
      de: "Anzahl Issues",
      en: "Total Issues",
      bn: "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F Issue",
      es: "Issues totales",
      fr: "Nombre total d'incidents",
      hu: "\xD6sszes hibajegy",
      it: "Segnalazioni totali",
      ja: "\u5408\u8A08 issue",
      kr: "\uC774\uC288 \uAC1C\uC218",
      nl: "Aantal kwesties",
      "pt-pt": "Total de Issues",
      "pt-br": "Total de Issues",
      np: "\u0915\u0941\u0932 \u092E\u0941\u0926\u094D\u0926\u093E\u0939\u0930\u0942",
      el: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF \u0396\u03B7\u03C4\u03B7\u03BC\u03AC\u03C4\u03C9\u03BD",
      ru: "\u0412\u0441\u0435\u0433\u043E issue",
      "uk-ua": "\u0412\u0441\u044C\u043E\u0433\u043E issue",
      id: "Total Masalah Dilaporkan",
      ml: "\u0D06\u0D15\u0D46 \u0D32\u0D15\u0D4D\u0D15\u0D19\u0D4D\u0D19\u0D7E",
      my: "Jumlah Isu Dilaporkan",
      sk: "V\u0161etky probl\xE9my",
      tr: "Toplam Hata",
      pl: "Wszystkie problemy",
      uz: "'Issue'lar",
      vi: "T\u1ED5ng S\u1ED1 V\u1EA5n \u0110\u1EC1",
      se: "Total antal issues",
    },
    "statcard.contribs": {
      ar: "\u0633\u0627\u0647\u0645 \u0641\u064A (\u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0645\u0627\u0636\u064A)",
      cn: "\u8D21\u732E\u4E8E\uFF08\u53BB\u5E74\uFF09",
      "zh-tw": "\u53C3\u8207\u9805\u76EE\u6578 \uFF08\u53BB\u5E74\uFF09",
      cs: "P\u0159isp\u011Bl k (minul\xFD rok)",
      de: "Beigetragen zu (letztes Jahr)",
      en: "Contributed to (last year)",
      bn: "\u0985\u09AC\u09A6\u09BE\u09A8 (\u0997\u09A4 \u09AC\u099B\u09B0)",
      es: "Contribuciones en (el a\xF1o pasado)",
      fr: "Contribu\xE9 \xE0 (l'ann\xE9e derni\xE8re)",
      hu: "Hozz\xE1j\xE1rul\xE1sok (tavaly)",
      it: "Ha contribuito a (l'anno scorso)",
      ja: "\u8CA2\u732E\u3057\u305F\u30EA\u30DD\u30B8\u30C8\u30EA \uFF08\u6628\u5E74\uFF09",
      kr: "(\uC791\uB144) \uAE30\uC5EC",
      nl: "Bijgedragen aan (vorig jaar)",
      "pt-pt": "Contribuiu em (ano passado)",
      "pt-br": "Contribuiu para (ano passado)",
      np: "\u0915\u0941\u0932 \u092F\u094B\u0917\u0926\u093E\u0928\u0939\u0930\u0942 (\u0917\u0924 \u0935\u0930\u094D\u0937)",
      el: "\u03A3\u03C5\u03BD\u03B5\u03B9\u03C3\u03C6\u03AD\u03C1\u03B8\u03B7\u03BA\u03B5 \u03C3\u03B5 (\u03C0\u03AD\u03C1\u03C5\u03C3\u03B9)",
      ru: "\u0412\u043D\u0451\u0441 \u0432\u043A\u043B\u0430\u0434 \u0432 (\u0437\u0430 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0433\u043E\u0434)",
      "uk-ua":
        "\u0417\u0440\u043E\u0431\u0438\u0432 \u0432\u043D\u0435\u0441\u043E\u043A \u0443 (\u0437\u0430 \u043C\u0438\u043D\u0443\u043B\u0438\u0439 \u0440\u0456\u043A)",
      id: "Berkontribusi ke (tahun lalu)",
      ml: "\u0D38\u0D2E\u0D7C\u0D2A\u0D4D\u0D2A\u0D3F\u0D1A\u0D4D\u0D1A\u0D3F\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D24\u0D4D (\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E \u0D35\u0D7C\u0D37\u0D02)",
      my: "Menyumbang kepada (tahun lepas)",
      sk: "\xDA\u010Dasti (minul\xFD rok)",
      tr: "Katk\u0131 Verildi (ge\xE7en y\u0131l)",
      pl: "Kontrybucje (w zesz\u0142ym roku)",
      uz: "Hissa qo\u02BBshgan (o'tgan yili)",
      vi: "\u0110\xE3 \u0110\xF3ng G\xF3p (n\u0103m ngo\xE1i)",
      se: "Bidragit till (f\xF6rra \xE5ret)",
    },
    "statcard.reviews": {
      ar: "\u062A\u0645\u062A \u0645\u0631\u0627\u062C\u0639\u0629 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629",
      cn: "\u5BE9\u67E5\u7684 PR \u7E3D\u6578",
      "zh-tw": "\u5BA1\u67E5\u7684 PR \u603B\u6570",
      cs: "Celkov\xFD po\u010Det PR",
      de: "Insgesamt \xFCberpr\xFCfte PRs",
      en: "Total PRs Reviewed",
      bn: "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F \u09AA\u09C1\u09A8\u09B0\u09BE\u09B2\u09CB\u099A\u09A8\u09BE \u0995\u09B0\u09BE PR",
      es: "PR totales revisados",
      fr: "Nombre total de PR examin\xE9s",
      hu: "\xD6sszes ellen\u0151rz\xF6tt PR",
      it: "PR totali esaminati",
      ja: "\u30EC\u30D3\u30E5\u30FC\u3055\u308C\u305F PR \u306E\u7DCF\u6570",
      kr: "\uAC80\uD1A0\uB41C \uCD1D PR",
      nl: "Totaal beoordeelde PR's",
      "pt-pt": "Total de PRs revistos",
      "pt-br": "Total de PRs revisados",
      np: "\u0915\u0941\u0932 \u092A\u0940\u0906\u0930 \u0938\u092E\u0940\u0915\u094D\u0937\u093F\u0924",
      el: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF \u0391\u03BD\u03B1\u03B8\u03B5\u03C9\u03C1\u03B7\u03BC\u03AD\u03BD\u03C9\u03BD PR",
      ru: "\u0412\u0441\u0435\u0433\u043E pull request`\u043E\u0432 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E",
      "uk-ua":
        "\u0412\u0441\u044C\u043E\u0433\u043E pull request`i\u0432 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043D\u043E",
      id: "Total PR yang Direview",
      my: "Jumlah PR Dikaji Semula",
      sk: "Celkov\xFD po\u010Det PR",
      tr: "\u0130ncelenen toplam PR",
      pl: "\u0141\u0105cznie sprawdzonych PR",
      uz: "Ko\u02BBrib chiqilgan PR-lar soni",
      vi: "T\u1ED5ng S\u1ED1 PR \u0110\xE3 Xem X\xE9t",
      se: "Totalt antal granskade PR",
    },
    "statcard.discussions-started": {
      ar: "\u0645\u062C\u0645\u0648\u0639 \u0628\u062F\u0621 \u0627\u0644\u0645\u0646\u0627\u0642\u0634\u0627\u062A",
      cn: "\u53D1\u8D77\u7684\u8BA8\u8BBA\u603B\u6570",
      "zh-tw": "\u767C\u8D77\u7684\u8A0E\u8AD6\u7E3D\u6578",
      cs: "Celkem zah\xE1jen\xFDch diskus\xED",
      de: "Gesamt gestartete Diskussionen",
      en: "Total Discussions Started",
      bn: "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F \u0986\u09B2\u09CB\u099A\u09A8\u09BE \u09B6\u09C1\u09B0\u09C1",
      es: "Discusiones totales iniciadas",
      fr: "Nombre total de discussions lanc\xE9es",
      hu: "\xD6sszes megkezdett megbesz\xE9l\xE9s",
      it: "Discussioni totali avviate",
      ja: "\u958B\u59CB\u3055\u308C\u305F\u30C7\u30A3\u30B9\u30AB\u30C3\u30B7\u30E7\u30F3\u306E\u7DCF\u6570",
      kr: "\uC2DC\uC791\uB41C \uD1A0\uB860 \uCD1D \uC218",
      nl: "Totaal gestarte discussies",
      "pt-pt": "Total de Discuss\xF5es Iniciadas",
      "pt-br": "Total de Discuss\xF5es Iniciadas",
      np: "\u0915\u0941\u0932 \u091A\u0930\u094D\u091A\u093E \u0938\u0941\u0930\u0941",
      el: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF \u03A3\u03C5\u03B6\u03B7\u03C4\u03AE\u03C3\u03B5\u03C9\u03BD \u03C0\u03BF\u03C5 \u039E\u03B5\u03BA\u03AF\u03BD\u03B7\u03C3\u03B1\u03BD",
      ru: "\u0412\u0441\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044B\u0445 \u0434\u0438\u0441\u043A\u0443\u0441\u0441\u0438\u0439",
      "uk-ua":
        "\u0412\u0441\u044C\u043E\u0433\u043E \u0440\u043E\u0437\u043F\u043E\u0447\u0430\u0442\u0438\u0445 \u0434\u0438\u0441\u043A\u0443\u0441\u0456\u0439",
      id: "Total Diskusi Dimulai",
      my: "Jumlah Perbincangan Bermula",
      sk: "Celkov\xFD po\u010Det za\u010Dat\xFDch diskusi\xED",
      tr: "Ba\u015Flat\u0131lan Toplam Tart\u0131\u015Fma",
      pl: "\u0141\u0105cznie rozpocz\u0119tych dyskusji",
      uz: "Boshlangan muzokaralar soni",
      vi: "T\u1ED5ng S\u1ED1 Th\u1EA3o Lu\u1EADn B\u1EAFt \u0110\u1EA7u",
      se: "Totalt antal diskussioner startade",
    },
    "statcard.discussions-answered": {
      ar: "\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0631\u062F\u0648\u062F \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u0627\u0642\u0634\u0627\u062A",
      cn: "\u56DE\u590D\u7684\u8BA8\u8BBA\u603B\u6570",
      "zh-tw": "\u56DE\u8986\u7684\u8A0E\u8AD6\u7E3D\u6578",
      cs: "Celkem zodpov\u011Bzen\xFDch diskus\xED",
      de: "Gesamt beantwortete Diskussionen",
      en: "Total Discussions Answered",
      bn: "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F \u0986\u09B2\u09CB\u099A\u09A8\u09BE \u0989\u09A4\u09CD\u09A4\u09B0",
      es: "Discusiones totales respondidas",
      fr: "Nombre total de discussions r\xE9pondues",
      hu: "\xD6sszes megv\xE1laszolt megbesz\xE9l\xE9s",
      it: "Discussioni totali risposte",
      ja: "\u56DE\u7B54\u3055\u308C\u305F\u30C7\u30A3\u30B9\u30AB\u30C3\u30B7\u30E7\u30F3\u306E\u7DCF\u6570",
      kr: "\uB2F5\uBCC0\uB41C \uD1A0\uB860 \uCD1D \uC218",
      nl: "Totaal beantwoorde discussies",
      "pt-pt": "Total de Discuss\xF5es Respondidas",
      "pt-br": "Total de Discuss\xF5es Respondidas",
      np: "\u0915\u0941\u0932 \u091A\u0930\u094D\u091A\u093E \u0909\u0924\u094D\u0924\u0930",
      el: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF \u03A3\u03C5\u03B6\u03B7\u03C4\u03AE\u03C3\u03B5\u03C9\u03BD \u03C0\u03BF\u03C5 \u0391\u03C0\u03B1\u03BD\u03C4\u03AE\u03B8\u03B7\u03BA\u03B1\u03BD",
      ru: "\u0412\u0441\u0435\u0433\u043E \u043E\u0442\u0432\u0435\u0447\u0435\u043D\u043D\u044B\u0445 \u0434\u0438\u0441\u043A\u0443\u0441\u0441\u0438\u0439",
      "uk-ua":
        "\u0412\u0441\u044C\u043E\u0433\u043E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0435\u0439 \u043D\u0430 \u0434\u0438\u0441\u043A\u0443\u0441\u0456\u0457",
      id: "Total Diskusi Dibalas",
      my: "Jumlah Perbincangan Dijawab",
      sk: "Celkov\xFD po\u010Det zodpovedan\xFDch diskusi\xED",
      tr: "Toplam Cevaplanan Tart\u0131\u015Fma",
      pl: "\u0141\u0105cznie odpowiedzianych dyskusji",
      uz: "Javob berilgan muzokaralar soni",
      vi: "T\u1ED5ng S\u1ED1 Th\u1EA3o Lu\u1EADn \u0110\xE3 Tr\u1EA3 L\u1EDDi",
      se: "Totalt antal diskussioner besvarade",
    },
  };
};
var repoCardLocales = {
  "repocard.template": {
    ar: "\u0642\u0627\u0644\u0628",
    bn: "\u099F\u09C7\u09AE\u09AA\u09CD\u09B2\u09C7\u099F",
    cn: "\u6A21\u677F",
    "zh-tw": "\u6A21\u677F",
    cs: "\u0160ablona",
    de: "Vorlage",
    en: "Template",
    es: "Plantilla",
    fr: "Mod\xE8le",
    hu: "Sablon",
    it: "Template",
    ja: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
    kr: "\uD15C\uD50C\uB9BF",
    nl: "Sjabloon",
    "pt-pt": "Modelo",
    "pt-br": "Modelo",
    np: "\u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F",
    el: "\u03A0\u03C1\u03CC\u03C4\u03C5\u03C0\u03BF",
    ru: "\u0428\u0430\u0431\u043B\u043E\u043D",
    "uk-ua": "\u0428\u0430\u0431\u043B\u043E\u043D",
    id: "Pola",
    ml: "\u0D1F\u0D46\u0D02\u0D2A\u0D4D\u0D32\u0D47\u0D31\u0D4D\u0D31\u0D4D",
    my: "Templat",
    sk: "\u0160abl\xF3na",
    tr: "\u015Eablon",
    pl: "Szablony",
    vi: "M\u1EABu",
    se: "Mall",
  },
  "repocard.archived": {
    ar: "\u0645\u062D\u0641\u0648\u0638",
    bn: "\u0986\u09B0\u09CD\u0995\u09BE\u0987\u09AD\u09A1",
    cn: "\u5DF2\u5F52\u6863",
    "zh-tw": "\u5DF2\u6B78\u6A94",
    cs: "Archivov\xE1no",
    de: "Archiviert",
    en: "Archived",
    es: "Archivados",
    fr: "Archiv\xE9",
    hu: "Archiv\xE1lt",
    it: "Archiviata",
    ja: "\u30A2\u30FC\u30AB\u30A4\u30D6\u6E08\u307F",
    kr: "\uBCF4\uAD00\uB428",
    nl: "Gearchiveerd",
    "pt-pt": "Arquivados",
    "pt-br": "Arquivados",
    np: "\u0905\u092D\u093F\u0932\u0947\u0916 \u0930\u093E\u0916\u093F\u092F\u094B",
    el: "\u0391\u03C1\u03C7\u03B5\u03B9\u03BF\u03B8\u03B5\u03C4\u03B7\u03BC\u03AD\u03BD\u03B1",
    ru: "\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",
    "uk-ua":
      "\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",
    id: "Arsip",
    ml: "\u0D36\u0D47\u0D16\u0D30\u0D3F\u0D1A\u0D4D\u0D1A\u0D24\u0D4D",
    my: "Arkib",
    sk: "Archivovan\xE9",
    tr: "Ar\u015Fiv",
    pl: "Zarchiwizowano",
    vi: "\u0110\xE3 L\u01B0u Tr\u1EEF",
    se: "Arkiverade",
  },
};
var availableLocales = Object.keys(repoCardLocales["repocard.archived"]);
var isLocaleAvailable = (locale) => {
  return availableLocales.includes(locale.toLowerCase());
};

// src/cards/stats-card.js
var CARD_MIN_WIDTH = 287;
var CARD_DEFAULT_WIDTH = 287;
var RANK_CARD_MIN_WIDTH = 420;
var RANK_CARD_DEFAULT_WIDTH = 450;
var RANK_ONLY_CARD_MIN_WIDTH = 290;
var RANK_ONLY_CARD_DEFAULT_WIDTH = 290;
var createTextNode = ({
  icon,
  label,
  value,
  id,
  index,
  showIcons,
  shiftValuePos,
  bold,
  number_format,
}) => {
  const kValue =
    number_format.toLowerCase() === "long" ? value : kFormatter(value);
  const staggerDelay = (index + 3) * 150;
  const labelOffset = showIcons ? `x="25"` : "";
  const iconSvg = showIcons
    ? `
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icon}
    </svg>
  `
    : "";
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      ${iconSvg}
      <text class="stat ${
        bold ? " bold" : "not_bold"
      }" ${labelOffset} y="12.5">${label}:</text>
      <text
        class="stat ${bold ? " bold" : "not_bold"}"
        x="${(showIcons ? 140 : 120) + shiftValuePos}"
        y="12.5"
        data-testid="${id}"
      >${kValue}</text>
    </g>
  `;
};
var renderStatsCard = (stats, options = {}) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    totalReviews,
    totalDiscussionsStarted,
    totalDiscussionsAnswered,
    contributedTo,
    rank,
  } = stats;
  const {
    hide = [],
    show_icons = false,
    hide_title = false,
    hide_border = false,
    card_width,
    hide_rank = false,
    include_all_commits = false,
    line_height = 25,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold = true,
    bg_color,
    theme = "default",
    custom_title,
    border_radius,
    border_color,
    number_format = "short",
    locale,
    disable_animations = false,
    rank_icon = "default",
    show = [],
  } = options;
  const lheight = parseInt(String(line_height), 10);
  const { titleColor, iconColor, textColor, bgColor, borderColor, ringColor } =
    getCardColors({
      title_color,
      text_color,
      icon_color,
      bg_color,
      border_color,
      ring_color,
      theme,
    });
  const apostrophe = ["x", "s"].includes(name.slice(-1).toLocaleLowerCase())
    ? ""
    : "s";
  const i18n = new I18n({
    locale,
    translations: statCardLocales({ name, apostrophe }),
  });
  const STATS = {};
  STATS.stars = {
    icon: icons.star,
    label: i18n.t("statcard.totalstars"),
    value: totalStars,
    id: "stars",
  };
  STATS.commits = {
    icon: icons.commits,
    label: `${i18n.t("statcard.commits")}${
      include_all_commits
        ? ""
        : ` (${/* @__PURE__ */ new Date().getFullYear()})`
    }`,
    value: totalCommits,
    id: "commits",
  };
  STATS.prs = {
    icon: icons.prs,
    label: i18n.t("statcard.prs"),
    value: totalPRs,
    id: "prs",
  };
  if (show.includes("reviews")) {
    STATS.reviews = {
      icon: icons.reviews,
      label: i18n.t("statcard.reviews"),
      value: totalReviews,
      id: "reviews",
    };
  }
  STATS.issues = {
    icon: icons.issues,
    label: i18n.t("statcard.issues"),
    value: totalIssues,
    id: "issues",
  };
  if (show.includes("discussions_started")) {
    STATS.discussions_started = {
      icon: icons.discussions_started,
      label: i18n.t("statcard.discussions-started"),
      value: totalDiscussionsStarted,
      id: "discussions_started",
    };
  }
  if (show.includes("discussions_answered")) {
    STATS.discussions_answered = {
      icon: icons.discussions_answered,
      label: i18n.t("statcard.discussions-answered"),
      value: totalDiscussionsAnswered,
      id: "discussions_answered",
    };
  }
  STATS.contribs = {
    icon: icons.contribs,
    label: i18n.t("statcard.contribs"),
    value: contributedTo,
    id: "contribs",
  };
  const longLocales = [
    "cn",
    "es",
    "fr",
    "pt-br",
    "ru",
    "uk-ua",
    "id",
    "my",
    "pl",
    "de",
    "nl",
    "zh-tw",
  ];
  const isLongLocale = locale ? longLocales.includes(locale) : false;
  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({
        ...STATS[key],
        index,
        showIcons: show_icons,
        shiftValuePos: 79.01 + (isLongLocale ? 50 : 0),
        bold: text_bold,
        number_format,
      }),
    );
  if (statItems.length === 0 && hide_rank) {
    throw new CustomError(
      "Could not render stats card.",
      "Either stats or rank are required.",
    );
  }
  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : statItems.length ? 150 : 180,
  );
  const progress = 100 - rank.percentile;
  const cssStyles = getStyles({
    titleColor,
    ringColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });
  const calculateTextWidth = () => {
    return measureText(
      custom_title
        ? custom_title
        : statItems.length
        ? i18n.t("statcard.title")
        : i18n.t("statcard.ranktitle"),
    );
  };
  const iconWidth = show_icons && statItems.length ? 16 /* padding */ + 1 : 0;
  const minCardWidth =
    (hide_rank
      ? clampValue(50 + calculateTextWidth() * 2, CARD_MIN_WIDTH, Infinity)
      : statItems.length
      ? RANK_CARD_MIN_WIDTH
      : RANK_ONLY_CARD_MIN_WIDTH) + iconWidth;
  const defaultCardWidth =
    (hide_rank
      ? CARD_DEFAULT_WIDTH
      : statItems.length
      ? RANK_CARD_DEFAULT_WIDTH
      : RANK_ONLY_CARD_DEFAULT_WIDTH) + iconWidth;
  let width = card_width
    ? isNaN(card_width)
      ? defaultCardWidth
      : card_width
    : defaultCardWidth;
  if (width < minCardWidth) {
    width = minCardWidth;
  }
  const card = new Card({
    customTitle: custom_title,
    defaultTitle: statItems.length
      ? i18n.t("statcard.title")
      : i18n.t("statcard.ranktitle"),
    width,
    height,
    border_radius,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
      borderColor,
    },
  });
  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(cssStyles);
  if (disable_animations) card.disableAnimations();
  const calculateRankXTranslation = () => {
    if (statItems.length) {
      const minXTranslation = RANK_CARD_MIN_WIDTH + iconWidth - 70;
      if (width > RANK_CARD_DEFAULT_WIDTH) {
        const xMaxExpansion = minXTranslation + (450 - minCardWidth) / 2;
        return xMaxExpansion + width - RANK_CARD_DEFAULT_WIDTH;
      } else {
        return minXTranslation + (width - minCardWidth) / 2;
      }
    } else {
      return width / 2 + 20 - 10;
    }
  };
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle"
          transform="translate(${calculateRankXTranslation()}, ${
            height / 2 - 50
          })">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <g class="rank-text">
          ${rankIcon(rank_icon, rank?.level, rank?.percentile)}
        </g>
      </g>`;
  const labels = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key) => {
      if (key === "commits") {
        return `${i18n.t("statcard.commits")} ${
          include_all_commits
            ? ""
            : `in ${/* @__PURE__ */ new Date().getFullYear()}`
        } : ${totalStars}`;
      }
      return `${STATS[key].label}: ${STATS[key].value}`;
    })
    .join(", ");
  card.setAccessibilityLabel({
    title: `${card.title}, Rank: ${rank.level}`,
    desc: labels,
  });
  return card.render(`
    ${rankCircle}
    <svg x="0" y="0">
      ${flexLayout({
        items: statItems,
        gap: lheight,
        direction: "column",
      }).join("")}
    </svg>
  `);
};

// src/common/blacklist.js
var blacklist = ["renovate-bot", "technote-space", "sw-yx"];

// src/fetchers/stats-fetcher.js
var import_axios2 = __toESM(require("axios"), 1);
var dotenv = __toESM(require("dotenv"), 1);
var import_github_username_regex = __toESM(require("github-username-regex"), 1);

// src/calculateRank.js
function exponential_cdf(x) {
  return 1 - 2 ** -x;
}
function log_normal_cdf(x) {
  return x / (1 + x);
}
function calculateRank({
  all_commits,
  commits,
  prs,
  issues,
  reviews,
  // eslint-disable-next-line no-unused-vars
  repos,
  // unused
  stars,
  followers,
}) {
  const COMMITS_MEDIAN = all_commits ? 1e3 : 250,
    COMMITS_WEIGHT = 2;
  const PRS_MEDIAN = 50,
    PRS_WEIGHT = 3;
  const ISSUES_MEDIAN = 25,
    ISSUES_WEIGHT = 1;
  const REVIEWS_MEDIAN = 2,
    REVIEWS_WEIGHT = 1;
  const STARS_MEDIAN = 50,
    STARS_WEIGHT = 4;
  const FOLLOWERS_MEDIAN = 10,
    FOLLOWERS_WEIGHT = 1;
  const TOTAL_WEIGHT =
    COMMITS_WEIGHT +
    PRS_WEIGHT +
    ISSUES_WEIGHT +
    REVIEWS_WEIGHT +
    STARS_WEIGHT +
    FOLLOWERS_WEIGHT;
  const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const LEVELS = ["S", "A+", "A", "A-", "B+", "B", "B-", "C+", "C"];
  const rank =
    1 -
    (COMMITS_WEIGHT * exponential_cdf(commits / COMMITS_MEDIAN) +
      PRS_WEIGHT * exponential_cdf(prs / PRS_MEDIAN) +
      ISSUES_WEIGHT * exponential_cdf(issues / ISSUES_MEDIAN) +
      REVIEWS_WEIGHT * exponential_cdf(reviews / REVIEWS_MEDIAN) +
      STARS_WEIGHT * log_normal_cdf(stars / STARS_MEDIAN) +
      FOLLOWERS_WEIGHT * log_normal_cdf(followers / FOLLOWERS_MEDIAN)) /
      TOTAL_WEIGHT;
  const level = LEVELS[THRESHOLDS.findIndex((t) => rank * 100 <= t)];
  return { level, percentile: rank * 100 };
}

// src/common/retryer.js
var PATs = Object.keys(process.env).filter((key) =>
  /PAT_\d*$/.exec(key),
).length;
var RETRIES = PATs ? PATs : 7;
var retryer = async (fetcher2, variables, retries = 0) => {
  if (retries > RETRIES) {
    throw new CustomError("Maximum retries exceeded", CustomError.MAX_RETRY);
  }
  try {
    let response = await fetcher2(
      variables,
      process.env[`PAT_${retries + 1}`],
      retries,
    );
    const isRateExceeded =
      response.data.errors && response.data.errors[0].type === "RATE_LIMITED";
    if (isRateExceeded) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      return retryer(fetcher2, variables, retries);
    }
    return response;
  } catch (err) {
    const isBadCredential =
      err.response.data && err.response.data.message === "Bad credentials";
    const isAccountSuspended =
      err.response.data &&
      err.response.data.message === "Sorry. Your account was suspended.";
    if (isBadCredential || isAccountSuspended) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      return retryer(fetcher2, variables, retries);
    } else {
      return err.response;
    }
  }
};

// src/fetchers/stats-fetcher.js
dotenv.config();
var GRAPHQL_REPOS_FIELD = `
  repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}, after: $after) {
    totalCount
    nodes {
      name
      stargazers {
        totalCount
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`;
var GRAPHQL_REPOS_QUERY = `
  query userInfo($login: String!, $after: String) {
    user(login: $login) {
      ${GRAPHQL_REPOS_FIELD}
    }
  }
`;
var GRAPHQL_STATS_QUERY = `
  query userInfo($login: String!, $after: String) {
    user(login: $login) {
      name
      login
      contributionsCollection {
        totalCommitContributions,
        totalPullRequestReviewContributions
      }
      repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        totalCount
      }
      pullRequests(first: 1) {
        totalCount
      }
      openIssues: issues(states: OPEN) {
        totalCount
      }
      closedIssues: issues(states: CLOSED) {
        totalCount
      }
      followers {
        totalCount
      }
      repositoryDiscussions {
        totalCount
      }
      repositoryDiscussionComments(onlyAnswers: true) {
        totalCount
      }
      ${GRAPHQL_REPOS_FIELD}
    }
  }
`;
var fetcher = (variables, token) => {
  const query = !variables.after ? GRAPHQL_STATS_QUERY : GRAPHQL_REPOS_QUERY;
  return request(
    {
      query,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    },
  );
};
var statsFetcher = async (username) => {
  let stats;
  let hasNextPage = true;
  let endCursor = null;
  while (hasNextPage) {
    const variables = { login: username, first: 100, after: endCursor };
    let res = await retryer(fetcher, variables);
    if (res.data.errors) return res;
    const repoNodes = res.data.data.user.repositories.nodes;
    if (!stats) {
      stats = res;
    } else {
      stats.data.data.user.repositories.nodes.push(...repoNodes);
    }
    const repoNodesWithStars = repoNodes.filter(
      (node) => node.stargazers.totalCount !== 0,
    );
    hasNextPage =
      process.env.FETCH_MULTI_PAGE_STARS === "true" &&
      repoNodes.length === repoNodesWithStars.length &&
      res.data.data.user.repositories.pageInfo.hasNextPage;
    endCursor = res.data.data.user.repositories.pageInfo.endCursor;
  }
  return stats;
};
var totalCommitsFetcher = async (username) => {
  if (!import_github_username_regex.default.test(username)) {
    logger.log("Invalid username");
    return 0;
  }
  const fetchTotalCommits = (variables, token) => {
    return (0, import_axios2.default)({
      method: "get",
      url: `https://api.github.com/search/commits?q=author:${variables.login}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `token ${token}`,
      },
    });
  };
  try {
    let res = await retryer(fetchTotalCommits, { login: username });
    let total_count = res.data.total_count;
    if (!!total_count && !isNaN(total_count)) {
      return res.data.total_count;
    }
  } catch (err) {
    logger.log(err);
  }
  return 0;
};
var fetchStats = async (
  username,
  include_all_commits = false,
  exclude_repo = [],
) => {
  if (!username) throw new MissingParamError(["username"]);
  const stats = {
    name: "",
    totalPRs: 0,
    totalReviews: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    totalDiscussionsStarted: 0,
    totalDiscussionsAnswered: 0,
    contributedTo: 0,
    rank: { level: "C", percentile: 100 },
  };
  let res = await statsFetcher(username);
  if (res.data.errors) {
    logger.error(res.data.errors);
    if (res.data.errors[0].type === "NOT_FOUND") {
      throw new CustomError(
        res.data.errors[0].message || "Could not fetch user.",
        CustomError.USER_NOT_FOUND,
      );
    }
    if (res.data.errors[0].message) {
      throw new CustomError(
        wrapTextMultiline(res.data.errors[0].message, 90, 1)[0],
        res.statusText,
      );
    }
    throw new CustomError(
      "Something went wrong while trying to retrieve the stats data using the GraphQL API.",
      CustomError.GRAPHQL_ERROR,
    );
  }
  const user = res.data.data.user;
  stats.name = user.name || user.login;
  if (include_all_commits) {
    stats.totalCommits = await totalCommitsFetcher(username);
  } else {
    stats.totalCommits = user.contributionsCollection.totalCommitContributions;
  }
  stats.totalPRs = user.pullRequests.totalCount;
  stats.totalReviews =
    user.contributionsCollection.totalPullRequestReviewContributions;
  stats.totalIssues = user.openIssues.totalCount + user.closedIssues.totalCount;
  stats.totalDiscussionsStarted = user.repositoryDiscussions.totalCount;
  stats.totalDiscussionsAnswered = user.repositoryDiscussionComments.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;
  let repoToHide = new Set(exclude_repo);
  stats.totalStars = user.repositories.nodes
    .filter((data) => {
      return !repoToHide.has(data.name);
    })
    .reduce((prev, curr) => {
      return prev + curr.stargazers.totalCount;
    }, 0);
  stats.rank = calculateRank({
    all_commits: include_all_commits,
    commits: stats.totalCommits,
    prs: stats.totalPRs,
    reviews: stats.totalReviews,
    issues: stats.totalIssues,
    repos: user.repositories.totalCount,
    stars: stats.totalStars,
    followers: user.followers.totalCount,
  });
  return stats;
};

// api/index.js
var api_default = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    hide_rank,
    show_icons,
    include_all_commits,
    line_height,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold,
    bg_color,
    theme,
    cache_seconds,
    exclude_repo,
    custom_title,
    locale,
    disable_animations,
    border_radius,
    number_format,
    border_color,
    rank_icon,
    show,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");
  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }
  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }
  try {
    const stats = await fetchStats(
      username,
      parseBoolean(include_all_commits),
      parseArray(exclude_repo),
    );
    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;
    res.setHeader(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    );
    return res.send(
      renderStatsCard(stats, {
        hide: parseArray(hide),
        show_icons: parseBoolean(show_icons),
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide_rank: parseBoolean(hide_rank),
        include_all_commits: parseBoolean(include_all_commits),
        line_height,
        title_color,
        ring_color,
        icon_color,
        text_color,
        text_bold: parseBoolean(text_bold),
        bg_color,
        theme,
        custom_title,
        border_radius,
        border_color,
        number_format,
        locale: locale ? locale.toLowerCase() : null,
        disable_animations: parseBoolean(disable_animations),
        rank_icon,
        show: parseArray(show),
      }),
    );
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
