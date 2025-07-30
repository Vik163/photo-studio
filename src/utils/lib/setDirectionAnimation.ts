import { animationScrolling } from "./animationScrolling";

export const setDirectionAnimation = () => {
  const elementsOnRight = document.querySelectorAll(".animation-right");
  // const elementsOnLeft = document.querySelectorAll(".animation-left");
  // const elementsOnUp = document.querySelectorAll(".animation-up");

  elementsOnRight.forEach((el) => {
    animationScrolling(el, "right");
  });

  // elementsOnLeft.forEach((el) => {
  //   animationScrolling(el, "left");
  // });

  // elementsOnUp.forEach((el) => {
  //   animationScrolling(el, "up");
  // });
};
