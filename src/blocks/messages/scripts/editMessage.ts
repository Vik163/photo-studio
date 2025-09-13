import { openModalInfoConfirm } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import {
  closeModal,
  setModalFormByType,
} from "@/blocks/modals/modal/scripts/modal";
import { setValuesMailModalForm } from "@/blocks/modals/modal/scripts/setValuesModal";
import type { Message } from "@/utils/types/fetch-data";

let message: Message;

/**
 *  Редактирование заказа в корзине. Находит заказ и открывает модалку подтверждения
 * @param messages: Message[]
 * @param id
 */
export function editMessage(messages: Message[], id: string) {
  message = messages.find((order) => order.orderId === id)!;
  openModalInfoConfirm("mailEdit", message.mail);
  // закрываю модалку если открытая
  closeModal();
}

export function setMailDataInModalForm() {
  setModalFormByType("mailEdit");
  setValuesMailModalForm(message);
}
