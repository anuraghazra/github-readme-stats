const {
  kFormatter,
  getCardColors,
  FlexLayout,
  encodeHTML,
} = require("../common/utils");
const { getStyles } = require("../getStyles");
const icons = require("../common/icons");
const Card = require("../common/Card");

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
    custom_title,
    lang = "en",
  } = options;

  const lheight = parseInt(line_height, 10);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
  });

  const apostrophe = ["x", "s"].includes(name.slice(-1)) ? "" : "s";
  const translations = {
    title: {
      cn: `${encodeHTML(name)}的GitHub统计`,
      de: `${encodeHTML(name) + apostrophe} GitHub-Statistiken`,
      en: `${encodeHTML(name)}'${apostrophe} GitHub Stats`,
      es: `Estadísticas de GitHub de ${encodeHTML(name)}`,
      fr: `Statistiques GitHub de ${encodeHTML(name)}`,
      it: `Statistiche GitHub di ${encodeHTML(name)}`,
      ja: `${encodeHTML(name)}のGitHub統計`,
      kr: `${encodeHTML(name)}의 GitHub 통계`,
      "pt-br": `Estatísticas do GitHub de ${encodeHTML(name)}`,
    },
    stars: {
      cn: "总星数",
      de: "Insgesamt Sterne",
      en: "Total Stars",
      es: "Estrellas totales",
      fr: "Total d'étoiles",
      it: "Stelle totali",
      ja: "星の合計",
      kr: "총 별",
      "pt-br": "Total de estrelas",
    },
    commits: {
      cn: "总承诺",
      de: "Total Commits",
      en: "Total Commits",
      es: "Compromisos totales",
      fr: "Total des engagements",
      it: "Commit totali",
      ja: "総コミット",
      kr: "총 커밋",
      "pt-br": "Total de compromissos",
    },
    prs: {
      cn: "总公关",
      de: "PRs insgesamt",
      en: "Total PRs",
      es: "RP totales",
      fr: "Total des PR",
      it: "PR totali",
      ja: "合計PR",
      kr: "총 PR",
      "pt-br": "Total de PRs",
    },
    issues: {
      cn: "总发行量",
      de: "Gesamtausgaben",
      en: "Total Issues",
      es: "Problemas totales",
      fr: "Nombre total de problèmes",
      it: "Segnalazioni totali",
      ja: "総問題",
      kr: "총 문제",
      "pt-br": "Total de problemas",
    },
    contribs: {
      cn: "有助于",
      de: "Beigetragen zu",
      en: "Contributed to",
      es: "Contribuido a",
      fr: "Contribué à",
      it: "Ha contribuito a",
      ja: "に貢献しました",
      kr: "에 기여하다",
      "pt-br": "Contribuiu para",
    },
  };

  // Meta data for creating text nodes with createTextNode function
  const STATS = {
    stars: {
      icon: icons.star,
      label: translations.stars[lang] || "Total Stars",
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: icons.commits,
      label: `${translations.commits[lang] || "Total Commits"}${
        include_all_commits ? "" : ` (${new Date().getFullYear()})`
      }`,
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: icons.prs,
      label: translations.prs[lang] || "Total PRs",
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: icons.issues,
      label: translations.issues[lang] || "Total Issues",
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: icons.contribs,
      label: translations.contribs[lang] || "Contributed to",
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
      }),
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150,
  );

  // Conditionally rendered elements
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle" 
          transform="translate(400, ${height / 2 - 50})">
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

  const card = new Card({
    customTitle: custom_title,
    defaultTitle:
      translations.title[lang] ||
      `${encodeHTML(name)}'${apostrophe} GitHub Stats`,
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
  `);
};

module.exports = renderStatsCard;
