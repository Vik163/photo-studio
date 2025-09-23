import { $class } from "@/utils/lib/getElement";
import type { OrdersData, TypeData } from "@/utils/types/admin-data";
import { setContentOrders } from "../../admin-block/scripts/setContentOrders";
import { removeListElements } from "../../admin-block/scripts/removeListElements";

/**
 * Устанавливает дополнительный список заказов полученных по номеру телефона заказа в блоке редактирования
 * @param typePage "mail" | "order"
 * @param data {mail?: OneOrder; mails?: OneOrder[]; order?: OneOrder; orders?: OneOrder[];}
 * @param container HTMLElement куда встраивается список
 */
export function setContentListOrders(
  typePage: TypeData,
  data: OrdersData,
  container: HTMLElement
) {
  removeListElements(container);
  const { mails, orders } = data;

  const list = $class("order__list", container);
  const titleAdd = $class("order__title", container);

  if (typePage === "order") {
    if (mails && mails.length > 0) {
      titleAdd.textContent =
        "Письма этого клиента (найденные по номеру его телефона)";

      setContentOrders("mail", mails, list);
    } else titleAdd.textContent = "Писем у этого клиента нет";
  } else {
    if (orders && orders.length > 0) {
      titleAdd.textContent =
        "Заказы этого клиента (найденные по номеру его телефона)";

      setContentOrders("order", orders, list);
    } else titleAdd.textContent = "Заказов у этого клиента нет";
  }
}
