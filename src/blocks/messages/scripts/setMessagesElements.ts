import { $class, $id } from "@/utils/lib/getElement";
import type { Message } from "@/utils/types/fetch-data";

export function removeMessagesElements() {
  const elements = document.querySelectorAll(".messages-item");
  if (elements.length > 0)
    elements.forEach((el) => {
      el.remove();
    });
}
/**
 * Создает сообщения из template
 * @param messagesBlock - элемент куда вставляется
 * @param data - корзина
 */
export async function setMessagesElements(
  messagesBlock: HTMLElement,
  data: Message[]
) {
  // удаление существующих элементов при открытии
  removeMessagesElements();

  const template = ($id("messages-item") as HTMLTemplateElement).content;
  data.forEach(async (message) => {
    const messageTemplate = template
      .querySelector(".messages-item")
      ?.cloneNode(true) as HTMLElement;

    if (messageTemplate) {
      const text = $class("messages-item__text", messageTemplate);
      text.textContent = message.mail;

      const date = $class("messages-item__date", messageTemplate);
      date.textContent = message.created;

      const btnEdit = $class("messages-item__edit", messageTemplate);
      btnEdit.id = message.orderId;

      const btnBasket = $class("messages-item__basket", messageTemplate);
      btnBasket.id = message.orderId;

      messagesBlock?.append(messageTemplate);
    }
  });
}
