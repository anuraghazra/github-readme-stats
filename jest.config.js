export default {
  clearMocks: true,
  transform: {},
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/e2e/"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/e2e/"],
  setupFiles: [`<rootDir>/jest-ext.js`],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/tests/E2E/",
  ],
};
