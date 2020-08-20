const { request, logger } = require("../common/utils");
const retryer = require("../common/retryer");
require("dotenv").config();

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              repositoryTopics(first: 10) {
                edges {
                  node {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    }
  );
};

async function fetchTopTopics(username) {
  if (!username) throw Error("Invalid username");

  let res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  let repoNodes = res.data.data.user.repositories.nodes;

  const allTopics = repoNodes
    .filter((node) => {
      return node.repositoryTopics.edges.length > 0;
    })
    // flatten the list of topic nodes
    .reduce((acc, curr) => curr.repositoryTopics.edges.concat(acc), [])
    .map(curr => curr.node.topic.name)

  const topicsCountByName = allTopics
    .reduce((acc, topicName) => {
      let count = acc[topicName] ? acc[topicName].count : 0;
      count++;

      return {
        ...acc,
        [topicName]: {
          name: topicName,
          count: count,
        }
      };
    }, {});

  const sortedTopics = Object.values(topicsCountByName).sort((a, b) => b.count - a.count);

  const topTopics = sortedTopics
    .slice(0, 5)
    .reduce((result, topic) => {
      result[topic.name] = topic;
      return result;
    }, {});

  return topTopics;
}

module.exports = fetchTopTopics;
