/**
 * @file This script is used to preview the theme on theme PRs.
 */
import * as dotenv from "dotenv";
dotenv.config();

import { debug, setFailed } from "@actions/core";
import github from "@actions/github";
import ColorContrastChecker from "color-contrast-checker";
import { info } from "console";
import Hjson from "hjson";
import snakeCase from "lodash.snakecase";
import parse from "parse-diff";
import { inspect } from "util";
import { isValidHexColor } from "../src/common/utils.js";
import { themes } from "../themes/index.js";
import { getGithubToken, getRepoInfo } from "./helpers.js";

const COMMENTER = "github-actions[bot]";

const COMMENT_TITLE = "Automated Theme Preview";
const THEME_PR_FAIL_TEXT = ":x: Theme PR does not adhere to our guidelines.";
const THEME_PR_SUCCESS_TEXT =
  ":heavy_check_mark: Theme PR does adhere to our guidelines.";
const FAIL_TEXT = `
  \rUnfortunately, your theme PR contains an error or does not adhere to our [theme guidelines](https://github.com/anuraghazra/github-readme-stats/blob/master/CONTRIBUTING.md#themes-contribution). Please fix the issues below, and we will review your\
  \r PR again. This pull request will **automatically close in 20 days** if no changes are made. After this time, you must re-open the PR for it to be reviewed.
`;
const THEME_CONTRIB_GUIDELINESS = `
  \rHi, thanks for the theme contribution. Please read our theme [contribution guidelines](https://github.com/anuraghazra/github-readme-stats/blob/master/CONTRIBUTING.md#themes-contribution).
  \rWe are currently only accepting color combinations from any VSCode theme or themes with good colour combinations to minimize bloating the themes collection.

  \r> Also, note that if this theme is exclusively for your personal use, then instead of adding it to our theme collection, you can use card [customization options](https://github.com/anuraghazra/github-readme-stats#customization).
`;
const COLOR_PROPS = {
  title_color: 6,
  icon_color: 6,
  text_color: 6,
  bg_color: 8,
  border_color: 6,
};
const ACCEPTED_COLOR_PROPS = Object.keys(COLOR_PROPS);
const REQUIRED_COLOR_PROPS = ACCEPTED_COLOR_PROPS.slice(0, 4);
const INVALID_REVIEW_COMMENT = (commentUrl) =>
  `Some themes are invalid. See the [Automated Theme Preview](${commentUrl}) comment above for more information.`;

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
 * Retrieve the commenting user.
 * @returns {string} Commenting user.
 */
const getCommenter = () => {
  return process.env.COMMENTER ? process.env.COMMENTER : COMMENTER;
};

/**
 * Returns whether the comment is a preview comment.
 *
 * @param {Object} inputs Action inputs.
 * @param {Object} comment Comment object.
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
 * @param {Object} octokit Octokit instance.
 * @param {number} issueNumber Issue number.
 * @param {string} repo Repository name.
 * @param {string} owner Owner of the repository.
 * @returns {Object} The GitHub comment object.
 */
const findComment = async (octokit, issueNumber, owner, repo, commenter) => {
  const parameters = {
    owner,
    repo,
    issue_number: issueNumber,
  };
  const inputs = {
    commentAuthor: commenter,
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
    if (comment) {
      debug(`Found theme preview comment: ${inspect(comment)}`);
      return comment;
    } else {
      debug(`No theme preview comment found.`);
    }
  }
};

/**
 * Create or update the preview comment.
 *
 * @param {Object} octokit Octokit instance.
 * @param {Object} props Comment properties.
 * @return {string} The comment URL.
 */
const upsertComment = async (octokit, props) => {
  let resp;
  if (props.comment_id !== undefined) {
    resp = await octokit.issues.updateComment(props);
  } else {
    resp = await octokit.issues.createComment(props);
  }
  return resp.data.html_url;
};

/**
 * Adds a review to the pull request.
 *
 * @param {Object} octokit Octokit instance.
 * @param {number} prNumber Pull request number.
 * @param {string} owner Owner of the repository.
 * @param {string} repo Repository name.
 * @param {string} reviewState The review state. Options are (APPROVE, REQUEST_CHANGES, COMMENT, PENDING).
 * @param {string} reason The reason for the review.
 */
const addReview = async (
  octokit,
  prNumber,
  owner,
  repo,
  reviewState,
  reason,
) => {
  await octokit.pulls.createReview({
    owner,
    repo,
    pull_number: prNumber,
    event: reviewState,
    body: reason,
  });
};

/**
 * Add label to pull request.
 *
 * @param {Object} octokit Octokit instance.
 * @param {number} prNumber Pull request number.
 * @param {string} owner Repository owner.
 * @param {string} repo Repository name.
 * @param {string[]} labels Labels to add.
 */
const addLabel = async (octokit, prNumber, owner, repo, labels) => {
  await octokit.issues.addLabels({
    owner,
    repo,
    issue_number: prNumber,
    labels,
  });
};

/**
 * Remove label from the pull request.
 *
 * @param {Object} octokit Octokit instance.
 * @param {number} prNumber Pull request number.
 * @param {string} owner Repository owner.
 * @param {string} repo Repository name.
 * @param {string} label Label to add or remove.
 */
const removeLabel = async (octokit, prNumber, owner, repo, label) => {
  await octokit.issues.removeLabel({
    owner,
    repo,
    issue_number: prNumber,
    name: label,
  });
};

/**
 * Adds or removes a label from the pull request.
 *
 * @param {Object} octokit Octokit instance.
 * @param {number} prNumber Pull request number.
 * @param {string} owner Repository owner.
 * @param {string} repo Repository name.
 * @param {string} label Label to add or remove.
 * @param {boolean} add Whether to add or remove the label.
 */
const addRemoveLabel = async (octokit, prNumber, owner, repo, label, add) => {
  const res = await octokit.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
  });
  if (add) {
    if (!res.data.labels.find((l) => l.name === label)) {
      await addLabel(octokit, prNumber, owner, repo, [label]);
    }
  } else {
    if (res.data.labels.find((l) => l.name === label)) {
      await removeLabel(octokit, prNumber, owner, repo, label);
    }
  }
};

/**
 * Retrieve webAim contrast color check link.
 *
 * @param {string} color1 First color.
 * @param {string} color2 Second color.
 * @returns {string} WebAim contrast color check link.
 */
const getWebAimLink = (color1, color2) => {
  return `https://webaim.org/resources/contrastchecker/?fcolor=${color1}&bcolor=${color2}`;
};

/**
 * Retrieves the theme GRS url.
 *
 * @param {Object} colors The theme colors.
 * @returns {string} GRS theme url.
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
 * @param {string} json The json to parse.
 * @returns {Object} Object parsed from the json.
 */
const parseJSON = (json) => {
  try {
    const parsedJson = Hjson.parse(json);
    if (typeof parsedJson === "object") {
      return parsedJson;
    } else {
      throw new Error("PR diff is not a valid theme JSON object.");
    }
  } catch (error) {
    let parsedJson = json
      .split(/([\s\r\s]*}[\s\r\s]*,[\s\r\s]*)(?=[\w"-]+:)/)
      .filter((x) => typeof x !== "string" || !!x.trim());
    if (parsedJson[0].replace(/\s+/g, "") === "},") {
      parsedJson[0] = "},";
      if (!/\s*}\s*,?\s*$/.test(parsedJson[1])) {
        parsedJson.push(parsedJson.shift());
      } else {
        parsedJson.shift();
      }
      return Hjson.parse(parsedJson.join(""));
    } else {
      throw error;
    }
  }
};

/**
 * Check whether the theme name is still available.
 * @param {string} name Theme name.
 * @returns {boolean} Whether the theme name is available.
 */
const themeNameAlreadyExists = (name) => {
  return themes[name] !== undefined;
};

const DRY_RUN = process.env.DRY_RUN === "true" || false;

/**
 * Main function.
 */
export const run = async (prNumber) => {
  try {
    debug("Retrieve action information from context...");
    debug(`Context: ${inspect(github.context)}`);
    let commentBody = `
      \r# ${COMMENT_TITLE}
      \r${THEME_CONTRIB_GUIDELINESS}
    `;
    const ccc = new ColorContrastChecker();
    const octokit = github.getOctokit(getGithubToken());
    const pullRequestId = prNumber ? prNumber : getPrNumber();
    const commenter = getCommenter();
    const { owner, repo } = getRepoInfo(github.context);
    debug(`Owner: ${owner}`);
    debug(`Repo: ${repo}`);
    debug(`Commenter: ${commenter}`);

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
    debug("Retrieve preview-theme comment...");
    const comment = await findComment(
      octokit,
      pullRequestId,
      owner,
      repo,
      commenter,
    );

    // Retrieve theme changes from the PR diff.
    debug("Retrieve themes...");
    const diff = parse(res.data);
    const content = diff
      .find((file) => file.to === "themes/index.js")
      .chunks[0].changes.filter((c) => c.type === "add")
      .map((c) => c.content.replace("+", ""))
      .join("");
    const themeObject = parseJSON(content);
    if (
      Object.keys(themeObject).every(
        (key) => typeof themeObject[key] !== "object",
      )
    ) {
      throw new Error("PR diff is not a valid theme JSON object.");
    }

    // Loop through themes and create theme preview body.
    debug("Create theme preview body...");
    const themeValid = Object.fromEntries(
      Object.keys(themeObject).map((name) => [name, true]),
    );
    let previewBody = "";
    for (const theme in themeObject) {
      debug(`Create theme preview for ${theme}...`);
      const themeName = theme;
      const colors = themeObject[theme];
      const warnings = [];
      const errors = [];

      // Check if the theme name is valid.
      debug("Theme preview body: Check if the theme name is valid...");
      if (themeNameAlreadyExists(themeName)) {
        warnings.push("Theme name already taken");
        themeValid[theme] = false;
      }
      if (themeName !== snakeCase(themeName)) {
        warnings.push("Theme name isn't in snake_case");
        themeValid[theme] = false;
      }

      // Check if the theme colors are valid.
      debug("Theme preview body: Check if the theme colors are valid...");
      let invalidColors = false;
      if (!colors) {
        warning.push("Theme colors are missing");
        invalidColors = true;
      } else {
        const missingKeys = REQUIRED_COLOR_PROPS.filter(
          (x) => !Object.keys(colors).includes(x),
        );
        const extraKeys = Object.keys(colors).filter(
          (x) => !ACCEPTED_COLOR_PROPS.includes(x),
        );
        if (missingKeys.length > 0 || extraKeys.length > 0) {
          for (const missingKey of missingKeys) {
            errors.push(`Theme color properties \`${missingKey}\` are missing`);
          }

          for (const extraKey of extraKeys) {
            warnings.push(
              `Theme color properties \`${extraKey}\` is not supported`,
            );
          }
          invalidColors = true;
        } else {
          for (const [colorKey, colorValue] of Object.entries(colors)) {
            if (colorValue[0] === "#") {
              errors.push(
                `Theme color property \`${colorKey}\` should not start with '#'`,
              );
              invalidColors = true;
            } else if (colorValue.length > COLOR_PROPS[colorKey]) {
              errors.push(
                `Theme color property \`${colorKey}\` can not be longer than \`${COLOR_PROPS[colorKey]}\` characters`,
              );
              invalidColors = true;
            } else if (!isValidHexColor(colorValue)) {
              errors.push(
                `Theme color property \`${colorKey}\` is not a valid hex color: <code>#${colorValue}</code>`,
              );
              invalidColors = true;
            }
          }
        }
      }
      if (invalidColors) {
        themeValid[theme] = false;
        previewBody += `
          \r### ${
            themeName.charAt(0).toUpperCase() + themeName.slice(1)
          } theme preview
          
          \r${warnings.map((warning) => `- :warning: ${warning}.\n`).join("")}
          \r${errors.map((error) => `- :x: ${error}.\n`).join("")}

          \r>:x: Cannot create theme preview.
        `;
        continue;
      }

      // Check color contrast.
      debug("Theme preview body: Check color contrast...");
      const titleColor = colors.title_color;
      const iconColor = colors.icon_color;
      const textColor = colors.text_color;
      const bgColor = colors.bg_color;
      const borderColor = colors.border_color;
      const url = getGRSLink(colors);
      const colorPairs = {
        title_color: [titleColor, bgColor],
        icon_color: [iconColor, bgColor],
        text_color: [textColor, bgColor],
      };
      Object.keys(colorPairs).forEach((item) => {
        let color1 = colorPairs[item][0];
        let color2 = colorPairs[item][1];
        color1 = color1.length === 4 ? color1.slice(0, 3) : color1.slice(0, 6);
        color2 = color2.length === 4 ? color2.slice(0, 3) : color2.slice(0, 6);
        if (!ccc.isLevelAA(`#${color1}`, `#${color2}`)) {
          const permalink = getWebAimLink(color1, color2);
          warnings.push(
            `\`${item}\` does not pass [AA contrast ratio](${permalink})`,
          );
          themeValid[theme] = false;
        }
      });

      // Create theme preview body.
      debug("Theme preview body: Create theme preview body...");
      previewBody += `
        \r### ${
          themeName.charAt(0).toUpperCase() + themeName.slice(1)
        } theme preview
        
        \r${warnings.map((warning) => `- :warning: ${warning}.\n`).join("")}

        \ntitle_color: <code>#${titleColor}</code> | icon_color: <code>#${iconColor}</code> | text_color: <code>#${textColor}</code> | bg_color: <code>#${bgColor}</code>${
        borderColor ? ` | border_color: <code>#${borderColor}</code>` : ""
      }

        \r[Preview Link](${url})

        \r[![](${url})](${url})
      `;
    }

    // Create comment body.
    debug("Create comment body...");
    commentBody += `
      \r${
        Object.values(themeValid).every((value) => value)
          ? THEME_PR_SUCCESS_TEXT
          : THEME_PR_FAIL_TEXT
      }
      \r## Test results
      \r${Object.entries(themeValid)
        .map(
          ([key, value]) => `- ${value ? ":heavy_check_mark:" : ":x:"} ${key}`,
        )
        .join("\r")}

      \r${
        Object.values(themeValid).every((value) => value)
          ? "**Result:** :heavy_check_mark: All themes are valid."
          : "**Result:** :x: Some themes are invalid.\n\n" + FAIL_TEXT
      }
      
      \r## Details
      \r${previewBody}
    `;

    // Create or update theme-preview comment.
    debug("Create or update theme-preview comment...");
    let comment_url;
    if (!DRY_RUN) {
      comment_url = await upsertComment(octokit, {
        comment_id: comment?.id,
        issue_number: pullRequestId,
        owner,
        repo,
        body: commentBody,
      });
    } else {
      info(`DRY_RUN: Comment body: ${commentBody}`);
      comment_url = "";
    }

    // Change review state and add/remove `invalid` label based on theme PR validity.
    debug(
      "Change review state and add/remove `invalid` label based on whether all themes passed...",
    );
    const themesValid = Object.values(themeValid).every((value) => value);
    const reviewState = themesValid ? "APPROVE" : "REQUEST_CHANGES";
    const reviewReason = themesValid
      ? undefined
      : INVALID_REVIEW_COMMENT(comment_url);
    if (!DRY_RUN) {
      await addReview(
        octokit,
        pullRequestId,
        owner,
        repo,
        reviewState,
        reviewReason,
      );
      await addRemoveLabel(
        octokit,
        pullRequestId,
        owner,
        repo,
        "invalid",
        !themesValid,
      );
    } else {
      info(`DRY_RUN: Review state: ${reviewState}`);
      info(`DRY_RUN: Review reason: ${reviewReason}`);
    }
  } catch (error) {
    debug("Set review state to `REQUEST_CHANGES` and add `invalid` label...");
    if (!DRY_RUN) {
      await addReview(
        octokit,
        pullRequestId,
        owner,
        repo,
        "REQUEST_CHANGES",
        error.message,
      );
      await addRemoveLabel(
        octokit,
        pullRequestId,
        owner,
        repo,
        "invalid",
        true,
      );
    } else {
      info(`DRY_RUN: Review state: REQUEST_CHANGES`);
      info(`DRY_RUN: Review reason: ${error.message}`);
    }
    setFailed(error.message);
  }
};

run();
