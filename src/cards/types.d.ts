type ThemeNames = keyof typeof import("../../themes/index.js");
type RankIcon = "default" | "github" | "percentile";

export type CommonOptions = {
  title_color: string;
  icon_color: string;
  text_color: string;
  bg_color: string;
  theme: ThemeNames;
  border_radius: number;
  border_color: string;
  locale: string;
  hide_border: boolean;
};

export type StatCardOptions = CommonOptions & {
  hide: string[];
  show_icons: boolean;
  hide_title: boolean;
  card_width: number;
  hide_rank: boolean;
  include_all_commits: boolean;
  line_height: number | string;
  custom_title: string;
  disable_animations: boolean;
  number_format: string;
  ring_color: string;
  text_bold: boolean;
  rank_icon: RankIcon;
  show: string[];
};

export type RepoCardOptions = CommonOptions & {
  show_owner: boolean;
};

export type TopLangOptions = CommonOptions & {
  hide_title: boolean;
  card_width: number;
  hide: string[];
  layout: "compact" | "normal" | "donut" | "donut-vertical" | "pie";
  custom_title: string;
  langs_count: number;
  disable_animations: boolean;
  hide_progress: boolean;
};

type WakaTimeOptions = CommonOptions & {
  hide_title: boolean;
  hide: string[];
  line_height: string;
  hide_progress: boolean;
  custom_title: string;
  layout: "compact" | "normal";
  langs_count: number;
};

export type GistCardOptions = CommonOptions & {
  show_owner: boolean;
};
