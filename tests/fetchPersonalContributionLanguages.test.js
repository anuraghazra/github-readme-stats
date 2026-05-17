import { afterEach, describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  detectLanguage,
  fetchPersonalContributionLanguages,
  normalizePages,
  shouldIgnoreFile,
} from "../src/fetchers/personal-contribution-languages.js";

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("FetchPersonalContributionLanguages", () => {
  it("should detect languages from common contribution file paths", () => {
    expect(detectLanguage("src/index.ts")).toBe("TypeScript");
    expect(detectLanguage("Dockerfile")).toBe("Dockerfile");
    expect(detectLanguage("unknown/file.ext")).toBe(null);
  });

  it("should ignore generated and binary files", () => {
    expect(shouldIgnoreFile("dist/app.js")).toBe(true);
    expect(shouldIgnoreFile("src/logo.png")).toBe(true);
    expect(shouldIgnoreFile("src/app.ts")).toBe(false);
  });

  it("should clamp page count", () => {
    expect(normalizePages("0")).toBe(2);
    expect(normalizePages("50")).toBe(10);
    expect(normalizePages("3")).toBe(3);
  });

  it("should fetch and aggregate additions from authored commits", async () => {
    mock.onGet("https://api.github.com/search/commits").reply((config) => {
      expect(config.params.q).toBe("author:andre org:acme");
      expect(config.params.page).toBe(1);

      return [
        200,
        {
          items: [
            {
              sha: "abc123",
              repository: { full_name: "acme/app" },
            },
            {
              sha: "def456",
              repository: { full_name: "acme/api" },
            },
          ],
        },
      ];
    });

    mock
      .onGet("https://api.github.com/repos/acme/app/commits/abc123")
      .reply(200, {
        files: [
          { filename: "src/App.tsx", additions: 12 },
          { filename: "dist/App.js", additions: 200 },
          { filename: "README.md", additions: 4 },
        ],
      });

    mock
      .onGet("https://api.github.com/repos/acme/api/commits/def456")
      .reply(200, {
        files: [
          { filename: "server.js", additions: 5 },
          { filename: "package-lock.json", additions: 50 },
        ],
      });

    const languages = await fetchPersonalContributionLanguages(
      "andre",
      ["acme"],
      1,
    );

    expect(languages).toStrictEqual({
      TypeScript: {
        color: "#3178c6",
        count: 1,
        name: "TypeScript",
        size: 12,
      },
      JavaScript: {
        color: "#f1e05a",
        count: 1,
        name: "JavaScript",
        size: 5,
      },
      Markdown: {
        color: "#083fa1",
        count: 1,
        name: "Markdown",
        size: 4,
      },
    });
  });
});
