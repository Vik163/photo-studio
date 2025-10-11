import { $api } from "@/utils/api/axiosApi";
import type { Basket, MessagesData } from "../../types/fetch-data";
import { Messages } from "@/utils/constants/messages";

export async function fetchCreateMessage(
  data: MessagesData
): Promise<Basket | string | null> {
  try {
    const res = (await $api.post("/messages", data)).data;

    if (res) {
      return res;
    } else return null;
  } catch (err) {
    return Messages.CREATE_MAIL_ERROR;
  }
}
