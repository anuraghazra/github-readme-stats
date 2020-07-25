module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!*.config.js",
    "!**/coverage/**",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
