import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Basket, OrderEditData } from "@/utils/types/fetch-data";

export async function fetchUpdateOrder(
  data: OrderEditData
): Promise<Basket[] | string> {
  try {
    const basket = (await $api.put("/orders", data)).data;

    return basket;
  } catch (err) {
    return Messages.UPDATE_ORDER_ERROR;
  }
}
