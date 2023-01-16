import { renderTopLanguages } from "../../src/cards/top-languages-card.js";
import {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../../src/common/utils.js";

export default async (req, res) => {
  const {
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout,
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    let topLangs = []
    if (req.query.langs) {
      const split = req.query.langs.split(";");
      split.forEach(lang => {
        let {
          name = "No Name",
          size = "0",
          color,
        } = JSON.parse(decodeURIComponent(lang))
        topLangs.push({
          name,
          size,
          color,
        });
      });
    } else {
      topLangs = [
        {
          name: "Javascript",
          size: 50,
          color: "#4287f5",
        },
        {
          name: "Python",
          size: 30,
          color: "#eb4034",
        },
        {
          name: "Ruby",
          size: 20,
          color: "#32a852",
        }
      ];
    }
      
    const title = req.query.title || "Most Used Languages";

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

    return res.send(
      renderTopLanguages(topLangs, {
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        title_color,
        text_color,
        bg_color,
        theme,
        layout,
        langs_count: topLangs.length,
        border_radius,
        border_color,
        title,
      }),
    );
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`); // Don't cache error responses.
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
