import type { AdminOrders } from "@/utils/types/fetch-admin-data";
import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
import noImg from "@/assets/images/no-img.png";
import { ORDER_LIMIT } from "@/utils/constants/limitDays";
import { StatusOrder } from "@/utils/types/fetch-data";
import { setSymbolPhone } from "@/utils/lib/phoneValidator/phoneValidator";

const ordersList = $class("admin__list-orders");

function handleDateElement(leftDays: number, el: HTMLElement) {
  if (leftDays <= ORDER_LIMIT / 3) {
    $add("red", el);
  }
  if (leftDays <= (ORDER_LIMIT / 3) * 2) {
    $add("yellow", el);
  }
  if (leftDays > (ORDER_LIMIT / 3) * 2) {
    $add("green", el);
  }
}

function handleStatusElement(status: StatusOrder, el: HTMLElement) {
  if (status === "Принят") {
    $add("yellow", el);
  }
  if (status === "В работе") {
    $add("blue", el);
  }
  if (status === "Выполнен") {
    $add("greenCyan", el);
  }
  if (status === "Завершён") {
    $add("green", el);
  }
  if (status === "Отложен") {
    $add("orange", el);
  }
  if (status === "Отменён") {
    $add("red", el);
  }
}

/**
 * Создаёт из двух темплейтов лист заказов (deviceId и его заказы)
 * @param data
 */
export const handleOrdersData = (data: AdminOrders[]) => {
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

      device.ordersUser.forEach((order) => {
        // дочерний темплейт
        const deviceOrdersTemplate = templateOrders
          .querySelector(".device-order")
          ?.cloneNode(true) as HTMLAnchorElement;

        const service = $class("device-order__service", deviceOrdersTemplate);
        service.textContent = order.service!;

        const date = $class("device-order__date", deviceOrdersTemplate);
        date.textContent = order.created;
        handleDateElement(order.leftDays!, date);

        const status = $class("device-order__status", deviceOrdersTemplate);
        status.textContent = order.status!;
        handleStatusElement(order.status!, status);

        const btn = $class(
          "device-order__btn",
          deviceOrdersTemplate
        ) as HTMLButtonElement;
        btn.id = `order/${device.deviceId}/${order.orderId}`;

        deviceOrders?.append(deviceOrdersTemplate);
      });
    }
  });
};

/**
 * Создает корзину из template
 * Добавляет классы в зависимости от статуса заказа
 * @param basketBlock - элемент куда вставляется
 * @param data - корзина
 */
export function removeBasketElements() {
  const elements = document.querySelectorAll(".device-orders");
  if (elements.length > 0)
    elements.forEach((el) => {
      el.remove();
    });
}
