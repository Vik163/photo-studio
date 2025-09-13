import { $api } from "@/utils/api/axiosApi";
import type { Message, MessageEditData } from "../types/fetch-data";

export async function fetchUpdateMail(
  data: MessageEditData
): Promise<Message[] | string> {
  try {
    const messages = (await $api.put("/messages", data)).data;

    return messages;
  } catch (err) {
    return "Сообщение не получилось изменить.";
  }
}
