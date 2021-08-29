import { calculateRank } from "../../src/utils/github";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

export const genGithubStatsMockData = () => {
  const mockStats = {
    name: "Anurag Hazra",
    totalStars: 100,
    totalCommits: 200,
    totalIssues: 300,
    totalPRs: 400,
    contributedTo: 500,
    rank: null,
  };
  mockStats.rank = calculateRank({
    totalCommits: mockStats.totalCommits,
    totalRepos: 1,
    followers: 0,
    contributions: mockStats.contributedTo,
    stargazers: mockStats.totalStars,
    prs: mockStats.totalPRs,
    issues: mockStats.totalIssues,
  });

  return {
    data: {
      user: {
        name: mockStats.name,
        repositoriesContributedTo: { totalCount: mockStats.contributedTo },
        contributionsCollection: {
          totalCommitContributions: mockStats.totalCommits,
          restrictedContributionsCount: 100,
        },
        pullRequests: { totalCount: mockStats.totalPRs },
        issues: { totalCount: mockStats.totalIssues },
        followers: { totalCount: 0 },
        repositories: {
          totalCount: 1,
          nodes: [{ stargazers: { totalCount: 100 } }],
        },
      },
    },
  };
};

export const genGithubPinRepoMockData = () => {
  const data_repo = {
    repository: {
      name: "convoychat",
      nameWithOwner: "anuraghazra/convoychat",
      stargazers: { totalCount: 38000 },
      description: "Help us take over the world! React + TS + GraphQL Chat App",
      primaryLanguage: {
        color: "#2b7489",
        id: "MDg6TGFuZ3VhZ2UyODc=",
        name: "TypeScript",
      },
      forkCount: 100,
      isTemplate: false,
    },
  };

  return {
    data: {
      user: { repository: data_repo.repository },
      organization: null,
    },
  };
};

export const genGithubTopLangsMockData = () => {
  const data_langs = {
    data: {
      user: {
        repositories: {
          nodes: [
            {
              languages: {
                edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
              },
            },
            {
              languages: {
                edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
              },
            },
            {
              languages: {
                edges: [
                  { size: 100, node: { color: "#0ff", name: "javascript" } },
                ],
              },
            },
            {
              languages: {
                edges: [
                  { size: 100, node: { color: "#0ff", name: "javascript" } },
                ],
              },
            },
            {
              languages: {
                edges: [{ size: 100, node: { color: "#ff0", name: "css" } }],
              },
            },
          ],
        },
      },
    },
  };

  return data_langs;
};

export const genWakatimeMockData = () => {
  const wakaTimeData = {
    data: {
      categories: [
        {
          digital: "22:40",
          hours: 22,
          minutes: 40,
          name: "Coding",
          percent: 100,
          text: "22 hrs 40 mins",
          total_seconds: 81643.570077,
        },
      ],
      daily_average: 16095,
      daily_average_including_other_language: 16329,
      days_including_holidays: 7,
      days_minus_holidays: 5,
      editors: [
        {
          digital: "22:40",
          hours: 22,
          minutes: 40,
          name: "VS Code",
          percent: 100,
          text: "22 hrs 40 mins",
          total_seconds: 81643.570077,
        },
      ],
      holidays: 2,
      human_readable_daily_average: "4 hrs 28 mins",
      human_readable_daily_average_including_other_language: "4 hrs 32 mins",
      human_readable_total: "22 hrs 21 mins",
      human_readable_total_including_other_language: "22 hrs 40 mins",
      id: "random hash",
      is_already_updating: false,
      is_coding_activity_visible: true,
      is_including_today: false,
      is_other_usage_visible: true,
      is_stuck: false,
      is_up_to_date: true,
      languages: [
        {
          digital: "0:19",
          hours: 0,
          minutes: 19,
          name: "Other",
          percent: 1.43,
          text: "19 mins",
          total_seconds: 1170.434361,
        },
        {
          digital: "0:01",
          hours: 0,
          minutes: 1,
          name: "TypeScript",
          percent: 0.1,
          text: "1 min",
          total_seconds: 83.293809,
        },
        {
          digital: "0:00",
          hours: 0,
          minutes: 0,
          name: "YAML",
          percent: 0.07,
          text: "0 secs",
          total_seconds: 54.975151,
        },
      ],
      operating_systems: [
        {
          digital: "22:40",
          hours: 22,
          minutes: 40,
          name: "Mac",
          percent: 100,
          text: "22 hrs 40 mins",
          total_seconds: 81643.570077,
        },
      ],
      percent_calculated: 100,
      range: "last_7_days",
      status: "ok",
      timeout: 15,
      total_seconds: 80473.135716,
      total_seconds_including_other_language: 81643.570077,
      user_id: "random hash",
      username: "anuraghazra",
      writes_only: false,
    },
  };

  return wakaTimeData;
};

export const genUserNotFoundErrorData = () => {
  return {
    errors: [
      {
        type: "NOT_FOUND",
        path: ["user"],
        locations: [],
        message: "Could not resolve to a User with the login of 'noname'.",
      },
    ],
  };
};

export const mockVercel = (query = {}) => {
  const req = {
    query: {
      username: "anuraghazra",
      ...query,
    },
  };
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
    status: jest.fn(function () {
      return this;
    }),
  };

  return { req, res };
};

export const mockGithubRequest = (responseData) => {
  const mock = new MockAdapter(axios);
  mock.onPost("https://api.github.com/graphql").reply(function () {
    return [200, responseData];
  });
  return () => {
    mock.restore();
  };
};

export const mockWakaTimeRequest = (responseData) => {
  const mock = new MockAdapter(axios);

  mock.onGet(/https:\/\/wakatime\.com\/api\/v1\/*/).reply(200, responseData);

  return () => {
    mock.restore();
  };
};

export const mockWakaTimeErrorRequest = (status, responseData) => {
  const mock = new MockAdapter(axios);
  mock.onGet(/https:\/\/wakatime\.com\/api/).reply(status, responseData);
  return () => {
    mock.restore();
  };
};
