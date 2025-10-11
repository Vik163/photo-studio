import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Basket } from "@/utils/types/fetch-data";

export const fetchDeleteOrder = async (
  id: string
): Promise<Basket | string | null> => {
  try {
    const res = (await $api.delete(`/orders/${id}`)).data;
    if (res) {
      return res;
    } else return null;
  } catch (err) {
    return Messages.DELETE_ORDER_ERROR;
  }
};
