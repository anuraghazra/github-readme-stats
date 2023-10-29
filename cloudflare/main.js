import process from "node:process";
import { RequestAdapter, ResponseAdapter } from "./adapter.js";
import gist from "../api/gist.js";
import index from "../api/index.js";
import pin from "../api/pin.js";
import topLangs from "../api/top-langs.js";
import wakatime from "../api/wakatime.js";
import statusPatInfo from "../api/status/pat-info.js";
import statusUp from "../api/status/up.js";

const copyEnv = (env) => {
  Object.keys(env).forEach((key) => {
    if (/PAT_\d*$/.exec(key) || key === "FETCH_MULTI_PAGE_STARS") {
      process.env[key] = env[key];
    }
  });
  process.env.IN_CLOUDFLARE = "true";
};

export default {
  async fetch(request, env) {
    const req = new RequestAdapter(request);
    const res = new ResponseAdapter();
    copyEnv(env);

    const { pathname } = new URL(request.url);
    if (pathname === "/") {
      await index(req, res);
    } else if (pathname === "/gist") {
      await gist(req, res);
    } else if (pathname === "/pin") {
      await pin(req, res);
    } else if (pathname === "/top-langs") {
      await topLangs(req, res);
    } else if (pathname === "/wakatime") {
      await wakatime(req, res);
    } else if (pathname === "/status/pat-info") {
      await statusPatInfo(req, res);
    } else if (pathname === "/status/up") {
      await statusUp(req, res);
    } else {
      return new Response("not found", { status: 404 });
    }

    return res.toResponse();
  },
};
