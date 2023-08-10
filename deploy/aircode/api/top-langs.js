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

// api/top-langs.js
var top_langs_exports = {};
__export(top_langs_exports, {
  default: () => top_langs_default,
});
module.exports = __toCommonJS(top_langs_exports);

// src/getStyles.js
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
var lowercaseTrim = (name) => name.toLowerCase().trim();
var chunkArray = (arr, perChunk) => {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
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
var langCardLocales = {
  "langcard.title": {
    ar: "\u0623\u0643\u062B\u0631 \u0627\u0644\u0644\u063A\u0627\u062A \u0625\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u064B",
    cn: "\u6700\u5E38\u7528\u7684\u8BED\u8A00",
    "zh-tw": "\u6700\u5E38\u7528\u7684\u8A9E\u8A00",
    cs: "Nejpou\u017E\xEDvan\u011Bj\u0161\xED jazyky",
    de: "Meist verwendete Sprachen",
    bn: "\u09B8\u09B0\u09CD\u09AC\u09BE\u09A7\u09BF\u0995 \u09AC\u09CD\u09AF\u09AC\u09B9\u09C3\u09A4 \u09AD\u09BE\u09B7\u09BE \u09B8\u09AE\u09C2\u09B9",
    en: "Most Used Languages",
    es: "Lenguajes m\xE1s usados",
    fr: "Langages les plus utilis\xE9s",
    hu: "Leggyakrabban haszn\xE1lt nyelvek",
    it: "Linguaggi pi\xF9 utilizzati",
    ja: "\u6700\u3082\u3088\u304F\u4F7F\u3063\u3066\u3044\u308B\u8A00\u8A9E",
    kr: "\uAC00\uC7A5 \uB9CE\uC774 \uC0AC\uC6A9\uB41C \uC5B8\uC5B4",
    nl: "Meest gebruikte talen",
    "pt-pt": "Idiomas mais usados",
    "pt-br": "Linguagens mais usadas",
    np: "\u0905\u0927\u093F\u0915 \u092A\u094D\u0930\u092F\u094B\u0917 \u0917\u0930\u093F\u090F\u0915\u094B \u092D\u093E\u0937\u093E\u0939\u0930\u0942",
    el: "\u039F\u03B9 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03BF \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03BF\u03CD\u03BC\u03B5\u03BD\u03B5\u03C2 \u03B3\u03BB\u03CE\u03C3\u03C3\u03B5\u03C2",
    ru: "\u041D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u0447\u0430\u0441\u0442\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0435 \u044F\u0437\u044B\u043A\u0438",
    "uk-ua":
      "\u041D\u0430\u0439\u0447\u0430\u0441\u0442\u0456\u0448\u0435 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u043D\u0456 \u043C\u043E\u0432\u0438",
    id: "Bahasa Yang Paling Banyak Digunakan",
    ml: "\u0D15\u0D42\u0D1F\u0D41\u0D24\u0D7D \u0D09\u0D2A\u0D2F\u0D4B\u0D17\u0D3F\u0D1A\u0D4D\u0D1A \u0D2D\u0D3E\u0D37\u0D15\u0D7E",
    my: "Bahasa Paling Digunakan",
    sk: "Najviac pou\u017E\xEDvan\xE9 jazyky",
    tr: "En \xC7ok Kullan\u0131lan Diller",
    pl: "Najcz\u0119\u015Bciej u\u017Cywane j\u0119zyki",
    vi: "Ng\xF4n Ng\u1EEF Th\u01B0\u1EDDng S\u1EED D\u1EE5ng",
    se: "Mest anv\xE4nda spr\xE5ken",
  },
  "langcard.nodata": {
    ar: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u063A\u0627\u062A.",
    cn: "\u6C92\u6709\u8A9E\u8A00\u6578\u64DA\u3002",
    "zh-tw": "\u6C92\u6709\u8A9E\u8A00\u6578\u64DA\u3002",
    cs: "\u017D\xE1dn\xE9 jazykov\xE9 \xFAdaje.",
    de: "Keine Sprachdaten.",
    bn: "\u0995\u09CB\u09A8 \u09AD\u09BE\u09B7\u09BE\u09B0 \u09A1\u09C7\u099F\u09BE \u09A8\u09C7\u0987\u0964",
    en: "No languages data.",
    es: "Sin datos de idiomas.",
    fr: "Aucune donn\xE9e sur les langues.",
    hu: "Nincsenek nyelvi adatok.",
    it: "Nessun dato sulle lingue.",
    ja: "\u8A00\u8A9E\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
    kr: "\uC5B8\uC5B4 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
    nl: "Ingen sprogdata.",
    "pt-pt": "Sem dados de idiomas.",
    "pt-br": "Sem dados de idiomas.",
    np: "\u0915\u0941\u0928\u0948 \u092D\u093E\u0937\u093E \u0921\u093E\u091F\u093E \u091B\u0948\u0928\u0964",
    el: "\u0394\u03B5\u03BD \u03C5\u03C0\u03AC\u03C1\u03C7\u03BF\u03C5\u03BD \u03B4\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03B1 \u03B3\u03BB\u03C9\u03C3\u03C3\u03CE\u03BD.",
    ru: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u044F\u0437\u044B\u043A\u0430\u0445.",
    "uk-ua":
      "\u041D\u0435\u043C\u0430\u0454 \u0434\u0430\u043D\u0438\u0445 \u043F\u0440\u043E \u043C\u043E\u0432\u0438.",
    id: "Tidak ada data bahasa.",
    ml: "\u0D2D\u0D3E\u0D37\u0D3E \u0D21\u0D3E\u0D31\u0D4D\u0D31\u0D2F\u0D3F\u0D32\u0D4D\u0D32.",
    my: "Tiada data bahasa.",
    sk: "\u017Diadne \xFAdaje o jazykoch.",
    tr: "Dil verisi yok.",
    pl: "Brak danych dotycz\u0105cych j\u0119zyk\xF3w.",
    vi: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u ng\xF4n ng\u1EEF.",
    se: "Inga spr\xE5kdata.",
  },
};
var availableLocales = Object.keys(repoCardLocales["repocard.archived"]);
var isLocaleAvailable = (locale) => {
  return availableLocales.includes(locale.toLowerCase());
};

// src/cards/top-languages-card.js
var DEFAULT_CARD_WIDTH = 300;
var MIN_CARD_WIDTH = 280;
var DEFAULT_LANG_COLOR = "#858585";
var CARD_PADDING = 25;
var COMPACT_LAYOUT_BASE_HEIGHT = 90;
var MAXIMUM_LANGS_COUNT = 20;
var NORMAL_LAYOUT_DEFAULT_LANGS_COUNT = 5;
var COMPACT_LAYOUT_DEFAULT_LANGS_COUNT = 6;
var DONUT_LAYOUT_DEFAULT_LANGS_COUNT = 5;
var PIE_LAYOUT_DEFAULT_LANGS_COUNT = 6;
var DONUT_VERTICAL_LAYOUT_DEFAULT_LANGS_COUNT = 6;
var getLongestLang = (arr) =>
  arr.reduce(
    (savedLang, lang) =>
      lang.name.length > savedLang.name.length ? lang : savedLang,
    { name: "", size: 0, color: "" },
  );
var degreesToRadians = (angleInDegrees) => angleInDegrees * (Math.PI / 180);
var polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const rads = degreesToRadians(angleInDegrees);
  return {
    x: centerX + radius * Math.cos(rads),
    y: centerY + radius * Math.sin(rads),
  };
};
var getCircleLength = (radius) => {
  return 2 * Math.PI * radius;
};
var calculateCompactLayoutHeight = (totalLangs) => {
  return COMPACT_LAYOUT_BASE_HEIGHT + Math.round(totalLangs / 2) * 25;
};
var calculateNormalLayoutHeight = (totalLangs) => {
  return 45 + (totalLangs + 1) * 40;
};
var calculateDonutLayoutHeight = (totalLangs) => {
  return 215 + Math.max(totalLangs - 5, 0) * 32;
};
var calculateDonutVerticalLayoutHeight = (totalLangs) => {
  return 300 + Math.round(totalLangs / 2) * 25;
};
var calculatePieLayoutHeight = (totalLangs) => {
  return 300 + Math.round(totalLangs / 2) * 25;
};
var donutCenterTranslation = (totalLangs) => {
  return -45 + Math.max(totalLangs - 5, 0) * 16;
};
var trimTopLanguages = (topLangs, langs_count, hide) => {
  let langs = Object.values(topLangs);
  let langsToHide = {};
  let langsCount = clampValue(langs_count, 1, MAXIMUM_LANGS_COUNT);
  if (hide) {
    hide.forEach((langName) => {
      langsToHide[lowercaseTrim(langName)] = true;
    });
  }
  langs = langs
    .sort((a, b) => b.size - a.size)
    .filter((lang) => {
      return !langsToHide[lowercaseTrim(lang.name)];
    })
    .slice(0, langsCount);
  const totalLanguageSize = langs.reduce((acc, curr) => acc + curr.size, 0);
  return { langs, totalLanguageSize };
};
var createProgressTextNode = ({ width, color, name, progress, index }) => {
  const staggerDelay = (index + 3) * 150;
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
      <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
      ${createProgressNode({
        x: 0,
        y: 25,
        color,
        width: progressWidth,
        progress,
        progressBarBackgroundColor: "#ddd",
        delay: staggerDelay + 300,
      })}
    </g>
  `;
};
var createCompactLangNode = ({ lang, totalSize, hideProgress, index }) => {
  const percentage = ((lang.size / totalSize) * 100).toFixed(2);
  const staggerDelay = (index + 3) * 150;
  const color = lang.color || "#858585";
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} ${hideProgress ? "" : percentage + "%"}
      </text>
    </g>
  `;
};
var createLanguageTextNode = ({ langs, totalSize, hideProgress }) => {
  const longestLang = getLongestLang(langs);
  const chunked = chunkArray(langs, langs.length / 2);
  const layouts = chunked.map((array) => {
    const items = array.map((lang, index) =>
      createCompactLangNode({
        lang,
        totalSize,
        hideProgress,
        index,
      }),
    );
    return flexLayout({
      items,
      gap: 25,
      direction: "column",
    }).join("");
  });
  const percent = ((longestLang.size / totalSize) * 100).toFixed(2);
  const minGap = 150;
  const maxGap = 20 + measureText(`${longestLang.name} ${percent}%`, 11);
  return flexLayout({
    items: layouts,
    gap: maxGap < minGap ? minGap : maxGap,
  }).join("");
};
var createDonutLanguagesNode = ({ langs, totalSize }) => {
  return flexLayout({
    items: langs.map((lang, index) => {
      return createCompactLangNode({
        lang,
        totalSize,
        hideProgress: false,
        index,
      });
    }),
    gap: 32,
    direction: "column",
  }).join("");
};
var renderNormalLayout = (langs, width, totalLanguageSize) => {
  return flexLayout({
    items: langs.map((lang, index) => {
      return createProgressTextNode({
        width,
        name: lang.name,
        color: lang.color || DEFAULT_LANG_COLOR,
        progress: ((lang.size / totalLanguageSize) * 100).toFixed(2),
        index,
      });
    }),
    gap: 40,
    direction: "column",
  }).join("");
};
var renderCompactLayout = (langs, width, totalLanguageSize, hideProgress) => {
  const paddingRight = 50;
  const offsetWidth = width - paddingRight;
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
  ${
    !hideProgress
      ? `
  <mask id="rect-mask">
      <rect x="0" y="0" width="${offsetWidth}" height="8" fill="white" rx="5"/>
    </mask>
    ${compactProgressBar}
  `
      : ""
  }
    <g transform="translate(0, ${hideProgress ? "0" : "25"})">
      ${createLanguageTextNode({
        langs,
        totalSize: totalLanguageSize,
        hideProgress,
      })}
    </g>
  `;
};
var renderDonutVerticalLayout = (langs, totalLanguageSize) => {
  const radius = 80;
  const totalCircleLength = getCircleLength(radius);
  let circles = [];
  let indent = 0;
  let startDelayCoefficient = 1;
  for (const lang of langs) {
    const percentage = (lang.size / totalLanguageSize) * 100;
    const circleLength = totalCircleLength * (percentage / 100);
    const delay = startDelayCoefficient * 100;
    circles.push(`
      <g class="stagger" style="animation-delay: ${delay}ms">
        <circle 
          cx="150"
          cy="100"
          r="${radius}"
          fill="transparent"
          stroke="${lang.color}"
          stroke-width="25"
          stroke-dasharray="${totalCircleLength}"
          stroke-dashoffset="${indent}"
          size="${percentage}"
          data-testid="lang-donut"
        />
      </g>
    `);
    indent += circleLength;
    startDelayCoefficient += 1;
  }
  return `
    <svg data-testid="lang-items">
      <g transform="translate(0, 0)">
        <svg data-testid="donut">
          ${circles.join("")}
        </svg>
      </g>
      <g transform="translate(0, 220)">
        <svg data-testid="lang-names" x="${CARD_PADDING}">
          ${createLanguageTextNode({
            langs,
            totalSize: totalLanguageSize,
            hideProgress: false,
          })}
        </svg>
      </g>
    </svg>
  `;
};
var renderPieLayout = (langs, totalLanguageSize) => {
  const radius = 90;
  const centerX = 150;
  const centerY = 100;
  let startAngle = 0;
  let startDelayCoefficient = 1;
  const paths = [];
  for (const lang of langs) {
    if (langs.length === 1) {
      paths.push(`
        <circle
          cx="${centerX}"
          cy="${centerY}"
          r="${radius}"
          stroke="none"
          fill="${lang.color}"
          data-testid="lang-pie"
          size="100"
        />
      `);
      break;
    }
    const langSizePart = lang.size / totalLanguageSize;
    const percentage = langSizePart * 100;
    const angle = langSizePart * 360;
    const endAngle = startAngle + angle;
    const startPoint = polarToCartesian(centerX, centerY, radius, startAngle);
    const endPoint = polarToCartesian(centerX, centerY, radius, endAngle);
    const largeArcFlag = angle > 180 ? 1 : 0;
    const delay = startDelayCoefficient * 100;
    paths.push(`
      <g class="stagger" style="animation-delay: ${delay}ms">
        <path
          data-testid="lang-pie"
          size="${percentage}"
          d="M ${centerX} ${centerY} L ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y} Z"
          fill="${lang.color}"
        />
      </g>
    `);
    startAngle = endAngle;
    startDelayCoefficient += 1;
  }
  return `
    <svg data-testid="lang-items">
      <g transform="translate(0, 0)">
        <svg data-testid="pie">
          ${paths.join("")}
        </svg>
      </g>
      <g transform="translate(0, 220)">
        <svg data-testid="lang-names" x="${CARD_PADDING}">
          ${createLanguageTextNode({
            langs,
            totalSize: totalLanguageSize,
            hideProgress: false,
          })}
        </svg>
      </g>
    </svg>
  `;
};
var createDonutPaths = (cx, cy, radius, percentages) => {
  const paths = [];
  let startAngle = 0;
  let endAngle = 0;
  const totalPercent = percentages.reduce((acc, curr) => acc + curr, 0);
  for (let i = 0; i < percentages.length; i++) {
    const tmpPath = {};
    let percent = parseFloat(
      ((percentages[i] / totalPercent) * 100).toFixed(2),
    );
    endAngle = 3.6 * percent + startAngle;
    const startPoint = polarToCartesian(cx, cy, radius, endAngle - 90);
    const endPoint = polarToCartesian(cx, cy, radius, startAngle - 90);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    tmpPath.percent = percent;
    tmpPath.d = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArc} 0 ${endPoint.x} ${endPoint.y}`;
    paths.push(tmpPath);
    startAngle = endAngle;
  }
  return paths;
};
var renderDonutLayout = (langs, width, totalLanguageSize) => {
  const centerX = width / 3;
  const centerY = width / 3;
  const radius = centerX - 60;
  const strokeWidth = 12;
  const colors = langs.map((lang) => lang.color);
  const langsPercents = langs.map((lang) =>
    parseFloat(((lang.size / totalLanguageSize) * 100).toFixed(2)),
  );
  const langPaths = createDonutPaths(centerX, centerY, radius, langsPercents);
  const donutPaths =
    langs.length === 1
      ? `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${colors[0]}" fill="none" stroke-width="${strokeWidth}" data-testid="lang-donut" size="100"/>`
      : langPaths
          .map((section, index) => {
            const staggerDelay = (index + 3) * 100;
            const delay = staggerDelay + 300;
            const output = `
       <g class="stagger" style="animation-delay: ${delay}ms">
        <path
          data-testid="lang-donut"
          size="${section.percent}"
          d="${section.d}"
          stroke="${colors[index]}"
          fill="none"
          stroke-width="${strokeWidth}">
        </path>
      </g>
      `;
            return output;
          })
          .join("");
  const donut = `<svg width="${width}" height="${width}">${donutPaths}</svg>`;
  return `
    <g transform="translate(0, 0)">
      <g transform="translate(0, 0)">
        ${createDonutLanguagesNode({ langs, totalSize: totalLanguageSize })}
      </g>

      <g transform="translate(125, ${donutCenterTranslation(langs.length)})">
        ${donut}
      </g>
    </g>
  `;
};
var noLanguagesDataNode = ({ color, text, layout }) => {
  return `
    <text x="${
      layout === "pie" || layout === "donut-vertical" ? CARD_PADDING : 0
    }" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
};
var getDefaultLanguagesCountByLayout = ({ layout, hide_progress }) => {
  if (layout === "compact" || hide_progress === true) {
    return COMPACT_LAYOUT_DEFAULT_LANGS_COUNT;
  } else if (layout === "donut") {
    return DONUT_LAYOUT_DEFAULT_LANGS_COUNT;
  } else if (layout === "donut-vertical") {
    return DONUT_VERTICAL_LAYOUT_DEFAULT_LANGS_COUNT;
  } else if (layout === "pie") {
    return PIE_LAYOUT_DEFAULT_LANGS_COUNT;
  } else {
    return NORMAL_LAYOUT_DEFAULT_LANGS_COUNT;
  }
};
var renderTopLanguages = (topLangs, options = {}) => {
  const {
    hide_title = false,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide,
    hide_progress,
    theme,
    layout,
    custom_title,
    locale,
    langs_count = getDefaultLanguagesCountByLayout({ layout, hide_progress }),
    border_radius,
    border_color,
    disable_animations,
  } = options;
  const i18n = new I18n({
    locale,
    translations: langCardLocales,
  });
  const { langs, totalLanguageSize } = trimTopLanguages(
    topLangs,
    langs_count,
    hide,
  );
  let width = card_width
    ? isNaN(card_width)
      ? DEFAULT_CARD_WIDTH
      : card_width < MIN_CARD_WIDTH
      ? MIN_CARD_WIDTH
      : card_width
    : DEFAULT_CARD_WIDTH;
  let height = calculateNormalLayoutHeight(langs.length);
  const colors = getCardColors({
    title_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });
  let finalLayout = "";
  if (langs.length === 0) {
    height = COMPACT_LAYOUT_BASE_HEIGHT;
    finalLayout = noLanguagesDataNode({
      color: colors.textColor,
      text: i18n.t("langcard.nodata"),
      layout,
    });
  } else if (layout === "pie") {
    height = calculatePieLayoutHeight(langs.length);
    finalLayout = renderPieLayout(langs, totalLanguageSize);
  } else if (layout === "donut-vertical") {
    height = calculateDonutVerticalLayoutHeight(langs.length);
    finalLayout = renderDonutVerticalLayout(langs, totalLanguageSize);
  } else if (layout === "compact" || hide_progress == true) {
    height =
      calculateCompactLayoutHeight(langs.length) + (hide_progress ? -25 : 0);
    finalLayout = renderCompactLayout(
      langs,
      width,
      totalLanguageSize,
      hide_progress,
    );
  } else if (layout === "donut") {
    height = calculateDonutLayoutHeight(langs.length);
    width = width + 50;
    finalLayout = renderDonutLayout(langs, width, totalLanguageSize);
  } else {
    finalLayout = renderNormalLayout(langs, width, totalLanguageSize);
  }
  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("langcard.title"),
    width,
    height,
    border_radius,
    colors,
  });
  if (disable_animations) card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(
    `
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
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${colors.textColor};
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .bold { font-weight: 700 }
    .lang-name {
      font: 400 11px "Segoe UI", Ubuntu, Sans-Serif;
      fill: ${colors.textColor};
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    #rect-mask rect{
      animation: slideInAnimation 1s ease-in-out forwards;
    }
    .lang-progress{
      animation: growWidthAnimation 0.6s ease-in-out forwards;
    }
    `,
  );
  if (layout === "pie" || layout === "donut-vertical") {
    return card.render(finalLayout);
  }
  return card.render(`
    <svg data-testid="lang-items" x="${CARD_PADDING}">
      ${finalLayout}
    </svg>
  `);
};

// src/common/blacklist.js
var blacklist = ["renovate-bot", "technote-space", "sw-yx"];

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

// src/fetchers/top-languages-fetcher.js
var fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `token ${token}`,
    },
  );
};
var fetchTopLanguages = async (
  username,
  exclude_repo = [],
  size_weight = 1,
  count_weight = 0,
) => {
  if (!username) throw new MissingParamError(["username"]);
  const res = await retryer(fetcher, { login: username });
  if (res.data.errors) {
    logger.error(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }
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
      "Something went while trying to retrieve the language data using the GraphQL API.",
      CustomError.GRAPHQL_ERROR,
    );
  }
  let repoNodes = res.data.data.user.repositories.nodes;
  let repoToHide = {};
  if (exclude_repo) {
    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }
  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((name) => !repoToHide[name.name]);
  let repoCount = 0;
  repoNodes = repoNodes
    .filter((node) => node.languages.edges.length > 0)
    .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
    .reduce((acc, prev) => {
      let langSize = prev.size;
      if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
        langSize = prev.size + acc[prev.node.name].size;
        repoCount += 1;
      } else {
        repoCount = 1;
      }
      return {
        ...acc,
        [prev.node.name]: {
          name: prev.node.name,
          color: prev.node.color,
          size: langSize,
          count: repoCount,
        },
      };
    }, {});
  Object.keys(repoNodes).forEach((name) => {
    repoNodes[name].size =
      Math.pow(repoNodes[name].size, size_weight) *
      Math.pow(repoNodes[name].count, count_weight);
  });
  const topLangs = Object.keys(repoNodes)
    .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});
  return topLangs;
};

// api/top-langs.js
var top_langs_default = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout,
    langs_count,
    exclude_repo,
    size_weight,
    count_weight,
    custom_title,
    locale,
    border_radius,
    border_color,
    disable_animations,
    hide_progress,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");
  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }
  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Locale not found"));
  }
  if (
    layout !== void 0 &&
    (typeof layout !== "string" ||
      !["compact", "normal", "donut", "donut-vertical", "pie"].includes(layout))
  ) {
    return res.send(
      renderError("Something went wrong", "Incorrect layout input"),
    );
  }
  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
      size_weight,
      count_weight,
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
      renderTopLanguages(topLangs, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        title_color,
        text_color,
        bg_color,
        theme,
        layout,
        langs_count,
        border_radius,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
        disable_animations: parseBoolean(disable_animations),
        hide_progress: parseBoolean(hide_progress),
      }),
    );
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
