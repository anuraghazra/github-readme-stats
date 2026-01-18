// @ts-check
import { workerAdapter } from "./common/adapter.js";
import api from "../api/index.js";
import pin from "../api/pin.js";
import topLangs from "../api/top-langs.js";
import wakatime from "../api/wakatime.js";
import gist from "../api/gist.js";

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
    globalThis.process.env = { ...globalThis.process.env, ...env };

    const url = new URL(request.url);
    const path = url.pathname;

    switch (path) {
      case "/api":
      case "/api/index":
        return workerAdapter(request, api);
      case "/api/pin":
        return workerAdapter(request, pin);
      case "/api/top-langs":
        return workerAdapter(request, topLangs);
      case "/api/wakatime":
        return workerAdapter(request, wakatime);
      case "/api/gist":
        return workerAdapter(request, gist);
      default:
        return new Response("Not Found", { status: 404 });
    }
  },
};
