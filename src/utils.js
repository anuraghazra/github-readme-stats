const axios = require("axios");
const wrap = require("word-wrap");
const themes = require("../themes");

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
      <tspan x="25" dy="18">${message}</tspan>
      <tspan x="25" dy="18"  class="gray">${secondaryMessage}</tspan>
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

const isTest = process.env.NODE_ENV === "test";
const noop = () => {};
// return console instance based on the environment
const logger = isTest ? console : { log: noop, error: noop };
const getPrimaryLangSlug = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w[+#]\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "");
const CONSTANTS = {
  THIRTY_MINUTES: 1800,
  TWO_HOURS: 7200,
  ONE_DAY: 86400,
};

const chunk = (arr, size) =>
  arr.reduceRight((r, i, _, s) => (r.push(s.splice(0, size)), r), []);

const testPrimaryLanguage = [
  /* {
    stargazers: { totalCount: 41 },
    primaryLanguage: null
  } // comment out this when you need for empty list of primary language */
  { primaryLanguage: { name: "c++", color: "#f34b7d" } },
  { primaryLanguage: { name: "go", color: "#00ADD8" } },
  { primaryLanguage: { name: "javascript", color: "#f1e05a" } },
  { primaryLanguage: { name: "shell", color: "#89e051" } },
  { primaryLanguage: { name: "r", color: "#198CE7" } },
  { primaryLanguage: { name: "c", color: "#555555" } },
  { primaryLanguage: { name: "c#", color: "#178600" } },
  { primaryLanguage: { name: "java", color: "#b07219" } },
  { primaryLanguage: { name: "ruby", color: "#701516" } },
  { primaryLanguage: { name: "dotnet", color: "#cccccc" } },
  { primaryLanguage: { name: "haskell", color: "#5e5086" } },
  { primaryLanguage: { name: "html", color: "#e34c26" } },
  { primaryLanguage: { name: "swift", color: "#ffac45" } },
  { primaryLanguage: { name: "css", color: "#563d7c" } },
  { primaryLanguage: { name: "scala", color: "#c22d40" } },
  { primaryLanguage: { name: "matlab", color: "#e16737" } },
  { primaryLanguage: { name: "python", color: "#3572A5" } },
  { primaryLanguage: { name: "coffeescript", color: "#244776" } },
  { primaryLanguage: { name: "erlang", color: "#B83998" } },
  { primaryLanguage: { name: "php", color: "#4F5D95" } },
  { primaryLanguage: { name: "powershell", color: "#012456" } },
  { primaryLanguage: { name: "dart", color: "#00B4AB" } },
  { primaryLanguage: { name: "julia", color: "#a270ba" } },
  { primaryLanguage: { name: "docker", color: "#cccccc" } },
  { primaryLanguage: { name: "ngnix", color: "#cccccc" } },
  { primaryLanguage: { name: "jenkins", color: "#cccccc" } },
  { primaryLanguage: { name: "markdown", color: "#cccccc" } },
  { primaryLanguage: { name: "vim-script", color: "#199f4b" } },
  { primaryLanguage: { name: "common-lisp", color: "#3fb68b" } },
  { primaryLanguage: { name: "emacs-lisp", color: "#c065db" } },
  { primaryLanguage: { name: "groovy", color: "#e69f56" } },
  { primaryLanguage: { name: "perl", color: "#0298c3" } },
  { primaryLanguage: { name: "prolog", color: "#74283c" } },
  { primaryLanguage: { name: "lua", color: "#000080" } },
  { primaryLanguage: { name: "elixir", color: "#6e4a7e" } },
  { primaryLanguage: { name: "elm", color: "#60B5CC" } },
  { primaryLanguage: { name: "f#", color: "#b845fc" } },
  { primaryLanguage: { name: "ocaml", color: "#3be133" } },
  { primaryLanguage: { name: "racket", color: "#3c5caa" } },
  { primaryLanguage: { name: "smalltalk", color: "#596706" } },
];

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
  getPrimaryLangSlug,
  chunk,
  logger,
  CONSTANTS,
  testPrimaryLanguage,
};
