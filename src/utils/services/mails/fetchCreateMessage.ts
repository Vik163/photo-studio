import { $api } from "@/utils/api/axiosApi";
import type { Message, MessagesData } from "../../types/fetch-data";
import { Messages } from "@/utils/constants/messages";

export async function fetchCreateMessage(
  data: MessagesData
): Promise<Message[] | string> {
  try {
    const messages = (await $api.post("/messages", data)).data;

    return messages;
  } catch (err) {
    return Messages.CREATE_MAIL_ERROR;
  }
}
