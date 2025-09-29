import { $class } from "@/utils/lib/getElement";
import { handleImages } from "./handleImages";
import { ADMIN_ORDERS_BLOCK } from "@/utils/constants/storage";

const orderPage = $class("order");
const containerMain = $class("order-main", orderPage);
const containerInfo = $class("order-info", orderPage);

/**
 * После получения ответа от сервера устанавливает изображения в свои контейнера
 * @param completedImages - ключи изображений
 */
export function handleResponseEditAdmin(completedImages: string[]) {
  const block = localStorage.getItem(ADMIN_ORDERS_BLOCK)!;

  if (block === "main") {
    const imagesAdmin = $class("order__images-admin", containerMain);
    handleImages("admin", completedImages, imagesAdmin);
  } else {
    const imagesAdmin = $class("order__images-admin", containerInfo);
    handleImages("admin", completedImages, imagesAdmin);
  }
}
