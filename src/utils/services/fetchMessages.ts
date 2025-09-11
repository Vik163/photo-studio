import { $api } from "../api/axiosApi";
import type { Messages } from "../types/fetch-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchMessages(): Promise<Messages[] | string> {
  try {
    const messages = (await $api.get("/messages")).data;

    return messages;
  } catch (err) {
    return "Не удалось получить данные по вашим сообщениям.";
  }
}
