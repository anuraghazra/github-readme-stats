import { VercelRequestQuery } from "@vercel/node";
import { ServerError } from "../../helpers/Error";
import { BLACKLIST } from "../../utils/github";
import { toBoolean, toString } from "../../utils/vercelRequestQuery";
import Card, { CommonProps } from "../Card";
import fetchRepo, { IStats } from "./fetcher";
import translation from "./translation";
import toEmoji from "emoji-name-map";
import { encodeHTML, wrapTextMultiline, kFormatter } from "../../utils/string";
import icons from "../../icons/github";
import { getCardColors } from "../../utils/render";
import CardContainer from "../../components/CardContainer";
import SVGRender from "../../helpers/SVGRender";
import FlexLayout from "../../components/FlexLayout";
import LanguageLabel from "../../components/LanguageLabel";

interface GithubPinRepoProps extends CommonProps {
  repo: string;
  show_owner: boolean;
}

export default class GitHubPinRepo extends Card {
  private isBothOver1K = false;
  private isBothUnder1 = false;
  constructor(query: VercelRequestQuery) {
    super(query, translation);
  }
  protected preprocess(query: VercelRequestQuery): GithubPinRepoProps {
    const commonProps = super.preprocess(query);

    const { repo, show_owner } = query;

    return {
      ...commonProps,
      repo: toString(repo) ?? "",
      show_owner: toBoolean(show_owner) ?? false,
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
    const { username, repo } = this.props as GithubPinRepoProps;

    const repoInfo = await fetchRepo(username, repo);

    const stars = repoInfo.stargazers.totalCount;
    const forks = repoInfo.forkCount;
    this.isBothOver1K = stars > 1000 && forks > 1000;
    this.isBothUnder1 = stars < 1 && forks < 1;

    return repoInfo;
  }

  protected getCacheSeconds() {
    const { cache_seconds } = this.props;
    if (!cache_seconds && (this.isBothOver1K || this.isBothUnder1)) {
      return Card.CATCH_SECONDS.FOUR_HOURS;
    } else {
      return super.getCacheSeconds();
    }
  }

  protected renderCard(repoInfo: IStats) {
    const {
      name,
      nameWithOwner,
      description,
      primaryLanguage,
      stargazers,
      isArchived,
      isTemplate,
      forkCount,
    } = repoInfo;
    const {
      hide_border = false,
      title_color,
      icon_color,
      text_color,
      bg_color,
      show_owner,
      theme = "default_repocard",
      border_radius,
      border_color,
    } = this.props as GithubPinRepoProps;

    const header = show_owner ? nameWithOwner : name;
    const langName = (primaryLanguage && primaryLanguage.name) || "Unspecified";
    const langColor = (primaryLanguage && primaryLanguage.color) || "#333";
    const shiftText = langName.length > 15 ? 0 : 30;
    // parse emojis to unicode
    const desc = (description || "No description provided").replace(
      /:\w+:/gm,
      (emoji) => {
        return toEmoji.get(emoji) || "";
      },
    );

    const multiLineDescription = wrapTextMultiline(desc);
    const descriptionLines = multiLineDescription.length;
    const lineHeight = 10;
    const height =
      (descriptionLines > 1 ? 120 : 110) + descriptionLines * lineHeight;

    // returns theme based colors with proper overrides and defaults
    const colors = getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

    return (
      <CardContainer
        defaultTitle={header}
        titlePrefixIcon={icons.contribs}
        width={400}
        height={height}
        borderRadius={border_radius}
        colors={colors}
        isDisableAnimation
        hideBorder={hide_border}
      >
        {isTemplate || isArchived ? (
          <Badge
            label={
              isTemplate
                ? this.i18n.t("template")
                : isArchived
                ? this.i18n.t("archived")
                : ""
            }
          ></Badge>
        ) : null}

        <text
          x="25"
          y="-5"
          style={{
            "font-size": "13px",
          }}
          class="text-fill"
          data-testid="description"
        >
          {multiLineDescription.map((line) => (
            <tspan dy="1.2em" x="25">
              {encodeHTML(line)}
            </tspan>
          ))}
        </text>

        <g transform={`translate(0, ${height - 75})`}>
          {primaryLanguage ? (
            <LanguageLabel
              name={langName}
              color={langColor}
              testid="primary-lang"
              x={30}
              y={0}
            />
          ) : null}

          <g
            data-testid="star-fork-group"
            transform={`translate(${
              primaryLanguage ? 155 - shiftText : 25
            }, 0)`}
          >
            <FlexLayout
              items={[
                stargazers.totalCount ? (
                  <IconWithLabel
                    icon={icons.star}
                    label={kFormatter(stargazers.totalCount)}
                    testid="stargazers"
                  />
                ) : null,
                forkCount ? (
                  <IconWithLabel
                    icon={icons.fork}
                    label={kFormatter(forkCount)}
                    testid="forkcount"
                  />
                ) : null,
              ]}
              gap={65}
            ></FlexLayout>
          </g>
        </g>
      </CardContainer>
    );
  }
}

function Badge({ label = "" }) {
  return (
    <g
      data-testid="badge"
      transform="translate(320, -18)"
      class="font-semibold text-xs"
    >
      <rect
        class="text-stroke"
        stroke-width="1"
        width="70"
        height="20"
        x="-12"
        y="-14"
        ry="10"
        rx="10"
        style={{
          opacity: 0.2,
        }}
      ></rect>
      <text
        x="23"
        y="-5"
        alignment-baseline="central"
        dominant-baseline="central"
        text-anchor="middle"
        class="text-fill"
      >
        {label}
      </text>
    </g>
  );
}

function IconWithLabel({
  icon,
  label,
  testid,
}: {
  icon: string;
  label: string | number;
  testid: string;
}) {
  return (
    <g>
      <svg
        class="icon"
        y="-12"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
      >
        {icon}
      </svg>
      <text data-testid={testid} class="text-fill text-sm" x="25" y="0">
        {label}
      </text>
    </g>
  );
}
