import { $adminApi } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { AdminOrders } from "@/utils/types/fetch-admin-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchAdminOrders(): Promise<AdminOrders[] | string> {
  try {
    const allOrders = (await $adminApi.get("/orders")).data;

    return allOrders;
  } catch (err) {
    return Messages.GET_ADMIN_ORDER_ERROR;
  }
}
