import { Messages } from "@/utils/constants/messages";
import { $api } from "../../api/axiosApi";
import type { Message } from "../../types/fetch-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchMessages(): Promise<Message[] | string> {
  try {
    const messages = (await $api.get("/messages")).data;

    return messages;
  } catch (err) {
    return Messages.GET_MAIL_ERROR;
  }
}
