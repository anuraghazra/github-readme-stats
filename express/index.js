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

import { getEnv } from "../src/common/utils"

const vercelConfig = JSON.parse(readFileSync("./vercel.json", "utf8"));
const vercelFunctions = Object.keys(vercelConfig.functions);

const files = vercelFunctions.map((gl) => glob.sync(gl)).flat();
await loadApiRoutes(files);

const httpPort = getEnv("PORT", 3000);
const httpsPort = getEnv("HTTPS_PORT", 3443);
const app = express();

if (getEnv("REDIRECT_HTTPS", "true") === "true") {
  app.use("*", redirectHttps);
}

const server = new Server()

server.start(
  { http: httpPort, https: httpsPort },
  {
    http: () => console.log(`HTTP server listening on port ${httpPort}`),
    https: () => console.log(`HTTPS server listening on port ${httpsPort}`),
  }
);

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
 * @class
 */
class Server {
  /**
   * @member {http.Server} The http server.
   */
  http

  /**
   * @member {https.Server|undefined} The https server if any.
   */
  https

  /**
   * Creates a new server.
   */
  constructor() {
    const tls = loadTLS();
    if (tls) {
      this.https = https.createServer(tls, app);
    }
    this.http = http.createServer(app);
  }

  /**
   * Starts the server.
   * @param {{ http: number, https?: number }} port The port to listen on.
   * @param {{ http?: Function, https?: Function }} callback The callback to call when the server is ready.
   * @returns {Promise<{ http: http.Server, https?: https.Server }>}
   */
  start(port, callback) {
    const result = {};
    if (this.https && port.https) {
      res.https = this.https.listen(port.https, callback.https);
    }
    res.http = this.http.listen(port.http, callback.http);
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
function loadTLS(params) {
  if (!getEnv("HTTPS_KEY") || !getEnv("HTTPS_CERT")) return null
  return {
    key: readFileSync(getEnv("HTTPS_KEY")),
    cert: readFileSync(getEnv("HTTPS_CERT")),
  }
}
