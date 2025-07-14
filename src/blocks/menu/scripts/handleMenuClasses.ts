import { $add, $class, $remove } from "@/utils/lib/getElement";

const app = $class("app");
const header = $class("header");
const btn = $class("header__btn", header);
const menu = $class("menu");
const menuItems = $class("menu__items", menu);

export function addClasses() {
  $add("no-scroll", app);
  $add("menu_open", menu);
  $add("menu__items_open", menuItems);
  $add("header__btn_active", btn);
  $add("header_active-menu", header);
}

export function removeClasses() {
  $remove("no-scroll", app);
  $remove("menu_open", menu);
  $remove("menu__items_open", menuItems);
  $remove("header__btn_active", btn);
  $remove("header_active-menu", header);
}
