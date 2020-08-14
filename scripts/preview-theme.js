const core = require("@actions/core");
const github = require("@actions/github");
const parse = require("parse-diff");
require("dotenv").config();

function getPrNumber() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

async function run() {
  try {
    const token = core.getInput("token");
    const octokit = github.getOctokit(token || process.env.PERSONAL_TOKEN);
    const pullRequestId = getPrNumber();

    if (!pullRequestId) {
      console.log("PR not found");
      return;
    }

    let res = await octokit.pulls.get({
      owner: "anuraghazra",
      repo: "github-readme-stats",
      pull_number: pullRequestId,
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

    if (!colors) {
      await octokit.issues.createComment({
        owner: "anuraghazra",
        repo: "github-readme-stats",
        body: `
        \rTheme preview (bot)
        Cannot create theme preview
        `,
        issue_number: pullRequestId,
      });
      return;
    }
    colors = colors.map((color) =>
      color.replace(/.*\:\s/, "").replace(/\"/g, "")
    );

    let titleColor = colors[0];
    let iconColor = colors[1];
    let textColor = colors[2];
    let bgColor = colors[3];
    const url = `https://github-readme-stats.vercel.app/api?username=anuraghazra&title_color=${titleColor}&icon_color=${iconColor}&text_color=${textColor}&bg_color=${bgColor}&show_icons=true`;

    await octokit.issues.createComment({
      owner: "anuraghazra",
      repo: "github-readme-stats",
      body: `
      \rTheme preview (bot)  
      
      \ntitle-color: <code>#${titleColor}</code>
      \nicon-color: <code>#${iconColor}</code>
      \ntext-color: <code>#${textColor}</code>
      \nbg-color: <code>#${bgColor}</code>
      
      \r[![](${url})](${url})
      `,
      issue_number: pullRequestId,
    });
  } catch (error) {
    console.log(error);
  }
}

run();
