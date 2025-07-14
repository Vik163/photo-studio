import { UPPER_BOUND_SCREEN } from "@/utils/constants/styles";
import { animationScrolling } from "@/utils/lib/animationScrolling";
import { $class } from "@/utils/lib/getElement";
import { observer } from "@/utils/lib/observer";
import { handleClasses } from "./handleServicesClasses";

const addAnimationLeaveBlocks = (el: HTMLElement, index: number) => {
  observer(el, (intersection) => handleClasses(intersection, el, index), {
    //* - опции
    //* - root: по умолчанию window, но можно задать любой элемент-контейнер
    rootMargin: `-${UPPER_BOUND_SCREEN + index}% 0% 0% 0%`,
    threshold: 0,
  });
};

export const setAnimations = (serviceItem: HTMLElement, index: number) => {
  //* --- анимация схлопывания -----------
  addAnimationLeaveBlocks(serviceItem, index);

  //* --- левый и правый ---
  const info = $class("service__info", serviceItem);
  if (index === 0 || index % 2 === 0) {
    animationScrolling(info, "left");
  } else {
    animationScrolling(info, "right");
  }
  //* ------------------------------------------
};
