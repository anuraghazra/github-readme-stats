const { kFormatter, isValidHexColor } = require("../src/utils");

const createTextNode = ({ icon, label, value, id, index, lineHeight }) => {
  const classname = icon === "★" && "star-icon";
  const kValue = kFormatter(value);
  // manually calculating lineHeight based on index instead of using <tspan dy="" />
  // to fix firefox layout bug
  return `
    <text x="25" y="${lineHeight * (index + 1)}">
      <tspan dx="0" data-testid="icon" class="icon ${classname}">${icon}</tspan>   
      <tspan dx="0" class="stat bold">
       ${label}:
      </tspan>
      <tspan x="160" data-testid="${id}" class="stat">${kValue}</tspan>
    </text>
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
    rank,
  } = stats;
  const {
    hide = [],
    show_icons = false,
    hide_border = false,
    hide_rank = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
  } = options;

  const lheight = parseInt(line_height);

  const titleColor =
    (isValidHexColor(title_color) && `#${title_color}`) || "#2f80ed";
  const iconColor =
    (isValidHexColor(icon_color) && `#${icon_color}`) || "#4c71f2";
  const textColor = (isValidHexColor(text_color) && `#${text_color}`) || "#333";
  const bgColor = (isValidHexColor(bg_color) && `#${bg_color}`) || "#FFFEFE";

  const STATS = {
    stars: {
      icon: "★",
      label: "Total Stars",
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: "🕗",
      label: "Total Commits",
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: "🔀",
      label: "Total PRs",
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: "ⓘ",
      label: "Total Issues",
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: "📕",
      label: "Contributed to",
      value: contributedTo,
      id: "contribs",
    },
  };

  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({ ...STATS[key], index, lineHeight: lheight })
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  const height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150
  );

  const border = `
    <rect 
      data-testid="card-border"
      x="0.5"
      y="0.5"
      width="494"
      height="99%"
      rx="4.5"
      fill="${bgColor}"
      stroke="#E4E2E2"
    />
  `;

  const rankProgress = 180 + rank.score * 0.8;
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle" transform="translate(400, ${
        height / 1.85
      })">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <text
          x="0"
          y="0"
          alignment-baseline="central"
          dominant-baseline="central"
          text-anchor="middle"
          class="rank-text"
          transform="translate(-5, 5)"
        >
          ${rank.level}
        </text>
      </g>`;

  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; }
      .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
      .rank-text { font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
      .star-icon { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; }
      .bold { font-weight: 700 }
      .icon {
        fill: ${iconColor};
        display: ${!!show_icons ? "block" : "none"};
      }
      .rank-circle-rim {
        stroke: ${titleColor};
        fill: none;
        stroke-width: 6;
        opacity: 0.2;
      }
      .rank-circle {
        stroke-dashoffset: 30;
        stroke-dasharray: ${rankProgress};
        stroke: ${titleColor};
        fill: none;
        stroke-width: 6;
        stroke-linecap: round;
        opacity: 0.8;
        transform-origin: -10px 8px;
        transform: rotate(-90deg);
      }
      </style>
      ${hide_border ? "" : border}

      ${rankCircle}
      
      <text x="25" y="35" class="header">${name}'s GitHub Stats</text>

      <svg x="0" y="45">
        ${statItems.toString().replace(/\,/gm, "")}
      </svg>
    </svg>
  `;
};

module.exports = renderStatsCard;
