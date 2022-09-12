/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const ZipPlugin = require("zip-webpack-plugin");

const makeEntries = require("./build-scripts/makeEntries");
const transformManifest = require("./build-scripts/transformManifest");

const isProd = process.env.NODE_ENV === "production";

const SRC_DIR = "./src";
const BUILD_DIR = `build-${isProd ? "production" : "dev"}`;

/** @type {webpack.Configuration} */
const config = {
  entry: {
    ...makeEntries(`${SRC_DIR}/views/*/*(*.ts|*.tsx|*.js|*.jsx)`, "content-scripts", "index", true),
    ...makeEntries(`${SRC_DIR}/styles/*/styles.scss`, "content-scripts", "style", true),
    ...makeEntries(`${SRC_DIR}/views/Inject.ts`, "content-scripts", "contentScript"),
    ...makeEntries(`${SRC_DIR}/background/*.ts`, "background", "serviceWorker"),
    ...makeEntries(`${SRC_DIR}/sentry.ts`, "content-scripts", "sentry"),
  },
  output: {
    path: path.resolve(__dirname, BUILD_DIR),
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
      "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development")
    }),
    new CopyPlugin({
      patterns: [
        { from: `${SRC_DIR}/assets/`, to: "assets/" },
        { from: `${SRC_DIR}/icons/`, to: "icons/" },
        {
          from: "manifest.json",
          transform: (content) => transformManifest(content)
        },
        "LICENSE"
      ]
    }),
    new MiniCssExtractPlugin(),
    new RemoveEmptyScriptsPlugin()
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
    new ZipPlugin({ filename: `build-${require("./package.json").version}.zip` })
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

module.exports = config;