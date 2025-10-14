import { urlServices } from "@/utils/constants/admin/urls";
import { servicesData } from "@/utils/constants/services-data";
import { getDataCacheByName } from "@/utils/lib/dataCache";
import { deleteNodes } from "@/utils/lib/deleteNodes";
import { $class, $id, $toggle } from "@/utils/lib/getElement";
import { AdminServices } from "@/utils/types/admin-data-services";
import { setContentSelect } from "@/utils/ui/select/select";

const modal = $class("modal");
const container = $class("select__list", modal);

export const handleSelect = async () => {
  const resServices: AdminServices[] = await getDataCacheByName(urlServices);
  deleteNodes(".options-container", container);

  servicesData.forEach((block) => {
    const templateServiceBlock = (
      $id("options-container") as HTMLTemplateElement
    ).content;
    // дочерний темплейт
    const containerTemplate = templateServiceBlock
      .querySelector(".options-container")
      ?.cloneNode(true) as HTMLElement;

    const title = $class("options-container__title", containerTemplate);
    title.textContent = block.title;

    const list = $class("options-container__list", containerTemplate);
    list.id = block.pathName;

    function openOptions() {
      $toggle("active", title);
      $toggle("active", list);
    }

    title.addEventListener("click", openOptions);

    const servicesList = resServices?.find(
      (item) => item.type === block.pathName
    )!;

    if (servicesList) {
      if (servicesList.services.length > 0)
        container?.append(containerTemplate);

      const data = {
        content: servicesList.services,
      };

      setContentSelect(modal, list, data, "Вид услуг", openOptions);
    }
  });
};
