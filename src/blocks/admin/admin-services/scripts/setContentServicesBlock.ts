import { servicesData } from "@/utils/constants/services-data";
import { deleteNodes } from "@/utils/lib/deleteNodes";
import { $class, $id } from "@/utils/lib/getElement";
import type { AdminServices } from "@/utils/types/admin-data-services";
import { editAdminServices } from "./editAdminServices";
import { setAdminModal } from "../../admin-modal/scripts/setAdminModal";
import { setContentListServices } from "./setContentServices";

const container = $class("admin__list-services");

export const setContentServicesBlock = (res?: AdminServices[]) => {
  deleteNodes(".services-block", container);

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

    list.addEventListener("click", (e) => editAdminServices(e, block.pathName));
    btn.addEventListener("click", () => setAdminModal(block.pathName));

    container?.append(serviceBlockTemplate);

    const servicesData = res?.find((item) => item.type === block.pathName);

    if (servicesData) {
      setContentListServices(servicesData);
    }
  });
};
