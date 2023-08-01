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
const THEME_CONTRIB_GUIDELINES = `
  \rHi, thanks for the theme contribution. Please read our theme [contribution guidelines](https://github.com/anuraghazra/github-readme-stats/blob/master/CONTRIBUTING.md#themes-contribution).

  \r> [!WARNING]\
  \r> Keep in mind that we already have a vast collection of different themes. To keep their number manageable, we began to add only themes supported by the community. Your pull request with theme addition will be merged once we get enough positive feedback from the community in the form of thumbs up (see [#1935](https://github.com/anuraghazra/github-readme-stats/issues/1935#top-themes-prs)). Remember that you can also support themes of other contributors that you liked to speed up their merge.

  \r> [!NOTE]\
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
var OCTOKIT;
var OWNER;
var REPO;
var PULL_REQUEST_ID;

/**
 * Incorrect JSON format error.
 * @extends Error
 * @param {string} message Error message.
 * @returns {Error} IncorrectJsonFormatError.
 */
class IncorrectJsonFormatError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectJsonFormatError";
  }
}

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
 * @param {string} owner Owner of the repository.
 * @param {string} repo Repository name.
 * @param {string} commenter Comment author.
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
 * @param {number} issueNumber Issue number.
 * @param {Object} repo Repository name.
 * @param {Object} owner Owner of the repository.
 * @param {number} commentId Comment ID.
 * @param {string} body Comment body.
 * @returns {string} The comment URL.
 */
const upsertComment = async (
  octokit,
  issueNumber,
  repo,
  owner,
  commentId,
  body,
) => {
  let resp;
  if (commentId !== undefined) {
    resp = await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: commentId,
      body,
    });
  } else {
    resp = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body,
    });
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
 * @returns {Promise<void>} Promise.
 */
const addReview = async (
  octokit,
  prNumber,
  owner,
  repo,
  reviewState,
  reason,
) => {
  await octokit.rest.pulls.createReview({
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
 * @returns {Promise<void>} Promise.
 */
const addLabel = async (octokit, prNumber, owner, repo, labels) => {
  await octokit.rest.issues.addLabels({
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
 * @returns {Promise<void>} Promise.
 */
const removeLabel = async (octokit, prNumber, owner, repo, label) => {
  await octokit.rest.issues.removeLabel({
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
 * @returns {Promise<void>} Promise.
 */
const addRemoveLabel = async (octokit, prNumber, owner, repo, label, add) => {
  const res = await octokit.rest.pulls.get({
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
      throw new IncorrectJsonFormatError(
        "PR diff is not a valid theme JSON object.",
      );
    }
  } catch (error) {
    // Remove trailing commas (if any).
    let parsedJson = json.replace(/(,\s*})/g, "}");

    // Remove JS comments (if any).
    parsedJson = parsedJson.replace(/\/\/[A-z\s]*\s/g, "");

    // Fix incorrect open bracket (if any).
    const splitJson = parsedJson
      .split(/([\s\r\s]*}[\s\r\s]*,[\s\r\s]*)(?=[\w"-]+:)/)
      .filter((x) => typeof x !== "string" || !!x.trim()); // Split json into array of strings and objects.
    if (splitJson[0].replace(/\s+/g, "") === "},") {
      splitJson[0] = "},";
      if (!/\s*}\s*,?\s*$/.test(splitJson[1])) {
        splitJson.push(splitJson.shift());
      } else {
        splitJson.shift();
      }
      parsedJson = splitJson.join("");
    }

    // Try to parse the fixed json.
    try {
      return Hjson.parse(parsedJson);
    } catch (error) {
      throw new IncorrectJsonFormatError(
        `Theme JSON file could not be parsed: ${error.message}`,
      );
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
 *
 * @returns {Promise<void>} Promise.
 */
export const run = async () => {
  try {
    debug("Retrieve action information from context...");
    debug(`Context: ${inspect(github.context)}`);
    let commentBody = `
      \r# ${COMMENT_TITLE}
      \r${THEME_CONTRIB_GUIDELINES}
    `;
    const ccc = new ColorContrastChecker();
    OCTOKIT = github.getOctokit(getGithubToken());
    PULL_REQUEST_ID = getPrNumber();
    const { owner, repo } = getRepoInfo(github.context);
    OWNER = owner;
    REPO = repo;
    const commenter = getCommenter();
    PULL_REQUEST_ID = getPrNumber();
    debug(`Owner: ${OWNER}`);
    debug(`Repo: ${REPO}`);
    debug(`Commenter: ${commenter}`);

    // Retrieve the PR diff and preview-theme comment.
    debug("Retrieve PR diff...");
    const res = await OCTOKIT.pulls.get({
      owner: OWNER,
      repo: REPO,
      pull_number: PULL_REQUEST_ID,
      mediaType: {
        format: "diff",
      },
    });
    debug("Retrieve preview-theme comment...");
    const comment = await findComment(
      OCTOKIT,
      PULL_REQUEST_ID,
      OWNER,
      REPO,
      commenter,
    );

    // Retrieve theme changes from the PR diff.
    debug("Retrieve themes...");
    const diff = parse(res.data);

    // Retrieve all theme changes from the PR diff and convert to JSON.
    debug("Retrieve theme changes...");
    const content = diff
      .find((file) => file.to === "themes/index.js")
      .chunks.map((chunk) =>
        chunk.changes
          .filter((c) => c.type === "add")
          .map((c) => c.content.replace("+", ""))
          .join(""),
      )
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
        warnings.push("Theme colors are missing");
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
      comment_url = await upsertComment(
        OCTOKIT,
        PULL_REQUEST_ID,
        REPO,
        OWNER,
        comment?.id,
        commentBody,
      );
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
        OCTOKIT,
        PULL_REQUEST_ID,
        OWNER,
        REPO,
        reviewState,
        reviewReason,
      );
      await addRemoveLabel(
        OCTOKIT,
        PULL_REQUEST_ID,
        OWNER,
        REPO,
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
        OCTOKIT,
        PULL_REQUEST_ID,
        OWNER,
        REPO,
        "REQUEST_CHANGES",
        "**Something went wrong in the theme preview action:** `" +
          error.message +
          "`",
      );
      await addRemoveLabel(
        OCTOKIT,
        PULL_REQUEST_ID,
        OWNER,
        REPO,
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
