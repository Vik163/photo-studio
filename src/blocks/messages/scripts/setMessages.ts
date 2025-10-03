import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";
import type { Message } from "@/utils/types/fetch-data";
import { deleteMessage } from "./deleteMessage";
import { editMessage } from "./editMessage";
import { setMessagesElements } from "./setMessagesElements";
import { fetchMessages } from "@/utils/services/mails/fetchMessages";

const list = $class("messages-list");
const messages = $class("messages");
let messagesData: Message[] = [];

export function closeMessagesList() {
  $remove("active", list);
  $remove("active-close", messages);
}

/**
 * Отображает корзину в header если не пустая
 * @param data - корзина
 */
export const setMessagesData = (data: Message[]) => {
  closeMessagesList();
  let adminMails = 0;

  if (data.length > 0) {
    $add("active", messages);

    messagesData = data;

    data.forEach((mail) => {
      if (mail.mailAdmin) adminMails++;
    });

    if (adminMails > 0) {
      $add("active_admin", messages);
    } else messages.textContent = data.length.toString();

    if (data) setMessagesElements(list, data);
  } else $remove("active", messages);
};

/**
 * Слушатели на иконку корзины (click, mouseover, mouseleave)
 * Общий слушатель на корзину (удалить, редактировать)
 */
const setMessagesListeners = () => {
  messages.addEventListener("mouseover", function () {
    $add("active-hover", list);
  });
  messages.addEventListener("mouseleave", function () {
    $remove("active-hover", list);
  });

  messages.addEventListener("click", function () {
    if ($contains("active", list)) {
      $remove("active", list);
      $remove("active-hover", list);
      $remove("active-close", messages);
    } else {
      $add("active", list);
      $add("active-close", messages);
    }
  });

  list.addEventListener("click", function (e: Event) {
    const el = e.target as HTMLElement;

    if (el.tagName === "BUTTON" && messagesData.length > 0) {
      if ($contains("messages-item__edit", el)) {
        editMessage(messagesData, el.id);
      } else deleteMessage(messagesData, el.id);
    }
  });
};

export const setMessages = async () => {
  setMessagesListeners();

  const messages = await fetchMessages();
  if (typeof messages === "string") {
    console.log("Ошибка запроса сообщений", messages);
  } else setMessagesData(messages);
};
