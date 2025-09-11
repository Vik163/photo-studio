import { openModalInfoConfirm } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import {
  closeModal,
  setModalFormByType,
} from "@/blocks/modals/modal/scripts/modal";
import { setValuesModalForm } from "@/blocks/modals/modal/scripts/setValuesModal";
import type { Basket } from "@/utils/types/fetch-data";

let order: Basket;

/**
 *  Редактирование заказа в корзине. Находит заказ и открывает модалку подтверждения
 * @param orderData: Basket[]
 * @param id
 */
export function editMessage() {
  //   order = orderData.find((order) => order.orderId === id)!;
  //   openModalInfoConfirm("edit", order);
  //   // закрываю модалку если открытая
  //   closeModal();
}

export function setOrderDataInModalForm() {
  //   setModalFormByType("edit");
  //   setValuesModalForm(order);
}
