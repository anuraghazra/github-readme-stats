import "dotenv/config";
import renderToString from "preact-render-to-string";
import {
  logger,
  renderError,
  clampValue,
  parseBoolean,
  parseArray,
  CONSTANTS,
} from "../src/utils";
import fetchTopLangs from "../src/fetch/topLangs";
import topLangs from "../src/components/topLangs";

export default async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
  } = req.query;
  let topLangsData;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    topLangsData = await fetchTopLangs(username);
  } catch (err) {
    logger.error(err);
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
      topLangs(topLangsData, {
        theme,
        hide_title: parseBoolean(hide_title),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        title_color,
        text_color,
        bg_color,
      })
    )
  );
};
