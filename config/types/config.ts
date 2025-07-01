type BuildMode = "production" | "development";

export interface BuildPaths {
  entryIndex: string;
  src: string;
  htmlIndex: string;
  build: string;
  favicon: string;
}

export interface BuildOptions {
  paths: BuildPaths;
  port: number;
  mode: BuildMode;
  isDev: boolean;
}

export interface BuildEnv {
  port: number;
  mode: BuildMode;
}
