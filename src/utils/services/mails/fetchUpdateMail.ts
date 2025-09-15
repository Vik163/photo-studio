import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Message, MessageEditData } from "@/utils/types/fetch-data";

export async function fetchUpdateMail(
  data: MessageEditData
): Promise<Message[] | string> {
  try {
    const messages = (await $api.put("/messages", data)).data;

    return messages;
  } catch (err) {
    return Messages.UPDATE_MAIL_ERROR;
  }
}
