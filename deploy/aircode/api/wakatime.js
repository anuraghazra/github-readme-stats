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

// api/wakatime.js
var wakatime_exports = {};
__export(wakatime_exports, {
  default: () => wakatime_default,
});
module.exports = __toCommonJS(wakatime_exports);

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
var lowercaseTrim = (name) => name.toLowerCase().trim();

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

// src/common/createProgressNode.js
var createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
  delay,
}) => {
  const progressPercentage = clampValue(progress, 2, 100);
  return `
    <svg width="${width}" x="${x}" y="${y}">
      <rect rx="5" ry="5" x="0" y="0" width="${width}" height="8" fill="${progressBarBackgroundColor}"></rect>
      <svg data-testid="lang-progress" width="${progressPercentage}%">
        <rect
            height="8"
            fill="${color}"
            rx="5" ry="5" x="0" y="0"
            class="lang-progress"
            style="animation-delay: ${delay}ms;"
        />
      </svg>
    </svg>
  `;
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

// src/translations.js
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
var wakatimeCardLocales = {
  "wakatimecard.title": {
    ar: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0648\u0627\u0643\u0627 \u062A\u0627\u064A\u0645",
    cn: "Wakatime \u5468\u7EDF\u8BA1",
    "zh-tw": "Wakatime \u5468\u7D71\u8A08",
    cs: "Statistiky Wakatime",
    de: "Wakatime Status",
    en: "Wakatime Stats",
    bn: "Wakatime \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8",
    es: "Estad\xEDsticas de Wakatime",
    fr: "Statistiques de Wakatime",
    hu: "Wakatime statisztika",
    it: "Statistiche Wakatime",
    ja: "Wakatime \u30EF\u30AB\u30BF\u30A4\u30E0\u7D71\u8A08",
    kr: "Wakatime \uC8FC\uAC04 \uD1B5\uACC4",
    nl: "Wakatime-statistieken",
    "pt-pt": "Estat\xEDsticas Wakatime",
    "pt-br": "Estat\xEDsticas Wakatime",
    np: "Wakatime \u0924\u0925\u094D\u092F\u093E .\u094D\u0915",
    el: "\u03A3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC Wakatime",
    ru: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 Wakatime",
    "uk-ua":
      "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 Wakatime",
    id: "Status Wakatime",
    ml: "\u0D35\u0D47\u0D15\u0D4D\u0D15\u0D4D \u0D1F\u0D48\u0D02 \u0D38\u0D4D\u0D25\u0D3F\u0D24\u0D3F\u0D35\u0D3F\u0D35\u0D30\u0D15\u0D4D\u0D15\u0D23\u0D15\u0D4D\u0D15\u0D41\u0D15\u0D7E",
    my: "Statistik Wakatime",
    sk: "Wakatime \u0161tatistika",
    tr: "Waketime \u0130statistikler",
    pl: "Statystyki Wakatime",
    vi: "Th\u1ED1ng K\xEA Wakatime",
    se: "Wakatime statistik",
  },
  "wakatimecard.lastyear": {
    ar: "\u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0645\u0627\u0636\u064A",
    cn: "\u53BB\u5E74",
    "zh-tw": "\u53BB\u5E74",
    cs: "Minul\xFD rok",
    de: "Letztes Jahr",
    en: "last year",
    bn: "\u0997\u09A4 \u09AC\u099B\u09B0",
    es: "El a\xF1o pasado",
    fr: "L'ann\xE9e derni\xE8re",
    hu: "Tavaly",
    it: "L'anno scorso",
    ja: "\u6628\u5E74",
    kr: "\uC791\uB144",
    nl: "Vorig jaar",
    "pt-pt": "Ano passado",
    "pt-br": "Ano passado",
    np: "\u0917\u0924 \u0935\u0930\u094D\u0937",
    el: "\u03A0\u03AD\u03C1\u03C5\u03C3\u03B9",
    ru: "\u0417\u0430 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0433\u043E\u0434",
    "uk-ua":
      "\u0417\u0430 \u043C\u0438\u043D\u0443\u043B\u0438\u0439 \u0440\u0456\u043A",
    id: "Tahun lalu",
    ml: "\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E \u0D35\u0D7C\u0D37\u0D02",
    my: "Tahun lepas",
    sk: "Minul\xFD rok",
    tr: "Ge\xE7en y\u0131l",
    pl: "W zesz\u0142ym roku",
    vi: "N\u0103m ngo\xE1i",
    se: "F\xF6rra \xE5ret",
  },
  "wakatimecard.last7days": {
    ar: "\u0622\u062E\u0631 7 \u0623\u064A\u0627\u0645",
    cn: "\u6700\u8FD1 7 \u5929",
    "zh-tw": "\u6700\u8FD1 7 \u5929",
    cs: "Posledn\xEDch 7 dn\xED",
    de: "Letzte 7 Tage",
    en: "last 7 days",
    bn: "\u0997\u09A4 \u09ED \u09A6\u09BF\u09A8",
    es: "\xDAltimos 7 d\xEDas",
    fr: "7 derniers jours",
    hu: "Elm\xFAlt 7 nap",
    it: "Ultimi 7 giorni",
    ja: "\u904E\u53BB 7 \u65E5\u9593",
    kr: "\uC9C0\uB09C 7 \uC77C",
    nl: "Afgelopen 7 dagen",
    "pt-pt": "\xDAltimos 7 dias",
    "pt-br": "\xDAltimos 7 dias",
    np: "\u0917\u0924 \u096D \u0926\u093F\u0928",
    el: "\u03A4\u03B5\u03BB\u03B5\u03C5\u03C4\u03B1\u03AF\u03B5\u03C2 7 \u03B7\u03BC\u03AD\u03C1\u03B5\u03C2",
    ru: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 7 \u0434\u043D\u0435\u0439",
    "uk-ua":
      "\u041E\u0441\u0442\u0430\u043D\u043D\u0456 7 \u0434\u043D\u0456\u0432",
    id: "7 hari terakhir",
    ml: "\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E 7 \u0D26\u0D3F\u0D35\u0D38\u0D02",
    my: "7 hari lepas",
    sk: "Posledn\xFDch 7 dn\xED",
    tr: "Son 7 g\xFCn",
    pl: "Ostatnie 7 dni",
    vi: "7 ng\xE0y qua",
    se: "Senaste 7 dagarna",
  },
  "wakatimecard.notpublic": {
    ar: "\u0645\u0644\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0639\u0627\u0645",
    cn: "Wakatime \u7528\u6237\u4E2A\u4EBA\u8D44\u6599\u672A\u516C\u5F00",
    "zh-tw":
      "Wakatime \u4F7F\u7528\u8005\u500B\u4EBA\u8CC7\u6599\u672A\u516C\u958B",
    cs: "Profil u\u017Eivatele Wakatime nen\xED ve\u0159ejn\xFD",
    de: "Wakatime-Benutzerprofil nicht \xF6ffentlich",
    en: "Wakatime user profile not public",
    bn: "Wakatime \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0\u09B0 \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09CD\u09AF \u09A8\u09DF",
    es: "Perfil de usuario de Wakatime no p\xFAblico",
    fr: "Profil utilisateur Wakatime non public",
    hu: "A Wakatime felhaszn\xE1l\xF3i profilja nem nyilv\xE1nos",
    it: "Profilo utente Wakatime non pubblico",
    ja: "Wakatime \u30E6\u30FC\u30B6\u30FC\u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u306F\u516C\u958B\u3055\u308C\u3066\u3044\u307E\u305B\u3093",
    kr: "Wakatime \uC0AC\uC6A9\uC790 \uD504\uB85C\uD544\uC774 \uACF5\uAC1C\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",
    nl: "Wakatime gebruikersprofiel niet openbaar",
    "pt-pt": "Perfil de usu\xE1rio Wakatime n\xE3o p\xFAblico",
    "pt-br": "Perfil de usu\xE1rio Wakatime n\xE3o p\xFAblico",
    np: "Wakatime \u092A\u094D\u0930\u092F\u094B\u0917\u0915\u0930\u094D\u0924\u093E \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u0938\u093E\u0930\u094D\u0935\u091C\u0928\u093F\u0915 \u091B\u0948\u0928",
    el: "\u03A4\u03BF \u03C0\u03C1\u03BF\u03C6\u03AF\u03BB \u03C7\u03C1\u03AE\u03C3\u03C4\u03B7 Wakatime \u03B4\u03B5\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B4\u03B7\u03BC\u03CC\u03C3\u03B9\u03BF",
    ru: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F Wakatime \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u0449\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u043C",
    "uk-ua":
      "\u041F\u0440\u043E\u0444\u0456\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 Wakatime \u043D\u0435 \u0454 \u043F\u0443\u0431\u043B\u0456\u0447\u043D\u0438\u043C",
    id: "Profil pengguna Wakatime tidak publik",
    ml: "Wakatime \u0D09\u0D2A\u0D2F\u0D4B\u0D15\u0D4D\u0D24\u0D43 \u0D2A\u0D4D\u0D30\u0D4A\u0D2B\u0D48\u0D7D \u0D2A\u0D4A\u0D24\u0D41\u0D35\u0D3E\u0D2F\u0D3F \u0D2A\u0D4D\u0D30\u0D38\u0D3F\u0D26\u0D4D\u0D27\u0D40\u0D15\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D2A\u0D4D\u0D2A\u0D46\u0D1F\u0D3E\u0D24\u0D4D\u0D24\u0D24\u0D3E\u0D23\u0D4D",
    my: "Profil pengguna Wakatime tidak awam",
    sk: "Profil pou\u017E\xEDvate\u013Ea Wakatime nie je verejn\xFD",
    tr: "Wakatime kullan\u0131c\u0131 profili herkese a\xE7\u0131k de\u011Fil",
    pl: "Profil u\u017Cytkownika Wakatime nie jest publiczny",
    vi: "H\u1ED3 s\u01A1 ng\u01B0\u1EDDi d\xF9ng Wakatime kh\xF4ng c\xF4ng khai",
    se: "Wakatime anv\xE4ndarprofil inte offentlig",
  },
  "wakatimecard.nocodedetails": {
    ar: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0627 \u064A\u0634\u0627\u0631\u0643 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0639\u0646 \u0627\u0644\u0628\u0631\u0645\u062C\u0629",
    cn: "\u7528\u6237\u4E0D\u516C\u5F00\u5206\u4EAB\u8BE6\u7EC6\u7684\u4EE3\u7801\u7EDF\u8BA1\u4FE1\u606F",
    "zh-tw":
      "\u4F7F\u7528\u8005\u4E0D\u516C\u958B\u5206\u4EAB\u8A73\u7D30\u7684\u7A0B\u5F0F\u78BC\u7D71\u8A08\u8CC7\u8A0A",
    cs: "U\u017Eivatel nesd\xEDl\xED podrobn\xE9 statistiky k\xF3du",
    de: "Benutzer teilt keine detaillierten Code-Statistiken",
    en: "User doesn't publicly share detailed code statistics",
    bn: "\u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0 \u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4 \u0995\u09CB\u09A1 \u09AA\u09B0\u09BF\u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09A8 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C7\u09A8 \u09A8\u09BE",
    es: "El usuario no comparte p\xFAblicamente estad\xEDsticas detalladas de c\xF3digo",
    fr: "L'utilisateur ne partage pas publiquement de statistiques de code d\xE9taill\xE9es",
    hu: "A felhaszn\xE1l\xF3 nem osztja meg nyilv\xE1nosan a r\xE9szletes k\xF3dstatisztik\xE1kat",
    it: "L'utente non condivide pubblicamente statistiche dettagliate sul codice",
    ja: "\u30E6\u30FC\u30B6\u30FC\u306F\u8A73\u7D30\u306A\u30B3\u30FC\u30C9\u7D71\u8A08\u3092\u516C\u958B\u3057\u307E\u305B\u3093",
    kr: "\uC0AC\uC6A9\uC790\uB294 \uC790\uC138\uD55C \uCF54\uB4DC \uD1B5\uACC4\uB97C \uACF5\uAC1C\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",
    nl: "Gebruiker deelt geen gedetailleerde code-statistieken",
    "pt-pt":
      "O utilizador n\xE3o partilha publicamente estat\xEDsticas detalhadas de c\xF3digo",
    "pt-br":
      "O usu\xE1rio n\xE3o compartilha publicamente estat\xEDsticas detalhadas de c\xF3digo",
    np: "\u092A\u094D\u0930\u092F\u094B\u0917\u0915\u0930\u094D\u0924\u093E \u0938\u093E\u0930\u094D\u0935\u091C\u0928\u093F\u0915 \u0930\u0942\u092A\u092E\u093E \u0935\u093F\u0938\u094D\u0924\u0943\u0924 \u0915\u094B\u0921 \u0924\u0925\u094D\u092F\u093E\u0919\u094D\u0915 \u0938\u093E\u091D\u093E \u0917\u0930\u094D\u0926\u0948\u0928",
    el: "\u039F \u03C7\u03C1\u03AE\u03C3\u03C4\u03B7\u03C2 \u03B4\u03B5\u03BD \u03B4\u03B7\u03BC\u03BF\u03C3\u03B9\u03B5\u03CD\u03B5\u03B9 \u03B4\u03B7\u03BC\u03CC\u03C3\u03B9\u03B1 \u03BB\u03B5\u03C0\u03C4\u03BF\u03BC\u03B5\u03C1\u03B5\u03AF\u03C2 \u03C3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03AD\u03C2 \u03BA\u03CE\u03B4\u03B9\u03BA\u03B1",
    ru: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0439 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u0434\u0430",
    "uk-ua":
      "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447 \u043D\u0435 \u043F\u0443\u0431\u043B\u0456\u043A\u0443\u0454 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0443 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443 \u043A\u043E\u0434\u0443",
    id: "Pengguna tidak membagikan statistik kode terperinci secara publik",
    ml: "\u0D09\u0D2A\u0D2F\u0D4B\u0D15\u0D4D\u0D24\u0D3E\u0D35\u0D4D \u0D2A\u0D4A\u0D24\u0D41\u0D35\u0D46 \u0D35\u0D3F\u0D36\u0D26\u0D40\u0D15\u0D30\u0D3F\u0D1A\u0D4D\u0D1A \u0D15\u0D4B\u0D21\u0D4D \u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D3E\u0D31\u0D4D\u0D31\u0D3F\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D3F\u0D15\u0D4D\u0D38\u0D4D \u0D2A\u0D19\u0D4D\u0D15\u0D3F\u0D1F\u0D41\u0D28\u0D4D\u0D28\u0D3F\u0D32\u0D4D\u0D32",
    my: "Pengguna tidak berkongsi statistik kod terperinci secara awam",
    sk: "Pou\u017E\xEDvate\u013E neposkytuje verejne podrobn\xE9 \u0161tatistiky k\xF3du",
    tr: "Kullan\u0131c\u0131 ayr\u0131nt\u0131l\u0131 kod istatistiklerini herkese a\xE7\u0131k olarak payla\u015Fm\u0131yor",
    pl: "U\u017Cytkownik nie udost\u0119pnia publicznie szczeg\xF3\u0142owych statystyk kodu",
    vi: "Ng\u01B0\u1EDDi d\xF9ng kh\xF4ng chia s\u1EBB th\u1ED1ng k\xEA m\xE3 chi ti\u1EBFt c\xF4ng khai",
    se: "Anv\xE4ndaren delar inte offentligt detaljerad kodstatistik",
  },
  "wakatimecard.nocodingactivity": {
    ar: "\u0644\u0627 \u064A\u0648\u062C\u062F \u0646\u0634\u0627\u0637 \u0628\u0631\u0645\u062C\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0623\u0633\u0628\u0648\u0639",
    cn: "\u672C\u5468\u6CA1\u6709\u7F16\u7A0B\u6D3B\u52A8",
    "zh-tw": "\u672C\u5468\u6C92\u6709\u7DE8\u7A0B\u6D3B\u52D5",
    cs: "Tento t\xFDden \u017E\xE1dn\xE1 aktivita v k\xF3dov\xE1n\xED",
    de: "Keine Aktivit\xE4ten in dieser Woche",
    en: "No coding activity this week",
    bn: "\u098F\u0987 \u09B8\u09AA\u09CD\u09A4\u09BE\u09B9\u09C7 \u0995\u09CB\u09A8 \u0995\u09CB\u09A1\u09BF\u0982 \u0985\u09CD\u09AF\u09BE\u0995\u09CD\u099F\u09BF\u09AD\u09BF\u099F\u09BF \u09A8\u09C7\u0987",
    es: "No hay actividad de codificaci\xF3n esta semana",
    fr: "Aucune activit\xE9 de codage cette semaine",
    hu: "Nem volt aktivit\xE1s ezen a h\xE9ten",
    it: "Nessuna attivit\xE0 in questa settimana",
    ja: "\u4ECA\u9031\u306E\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u6D3B\u52D5\u306F\u3042\u308A\u307E\u305B\u3093",
    kr: "\uC774\uBC88 \uC8FC \uC791\uC5C5\uB0B4\uC5ED \uC5C6\uC74C",
    nl: "Geen programmeeractiviteit deze week",
    "pt-pt": "Sem atividade esta semana",
    "pt-br": "Nenhuma atividade de codifica\xE7\xE3o esta semana",
    np: "\u092F\u0938 \u0939\u092A\u094D\u0924\u093E \u0915\u0941\u0928\u0948 \u0915\u094B\u0921\u093F\u0902\u0917 \u0917\u0924\u093F\u0935\u093F\u0927\u093F \u091B\u0948\u0928",
    el: "\u0394\u03B5\u03BD \u03C5\u03C0\u03AC\u03C1\u03C7\u03B5\u03B9 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03BA\u03CE\u03B4\u03B9\u03BA\u03B1 \u03B3\u03B9' \u03B1\u03C5\u03C4\u03AE \u03C4\u03B7\u03BD \u03B5\u03B2\u03B4\u03BF\u03BC\u03AC\u03B4\u03B1",
    ru: "\u041D\u0430 \u044D\u0442\u043E\u0439 \u043D\u0435\u0434\u0435\u043B\u0435 \u043D\u0435 \u0431\u044B\u043B\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438",
    "uk-ua":
      "\u041D\u0430 \u0446\u044C\u043E\u043C\u0443 \u0442\u0438\u0436\u043D\u0456 \u043D\u0435 \u0431\u0443\u043B\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0456",
    id: "Tidak ada aktivitas perkodingan minggu ini",
    ml: "\u0D08 \u0D06\u0D34\u0D4D\u0D1A \u0D15\u0D4B\u0D21\u0D3F\u0D02\u0D17\u0D4D \u0D2A\u0D4D\u0D30\u0D35\u0D7C\u0D24\u0D4D\u0D24\u0D28\u0D19\u0D4D\u0D19\u0D33\u0D4A\u0D28\u0D4D\u0D28\u0D41\u0D2E\u0D3F\u0D32\u0D4D\u0D32",
    my: "Tiada aktiviti pengekodan minggu ini",
    sk: "\u017Diadna k\xF3dovacia aktivita tento t\xFD\u017Ede\u0148",
    tr: "Bu hafta herhangi bir kod yazma aktivitesi olmad\u0131",
    pl: "Brak aktywno\u015Bci w tym tygodniu",
    uz: "Bu hafta faol bo'lmadi",
    vi: "Kh\xF4ng C\xF3 Ho\u1EA1t \u0110\u1ED9ng Trong Tu\u1EA7n N\xE0y",
    se: "Ingen aktivitet denna vecka",
  },
};
var availableLocales = Object.keys(repoCardLocales["repocard.archived"]);
var isLocaleAvailable = (locale) => {
  return availableLocales.includes(locale.toLowerCase());
};

// src/cards/wakatime-card.js

var languageColors = require("../common/languageColors.json");
var noCodingActivityNode = ({ color, text }) => {
  return `
    <text x="25" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
};
var createCompactLangNode = ({ lang, x, y }) => {
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
var createLanguageTextNode = ({ langs, y }) => {
  return langs.map((lang, index) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x: 25,
        y: 12.5 * index + y,
      });
    }
    return createCompactLangNode({
      lang,
      x: 230,
      y: 12.5 + 12.5 * index,
    });
  });
};
var createTextNode = ({
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
        // @ts-ignore
        name: label,
        progressBarBackgroundColor,
        delay: staggerDelay + 300,
      });
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      <text class="stat bold" y="12.5" data-testid="${id}">${label}:</text>
      <text
        class="stat"
        x="${hideProgress ? 170 : 350}"
        y="12.5"
      >${value}</text>
      ${cardProgress}
    </g>
  `;
};
var recalculatePercentages = (languages) => {
  const totalSum = languages.reduce(
    (totalSum2, language) => totalSum2 + language.percent,
    0,
  );
  const weight = +(100 / totalSum).toFixed(2);
  languages.forEach((language) => {
    language.percent = +(language.percent * weight).toFixed(2);
  });
};
var renderWakatimeCard = (stats = {}, options = { hide: [] }) => {
  let { languages = [] } = stats;
  const {
    hide_title = false,
    hide_border = false,
    hide,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    hide_progress,
    custom_title,
    locale,
    layout,
    langs_count = languages.length,
    border_radius,
    border_color,
  } = options;
  const shouldHideLangs = Array.isArray(hide) && hide.length > 0;
  if (shouldHideLangs) {
    const languagesToHide = new Set(hide.map((lang) => lowercaseTrim(lang)));
    languages = languages.filter(
      (lang) => !languagesToHide.has(lowercaseTrim(lang.name)),
    );
  }
  languages = languages.slice(0, langs_count);
  recalculatePercentages(languages);
  const i18n = new I18n({
    locale,
    translations: wakatimeCardLocales,
  });
  const lheight = parseInt(String(line_height), 10);
  const langsCount = clampValue(langs_count, 1, langs_count);
  const { titleColor, textColor, iconColor, bgColor, borderColor } =
    getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });
  const filteredLanguages = languages
    .filter((language) => language.hours || language.minutes)
    .slice(0, langsCount);
  let height = Math.max(45 + (filteredLanguages.length + 1) * lheight, 150);
  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
  });
  let finalLayout = "";
  let width = 440;
  if (layout === "compact") {
    width = width + 50;
    height = 90 + Math.round(filteredLanguages.length / 2) * 25;
    let progressOffset = 0;
    const compactProgressBar = filteredLanguages
      .map((language) => {
        const progress = ((width - 25) * language.percent) / 100;
        const languageColor = languageColors[language.name] || "#858585";
        const output = `
          <rect
            mask="url(#rect-mask)"
            data-testid="lang-progress"
            x="${progressOffset}"
            y="0"
            width="${progress}"
            height="8"
            fill="${languageColor}"
          />
        `;
        progressOffset += progress;
        return output;
      })
      .join("");
    finalLayout = `
      <mask id="rect-mask">
      <rect x="25" y="0" width="${width - 50}" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
      ${
        filteredLanguages.length
          ? createLanguageTextNode({
              y: 25,
              langs: filteredLanguages,
            }).join("")
          : noCodingActivityNode({
              // @ts-ignore
              color: textColor,
              text: !stats.is_coding_activity_visible
                ? i18n.t("wakatimecard.notpublic")
                : stats.is_other_usage_visible
                ? i18n.t("wakatimecard.nocodingactivity")
                : i18n.t("wakatimecard.nocodedetails"),
            })
      }
    `;
  } else {
    finalLayout = flexLayout({
      items: filteredLanguages.length
        ? filteredLanguages.map((language, index) => {
            return createTextNode({
              id: language.name,
              label: language.name,
              value: language.text,
              index,
              percent: language.percent,
              // @ts-ignore
              progressBarColor: titleColor,
              // @ts-ignore
              progressBarBackgroundColor: textColor,
              hideProgress: hide_progress,
            });
          })
        : [
            noCodingActivityNode({
              // @ts-ignore
              color: textColor,
              text: !stats.is_coding_activity_visible
                ? i18n.t("wakatimecard.notpublic")
                : stats.is_other_usage_visible
                ? i18n.t("wakatimecard.nocodingactivity")
                : i18n.t("wakatimecard.nocodedetails"),
            }),
          ],
      gap: lheight,
      direction: "column",
    }).join("");
  }
  let titleText = i18n.t("wakatimecard.title");
  switch (stats.range) {
    case "last_7_days":
      titleText += ` (${i18n.t("wakatimecard.last7days")})`;
      break;
    case "last_year":
      titleText += ` (${i18n.t("wakatimecard.lastyear")})`;
      break;
  }
  const card = new Card({
    customTitle: custom_title,
    defaultTitle: titleText,
    width: 495,
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
  card.setCSS(
    `
    ${cssStyles}
    @keyframes slideInAnimation {
      from {
        width: 0;
      }
      to {
        width: calc(100%-100px);
      }
    }
    @keyframes growWidthAnimation {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    #rect-mask rect{
      animation: slideInAnimation 1s ease-in-out forwards;
    }
    .lang-progress{
      animation: growWidthAnimation 0.6s ease-in-out forwards;
    }
    `,
  );
  return card.render(`
    <svg x="0" y="0" width="100%">
      ${finalLayout}
    </svg>
  `);
};

// src/fetchers/wakatime-fetcher.js
var import_axios2 = __toESM(require("axios"), 1);
var fetchWakatimeStats = async ({ username, api_domain }) => {
  if (!username) throw new MissingParamError(["username"]);
  try {
    const { data } = await import_axios2.default.get(
      `https://${
        api_domain ? api_domain.replace(/\/$/gi, "") : "wakatime.com"
      }/api/v1/users/${username}/stats?is_including_today=true`,
    );
    return data.data;
  } catch (err) {
    if (err.response.status < 200 || err.response.status > 299) {
      throw new CustomError(
        `Could not resolve to a User with the login of '${username}'`,
        "WAKATIME_USER_NOT_FOUND",
      );
    }
    throw err;
  }
};

// api/wakatime.js
var wakatime_default = async (req, res) => {
  const {
    username,
    title_color,
    icon_color,
    hide_border,
    line_height,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    hide_title,
    hide_progress,
    custom_title,
    locale,
    layout,
    langs_count,
    hide,
    api_domain,
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");
  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }
  try {
    const stats = await fetchWakatimeStats({ username, api_domain });
    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;
    if (!cache_seconds) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }
    res.setHeader(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    );
    return res.send(
      renderWakatimeCard(stats, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        hide: parseArray(hide),
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        hide_progress,
        border_radius,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
        layout,
        langs_count,
      }),
    );
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
