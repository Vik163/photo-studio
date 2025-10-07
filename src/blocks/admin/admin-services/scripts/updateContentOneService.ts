import { $add, $class, $id } from "@/utils/lib/getElement";
import type { AdminResServiceData } from "@/utils/types/admin-data-services";
import { setContentOneService } from "./setContentServices";

const container = $class("admin__list-services");

export const updateContentOneService = (data: AdminResServiceData) => {
  const servicesContainer = $id(data.type, container);
  const arrServices = servicesContainer.querySelectorAll(".services-item");
  if (arrServices.length > 0) {
    let isExist = false;
    arrServices.forEach((item) => {
      const btnEdit = $class("service-item__btn-edit", item as HTMLElement);

      if (btnEdit.id === data.id) {
        const price = $id("price", item as HTMLElement) as HTMLInputElement;
        price.placeholder = data.price!;
        isExist = true;
      }
    });

    if (!isExist) setContentOneService(data, servicesContainer);
  } else {
    $add("active", servicesContainer);
    setContentOneService(data, servicesContainer);
  }
};
