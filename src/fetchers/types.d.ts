export type GistData = {
  name: string;
  nameWithOwner: string;
  description: string;
  language: string | null;
  starsCount: number;
  forksCount: number;
};

export type RepositoryData = {
  name: string;
  nameWithOwner: string;
  isPrivate: boolean;
  isArchived: boolean;
  isTemplate: boolean;
  stargazers: { totalCount: number };
  description: string;
  primaryLanguage: {
    color: string;
    id: string;
    name: string;
  };
  forkCount: number;
  starCount: number;
};

export type StatsData = {
  name: string;
  totalPRs: number;
  totalPRsMerged: number;
  mergedPRsPercentage: number;
  totalReviews: number;
  totalCommits: number;
  totalIssues: number;
  totalStars: number;
  totalDiscussionsStarted: number;
  totalDiscussionsAnswered: number;
  contributedTo: number;
  rank: { level: string; percentile: number };
};

export type Lang = {
  name: string;
  color: string;
  size: number;
};

export type TopLangData = Record<string, Lang>;

export type WakaTimeData = {
  categories: {
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }[];
  daily_average: number;
  daily_average_including_other_language: number;
  days_including_holidays: number;
  days_minus_holidays: number;
  editors: {
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }[];
  holidays: number;
  human_readable_daily_average: string;
  human_readable_daily_average_including_other_language: string;
  human_readable_total: string;
  human_readable_total_including_other_language: string;
  id: string;
  is_already_updating: boolean;
  is_coding_activity_visible: boolean;
  is_including_today: boolean;
  is_other_usage_visible: boolean;
  is_stuck: boolean;
  is_up_to_date: boolean;
  languages: {
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }[];
  operating_systems: {
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }[];
  percent_calculated: number;
  range: string;
  status: string;
  timeout: number;
  total_seconds: number;
  total_seconds_including_other_language: number;
  user_id: string;
  username: string;
  writes_only: boolean;
};

export type WakaTimeLang = {
  name: string;
  text: string;
  percent: number;
};
