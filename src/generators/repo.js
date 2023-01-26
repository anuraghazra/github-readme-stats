import { renderRepoCard } from "../cards/repo-card.js";
import { blacklist } from "../common/blacklist.js";
import {
  clampValue,
  CONSTANTS,
  parseBoolean,
  renderError,
} from "../common/utils.js";
import { fetchRepo } from "../fetchers/repo-fetcher.js";
import { isLocaleAvailable } from "../translations.js";

export default async (options) => {
  const {
    username,
    repo,
    hide_border,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    show_owner,
    locale,
    border_radius,
    border_color,
  } = options;

  if (blacklist.includes(username)) {
    return renderError("Something went wrong");
  }

  if (locale && !isLocaleAvailable(locale)) {
    return renderError("Something went wrong", "Language not found");
  }

  try {
    const repoData = await fetchRepo(username, repo);

    return renderRepoCard(repoData, {
      hide_border: parseBoolean(hide_border),
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
      border_radius,
      border_color,
      show_owner: parseBoolean(show_owner),
      locale: locale ? locale.toLowerCase() : null,
    });
  } catch (err) {
    return renderError(err.message, err.secondaryMessage);
  }
};
