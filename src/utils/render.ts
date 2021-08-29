import themes from "../../themes";

export function flexLayout({
  items,
  gap,
  direction = "row",
}: {
  items: string[];
  gap: number;
  direction?: "column" | "row";
}) {
  // filter() for filtering out empty strings
  return items.filter(Boolean).map((item, i) => {
    let transform = `translate(${gap * i}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${gap * i})`;
    }
    return `<g transform="${transform}">${item}</g>`;
  });
}

function isValidGradient(colors: string[]) {
  return isValidHexColor(colors[1]) && isValidHexColor(colors[2]);
}

function isValidHexColor(hexColor: string) {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/,
  ).test(hexColor);
}

function fallbackColor(color: string, fallbackColor: string) {
  let colors = color.split(",");
  let gradient = null;

  if (colors.length > 1 && isValidGradient(colors)) {
    gradient = colors;
  }

  return (
    (gradient ? gradient : isValidHexColor(color) && `#${color}`) ||
    fallbackColor
  );
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
  const selectedTheme = (theme && themes[theme]) ?? defaultTheme;
  const defaultBorderColor =
    selectedTheme.border_color || defaultTheme.border_color;

  // get the color provided by the user else the theme color
  // finally if both colors are invalid fallback to default theme
  const titleColor = fallbackColor(
    title_color || selectedTheme.title_color,
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
  const bgColor = fallbackColor(
    bg_color || selectedTheme.bg_color,
    "#" + defaultTheme.bg_color,
  );

  const borderColor = fallbackColor(
    border_color || defaultBorderColor,
    "#" + defaultBorderColor,
  );

  return { titleColor, iconColor, textColor, bgColor, borderColor };
}

export const createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
}) => {
  const progressPercentage = clampValue(progress, 2, 100);

  return `
      <svg width="${width}" x="${x}" y="${y}">
        <rect rx="5" ry="5" x="0" y="0" width="${width}" height="8" fill="${progressBarBackgroundColor}"></rect>
        <rect
            height="8"
            fill="${color}"
            rx="5" ry="5" x="0" y="0" 
            data-testid="lang-progress"
            width="${progressPercentage}%"
        >
        </rect>
      </svg>
    `;
};

export function clampValue(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}
