const toEmoji = require("emoji-name-map");
const {
  kFormatter,
  encodeHTML,
  getCardColors,
  flexLayout,
  wrapTextMultiline,
  measureText,
} = require("../common/utils");
const I18n = require("../common/I18n");
const Card = require("../common/Card");
const icons = require("../common/icons");
const { repoCardLocales } = require("../translations");

const renderRepoCard = (repo, options = {}) => {
  const {
    name,
    nameWithOwner,
    description,
    primaryLanguage,
    stargazers,
    isArchived,
    isTemplate,
    forkCount,
  } = repo;
  const {
    hide_border = false,
    title_color,
    icon_color,
    text_color,
    bg_color,
    show_owner,
    theme = "default_repocard",
    border_radius,
    border_color,
    locale,
  } = options;

  const header = show_owner ? nameWithOwner : name;
  const langName = (primaryLanguage && primaryLanguage.name) || "Unspecified";
  const langColor = (primaryLanguage && primaryLanguage.color) || "#333";

  const shiftText = langName.length > 15 ? 0 : 30;

  let desc = description || "No description provided";

  // parse emojis to unicode
  desc = desc.replace(/:\w+:/gm, (emoji) => {
    return toEmoji.get(emoji) || "";
  });

  const multiLineDescription = wrapTextMultiline(desc);
  const descriptionLines = multiLineDescription.length;
  const lineHeight = 10;

  const height =
    (descriptionLines > 1 ? 120 : 110) + descriptionLines * lineHeight;

  const i18n = new I18n({
    locale,
    translations: repoCardLocales,
  });

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor, borderColor } =
    getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

  const totalStars = kFormatter(stargazers.totalCount);
  const totalForks = kFormatter(forkCount);

  const getBadgeSVG = (label) => `
    <g data-testid="badge" class="badge" transform="translate(320, -18)">
      <rect stroke="${textColor}" stroke-width="1" width="70" height="20" x="-12" y="-14" ry="10" rx="10"></rect>
      <text
        x="23" y="-5"
        alignment-baseline="central"
        dominant-baseline="central"
        text-anchor="middle"
        fill="${textColor}"
      >
        ${label}
      </text>
    </g>
  `;

  const svgLanguage = primaryLanguage
    ? `
    <g data-testid="primary-lang">
      <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
      <text data-testid="lang-name" class="gray" x="15">${langName}</text>
    </g>
    `
    : "";

  const iconSize = 16;
  const iconWithLabel = (icon, label, testid) => {
    const iconSvg = `
      <svg class="icon" y="-12" viewBox="0 0 16 16" version="1.1" width="${iconSize}" height="${iconSize}">
        ${icon}
      </svg>
    `;
    const text = `<text data-testid="${testid}" class="gray">${label}</text>`;
    return flexLayout({ items: [iconSvg, text], gap: 20 }).join("");
  };

  const svgStars =
    stargazers.totalCount > 0 &&
    iconWithLabel(icons.star, totalStars, "stargazers");
  const svgForks =
    forkCount > 0 && iconWithLabel(icons.fork, totalForks, "forkcount");

  const starAndForkCount = flexLayout({
    items: [svgLanguage, svgStars, svgForks],
    sizes: [
      measureText(langName, 12),
      iconSize + measureText(`${totalStars}`, 12),
      iconSize + measureText(`${totalForks}`, 12),
    ],
    gap: 25,
  }).join("");

  const card = new Card({
    defaultTitle: header,
    titlePrefixIcon: icons.contribs,
    width: 400,
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

  card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(false);
  card.setCSS(`
    .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .icon { fill: ${iconColor} }
    .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; }
    .badge rect { opacity: 0.2 }
  `);

  return card.render(`
    ${
      isTemplate
        ? getBadgeSVG(i18n.t("repocard.template"))
        : isArchived
        ? getBadgeSVG(i18n.t("repocard.archived"))
        : ""
    }

    <text class="description" x="25" y="-5">
      ${multiLineDescription
        .map((line) => `<tspan dy="1.2em" x="25">${encodeHTML(line)}</tspan>`)
        .join("")}
    </text>

    <g transform="translate(30, ${height - 75})">
      ${starAndForkCount}
    </g>
  `);
};

module.exports = renderRepoCard;
