const Card = require("../common/Card");
const { getCardColors, FlexLayout } = require("../common/utils");
const { createProgressNode } = require("../common/createProgressNode");
const { topicCardLocales } = require("../translations");
const I18n = require("../common/I18n");

const createProgressTextNode = ({ width, color, name, progress }) => {
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;

  return `
    <text data-testid="topic-name" x="2" y="15" class="topic-name">${name}</text>
    <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
    ${createProgressNode({
      x: 0,
      y: 25,
      color,
      width: progressWidth,
      progress,
      progressBarBackgroundColor: "#ddd",
    })}
  `;
};

const createCompactTopicNode = ({ topic, totalSize, x, y }) => {
  const percentage = ((topic.count / totalSize) * 100).toFixed(2);
  const color = topic.color || "#858585";

  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="topic-name" x="15" y="10" class='topic-name'>
        ${topic.name} ${percentage}%
      </text>
    </g>
  `;
};

const createTopicTextNode = ({ topics, totalSize, x, y }) => {
  return topics.map((topic, index) => {
    if (index % 2 === 0) {
      return createCompactTopicNode({
        topic,
        x,
        y: 12.5 * index + y,
        totalSize,
        index,
      });
    }
    return createCompactTopicNode({
      topic,
      x: 150,
      y: 12.5 + 12.5 * index,
      totalSize,
      index,
    });
  });
};

const lowercaseTrim = (name) => name.toLowerCase().trim();

const renderTopTopics = (topTopics, options = {}) => {
  const {
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide,
    theme,
    layout,
    custom_title,
    locale,
  } = options;

  const i18n = new I18n({
    locale,
    translations: topicCardLocales,
  });

  let topics = Object.values(topTopics);
  let topicToHide = {};

  // populate topicToHide map for quick lookup
  // while filtering out
  if (hide) {
    hide.forEach((topicName) => {
      topicToHide[lowercaseTrim(topicName)] = true;
    });
  }

  // filter out topics to be hidden
  topics = topics
    .sort((a, b) => b.count - a.count)
    .filter((topic) => {
      return !topicToHide[lowercaseTrim(topic.name)];
    });

  const totalTopicsCount = topics.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, bgColor } = getCardColors({
    title_color,
    text_color,
    bg_color,
    theme,
  });

  let width = isNaN(card_width) ? 300 : card_width;
  let height = 45 + (topics.length + 1) * 40;

  let finalLayout = "";

  // RENDER COMPACT LAYOUT
  if (layout === "compact") {
    width = width + 50;
    height = 30 + (topics.length / 2 + 1) * 40;

    // progressOffset holds the previous topic's width and used to offset the next topics
    // so that we can stack them one after another, like this: [--][----][---]
    let progressOffset = 0;
    const compactProgressBar = topics
      .map((topic) => {
        const percentage = (
          (topic.count / totalTopicsCount) *
          (width - 50)
        ).toFixed(2);

        const progress =
          percentage < 10 ? parseFloat(percentage) + 10 : percentage;

        const output = `
          <rect
            mask="url(#rect-mask)" 
            data-testid="lang-progress"
            x="${progressOffset}" 
            y="0"
            width="${progress}" 
            height="8"
            fill="${topic.color || "#858585"}"
          />
        `;
        progressOffset += parseFloat(percentage);
        return output;
      })
      .join("");

    finalLayout = `
      <mask id="rect-mask">
        <rect x="0" y="0" width="${
          width - 50
        }" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
      ${createTopicTextNode({
        x: 0,
        y: 25,
        topics,
        totalSize: totalTopicsCount,
      }).join("")}
    `;
  } else {
    finalLayout = FlexLayout({
      items: topics.map((topic) => {
        return createProgressTextNode({
          width: width,
          name: topic.name,
          color: topic.color || "#858585",
          progress: ((topic.count / totalTopicsCount) * 100).toFixed(2),
        });
      }),
      gap: 40,
      direction: "column",
    }).join("");
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("topiccard.title"),
    width,
    height,
    colors: {
      titleColor,
      textColor,
      bgColor,
    },
  });

  card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(`
    .topic-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
  `);

  return card.render(`
    <svg data-testid="topic-items" x="25">
      ${finalLayout}
    </svg>
  `);
};

module.exports = renderTopTopics;
