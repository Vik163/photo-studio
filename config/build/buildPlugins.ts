import webpack from "webpack";
import type { BuildOptions } from "../types/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildWebpackPlugins = (
  options: BuildOptions
): webpack.WebpackPluginInstance[] => {
  const { paths, isDev } = options;
  const isProd = !isDev;

  const plugins = [
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),

    new HtmlWebpackPlugin({
      template: paths.htmlIndex,
      filename: "index.html",
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

  if (isProd)
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );

  return plugins;
};
