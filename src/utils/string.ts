import wrap from "word-wrap";

// https://stackoverflow.com/a/48073476/10629172
export const encodeHTML = (str: string): string => {
  return str
    .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
      return "&#" + i.charCodeAt(0) + ";";
    })
    .replace(/\u0008/gim, "");
};

export const lowercaseTrim = (str: string): string => {
  return str.toLowerCase().trim();
};

export function wrapTextMultiline(text: string, width = 60, maxLines = 3) {
  const wrapped = wrap(encodeHTML(text), { width })
    .split("\n") // Split wrapped lines to get an array of lines
    .map((line) => line.trim()); // Remove leading and trailing whitespace of each line

  const lines = wrapped.slice(0, maxLines); // Only consider maxLines lines

  // Add "..." to the last line if the text exceeds maxLines
  if (wrapped.length > maxLines) {
    lines[maxLines - 1] += "...";
  }

  // Remove empty lines if text fits in less than maxLines lines
  const multiLineText = lines.filter(Boolean);
  return multiLineText;
}
