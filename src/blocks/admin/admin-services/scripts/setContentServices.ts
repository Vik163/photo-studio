import { servicesData } from "@/utils/constants/services-data";
import { $class, $id } from "@/utils/lib/getElement";
import { AdminServices } from "@/utils/types/admin-data-services";
import { setAdminModal } from "../../admin-modal/scripts/setAdminModal";

const container = $class("admin__list-services");

export const setContentServices = (res?: AdminServices) => {
  servicesData.forEach((block) => {
    const templateServiceBlock = ($id("services-block") as HTMLTemplateElement)
      .content;
    // дочерний темплейт
    const deviceOrdersTemplate = templateServiceBlock
      .querySelector(".services-block")
      ?.cloneNode(true) as HTMLAnchorElement;

    const title = $class("services-block__title", deviceOrdersTemplate);
    title.textContent = block.title;

    const list = $class("services-block__container", deviceOrdersTemplate);
    if (block.title === "photo-na-dokumenty" && res?.["photo-na-dokumenty"]) {
    }
    if (block.title === "photo-restavraciya" && res?.["photo-restavraciya"]) {
    }
    if (block.title === "photo-dizain" && res?.["photo-dizain"]) {
    }
    if (block.title === "retual-photo" && res?.["retual-photo"]) {
    }

    const btn = $class(
      "services-block__add-btn",
      deviceOrdersTemplate
    ) as HTMLButtonElement;
    btn.id = block.pathName;

    btn.addEventListener("click", () => setAdminModal(btn.id));

    container?.append(deviceOrdersTemplate);
  });
};
