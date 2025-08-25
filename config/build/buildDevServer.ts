import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { BuildOptions } from "../types/config";
const fs = require("fs");
const path = require("path");

export const buildDevServer = (options: BuildOptions) => {
  const { port } = options;
  const devServer: DevServerConfiguration = {
    host: "127.0.0.1",
    allowedHosts: [
      "photostudio.ru",
      "www.photostudio.ru",
      "photosalon.online",
      "www.photosalon.online",
    ], // При использовании HTML5 History API страница index.html скорее всего будет отображаться вместо любых 404 ответов
    // Запросы через index page иначе при перезагрузке не на главной странице выпадет ошибка
    historyApiFallback: true,
    // позволяет заменять, добавлять или удалять модули во время работы приложения без полной перезагрузки (сохраняет состояние приложения, обновляет только то, что было изменено, мгновенно обновляет браузер при внесении изменений в CSS/JS)
    hot: true,
    port,
    // server: "https",
    server: {
      type: "https",
      options: {
        ca: fs.readFileSync(
          path.resolve(
            __dirname,
            "../../../../Users/User/AppData/Local/mkcert/rootCA.pem"
          )
        ),
        key: fs.readFileSync(
          path.resolve(__dirname, "../../../security/photostudio.ru+3-key.pem")
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, "../../../security/photostudio.ru+3.pem")
        ),
      },
    },
  };

  return devServer;
};
