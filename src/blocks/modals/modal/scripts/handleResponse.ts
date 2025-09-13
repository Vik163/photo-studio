import { $class } from "@/utils/lib/getElement";
import type { Basket, Message } from "@/utils/types/fetch-data";
import { disableCheckbox } from "./handleCheckbox";
import { openModalInfo } from "../../modal-info/scripts/modal-info";
import { setBasketData } from "@/blocks/basket/scripts/basket";
import { closeModalAfterResult } from "./modal";
import { clearCacheEditForm } from "./handleImagesFromCloud";
import { deleteImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import { setMessagesData } from "@/blocks/messages/scripts/setMessages";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";

const form = $class("modal__form") as HTMLFormElement;

function resetForm(formData: FormData) {
  form.reset();

  formData.forEach((value, key, parent) => {
    formData.delete(key);
  });

  deleteImageUpload();
  disableCheckbox();
}

/**
 * Обработка ответа
 * 1. открытие modalInfo
 * 2. установка данных корзины
 * 3. очистка формы и кеша
 * @param res: Basket[] | string
 */
export function handleResponseOrder(
  res: Basket[] | string,
  textModalInfo: string,
  formData: FormData
) {
  if (typeof res === "string") {
    openModalInfo("fatal", res);
  } else {
    setBasketData(res);

    closeModalAfterResult();
    openModalInfo("success", textModalInfo);
  }

  resetForm(formData);
  clearCacheEditForm();
}

export function handleResponseMessages(
  res: Message[] | string,
  textModalInfo: string,
  formData: FormData
) {
  if (typeof res === "string") {
    openModalInfo("fatal", res);
  } else {
    setMessagesData(res);

    closeModalAfterResult();
    openModalInfo("success", textModalInfo);
  }

  resetForm(formData);
  clearCacheEditForm();
}

/**
 * Открывает modalInfo после запроса с нужным контентом и обновляет корзину
 * @param data string | Basket[]
 */
export function handleResponseDeleteOrder(data: string | Basket[]) {
  if (typeof data === "string") {
    openModalInfo("fatal", data);
    closeOverlayAndLoader();
  } else {
    openModalInfo("success", "Заказ успешно удалён!");
    setBasketData(data);
    closeOverlayAndLoader();
  }
}

/**
 * Открывает modalInfo после запроса с нужным контентом и обновляет корзину
 * @param data string | Basket[]
 */
export function handleResponseDeleteMessage(data: string | Message[]) {
  if (typeof data === "string") {
    openModalInfo("fatal", data);
    closeOverlayAndLoader();
  } else {
    openModalInfo("success", "Сообщение успешно удалено!");
    setMessagesData(data);
    closeOverlayAndLoader();
  }
}
