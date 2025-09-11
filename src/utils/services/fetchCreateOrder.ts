import { $api } from "@/utils/api/axiosApi";
import type { Basket, OrderData } from "../types/fetch-data";

export async function fetchCreateOrder(
  data: OrderData
): Promise<Basket[] | string> {
  try {
    const basket = (await $api.post("/orders", data)).data;

    return basket;
  } catch (err) {
    return "Заказ не получилось создать.";
  }
}
