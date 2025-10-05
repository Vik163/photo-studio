import { servicesData } from "@/utils/constants/services-data";
import { $class, $id } from "@/utils/lib/getElement";
import type {
  AdminOneService,
  AdminServices,
  TypeServices,
} from "@/utils/types/admin-data-services";
import { setAdminModal } from "../../admin-modal/scripts/setAdminModal";

const container = $class("admin__list-services");

export const setContentOneService = (data: AdminOneService[]) => {
  if (data.length > 0) {
    const servicesContainer = $class("services-block__container", container);
    data.forEach((serviceData) => {
      const templateService = ($id("services-item") as HTMLTemplateElement)
        .content;
      // дочерний темплейт
      const serviceTemplate = templateService
        .querySelector(".services-item")
        ?.cloneNode(true) as HTMLElement;

      const service = $class("services-item__name", serviceTemplate);
      service.textContent = serviceData.service;

      const price = $class("services-item__price", serviceTemplate);
      price.textContent = serviceData.price?.toString()!;

      servicesContainer?.append(serviceTemplate);
    });
  }
};

export const setContentServices = (res?: AdminServices) => {
  servicesData.forEach((block) => {
    const templateServiceBlock = ($id("services-block") as HTMLTemplateElement)
      .content;
    // дочерний темплейт
    const serviceBlockTemplate = templateServiceBlock
      .querySelector(".services-block")
      ?.cloneNode(true) as HTMLAnchorElement;

    const title = $class("services-block__title", serviceBlockTemplate);
    title.textContent = block.title;

    const list = $class("services-block__container", serviceBlockTemplate);
    list.id = block.pathName;

    const btn = $class(
      "services-block__add-btn",
      serviceBlockTemplate
    ) as HTMLButtonElement;
    btn.id = block.pathName;

    btn.addEventListener("click", () => setAdminModal(btn.id));

    container?.append(serviceBlockTemplate);

    if (res?.[block.pathName]) {
      setContentOneService(res?.[block.pathName]!);
    }
  });
};
