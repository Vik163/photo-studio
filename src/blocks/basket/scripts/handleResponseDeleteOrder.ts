import { openModalInfo } from "@/blocks/modals/modal-info/scripts/modal-info";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { Messages } from "@/utils/constants/messages";
import { $class, $id, $remove } from "@/utils/lib/getElement";
import { closeBasket, setBasketData } from "./basket";
import { changeDataInStorage } from "@/utils/lib/changeDataInStorage";
import type { Basket } from "@/utils/types/fetch-data";

const basket = $class("basket");

/**
 * Открывает modalInfo после запроса с нужным контентом и обновляет корзину
 * @param data id или null
 */
export function handleResponseDeleteOrder(
  type: "update" | "delete" | "add",
  data: Basket | string | null
) {
  if (!data || typeof data === "string") {
    openModalInfo("fatal", Messages.DELETE_ORDER_ERROR);
    closeOverlayAndLoader();
  } else {
    openModalInfo("success", "Заказ успешно удалён!");

    const orders = changeDataInStorage(type, data, "ORDERS");
    setBasketData(orders);

    closeBasket();

    closeOverlayAndLoader();
  }
}
