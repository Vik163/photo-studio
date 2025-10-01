import { $class } from "@/utils/lib/getElement";
import { handleImages } from "./handleImages";
import {
  ADMIN_ORDER_STATUS,
  ADMIN_ORDERS_BLOCK,
} from "@/utils/constants/storage";
import { OneOrder } from "@/utils/types/admin-data";

const orderPage = $class("order");
const containerMain = $class("order-main", orderPage);
const containerInfo = $class("order-info", orderPage);

function setResData(order: OneOrder, container: HTMLElement) {
  const status = $class("order__status", container);
  const mail = $class("order__text-admin", container);
  const imagesAdmin = $class("order__images-admin", container);

  mail.textContent = order.mailAdmin!;
  status.textContent = order.status!;
  localStorage.setItem(ADMIN_ORDER_STATUS, order.status!);
  handleImages("admin", order.completedImages!, imagesAdmin);
}

/**
 * После получения ответа от сервера устанавливает изображения в свои контейнера
 * @param completedImages - ключи изображений
 */
export function handleResponseEditAdmin(order: OneOrder) {
  const block = localStorage.getItem(ADMIN_ORDERS_BLOCK)!;

  if (block === "main") {
    setResData(order, containerMain);
  } else setResData(order, containerInfo);
}
