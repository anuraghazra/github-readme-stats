import path from "path";
import { fileURLToPath } from "url";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../../..");

await build({
  entryPoints: [path.join(__dirname, "index.js")],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: path.join(__dirname, "dist", "index.js"),
  nodePaths: [
    path.join(__dirname, "node_modules"),
    path.join(repoRoot, "node_modules"),
  ],
});
