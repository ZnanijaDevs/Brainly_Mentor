import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import RemoveEmptyScriptsPlugin from "webpack-remove-empty-scripts";
import ZipPlugin from "zip-webpack-plugin";

import makeEntries from "./build-scripts/makeEntries";
import transformManifest from "./build-scripts/transformManifest";

const NODE_ENV = process.env.NODE_ENV.trim() as "development" | "production";
const isProd = NODE_ENV === "production";

const SRC_DIR = "./src";
const OUT_DIR = `./build-${isProd ? "production" : "dev"}`;

const config: webpack.Configuration = {
  entry: {
    ...makeEntries(`${SRC_DIR}/views/*/*(*.ts|*.tsx|*.js|*.jsx)`, "content-scripts", "index", true),
    ...makeEntries(`${SRC_DIR}/styles/*/styles.scss`, "content-scripts", "style", true),
    ...makeEntries(`${SRC_DIR}/views/Inject.ts`, "content-scripts", "contentScript"),
    ...makeEntries(`${SRC_DIR}/background/*.ts`, "background", "serviceWorker"),
    ...makeEntries(`${SRC_DIR}/sentry.ts`, "content-scripts", "sentry"),
  },
  output: {
    path: path.resolve(__dirname, OUT_DIR),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/
    }, {
      test: /\.txt/,
      type: "asset/source",
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),
    new CopyPlugin({
      patterns: [
        { from: `${SRC_DIR}/assets/`, to: "assets/" },
        { from: `${SRC_DIR}/icons/`, to: "icons/" },
        {
          from: "./manifest.json",
          transform: (content) => transformManifest(content)
        },
        "LICENSE"
      ]
    }),
    new MiniCssExtractPlugin(),
    new RemoveEmptyScriptsPlugin({ enabled: true })
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    plugins: [new TsconfigPathsPlugin()]
  },
  target: "web",
  devtool: "inline-cheap-source-map"
};

if (isProd) {
  config.plugins.push(
    new ZipPlugin({ filename: "build.zip" })
  );

  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({ 
        extractComments: false,
        terserOptions: {
          format: { comments: false }
        }
      })
    ]
  };
}

export default config;