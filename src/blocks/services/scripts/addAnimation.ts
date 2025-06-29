import {
  HEADER_HEIGHT,
  SERVICE_HEIGHT,
} from "@/utils/constants/service-height";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import { observer } from "@/utils/lib/observer";

const setClasses = (
  intersection: IntersectionObserverEntry,
  el: HTMLElement,
  index: number
) => {
  const container = $class("service__container", el);
  const paddingTop = SERVICE_HEIGHT - HEADER_HEIGHT - 5;
  const zIndex = 20;
  if (intersection.isIntersecting) {
    $remove("service_inactive", container);
  } else {
    if (intersection.boundingClientRect.top < 0) {
      $add("service_inactive", container);
      container.style.top = `-${paddingTop - index * 5}px`;
      container.style.zIndex = `${zIndex - index}`;
    }
  }
};

export const addAnimation = (el: HTMLElement, index: number) => {
  const options = {
    // root: по умолчанию window,
    // но можно задать любой элемент-контейнер
    rootMargin: "-12% 0% 0% 0%",
    threshold: 0,
  };
  observer(
    el,
    (intersection, isLoaded) => setClasses(intersection, el, index),
    options
  );
};
