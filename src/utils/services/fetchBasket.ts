import { $api } from "../api/axiosApi";
import type { Basket } from "../types/fetch-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchBasket(): Promise<Basket[] | string> {
  try {
    const basket: Basket[] = (await $api.get("/orders/basket")).data;

    return basket;
  } catch (err) {
    return "Не удалось получить данные по вашим заказам.";
  }
}
