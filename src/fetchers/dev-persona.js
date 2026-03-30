// @ts-check

import axios from 'axios'
import * as dotenv from 'dotenv'
import githubUsernameRegex from 'github-username-regex'
import { retryer } from '../common/retryer.js'
import { logger } from '../common/log.js'
import { CustomError, MissingParamError } from '../common/error.js'
import { request } from '../common/http.js'

dotenv.config()

/**
 * Dev Persona data fetcher - Aggregates GitHub, WakaTime, and custom metrics
 *
 * @param {string} username GitHub username
 * @param {string} wakatimeApiKey WakaTime API key (optional)
 * @returns {Promise<object>} Aggregated developer metrics
 */
const fetchDevPersonaData = async (username, wakatimeApiKey) => {
  // Validate username
  if (!username) {
    throw new MissingParamError(['username'])
  }

  if (!githubUsernameRegex.test(username)) {
    throw new CustomError(
      'Invalid username',
      'Please provide a valid GitHub username.',
    )
  }

  try {
    // Fetch GitHub stats
    const githubData = await fetchGitHubDevPersonaStats(username)

    // Fetch WakaTime data if API key is provided
    let wakatimeData = null
    if (wakatimeApiKey) {
      wakatimeData = await fetchWakaTimeStats(wakatimeApiKey)
    }

    // Generate custom metrics based on GitHub data
    const customMetrics = generateCustomMetrics(githubData)

    // Merge all data
    const mergedData = {
      ...githubData,
      wakatime: wakatimeData,
      custom: customMetrics,
      bugSlayerLevel: calculateBugSlayerLevel(githubData),
      coffeeCodeRatio: calculateCoffeeCodeRatio(githubData),
    }

    return mergedData
  } catch (error) {
    logger.log(error)
    throw error
  }
}

/**
 * Fetch GitHub stats for dev persona
 *
 * @param {string} login GitHub username
 * @returns {Promise<object>} GitHub stats
 */
const fetchGitHubDevPersonaStats = async login => {
  const query = `
    query userInfo($login: String!) {
      user(login: $login) {
        name
        login
        bio
        followers {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
          totalCount
          nodes {
            name
            stargazers {
              totalCount
            }
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            }
          }
        }
        pullRequests(first: 1) {
          totalCount
        }
        mergedPullRequests: pullRequests(states: MERGED, first: 1) {
          totalCount
        }
        issues(states: CLOSED, first: 1) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalRepositoryContributions
        }
        repositoryDiscussions(first: 1) {
          totalCount
        }
        repositoriesContributedTo(first: 1) {
          totalCount
        }
        gists(first: 100) {
          totalCount
        }
      }
    }
  `

  try {
    const response = await request(
      {
        query,
        variables: { login },
      },
      {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
    )

    if (response.data.errors) {
      logger.log(response.data.errors)
      throw new CustomError(
        'Failed to fetch GitHub data',
        response.data.errors?.[0]?.message || 'Unknown error',
      )
    }

    const user = response.data.data.user

    // Extract top languages from repositories
    const languageMap = {}
    user.repositories.nodes.forEach(repo => {
      repo.languages.nodes.forEach(lang => {
        languageMap[lang.name] = (languageMap[lang.name] || 0) + 1
      })
    })

    const topLanguages = Object.entries(languageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percent: 0, // Will be calculated based on usage
      }))

    return {
      username: user.login,
      name: user.name || user.login,
      bio: user.bio || 'Crafting code and chaos...',
      followers: user.followers.totalCount,
      totalRepos: user.repositories.totalCount,
      totalStars: user.repositories.nodes.reduce(
        (acc, repo) => acc + repo.stargazers.totalCount,
        0,
      ),
      totalPRs: user.pullRequests.totalCount,
      totalMergedPRs: user.mergedPullRequests.totalCount,
      totalIssues: user.issues.totalCount,
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalContributions:
        user.contributionsCollection.totalCommitContributions +
        user.contributionsCollection.totalIssueContributions +
        user.contributionsCollection.totalPullRequestContributions,
      discussions: user.repositoryDiscussions.totalCount,
      gists: user.gists.totalCount,
      topLanguages: topLanguages,
      contributionsCollection: user.contributionsCollection,
    }
  } catch (error) {
    logger.log(error)
    throw error
  }
}

/**
 * Fetch WakaTime stats if API key is provided
 *
 * @param {string} apiKey WakaTime API key
 * @returns {Promise<object|null>} WakaTime stats or null
 */
const fetchWakaTimeStats = async apiKey => {
  try {
    const response = await axios.get(
      'https://wakatime.com/api/v1/users/current/stats?range=last_7_days',
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )

    if (response.status !== 200) {
      return null
    }

    const data = response.data.data
    return {
      totalSeconds: data.total_seconds,
      totalSecondsText: data.human_readable_total,
      languages: data.languages.map(lang => ({
        name: lang.name,
        percent: lang.percent,
        text: lang.text,
      })),
    }
  } catch (error) {
    logger.log('WakaTime fetch failed:', error.message)
    return null
  }
}

/**
 * Generate custom metrics based on GitHub data
 *
 * @param {object} githubData GitHub user data
 * @returns {object} Custom metrics
 */
const generateCustomMetrics = githubData => {
  // Mock custom metrics based on contributions
  const commitDensity = githubData.totalCommits / 365 // Average commits per day
  const focusHours = Math.max(3, Math.min(12, Math.floor(commitDensity * 2)))
  const bugsFixes = Math.floor(githubData.totalIssues * 0.7)
  const coffeeCups = Math.max(2, Math.floor((focusHours / 3) * 2))

  return {
    focus_hours: focusHours,
    bugs_fixed: bugsFixes,
    coffee_cups: coffeeCups,
    productivity_score: Math.min(
      100,
      Math.floor(
        (githubData.totalContributions / 365) * 10 + githubData.followers * 0.1,
      ),
    ),
  }
}

/**
 * Calculate Bug Slayer Level based on contributions
 *
 * @param {object} githubData GitHub user data
 * @returns {number} Bug slayer level (1-10)
 */
const calculateBugSlayerLevel = githubData => {
  const score =
    (githubData.totalCommits * 0.3 +
      githubData.totalMergedPRs * 0.5 +
      githubData.totalIssues * 0.2) /
    100

  const level = Math.min(10, Math.max(1, Math.floor(score) + 1))
  return level
}

/**
 * Calculate Coffee -> Code Ratio (mock metric for style)
 *
 * @param {object} githubData GitHub user data
 * @returns {object} Ratio metric
 */
const calculateCoffeeCodeRatio = githubData => {
  const commitDensity = Math.max(1, githubData.totalCommits / 365)
  const coffeePerCommit = (8 / commitDensity).toFixed(2) // Hours per commit

  return {
    value: coffeePerCommit,
    label: `${coffeePerCommit} hrs/☕`,
  }
}

export { fetchDevPersonaData, fetchGitHubDevPersonaStats }
