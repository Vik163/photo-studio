import webpack from "webpack";
import type { BuildOptions } from "../types/config";

export const buildResolve = (options: BuildOptions): webpack.ResolveOptions => {
  const { paths } = options;
  return {
    extensions: [".ts", ".js"],
    mainFiles: ["index"],
    modules: [paths.src, "node_modules"], // добавить каталог для поиска, который имеет приоритет над node_modules
    alias: {
      "@": paths.src,
    },
    fallback: { path: require.resolve("path-browserify") },
  };
};
