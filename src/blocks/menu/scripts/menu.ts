import { HEADER_HEIGHT } from "@/utils/constants/styles";
import { $class, $contains, $id, $toggle } from "@/utils/lib/getElement";
import { addClasses, removeClasses } from "./handleMenuClasses";

const header = $class("header");
const btn = $class("header__btn", header);
const menu = $class("menu");
const menuItems = $class("menu__items", menu);
const menuItemsLinks = menuItems.querySelectorAll(".menu__item-link");
const rootStyle = document.documentElement.style;

//* --- создает css-переменную с положением скролла и отменяет прокрутку ---
function openMenu() {
  rootStyle.setProperty("--scroll-position", `${scrollY}px`);

  addClasses();
}

//* --- удаляет css-переменную и востанавливает положение скролла ---
function closeMenu() {
  removeClasses();

  //* востанавливает положение скролла
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

function scrollToBlock(event: Event) {
  event.preventDefault();
  const nameEl = (event.target as HTMLAnchorElement).name;
  closeMenu();

  const topPos =
    $id(nameEl).getBoundingClientRect().top -
    HEADER_HEIGHT +
    window.pageYOffset;

  window.scrollTo({
    top: topPos,
    behavior: "smooth",
  });
}

export const setMenu = () => {
  btn.addEventListener("click", clickMenu);

  document.addEventListener("keydown", function (event: KeyboardEvent) {
    if ($contains("menu_open", menu) && event.code === "Escape") {
      closeMenu();
    }
  });

  menuItemsLinks.forEach((link) => {
    link.addEventListener("click", (e) => scrollToBlock(e));
  });
};
