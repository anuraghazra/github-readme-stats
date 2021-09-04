import { readdirSync, readFileSync } from "fs";
import { join, extname, basename } from "path";

const fileStrings: { [key: string]: string } = {};
try {
  const dirname = join(__dirname, "github");
  const files = readdirSync(dirname);

  files.forEach((fileName) => {
    try {
      if (extname(fileName) === ".svg") {
        const fileContent = readFileSync(join(dirname, fileName), {
          encoding: "utf8",
        });
        fileStrings[basename(fileName, ".svg")] = fileContent;
      }
    } catch (e) {}
  });
} catch (e) {}

export default fileStrings;
