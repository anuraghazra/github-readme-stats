const { kFormatter, fallbackColor } = require("../src/utils");
const getStyles = require("./getStyles");

const createTextNode = ({ icon, label, value, id, index, lineHeight, showIcons }) => {
  const kValue = kFormatter(value);
  const staggerDelay = (index + 3) * 150;
  // manually calculating lineHeight based on index instead of using <tspan dy="" />
  // to fix firefox layout bug
  const lheight = lineHeight * (index + 1);
  const translateY = lheight - (lineHeight / 2);
  const labelOffset = showIcons ? `x="25"` : '';
  const iconSvg = showIcons ? `
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icon}
    </svg>
  ` : '';
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, ${translateY})">
      ${iconSvg}
      <text class="stat bold" ${labelOffset} y="12.5">${label}:</text>
      <text class="stat" x="135" y="12.5" data-testid="${id}">${kValue}</text>
    </g>
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
      icon: `<path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>`,
      label: "Total Stars",
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: `<path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>`,
      label: "Total Commits",
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: `<path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>`,
      label: "Total PRs",
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: `<path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>`,
      label: "Total Issues",
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: `<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>`,
      label: "Contributed to",
      value: contributedTo,
      id: "contribs",
    },
  };

  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({ ...STATS[key], index, lineHeight: lheight, showIcons: show_icons })
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

  // the better user's score the the rank will be closer to zero so
  // subtracting 100 to get the progress in 100%
  let progress = 100 - rank.score;

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
