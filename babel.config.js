// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],

    [
      "@babel/preset-typescript",
      {
        jsxPragma: "SVGRender.createElement",
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "SVGRender.createElement", // default pragma is React.createElement (only in classic runtime)
        runtime: "classic",
      },
    ],
  ],
};
