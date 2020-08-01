const {
  chunk,
  kFormatter,
  getCardColors,
  FlexLayout,
  encodeHTML,
} = require("../src/utils");
const { getStyles } = require("./getStyles");
const icons = require("./icons");
const getLogos = require("./logos");
const Card = require("./Card");

const createTextNode = ({
  icon,
  label,
  value,
  id,
  index,
  showIcons,
  shiftValuePos,
}) => {
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
      <text 
        class="stat" 
        x="${shiftValuePos ? (showIcons ? 200 : 170) : 150}" 
        y="12.5" 
        data-testid="${id}"
      >${kValue}</text>
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
    include_all_commits = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    // plang
    hide_plang = false,
    plang_animation = false,
    plang_row_items,
    show_plang_color,
  } = options;
  const pLangs =
    !hide_plang && primaryLanguages.length
      ? chunk(
          primaryLanguages,
          isNaN(plang_row_items) || plang_row_items > 13 ? 13 : plang_row_items
        )
      : [];
  const lheight = parseInt(line_height, 10);

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
      label: `Total Commits${
        include_all_commits ? "" : ` (${new Date().getFullYear()})`
      }`,
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
        shiftValuePos: !include_all_commits,
      })
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(
    pLangs.length * 30 + 55 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150
  );

  // Conditionally rendered elements
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle" 
          transform="translate(400, ${hide_plang ? height / 2 - 50 : 45})">
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

  const pLanAnimation = (i, duration, offset = 3) =>
    plang_animation
      ? `class="stagger" style="animation-delay: ${(i + offset) * duration}ms"`
      : "";

  const renderPrimaryLang = hide_plang
    ? ""
    : `
    <g data-testid="p-lang-container" transform="translate(20, 130)">
    ${pLangs
      .map(
        (_, i) =>
          `<g data-testid="p-lang-row" ${pLanAnimation(i, i + 3, 150)} transform="translate(0, ${
            i * 35
          })">${FlexLayout({
            gap: 35,
            items: pLangs[i].map(
              (lang, j) =>
                `<g data-testid="p-lang-logo" ${pLanAnimation(j, i + 5, 300)}>
                ${getLogos({
                  name: lang.name,
                  color: icon_color ? icon_color : lang.color,
                  show_plang_color,
                })}
              </g>`
            ),
          }).join("")}</g>`
      )
      .join("")}
    </g>
  `;

  // the better user's score the the rank will be closer to zero so
  // subtracting 100 to get the progress in 100%
  const progress = 100 - rank.score;
  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });

  const apostrophe = ["x", "s"].includes(name.slice(-1)) ? "" : "s";
  const card = new Card({
    title: `${encodeHTML(name)}'${apostrophe} GitHub Stats`,
    width: 495,
    height,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
    },
  });

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(cssStyles);

  return card.render(`
    ${rankCircle}

    <svg x="0" y="0">
      ${FlexLayout({
        items: statItems,
        gap: lheight,
        direction: "column",
      }).join("")}
    </svg> 

    ${renderPrimaryLang}
  `);
};

module.exports = renderStatsCard;
