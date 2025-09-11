import { $adminApi, $api } from "../api/axiosApi";
import type { Order, OrdersUser } from "../types/fetch-admin-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchOrders(): Promise<OrdersUser[] | string> {
  try {
    const allOrders = (await $adminApi.get("/orders")).data;

    return allOrders;
  } catch (err) {
    return "Не удалось получить данные по клиентским заказам.";
  }
}
