import { openModalInfoConfirm } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import { closeModal } from "@/blocks/modals/modal/scripts/modal";
import { fetchDeleteOrder } from "@/utils/services/fetchDeleteOrder";
import type { Basket } from "@/utils/types/fetch-data";

/**
 * Удаление заказа из корзины.
 * отправлется в модалку с подтверждением, аргументом передётся запрос на бек
 * Если заказ единственный , то удаляется всё (из бд, облака и cookie)
 * @param id
 */
export const deleteMessage = () => {
  //   const order = orderData.find((order) => order.orderId === id);
  //   // закрываю модалку если открытая
  //   closeModal();
  //   if (order) openModalInfoConfirm("delete", order, fetchDeleteOrder);
};
