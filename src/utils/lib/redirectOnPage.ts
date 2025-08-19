import { ORDER_PATH } from "../constants/storage";
import type { PageNames, PathNames } from "../types/routes";

/**
 * Направляет на указанную в параметре страницу
 * @param page - роут страницы
 */
export const redirectOnPage = (page: PageNames, path: PathNames) => {
  path
    ? localStorage.setItem(ORDER_PATH, path)
    : localStorage.removeItem(ORDER_PATH);

  const pathDev = path ? `/${page}/${path}` : `/${page}`;
  const address = __IS_DEV__
    ? pathDev
    : `https://photosalon.online/${page}.html`;

  history.pushState({ page }, document.title, window.location.pathname);
  window.location.href = address;
};
