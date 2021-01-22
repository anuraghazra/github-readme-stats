import { FlexLayout, getCardColors } from "../common/utils";

import { Card } from "../common/Card";
import { I18n } from "../common/I18n";
import { createProgressNode } from "../common/createProgressNode";
import { langCardLocales } from "../translations";

function createProgressTextNode({
  width,
  color,
  name,
  progress,
}: {
  width: number;
  color: string;
  name: string;
  progress: string;
}) {
  const paddingRight = 95,
    progressTextX = width - paddingRight + 10,
    progressWidth = width - paddingRight;

  return `
    <text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
    <text x="${progressTextX}" y="34" class="lang-name">${progress}%</text>
    ${createProgressNode({
      x: 0,
      y: 25,
      color,
      width: progressWidth,
      progress,
      progressBarBackgroundColor: "#ddd",
    })}
  `;
}

function createCompactLangNode({
  lang,
  totalSize,
  x,
  y,
}: {
  lang: { name: string; size: number; color: string };
  totalSize: number;
  x: number;
  y: number;
}) {
  const percentage = ((lang.size / totalSize) * 100).toFixed(2),
    color = lang.color || "#858585";

  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} ${percentage}%
      </text>
    </g>
  `;
}

function createLanguageTextNode({
  langs,
  totalSize,
  x,
  y,
}: {
  langs: { name: string; size: number; color: string }[];
  totalSize: number;
  x: number;
  y: number;
}) {
  return langs.map((lang, index) => {
    if (index % 2 === 0) {
      return createCompactLangNode({
        lang,
        x,
        y: 12.5 * index + y,
        totalSize,
      });
    }
    return createCompactLangNode({
      lang,
      x: 150,
      y: 12.5 + 12.5 * index,
      totalSize,
    });
  });
}

function lowercaseTrim(name: string) {
  return name.toLowerCase().trim();
}

export function renderTopLanguages(
  topLangs: {
    size: number;
    name: string;
    color: string;
  }[],
  options: {
    hide_title?: boolean;
    hide_border?: boolean;
    card_width?: number;
    title_color?: string;
    text_color?: string;
    bg_color?: string;
    hide?: string[];
    theme?: string;
    layout?: string;
    custom_title?: string;
    locale?: string;
  } = {},
) {
  const {
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide,
    theme,
    layout,
    custom_title,
    locale,
  } = options;

  const i18n = new I18n({
      locale,
      translations: langCardLocales,
    }),
    langsToHide = {};

  let langs = Object.values(topLangs);

  //* populate langsToHide map for quick lookup
  //* while filtering out
  if (hide) {
    hide.forEach((langName) => {
      langsToHide[lowercaseTrim(langName)] = true;
    });
  }

  //* filter out langauges to be hidden
  langs = langs
    .sort((a, b) => b.size - a.size)
    .filter((lang) => {
      return !langsToHide[lowercaseTrim(lang.name)];
    });

  const totalLanguageSize = langs.reduce((acc, curr) => {
      return acc + curr.size;
    }, 0),
    //* returns theme based colors with proper overrides and defaults
    { titleColor, textColor, bgColor } = getCardColors({
      title_color,
      text_color,
      bg_color,
      theme,
    });

  let width = isNaN(card_width) ? 300 : card_width,
    height = 45 + (langs.length + 1) * 40,
    finalLayout = "";

  //! RENDER COMPACT LAYOUT
  if (layout === "compact") {
    width = width + 50;
    height = 90 + Math.round(langs.length / 2) * 25;

    //* progressOffset holds the previous language's width and used to offset the next language
    //* so that we can stack them one after another, like this: [--][----][---]
    let progressOffset = 0;
    const compactProgressBar = langs
      .map((lang) => {
        const percentage = parseFloat(
            ((lang.size / totalLanguageSize) * (width - 50)).toFixed(2),
          ),
          progress = percentage < 10 ? percentage + 10 : percentage,
          output = `
          <rect
            mask="url(#rect-mask)"
            data-testid="lang-progress"
            x="${progressOffset}"
            y="0"
            width="${progress}"
            height="8"
            fill="${lang.color || "#858585"}"
          />
        `;
        progressOffset += percentage;
        return output;
      })
      .join("");

    finalLayout = `
      <mask id="rect-mask">
        <rect x="0" y="0" width="${
          width - 50
        }" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
      ${createLanguageTextNode({
        x: 0,
        y: 25,
        langs,
        totalSize: totalLanguageSize,
      }).join("")}
    `;
  } else {
    finalLayout = FlexLayout({
      items: langs.map((lang) => {
        return createProgressTextNode({
          width: width,
          name: lang.name,
          color: lang.color || "#858585",
          progress: ((lang.size / totalLanguageSize) * 100).toFixed(2),
        });
      }),
      gap: 40,
      direction: "column",
    }).join("");
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("langcard.title"),
    width,
    height,
    colors: {
      titleColor,
      textColor,
      bgColor,
    },
  });

  card.disableAnimations();
  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(`
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
  `);

  return card.render(`
    <svg data-testid="lang-items" x="25">
      ${finalLayout}
    </svg>
  `);
}
