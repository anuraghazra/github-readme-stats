import axios, { AxiosRequestConfig } from "axios";
import { FetchStatError } from "../../helpers/Error";

async function request(axiosConfig: AxiosRequestConfig) {
  try {
    return await axios(axiosConfig);
  } catch (e) {
    if (e.response) {
      const { status } = e.response;
      if (status >= 500) {
        throw new FetchStatError(FetchStatError.TYPE.UNEXPECTED);
      } else if (status === 400) {
        throw new FetchStatError(
          FetchStatError.TYPE.REQUEST_ERROR,
          e.response.data.errors[0]?.message,
        );
      }
    }

    throw e;
  }
}

type difficultyLevel = "easy" | "medium" | "hard";
class Fetcher {
  questionStats = {
    easy: {
      difficulty: "easy",
      ac: 0,
      count: 0,
      acSubmissions: 0,
      submissions: 0,
    },
    medium: {
      difficulty: "medium",
      ac: 0,
      count: 0,
      acSubmissions: 0,
      submissions: 0,
    },
    hard: {
      difficulty: "hard",
      ac: 0,
      count: 0,
      acSubmissions: 0,
      submissions: 0,
    },
  };
  username = "";

  constructor(username: string) {
    this.username = username;
  }
  async fetchQuestionStats() {
    await this._fetchAndUpdateQuestionStats?.();
    return Object.values(this.questionStats).sort((a, b) => {
      const orders = ["easy", "medium", "hard"];
      const aIndex = orders.indexOf(a.difficulty);
      const bIndex = orders.indexOf(b.difficulty);
      return aIndex - bIndex;
    });
  }
  async _fetchAndUpdateQuestionStats() {}
}

export class ChineseFetcher extends Fetcher {
  url = "https://leetcode-cn.com/graphql/";

  async _fetchAndUpdateQuestionStats() {
    const { data } = await request({
      url: this.url,
      method: "post",
      data: {
        variables: {
          userSlug: this.username,
        },
        query: `
        query userQuestionStats($userSlug: String!) {
            userProfilePublicProfile(userSlug: $userSlug) {
                username
              }
            userProfileUserQuestionProgress(userSlug: $userSlug) {
              numAcceptedQuestions {
                difficulty
                count
                __typename
              }
              numFailedQuestions {
                difficulty
                count
                __typename
              }
              numUntouchedQuestions {
                difficulty
                count
                __typename
              }
              __typename
            }
            userProfileUserQuestionSubmitStats(userSlug: $userSlug) {
              acSubmissionNum {
                difficulty
                count
                __typename
              }
              totalSubmissionNum {
                difficulty
                count
                __typename
              }
              __typename
            }
          }
          `,
      },
    });

    if (!data.data || !data.data.userProfilePublicProfile) {
      throw new FetchStatError(
        FetchStatError.TYPE.USER_NOT_FOUND,
        `Make sure "${this.username}" exists in leetcode.cn`,
      );
    }

    const {
      userProfileUserQuestionProgress,
      userProfileUserQuestionSubmitStats,
    }: {
      userProfileUserQuestionProgress: {
        [_: string]: Array<{
          difficulty: string;
          count: number;
          __typename: string;
        }>;
      };
      userProfileUserQuestionSubmitStats: {
        [_: string]: Array<{
          difficulty: string;
          count: number;
          __typename: string;
        }>;
      };
    } = data.data;

    Object.entries(userProfileUserQuestionProgress).forEach(([prop, stats]) => {
      stats.forEach?.(({ difficulty, count }) => {
        const qs =
          this.questionStats[difficulty.toLowerCase() as difficultyLevel] ?? {};
        qs["count"] += count;
        prop === "numAcceptedQuestions" && (qs["ac"] = count);
      });
    });

    Object.entries(userProfileUserQuestionSubmitStats).forEach(
      ([prop, stats]) => {
        stats.forEach?.(({ difficulty, count }) => {
          const qs =
            this.questionStats[difficulty.toLowerCase() as difficultyLevel] ??
            {};
          if (prop === "acSubmissionNum") {
            qs["acSubmissions"] = count;
          } else if (prop === "totalSubmissionNum") {
            qs["submissions"] = count;
          }
        });
      },
    );
  }
}

export class EnglishFetcher extends Fetcher {
  url = "https://leetcode.com/graphql/";
  async _fetchAndUpdateQuestionStats() {
    const { data } = await request({
      url: this.url,
      method: "post",
      data: {
        variables: {
          username: this.username,
        },
        query: `
                query getUserProfile($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                        __typename
                    }
                    matchedUser(username: $username) {
                    submitStats: submitStatsGlobal {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                            __typename
                        }
                        totalSubmissionNum{
                            difficulty
                            count
                            submissions
                            __typename
                        }
                    }
                    }
                }
                `,
      },
    });

    if (!data.data || !data.data.matchedUser) {
      throw new FetchStatError(
        FetchStatError.TYPE.USER_NOT_FOUND,
        `Make sure "${this.username}" exists in leetcode.com`,
      );
    }

    const {
      allQuestionsCount,
      matchedUser: { submitStats },
    }: {
      allQuestionsCount: Array<{
        difficulty: string;
        count: number;
        __typename: string;
      }>;
      matchedUser: {
        submitStats: {
          [_: string]: Array<{
            difficulty: string;
            count: number;
            submissions: number;
            __typename: string;
          }>;
        };
      };
    } = data.data;

    allQuestionsCount.forEach(({ difficulty, count }) => {
      const qs =
        this.questionStats[difficulty.toLowerCase() as difficultyLevel] ?? {};
      qs["count"] = count;
    });

    Object.entries(submitStats).forEach(([prop, stats]) => {
      stats.forEach?.(({ difficulty, count, submissions }) => {
        const qs =
          this.questionStats[difficulty.toLowerCase() as difficultyLevel] ?? {};
        if (prop === "acSubmissionNum") {
          qs["ac"] = count;
          qs["acSubmissions"] = submissions;
        } else if (prop === "totalSubmissionNum") {
          qs["submissions"] = submissions;
        }
      });
    });
  }
}
