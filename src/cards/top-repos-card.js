// @ts-check
const Card = require("../common/Card");
const I18n = require("../common/I18n");
const { repoCardLocales } = require("../translations");
const { createProgressNode } = require("../common/createProgressNode");
const {
  getCardColors,
  flexLayout,
} = require("../common/utils");

const DEFAULT_CARD_WIDTH = 500;
const DEFAULT_REPO_COUNT = 5;
const CARD_PADDING = 25;

/**
 * @typedef {import("../fetchers/types").Repo} Repo
 */

/**
 * @param {{
 *  width: number,
 *  color: string,
 *  name: string,
 *  label: string,
 *  progress: string
 * }} props
 */
const createProgressTextNode = ({ width, color, name, label, progress }) => {
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;

  return `
    <text data-testid="repo-name" x="2" y="15" class="repo-name">${name}</text>
    <text x="${progressTextX}" y="34" class="repo-name">${label}</text>
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


/**
 * @param {Repo[]} repos
 * @param {number} width
 * @param {string} cardType
 * @returns {string}
 */
const renderNormalLayout = (repos, width, cardType) => {
  const max = cardType === "star" ? repos[0].stargazerCount : repos[0].forkCount;
  return flexLayout({
    items: repos.map((repo, index) => {
      const count = cardType === "star" ? repo.stargazerCount : repo.forkCount;
      return createProgressTextNode({
        width: width,
        name: repo.name,
        color: perc2color(index / repos.length * 100),
        label: count.toString(),
        progress: ((count / max) * 100).toFixed(2),
      });
    }),
    gap: 40,
    direction: "column",
  }).join("");
};


/**
 * @param {number} totalLangs
 * @returns {number}
 */
const calculateNormalLayoutHeight = (totalLangs) => {
  return 45 + (totalLangs + 1) * 40;
};

// License: MIT - https://opensource.org/licenses/MIT
// Author: Michele Locati <michele@locati.it>
// Source: https://gist.github.com/mlocati/7210513
const perc2color = (perc) => {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}

/**
 * @param {import('../fetchers/types').Repo[]} topRepos
 * @param {object} options
 * @returns {string}
 */
const renderTopRepos = (topRepos, card_type = "star", options = {}) => {
  const {
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    custom_title,
    locale,
    repo_count = DEFAULT_REPO_COUNT,
    border_radius,
    border_color,
  } = options;

  const i18n = new I18n({
    locale,
    translations: repoCardLocales,
  });

  let size = Math.min(repo_count, topRepos.length);
  let repos = Object.values(topRepos).slice(0, size);

  let width = isNaN(card_width) ? DEFAULT_CARD_WIDTH : card_width;
  let height = calculateNormalLayoutHeight(repos.length);

  let finalLayout = renderNormalLayout(repos, width, card_type);
  
  // returns theme based colors with proper overrides and defaults
  const colors = getCardColors({
    title_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });

  const defaultTitle = card_type === "star" ? "⭐ " + i18n.t("topStars.title") : "🔥 " + i18n.t("topForks.title");

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: defaultTitle,
    width,
    height,
    border_radius,
    colors,
  });

  card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(
    `.repo-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.textColor} }`,
  );

  return card.render(`
    <svg data-testid="repo-items" x="${CARD_PADDING}">
      ${finalLayout}
    </svg>
  `);
};

module.exports = renderTopRepos;
