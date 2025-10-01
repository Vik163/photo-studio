import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { getBaketObj } from "@/utils/lib/handleYaBaket";
import { setGallery } from "@/blocks/gallery/scripts/gallery";

let arrSrc: string[] = [];
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
      const imageContainer = $class(
        "basket-item__img-list",
        basketTemplate
      ) as HTMLElement;
      const adminBlock = $class(
        "basket-item__admin",
        basketTemplate
      ) as HTMLImageElement;

      if (order.mailAdmin) $add("active", adminBlock);

      const completedImages = order.completedImages;
      if (completedImages && completedImages.length > 0) {
        $add("active", adminBlock);

        for await (const link of completedImages) {
          const srcImg = await getBaketObj(link);
          arrSrc.push(srcImg);
        }

        if (arrSrc.length > 0) {
          arrSrc.forEach((img) => {
            const newImg = document.createElement("img");
            $add("basket-item__img", newImg);
            newImg.src = img;
            newImg.alt = "Готовая фотография";

            if (order.status === "Выполнен") {
              $add("active", newImg);
            }
            if (order.status === "Завершён") {
              $add("active", newImg);
            }

            imageContainer.appendChild(newImg);

            // ссылка для скачивания готового фото (статус - завершён)
            const link = $class(
              "basket-item__download-link",
              basketTemplate
            ) as HTMLAnchorElement;
            link.href = img;
            if (order.status === "Завершён") {
              $add("active", link);
            }
          });

          const lens = $class("basket-item__img-lens", basketTemplate);
          lens.addEventListener("click", () => setGallery(arrSrc));
        }
      }

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
  });
}
