import { openModalInfo } from "@/blocks/modals/modal-info/scripts/modal-info";
import type { Message } from "@/utils/types/fetch-data";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { setMessagesData } from "@/blocks/messages/scripts/setMessages";

/**
 * Открывает modalInfo после запроса с нужным контентом и обновляет корзину
 * @param data string | Basket[]
 */
export function handleResponseDeleteMessage(data: string | Message[]) {
  if (typeof data === "string") {
    openModalInfo("fatal", data);
    closeOverlayAndLoader();
  } else {
    openModalInfo("success", "Сообщение успешно удалено!");
    setMessagesData(data);
    closeOverlayAndLoader();
  }
}
