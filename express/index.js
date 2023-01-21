/**
 * @file A simple express server variant of GRS can run GRS in a docker container.
 * This is not intended to be used in the development; please use the `vercel dev`
 * command instead.
 */
import { readFileSync } from "fs";
import http from "http";
import https from "https";
import glob from "glob";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { getEnv } from "../src/common/utils.js";

const ENVS = {
  PORT: "PORT",
  HTTPS_PORT: "HTTPS_PORT",
  REDIRECT_HTTPS: "REDIRECT_HTTPS",
  HTTPS_KEY: "HTTPS_KEY",
  HTTPS_CERT: "HTTPS_CERT",
  USE_HELMET: "USE_HELMET",
  USE_MORGAN: "USE_MORGAN",
  MORGAN_FORMAT: "MORGAN_FORMAT",
}

const vercelConfig = JSON.parse(readFileSync("./vercel.json", "utf8"));
const vercelFunctions = Object.keys(vercelConfig.functions);

const app = express();

const files = vercelFunctions.map((gl) => glob.sync(gl)).flat();
await loadApiRoutes(app, files);

const httpPort = getEnv(ENVS.PORT, 3000);
const httpsPort = getEnv(ENVS.HTTPS_PORT, 3443);

if (
  getEnv(ENVS.REDIRECT_HTTPS, "true") === "true"
  && getEnv(ENVS.HTTPS_KEY)
  && getEnv(ENVS.HTTPS_CERT)
) {
  app.use("*", redirectHttps);
}

if (getEnv(ENVS.USE_HELMET, "true") === "true") {
  app.use(helmet());
}

if (getEnv(ENVS.USE_MORGAN, "true") === "true") {
  app.use(morgan(getEnv(ENVS.MORGAN_FORMAT, "combined")));
}

const server = new Server(app)

server.start(
  { http: httpPort, https: httpsPort },
  {
    http: () => console.log(`HTTP server listening on port ${httpPort}`),
    https: () => console.log(`HTTPS server listening on port ${httpsPort}`),
  }
);

/**
 * Loads all api routes from the given paths.
 * @param {string[]} files Api endpoint files.
 */
async function loadApiRoutes(app, files) {
  for (const file of files) {
    const route = `/${file.replace(".js", "").replace("index", "")}`;
    console.log(`Loading route '${route}' with handler from '${file}'`);
    const handler = await import(`../${file}`);
    app.get(route, handler.default);
  }
}

/**
 * A simple express middleware to redirect all HTTP requests to HTTPS.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void}
 */
function redirectHttps(req, res, next) {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.hostname}${req.url}`);
  }
}

/**
 * Simple wrapper around `http` and `https` node module.
 * @returns {{ start: (options: { http: number, https: number }, cb: { http: () => void, https: () => void }) => void }}
 */
function Server (app) {
  const tls = loadTLS();
  if (tls) {
    this.https = https.createServer(tls, app);
  }
  this.http = http.createServer(app);
  this.start = function (port, callback) {
    const result = {};
    if (this.https && port.https) {
      this.https = this.https.listen(port.https, callback.https);
    }
    this.http = this.http.listen(port.http, callback.http);
    return result;
  }
}

/**
 * Attempts to loads the SSL/TLS certificate and key from the optional
 * environment variables `HTTPS_CERT` and `HTTPS_KEY`.
 * @returns {{
 *   cert: typeof import("buffer").Buffer,
 *   key: typeof import("buffer").Buffer
 * }} The certificate and key.
 */
function loadTLS() {
  if (!getEnv(ENVS.HTTPS_KEY) || !getEnv(ENVS.HTTPS_CERT)) return null
  return {
    key: readFileSync(getEnv(ENVS.HTTPS_KEY)),
    cert: readFileSync(getEnv(ENVS.HTTPS_CERT)),
  }
}
