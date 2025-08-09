import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { BuildOptions } from "../types/config";

export const buildDevServer = (options: BuildOptions) => {
  const { port } = options;
  const devServer: DevServerConfiguration = {
    host: "127.0.0.1",
    allowedHosts: ["photostudio.ru", "www.photostudio.ru"], // При использовании HTML5 History API страница index.html скорее всего будет отображаться вместо любых 404 ответов
    // Запросы через index page иначе при перезагрузке не на главной странице выпадет ошибка
    historyApiFallback: true,
    // позволяет заменять, добавлять или удалять модули во время работы приложения без полной перезагрузки (сохраняет состояние приложения, обновляет только то, что было изменено, мгновенно обновляет браузер при внесении изменений в CSS/JS)
    hot: true,
    port,
    server: "https",
    // proxy: [
    //   {
    //     context: ["/api/**"],
    //     path: "https://127.0.0.1:8000",
    //     secure: false, // had an expression which was resolving to true
    //     changeOrigin: true,
    //   },
    // ],
    // Запуск сервера https://webpack.js.org/configuration/dev-server/#devserverhttps
    // server: {
    //   type: "https",
    //   options: {
    //     key: "C:/devPRO/photo-studio-api/security/127.0.0.1+1-key.pem",
    //     cert: "C:/devPRO/photo-studio-api/security/127.0.0.1+1.pem",
    //     ca: "C:/Users/user/AppData/Local/mkcert/rootCA.pem",

    //     passphrase: "webpack-dev-server",
    //     requestCert: true,
    //   },
    // },
  };

  return devServer;
};
