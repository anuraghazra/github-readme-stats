const core = require("@actions/core");
const github = require("@actions/github");
const parse = require("parse-diff");
const Hjson = require("hjson");
const snakeCase = require("lodash.snakecase");
const ColorContrastChecker = require("color-contrast-checker");

require("dotenv").config();

function getPrNumber() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

const themeContribGuidelines = `
  \rHi, thanks for the theme contribution, please read our theme [contribution guidelines](https://github.com/anuraghazra/github-readme-stats/blob/master/CONTRIBUTING.md#themes-contribution).  
  \rWe are currently only accepting color combinations from any VSCode theme or themes which have good color combination to minimize bloating the themes collection.

  \r> Also note that if this theme is exclusively for your personal use, then instead of adding it to our theme collection you can use card [customization options](https://github.com/anuraghazra/github-readme-stats#customization) 
`;

async function run() {
  try {
    const ccc = new ColorContrastChecker();
    const warnings = [];
    const token = core.getInput("token");
    const octokit = github.getOctokit(token || process.env.PERSONAL_TOKEN);
    const pullRequestId = 1438; //getPrNumber();

    if (!pullRequestId) {
      console.log("PR not found");
      return;
    }

    const res = await octokit.pulls.get({
      owner: "anuraghazra",
      repo: "github-readme-stats",
      pull_number: pullRequestId,
      mediaType: {
        format: "diff",
      },
    });

    const diff = parse(res.data);
    const content = diff
      .find((file) => file.to === "themes/index.js")
      .chunks[0].changes.filter((c) => c.type === "add")
      .map((c) => c.content.replace("+", ""))
      .join("");

    const themeObject = Hjson.parse(content);
    const themeName = Object.keys(themeObject)[0];
    const colors = themeObject[themeName];

    if (themeName !== snakeCase(themeName)) {
      warnings.push("Theme name isn't in snake_case");
    }

    if (!colors) {
      await octokit.issues.createComment({
        owner: "anuraghazra",
        repo: "github-readme-stats",
        body: `
        \r**Automated Theme preview**
        
        \rCannot create theme preview

        ${themeContribGuidelines}
        `,
        issue_number: pullRequestId,
      });
      return;
    }

    const titleColor = colors.title_color;
    const iconColor = colors.icon_color;
    const textColor = colors.text_color;
    const bgColor = colors.bg_color;
    const url = `https://github-readme-stats.vercel.app/api?username=anuraghazra&title_color=${titleColor}&icon_color=${iconColor}&text_color=${textColor}&bg_color=${bgColor}&show_icons=true`;

    const colorPairs = {
      title_color: [titleColor, bgColor],
      icon_color: [iconColor, bgColor],
      text_color: [textColor, bgColor],
    };

    // check color contrast
    Object.keys(colorPairs).forEach((key) => {
      const color1 = colorPairs[key][0];
      const color2 = colorPairs[key][1];
      if (!ccc.isLevelAA(`#${color1}`, `#${color2}`)) {
        const permalink = `https://webaim.org/resources/contrastchecker/?fcolor=${color1}&bcolor=${color2}`;
        warnings.push(
          `\`${key}\` does not passes [AA contrast ratio](${permalink})`,
        );
      }
    });

    await octokit.issues.createComment({
      owner: "anuraghazra",
      repo: "github-readme-stats",
      body: `
      \r**Automated Theme preview**  
      
      \r${warnings.map((warning) => `- :warning: ${warning}\n`).join("")}

      \ntitle_color: <code>#${titleColor}</code> | icon_color: <code>#${iconColor}</code> | text_color: <code>#${textColor}</code> | bg_color: <code>#${bgColor}</code>
      
      \r[Preview Link](${url})

      \r[![](${url})](${url})
      
      ${themeContribGuidelines}
      `,
      issue_number: pullRequestId,
    });
  } catch (error) {
    console.log(error);
  }
}

run();
