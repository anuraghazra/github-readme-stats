/**
 * @file A simple express server variant of GRS can run GRS in a docker container.
 * This is not intended to be used in the development; please use the `vercel dev`
 * command instead.
 */
import { readFileSync } from "fs";
import glob from "glob";
import express from "express";

const vercelConfig = JSON.parse(readFileSync("./vercel.json", "utf8"));
const vercelFunctions = Object.keys(vercelConfig.functions);

const port = process.env.PORT || 3000;
const app = express();

const files = vercelFunctions.map((gl) => glob.sync(gl)).flat();
await loadApiRoutes(files);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/**
 * Loads all api routes from the `api` directory.
 * @param {string[]} files Api endpoint files.
 */
async function loadApiRoutes(files) {
  for (const file of files) {
    const route = `/${file.replace(".js", "").replace("index", "")}`;
    console.log(`Loading route '${route}' with handler from '${file}'`);
    const handler = await import(`../${file}`);
    app.get(route, handler.default);
  }
}
