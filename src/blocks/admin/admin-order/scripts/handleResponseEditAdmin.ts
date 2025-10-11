import { $class } from "@/utils/lib/getElement";
import { handleImages } from "./handleImages";
import {
  ADMIN_ORDER_STATUS,
  ADMIN_ORDERS_BLOCK,
} from "@/utils/constants/storage";
import { OneOrder } from "@/utils/types/admin-data-orders";
import { closeModal } from "../../admin-modal/scripts/setAdminModal";
import { handleErrors } from "@/utils/lib/handleErrors";

const orderPage = $class("order");
const containerMain = $class("order-main", orderPage);
const containerInfo = $class("order-info", orderPage);
const modal = $class("admin-modal");

function setResData(order: OneOrder, container: HTMLElement) {
  const status = $class("order__status", container);
  const mail = $class("order__text-admin", container);
  const imagesAdmin = $class("order__images-admin", container);

  mail.textContent = order.mailAdmin!;
  status.textContent = order.status!;
  if (order.status) localStorage.setItem(ADMIN_ORDER_STATUS, order.status);
  handleImages("admin", order.completedImages!, imagesAdmin);
}

/**
 * После получения ответа от сервера устанавливает изображения в свои контейнера
 * @param completedImages - ключи изображений
 */
export function handleResponseEditAdmin(res: string | OneOrder) {
  const block = localStorage.getItem(ADMIN_ORDERS_BLOCK)!;

  if (typeof res === "string") {
    handleErrors(res, modal);
  } else {
    closeModal();

    if (block === "main") {
      setResData(res, containerMain);
    } else setResData(res, containerInfo);
  }
}
