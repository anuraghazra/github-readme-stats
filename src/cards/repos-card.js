const {
  kFormatter,
  encodeHTML,
  getCardColors,
  FlexLayout,
  wrapTextMultiline,
} = require("../common/utils");
const icons = require("../common/icons");
const Card = require("../common/Card");
const toEmoji = require("emoji-name-map");

const renderReposCard = (repo, options = {}) => {
  const {
    edges
  } = repo;
  const {
    date_format,
    hide_title = false,
    hide_border = false,
    title_color,
    icon_color,
    text_color,
    bg_color,
    show_owner,
    line_height = 25,
    theme = "default_repocard",
  } = options;


  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
  });

  const lheight = parseInt(line_height, 10);
  let height = Math.max(
    35 + (repo.edges.length + 1) * lheight, 100
  );



  const card = new Card({
    title: `Updated Last ${edges.length} Repositories`,
    width: 400,
    height,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
    },
  });

  card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(`
    .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .description .a { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: red }
    .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .icon { fill: ${iconColor} }
    .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; }
    .badge rect { opacity: 0.2 }
  `);

  return card.render(`
  
  ${edges
      .map((repo, index) => `
        <svg data-testid="icon" class="icon" x="30" y="${(index * 25)}" 
              viewBox="0 0 16 16" 
              version="1.1" 
              width="16" 
              height="16">
          ${icons.contribs}
        </svg>
        <text class="description bold" x="25" y="${(index * 25) - 12}">
          <tspan dy="1.8em" x="50">
            <a href="${repo.node.url}">${encodeHTML(repo.node.name)}</a>

          </tspan>
          <tspan dy="0em" x="300">
            @ ${ formatDate(repo.node.updatedAt,date_format)}
          </tspan>
        </text>
        `)
      .join("")}

  `);
};

const formatDate = (d, format = 'DD-MM-YYYY') => {
  var asTimeStamp = Date.parse(d);
  var date = new Date(asTimeStamp),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (format.toUpperCase() == 'DD-MM-YYYY')
    return [day, month, year].join('/');
  if (format.toUpperCase() == 'MM-DD-YYYY')
    return [month, day, year].join('/');

  return [day, month, year].join('/'); 
  
};

module.exports = renderReposCard;
