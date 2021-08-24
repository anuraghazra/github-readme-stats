import { VercelRequestQuery } from "@vercel/node";
import axios from "axios";
import CardRenderer, {
  clampValue,
  flexLayout,
  getCardColors,
} from "../../helpers/CardRenderer";
import { FetchStatError } from "../../helpers/Error";
import { languageColors } from "../../utils/languages";
import { toBoolean, toInteger, toString } from "../../utils/vercelRequestQuery";
import Card, { CommonProps } from "../Card";
import { getStyles } from "../github-stats/render";
import {
  createLanguageTextNode,
  createTextNode,
  noCodingActivityNode,
} from "./render";
import translation from "./translation";

interface WakaTimeProps extends CommonProps {
  line_height: number;
  hide_title: boolean;
  hide_progress: boolean;
  custom_title?: string;
  layout: "default" | "compact" | string;
  langs_count?: number;
  api_domain?: string;
  range?: string;
}

export default class WakaTime extends Card {
  constructor(props: VercelRequestQuery) {
    super(props, translation);
  }
  protected preprocess(query: VercelRequestQuery): WakaTimeProps {
    const commonProps = super.preprocess(query);
    const {
      line_height,
      hide_progress,
      hide_title,
      custom_title,
      layout,
      langs_count,
      api_domain,
      range,
    } = query;
    return {
      ...commonProps,
      line_height: toInteger(line_height) ?? 25,
      hide_progress: toBoolean(hide_progress) ?? false,
      hide_title: toBoolean(hide_title) ?? false,
      custom_title: toString(custom_title),
      layout: toString(layout) ?? "default",
      langs_count: toInteger(langs_count),
      api_domain: toString(api_domain),
      range: toString(range),
    };
  }
  protected async fetchStats(): Promise<any> {
    const { username, api_domain, range } = this.props as WakaTimeProps;

    try {
      const { data } = await axios.get(
        `https://${
          api_domain ? api_domain.replace(/\/$/gi, "") : "wakatime.com"
        }/api/v1/users/${username}/stats/${
          range || ""
        }?is_including_today=true`,
      );

      return data.data;
    } catch (err) {
      if (err.response.status < 200 || err.response.status > 299) {
        throw new FetchStatError(
          FetchStatError.TYPE.USER_NOT_FOUND,
          "make sure you have a wakatime profile",
        );
      }
      throw new FetchStatError(FetchStatError.TYPE.UNEXPECTED, err.message);
    }
  }

  protected renderCard(stats: {
    languages: Array<{
      hours: number;
      minutes: number;
      percent: number;
      name: string;
    }>;
  }): string {
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
      langs_count = languages ? languages.length : 0,
      border_radius,
      border_color,
    } = this.props as WakaTimeProps;

    const langsCount = clampValue(langs_count, 1, langs_count);

    // returns theme based colors with proper overrides and defaults
    const { titleColor, textColor, iconColor, bgColor, borderColor } =
      getCardColors({
        title_color,
        icon_color,
        text_color,
        bg_color,
        border_color,
        theme,
      });

    const filteredLanguages = languages
      ? languages
          .filter((language) => language.hours || language.minutes)
          .slice(0, langsCount)
      : [];

    // Calculate the card height depending on how many items there are
    // but if rank circle is visible clamp the minimum height to `150`
    let height = Math.max(
      45 + (filteredLanguages.length + 1) * line_height,
      150,
    );

    const cssStyles = getStyles({
      titleColor,
      textColor,
      iconColor,
    });

    let finalLayout = "";

    let width = 440;

    // RENDER COMPACT LAYOUT
    if (layout === "compact") {
      width = width + 50;
      height = 90 + Math.round(filteredLanguages.length / 2) * 25;

      // progressOffset holds the previous language's width and used to offset the next language
      // so that we can stack them one after another, like this: [--][----][---]
      let progressOffset = 0;
      const compactProgressBar = filteredLanguages
        .map((language) => {
          // const progress = (width * lang.percent) / 100;
          const progress = ((width - 25) * language.percent) / 100;

          const languageColor = languageColors[language.name] || "#858585";

          const output = `
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
        x: 0,
        y: 25,
        langs: filteredLanguages,
        totalSize: 100,
      }).join("")}
    `;
    } else {
      finalLayout = flexLayout({
        items: filteredLanguages.length
          ? filteredLanguages.map((language) => {
              return createTextNode({
                id: language.name,
                label: language.name,
                value: language.text,
                percent: language.percent,
                progressBarColor: titleColor,
                progressBarBackgroundColor: textColor,
                hideProgress: hide_progress,
              });
            })
          : [
              noCodingActivityNode({
                color: textColor,
                text: this.i18n.t("nocodingactivity"),
              }),
            ],
        gap: line_height,
        direction: "column",
      }).join("");
    }

    const card = new CardRenderer({
      customTitle: custom_title,
      defaultTitle: this.i18n.t("title"),
      width: 495,
      height,
      border_radius,
      colors: {
        titleColor,
        textColor,
        iconColor,
        bgColor,
        borderColor,
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

  protected getCacheSeconds() {
    const { cache_seconds } = this.props;
    return cache_seconds
      ? super.getCacheSeconds()
      : Card.CATCH_SECONDS.FOUR_HOURS;
  }
}
