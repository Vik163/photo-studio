import { openModalInfoConfirm } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import { fetchDeleteOrder } from "@/utils/services/fetchDeleteOrder";
import type { Basket } from "@/utils/types/fetch-data";

/**
 * Удаление заказа из корзины.
 * отправлется в модалку с подтверждением, аргументом передётся запрос на бек
 * Если заказ единственный , то удаляется всё (из бд, облака и cookie)
 * @param id
 */
export const deleteOrder = (orderData: Basket[], id: string) => {
  const order = orderData.find((order) => order.orderId === id);

  if (order) openModalInfoConfirm("delete", order, fetchDeleteOrder);
};
