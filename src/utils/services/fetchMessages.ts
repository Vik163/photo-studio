import { $api } from "../api/axiosApi";
import type { Message } from "../types/fetch-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchMessages(): Promise<Message[] | string> {
  try {
    const messages = (await $api.get("/messages")).data;

    return messages;
  } catch (err) {
    return "Не удалось получить данные по вашим сообщениям.";
  }
}
