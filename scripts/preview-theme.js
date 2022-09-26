/**
 * @file This script is used to preview the theme on theme PRs.
 */

import core, { debug, setFailed } from "@actions/core";
import github from "@actions/github";
import ColorContrastChecker from "color-contrast-checker";
import Hjson from "hjson";
import snakeCase from "lodash.snakecase";
import parse from "parse-diff";

// Script variables
const OWNER = "anuraghazra";
const REPO = "github-readme-stats";
const COMMENT_TITLE = "Automated Theme Preview";
const PREVIEW_FAIL_TEXT = ":x: Theme preview failed.";
const FAIL_TEXT =
  "Closing pull requests since some themes do not adhere to the theme guidelines. Please fix the following issues and we will re-open the pull request.";
const THEME_CONTRIB_GUIDELINESS = `
  \rHi, thanks for the theme contribution, please read our theme [contribution guidelines](https://github.com/anuraghazra/github-readme-stats/blob/master/CONTRIBUTING.md#themes-contribution).
  \rWe are currently only accepting color combinations from any VSCode theme or themes which have good color combination to minimize bloating the themes collection.

  \r> Also note that if this theme is exclusively for your personal use, then instead of adding it to our theme collection you can use card [customization options](https://github.com/anuraghazra/github-readme-stats#customization)
`;
const AVAILABLE_COLOR_PROPS = [
  "bg_color",
  "icon_color",
  "text_color",
  "title_color",
];

/**
 * Retrieve information about the repository that ran the action.
 * @param context Action context.
 * @returns Repository information.
 */
export const getRepoInfo = (ctx) => {
  try {
    return {
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
    };
  } catch (error) {
    return {
      owner: OWNER,
      repo: REPO,
    };
  }
};

/**
 * Retrieve PR number from the event payload.
 *
 * @returns {number} PR number.
 */
const getPrNumber = () => {
  if (process.env.MOCK_PR_NUMBER) return process.env.MOCK_PR_NUMBER; // For testing purposes.

  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    throw Error("Could not get pull request number from context");
  }
  return pullRequest.number;
};

/**
 * Retrieve github token and throw error if it is not found.
 *
 * @returns {string} Github token.
 */
const getGithubToken = () => {
  const token = core.getInput("github_token") || process.env.PERSONAL_TOKEN;
  if (!token) {
    throw Error("Could not find github token");
  }
  return token;
};

/**
 * Returns whether the comment is a preview comment.
 *
 * @param {*} inputs Action inputs.
 * @param {*} comment Comment.
 * @returns {boolean} Whether the comment is a preview comment.
 */
const isPreviewComment = (inputs, comment) => {
  return (
    (inputs.commentAuthor && comment.user
      ? comment.user.login === inputs.commentAuthor
      : true) &&
    (inputs.bodyIncludes && comment.body
      ? comment.body.includes(inputs.bodyIncludes)
      : true)
  );
};

/**
 * Find the preview theme comment.
 *
 * @param {*} octokit Octokit instance.
 * @param {*} issueNumber Issue number.
 * @returns The Github comment object.
 */
const findComment = async (octokit, issueNumber, owner, repo) => {
  const parameters = {
    owner,
    repo,
    issue_number: issueNumber,
  };
  const inputs = {
    commentAuthor: owner,
    bodyIncludes: COMMENT_TITLE,
  };

  // Search each page for the comment
  for await (const { data: comments } of octokit.paginate.iterator(
    octokit.rest.issues.listComments,
    parameters,
  )) {
    const comment = comments.find((comment) =>
      isPreviewComment(inputs, comment),
    );
    if (comment) return comment;
  }
};

/**
 * Create or update the preview comment.
 *
 * @param {*} octokit Octokit instance.
 * @param {*} props Comment properties.
 */
const upsertComment = async (octokit, props) => {
  if (props.comment_id !== undefined) {
    await octokit.issues.updateComment(props);
  } else {
    await octokit.issues.createComment(props);
  }
};

/**
 * Change the PR state.
 *
 * @param {*} octokit Octokit instance.
 * @param {*} prNumber Pull request number.
 * @param {*} state State to change to.
 */
const changePRState = async (octokit, prNumber, state, owner, repo) => {
  await octokit.pulls.update({
    owner,
    repo,
    pull_number: prNumber,
    state,
  });
};

/**
 * Retrieve webAim contrast color check link.
 *
 * @param {*} color1 First color.
 * @param {*} color2 Second color.
 * @returns WebAim contrast color check link.
 */
const getWebAimLink = (color1, color2) => {
  return `https://webaim.org/resources/contrastchecker/?fcolor=${color1}&bcolor=${color2}`;
};

/**
 * Retrieves the theme GRS url.
 *
 * @param {*} colors
 * @returns
 */
const getGRSLink = (colors) => {
  const url = `https://github-readme-stats.vercel.app/api?username=anuraghazra`;
  const colorString = Object.keys(colors)
    .map((colorKey) => `${colorKey}=${colors[colorKey]}`)
    .join("&");

  return `${url}&${colorString}&show_icons=true`;
};

/**
 * Retrieve javascript object from json string.
 *
 * @description Wraps the Hjson parse function to fix several known json syntax errors.
 *
 * @param {*} json The json to parse.
 * @returns Object parsed from the json.
 */
const parseJSON = (json) => {
  try {
    return Hjson.parse(json);
  } catch (error) {
    const parsedJson = json
      .split(/(},?)(?=\s*["|'][a-z]+["|'])/)
      .filter((x) => typeof x !== "string" || !!x.trim());
    if (parsedJson[0] === "},") {
      parsedJson.push(parsedJson.shift());
      return Hjson.parse(parsedJson.join(""));
    } else {
      throw error;
    }
  }
};

/**
 * Convert array to human readable comma separated string.
 *
 * @param arr Input array.
 * @param {string} [wrapSymbol=""] Wrap symbol.
 * @returns Human readable comma separated string.
 */
export const array2str = (arr, wrapSymbol = "") => {
  if (arr.length === 0) {
    return "";
  } else if (arr.length === 1) {
    return wrapSymbol ? "'" + arr[0] + "'" : arr[0];
  }
  if (wrapSymbol) arr = arr.map((x) => "'" + x + "'");
  return `${arr.slice(0, arr.length - 1).join(", ")} and ${
    arr[arr.length - 1]
  }`;
};

/**
 * Check if string is a valid hex color.
 * @param str String to check.
 * @returns Whether the string is a valid hex color.
 */
const isHex = (str) => {
  var a = parseInt(str, 16);
  return a.toString(16) === str.toLowerCase();
};

// == Main function ==
const run = async () => {
  try {
    debug("Retrieve action information...");
    let commentBody = `# ${COMMENT_TITLE}
      ${THEME_CONTRIB_GUIDELINESS}
    `;
    const ccc = new ColorContrastChecker();
    const octokit = github.getOctokit(getGithubToken());
    const pullRequestId = getPrNumber();
    const { owner, repo } = getRepoInfo(github.context);

    // Retrieve the PR diff and preview-theme comment.
    debug("Retrieve PR diff...");
    const res = await octokit.pulls.get({
      owner,
      repo,
      pull_number: pullRequestId,
      mediaType: {
        format: "diff",
      },
    });
    const comment = await findComment(octokit, pullRequestId, owner, repo);

    // Retrieve theme changes from the PR diff.
    debug("Retrieve themes...");
    const diff = parse(res.data);
    const content = diff
      .find((file) => file.to === "themes/index.js")
      .chunks[0].changes.filter((c) => c.type === "add")
      .map((c) => c.content.replace("+", ""))
      .join("");
    const themeObject = parseJSON(content);
    const themeValid = Object.fromEntries(
      Object.keys(themeObject).map((name) => [name, true]),
    );

    // Loop through themes and create theme preview body.
    debug("Create theme preview body...");
    let themePreviewBody = "";
    for (const key in themeObject) {
      debug(`Create theme preview for ${key}...`);
      const themeName = key;
      const colors = themeObject[key];
      const warnings = [];

      // Check if the theme name is valid.
      debug("Theme preview body: Check if the theme name is valid...");
      if (themeName !== snakeCase(themeName)) {
        warnings.push("Theme name isn't in snake_case");
        themeValid[key] = false;
        continue;
      }

      // Check if the theme colors are valid.
      debug("Theme preview body: Check if the theme colors are valid...");
      const invalidColors = false;
      if (!colors) {
        warning.push("Theme colors are missing");
        invalidColors = True;
      } else {
        const missingKeys = AVAILABLE_COLOR_PROPS.filter(
          (x) => !Object.keys(colors).includes(x),
        );
        if (missingKeys.length > 0) {
          warnings.push(
            `Theme color properties ${array2str(
              missingKeys,
              "'",
            )} are missing.`,
          );
          invalidColors = True;
        } else {
          for (const [colorKey, colorValue] of Object.entries(colors)) {
            if (colorValue[0] === "#") {
              warnings.push(
                `Theme color property ${colorKey} should not start with '#'.`,
              );
              invalidColors = True;
            } else if (!isHex(colorValue)) {
              warnings.push(
                `Theme color property '${colorKey}' is not a valid hex color.`,
              );
              invalidColors = True;
            }
          }
        }
      }
      if (invalidColors) {
        commentBody += `\r${PREVIEW_FAIL_TEXT}`;
        themeValid[key] = false;
        continue;
      }

      // Check color contrast.
      debug("Theme preview body: Check color contrast...");
      const titleColor = colors.title_color;
      const iconColor = colors.icon_color;
      const textColor = colors.text_color;
      const bgColor = colors.bg_color;
      const url = getGRSLink(colors);
      const colorPairs = {
        title_color: [titleColor, bgColor],
        icon_color: [iconColor, bgColor],
        text_color: [textColor, bgColor],
      };
      let contrastFailed = false;
      Object.keys(colorPairs).forEach((key) => {
        const color1 = colorPairs[key][0];
        const color2 = colorPairs[key][1];
        if (!ccc.isLevelAA(`#${color1}`, `#${color2}`)) {
          const permalink = getWebAimLink(color1, color2);
          warnings.push(
            `\`${key}\` does not pass [AA contrast ratio](${permalink})`,
          );
          contrastFailed = true;
        }
      });
      if (contrastFailed) {
        themeValid[key] = false;
        continue;
      }

      // Create theme preview body.
      debug("Theme preview body: Create theme preview body...");
      themePreviewBody += `
      \r### ${
        themeName.charAt(0).toUpperCase() + themeName.slice(1)
      } theme preview
      
      \r${warnings.map((warning) => `- :warning: ${warning}\n`).join("")}

      \ntitle_color: <code>#${titleColor}</code> | icon_color: <code>#${iconColor}</code> | text_color: <code>#${textColor}</code> | bg_color: <code>#${bgColor}</code>

      \r[Preview Link](${url})

      \r[![](${url})](${url})
      `;
    }

    // Create comment body.
    debug("Create comment body...");
    commentBody += `
    \r## Test results
    \r${Object.entries(themeValid)
      .map(([key, value]) => `- ${value ? ":heavy_check_mark:" : ":x:"} ${key}`)
      .join("\r")}

    \r${
      Object.values(themeValid).every((value) => value)
        ? ":heavy_check_mark: All themes passed."
        : ":x: Some themes failed. " + FAIL_TEXT
    }
    
    \r## Details
    \r${themePreviewBody}
    `;

    // Create or update theme-preview comment.
    debug("Create or update theme-preview comment...");
    await upsertComment(octokit, {
      comment_id: comment?.id,
      issue_number: pullRequestId,
      owner,
      repo,
      body: commentBody,
    });

    // Change PR state based on whether all themes passed.
    debug("Change PR state based on whether all themes passed...");
    const state = Object.values(themeValid).every((value) => value)
      ? "open"
      : "closed";
    await changePRState(octokit, pullRequestId, state, owner, repo);
  } catch (error) {
    setFailed(error.message);
  }
};

run();
