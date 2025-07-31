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
    entry: { main: paths.entryMain, orders: paths.entryOrders },
    output: {
      path: paths.build,
      clean: true,
      filename: "[name].[contenthash].js",
      publicPath: "/",
      // asyncChunks: true,
      assetModuleFilename: "assets/[name].[contenthash:8][ext]", // устанавливает папку assets в build
    },
    plugins: buildWebpackPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolve(options),
    devtool: isDev ? "eval-cheap-module-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    // optimization: buildOpimizationImages(),
    externals: {
      "@yandex/ymaps3-types": [
        `promise new Promise((resolve) => {
            if (typeof ymaps3 !== 'undefined') {
              return ymaps3.ready.then(() => resolve(ymaps3));
            }

            const script = document.createElement('script');
            script.src = "https://api-maps.yandex.ru/v3/?apikey=${process.env.YA_MAP_KEY}&lang=ru_RU";
            script.onload = () => {
              ymaps3.ready.then(() => resolve(ymaps3));
            };
            document.head.appendChild(script);
          })`,
      ],
    },
  };
};
