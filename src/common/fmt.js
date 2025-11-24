// @ts-check

import wrap from "word-wrap";
import { encodeHTML } from "./html.js";

/**
 * Retrieves num with suffix k(thousands) precise to given decimal places.
 *
 * @param {number} num The number to format.
 * @param {number=} precision The number of decimal places to include.
 * @returns {string|number} The formatted number.
 */
const kFormatter = (num, precision) => {
  const abs = Math.abs(num);
  const sign = Math.sign(num);

  if (typeof precision === "number" && !isNaN(precision)) {
    return (sign * (abs / 1000)).toFixed(precision) + "k";
  }

  if (abs < 1000) {
    return sign * abs;
  }

  return sign * parseFloat((abs / 1000).toFixed(1)) + "k";
};

/**
 * Convert bytes to a human-readable string representation.
 *
 * @param {number} bytes The number of bytes to convert.
 * @returns {string} The human-readable representation of bytes.
 * @throws {Error} If bytes is negative or too large.
 */
const formatBytes = (bytes) => {
  if (bytes < 0) {
    throw new Error("Bytes must be a non-negative number");
  }

  if (bytes === 0) {
    return "0 B";
  }

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  const base = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(base));

  if (i >= sizes.length) {
    throw new Error("Bytes is too large to convert to a human-readable string");
  }

  return `${(bytes / Math.pow(base, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Split text over multiple lines based on the card width.
 *
 * @param {string} text Text to split.
 * @param {number} width Line width in number of characters.
 * @param {number} maxLines Maximum number of lines.
 * @returns {string[]} Array of lines.
 */
const wrapTextMultiline = (text, width = 59, maxLines = 3) => {
  const fullWidthComma = "，";
  const encoded = encodeHTML(text);
  const isChinese = encoded.includes(fullWidthComma);

  let wrapped = [];

  if (isChinese) {
    wrapped = encoded.split(fullWidthComma); // Chinese full punctuation
  } else {
    wrapped = wrap(encoded, {
      width,
    }).split("\n"); // Split wrapped lines to get an array of lines
  }

  const lines = wrapped.map((line) => line.trim()).slice(0, maxLines); // Only consider maxLines lines

  // Add "..." to the last line if the text exceeds maxLines
  if (wrapped.length > maxLines) {
    lines[maxLines - 1] += "...";
  }

  // Remove empty lines if text fits in less than maxLines lines
  const multiLineText = lines.filter(Boolean);
  return multiLineText;
};

export { kFormatter, formatBytes, wrapTextMultiline };
