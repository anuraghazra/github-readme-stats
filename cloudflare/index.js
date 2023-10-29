import { RequestAdapter, ResponseAdapter } from "./adapter.js";
import handler from "../api/index.js";

export default {
  async fetch(request, env) {
    const req = new RequestAdapter(request);
    const res = new ResponseAdapter();

    await handler(req, res);
    return res.toResponse();
  },
};
