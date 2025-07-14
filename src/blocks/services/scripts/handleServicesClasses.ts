import { $add, $class, $remove } from "@/utils/lib/getElement";
import {
  HEADER_HEIGHT,
  PADDING_TOP_FROM_HEADER,
  SERVICE_HEIGHT,
  Z_Index,
} from "@/utils/constants/styles";

export const handleClasses = (
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
