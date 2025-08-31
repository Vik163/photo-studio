import { $api } from "@/utils/api/axiosApi";
import type { Basket, OrderEditData } from "../types/fetch-data";

export async function fetchUpdateOrder(
  data: OrderEditData
): Promise<Basket[] | string> {
  try {
    const basket = (await $api.put("/order", data)).data;

    return basket;
  } catch (err) {
    return "Заказ не получилось изменить.";
  }
}
