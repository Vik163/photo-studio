import { setGallery } from "@/blocks/gallery/scripts/gallery";
import { $add, $class } from "@/utils/lib/getElement";
import { getBaketObj } from "@/utils/lib/handleYaBaket";
import { addWaterMark } from "@/utils/lib/watermark";
import type { Basket } from "@/utils/types/fetch-data";

async function setBasketAdminImages(
  order: Basket,
  basketTemplate: HTMLElement
) {
  // массив с вложенными массивами ссылок на админовские фотографии
  let arrAllSrc: string[][] = [];
  // index количества заказов с админовскими фотографиями
  let indexArrImg = 0;

  const completedImages = order.completedImages;

  if (completedImages && completedImages.length > 0) {
    const imageContainer = $class(
      "basket-item__img-list",
      basketTemplate
    ) as HTMLElement;

    $add("active", imageContainer);
    // заполняю массив пустыми массивами при наличии админовских фотографий
    arrAllSrc.push([]);

    for await (const key of completedImages) {
      const srcImg = await getBaketObj(key);

      //* Водяной знак ================
      let srcByStatus: string;
      if (
        order.status === "Завершён" ||
        order.status === "Оплачен" ||
        order.status === "Отложен"
      ) {
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

export async function setBasketAdminElements(
  order: Basket,
  basketTemplate: HTMLElement
) {
  // // массив с вложенными массивами ссылок на админовские фотографии
  // let arrAllSrc: string[][] = [];
  // // index количества заказов с админовскими фотографиями
  // let indexArrImg = 0;

  // const completedImages = order.completedImages;

  const adminBlock = $class(
    "basket-item__admin",
    basketTemplate
  ) as HTMLElement;
  const adminMailText = $class(
    "basket-item__mail-text",
    basketTemplate
  ) as HTMLElement;
  const adminTitle = $class(
    "basket-item__admin-title",
    basketTemplate
  ) as HTMLElement;

  if (order.mailAdmin) {
    $add("active", adminBlock);
    $add("active", adminMailText);
    adminMailText.textContent = order.mailAdmin;
  }

  if (order.status === "Отменён") {
    adminTitle.textContent = "Отменён по причине:";
  }
  if (order.status === "Отложен") {
    adminTitle.textContent = "Отложен по причине:";
  }

  setBasketAdminImages(order, basketTemplate);

  // if (completedImages && completedImages.length > 0) {
  //   const imageContainer = $class(
  //     "basket-item__img-list",
  //     basketTemplate
  //   ) as HTMLElement;

  //   $add("active", imageContainer);
  //   // заполняю массив пустыми массивами при наличии админовских фотографий
  //   arrAllSrc.push([]);

  //   for await (const key of completedImages) {
  //     const srcImg = await getBaketObj(key);

  //     //* Водяной знак ================
  //     let srcByStatus: string;
  //     if (
  //       order.status === "Завершён" ||
  //       order.status === "Оплачен" ||
  //       order.status === "Отложен"
  //     ) {
  //       srcByStatus = srcImg;
  //     } else {
  //       // Возвращает ссылку с водяным знаком
  //       srcByStatus = await addWaterMark(srcImg);
  //     }
  //     if (srcByStatus) {
  //       // заполняю массив  массивами с ссылками изображений на каждый заказ при наличии админовских фотографий
  //       arrAllSrc[indexArrImg].push(srcByStatus);

  //       const newImg = document.createElement("img");
  //       $add("basket-item__img", newImg);
  //       newImg.src = srcByStatus;
  //       newImg.alt = "Готовая фотография";

  //       if (order.status === "Выполнен") {
  //         $add("active", newImg);
  //       }
  //       if (order.status === "Завершён") {
  //         $add("active", newImg);
  //       }

  //       imageContainer.appendChild(newImg);

  //       // ссылка для скачивания готового фото (статус - завершён)
  //       const link = $class(
  //         "basket-item__download-link",
  //         basketTemplate
  //       ) as HTMLAnchorElement;

  //       link.href = srcImg;
  //       if (order.status === "Завершён") {
  //         $add("active", link);
  //       }
  //     }
  //   }
  // }

  // // кнопка увеличить
  // const lens = $class("basket-item__img-lens", basketTemplate);
  // lens.id = indexArrImg.toString();
  // lens.addEventListener("click", () => setGallery(arrAllSrc[+lens.id]));

  // indexArrImg++;
}
