import * as esbuild from "esbuild";
import { readFile, writeFile, copyFile } from "fs/promises";

await esbuild.build({
  entryPoints: [
    "api/index.js",
    "api/pin.js",
    "api/top-langs.js",
    "api/wakatime.js",
  ],
  bundle: true,
  platform: "node",
  packages: "external",
  outdir: "deploy/aircode/api",
});

const content = await readFile("deploy/aircode/api/wakatime.js", "utf8");
await writeFile(
  "deploy/aircode/api/wakatime.js",
  content
    .replace(
      'var languageColors = require2("../common/languageColors.json")',
      'var languageColors = require("../common/languageColors.json")',
    )
    .replace("var import_meta = {};", "")
    .replace(
      "var require2 = (0, import_module.createRequire)(import_meta.url);",
      "",
    )
    .replace('var import_module = require("module");', ""),
);

await copyFile(
  "src/common/languageColors.json",
  "deploy/aircode/common/languageColors.json",
);
