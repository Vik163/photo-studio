import { $class, $id, $toggle } from "@/utils/lib/getElement";

export const setMenu = () => {
  const btn = $class("header__btn");

  btn.addEventListener("click", function () {
    $toggle("active", btn);
    $toggle("open", $id("menu"));
  });
};
