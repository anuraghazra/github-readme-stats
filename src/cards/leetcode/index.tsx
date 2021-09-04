import { VercelRequestQuery } from "@vercel/node";
import Card, { CommonProps } from "../Card";
import translation from "./translation";
import SVGRender from "../../helpers/SVGRender";
import CardContainer from "../../components/CardContainer";
import { clampValue, getCardColors } from "../../utils/render";
import {
  toBoolean,
  toFloatingNumber,
  toString,
} from "../../utils/vercelRequestQuery";
import { URLQueryError } from "../../helpers/Error";
import { ChineseFetcher, EnglishFetcher } from "./fetcher";
import CircleProgress from "../../components/CircleProgress";
import FlexLayout from "../../components/FlexLayout";
import { measureText } from "../../utils/string";

export interface Props extends CommonProps {
  /** add props */
  line_height?: number;
  disable_animations: boolean;
  region: string;
  custom_title?: string;
  hide_title?: boolean;
  hide_progress?: boolean;
}

type FetchStats = Array<{
  difficulty: string;
  ac: number;
  count: number;
  acSubmissions: number;
  submissions: number;
}>;

export default class LeetCodeCard extends Card {
  constructor(props: VercelRequestQuery) {
    super(props, translation);
  }
  protected preprocess(query: VercelRequestQuery): Props {
    const commonProps = super.preprocess(query);

    const {
      line_height,
      disable_animations,
      region,
      custom_title,
      hide_title,
      hide_progress,
    } = query;

    /** initialize exclusive props */
    return {
      ...commonProps,
      line_height: toFloatingNumber(line_height),
      disable_animations: toBoolean(disable_animations) ?? false,
      region: toString(region) ?? "en",
      custom_title: toString(custom_title),
      hide_title: toBoolean(hide_title) ?? false,
      hide_progress: toBoolean(hide_progress) ?? false,
    };
  }
  protected checkProps() {
    super.checkProps();
    /** check exclusive props */

    const { region } = this.props as Props;

    if (!["en", "cn"].includes(region)) {
      throw new URLQueryError(URLQueryError.TYPE.INVALID, "region");
    }
  }

  protected async fetchStats(): Promise<FetchStats> {
    /** request data */
    const { region, username } = this.props as Props;
    const fetcher =
      region === "cn"
        ? new ChineseFetcher(username)
        : new EnglishFetcher(username);
    return await fetcher.fetchQuestionStats();
  }

  protected renderCard(stats: FetchStats): SVGRender.SVGElement {
    /**
     * render svg, support jsx
     * you can find exist components in src/components
     */
    const {
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
      custom_title,
      hide_title,
      hide_progress,
    } = this.props as Props;

    const difficultyColors = {
      easy: "#2DB55D",
      medium: "#FFB800",
      hard: "#EF4743",
    };
    const colors = getCardColors({
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

    const total = stats.reduce(
      (acc, cur) => {
        acc.ac += cur.ac;
        acc.count += cur.count;
        acc.acSubmissions += cur.acSubmissions;
        acc.submissions += cur.submissions;
        return acc;
      },
      {
        ac: 0,
        count: 0,
        acSubmissions: 0,
        submissions: 0,
      },
    );
    const submissionRate = (total.acSubmissions / total.submissions) * 100;
    const radius = hide_progress ? 0 : 46;
    const padding = 16;
    const titlePaddingX = 25;
    const height = 200;
    const width = clampValue(
      titlePaddingX * 2 +
        measureText(custom_title ?? this.i18n.t("title")) * 2 +
        radius * 2,
      300 /* min */,
      Infinity,
    );

    return (
      <CardContainer
        colors={colors}
        width={width}
        height={height}
        defaultTitle={this.i18n.t("title")}
        customTitle={custom_title}
        hideTitle={hide_title}
        paddingX={titlePaddingX}
      >
        {hide_progress ? null : (
          <CircleProgress
            progress={submissionRate}
            radius={radius}
            transform={`translate(${width - padding - radius}, ${
              hide_title ? 24 : 8
            })`}
          >
            <text class="text-xl font-semibold" x="0" y="-4">
              <tspan dx="0">{submissionRate.toFixed(1).split(".")[0]}</tspan>
              <tspan class="text-sm" dx="0" dy="2">
                .{submissionRate.toFixed(1).split(".")[1]}%
              </tspan>
            </text>
            <text class="text-sm text-secondary" x="0" y="14">
              {this.i18n.t("submitText")}
            </text>
          </CircleProgress>
        )}
        <g
          transform={`translate(${titlePaddingX}, 0)`}
          class="fadeIn"
          style={{ "animation-delay": "150ms" }}
        >
          <text class="font-semibold">
            <tspan class="text-secondary text-sm">
              {this.i18n.t("solved")}
            </tspan>
            <tspan class="text-fill text-2xl" dy="1.2em" x="0">
              {total.ac}
            </tspan>
          </text>
        </g>
        <g transform={`translate(${titlePaddingX}, ${height - 100})`}>
          <FlexLayout
            items={stats.map(({ difficulty, ac, count }, index) => {
              return (
                <text
                  class="fadeIn"
                  style={`animation-delay: ${(index + 2) * 150}ms`}
                >
                  <tspan
                    fill={
                      difficultyColors[
                        difficulty.toLowerCase() as keyof typeof difficultyColors
                      ]
                    }
                  >
                    {this.i18n.t(difficulty.toLowerCase())}
                  </tspan>
                  <tspan dy="1.4em" x="0" opacity="0.8" class="font-sans">
                    <tspan class="text-fill font-semibold">{ac}</tspan>
                    <tspan class="text-secondary text-sm font-medium">
                      /{count}
                    </tspan>
                  </tspan>
                </text>
              );
            })}
            gap={(width - padding) / 3}
          ></FlexLayout>
        </g>
      </CardContainer>
    );
  }
}
