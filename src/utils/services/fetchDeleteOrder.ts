import { $api } from "../api/axiosApi";
import type { Basket } from "../types/fetch-data";

export const fetchDeleteOrder = async (
  id: string
): Promise<Basket[] | string> => {
  try {
    const basket: Basket[] = (await $api.delete(`/order/${id}`)).data;

    return basket;
  } catch (err) {
    return "Не удалось удалить заказ.";
  }
};
