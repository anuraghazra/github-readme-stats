const { kFormatter, fallbackColor } = require("../src/utils");
const getStyles = require("./getStyles");

const createTextNode = ({ icon, label, value, id, index, lineHeight }) => {
  const classname = icon === "★" && "star-icon";
  const kValue = kFormatter(value);
  const staggerDelay = (index + 3) * 150;
  // manually calculating lineHeight based on index instead of using <tspan dy="" />
  // to fix firefox layout bug
  const lheight = lineHeight * (index + 1);
  return `
    <text class="stagger" style="animation-delay: ${staggerDelay}ms" x="25" y="${lheight}">
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

  const titleColor = fallbackColor(title_color, "#2f80ed");
  const iconColor = fallbackColor(icon_color, "#4c71f2");
  const textColor = fallbackColor(text_color, "#333");
  const bgColor = fallbackColor(bg_color, "#FFFEFE");

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

  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle" transform="translate(400, ${
        height / 1.85
      })">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <text
          x="${rank.level.length === 1 ? "-4" : "0"}"
          y="0"
          alignment-baseline="central"
          dominant-baseline="central"
          text-anchor="middle"
          class="rank-text"
        >
          ${rank.level}
        </text>
      </g>`;

  // re-adjust circle progressbar's value until the ranking algo is improved
  let progress = rank.score;
  if (rank.score > 86) {
    progress = (40 + rank.score) * 0.6;
  }
  if (rank.score < 40) {
    progress = 40 + rank.score;
  }

  const styles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });

  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
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
