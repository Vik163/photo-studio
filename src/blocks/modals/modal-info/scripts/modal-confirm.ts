import { $add, $class, $remove } from "@/utils/lib/getElement";
import { closeModalInfo } from "./modal-info";
import { closeBasket } from "@/blocks/basket/scripts/basket";
import { openOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { setOrderDataInModalForm } from "@/blocks/basket/scripts/editOrder";
import { deleteOrderData } from "@/blocks/basket/scripts/deleteOrder";
import type { TypeActionsModal } from "@/utils/types/modal";
import { deleteMessageData } from "@/blocks/messages/scripts/deleteMessage";
import { closeMessagesList } from "@/blocks/messages/scripts/setMessages";
import { setMailDataInModalForm } from "@/blocks/messages/scripts/editMessage";
import {
  handleResponseDeleteMessage,
  handleResponseDeleteOrder,
} from "../../modal/scripts/handleResponse";

const modal = $class("modal-info");
const container = $class("modal-info__container", modal);
const title = $class("modal-info__title", modal);
const text = $class("modal-info__text", modal);
const image = $class("modal-info__img", modal) as HTMLImageElement;
const closeBtn = $class("modal-info__close", modal);
const btn = $class("modal-info__btn-submit", modal);

let typeModal: TypeActionsModal;

/**
 * Действия после подтверждения:
 * - если удаление, то: открывается лоадер, удаляются данные и после открывается infoModal
 * - если редактирование, то: открывается форма
 */
async function confirmActionModal() {
  if (typeModal === "orderDelete") {
    openOverlayAndLoader("loader");

    const data = await deleteOrderData();
    if (data) handleResponseDeleteOrder(data);
  } else if (typeModal === "orderEdit") {
    closeModalInfo();
    closeBasket();
    setOrderDataInModalForm();
  } else if (typeModal === "mailDelete") {
    openOverlayAndLoader("loader");

    const data = await deleteMessageData();
    if (data) handleResponseDeleteMessage(data);
  } else {
    closeModalInfo();
    closeMessagesList();
    setMailDataInModalForm();
  }
}

/**
 *  Обработка собития клика по модалке. Закрывает или вызывает дальнейшие действия
 */
const closeModalInfoByEvent = async (e: Event) => {
  const el = e.target as HTMLElement;

  if ((el === modal && el !== container) || el === closeBtn) closeModalInfo();
  if (el === btn) confirmActionModal();
};

/**
 *
 * @param type "delete" | "edit"
 * @param order Basket
 * @param callback (id: string) => Promise<Basket[] | string>
 */
export const openModalInfoConfirm = (type: TypeActionsModal, name: string) => {
  $add("active", modal);
  $add("active", btn);
  $add("active", text);
  title.textContent = "Подвердить действие";
  typeModal = type;
  $remove("active", image);

  if (type === "orderDelete" || type === "mailDelete") {
    btn.textContent = "Удалить";
    text.textContent = `Вы действительно хотите удалить "${name}"`;
  }
  if (type === "orderEdit" || type === "mailEdit") {
    btn.textContent = "Редактировать";
    text.textContent = `Вы действительно хотите изменить "${name}"`;
  }
};

export function setListenersModalInfo() {
  modal.addEventListener("click", closeModalInfoByEvent);
}
