import { $class } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { disableCheckbox } from "./handleCheckbox";
import { openModalInfo } from "../../modal-info/scripts/modal-info";
import { setBasketData } from "@/blocks/basket/scripts/basket";
import { closeModalAfterResult } from "./modal";
import { clearCacheEditForm } from "./handleImagesFromCloud";
import { deleteImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";

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
export function handleResponse(
  res: Basket[] | string,
  textModalInfo: string,
  formData: FormData
) {
  if (typeof res === "string") {
    openModalInfo("reject", res);
  } else {
    setBasketData(res);

    closeModalAfterResult();
    openModalInfo("success", textModalInfo);
  }

  resetForm(formData);
  clearCacheEditForm();
}
