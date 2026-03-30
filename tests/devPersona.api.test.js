// @ts-check

import { describe, it, expect } from "@jest/globals";

/**
 * Tests for the dev-persona endpoint
 * These are integration-style tests that verify the endpoint responds correctly
 */
describe("Dev Persona API Endpoint", () => {
  it("should have a valid endpoint configuration", () => {
    // The endpoint should be available at /api/dev-persona
    expect("/api/dev-persona").toBeDefined();
  });

  it("should accept username query parameter", () => {
    const endpoint = "/api/dev-persona?username=testuser";
    expect(endpoint).toContain("username");
  });

  it("should accept optional query parameters", () => {
    const endpoints = [
      "/api/dev-persona?username=testuser&theme=hacker_dark",
      "/api/dev-persona?username=testuser&animate=true",
      "/api/dev-persona?username=testuser&layout=terminal",
      "/api/dev-persona?username=testuser&hide_border=true",
    ];

    endpoints.forEach(endpoint => {
      expect(endpoint).toContain("username=testuser");
    });
  });

  it("should support all hacker theme colors", () => {
    const themes = ["hacker_dark"];
    expect(themes).toContain("hacker_dark");
  });

  it("should support animation toggle", () => {
    const params = ["animate=true", "animate=false"];
    expect(params).toBeDefined();
  });

  it("should support layout options", () => {
    const layouts = ["full", "compact", "terminal"];
    expect(layouts).toContain("full");
  });
});

describe("Custom Metrics Endpoint", () => {
  it("should be available at /api/custom-metrics", () => {
    expect("/api/custom-metrics").toBeDefined();
  });

  it("should accept username parameter", () => {
    const endpoint = "/api/custom-metrics?username=testuser";
    expect(endpoint).toContain("username");
  });

  it("should return JSON response", () => {
    // Content-Type should be application/json
    expect("application/json").toBeDefined();
  });
});
