import { animationScrolling } from "@/utils/lib/animationScrolling";
import { servicesData } from "@/utils/constants/services-data";
import { $class, $id } from "@/utils/lib/getElement";
import { ObserveCallback, observer } from "@/utils/lib/observer";
import type { Services } from "@/utils/types/services-types";
import { addAnimation } from "./addAnimation";
import { SERVICE_HEIGHT } from "@/utils/constants/service-height";

const servicesList = $class("services__list");

//& ------ установка css-переменной (высота service) --------
const root = document.documentElement;
root.style.setProperty("--height-service", `${SERVICE_HEIGHT}px`);
//& --------------------------------------------------------

export const handleServices = () => {
  const template = ($id("service") as HTMLTemplateElement)?.content;

  if (template && servicesData) {
    servicesData.forEach((item: Services, index: number) => {
      const serviceItem = template
        .querySelector(".service")
        ?.cloneNode(true)! as HTMLLIElement;

      addAnimation(serviceItem, index);

      const img = $class("service__img", serviceItem) as HTMLImageElement;
      img.src = item.imgB;
      img.alt = item.title;

      //* - анимация ---------------------------
      animationScrolling(img, "up");

      const info = $class("service__info", serviceItem);
      if (index === 0 || index % 2 === 0) {
        animationScrolling(info, "left");
      } else {
        animationScrolling(info, "right");
      }
      //* ------------------------------------------

      const title = $class("service__info-title", serviceItem);
      title.textContent = item.title;

      const text = $class("service__info-description", serviceItem);
      text.textContent = item.description;

      servicesList.append(serviceItem);
    });
  }
};

const setCards: ObserveCallback = (entry, isLoaded) => {
  if (entry.isIntersecting) {
    if (!isLoaded) {
      handleServices();
    }
  }
};

export const setServices = () => {
  // ленивая загрузка
  observer(servicesList, setCards);
};
