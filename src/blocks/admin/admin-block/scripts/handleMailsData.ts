import type { AdminMessages } from "@/utils/types/fetch-admin-data";
import { $add, $class, $id } from "@/utils/lib/getElement";

const ordersList = $class("admin__list-messages");

/**
 * Создаёт из двух темплейтов лист заказов (deviceId и его заказы)
 * @param data
 */
export const handleMailsData = (data: AdminMessages[]) => {
  console.log("data:", data);
  const templateId = ($id("device-orders") as HTMLTemplateElement).content;
  const templateOrders = ($id("device-order") as HTMLTemplateElement).content;

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
      ordersList.append(deviceIdTemplate);
      // нахожу контейнет для дочернего темплейта
      const deviceOrders = $id(`${id}`, ordersList);

      device.messages.forEach((message) => {
        // дочерний темплейт
        const deviceOrdersTemplate = templateOrders
          .querySelector(".device-order")
          ?.cloneNode(true) as HTMLAnchorElement;

        const service = $class("device-order__service", deviceOrdersTemplate);
        service.textContent = message.mail!;

        const date = $class("device-order__date", deviceOrdersTemplate);
        date.textContent = message.created;
        $add("red", date);

        const btn = $class(
          "device-order__btn",
          deviceOrdersTemplate
        ) as HTMLButtonElement;
        btn.id = `mail/${device.deviceId}/${message.orderId}`;

        deviceOrders?.append(deviceOrdersTemplate);
      });
    }
  });
};
