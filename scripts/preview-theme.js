const core = require("@actions/core");
const github = require("@actions/github");
const parse = require("parse-diff");
const Hjson = require("hjson");
const snakeCase = require("lodash.snakecase");
const ColorContrastChecker = require("color-contrast-checker");

require("dotenv").config();

const OWNER = "anuraghazra";
const REPO = "github-readme-stats";
const COMMENT_TITLE = "Automated Theme Preview";

function getPrNumber() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

function findCommentPredicate(inputs, comment) {
  return (
    (inputs.commentAuthor && comment.user
      ? comment.user.login === inputs.commentAuthor
      : true) &&
    (inputs.bodyIncludes && comment.body
      ? comment.body.includes(inputs.bodyIncludes)
      : true)
  );
}

async function findComment(octokit, issueNumber) {
  const parameters = {
    owner: OWNER,
    repo: REPO,
    issue_number: issueNumber,
  };
  const inputs = {
    commentAuthor: OWNER,
    bodyIncludes: COMMENT_TITLE,
  };

  for await (const { data: comments } of octokit.paginate.iterator(
    octokit.rest.issues.listComments,
    parameters,
  )) {
    // Search each page for the comment
    const comment = comments.find((comment) =>
      findCommentPredicate(inputs, comment),
    );
    if (comment) return comment;
  }
}

async function upsertComment(octokit, props) {
  if (props.comment_id !== undefined) {
    await octokit.issues.updateComment(props);
  } else {
    await octokit.issues.createComment(props);
  }
}

function getWebAimLink(color1, color2) {
  return `https://webaim.org/resources/contrastchecker/?fcolor=${color1}&bcolor=${color2}`;
}

function getGrsLink(colors) {
  const url = `https://github-readme-stats.vercel.app/api?username=anuraghazra`;
  const colorString = Object.keys(colors)
    .map((colorKey) => `${colorKey}=${colors[colorKey]}`)
    .join("&");

  return `${url}&${colorString}&show_icons=true`;
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
    const pullRequestId = getPrNumber();

    if (!pullRequestId) {
      console.log("PR not found");
      return;
    }

    const res = await octokit.pulls.get({
      owner: OWNER,
      repo: REPO,
      pull_number: pullRequestId,
      mediaType: {
        format: "diff",
      },
    });
    const comment = await findComment(octokit, pullRequestId);

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
      await upsertComment({
        comment_id: comment?.id,
        owner: OWNER,
        repo: REPO,
        issue_number: pullRequestId,
        body: `
        \r**${COMMENT_TITLE}**
        
        \rCannot create theme preview

        ${themeContribGuidelines}
        `,
      });
      return;
    }

    const titleColor = colors.title_color;
    const iconColor = colors.icon_color;
    const textColor = colors.text_color;
    const bgColor = colors.bg_color;
    const url = getGrsLink(colors);

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
        const permalink = getWebAimLink(color1, color2);
        warnings.push(
          `\`${key}\` does not passes [AA contrast ratio](${permalink})`,
        );
      }
    });

    await upsertComment(octokit, {
      comment_id: comment?.id,
      issue_number: pullRequestId,
      owner: OWNER,
      repo: REPO,
      body: `
      \r**${COMMENT_TITLE}**  
      
      \r${warnings.map((warning) => `- :warning: ${warning}\n`).join("")}

      \ntitle_color: <code>#${titleColor}</code> | icon_color: <code>#${iconColor}</code> | text_color: <code>#${textColor}</code> | bg_color: <code>#${bgColor}</code>
      
      \r[Preview Link](${url})

      \r[![](${url})](${url})
      
      ${themeContribGuidelines}
      `,
    });
  } catch (error) {
    console.log(error);
  }
}

run();
