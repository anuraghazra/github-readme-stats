const fs = require("fs");
const path = require("path");

const replaceFillColor = (svg, color) =>
  svg
    .replace(/fill="#[a-zA-Z0-9]+"/g, `fill="${color}"`)
    .replace(/fill:(\s)?#[a-zA-Z0-9]+;/g, `fill:${color}`);

const readFile = (name) => {
  const logoFilePath = path.join(__dirname, "..", "logos", `${name}.svg`);
  return fs.readFileSync(
    fs.existsSync(logoFilePath)
      ? logoFilePath
      : path.join(__dirname, "..", "logos", `default.svg`),
    {
      encoding: "utf8",
    }
  );
};

const getSVG = (name) =>
  readFile(name)
    .replace(/\<\?xml.+\?\>|\<\!--.+\--\>|xmlns:xlink="."|\<\!DOCTYPE.+\>/g, "")
    .replace(/xmlns:xlink=*('|\").*?('|\")/g, "");

const logos = {
  c: getSVG("c"),
  "c++": getSVG("c++"),
  "c#": getSVG("csharp"),
  coffeescript: getSVG("coffeescript"),
  clojure: getSVG("clojure"),
  css: getSVG("css3"),
  dart: getSVG("dart"),
  elm: getSVG("elm"), // no-logo
  erlang: getSVG("erlang"),
  "f#": getSVG("fsharp"),
  go: getSVG("go"),
  golang: getSVG("go"),
  haskell: getSVG("haskell"),
  html: getSVG("html5"),
  java: getSVG("java"),
  javascript: getSVG("javascript"),
  julia: getSVG("julia"), // no-logo
  "jupyter-notebook": getSVG("default"), // no-logo
  lua: getSVG("lua"), // no-logo
  "common-lisp": getSVG("lisp"), // no-logo
  "emacs-lisp": getSVG("lisp"), // no-logo
  makefile: getSVG("default"), // no-logo
  matlab: getSVG("matlab"),
  ocaml: getSVG("ocaml"), // no-logo
  perl: getSVG("perl"),
  php: getSVG("php"),
  powershell: getSVG("powershell"),
  prolog: getSVG("prolog"),
  python: getSVG("python"),
  r: getSVG("r"),
  ruby: getSVG("ruby"),
  rust: getSVG("rust"),
  scala: getSVG("scala"),
  sql: getSVG("database"),
  shell: getSVG("terminal"),
  swift: getSVG("swift"),
  typescript: getSVG("typescript"),
  "vim-script": getSVG("vim"),
  groovy: getSVG("groovy"),
  default: getSVG("default"),
};

module.exports = ({ name, color, show_plang_color = false }) => {
  const logoSvg = !!logos[name] ? logos[name] : logos["default"];
  return show_plang_color ? replaceFillColor(logoSvg, color) : logoSvg;
};
