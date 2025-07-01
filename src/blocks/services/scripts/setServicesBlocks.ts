import { animationScrolling } from "@/utils/lib/animationScrolling";
import { servicesData } from "@/utils/constants/services-data";
import { $class, $id } from "@/utils/lib/getElement";
import type { Services } from "@/utils/types/services-types";
import { addAnimationLeaveBlocks } from "./addAnimationLeaveBlocks";

const setAnimations = (
  serviceItem: HTMLElement,
  img: HTMLImageElement,
  index: number
) => {
  //* --- анимация схлопывания -----------
  addAnimationLeaveBlocks(serviceItem, index);

  //* - анимация встраивания ---------------------------
  animationScrolling(img, "up");

  //* --- левый и правый ---
  const info = $class("service__info", serviceItem);
  if (index === 0 || index % 2 === 0) {
    animationScrolling(info, "left");
  } else {
    animationScrolling(info, "right");
  }
  //* ------------------------------------------
};

export const setServicesBlocksFromTemplates = (servicesList: HTMLElement) => {
  const template = ($id("service") as HTMLTemplateElement)?.content;

  if (template && servicesData) {
    servicesData.forEach((item: Services, index: number) => {
      const serviceItem = template
        .querySelector(".service")
        ?.cloneNode(true)! as HTMLLIElement;

      const img = $class("service__img", serviceItem) as HTMLImageElement;
      img.src = item.imgB;
      img.alt = item.title;

      const title = $class("service__info-title", serviceItem);
      title.textContent = item.title;

      const text = $class("service__info-description", serviceItem);
      text.textContent = item.description;

      servicesList.append(serviceItem);

      setAnimations(serviceItem, img, index);
    });
  }
};
