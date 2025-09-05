import { $class, $contains, $toggle } from "@/utils/lib/getElement";
import { addClasses, removeClasses } from "./handleMenuClasses";
import { scrollToBlock } from "./scrollToBlock";
import { getBaketListObj } from "@/utils/lib/handleYaBaket";
import { redirectOnPage } from "@/utils/lib/redirectOnPage";

const header = $class("header");
const btn = $class("header__btn", header);
const menu = $class("menu");
const menuItems = $class("menu__items", menu);
const politic = $class("menu__politic", menu);
const menuItemsLinks = menuItems.querySelectorAll(".menu__item-link");
const rootStyle = document.documentElement.style;

//* --- создает css-переменную с положением скролла и отменяет прокрутку ---
function openMenu() {
  rootStyle.setProperty("--scroll-position", `${scrollY}px`);
  getBaketListObj();

  addClasses();
}

//* --- удаляет css-переменную и востанавливает положение скролла ---
export function closeMenu() {
  if ($contains("menu_open", menu)) {
    removeClasses();

    //* востанавливает положение скролла
    const scrollPosition = rootStyle.getPropertyValue("--scroll-position");

    rootStyle.removeProperty("--scroll-position");

    window.scroll({
      top: parseInt(scrollPosition || "0"),
      behavior: "instant",
    });
  }
}

async function clickMenu() {
  $toggle("header_active-menu", header);

  // const token = await $api.get("/users/cookie/+7 (123) 123-12-31");
  // console.log("$api:", token);
  if ($contains("menu_open", menu)) {
    closeMenu();
  } else {
    openMenu();
  }
}

export const setMenuListeners = () => {
  btn.addEventListener("click", clickMenu);

  menuItemsLinks.forEach((link) => {
    link.addEventListener("click", (e) => scrollToBlock(e));
  });

  politic.addEventListener("click", function (e) {
    e.preventDefault();

    redirectOnPage("politic");
  });
};
