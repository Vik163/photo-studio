import { $class } from "@/utils/lib/getElement";
import { redirectOnPage } from "@/utils/lib/redirectOnPage";

const link = $class("footer__politic");

export const setFooter = () => {
  const dateElement = $class("footer__date");

  const date = new Date().getFullYear();
  dateElement.textContent = date.toString();

  link.addEventListener("click", function (e) {
    e.preventDefault();

    redirectOnPage("politic");
  });
};
