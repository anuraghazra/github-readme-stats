const {
  kFormatter,
  encodeHTML,
  getCardColors,
  FlexLayout,
} = require("../src/utils");
const icons = require("./icons");
const toEmoji = require("emoji-name-map");
const wrap = require("word-wrap");

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
    title_color,
    icon_color,
    text_color,
    bg_color,
    show_owner,
    theme = "default_repocard",
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

  const multiLineDescription = getMultiLineDescription(desc);
  const descriptionLines = multiLineDescription.length;
  const lineHeight = 10;

  const height = 120 + descriptionLines * lineHeight;

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
  });

  const totalStars = kFormatter(stargazers.totalCount);
  const totalForks = kFormatter(forkCount);

  const getBadgeSVG = (label) => `
    <g data-testid="badge" class="badge" transform="translate(320, 38)">
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
    <g data-testid="primary-lang" transform="translate(30, ${100 + descriptionLines * lineHeight})">
      <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
      <text data-testid="lang-name" class="gray" x="15">${langName}</text>
    </g>
    `
    : "";

  const svgStars =
    stargazers.totalCount > 0 &&
    `
    <svg class="icon" y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icons.star}
    </svg>
    <text data-testid="stargazers" class="gray" x="25">${totalStars}</text>
  `;

  const svgForks =
    forkCount > 0 &&
    `
    <svg class="icon" y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icons.fork}
    </svg>
    <text data-testid="forkcount" class="gray" x="25">${totalForks}</text>
  `;

  return `
    <svg version="1.1" width="400" height="${height}" viewBox="0 0 400 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor} }
      .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
      .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
      .icon { fill: ${iconColor} }
      .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; }
      .badge rect { opacity: 0.2 }
      </style>

      <rect data-testid="card-bg" x="0.5" y="0.5" width="399" height="99%" rx="4.5" fill="${bgColor}" stroke="#E4E2E2"/>
      <svg class="icon" x="25" y="25" viewBox="0 0 16 16" version="1.1" width="16" height="16">
        ${icons.contribs}
      </svg>

      <text x="50" y="38" class="header">${header}</text>

      ${
        isTemplate
          ? getBadgeSVG("Template")
          : isArchived
          ? getBadgeSVG("Archived")
          : ""
      }

      <text class="description" x="25" y="70"
      >${multiLineDescription.reduce((acc, cur) => acc + `<tspan dy="1.2em" x="25">${encodeHTML(cur)}</tspan>`)}
      </text>

      ${svgLanguage}

      <g transform="translate(${primaryLanguage ? 155 - shiftText : 25}, ${100 + descriptionLines * lineHeight})">
        ${FlexLayout({ items: [svgStars, svgForks], gap: 65 }).join("")}
      </g>

    </svg>
  `;
};

function getMultiLineDescription(description, width = 50, maxLines = 3) {
  const wrapped = wrap(description, { width })
    .split("\n") // Split wrapped lines to get an array of lines
    .map(line => line.trim()); // Remove leading and trailing whitespace of each line

  const lines = wrapped.slice(0, maxLines); // Only consider maxLines lines

  // Add "..." to the last line if the description exceeds maxLines
  if (wrapped.length > maxLines) {
    lines[maxLines - 1] += "...";
  }

  // Remove empty lines if description fits in less than maxLines lines
  const multiLineDescription = lines.filter(Boolean);
  return multiLineDescription;
}

module.exports = renderRepoCard;
