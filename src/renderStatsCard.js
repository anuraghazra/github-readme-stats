const {
  chunk,
  kFormatter,
  getCardColors,
  FlexLayout,
  encodeHTML,
} = require("../src/utils");
const getStyles = require("./getStyles");
const icons = require("./icons");
const getLogos = require("./logos");

const createTextNode = ({ icon, label, value, id, index, showIcons }) => {
  const kValue = kFormatter(value);
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
    primaryLanguages = [],
  } = stats;
  const {
    hide = [],
    show_icons = false,
    hide_title = false,
    hide_border = false,
    hide_rank = false,
    line_height = 25,
    hide_plang = false,
    plang_row_items = 14,
    show_plang_color,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
  } = options;
  const lheight = parseInt(line_height);
  const pLangs =
    !hide_plang && primaryLanguages.length
      ? chunk(primaryLanguages, plang_row_items)
      : [];
  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
  });

  // Meta data for creating text nodes with createTextNode function
  const STATS = {
    stars: {
      icon: icons.star,
      label: "Total Stars",
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: icons.commits,
      label: "Total Commits",
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: icons.prs,
      label: "Total PRs",
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: icons.issues,
      label: "Total Issues",
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: icons.contribs,
      label: "Contributed to",
      value: contributedTo,
      id: "contribs",
    },
  };

  // filter out hidden stats defined by user & create the text nodes
  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({
        ...STATS[key],
        index,
        showIcons: show_icons,
      })
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(
    pLangs.length * 30 + 55 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150
  );

  // the better user's score the the rank will be closer to zero so
  // subtracting 100 to get the progress in 100%
  const progress = 100 - rank.score;

  const styles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });

  // Conditionally rendered elements
  const apostrophe = ["x", "s"].includes(name.slice(-1)) ? "" : "s";
  const title = hide_title
    ? ""
    : `<text x="25" y="35" class="header">${encodeHTML(
        name
      )}'${apostrophe} GitHub Stats</text>`;

  const border = `
    <rect 
      data-testid="card-bg"
      x="0.5"
      y="0.5"
      width="494"
      height="99%"
      rx="4.5"
      fill="${bgColor}"
      stroke="#E4E2E2"
      stroke-opacity="${hide_border ? 0 : 1}"
    />
  `;

  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle" transform="translate(400, 100)">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <g class="rank-text">
          <text
            x="${rank.level.length === 1 ? "-4" : "0"}"
            y="0"
            alignment-baseline="central"
            dominant-baseline="central"
            text-anchor="middle"
          >
            ${rank.level}
          </text>
        </g>
      </g>`;

  if (hide_title) {
    height -= 30;
  }

  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
      </style>
      
      ${border}
      ${title}

      <g data-testid="card-body-content" transform="translate(0, ${
        hide_title ? -30 : 0
      })">
        ${rankCircle}

        <svg x="0" y="55">
          ${FlexLayout({
            items: statItems,
            gap: lheight,
            direction: "column",
          }).join("")}
        </svg>

        <g transform="translate(20, 185)">
        ${
          pLangs &&
          pLangs
            .map(
              (_, i) =>
                `<g transform="translate(0, ${i * 45})">${FlexLayout({
                  items: pLangs[i].map((lang) =>
                    getLogos({
                      name: lang.name,
                      color: icon_color ? icon_color : lang.color,
                      show_plang_color,
                    })
                  ),
                  gap: 35,
                }).join("")}</g>`
            )
            .join("")
        }
        </g>
      </g>
    </svg>
  `;
};

module.exports = renderStatsCard;
