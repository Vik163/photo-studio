import webpack from "webpack";
import type { BuildOptions } from "../types/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import dotenv from "dotenv";

export const buildWebpackPlugins = (
  options: BuildOptions
): webpack.WebpackPluginInstance[] => {
  const { paths, isDev, api } = options;
  const isProd = !isDev;

  //& Нужен для .env
  dotenv.config();

  const plugins = [
    //* Определяет глобальные переменные
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env), //& Нужен для .env
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(api),
    }),

    new HtmlWebpackPlugin({
      template: paths.main,
      favicon: paths.favicon,
      inject: true,
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: paths.orders,
      filename: "orders.html",
      favicon: paths.favicon,
      inject: true,
      chunks: ["orders"],
    }),

    new webpack.ProgressPlugin(),

    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
          declaration: true,
          global: true,
        },
        mode: "write-references",
      },
    }),
  ];

  // if (isDev) {
  //   plugins.push(
  //     new BundleAnalyzerPlugin({
  //       // не открывается постоянно
  //       openAnalyzer: false, // запуск по ссылке в терминале
  //     })
  //   ); // Анализирует размер бандла
  // }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  return plugins;
};
