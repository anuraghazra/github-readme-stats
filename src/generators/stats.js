import { renderStatsCard } from "../cards/stats-card.js";
import { blacklist } from "../common/blacklist.js";
import { parseArray, parseBoolean, renderError } from "../common/utils.js";
import { fetchStats } from "../fetchers/stats-fetcher.js";
import { isLocaleAvailable } from "../translations.js";

export default async (options) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    hide_rank,
    show_icons,
    count_private,
    include_all_commits,
    line_height,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold,
    bg_color,
    theme,
    exclude_repo,
    custom_title,
    locale,
    disable_animations,
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
    const stats = await fetchStats(
      username,
      parseBoolean(count_private),
      parseBoolean(include_all_commits),
      parseArray(exclude_repo),
    );

    return renderStatsCard(stats, {
      hide: parseArray(hide),
      show_icons: parseBoolean(show_icons),
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      card_width: parseInt(card_width, 10),
      hide_rank: parseBoolean(hide_rank),
      include_all_commits: parseBoolean(include_all_commits),
      line_height,
      title_color,
      ring_color,
      icon_color,
      text_color,
      text_bold: parseBoolean(text_bold),
      bg_color,
      theme,
      custom_title,
      border_radius,
      border_color,
      locale: locale ? locale.toLowerCase() : null,
      disable_animations: parseBoolean(disable_animations),
    });
  } catch (err) {
    return renderError(err.message, err.secondaryMessage);
  }
};
