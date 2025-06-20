import webpack from "webpack";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
// const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
import TerserPlugin from "terser-webpack-plugin";

export const buildOpimizationImages =
  (): webpack.Configuration["optimization"] => {
    return {
      minimize: true,
      minimizer: [
        // ускоряет сборку
        new TerserPlugin({
          parallel: true,
        }),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                      {
                        name: "addAttributesToSVGElement",
                        params: {
                          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
        //* Cоздает копии изображений с расширением .webp
        // new ImageminWebpWebpackPlugin({
        //   config: [
        //     {
        //       test: /\.(jpe?g|png)/,
        //       options: {
        //         quality: 75,
        //       },
        //     },
        //   ],
        //   overrideExtension: true,
        //   detailedLogs: false,
        //   silent: false,
        //   strict: true,
        // }),
      ],
    };
  };
