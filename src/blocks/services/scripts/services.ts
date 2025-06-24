import { servicesData } from "@/utils/lib/constants/services-data";
import { $add, $class, $id } from "@/utils/lib/getElement";
import type { Services } from "@/utils/types/services-types";

export const setServices = () => {
  const servicesList = $class("services__list");
  const template = ($id("service") as HTMLTemplateElement)?.content;

  if (template && servicesData) {
    servicesData.forEach((item: Services, index) => {
      const serviceItem = template
        .querySelector(".service")
        ?.cloneNode(true)! as HTMLLIElement;

      const img = $class("service__img", serviceItem) as HTMLImageElement;
      $add("animation-up", img);
      img.src = item.imgB;
      img.alt = item.title;

      const info = $class("service__info", serviceItem);
      if (index === 0 || index % 2 === 0) {
        $add("animation-left", info);
      } else $add("animation-right", info);
      const title = $class("service__info-title", serviceItem);
      title.textContent = item.title;

      const text = $class("service__info-description", serviceItem);
      text.textContent = item.description;

      servicesList.append(serviceItem);
    });
  }
};
