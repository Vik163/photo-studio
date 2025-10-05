import { Messages } from "@/utils/constants/messages";
import { urlOrders } from "@/utils/constants/admin/urls";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 * данные кешируются
 */
export async function fetchAdminOrders(): Promise<Messages | void> {
  const cacheMails = await caches.open("admin-cache");

  return cacheMails
    .add(urlOrders)
    .then(() => console.log("Заказы добавлены в кеш"))
    .catch(() => {
      console.log("Не удалось добавить заказы в кеш");
      return Messages.GET_ADMIN_ORDER_ERROR;
    });
}
