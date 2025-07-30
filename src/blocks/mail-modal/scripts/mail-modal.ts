import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import mail from "../../../assets/icons/mail.png";
import { $api } from "@/utils/api/axiosApi";
import { handleCheckbox } from "./handleCheckbox";
import { handleInputPhone } from "@/utils/lib/phoneValidator/handleInputPhone";

const container = $class("mail");
const iconHeader = $class("header__mail");
const closeIcon = $class("mail__btn-close", container);
const form = $class("mail__form", container) as HTMLFormElement;
const label = $class("mail__label", container);
const iconContainer = $class("mail__img", container) as HTMLImageElement;

function openMailModal() {
  $add("mail_active", container);
  iconContainer.src = mail;

  if ($contains("mail_active", container)) {
    closeIcon.addEventListener("click", closeMailModal);
    form.addEventListener("submit", sendMessage);
    handleCheckbox();
    handleInputPhone("mail-phone");
  }
}

async function sendMessage(e: Event) {
  e.preventDefault();

  const textContainer = $id("mail-message") as HTMLTextAreaElement;
  const value = textContainer.value;
  if (form.checkValidity()) {
    const answer = (await $api.post("/message", { message: value })).data;
    if (answer === "saved") label.textContent = "Сообщение отправлено!";
  }
}

export function closeMailModal() {
  if ($contains("mail_active", container)) {
    $remove("mail_active", container);
    closeIcon.removeEventListener("click", closeMailModal);
    form.removeEventListener("submit", sendMessage);
  }
}

export const setMailModal = () => {
  iconHeader.addEventListener("click", function () {
    if ($contains("mail_active", container)) {
      closeMailModal();
    } else openMailModal();
  });
};
