import { $api } from "@/utils/api/axiosApi";
import type { Messages, MessagesData } from "../types/fetch-data";

export async function fetchCreateMessage(
  data: MessagesData
): Promise<Messages[] | string> {
  try {
    const messages = (await $api.post("/messages", data)).data;

    return messages;
  } catch (err) {
    return "Сообщение не получилось создать.";
  }
}
