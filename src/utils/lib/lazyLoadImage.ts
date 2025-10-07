import { ClientServices } from "../types/works-data";
import { toggleAnimationClass } from "./animationScrolling";
import { observer } from "./observer";

export const lazyLoadImage = (img: HTMLImageElement, data: ClientServices) => {
  observer(img, (intersection, isLoaded) => {
    if (intersection.isIntersecting) {
      img.src = data.imgB;
      img.alt = data.title;
    }

    //* - анимация встраивания ---------------------------
    toggleAnimationClass(intersection, isLoaded, img, "up");
  });
};
