// @ts-check

import { themes } from "../../themes/index.js";

/**
 * Checks if a string is a valid hex color.
 *
 * @param {string} hexColor String to check.
 * @returns {boolean} True if the given string is a valid hex color.
 */
const isValidHexColor = (hexColor) => {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/,
  ).test(hexColor);
};

/**
 * Check if the given string is a valid gradient.
 *
 * @param {string[]} colors Array of colors.
 * @returns {boolean} True if the given string is a valid gradient.
 */
const isValidGradient = (colors) => {
  return (
    colors.length > 2 &&
    colors.slice(1).every((color) => isValidHexColor(color))
  );
};

/**
 * Retrieves a gradient if color has more than one valid hex codes else a single color.
 *
 * @param {string} color The color to parse.
 * @param {string | string[]} fallbackColor The fallback color.
 * @returns {string | string[]} The gradient or color.
 */
const fallbackColor = (color, fallbackColor) => {
  let gradient = null;

  let colors = color ? color.split(",") : [];
  if (colors.length > 1 && isValidGradient(colors)) {
    gradient = colors;
  }

  return (
    (gradient ? gradient : isValidHexColor(color) && `#${color}`) ||
    fallbackColor
  );
};

/**
 * Object containing card colors.
 * @typedef {{
 *  titleColor: string;
 *  iconColor: string;
 *  textColor: string;
 *  bgColor: string | string[];
 *  borderColor: string;
 *  ringColor: string;
 * }} CardColors
 */

/**
 * Returns theme based colors with proper overrides and defaults.
 *
 * @param {Object} args Function arguments.
 * @param {string=} args.title_color Card title color.
 * @param {string=} args.text_color Card text color.
 * @param {string=} args.icon_color Card icon color.
 * @param {string=} args.bg_color Card background color.
 * @param {string=} args.border_color Card border color.
 * @param {string=} args.ring_color Card ring color.
 * @param {string=} args.theme Card theme.
 * @returns {CardColors} Card colors.
 */
const getCardColors = ({
  title_color,
  text_color,
  icon_color,
  bg_color,
  border_color,
  ring_color,
  theme,
}) => {
  const defaultTheme = themes["default"];
  const isThemeProvided = theme !== null && theme !== undefined;

  // @ts-ignore
  const selectedTheme = isThemeProvided ? themes[theme] : defaultTheme;

  const defaultBorderColor =
    "border_color" in selectedTheme
      ? selectedTheme.border_color
      : // @ts-ignore
        defaultTheme.border_color;

  // get the color provided by the user else the theme color
  // finally if both colors are invalid fallback to default theme
  const titleColor = fallbackColor(
    title_color || selectedTheme.title_color,
    "#" + defaultTheme.title_color,
  );

  // get the color provided by the user else the theme color
  // finally if both colors are invalid we use the titleColor
  const ringColor = fallbackColor(
    // @ts-ignore
    ring_color || selectedTheme.ring_color,
    titleColor,
  );
  const iconColor = fallbackColor(
    icon_color || selectedTheme.icon_color,
    "#" + defaultTheme.icon_color,
  );
  const textColor = fallbackColor(
    text_color || selectedTheme.text_color,
    "#" + defaultTheme.text_color,
  );
  const bgColor = fallbackColor(
    bg_color || selectedTheme.bg_color,
    "#" + defaultTheme.bg_color,
  );

  const borderColor = fallbackColor(
    border_color || defaultBorderColor,
    "#" + defaultBorderColor,
  );

  if (
    typeof titleColor !== "string" ||
    typeof textColor !== "string" ||
    typeof ringColor !== "string" ||
    typeof iconColor !== "string" ||
    typeof borderColor !== "string"
  ) {
    throw new Error(
      "Unexpected behavior, all colors except background should be string.",
    );
  }

  return { titleColor, iconColor, textColor, bgColor, borderColor, ringColor };
};

export { isValidHexColor, isValidGradient, getCardColors };
