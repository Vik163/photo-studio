import webpack from "webpack";
import type { BuildOptions } from "../types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  const { isDev } = options;
  const styleLoader = {
    test: /\.scss$/i,
    exclude: /node_modules/,
    use: [
      // MiniCssExtractPlugin.loader создаёт css файл в build, а style-loader нет,
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          // применять модули
          modules: {
            // Применять модули только для .module.
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const fileLoader = {
    test: /\.(png|svg|jpg|jpeg|gif|webp|ttf|woff2)$/i,
    type: "asset/resource",
  };

  const htmlLoader = {
    test: /\.html$/i,
    loader: "html-loader",
  };

  const babelLoader = {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true, // улучшает сборку
        presets: ["@babel/preset-env"],
        // заменяют ts-loader и ускоряет сборку
        plugins: [
          "@babel/plugin-transform-typescript",
          "@babel/plugin-transform-runtime",
        ],
      },
    },
  };

  return [fileLoader, styleLoader, babelLoader];
};
