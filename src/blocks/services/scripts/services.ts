import { servicesData } from "@/utils/lib/contants/services-data";
import { $class, $id } from "@/utils/lib/getElement";
import type { Services } from "@/utils/types/services-types";

export const setServices = () => {
  const servicesList = $class("services__list");
  const template = ($id("service") as HTMLTemplateElement)?.content;

  if (template && servicesData) {
    servicesData.forEach((item: Services) => {
      console.log("item:", item);
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
    });
  }
};
