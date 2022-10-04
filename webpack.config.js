import path from "path";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  output: {
    path: path.resolve(__dirname),
    library: {
      type: "module",
    },
    filename: "index.js",
  },
  experiments: {
    outputModule: true,
  },
  target: "node16",
  stats: {
    warnings: false,
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
