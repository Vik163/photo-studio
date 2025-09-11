import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";
import type { Messages } from "@/utils/types/fetch-data";
import { deleteMessage } from "./deleteMessage";
import { editMessage } from "./editMessage";
import { setMessagesElements } from "./setMessagesElements";
import { fetchMessages } from "@/utils/services/fetchMessages";

const list = $class("messages-list");
const messagesNum = $class("messages");
let orderData: Messages[] = [];

export function closeMessagesList() {
  $remove("active", list);
  $remove("active-close", messagesNum);
}

/**
 * Отображает корзину в header если не пустая
 * @param data - корзина
 */
export const setMessagesData = (data: Messages[]) => {
  const messagesNum = $class("messages");
  closeMessagesList();

  if (data.length > 0) {
    console.log("data:", data);

    $add("active", messagesNum);
    orderData = data;
    messagesNum.textContent = data.length.toString();

    if (data) setMessagesElements(list, data);
  } else $remove("active", messagesNum);
};

/**
 * Слушатели на иконку корзины (click, mouseover, mouseleave)
 * Общий слушатель на корзину (удалить, редактировать)
 */
const setMessagesListeners = () => {
  messagesNum.addEventListener("mouseover", function () {
    $add("active-hover", list);
  });
  messagesNum.addEventListener("mouseleave", function () {
    $remove("active-hover", list);
  });

  messagesNum.addEventListener("click", function () {
    if ($contains("active", list)) {
      $remove("active", list);
      $remove("active-hover", list);
      $remove("active-close", messagesNum);
    } else {
      $add("active", list);
      $add("active-close", messagesNum);
    }
  });

  list.addEventListener("click", function (e: Event) {
    const el = e.target as HTMLElement;

    if (el.tagName === "BUTTON" && orderData.length > 0) {
      if ($contains("messages-item__edit", el)) {
        editMessage();
      } else deleteMessage();
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
