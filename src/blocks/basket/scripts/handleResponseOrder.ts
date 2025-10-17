import { openModalInfo } from "@/blocks/modals/modal-info/scripts/modal-info";
import { changeDataInStorage } from "@/utils/lib/changeDataInStorage";
import type { Basket } from "@/utils/types/fetch-data";
import { setBasketData } from "./basket";
import {
  closeModalAfterResult,
  resetForm,
} from "@/blocks/modals/modal/scripts/modal";
import { clearCacheEditForm } from "@/blocks/modals/modal/scripts/handleImagesFromCloud";

/**
 * Обработка ответа
 * 1. открытие modalInfo
 * 2. установка данных корзины
 * 3. очистка формы и кеша
 * @param res: Basket[] | string
 */
export function handleResponseOrder(
  type: "update" | "delete" | "add",
  res: Basket | string,
  textModalInfo: string,
  formData: FormData
) {
  if (typeof res === "string") {
    openModalInfo("fatal", res);
  } else {
    const orders = changeDataInStorage(type, res, "ORDERS");
    setBasketData(orders);

    closeModalAfterResult();
    openModalInfo("success", textModalInfo);
  }

  resetForm(formData);
  clearCacheEditForm();
}
