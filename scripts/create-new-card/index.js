const fs = require("fs-extra");
const path = require("path");

const options = process.argv.slice(2);
const cardName = options[0];

try {
  if (!cardName || !/^[\w-]+$/.test(cardName)) {
    throw { code: "INVALID_NAME" };
  }
  const cardPath = path.join(process.cwd(), "src", "cards", cardName);
  fs.mkdirSync(cardPath);
  const templatePath = path.join(__dirname, "template");
  console.log(templatePath);
  fs.copySync(templatePath, cardPath);
  console.log(
    "\x1b[32m",
    "Success!",
    "\x1b[0m",
    "You can set route at src/cards/index.ts. Start develop.",
  );
} catch (e) {
  if (e.code === "EEXIST") {
    console.log("\x1b[31m", "ERR!", "\x1b[0m", "Card already exists.\n");
  } else if (e.code === "INVALID_NAME") {
    console.log(
      "\x1b[31m",
      "ERR!",
      "\x1b[0m",
      "The card name needs to be composed of A-Z|a-z|0-9|-|_\n",
    );
  }
  process.exit();
}
