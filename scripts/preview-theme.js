const core = require("@actions/core");
const github = require("@actions/github");
const parse = require("parse-diff");
require("dotenv").config();

async function run() {
  try {
    const token = core.getInput("token");
    const octokit = github.getOctokit(token || process.env.GITHUB_TOKEN);

    let res = await octokit.pulls.get({
      owner: "anuraghazra",
      repo: "github-readme-stats",
      pull_number: 185,
      mediaType: {
        format: "diff",
      },
    });

    let diff = parse(res.data);
    let colorStrings = diff
      .find((file) => file.to === "themes/index.js")
      .chunks[0].changes.filter((c) => c.type === "add")
      .map((c) => c.content.replace("+", ""))
      .join("");

    let matches = colorStrings.match(/(title_color:.*bg_color.*\")/);

    let colors = matches && matches[0].split(",");

    colors = colors.map((color) =>
      color.replace(/.*\:\s/, "").replace(/\"/g, "")
    );

    let titleColor = colors[0];
    let iconColor = colors[1];
    let textColor = colors[2];
    let bgColor = colors[3];
    const url = `https://github-readme-stats.vercel.app/api?username=anuraghazra&title_color=${titleColor}&icon_color=${iconColor}&text_color=${textColor}&bg_color=${bgColor}&show_icons=true`;

    console.log(url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
