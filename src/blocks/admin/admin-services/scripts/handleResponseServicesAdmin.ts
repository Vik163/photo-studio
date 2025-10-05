import { $class, $id } from "@/utils/lib/getElement";
import {
  ADMIN_ORDER_STATUS,
  ADMIN_ORDERS_BLOCK,
} from "@/utils/constants/storage";
import { OneOrder } from "@/utils/types/admin-data-orders";
import type { AdminResServiceData } from "@/utils/types/admin-data-services";

const viewServicesBlock = $class("admin-services");

/**
 * После получения ответа от сервера устанавливает изображения в свои контейнера
 * @param completedImages - ключи изображений
 */
export function handleResponseServicesAdmin(data: AdminResServiceData) {
  const listServices = $id(data.type, viewServicesBlock) as HTMLUListElement;

  //   const arrElements = listServices.querySelectorAll('.')

  console.log("data:", data);
  //   const status = $class("order__status", container);
  //   const mail = $class("order__text-admin", container);
  //   const imagesAdmin = $class("order__images-admin", container);
  //   mail.textContent = order.mailAdmin!;
  //   status.textContent = order.status!;
  //   if (order.status) localStorage.setItem(ADMIN_ORDER_STATUS, order.status);
  //   handleImages("admin", order.completedImages!, imagesAdmin);
}
