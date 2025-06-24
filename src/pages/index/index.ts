import "./index.scss";
import "../../assets/icons/logo.png";
import "../../assets/images/home-2.jpg";
import { setServices } from "@/blocks/services/scripts/services";
import { setHeader } from "@/blocks/header/scripts/header";
import { animationScrolling } from "@/utils/lib/animationScrolling";

setHeader();

setServices();

// === анимация при скролле  ================================
window.onload = function () {
  const elementsOnUp = document.querySelectorAll(".animation-up");
  const elementsOnRight = document.querySelectorAll(".animation-right");
  const elementsOnLeft = document.querySelectorAll(".animation-left");

  elementsOnRight.forEach((el) => {
    animationScrolling(el, "right");
  });

  elementsOnLeft.forEach((el) => {
    animationScrolling(el, "left");
  });

  elementsOnUp.forEach((el) => {
    animationScrolling(el, "up");
  });
};
