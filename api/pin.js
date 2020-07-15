require("dotenv").config();
const { renderError } = require("../src/utils");
const fetchRepo = require("../src/fetchRepo");
const renderRepoCard = require("../src/renderRepoCard");

module.exports = async (req, res) => {
  const {
    username,
    repo,
    title_color,
    icon_color,
    text_color,
    bg_color,
  } = req.query;

  let repoData;
  
  res.setHeader("Cache-Control", "public, max-age=1800");
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    repoData = await fetchRepo(username, repo);
  } catch (err) {
    console.log(err);
    return res.send(renderError(err.message));
  }

  res.send(
    renderRepoCard(repoData, {
      title_color,
      icon_color,
      text_color,
      bg_color,
    })
  );
};
