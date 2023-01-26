import { generateTopLanguagesCard } from "../src/generators/top-langs.js";
import { renderError } from "../src/common/utils.js";

export default async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout,
    langs_count,
    exclude_repo,
    custom_title,
    locale,
    border_radius,
    border_color,
    disable_animations,
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

    const card = await generateTopLanguagesCard({
      username,
      hide,
      hide_title,
      hide_border,
      card_width,
      title_color,
      text_color,
      bg_color,
      theme,
      layout,
      langs_count,
      exclude_repo,
      custom_title,
      locale,
      border_radius,
      border_color,
      disable_animations,
    });

    return res.send(card);
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`); // Don't cache error responses.
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
