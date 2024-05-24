import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const app = express();
const server = app.listen(process.env.port || 9000);
console.log("started, awaiting requests");

/* stop gracefully when requested */
process.on("SIGTERM", () => {
    console.log("stopping, received SIGTERM signal");
    server.close(() => {
        process.exit();
    });
});

app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);
