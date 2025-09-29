import { $add, $class, $remove } from "@/utils/lib/getElement";
import type { OrdersData, TypeData } from "@/utils/types/admin-data";
import {
  setStylesDate,
  setStylesStatus,
} from "../../admin-block/scripts/setStylesDateAndStatus";
import { ADMIN_DEVICE_ID } from "@/utils/constants/storage";
import { Color } from "@/utils/constants/styles";
import { setSymbolPhone } from "@/utils/lib/phoneValidator/phoneValidator";
import { handleImages } from "./handleImages";
import { setListOptions } from "@/utils/ui/select/select";
import { ADMIN_STATUS } from "@/utils/constants/selectsData";
import type { StatusOrder } from "@/utils/types/fetch-data";

/**
 * Устанавливает контент блока редактирования в зависимости от типа
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
  const text = $class("order__text", container);
  const date = $class("order__date", container);
  const service = $class("order__service", container);
  const status = $class("order__status", container);
  const imagesAdmin = $class("order__images-admin", container);
  const images = $class("order__images-upload", container);
  const btnEditStatus = $class("order__btn-status", container);
  const btnEditStatusInfo = $class("order__btn-status", info);
  const btnAdminMail = $class("order__btn-mail", container);
  const btnAdminMailInfo = $class("order__btn-mail", info);
  const btnAdminImg = $class("order__upload-edit", container);
  const btnAdminImgInfo = $class("order__upload-edit", info);
  const deviceId = localStorage.getItem(ADMIN_DEVICE_ID);

  if (orderId) {
    const idData = `${typePage}/${deviceId}/${orderId}`;
    btnEditStatus.id = idData;
    btnEditStatusInfo.id = idData;
    btnAdminMail.id = idData;
    btnAdminMailInfo.id = idData;
    btnAdminImg.id = idData;
    btnAdminImgInfo.id = idData;
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
    text.textContent = userMail.mail!;
    date.textContent = userMail.created;

    date.style.color = Color.RED;
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
    text.textContent = userOrder.mail!;
    date.textContent = userOrder.created;

    status.textContent = userOrder.status!;
    service.textContent = userOrder.service!;

    setListOptions(container, ADMIN_STATUS);
    container.querySelectorAll(".option__value").forEach((item) => {
      setStylesStatus(item.textContent as StatusOrder, item as HTMLElement);
    });

    handleImages("client", userOrder.images!, images);
    handleImages("admin", userOrder.completedImages!, imagesAdmin);
    setStylesDate(typePage, userOrder.leftDays!, date);
    setStylesStatus(userOrder.status!, status);
  }
};
