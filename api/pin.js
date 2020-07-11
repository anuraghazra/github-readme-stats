require("dotenv").config();
const { renderError } = require("../src/utils");
const fetchRepo = require("../src/fetchRepo");
const renderRepoCard = require("../src/renderRepoCard");

module.exports = async (req, res) => {
  const { username, repo } = req.query;

  let repoData;
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    repoData = await fetchRepo(username, repo);
  } catch (err) {
    console.log(err);
    return res.send(renderError(err.message));
  }

  res.send(renderRepoCard(repoData));
};
