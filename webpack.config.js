const path = require("path");
const TsconfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname),
    filename: "index.js",
  },
  target: "node",
  stats: {
    builtAt: true,
    errorDetails: true,
    errorStack: true,
  },
  mode: "development",
  entry: {
    index: "./api/index.ts",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts", ".json"],
    plugins: [
      new TsconfigPathsWebpackPlugin({
        extensions: [".js", ".ts", ".json"],
      }),
    ],
    fallback: {
      util: require.resolve("util"),
    },
  },
  module: {
    rules: [
      {
        // test: [/\.js$/, /\.ts$/],
        test: [/.js$/, /\.ts$/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
  performance: {
    hints: false,
  },
  ignoreWarnings: [/Failed to parse source map/],
};
