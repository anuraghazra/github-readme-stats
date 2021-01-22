import { FlexLayout, getCardColors } from "../common/utils";

import { Card } from "../common/Card";
import { I18n } from "../common/I18n";
import { createProgressNode } from "../common/createProgressNode";
import { getStyles } from "../getStyles";
import languageColors from "../common/languageColors.json";
import { wakatimeCardLocales } from "../translations";

function noCodingActivityNode({
  color,
  text,
}: {
  color: string | string[];
  text: string;
}) {
  return `
    <text x="25" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
}

function createCompactLangNode({
  lang,
  x,
  y,
}: {
  lang: { name: string; text: string };
  x: number;
  y: number;
}) {
  const color = languageColors[lang.name] || "#858585";

  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} - ${lang.text}
      </text>
    </g>
  `;
}

function createLanguageTextNode({
  langs,
  y,
}: {
  langs: {
    name: string;
    text: string;
  }[];
  y: number;
}) {
  return langs.map((lang, index: number) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x: 25,
        y: 12.5 * index + y,
      });
    }
    return createCompactLangNode({
      lang,
      x: 230,
      y: 12.5 + 12.5 * index,
    });
  });
}

function createTextNode({
  id,
  label,
  value,
  index,
  percent,
  hideProgress,
  progressBarColor,
  progressBarBackgroundColor,
}) {
  const staggerDelay = (index + 3) * 150,
    cardProgress = hideProgress
      ? null
      : createProgressNode({
          x: 110,
          y: 4,
          progress: percent,
          color: progressBarColor,
          width: 220,
          progressBarBackgroundColor,
        });

  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      <text class="stat bold" y="12.5">${label}:</text>
      <text
        class="stat"
        x="${hideProgress ? 170 : 350}"
        y="12.5"
        data-testid="${id}"
      >${value}</text>
      ${cardProgress}
    </g>
  `;
}

export function renderWakatimeCard(
  stats: {
    languages?: {
      hours?: number;
      minutes?: number;
      name: string;
      text: string;
      percent;
    }[];
  } = {},
  options: {
    hide_title?: boolean;
    hide_border?: boolean;
    line_height?: number;
    title_color?: string;
    icon_color?: string;
    text_color?: string;
    bg_color?: string;
    theme?: string;
    hide_progress?: boolean;
    custom_title?: string;
    locale?: string;
    layout?: string;
  } = {},
) {
  const { languages } = stats;
  const {
    hide_title = false,
    hide_border = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    hide_progress,
    custom_title,
    locale,
    layout,
  } = options;

  const i18n = new I18n({
      locale,
      translations: wakatimeCardLocales,
    }),
    lheight = parseInt(line_height.toString(), 10),
    //* returns theme based colors with proper overrides and defaults
    { titleColor, textColor, iconColor, bgColor } = getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
    }),
    statItems = languages
      ? languages
          .filter((language) => language.hours || language.minutes)
          .map((language, i) => {
            return createTextNode({
              id: language.name,
              label: language.name,
              value: language.text,
              index: i,
              percent: language.percent,
              progressBarColor: titleColor,
              progressBarBackgroundColor: textColor,
              hideProgress: hide_progress,
            });
          })
      : [];

  //* Calculate the card height depending on how many items there are
  //* but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(45 + (statItems.length + 1) * lheight, 150),
    finalLayout = "",
    width = 440;

  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
  });

  //! RENDER COMPACT LAYOUT
  if (layout === "compact") {
    width = width + 50;
    height = 90 + Math.round(languages.length / 2) * 25;

    //* progressOffset holds the previous language's width and used to offset the next language
    //* so that we can stack them one after another, like this: [--][----][---]
    let progressOffset = 0;
    const compactProgressBar = languages
      .map((lang) => {
        //? const progress = (width * lang.percent) / 100;
        const progress = ((width - 50) * lang.percent) / 100,
          languageColor = languageColors[lang.name] || "#858585",
          output = `
          <rect
            mask="url(#rect-mask)"
            data-testid="lang-progress"
            x="${progressOffset}"
            y="0"
            width="${progress}"
            height="8"
            fill="${languageColor}"
          />
        `;
        progressOffset += progress;
        return output;
      })
      .join("");

    finalLayout = `
      <mask id="rect-mask">
      <rect x="25" y="0" width="${width - 50}" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
      ${createLanguageTextNode({
        y: 25,
        langs: languages,
      }).join("")}
    `;
  } else {
    finalLayout = FlexLayout({
      items: statItems.length
        ? statItems
        : [
            noCodingActivityNode({
              color: textColor,
              text: i18n.t("wakatimecard.nocodingactivity"),
            }),
          ],
      gap: lheight,
      direction: "column",
    }).join("");
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("wakatimecard.title"),
    width: 495,
    height,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
    },
  });

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(
    `
    ${cssStyles}
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    `,
  );

  return card.render(`
    <svg x="0" y="0" width="100%">
      ${finalLayout}
    </svg>
  `);
}
