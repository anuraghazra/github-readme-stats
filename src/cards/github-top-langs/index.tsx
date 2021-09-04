import { VercelRequestQuery } from "@vercel/node";
import Card, { CommonProps } from "../Card";
import translation from "./translation";
import { BLACKLIST } from "../../utils/github";
import { ServerError } from "../../helpers/Error";
import {
  toBoolean,
  toFloatingNumber,
  toInteger,
  toString,
  toStringArray,
} from "../../utils/vercelRequestQuery";
import fetchTopLanguages, { IStats } from "./fetcher";
import { lowercaseTrim } from "../../utils/string";
import { getCardColors } from "../../utils/render";
import CompactProgress from "../../components/CompactProgress";
import CardContainer from "../../components/CardContainer";
import SVGRender from "../../helpers/SVGRender";
import FlexLayout from "../../components/FlexLayout";
import Progress from "../../components/Progress";

interface GithubTopLangsProps extends CommonProps {
  hide: string[];
  hide_title: boolean;
  layout: "default" | "compact" | string;
  langs_count: number;
  exclude_repo: string[];
  card_width?: number;
  custom_title?: string;
}

export default class GithubTopLangs extends Card {
  constructor(props: VercelRequestQuery) {
    super(props, translation);
  }
  protected preprocess(props: VercelRequestQuery): GithubTopLangsProps {
    const commonProps = super.preprocess(props);
    const {
      hide,
      hide_title,
      layout,
      langs_count,
      exclude_repo,
      card_width,
      custom_title,
    } = props;

    return {
      ...commonProps,
      hide: toStringArray(hide),
      exclude_repo: toStringArray(exclude_repo),
      hide_title: toBoolean(hide_title) ?? false,
      langs_count: toInteger(langs_count) ?? 5,
      card_width: toFloatingNumber(card_width),
      custom_title: toString(custom_title),
      layout: toString(layout) ?? "default",
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
    const { username, exclude_repo } = this.props as GithubTopLangsProps;

    return await fetchTopLanguages(username, exclude_repo);
  }
  protected renderCard(topLangs: IStats) {
    const {
      hide,
      langs_count,
      card_width,
      layout,
      title_color,
      text_color,
      bg_color,
      border_color,
      theme,
      custom_title,
      border_radius,
      hide_border = false,
      hide_title = false,
    } = this.props as GithubTopLangsProps;

    const hiddenLangs = new Set(hide.map(lowercaseTrim));
    const langsCount = Math.min(Math.max(1, langs_count), 10);
    const langs = topLangs
      .filter((lang) => !hiddenLangs.has(lowercaseTrim(lang.name)))
      .slice(0, langsCount);
    const totalLanguageSize = langs.reduce((acc, curr) => acc + curr.size, 0);

    let width = card_width ?? 300;
    let height;

    let progressLayout = "";
    if (layout === "compact") {
      width = width + 50; // padding
      height = CompactProgress.getHeight(langs.length);
      progressLayout = (
        <CompactProgress.component
          width={width - 50}
          items={langs}
        ></CompactProgress.component>
      );
    } else {
      height = Progress.getHeight(langs.length);
      progressLayout = (
        <FlexLayout
          items={langs.map((lang) => (
            <Progress.component
              width={width - 95}
              name={lang.name}
              color={lang.color}
              progress={(lang.size / totalLanguageSize) * 100}
              testid="lang-name"
              labelFormatter={(progress) => progress.toFixed(2) + "%"}
            />
          ))}
          gap={40}
          direction="column"
        ></FlexLayout>
      );
    }

    // returns theme based colors with proper overrides and defaults
    const colors = getCardColors({
      title_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

    return (
      <CardContainer
        customTitle={custom_title}
        defaultTitle={this.i18n.t("title")}
        width={width}
        height={height}
        borderRadius={border_radius}
        colors={colors}
        isDisableAnimation
        hideBorder={hide_border}
        hideTitle={hide_title}
      >
        <svg data-testid="lang-items" x="25">
          {progressLayout}
        </svg>
      </CardContainer>
    );
  }
}
