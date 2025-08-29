import { $add, $class, $id } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import noImg from "@/assets/images/no-img.png";

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
 * @param basketBlock - элемент куда вставляется
 * @param data - корзина
 */
export function setBasketElements(basketBlock: HTMLElement, data: Basket[]) {
  removeBasketElements();

  const template = ($id("basket-item") as HTMLTemplateElement).content;
  data.forEach((order) => {
    const basketTemplate = template
      .querySelector(".basket-item")
      ?.cloneNode(true) as HTMLElement;

    if (basketTemplate) {
      const image = $class(
        "basket-item__img",
        basketTemplate
      ) as HTMLImageElement;
      image.src = order.completedImages ? order.completedImages : noImg;

      const name = $class("basket-item__name", basketTemplate);
      name.textContent = order.service;

      const status = $class("basket-item__status", basketTemplate);
      status.textContent = order.status;

      const btnEdit = $class("basket-item__edit", basketTemplate);
      btnEdit.id = order.orderId;

      const btnBasket = $class("basket-item__basket", basketTemplate);
      btnBasket.id = order.orderId;

      if (order.status === "Принят") {
        $add("active", btnEdit);
        $add("active", btnBasket);
        $add("inactive", image);
        $add("lightYellow", status);
      }
      if (order.status === "В работе") {
        $add("orange", status);
        $add("inactive", image);
      }
      if (order.status === "Выполнен") {
        $add("lightBlue", status);
      }
      if (order.status === "Завершён") {
        $add("active", btnBasket);
        $add("lightGreen", status);
      }
      if (order.status === "Отложен") {
        $add("active", btnBasket);
        $add("active", btnEdit);
        $add("lightRed", status);
        $add("inactive", image);
      }
      if (order.status === "Отменён") {
        $add("active", btnBasket);
        $add("active", btnEdit);
        $add("middleRed", status);
        $add("inactive", image);
      }
      if (order.status === "Создан") {
        $add("active", btnBasket);
        $add("active", btnEdit);
        $add("lightGray", status);
        $add("inactive", image);
      }

      basketBlock?.append(basketTemplate);
    }
  });
}
