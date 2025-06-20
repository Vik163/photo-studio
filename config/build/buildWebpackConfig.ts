import webpack from "webpack";
import type { Configuration } from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import type { BuildOptions } from "../types/config";
import { buildWebpackPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";
import { buildResolve } from "./buildResolve";
import { buildLoaders } from "./buildLoaders";
import { buildOpimizationImages } from "./optimization/buildOptimizationImages";

export const buildWebpackConfig = (options: BuildOptions): Configuration => {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entryIndex,
    output: {
      path: paths.build,
      clean: true,
      filename: "[name].[contenthash].js",
      publicPath: "/",
      asyncChunks: true,
      assetModuleFilename: "assets/[name].[contenthash:8][ext]", // устанавливает папку assets в build
    },
    plugins: buildWebpackPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolve(options),
    devtool: isDev ? "eval-cheap-module-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    optimization: buildOpimizationImages(),
  };
};
