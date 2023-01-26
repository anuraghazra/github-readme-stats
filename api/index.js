import { generateStatsCard } from "../src/generators/stats-card.js";
import { renderError } from "../src/common/utils.js";

export default async (req, res) => {
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
    cache_seconds,
    exclude_repo,
    custom_title,
    locale,
    disable_animations,
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    );

    const card = await generateStatsCard({
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
    });

    return res.send(card);
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`); // Don't cache error responses.
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
