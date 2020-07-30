const fs = require("fs");
const path = require("path");

const replaceFillColor = (svg, color) =>
  svg.replace(/fill="#[a-zA-Z0-9]+"/, `fill="${color}"`);

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
  csharp: getSVG("csharp"),
  coffeescript: getSVG("coffeescript"),
  clojure: getSVG("clojure"),
  css: getSVG("css3"),
  dart: getSVG("dart"),
  dotnet: getSVG("dotnet"),
  elm: getSVG("elm"),
  erlang: getSVG("erlang"),
  fsharp: getSVG("fsharp"),
  go: getSVG("go"),
  golang: getSVG("go"),
  haskell: getSVG("haskell"),
  html: getSVG("html5"),
  java: getSVG("java"),
  javascript: getSVG("javascript"),
  julia: getSVG("julia"),
  lua: getSVG("lua"),
  matlab: getSVG("matlab"),
  ocaml: getSVG("ocaml"),
  perl: getSVG("perl"),
  php: getSVG("php"),
  powershell: getSVG("shell"),
  prolog: getSVG("prolog"),
  python: getSVG("python"),
  r: getSVG("r"),
  racket: getSVG("racket"),
  ruby: getSVG("ruby"),
  rust: getSVG("rust"),
  scala: getSVG("scala"),
  smalltalk: getSVG("smalltalk"),
  sql: getSVG("sqllite"),
  shell: getSVG("shell"),
  swift: getSVG("swift"),
  tcl: getSVG("tcl"),
  typescript: getSVG("typescript"),
  vbscript: getSVG("vbscript"),
  markdown: getSVG("markdown"),
  docker: getSVG("docker"),
  jenkins: getSVG("jenkins"),
  groovy: getSVG("groovy"),
  nginx: getSVG("nginx"),
  nginx: getSVG("nginx"),
  default: getSVG("default"),
};

module.exports = ({ name, color, show_plang_color = false }) => {
  const logoSvg = !!logos[name] ? logos[name] : logos["default"];
  return show_plang_color ? replaceFillColor(logoSvg, color) : logoSvg;
};
