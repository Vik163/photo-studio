import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Basket } from "@/utils/types/fetch-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchBasket(): Promise<Basket[] | string> {
  try {
    const basket: Basket[] = (await $api.get("/orders/basket")).data;

    return basket;
  } catch (err) {
    return Messages.GET_ORDER_ERROR;
  }
}
