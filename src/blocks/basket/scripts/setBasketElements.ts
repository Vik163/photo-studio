import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { getBaketObj } from "@/utils/lib/handleYaBaket";
import { setGallery } from "@/blocks/gallery/scripts/gallery";
import { addWaterMark } from "@/utils/lib/watermark";

// массив с вложенными массивами ссылок на админовские фотографии
let arrAllSrc: string[][] = [];
// index количества заказов с админовскими фотографиями
let indexArrImg = 0;

async function setAdminBlock(order: Basket, basketTemplate: HTMLElement) {
  const imageContainer = $class(
    "basket-item__img-list",
    basketTemplate
  ) as HTMLElement;
  const adminBlock = $class(
    "basket-item__admin",
    basketTemplate
  ) as HTMLElement;
  const adminMail = $class(
    "basket-item__mail-container",
    basketTemplate
  ) as HTMLElement;
  const adminMailText = $class(
    "basket-item__mail-text",
    basketTemplate
  ) as HTMLElement;

  if (order.mailAdmin) {
    $add("active", adminBlock);
    $add("active", adminMail);
    adminMailText.textContent = order.mailAdmin;
  }

  const completedImages = order.completedImages;
  if (completedImages && completedImages.length > 0) {
    // заполняю массив пустыми массивами при наличии админовских фотографий
    arrAllSrc.push([]);

    for await (const key of completedImages) {
      const srcImg = await getBaketObj(key);

      //* Водяной знак ================
      let srcByStatus: string;
      if (order.status === "Завершён" || order.status === "Оплачен") {
        srcByStatus = srcImg;
      } else {
        // Возвращает ссылку с водяным знаком
        srcByStatus = await addWaterMark(srcImg);
      }
      if (srcByStatus) {
        // заполняю массив  массивами с ссылками изображений на каждый заказ при наличии админовских фотографий
        arrAllSrc[indexArrImg].push(srcByStatus);

        const newImg = document.createElement("img");
        $add("basket-item__img", newImg);
        newImg.src = srcByStatus;
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

        link.href = srcImg;
        if (order.status === "Завершён") {
          $add("active", link);
        }
      }
    }
  }

  // кнопка увеличить
  const lens = $class("basket-item__img-lens", basketTemplate);
  lens.id = indexArrImg.toString();
  lens.addEventListener("click", () => setGallery(arrAllSrc[+lens.id]));

  indexArrImg++;
}

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
      await setAdminBlock(order, basketTemplate);

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
      if (order.status === "В работе") {
        $add("blue", status);
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
