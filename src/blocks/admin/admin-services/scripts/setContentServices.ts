import { $add, $class, $id } from "@/utils/lib/getElement";
import type {
  AdminOneService,
  AdminServices,
} from "@/utils/types/admin-data-services";

const container = $class("admin__list-services");

export const setContentOneService = (
  data: AdminOneService,
  servicesContainer: HTMLElement
) => {
  const templateService = ($id("services-item") as HTMLTemplateElement).content;
  // дочерний темплейт
  const serviceTemplate = templateService
    .querySelector(".services-item")
    ?.cloneNode(true) as HTMLElement;

  const service = $class("services-item__name", serviceTemplate);
  service.textContent = data.value;

  const price = $id("price", serviceTemplate) as HTMLInputElement;
  price.placeholder = data.price!;

  const btnEdit = $class(
    "service-item__btn-edit",
    serviceTemplate
  ) as HTMLButtonElement;

  const btnDel = $class(
    "service-item__btn-basket",
    serviceTemplate
  ) as HTMLButtonElement;

  btnDel.id = data.id;
  btnEdit.id = data.id;
  serviceTemplate.id = data.id;

  servicesContainer?.append(serviceTemplate);
};

export const setContentListServices = (data: AdminServices) => {
  const servicesContainer = $id(data.type, container);
  if (data.services.length > 0) {
    $add("active", servicesContainer);
    data.services.forEach((serviceData) => {
      setContentOneService(serviceData, servicesContainer);
    });
  }
};
