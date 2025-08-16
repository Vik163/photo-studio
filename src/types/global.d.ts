declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.svg";

declare module "*.html" {
  const value: any;
  export default value;
}

declare module "fontmin-webpack";

declare const __IS_DEV__: boolean;
declare const __API__: string;

declare namespace NodeJS {
  interface ProcessEnv {
    YA_MAP_KEY: string;
    YA_NAME_CLOUD: string;
    YA_CLOUD_ID: string;
    YA_CLOUD_KEY: string;

    HOST_API_PROD: string;
    HOST_API_DEV: string;
  }
}
