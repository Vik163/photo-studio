import { Messages } from "@/utils/constants/messages";
import { $api } from "../../api/axiosApi";
import type { Basket } from "../../types/fetch-data";

export const fetchDeleteMessage = async (
  id: string
): Promise<null | string | Basket> => {
  try {
    const res: Basket | null = (await $api.delete(`/messages/${id}`)).data;
    if (res) {
      return res;
    } else return null;
  } catch (err) {
    return Messages.DELETE_MAIL_ERROR;
  }
};
