import { Services } from "../types/services-types";
import { toggleAnimationClass } from "./animationScrolling";
import { observer } from "./observer";

export const lazyLoadImage = (img: HTMLImageElement, data: Services) => {
  observer(img, (intersection, isLoaded) => {
    if (intersection.isIntersecting) {
      img.src = data.imgB;
      img.alt = data.title;
    }

    //* - анимация встраивания ---------------------------
    toggleAnimationClass(intersection, isLoaded, img, "up");
  });
};
