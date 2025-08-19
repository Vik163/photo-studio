//* ----- убирает .html в адрессной строке для разработки--------------------------

import { ORDER_PATH } from "../constants/storage";
import { PageNames } from "../types/routes";

/**
 * для dev-server.
 * Функция добавления роутов в адрессной строке
 * 1. проверяет путь в адресной строке
 * 2. получает путь сформированный по данным в localStorage
 * 3. разбивает в массив
 * 4. проверяет если в адресной строке уже есть вид продукта, полученный из пути (localStorage),
 * добавляет только категорию, иначе добавляет вид и категорию.
 * @param page - добавляется только когда надо перейти на другую страницу
 */

export const changeUrl = (page: PageNames) => {
  const pathname = localStorage.getItem(ORDER_PATH);

  const getUrl = () => {
    if (pathname) {
      return `/${pathname}`;
    } else if (page === "politic") {
      return "/politic";
    } else if (page === "errors") {
      return "/errors";
    } else {
      return "";
    }
  };

  const newURL = getUrl();

  window.history.pushState(null, "", newURL || "/orders");
};
