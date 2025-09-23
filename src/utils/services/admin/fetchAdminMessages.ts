import { Messages } from "@/utils/constants/messages";
import { urlMails } from "@/utils/constants/urls";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 * данные кешируются
 */
export async function fetchAdminMessages(): Promise<Messages | void> {
  const cacheMails = await caches.open("admin-cache");

  return cacheMails
    .add(urlMails)
    .then(() => console.log("Сообщения добавлены в кеш."))
    .catch(() => {
      console.log("Не удалось добавить сообщения в кеш");
      return Messages.GET_ADMIN_MAIL_ERROR;
    });
}
