import {
  HEADER_HEIGHT,
  PADDING_TOP_FROM_HEADER,
  SERVICE_HEIGHT,
  UPPER_BOUND_SCREEN,
  Z_Index,
} from "@/utils/constants/styles";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import { observer } from "@/utils/lib/observer";

const setClasses = (
  intersection: IntersectionObserverEntry,
  el: HTMLElement,
  index: number
) => {
  const container = $class("service__container", el);
  const paddingTop = SERVICE_HEIGHT - HEADER_HEIGHT - PADDING_TOP_FROM_HEADER;

  if (intersection.isIntersecting) {
    $remove("service_inactive", container);
  } else if (intersection.boundingClientRect.top < 0) {
    $add("service_inactive", container);
    container.style.top = `-${paddingTop - index * PADDING_TOP_FROM_HEADER}px`;
    container.style.zIndex = `${Z_Index - index}`;
  }
};

export const addAnimationLeaveBlocks = (el: HTMLElement, index: number) => {
  observer(el, (intersection) => setClasses(intersection, el, index), {
    //* - опции
    //* - root: по умолчанию window, но можно задать любой элемент-контейнер
    rootMargin: `-${UPPER_BOUND_SCREEN + index}% 0% 0% 0%`,
    threshold: 0,
  });
};
