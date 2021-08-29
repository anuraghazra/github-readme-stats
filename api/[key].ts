require("dotenv").config();
import cards from "../src/cards";
import { VercelRequest, VercelResponse } from "@vercel/node";
import "../src/icons/github";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { key, ...query } = req.query;

  const reqKey = (Array.isArray(key) ? key[0] : key) ?? "stats";

  if (reqKey in cards) {
    const Card = cards[reqKey as keyof typeof cards];
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(await new Card(query).generateSvgString(res.setHeader.bind(res)));
  } else {
    res.status(404).send("404 Not Found");
  }
};
