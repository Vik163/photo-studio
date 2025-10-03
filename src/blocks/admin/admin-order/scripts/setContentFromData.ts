import { $add, $class, $remove } from "@/utils/lib/getElement";
import type { OrdersData, TypeData } from "@/utils/types/admin-data";
import {
  setStylesDate,
  setStylesStatus,
} from "../../../../utils/lib/setStylesDateAndStatus";
import {
  ADMIN_DEVICE_ID,
  ADMIN_ORDER_MAIL,
  ADMIN_ORDER_STATUS,
} from "@/utils/constants/storage";
import { ColorAdmin } from "@/utils/constants/styles";
import { setSymbolPhone } from "@/utils/lib/phoneValidator/phoneValidator";
import { handleImages } from "./handleImages";

/**
 * Устанавливает контент блока редактирования в зависимости от типа
 * Устанавливает в localStorage: статус и ответ админа клиенту
 * @param typePage "mail" | "order"
 * @param data {mail?: OneOrder; mails?: OneOrder[]; order?: OneOrder; orders?: OneOrder[];}
 * @param container HTMLElement куда устанавливается
 * @param orderId необязательный. Если есть, то устанавливается на кнопку редактирования id - `${typePage}/${deviceId}/${orderId}`
 */
export const setContentFromData = (
  typePage: TypeData,
  data: OrdersData,
  container: HTMLElement,
  orderId?: string
) => {
  const { mail, mails, order, orders } = data;
  const info = $class("order-info");
  const title = $class("order__title", container);
  const titleInfo = $class("order__title", info);
  const name = $class("order__name", container);
  const phone = $class("order__phone", container);
  const message = $class("order__text", container);
  const messageAdmin = $class("order__text-admin", container);
  const date = $class("order__date", container);
  const service = $class("order__service", container);
  const status = $class("order__status", container);
  const imagesAdmin = $class("order__images-admin", container);
  const images = $class("order__images-upload", container);
  const btnEdit = $class("order__btn-edit", container);
  const btnEditInfo = $class("order__btn-edit", info);
  const deviceId = localStorage.getItem(ADMIN_DEVICE_ID);

  if (orderId) {
    const idData = `${typePage}/${deviceId}/${orderId}`;
    btnEdit.id = idData;
    btnEditInfo.id = idData;
    imagesAdmin.id = idData;
  }

  if (typePage === "mail") {
    container.querySelectorAll(".order__item-order").forEach((item) => {
      $add("inactive", item as HTMLElement);
    });
    title.textContent = "Ответить клиенту";
    titleInfo.textContent = "Сообщение";

    const userMail = orderId
      ? mails?.find((order) => order.orderId === orderId)!
      : mail!;

    name.textContent = userMail.userName;
    if (phone) phone.textContent = setSymbolPhone(userMail.phone);
    message.textContent = userMail.mail!;

    if (userMail.mailAdmin) {
      $add("active", messageAdmin);
      messageAdmin.textContent = userMail.mailAdmin;
    } else $remove("active", messageAdmin);

    date.textContent = userMail.created;

    date.style.color = ColorAdmin.RED;
  } else {
    container.querySelectorAll(".order__item-order").forEach((item) => {
      $remove("inactive", item as HTMLElement);
    });

    title.textContent = "Редактировать заказ";
    titleInfo.textContent = "Заказ";

    const userOrder = orderId
      ? orders?.find((order) => order.orderId === orderId)!
      : order!;

    name.textContent = userOrder.userName;
    if (phone) phone.textContent = setSymbolPhone(userOrder.phone);
    message.textContent = userOrder.mail!;
    date.textContent = userOrder.created;

    if (userOrder.mailAdmin) {
      $add("active", messageAdmin);
      localStorage.setItem(ADMIN_ORDER_MAIL, userOrder.mailAdmin);
      messageAdmin.textContent = userOrder.mailAdmin;
    } else $remove("active", messageAdmin);

    status.textContent = userOrder.status!;
    if (userOrder.status)
      localStorage.setItem(ADMIN_ORDER_STATUS, userOrder.status);

    service.textContent = userOrder.service!;

    handleImages("client", userOrder.images!, images);
    handleImages("admin", userOrder.completedImages!, imagesAdmin);
    setStylesDate(typePage, userOrder.leftDays!, date);
    setStylesStatus(userOrder.status!, status);
  }
};
