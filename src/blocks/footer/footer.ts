import { $class } from "@/utils/lib/getElement";

export const setFooter = () => {
  const dateElement = $class("footer__date");

  const date = new Date().getFullYear();
  dateElement.textContent = date.toString();
};
