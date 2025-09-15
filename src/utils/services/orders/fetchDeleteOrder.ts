import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Basket } from "@/utils/types/fetch-data";

export const fetchDeleteOrder = async (
  id: string
): Promise<Basket[] | string> => {
  try {
    const basket: Basket[] = (await $api.delete(`/orders/${id}`)).data;

    return basket;
  } catch (err) {
    return Messages.DELETE_ORDER_ERROR;
  }
};
