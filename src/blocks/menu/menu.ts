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

function addClasses() {
  $add("menu_open", menu);
  $add("menu__items_open", menuItems);
  $add("header__btn_active", btn);
}

function removeClasses() {
  $remove("menu_open", menu);
  $remove("menu__items_open", menuItems);
  $remove("header__btn_active", btn);
}

//* --- создает css-переменную с положением скролла и отменяет прокрутку ---
function openMenu() {
  rootStyle.setProperty("--scroll-position", `${scrollY}px`);

  $add("no-scroll", app);
  addClasses();
}

//* --- удаляет css-переменную и востанавливает положение скролла ---
function closeMenu() {
  $remove("no-scroll", app);
  removeClasses();

  const scrollPosition = rootStyle.getPropertyValue("--scroll-position");

  rootStyle.removeProperty("--scroll-position");

  window.scroll({
    top: parseInt(scrollPosition || "0"),
    behavior: "instant",
  });
}

function clickMenu() {
  $toggle("header_active-menu", header);

  if ($contains("menu_open", menu)) {
    closeMenu();
  } else {
    openMenu();
  }
}

export const setMenu = () => {
  btn.addEventListener("click", clickMenu);
};

document.addEventListener("keydown", function (event: KeyboardEvent) {
  if ($contains("menu_open", menu) && event.code === "Escape") {
    closeMenu();
  }
});
