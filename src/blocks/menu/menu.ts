import {
  $add,
  $class,
  $contains,
  $remove,
  $toggle,
} from "@/utils/lib/getElement";

const app = $class("app");
const header = $class("header");
const btn = $class("header__btn", header);
const menu = $class("menu");
const menuItems = $class("menu__items", menu);
const rootStyle = document.documentElement.style;

//* --- создает css-переменную с положением скролла и отменяет прокрутку ---
function openMenu() {
  rootStyle.setProperty("--scroll-position", `${scrollY}px`);

  $add("no-scroll", app);
}

//* --- удаляет css-переменную и востанавливает положение скролла ---
function closeMenu() {
  $remove("no-scroll", app);

  const scrollPosition = rootStyle.getPropertyValue("--scroll-position");

  rootStyle.removeProperty("--scroll-position");

  window.scroll({
    top: parseInt(scrollPosition || "0"),
    behavior: "instant",
  });
}

function clickMenu() {
  $toggle("active", btn);
  $toggle("open", menu);
  $toggle("open", menuItems);
  $toggle("header_active-menu", header);

  if ($contains("no-scroll", app)) {
    closeMenu();
  } else {
    openMenu();
  }
}

export const setMenu = () => {
  btn.addEventListener("click", clickMenu);
};
