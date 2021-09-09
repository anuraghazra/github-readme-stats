const Card = require("../common/Card");
const I18n = require("../common/I18n");
const {getStyle} = require("../getStyles");
const {codetimecardLocales} = require("../translations");
const languageColors = require("../common/languageColors.json");
const {createProgressNode} = require("../common/createProgressNode");
const {
    clampValue,
    getCardColors,
    flexLayout,
    lowercaseTrim,
} = require("../common/utils");

const noCodingActivityNode = ({color, text}) => {
    return `
        <text x="25" y="11" class="stat bold" fill=${color}>${text}</text>
    `;
};

const createCompactLangNode = ({lang, totalSize, x, y}) => {
    const color = languageColors[lang.name] || "#6C7E89";

    return `
        <g transform="translate(${x}, ${y})">
            <circle cx="5" cy="6" r="5" fill="${color}" />
            <text data-testid="lang-name" x="15" y="10" class="lang-name">${lang.name} - ${lang.text}</text>
        </g>
    `;
};

const createLanguageTextNode = ({langs, totalSize, x, y}) => {
    return lang.map((lang, index) => {
        if(index % 2 === 0){
            return createCompactLangNode({
                lang,
                x:25,
                y:12.5 * index + y,
                totalSize,
                index
            });
        }

        return createCompactLangNode({
            lang,
            x:230,
            y:12.5 + 12.5 * index,
            totalSize,
            index
        });
    });
};

const createTextNode = ({id, label, value, index, percent, hideProgress, progressBarColor, progressBarBackgroundColor}) => {
    const staggerDelay = (index +3) * 150;
    const cardProgress = hideProgress ? null : createProgressNode({
        x:110,
        y:4,
        progress: percent,
        color: progressBarColor,
        width: 220,
        name: label,
        progressBarBackgroundColor
    });

    return `
        <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
            <text class="stat bold" y="12.5" data-testid="${id}">${label}:</text>
            <text class="stat" x="${hideProgress ? 170: 350}" y="12.5">${value}</text>
            ${cardProgress}
        </g>
    `;
};

const recalculatePercentages = (languages) => {
    const totalSum = languages.reduce((totalSum, languages) => totalSum + languages.percent, 0);

    const weight = (100 / totalSum).toFixed(2);
    languages.foreEach((languages) => {
        languages.percent = (languages.percent * weight).toFixed(2);
    });
};

const renderCodetimeCard = (stats = {}, options = {hide: []}) => {
    let{languages} = stats;
    const {
        hide_title = false,
        hide_border = true,
        hide,
        line_height = 30,
        title_color,
        text_color,
        bg_color,
        theme = "default",
        hide_progress,
        custom_title,
        locale,
        layout,
        langs_count = languages ? languages.length : 0,
        border_radius,
        border_color
    } = options;

    const shouldHideLangs = Array.isArray(hide) && hide.length > 0;
    if(shouldHideLangs) {
        const languagesToHide = new Set(hide.map((lang) => lowercaseTrim(lang)));
        languages = languages.filter((lang) => !languagesToHide.has(lowercaseTrim(lang.name)));
        recalculatePercentages(languages);
    }

    const i18n = new I18n({
        locale,
        translations: codetimecardLocales
    });

    const lheight = parseInt(line_height, 10);
    langsCount = clampValue(parseInt(langs_count), 1, langs_count);

    const {
        titleColor,
        textColor,
        iconColor,
        bgColor,
        borderColor
    } = getCardColors({
        title_color,
        icon_color,
        text_color,
        bg_color,
        border_color,
        theme
    });

    const filteredLanguages = languages ? languages.filter((languages) => languages.hours || languages.minutes).slice(0, langsCount): [];

    let height = Math.max(45 + (filteredLanguages.length + 1) * lheight, 150);

    const cssStyles = getStyles({
        titleColor, textColor, iconColor
    });

    let finalLayout = "";
    let width = 440;

    if(layout === "compact") {
        width = width + 50;
        height = 90 + Math.round(filteredLanguages.length / 2) * 25;

        let progressOffset = 0;
        const compactProgressBar = filteredLanguages.map((languages) => {
            const progress = ((width - 25) * language.percent) / 100;

            const languageColor = languageColor[language.name] || "#6C7E89";

            const output = `<rect mask="url(#rect-mask)" data-testid="lang-progress" x="${progressOffset}" y="0" width="${progress}" height="8" fill="${languageColor}" />`;

            progressOffset += progress;
            return output;
        }).join("");

        finalLayout = `<mask id="rect-mask"><rect x="25" y="0" width="${width - 50}" height="8" fill="white" rx="5" /></mask>${compactProgressBar}${createLanguageTextNode({
            x: 0,
            y: 25,
            langs: filteredLanguages,
            totalSize: 100,
        }).join("")}`;
    }else{
        finalLayout = flexLayout({
            items: filteredLanguages.length ? filteredLanguages.map((languages) => {
                return createTextNode({
                    id: language.name,
                    label: language.name,
                    value: language.text,
                    percent: language.percent,
                    progressBarColor: titleColor,
                    progressBarBackgroundColor: textColor,
                    hideProgress: hide_progress
                });
            })
            : [
                noCodingActivityNode({
                    color: textColor,
                    text: i18n.t("codetimecard.nocodingactivity"),
                }),
            ],
            gap: lheight,
            direction: "column"
        }).join("");
    }

    const card = new Card({
        customTitle: custom_title,
        defaultTitle: i18n.t("codetimecard.title"),
        width: 495,
        heigh,
        border_radius,
        colors: {
            titleColor,textColor,iconColor,bgColor,borderColor
        }
    });

    card.setHideBorder(hide_border);
    card.setHideTitle(hide_title);
    card.setCSS{
        `
        ${cssStyles}.lang-name {font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}}
        `
    };

    return card.render(`
        <svg x="0" y="0" width="100%">${finalLayout}</svg>
    `);
};

module.exports = renderCodetimeCard;
exports.createProgressNode = createProgressNode;