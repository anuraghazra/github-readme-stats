import themes from "../../themes";

function isValidGradient(colors: string[]) {
  return isValidHexColor(colors[1]) && isValidHexColor(colors[2]);
}

function isValidHexColor(hexColor: string) {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/,
  ).test(hexColor);
}

function fallbackBgColor(color: string = "", defaultColor: string) {
  const colors = color.split(",");
  let gradient = null;

  if (colors.length > 1 && isValidGradient(colors)) {
    gradient = colors;
  }

  return (gradient ?? (isValidHexColor(color) && `#${color}`)) || defaultColor;
}

function fallbackColor(color: string = "", defaultColor: string) {
  return isValidHexColor(color) ? `#${color}` : defaultColor;
}

export function getCardColors({
  title_color,
  text_color,
  icon_color,
  bg_color,
  theme,
  border_color,
  fallbackTheme = "default",
}: {
  title_color?: string;
  text_color?: string;
  icon_color?: string;
  bg_color?: string;
  theme?: string;
  border_color?: string;
  fallbackTheme?: keyof typeof themes;
}) {
  const defaultTheme = themes[fallbackTheme];
  const selectedTheme = (theme ? themes[theme] : defaultTheme) || defaultTheme;
  const defaultBorderColor =
    selectedTheme.border_color || defaultTheme.border_color;

  // get the color provided by the user else the theme color
  // finally if both colors are invalid fallback to default theme
  const titleColor = fallbackColor(
    title_color ?? selectedTheme.title_color,
    "#" + defaultTheme.title_color,
  );
  const iconColor = fallbackColor(
    icon_color || selectedTheme.icon_color,
    "#" + defaultTheme.icon_color,
  );
  const textColor = fallbackColor(
    text_color || selectedTheme.text_color,
    "#" + defaultTheme.text_color,
  );
  const bgColor = fallbackBgColor(
    bg_color || selectedTheme.bg_color,
    "#" + defaultTheme.bg_color,
  );

  const borderColor = fallbackColor(
    border_color || defaultBorderColor,
    "#" + defaultBorderColor,
  );

  return { titleColor, iconColor, textColor, bgColor, borderColor };
}

export function clampValue(num: number, min: number, max: number) {
  return Math.max(min, Math.min(num, max));
}
