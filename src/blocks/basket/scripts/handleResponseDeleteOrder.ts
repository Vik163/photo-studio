import { openModalInfo } from "@/blocks/modals/modal-info/scripts/modal-info";
import type { Basket } from "@/utils/types/fetch-data";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { setBasketData } from "./basket";

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
