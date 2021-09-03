import { VercelRequestQuery } from "@vercel/node";
import { ServerError } from "../../helpers/Error";
import {
  toBoolean,
  toFloatingNumber,
  toString,
  toStringArray,
} from "../../utils/vercelRequestQuery";
import Card, { CommonProps } from "../Card";
import generateTranslation from "./translation";
import fetchStats, { IStats } from "./fetcher";
import { BLACKLIST } from "../../utils/github";
import icons from "../../icons/github";
import { clampValue, getCardColors } from "../../utils/render";
import { measureText } from "../../utils/string";
import StatRow from "../../components/StatRow";
import CircleProgress from "../../components/CircleProgress";
import CardContainer from "../../components/CardContainer";
import FlexLayout from "../../components/FlexLayout";
import SVGRender from "../../helpers/SVGRender";

export interface GithubStatsProps extends CommonProps {
  hide: string[];
  hide_rank?: boolean;
  hide_title?: boolean;
  show_icons?: boolean;
  include_all_commits?: boolean;
  count_private?: boolean;
  line_height?: number;
  custom_title?: string;
  disable_animations?: boolean;
}

export default class GitHubStatsCard extends Card {
  constructor(props: VercelRequestQuery) {
    super(props, generateTranslation());
  }
  protected preprocess(props: VercelRequestQuery): GithubStatsProps {
    const commonProps = super.preprocess(props);

    const {
      hide,
      hide_rank,
      hide_title,
      show_icons,
      include_all_commits,
      count_private,
      line_height,
      custom_title,
      disable_animations,
    } = props;

    return {
      ...commonProps,
      hide: toStringArray(hide),
      hide_rank: toBoolean(hide_rank),
      hide_title: toBoolean(hide_title),
      show_icons: toBoolean(show_icons),
      include_all_commits: toBoolean(include_all_commits),
      count_private: toBoolean(count_private),
      line_height: toFloatingNumber(line_height),
      custom_title: toString(custom_title),
      disable_animations: toBoolean(disable_animations),
    };
  }
  protected checkProps() {
    super.checkProps();
    const { username } = this.props;

    if (BLACKLIST.includes(username)) {
      throw new ServerError(ServerError.TYPE.UNEXPECTED);
    }
  }

  protected async fetchStats(): Promise<IStats> {
    const { username, count_private, include_all_commits } = this
      .props as GithubStatsProps;
    return await fetchStats(username, count_private, include_all_commits);
  }

  protected renderCard(stats: IStats) {
    const { name } = stats;
    const apostrophe = ["x", "s"].includes(name.slice(-1).toLocaleLowerCase())
      ? ""
      : "s";

    this.i18n.setTranslation(generateTranslation(name, apostrophe));

    const {
      totalStars,
      totalCommits,
      totalPRs,
      totalIssues,
      contributedTo,
      rank,
    } = stats;
    const {
      include_all_commits = false,
      locale,
      hide = [],
    } = this.props as GithubStatsProps;

    const longLocales = [
      "cn",
      "es",
      "fr",
      "pt-br",
      "ru",
      "uk-ua",
      "id",
      "my",
      "pl",
    ];
    const isLongLocale = longLocales.includes(locale) === true;

    const {
      line_height = 25,
      hide_rank = false,
      show_icons = false,
      hide_title = false,
      hide_border = false,
      disable_animations = false,
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
      custom_title,
      border_radius,
    } = this.props as GithubStatsProps;

    const statItemData = {
      stars: {
        icon: icons.star,
        label: this.i18n.t("totalstars"),
        value: totalStars,
        id: "stars",
      },
      commits: {
        icon: icons.commits,
        label: `${this.i18n.t("commits")}${
          include_all_commits ? "" : ` (${new Date().getFullYear()})`
        }`,
        value: totalCommits,
        id: "commits",
      },
      prs: {
        icon: icons.prs,
        label: this.i18n.t("prs"),
        value: totalPRs,
        id: "prs",
      },
      issues: {
        icon: icons.issues,
        label: this.i18n.t("issues"),
        value: totalIssues,
        id: "issues",
      },
      contribs: {
        icon: icons.contribs,
        label: this.i18n.t("contribs"),
        value: contributedTo,
        id: "contribs",
      },
    } as const;

    // filter out hidden stats defined by user & create the text nodes
    const statItems = Object.keys(statItemData)
      .filter((key) => !hide.includes(key))
      .map((key, index) => (
        // create the text nodes, and pass index so that we can calculate the line spacing
        <StatRow
          index={index}
          showIcons={show_icons}
          shiftValuePos={
            (!include_all_commits ? 50 : 20) + (isLongLocale ? 50 : 0)
          }
          {...statItemData[key as keyof typeof statItemData]}
        ></StatRow>
      ));

    // Calculate the card height depending on how many items there are
    // but if rank circle is visible clamp the minimum height to `150`
    const cardHeight = Math.max(
      45 + (statItems.length + 1) * line_height,
      hide_rank ? 0 : 150,
    );

    // Conditionally rendered elements
    const rankCircle = hide_rank ? (
      ""
    ) : (
      <CircleProgress
        containerHeight={cardHeight}
        text={rank.level}
        progress={100 - rank.score}
      ></CircleProgress>
    );

    const colors = getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

    const width = hide_rank
      ? clampValue(
          50 /* padding */ +
            measureText(custom_title ?? this.i18n.t("title")) * 2,
          270 /* min */,
          Infinity,
        )
      : 495;

    return (
      <CardContainer
        width={width}
        height={cardHeight}
        borderRadius={border_radius}
        colors={colors}
        customTitle={custom_title}
        defaultTitle={this.i18n.t("title")}
        hideBorder={hide_border}
        hideTitle={hide_title}
        isDisableAnimation={disable_animations}
      >
        {rankCircle}

        <svg x="0" y="0">
          <FlexLayout
            gap={line_height}
            direction="column"
            items={statItems}
          ></FlexLayout>
        </svg>
      </CardContainer>
    );
  }
}
