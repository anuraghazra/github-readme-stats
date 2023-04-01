type ThemeNames = keyof typeof import("../../themes/index.js");

export type CommonOptions = {
  title_color: string;
  icon_color: string;
  text_color: string;
  bg_color: string;
  theme: ThemeNames;
  border_radius: number;
  border_color: string;
  locale: string;
};

export type StatCardOptions = CommonOptions & {
  hide: string[];
  show_icons: boolean;
  hide_title: boolean;
  hide_border: boolean;
  card_width: number;
  hide_rank: boolean;
  include_all_commits: boolean;
  line_height: number | string;
  custom_title: string;
  disable_animations: boolean;
};

export type RepoCardOptions = CommonOptions & {
  hide_border: boolean;
  show_owner: boolean;
};

export type TopLangOptions = CommonOptions & {
  hide_title: boolean;
  hide_border: boolean;
  card_width: number;
  hide: string[];
  layout: "compact" | "normal";
  custom_title: string;
  langs_count: number;
  disable_animations: boolean;
  hide_progress: boolean;
};

type WakaTimeOptions = CommonOptions & {
  hide_title: boolean;
  hide_border: boolean;
  hide: string[];
  line_height: string;
  hide_progress: boolean;
  custom_title: string;
  layout: "compact" | "normal";
  langs_count: number;
};
