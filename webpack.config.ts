import { webpack } from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import type { BuildEnv, BuildPaths } from "./config/types/config";

import path from "path";

export default (env: BuildEnv) => {
  const buildPaths: BuildPaths = {
    entryIndex: path.resolve(__dirname, "./src/pages/index/index.ts"),
    build: path.resolve(__dirname, "build"),
    htmlIndex: path.resolve(__dirname, "./src/pages/index/index.html"),
    src: path.resolve(__dirname, "src"),
    favicon: path.resolve(__dirname, "./src/assets/icons/camera.svg"),
  };

  const port = env?.port || 3000;
  const mode = env?.mode || "development";
  const isDev = mode === "development";

  const options = {
    paths: buildPaths,
    port,
    mode,
    isDev,
  };

  const config = buildWebpackConfig(options);

  return config;
};
