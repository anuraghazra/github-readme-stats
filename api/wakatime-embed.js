require("dotenv").config();
const {
    renderError,
    parseBoolean,
    clampValue,
    CONSTANTS,
    isLocaleAvailable,
} = require("../src/common/utils");
const { wakaTimeEmbedData } = require("../src/fetchers/wakatime-embed-fetcher");
const wakatimeEmbedCard = require("../src/cards/wakatime-embed-card");

module.exports = async (req, res) => {
    const {
        username,
        embedCode,
        title_color,
        icon_color,
        hide_border,
        line_height,
        text_color,
        bg_color,
        theme,
        cache_seconds,
        hide_title,
        hide_progress,
        custom_title = 'Wakatime Stats',
        locale,
        layout,
    } = req.query;

    res.setHeader("Content-Type", "image/svg+xml");

    if (locale && !isLocaleAvailable(locale)) {
        return res.send(renderError("Something went wrong", "Language not found"));
    }

    try {
        const wakatimeData = await wakaTimeEmbedData({ username , embedCode});

        let cacheSeconds = clampValue(
            parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
            CONSTANTS.TWO_HOURS,
            CONSTANTS.ONE_DAY,
        );

        if (!cache_seconds) {
            cacheSeconds = CONSTANTS.FOUR_HOURS;
        }

        res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

        return res.send(
            wakatimeEmbedCard(wakatimeData, {
                custom_title,
                hide_title: parseBoolean(hide_title),
                hide_border: parseBoolean(hide_border),
                line_height,
                title_color,
                icon_color,
                text_color,
                bg_color,
                theme,
                hide_progress,
                locale: locale ? locale.toLowerCase() : null,
                layout,
            }),
        );
    } catch (err) {
        return res.send(renderError(err.message, err.secondaryMessage));
    }
};
