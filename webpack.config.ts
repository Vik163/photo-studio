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
  const api =
    mode === "development" ? "http://127.0.0.1:8000" : "http://127.0.0.1:8000";

  const options = {
    paths: buildPaths,
    port,
    mode,
    isDev,
    api,
  };

  const config = buildWebpackConfig(options);

  return config;
};
