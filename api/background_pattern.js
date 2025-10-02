export const // Adding to SVG patterns

  BACKGROUND_PATTERNS = {
    circuit: "data:image/svg+xml,...",

    morphing: "data:image/svg+xml,...",

    geometric: "data:image/svg+xml,...",
  };

export const getBackgroundPattern = (pattern) => {
  if (!BACKGROUND_PATTERNS[pattern]) {
    console.error(`Try again Invalid pattern : ${pattern}`);
  }
  return BACKGROUND_PATTERNS[pattern] || "";
};
