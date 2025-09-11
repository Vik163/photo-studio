import type {
  Order,
  OrdersUser,
  StatusOrder,
} from "@/utils/types/fetch-admin-data";
import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
import noImg from "@/assets/images/no-img.png";
import { ORDER_LIMIT } from "@/utils/constants/limitDays";

const ordersList = $class("admin__orders");

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
 * Создаёт из двух темплейтов лист заказов (userId и его заказы)
 * @param data
 */
export const handleOrdersData = (data: OrdersUser[]) => {
  const templateId = ($id("user-orders") as HTMLTemplateElement).content;
  const templateOrders = ($id("user-order") as HTMLTemplateElement).content;

  data.forEach(async (user, index: number) => {
    // родительский темплейт
    const userIdTemplate = templateId
      .querySelector(".user-orders")
      ?.cloneNode(true) as HTMLElement;

    if (userIdTemplate) {
      // Добавляю id для поиска этого элемента для встраивания другого темплейта
      const id = `id-${index.toString()}`;
      const container = $class("user-orders__container", userIdTemplate);
      container.id = id;

      // графа id
      const userId = $class("user-orders__id", userIdTemplate);
      userId.textContent = user.userId;
      // вставляю родительский темплейт
      ordersList.append(userIdTemplate);
      // нахожу контейнет для дочернего темплейта
      const userOrders = $id(`${id}`, ordersList);

      user.ordersUser.forEach((order) => {
        // дочерний темплейт
        const userOrdersTemplate = templateOrders
          .querySelector(".user-order")
          ?.cloneNode(true) as HTMLAnchorElement;

        const service = $class("user-order__service", userOrdersTemplate);
        service.textContent = order.service;

        const date = $class("user-order__date", userOrdersTemplate);
        date.textContent = order.created;
        handleDateElement(order.leftDays, date);

        const status = $class("user-order__status", userOrdersTemplate);
        status.textContent = order.status;
        handleStatusElement(order.status, status);

        const btn = $class(
          "user-order__btn",
          userOrdersTemplate
        ) as HTMLButtonElement;
        btn.id = `${user.userId}/${order.orderId}`;

        userOrders?.append(userOrdersTemplate);
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
  const elements = document.querySelectorAll(".user-orders");
  if (elements.length > 0)
    elements.forEach((el) => {
      el.remove();
    });
}
