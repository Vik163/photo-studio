import { openModalInfo } from "@/blocks/modals/modal-info/scripts/modal-info";
import type { Basket } from "@/utils/types/fetch-data";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { setMessagesData } from "@/blocks/messages/scripts/setMessages";
import { changeDataInStorage } from "../../../utils/lib/changeDataInStorage";

/**
 * Открывает modalInfo после запроса с нужным контентом и обновляет корзину
 * @param data string | Basket[]
 */
export function handleResponseDeleteMessage(data: string | Basket) {
  if (!data || typeof data === "string") {
    openModalInfo("fatal", data);
    closeOverlayAndLoader();
  } else {
    openModalInfo("success", "Сообщение успешно удалено!");
    const newData = changeDataInStorage("delete", data, "MAILS");
    setMessagesData(newData);
    closeOverlayAndLoader();
  }
}
