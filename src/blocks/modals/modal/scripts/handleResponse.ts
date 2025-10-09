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
const imagesContainer = $class("upload__images", form)!;

function resetForm(formData: FormData) {
  form.reset();

  formData.forEach((value, key, parent) => {
    formData.delete(key);
  });

  deleteImageUpload(imagesContainer);
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
