import { renderRepoCard } from "../../src/cards/repo-card.js";
import {
  clampValue,
  CONSTANTS,
  parseBoolean,
  renderError,
} from "../../src/common/utils.js";

export default async (req, res) => {
  const {
    hide_border,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    border_radius,
    border_color,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const repoData = {
      name: req.query.title || "awesome/repo",
      description: req.query.description || "What an awesome repo!",
      primaryLanguage: {
        name: req.query.footer || "Awesome",
        color: req.query.badge ? `#${req.query.badge}` : "#4287f5",
      },
      starCount: req.query.stars || 12838,
      forkCount: req.query.forks || 8929,
      highlight: req.query.highlight || "AWESOME",
    };

    return res.send(
      renderRepoCard(repoData, {
        hide_border: parseBoolean(hide_border),
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        border_radius,
        border_color,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
