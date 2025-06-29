import { SERVICE_HEIGHT } from "@/utils/constants/service-height";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import { observer } from "@/utils/lib/observer";

const list = $class("services__list");

const setClasses = (
  intersection: IntersectionObserverEntry,
  isLoaded: boolean,
  el: HTMLElement,
  index: number
) => {
  const container = $class("service__container", el);
  const paddingTop = 490;
  const zIndex = 20;
  if (intersection.isIntersecting) {
    $remove("service_inactive", container);
  } else {
    if (intersection.boundingClientRect.top < 0) {
      $add("service_inactive", container);
      container.style.top = `-${paddingTop - index * 5}px`;
      container.style.zIndex = `${zIndex - index}`;
      // list.style.paddingTop = `${SERVICE_HEIGHT}px`;
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
    (intersection, isLoaded) => setClasses(intersection, isLoaded, el, index),
    options
  );
};
