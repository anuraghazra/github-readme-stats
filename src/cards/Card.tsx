import { URLQueryError } from "../helpers/Error";
import I18n, { ITranslation } from "../helpers/I18n";
import { VercelRequestQuery, VercelResponse } from "@vercel/node";
import {
  toBoolean,
  toFloatingNumber,
  toInteger,
  toString,
} from "../utils/vercelRequestQuery";
import { logger } from "../utils/debug";
import SVGRender, { render } from "../helpers/SVGRender";
import Error from "../components/Error";

export interface CommonProps {
  username: string;
  locale: string;
  title_color?: string;
  text_color?: string;
  icon_color?: string;
  border_color?: string;
  bg_color?: string;
  hide_border?: boolean;
  cache_seconds?: number;
  border_radius?: number;
  theme?: string;
}

export default class Card {
  static CATCH_SECONDS = {
    THIRTY_MINUTES: 1800,
    TWO_HOURS: 7200,
    FOUR_HOURS: 14400,
    ONE_DAY: 86400,
  };
  protected props: CommonProps;
  protected "i18n";

  constructor(query: VercelRequestQuery, translation: ITranslation) {
    this.props = this.preprocess(query);
    this.i18n = new I18n(this.props.locale, translation);
  }

  public async generateSvgString(
    setResponseHeader: VercelResponse["setHeader"],
  ): Promise<string> {
    try {
      this.checkProps();
      const stats = await this.fetchStats();
      const svgElement = this.renderCard(stats);
      setResponseHeader(
        "Cache-Control",
        `public, max-age=${this.getCacheSeconds()}`,
      );

      return render(svgElement);
    } catch (err) {
      logger.log(err);
      return render(<Error error={err} />);
    }
  }

  protected getCacheSeconds() {
    const { cache_seconds } = this.props;
    const { TWO_HOURS, ONE_DAY } = Card.CATCH_SECONDS;

    return Math.max(TWO_HOURS, Math.min(cache_seconds || TWO_HOURS, ONE_DAY));
  }

  protected preprocess(query: VercelRequestQuery): CommonProps {
    const {
      title_color,
      text_color,
      icon_color,
      border_color,
      bg_color,
      hide_border,
      cache_seconds,
      border_radius,
      locale,
      theme,
      username,
    } = query;

    return {
      cache_seconds: toInteger(cache_seconds),
      hide_border: toBoolean(hide_border),
      title_color: toString(title_color),
      text_color: toString(text_color),
      icon_color: toString(icon_color),
      border_color: toString(border_color),
      bg_color: toString(bg_color),
      border_radius: toFloatingNumber(border_radius),
      theme: toString(theme),
      username: toString(username) ?? "",
      locale: toString(locale)?.toLowerCase() ?? "en",
    };
  }

  protected checkProps() {
    const { username, locale } = this.props;

    if (!username) {
      throw new URLQueryError(URLQueryError.TYPE.MISSING, "username");
    }

    if (!this.i18n.isLocaleAvailable(locale)) {
      throw new URLQueryError(
        URLQueryError.TYPE.NOT_SUPPORTED,
        `locale=${locale}`,
      );
    }
  }

  protected async fetchStats(): Promise<any> {}

  protected renderCard(_stats: any): SVGRender.SVGElement | string {
    return <svg></svg>;
  }
}
