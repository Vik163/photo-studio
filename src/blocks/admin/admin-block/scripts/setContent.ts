import { $class, $id } from "@/utils/lib/getElement";
import type { AdminData, TypeData } from "@/utils/types/admin-data";
import { setContentOrders } from "./setContentOrders";
import { removeListElements } from "./removeListElements";

export const setContent = async (type: TypeData, data: AdminData[]) => {
  const listEl =
    type === "mail"
      ? $class("admin__list-messages")
      : $class("admin__list-orders");

  removeListElements(".device-orders", listEl);

  const templateId = ($id("device-orders") as HTMLTemplateElement).content;

  data.forEach(async (device, index: number) => {
    // родительский темплейт
    const deviceIdTemplate = templateId
      .querySelector(".device-orders")
      ?.cloneNode(true) as HTMLElement;

    if (deviceIdTemplate) {
      // Добавляю id для поиска этого элемента для встраивания другого темплейта
      const id = `id-${index.toString()}`;
      const container = $class("device-orders__container", deviceIdTemplate);
      container.id = id;

      // графа id
      const deviceId = $class("device-orders__id", deviceIdTemplate);
      deviceId.textContent = device.deviceId;
      // вставляю родительский темплейт
      listEl.append(deviceIdTemplate);
      // нахожу контейнет для дочернего темплейта
      const deviceOrders = $id(`${id}`, listEl);

      setContentOrders(type, device.data, deviceOrders, device.deviceId);
    }
  });
};
