import { type ObserveCallback, observer } from "@/utils/lib/observer";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import { setMenuListeners } from "@/blocks/menu/scripts/menu";

const headerBlock = $class("header");
const mainObserver = $class("main__observer");

window.onscroll = function () {
  //* --- проверка положения скролла  -----
  const scrollPosition =
    document.documentElement.style.getPropertyValue("--scroll-position");

  const scrolled =
    scrollPosition || window.pageYOffset || document.documentElement.scrollTop;

  if (scrolled === 0) {
    $remove("header_active", headerBlock);
  }
};

const handleHeader: ObserveCallback = (entry) => {
  if (!entry.isIntersecting) {
    $add("header_active", headerBlock);
  }
};

export const setHeader = () => {
  if (mainObserver) observer(mainObserver, handleHeader);

  setMenuListeners();
};
