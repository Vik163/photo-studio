import { $add, $class, $id } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { setBasketAdminElements } from "./setBasketAdminElements";

/**
 * Создает корзину из template
 * Добавляет классы в зависимости от статуса заказа
 * @param basketBlock - элемент куда вставляется
 * @param data - корзина
 */
export function removeBasketElements() {
  const elements = document.querySelectorAll(".basket-item");
  if (elements.length > 0)
    elements.forEach((el) => {
      el.remove();
    });
}
/**
 * Создает корзину из template
 * Добавляет классы в зависимости от статуса заказа
 * Добавляет ссылку для скачивания (order.completedImages - src готового фото)
 * @param basketBlock - элемент куда вставляется
 * @param data - корзина
 */
export async function setBasketElements(
  basketBlock: HTMLElement,
  data: Basket[]
) {
  // удаление существующих элементов при открытии
  removeBasketElements();

  const template = ($id("basket-item") as HTMLTemplateElement).content;

  for await (const order of data) {
    const basketTemplate = template
      .querySelector(".basket-item")
      ?.cloneNode(true) as HTMLElement;

    if (basketTemplate) {
      await setBasketAdminElements(order, basketTemplate);

      const name = $class("basket-item__name", basketTemplate);
      name.textContent = order.service;

      const date = $class("basket-item__date", basketTemplate);
      date.textContent = order.created;

      const status = $class("basket-item__status", basketTemplate);
      status.textContent = order.status;

      // setStylesStatus(order.status, status)

      const btnEdit = $class("basket-item__edit", basketTemplate);
      btnEdit.id = order.orderId;

      const btnBasket = $class("basket-item__basket", basketTemplate);
      btnBasket.id = order.orderId;

      // ссылка для оплаты (статус - завершён)
      const pay = $class("basket-item__pay", basketTemplate) as HTMLElement;

      if (order.status === "Принят") {
        $add("active", btnEdit);
        $add("active", btnBasket);
        $add("violet", status);
      }
      if (order.status === "Выполнен") {
        $add("greenCyan", status);
        $add("active", pay);
        pay.addEventListener("click", function () {
          console.log("setBasketElements - pay");
        });
      }
      if (order.status === "Завершён") {
        $add("active", btnBasket);
        $add("green", status);
      }
      if (order.status === "Отложен") {
        $add("active", btnBasket);
        $add("active", btnEdit);
        $add("orange", status);
      }
      if (order.status === "Отменён") {
        $add("active", btnBasket);
        $add("active", btnEdit);
        $add("red", status);
      }
      if (order.status === "Создан") {
        $add("active", btnBasket);
        $add("active", btnEdit);
      }

      basketBlock?.append(basketTemplate);
    }
  }
}
