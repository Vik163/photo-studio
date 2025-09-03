import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
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
  data.forEach(async (order) => {
    const basketTemplate = template
      .querySelector(".basket-item")
      ?.cloneNode(true) as HTMLElement;

    if (basketTemplate) {
      // маленькое фото или no-img
      const image = $class(
        "basket-item__img",
        basketTemplate
      ) as HTMLImageElement;
      // модалка с готовым фото (статус: выполнен и завершён)
      const imageModal = $class(
        "basket-item__img-modal",
        basketTemplate
      ) as HTMLImageElement;
      imageModal.src = order.completedImages!;
      image.src = order.completedImages ? order.completedImages : noImg;

      // ссылка для скачивания готового фото (статус - завершён)
      const link = $class(
        "basket-item__download-link",
        basketTemplate
      ) as HTMLAnchorElement;
      link.href = order.completedImages!;

      const name = $class("basket-item__name", basketTemplate);
      name.textContent = order.service;

      const date = $class("basket-item__date", basketTemplate);
      date.textContent = order.createdAt;

      const status = $class("basket-item__status", basketTemplate);
      status.textContent = order.status;

      const btnEdit = $class("basket-item__edit", basketTemplate);
      btnEdit.id = order.orderId;

      const btnBasket = $class("basket-item__basket", basketTemplate);
      btnBasket.id = order.orderId;

      if (order.status === "Принят") {
        $add("active", btnEdit);
        $add("active", btnBasket);
        $add("violet", status);
      }
      if (order.status === "В работе") {
        $add("blue", status);
      }
      if (order.status === "Выполнен") {
        $add("greenCyan", status);
        $add("active", image);
      }
      if (order.status === "Завершён") {
        $add("active", btnBasket);
        $add("green", status);
        $add("active", link);
        $add("active", image);
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
  });
}
