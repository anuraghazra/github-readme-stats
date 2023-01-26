import { renderStatsCard } from "../../src/cards/stats-card.js";
import {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../../src/common/utils.js";

export default async (req, res) => {
  const {
    hide,
    hide_title,
    hide_border,
    card_width,
    hide_rank,
    show_icons,
    line_height,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold,
    bg_color,
    theme,
    disable_animations,
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const stats = {
      totalStars: req.query.total_stars,
      totalCommits: req.query.total_commits,
      totalIssues: req.query.total_issues,
      totalPRs: req.query.total_prs,
      contributedTo: req.query.total_contribs,
      rank: {
        level: req.query.level || 'S',
        score: req.query.score || 10
      },
      starsTitle: req.query.stars_title,
      commitsTitle: req.query.commits_title,
      issuesTitle: req.query.issues_title,
      PRsTitle: req.query.prs_title,
      contribsTitle: req.query.contribs_title,
      title: req.query.title,
    };

    return res.send(
      renderStatsCard(stats, {
        hide: parseArray(hide),
        show_icons: parseBoolean(show_icons),
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide_rank: parseBoolean(hide_rank),
        line_height,
        title_color,
        ring_color,
        icon_color,
        text_color,
        text_bold: parseBoolean(text_bold),
        bg_color,
        theme,
        border_radius,
        border_color,
        disable_animations: parseBoolean(disable_animations),
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
