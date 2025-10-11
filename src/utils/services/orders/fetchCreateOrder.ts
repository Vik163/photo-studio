import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Basket, OrderData } from "@/utils/types/fetch-data";

export async function fetchCreateOrder(
  data: OrderData
): Promise<Basket | string | null> {
  try {
    const basket = (await $api.post("/orders", data)).data;

    if (basket) {
      return basket;
    } else return null;
  } catch (err) {
    return Messages.CREATE_ORDER_ERROR;
  }
}
