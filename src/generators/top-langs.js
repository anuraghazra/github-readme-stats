import { renderTopLanguages } from "../cards/top-languages-card.js";
import { blacklist } from "../common/blacklist.js";
import {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../common/utils.js";
import { fetchTopLanguages } from "../fetchers/top-languages-fetcher.js";
import { isLocaleAvailable } from "../translations.js";

export default async (options) => {
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
    layout,
    langs_count,
    exclude_repo,
    custom_title,
    locale,
    border_radius,
    border_color,
    disable_animations,
  } = options;

  if (blacklist.includes(username)) {
    return renderError("Something went wrong");
  }

  if (locale && !isLocaleAvailable(locale)) {
    return renderError("Something went wrong", "Locale not found");
  }

  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
    );

    return renderTopLanguages(topLangs, {
      custom_title,
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      card_width: parseInt(card_width, 10),
      hide: parseArray(hide),
      title_color,
      text_color,
      bg_color,
      theme,
      layout,
      langs_count,
      border_radius,
      border_color,
      locale: locale ? locale.toLowerCase() : null,
      disable_animations: parseBoolean(disable_animations),
    });
  } catch (err) {
    return renderError(err.message, err.secondaryMessage);
  }
};
