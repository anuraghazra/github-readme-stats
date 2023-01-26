import { renderWakatimeCard } from "../cards/wakatime-card.js";
import {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../common/utils.js";
import { fetchWakatimeStats } from "../fetchers/wakatime-fetcher.js";
import { isLocaleAvailable } from "../translations.js";

export default async (options) => {
  const {
    username,
    title_color,
    icon_color,
    hide_border,
    line_height,
    text_color,
    bg_color,
    theme,
    hide_title,
    hide_progress,
    custom_title,
    locale,
    layout,
    langs_count,
    hide,
    api_domain,
    range,
    border_radius,
    border_color,
  } = options;

  if (locale && !isLocaleAvailable(locale)) {
    return renderError("Something went wrong", "Language not found");
  }

  try {
    const stats = await fetchWakatimeStats({ username, api_domain, range });

    return renderWakatimeCard(stats, {
      custom_title,
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      hide: parseArray(hide),
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
      hide_progress,
      border_radius,
      border_color,
      locale: locale ? locale.toLowerCase() : null,
      layout,
      langs_count,
    });
  } catch (err) {
    return renderError(err.message, err.secondaryMessage);
  }
};
