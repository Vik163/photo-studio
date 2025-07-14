import { $class } from "@/utils/lib/getElement";
import { lazyLoadImage } from "@/utils/lib/lazyLoadImage";
import { servicesData } from "@/utils/constants/services-data";
import { setAnimations } from "./servicesAnimations";

const servicesList = $class("services__list");

export const setServices = () => {
  const services = servicesList.querySelectorAll(".service");
  services.forEach((item: Element, index: number) => {
    const serviceItem = item as HTMLLIElement;
    const img = $class("service__img", serviceItem) as HTMLImageElement;

    lazyLoadImage(img, servicesData[index]);
    setAnimations(serviceItem, index);
  });
};
