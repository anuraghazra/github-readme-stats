import retryer from "../common/retryer.js";
import { MissingParamError, request } from "../common/utils.js";

const QUERY = `
query streakInfo($userName:String!) { 
  user(login: $userName){
    name
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

const fetcher = async (variables, token) => {
  return await request(
    { query: QUERY, variables },
    { Authorization: `token ${token}` },
  );
};

/**
 *
 * @param {string} username GitHub username
 */

const streakFetcher = async (username) => {
  if (!username) throw new MissingParamError(["username"]);

  const res = await retryer(fetcher, { userName: username });
  const contribsData =
    res.data.data.user.contributionsCollection.contributionCalendar;

  //Fetching contributions weekly
  let contributionsCountWeekly = 0;
  let contributionsListWeekly = [];

  for (let i in contribsData.weeks) {
    for (let j in contribsData.weeks[i].contributionDays) {
      contributionsCountWeekly +=
        contribsData.weeks[i].contributionDays[j].contributionCount;
    }

    contributionsListWeekly.push(contributionsCountWeekly);
    contributionsCountWeekly = 0;
  }

  //Longest streak weekly
  let longestStreak = 0;
  let calcLongestStreakList = [];

  for (let i in contributionsListWeekly) {
    if (contributionsListWeekly[i] > 0) {
      longestStreak++;
      calcLongestStreakList.push(longestStreak);
    }

    if (contributionsListWeekly[i] == 0) longestStreak = 0;
  }

  //Current streak weekly
  let currentStreak = 0;

  for (let i in contributionsListWeekly) {
    if (contributionsListWeekly[i] > 0) currentStreak++;

    if (contributionsListWeekly[i] == 0) currentStreak = 0;
  }

  //Fetching contributions daily
  let contributionsListDaily = [];

  for (let i in contribsData.weeks) {
    for (let j in contribsData.weeks[i].contributionDays) {
      contributionsListDaily.push(
        contribsData.weeks[i].contributionDays[j].contributionCount,
      );
    }
  }

  //Longest streak daily
  let longestStreakDaily = 0;
  let calcLongestStreakListDaily = [];

  for (let i in contributionsListDaily) {
    if (contributionsListDaily[i] > 0) {
      longestStreakDaily++;
      calcLongestStreakListDaily.push(longestStreakDaily);
    }

    if (contributionsListDaily[i] == 0) longestStreakDaily = 0;
  }

  //Current streak daily
  let currentStreakDaily = 0;

  for (let i in contributionsListDaily) {
    if (contributionsListDaily[i] > 0) currentStreakDaily++;

    if (contributionsListDaily[i] == 0) currentStreakDaily = 0;
  }

  //Returning the streaks of the user
  return {
    user_name: res.data.data.user.name,
    longest_streak_weekly: Math.max(...calcLongestStreakList),
    current_streak_weekly: currentStreak,
    longest_streak_daily: Math.max(...calcLongestStreakListDaily),
    current_streak_daily: currentStreakDaily,
    total_contributions: contribsData.totalContributions,
  };
};

export { streakFetcher };
export default streakFetcher;
