import "./index.scss";
import "../../assets/icons/logo.png";
import "../../assets/images/home-2.jpg";
import { setServices } from "@/blocks/services/scripts/services";
import { setHeader } from "@/blocks/header/scripts/header";
import { animationScrolling } from "@/utils/lib/animationScrolling";
import { setContacts } from "@/blocks/contacts/contacts";
import { setCSSVariales } from "@/utils/lib/setCSSVariales";
import { setFooter } from "@/blocks/footer/footer";
import { closeSocial, setSocial } from "@/blocks/social/social";
import { closeMenu } from "@/blocks/menu/scripts/menu";

setCSSVariales();

setHeader();

setServices();

setContacts();

setSocial();

setFooter();

//* === анимация блоков при скролле  ================================
window.onload = function () {
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

document.addEventListener("keydown", function (event: KeyboardEvent) {
  if (event.code === "Escape") {
    closeMenu();
    closeSocial();
  }
});
