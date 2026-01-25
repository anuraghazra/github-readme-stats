// @ts-check

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
  const wrapped = [];
  let currentLine = "";
  let currentWidth = 0;

  // Normalize newlines
  const chars = text.replace(/\r\n/g, "\n").split("");

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === "\n") {
      if (currentLine) wrapped.push(currentLine);
      currentLine = "";
      currentWidth = 0;
      continue;
    }

    const charWidth = char.charCodeAt(0) > 255 ? 2 : 1;

    if (currentWidth + charWidth > width) {
      if (char === " ") {
        wrapped.push(currentLine);
        currentLine = "";
        currentWidth = 0;
        continue;
      }

      const lastSpaceIndex = currentLine.lastIndexOf(" ");

      if (lastSpaceIndex > -1) {
        const lineContent = currentLine.substring(0, lastSpaceIndex);
        const nextLineStart = currentLine.substring(lastSpaceIndex + 1);

        wrapped.push(lineContent);
        currentLine = nextLineStart + char;
        
        // Recalculate width for the new line
        currentWidth = 0;
        for (let j = 0; j < currentLine.length; j++) {
           currentWidth += currentLine.charCodeAt(j) > 255 ? 2 : 1;
        }
      } else {
        wrapped.push(currentLine);
        currentLine = char;
        currentWidth = charWidth;
      }
    } else {
      currentLine += char;
      currentWidth += charWidth;
    }
  }

  if (currentLine) {
    wrapped.push(currentLine);
  }

  let lines = wrapped.map((line) => line.trim());
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[maxLines - 1] += "...";
  }

  // Remove empty lines if text fits in less than maxLines lines
  const multiLineText = lines.filter(Boolean);
  
  return multiLineText.map((line) => encodeHTML(line));
};

export { kFormatter, formatBytes, wrapTextMultiline };
