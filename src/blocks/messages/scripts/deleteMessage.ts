import { openModalInfoConfirm } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import { closeModal } from "@/blocks/modals/modal/scripts/modal";
import { fetchDeleteMessage } from "@/utils/services/fetchDeleteMessage";
import type { Message } from "@/utils/types/fetch-data";

let message: Message;
/**
 * Удаление заказа из корзины.
 * отправлется в модалку с подтверждением, аргументом передётся запрос на бек
 * Если заказ единственный , то удаляется всё (из бд, облака и cookie)
 * @param id
 */
export const deleteMessage = (orderData: Message[], id: string) => {
  message = orderData.find((order) => order.orderId === id)!;
  // закрываю модалку если открытая
  closeModal();
  if (message) openModalInfoConfirm("mailDelete", message.mail);
};

/**
 * удаляет данные из облака ( for await  of) и потом из бд
 * @param newOrder - заказ Basket
 * @returns Promise<string | Basket[] | null>
 */
export async function deleteMessageData() {
  const data = await fetchDeleteMessage(message.orderId);

  return data;
}
