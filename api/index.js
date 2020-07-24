require("dotenv").config();
import React from "preact";
import renderToString from "preact-render-to-string";
import {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} from "../src/utils";
import fetchStats from "../src/fetch/stats";
import statsCard from "../src/components/statsCard";

export default async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    hide_rank,
    show_icons,
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
  } = req.query;
  let stats;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    stats = await fetchStats(username);
  } catch (err) {
    return res.send(renderToString(renderError(err.message)));
  }

  const cacheSeconds = clampValue(
    parseInt(cache_seconds || CONSTANTS.THIRTY_MINUTES, 10),
    CONSTANTS.THIRTY_MINUTES,
    CONSTANTS.ONE_DAY
  );

  res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

  res.send(
    renderToString(
      statsCard(stats, {
        hide: parseArray(hide),
        show_icons: parseBoolean(show_icons),
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        hide_rank: parseBoolean(hide_rank),
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
      })
    )
  );
};
