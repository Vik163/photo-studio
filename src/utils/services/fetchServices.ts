import { urlServices } from "@/utils/constants/admin/urls";
import { Messages } from "@/utils/constants/messages";

export async function fetchServices(): Promise<Messages | void> {
  const cacheMails = await caches.open("admin-cache");

  return cacheMails
    .add(urlServices)
    .then(() => console.log("Услуги добавлены в кеш"))
    .catch(() => {
      console.log("Не удалось добавить услуги в кеш");
      return Messages.GET_SERVICE_ERROR;
    });
}
