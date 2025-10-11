import { openModalInfoConfirm } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import { closeModal } from "@/blocks/modals/modal/scripts/modal";
import { delBaketObj } from "@/utils/lib/handleYaBaket";
import { fetchDeleteOrder } from "@/utils/services/orders/fetchDeleteOrder";
import type { Basket } from "@/utils/types/fetch-data";

let order: Basket;
let orderId: string;

/**
 * Удаление заказа из корзины.
 * отправлется в модалку с подтверждением, аргументом передётся запрос на бек
 * Если заказ единственный , то удаляется всё (из бд, облака и cookie)
 * @param id
 */
export const deleteOrder = (orderData: Basket[], id: string) => {
  orderId = id;
  order = orderData.find((order) => order.orderId === id)!;

  // закрываю модалку если открытая
  closeModal();

  if (order) openModalInfoConfirm("orderDelete", order.service!);
};

/**
 * удаляет данные из облака ( for await  of) и потом из бд
 * @returns orderId или null
 */
export async function deleteOrderData() {
  let arr = [];
  for await (const img of order.images!) {
    const statusCode = await delBaketObj(img);
    arr.push(statusCode);
  }

  if (arr.length === order.images?.length) {
    const data = await fetchDeleteOrder(orderId);

    return data;
  }
  return null;
}
