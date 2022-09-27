const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
require("dotenv").config();

module.exports = () => {
  const { env } = process;
  const isDevelopment = env.NODE_ENV === "development";
  let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[fullhash].js",
      chunkFilename: "[name].[fullhash].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.html$/i,
          use: {
            loader: "html-loader",
          },
        },
        {
          test: /\.s?[ac]ss$/i,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: `@use 'src/styles/variables.scss' as *;`,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ["file-loader?name=[name].[ext]"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss", ".json"],
      fallback: {
        "react/jsx-runtime": "react/jsx-runtime.js",
        "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
        favicon: `./public/favicon.ico`,
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[id].[contenthash].css",
      }),
      new Dotenv(),
    ],
  };
  switch (env.NODE_ENV) {
    case "development":
      config = {
        ...config,
        devServer: {
          historyApiFallback: true,
          open: true,
          hot: true,
        },
        plugins: [
          ...config.plugins,
          new ReactRefreshWebpackPlugin({ overlay: false }),
        ],
      };
      break;
    case "production":
      config = {
        ...config,
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                sourceMap: true,
                compress: {
                  drop_console: true,
                },
              },
            }),
          ],
        },
      };
      break;
    default:
      break;
  }

  return config;
};
