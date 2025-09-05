import { $add, $class, $remove } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { closeModalInfo, openModalInfo } from "./modal-info";
import { closeBasket, setBasketData } from "@/blocks/basket/scripts/basket";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { deleteData } from "./deleteDataConfirm";
import { setOrderDataInModalForm } from "@/blocks/basket/scripts/editOrder";

const modal = $class("modal-info");
const container = $class("modal-info__container", modal);
const title = $class("modal-info__title", modal);
const text = $class("modal-info__text", modal);
const image = $class("modal-info__img", modal) as HTMLImageElement;
const closeBtn = $class("modal-info__close", modal);
const btn = $class("modal-info__btn-submit", modal);

let callbackConfirm: (id: string) => Promise<Basket[] | string>;
let newOrder: Basket;
let typeModal: "delete" | "edit";

/**
 * Открывает modalInfo после запроса с нужным контентом и обновляет корзину
 * @param data string | Basket[]
 */
function handleResponseDeleteData(data: string | Basket[]) {
  if (typeof data === "string") {
    openModalInfo("reject", data);
    closeOverlayAndLoader();
  } else {
    openModalInfo("success", "Заказ успешно удалён!");
    setBasketData(data);
    closeOverlayAndLoader();
  }
}

/**
 * Действия после подтверждения:
 * - если удаление, то: открывается лоадер, удаляются данные и после открывается infoModal
 * - если редактирование, то: открывается форма
 */
async function confirmActionModal() {
  if (typeModal === "delete") {
    openOverlayAndLoader("loader");

    const data = await deleteData(newOrder, callbackConfirm);
    if (data) handleResponseDeleteData(data);
  } else {
    closeModalInfo();
    closeBasket();
    setOrderDataInModalForm();
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
export const openModalInfoConfirm = (
  type: "delete" | "edit",
  order: Basket,
  callback?: (id: string) => Promise<Basket[] | string>
) => {
  $add("active", modal);
  $add("active", btn);
  $add("active", text);
  title.textContent = "Подвердить действие";
  typeModal = type;
  if (callback) callbackConfirm = callback;
  newOrder = order;
  $remove("active", image);

  if (type === "delete") {
    btn.textContent = "Удалить";
    text.textContent = `Вы действительно хотите удалить "${order.service}"`;
  }
  if (type === "edit") {
    btn.textContent = "Редактировать";
    text.textContent = `Вы действительно хотите изменить "${order.service}"`;
  }
};

export function setListenersModalInfo() {
  modal.addEventListener("click", closeModalInfoByEvent);
}
