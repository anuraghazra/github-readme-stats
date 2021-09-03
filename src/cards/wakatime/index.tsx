import { VercelRequestQuery } from "@vercel/node";
import axios from "axios";
import CardContainer from "../../components/CardContainer";
import CompactProgress from "../../components/CompactProgress";
import FlexLayout from "../../components/FlexLayout";
import Progress from "../../components/Progress";
import { FetchStatError } from "../../helpers/Error";
import SVGRender from "../../helpers/SVGRender";
import { languageColors } from "../../utils/languages";
import { getCardColors } from "../../utils/render";
import { lowercaseTrim } from "../../utils/string";
import {
  toBoolean,
  toInteger,
  toString,
  toStringArray,
} from "../../utils/vercelRequestQuery";
import Card, { CommonProps } from "../Card";
import translation from "./translation";

const recalculatePercentages = (languages: WakaTimeStats) => {
  // recalculating percentages so that,
  // compact layout's progress bar does not break when hiding languages
  const totalSum = languages.reduce(
    (totalSum, language) => totalSum + language.percent,
    0,
  );
  const weight = +(100 / totalSum).toFixed(2);
  languages.forEach((language) => {
    language.percent = +(language.percent * weight).toFixed(2);
  });
};

export const fetchWakaTime = async (
  username: string,
  api_domain?: string,
  range?: string,
) => {
  try {
    const { data } = await axios.get(
      `https://${
        api_domain ? api_domain.replace(/\/$/gi, "") : "wakatime.com"
      }/api/v1/users/${username}/stats/${range || ""}?is_including_today=true`,
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
};

interface WakaTimeProps extends CommonProps {
  line_height: number;
  hide_title: boolean;
  hide_progress: boolean;
  custom_title?: string;
  layout: "default" | "compact" | string;
  langs_count?: number;
  api_domain?: string;
  range?: string;
  hide: string[];
}

type WakaTimeStats = Array<{
  hours: number;
  minutes: number;
  percent: number;
  name: string;
  text: string;
}>;

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
      hide,
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
      hide: toStringArray(hide),
    };
  }
  protected async fetchStats(): Promise<WakaTimeStats> {
    const { username, api_domain, range } = this.props as WakaTimeProps;

    return await fetchWakaTime(username, api_domain, range);
  }

  protected renderCard(stats: { languages: WakaTimeStats }): string {
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
      layout,
      langs_count = languages ? languages.length : 0,
      border_radius,
      border_color,
      hide,
    } = this.props as WakaTimeProps;

    const hiddenLangs = new Set(hide.map(lowercaseTrim));
    const langsCount = Math.max(1, langs_count);
    const filteredLanguages = languages
      ? languages
          .filter(
            (language) =>
              (language.hours || language.minutes) &&
              !hiddenLangs.has(lowercaseTrim(language.name)),
          )
          .slice(0, langsCount)
      : [];

    recalculatePercentages(filteredLanguages);

    // Calculate the card height depending on how many items there are
    // but if rank circle is visible clamp the minimum height to `150`
    let height = Math.max(
      45 + (filteredLanguages.length + 1) * line_height,
      150,
    );

    // returns theme based colors with proper overrides and defaults
    const colors = getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

    let progressLayout = "";
    let width = 440;

    // RENDER COMPACT LAYOUT
    if (layout === "compact") {
      width = width + 50;
      height = CompactProgress.getHeight(filteredLanguages.length);
      progressLayout = (
        <CompactProgress.component
          items={filteredLanguages.map((lang) => ({
            name: lang.name,
            color: languageColors[lang.name as keyof typeof languageColors],
            size: lang.percent,
            text: lang.text,
          }))}
          width={width - 50}
          langInfoSpace={205}
          langLabelFormatter={(lang) => `${lang.name} - ${lang.text}`}
        ></CompactProgress.component>
      );
    } else {
      height = Math.max(45 + (filteredLanguages.length + 1) * line_height, 150);
      progressLayout = (
        <FlexLayout
          items={
            filteredLanguages.length
              ? filteredLanguages.map((lang, index) => (
                  <g
                    class="fadeIn"
                    style={`animation-delay: ${(index + 3) * 150}ms`}
                  >
                    <text
                      class="font-bold text-fill"
                      y="12.5"
                      style={{
                        font: `600 14px 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif`,
                      }}
                    >
                      {lang.name}:
                    </text>
                    <text
                      style={{
                        font: `600 14px 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif`,
                      }}
                      class="font-bold text-fill"
                      x={hide_progress ? 170 : 350}
                      y="12.5"
                      data-testid={lang.name}
                    >
                      {lang.text}
                    </text>
                    {hide_progress ? null : (
                      <Progress.component
                        x={110}
                        y={4}
                        width={220}
                        name={lang.name}
                        color={colors.titleColor}
                        backgroundColor={colors.textColor}
                        progress={lang.percent}
                        hideName
                        hideLabel
                      ></Progress.component>
                    )}
                  </g>
                ))
              : [
                  <text
                    x="25"
                    y="11"
                    class="font-bold text-fill"
                    style={{
                      font: `600 14px 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif`,
                    }}
                    data-testid="nocoding"
                  >
                    {this.i18n.t("nocodingactivity")}
                  </text>,
                ]
          }
          gap={line_height}
          direction="column"
        ></FlexLayout>
      );
    }

    return (
      <CardContainer
        customTitle={custom_title}
        defaultTitle={this.i18n.t("title")}
        width={495}
        height={height}
        borderRadius={border_radius}
        colors={colors}
        hideBorder={hide_border}
        hideTitle={hide_title}
      >
        <svg x="25" y="0" width="100%">
          {progressLayout}
        </svg>
      </CardContainer>
    );
  }

  protected getCacheSeconds() {
    const { cache_seconds } = this.props;
    return cache_seconds
      ? super.getCacheSeconds()
      : Card.CATCH_SECONDS.FOUR_HOURS;
  }
}
