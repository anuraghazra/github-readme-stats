import index from "./index.js";

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === "/") {
      return index.fetch(request, env, ctx);
    }

    return new Response("not found", { status: 404 });
  },
};
