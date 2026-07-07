// @ts-check
import { workerAdapter } from "./common/adapter.js";

/** @type {Promise<Record<string, Function>> | null} */
let routesPromise = null;

/**
 * Lazily loads route handlers after env variables are injected.
 *
 * @returns {Promise<Record<string, Function>>} Route handler map.
 */
const loadRoutes = async () => {
  if (!routesPromise) {
    routesPromise = Promise.all([
      import("../api/index.js"),
      import("../api/pin.js"),
      import("../api/top-langs.js"),
      import("../api/wakatime.js"),
      import("../api/gist.js"),
    ]).then(([api, pin, topLangs, wakatime, gist]) => ({
      "/api": api.default,
      "/api/index": api.default,
      "/api/pin": pin.default,
      "/api/top-langs": topLangs.default,
      "/api/wakatime": wakatime.default,
      "/api/gist": gist.default,
    }));
  }

  return routesPromise;
};

export default {
  /**
   * Fetch handler for Cloudflare Worker.
   *
   * @param {Request} request The incoming request.
   * @param {*} env The environment variables.
   * @param {*} ctx The execution context.
   * @returns {Promise<Response>} The response.
   */
  // eslint-disable-next-line no-unused-vars
  async fetch(request, env, ctx) {
    // Polyfill process.env for existing code accessing env vars
    globalThis.process = globalThis.process || {};
    globalThis.process.env = { ...(globalThis.process.env || {}), ...env };

    const url = new URL(request.url);
    const path = url.pathname;
    const routes = await loadRoutes();

    if (!routes[path]) {
      return new Response("Not Found", { status: 404 });
    }

    return workerAdapter(request, routes[path]);
  },
};
