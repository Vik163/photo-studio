type BuildMode = "production" | "development";

export interface BuildPaths {
  entryMain: string;
  entryOrders: string;
  entryPolitic: string;
  entryAdmin: string;
  src: string;
  main: string;
  orders: string;
  politic: string;
  admin: string;
  build: string;
  favicon: string;
}

export interface BuildOptions {
  paths: BuildPaths;
  port: number;
  mode: BuildMode;
  isDev: boolean;
  api: string;
}

export interface BuildEnv {
  port: number;
  mode: BuildMode;
}
