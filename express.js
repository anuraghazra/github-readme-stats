import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const app = express();
const router = express.Router();

// Simple in-memory rate limiter: max 30 requests per minute per IP
const _rlMap = new Map();
const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress;
  const now = Date.now();
  const rec = _rlMap.get(ip) || { count: 0, reset: now + 60_000 };
  if (now > rec.reset) { rec.count = 0; rec.reset = now + 60_000; }
  if (++rec.count > 30) {
    return res.status(429).json({ error: "Too many requests, please try again later." });
  }
  _rlMap.set(ip, rec);
  next();
};
router.use(rateLimiter);

router.get("/", statsCard);
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);

app.use("/api", router);

const port = process.env.PORT || process.env.port || 9000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
