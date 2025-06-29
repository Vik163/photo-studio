import { ObserveCallback, observer } from "./observer";

type Dir = "right" | "left" | "up" | "down";

const classByDirections = (dir: Dir) => {
  switch (dir) {
    case "right":
      return "on-right";
    case "left":
      return "on-left";
    case "down":
      return "on-down";
    case "up":
      return "on-up";
    default:
      return "on-up";
  }
};

export const toggleAnimationClass: ObserveCallback = (
  entry,
  isLoaded,
  el: Element,
  direction: Dir
) => {
  if (!isLoaded)
    el.classList.toggle(classByDirections(direction), entry.isIntersecting);
};

/**
 * Добавляет или удаляет класс css
 * @param el - Элемент
 * @param direction - направление "right" | "left" | "up" | "down"
 */
export const animationScrolling = (el: Element, direction: Dir) => {
  observer(el, (intersection, isLoaded) =>
    toggleAnimationClass(intersection, isLoaded, el, direction)
  );
};
