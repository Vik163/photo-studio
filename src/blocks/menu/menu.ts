import {
  $add,
  $class,
  $contains,
  $remove,
  $toggle,
} from "@/utils/lib/getElement";

export const setMenu = () => {
  const btn = $class("header__btn");

  btn.addEventListener("click", function () {
    //* --- создает css-переменную с положением скролла ---
    document.documentElement.style.setProperty(
      "--scroll-position",
      `${scrollY}px`
    );
    const app = $class("app");
    $toggle("active", btn);
    $toggle("open", $class("menu"));
    $toggle("open", $class("menu__items"));

    //* --- отменяет прокрутку ---
    if ($contains("no-scroll", app)) {
      const scrollY =
        document.documentElement.style.getPropertyValue("--scroll-position");
      document.documentElement.style.removeProperty("--scroll-position");
      window.scrollTo(0, parseInt(scrollY || "0"));
      $remove("no-scroll", app);
    } else {
      $add("no-scroll", app);
    }
  });
};
