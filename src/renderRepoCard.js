const { kFormatter, encodeHTML, fallbackColor } = require("../src/utils");
const icons = require("./icons");

const renderRepoCard = (repo, options = {}) => {
  const {
    name,
    nameWithOwner,
    description,
    primaryLanguage,
    stargazers,
    forkCount,
  } = repo;
  const { title_color, icon_color, text_color, bg_color, show_owner } = options;

  const header = show_owner ? nameWithOwner : name;
  const langName = primaryLanguage ? primaryLanguage.name : "Unspecified";
  const langColor = primaryLanguage ? primaryLanguage.color : "#333";

  const height = 120;
  const shiftText = langName.length > 15 ? 0 : 30;

  let desc = description || "No description provided";
  if (desc.length > 55) {
    desc = `${description.slice(0, 55)}..`;
  }

  const titleColor = fallbackColor(title_color, "#2f80ed");
  const iconColor = fallbackColor(icon_color, "#586069");
  const textColor = fallbackColor(text_color, "#333");
  const bgColor = fallbackColor(bg_color, "#FFFEFE");

  const totalStars = kFormatter(stargazers.totalCount);
  const totalForks = kFormatter(forkCount);
  return `
    <svg width="400" height="${height}" viewBox="0 0 400 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor} }
      .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
      .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
      .icon { fill: ${iconColor} }
      </style>
      <rect data-testid="card-border" x="0.5" y="0.5" width="399" height="99%" rx="4.5" fill="${bgColor}" stroke="#E4E2E2"/>
      <svg class="icon" x="25" y="25" viewBox="0 0 16 16" version="1.1" width="16" height="16">
        ${icons.contribs}
      </svg>

      <text x="50" y="38" class="header">${header}</text>
      <text class="description" x="25" y="70">${encodeHTML(desc)}</text>
      
      <g transform="translate(30, 100)">
        <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
        <text data-testid="lang" class="gray" x="15">${langName}</text>
      </g>

      ${totalStars > 0 && `
        <g transform="translate(${155 - shiftText}, 100)">
          <svg class="icon" y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            ${icons.star}
          </svg>
          <text data-testid="stargazers" class="gray" x="25">${totalStars}</text>
        </g>
      `}

      ${totalForks > 0 && `
        <g transform="translate(${220 - shiftText}, 100)">
          <svg class="icon" y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            ${icons.fork}
          </svg>
          <text data-testid="forkcount" class="gray" x="25">${totalForks}</text>
        </g>
      `}
    </svg>
  `;
};

module.exports = renderRepoCard;
