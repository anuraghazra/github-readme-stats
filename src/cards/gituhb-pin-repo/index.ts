import { VercelRequestQuery } from "@vercel/node";
import { ServerError } from "../../helpers/Error";
import { BLACKLIST } from "../../utils/github";
import { toBoolean, toString } from "../../utils/vercelRequestQuery";
import Card, { CommonProps } from "../Card";
import fetchRepo, { IStats } from "./fetcher";
import translation from "./translation";
import toEmoji from "emoji-name-map";
import { encodeHTML, wrapTextMultiline } from "../../utils/string";
import CardRenderer from "../../helpers/CardRenderer";
import icons from "../../icons/github";
import { flexLayout, getCardColors, kFormatter } from "../../utils/render";

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

    let desc = description || "No description provided";

    // parse emojis to unicode
    desc = desc.replace(/:\w+:/gm, (emoji) => {
      return toEmoji.get(emoji) || "";
    });

    const multiLineDescription = wrapTextMultiline(desc);
    const descriptionLines = multiLineDescription.length;
    const lineHeight = 10;

    const height =
      (descriptionLines > 1 ? 120 : 110) + descriptionLines * lineHeight;

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

    const totalStars = kFormatter(stargazers.totalCount);
    const totalForks = kFormatter(forkCount);

    const getBadgeSVG = (label: string) => `
        <g data-testid="badge" class="badge" transform="translate(320, -18)">
          <rect stroke="${textColor}" stroke-width="1" width="70" height="20" x="-12" y="-14" ry="10" rx="10"></rect>
          <text
            x="23" y="-5"
            alignment-baseline="central"
            dominant-baseline="central"
            text-anchor="middle"
            fill="${textColor}"
          >
            ${label}
          </text>
        </g>
      `;

    const svgLanguage = primaryLanguage
      ? `
        <g data-testid="primary-lang" transform="translate(30, 0)">
          <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
          <text data-testid="lang-name" class="gray" x="15">${langName}</text>
        </g>
        `
      : "";

    const iconWithLabel = (icon, label, testid) => {
      return `
          <svg class="icon" y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            ${icon}
          </svg>
          <text data-testid="${testid}" class="gray" x="25">${label}</text>
        `;
    };
    const svgStars =
      stargazers.totalCount > 0
        ? iconWithLabel(icons.star, totalStars, "stargazers")
        : "";
    const svgForks =
      forkCount > 0 ? iconWithLabel(icons.fork, totalForks, "forkcount") : "";

    const starAndForkCount = flexLayout({
      items: [svgStars, svgForks],
      gap: 65,
    }).join("");

    const card = new CardRenderer({
      defaultTitle: header,
      titlePrefixIcon: icons.contribs,
      width: 400,
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

    card.disableAnimations();
    card.setHideBorder(hide_border);
    card.setHideTitle(false);
    card.setCSS(`
        .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
        .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
        .icon { fill: ${iconColor} }
        .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; }
        .badge rect { opacity: 0.2 }
      `);

    return card.render(`
        ${
          isTemplate
            ? getBadgeSVG(this.i18n.t("template"))
            : isArchived
            ? getBadgeSVG(this.i18n.t("archived"))
            : ""
        }
    
        <text class="description" x="25" y="-5">
          ${multiLineDescription
            .map(
              (line) => `<tspan dy="1.2em" x="25">${encodeHTML(line)}</tspan>`,
            )
            .join("")}
        </text>
    
        <g transform="translate(0, ${height - 75})">
          ${svgLanguage}
    
          <g
            data-testid="star-fork-group"
            transform="translate(${primaryLanguage ? 155 - shiftText : 25}, 0)"
          >
            ${starAndForkCount}
          </g>
        </g>
      `);
  }
}
