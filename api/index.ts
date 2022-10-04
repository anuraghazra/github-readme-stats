import { renderStatsCard } from "@/src/cards/stats-card";
import blacklist from "@/src/common/blacklist";
import {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "@/src/common/utils";
import fetchStats from "@/src/fetchers/stats-fetcher";
import { isLocaleAvailable } from "@/src/translations";
import * as dotenv from "dotenv";
import express from "express";

// Initialize Express
const app = express();
const port = 3000;

dotenv.config();

const api = async (req, res) => {
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

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }

  try {
    const stats = await fetchStats(
      username,
      parseBoolean(count_private),
      parseBoolean(include_all_commits),
      parseArray(exclude_repo),
    );

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      renderStatsCard(stats, {
        hide: parseArray(hide),
        show_icons: parseBoolean(show_icons),
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide_rank: parseBoolean(hide_rank),
        include_all_commits: parseBoolean(include_all_commits),
        line_height,
        title_color,
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
      }),
    );
  } catch (err: any) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};

app.get("/api", api);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`GRS express server listening on port ${port}`);
  });
}

export default api;
