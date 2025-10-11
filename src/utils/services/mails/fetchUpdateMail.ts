import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Basket, MessageEditData } from "@/utils/types/fetch-data";

export async function fetchUpdateMail(
  data: MessageEditData
): Promise<Basket | string> {
  try {
    const message = (await $api.put("/messages", data)).data;

    return message;
  } catch (err) {
    return Messages.UPDATE_MAIL_ERROR;
  }
}
