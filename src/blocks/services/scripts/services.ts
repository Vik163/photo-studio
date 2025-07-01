import { $class } from "@/utils/lib/getElement";
import { ObserveCallback, observer } from "@/utils/lib/observer";
import { setServicesBlocksFromTemplates } from "./setServicesBlocks";

const servicesList = $class("services__list");

const setCards: ObserveCallback = (entry, isLoaded) => {
  if (entry.isIntersecting) {
    if (!isLoaded) {
      setServicesBlocksFromTemplates(servicesList);
    }
  }
};

export const setServices = () => {
  // ленивая загрузка
  observer(servicesList, setCards);
};
