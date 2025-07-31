import type { PageNames, PathNames } from "../types/routes";

/**
 * Направляет на указанную в параметре страницу
 * @param page - роут страницы
 */
export const redirectOnPage = (page: PageNames, path: PathNames) => {
  path
    ? localStorage.setItem("service", path)
    : localStorage.removeItem("service");

  const pathDev = path ? `/${page}/${path}` : `/${page}`;
  const address = __IS_DEV__
    ? pathDev
    : `https://academy-heat-hommet.vercel.app/${page}/${path}`;

  window.location.href = address;
};
