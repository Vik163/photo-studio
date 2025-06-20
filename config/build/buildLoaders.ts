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
      "css-loader",
      "sass-loader",
    ],
  };

  const imgLoader = {
    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
    type: "asset/resource",
  };

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  };

  // помогает загружать локальные картинки
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

  return [imgLoader, fontsLoader, htmlLoader, styleLoader, babelLoader];
};
