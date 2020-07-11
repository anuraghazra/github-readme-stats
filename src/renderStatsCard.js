const { kFormatter } = require("../src/utils");

const createTextNode = ({ icon, label, value, lineHeight, id }) => {
  const classname = icon === "★" && "star-icon";
  const kValue = kFormatter(value);
  return `
    <tspan x="25" dy="${lineHeight}" class="stat bold">
    <tspan data-testid="icon" class="icon ${classname}" fill="#4C71F2">${icon}</tspan> ${label}:</tspan>
    <tspan data-testid="${id}" x="155" dy="0" class="stat">${kValue}</tspan>
  `;
};

const renderStatsCard = (stats = {}, options = { hide: [] }) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    contributedTo,
  } = stats;
  const {
    hide = [],
    show_icons = false,
    hide_border = false,
    line_height = 25,
  } = options;

  const lheight = parseInt(line_height);

  const STAT_MAP = {
    stars: createTextNode({
      icon: "★",
      label: "Total Stars",
      value: totalStars,
      lineHeight: lheight,
      id: "stars",
    }),
    commits: createTextNode({
      icon: "🕗",
      label: "Total Commits",
      value: totalCommits,
      lineHeight: lheight,
      id: "commits",
    }),
    prs: createTextNode({
      icon: "🔀",
      label: "Total PRs",
      value: totalPRs,
      lineHeight: lheight,
      id: "prs",
    }),
    issues: createTextNode({
      icon: "ⓘ",
      label: "Total Issues",
      value: totalIssues,
      lineHeight: lheight,
      id: "issues",
    }),
    contribs: createTextNode({
      icon: "📕",
      label: "Contributed to",
      value: contributedTo,
      lineHeight: lheight,
      id: "contribs",
    }),
  };

  const statItems = Object.keys(STAT_MAP)
    .filter((key) => !hide.includes(key))
    .map((key) => STAT_MAP[key]);

  const height = 45 + (statItems.length + 1) * lheight;

  const border = `<rect data-testid="card-border" x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>`;
  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
      .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333 }
      .star-icon { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; }
      .bold { font-weight: 700 }
      .icon {
        display: ${!!show_icons ? "block" : "none"};
      }
      </style>
      ${hide_border ? "" : border}
     
      <text x="25" y="35" class="header">${name}'s GitHub Stats</text>
      <text y="45">
        ${statItems.toString().replace(/\,/gm, "")}
      </text>
    </svg>
  `;
};

module.exports = renderStatsCard;
