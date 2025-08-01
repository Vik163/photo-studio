import { $class } from "@/utils/lib/getElement";
import { lazyLoadImage } from "@/utils/lib/lazyLoadImage";
import { servicesData } from "@/utils/constants/services-data";
import { setAnimations } from "./servicesAnimations";
import { redirectOnPage } from "@/utils/lib/redirectOnPage";
import { PathNames } from "@/utils/types/routes";

const servicesList = $class("services__list");

function goPage(e: Event, path: PathNames) {
  e.preventDefault();
  redirectOnPage("orders", path);
}

export const setServices = () => {
  const services = servicesList.querySelectorAll(".service");
  services.forEach((item: Element, index: number) => {
    const serviceItem = item as HTMLLIElement;
    const img = $class("service__img", serviceItem) as HTMLImageElement;
    const btn = $class("service__info-btn", serviceItem) as HTMLButtonElement;

    lazyLoadImage(img, servicesData[index]);
    setAnimations(serviceItem, index);
    btn.addEventListener("click", (e) => goPage(e, btn.id as PathNames));
  });
};
