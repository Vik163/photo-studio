import { handleImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
import edit from "@/assets/icons/edit.png";
import order from "@/assets/icons/photo.png";
import mail from "@/assets/icons/mail.png";
import auth from "@/assets/icons/lens.png";
import type { TypeModal } from "@/utils/types/modal";
import { handleSelect } from "./handleSelect";

const container = $class("modal");
const textLabel = $id("text-label") as HTMLLabelElement;
const text = $id("message") as HTMLTextAreaElement;
const iconContainer = $class("modal__img", container) as HTMLImageElement;
const form = $class("modal__form", container) as HTMLFormElement;
const nameLabel = $class("name-label", form);
const nameInput = $id("name") as HTMLInputElement;
const phoneLabel = $class("phone-label", form);
const phoneInput = $id("phone") as HTMLInputElement;
const serviceLabel = $class("service-label", form);
const title = $class("modal__title", container);

function setContentOrderEdit() {
  $add("inactive", nameLabel);
  $add("inactive", phoneLabel);
  $add("active", serviceLabel);
  $add("small", iconContainer);
  $remove("inactive", textLabel);
  $remove("inactive", text);
  handleImageUpload("open");
  nameInput.removeAttribute("required");
  phoneInput.removeAttribute("required");
  iconContainer.src = edit;
  title.textContent = "Редактировать заказ!";
  textLabel.textContent = "Комментарии к заказу:";
}

function setContentMail() {
  $remove("inactive", nameLabel);
  $remove("inactive", phoneLabel);
  $remove("active", serviceLabel);
  $remove("small", iconContainer);
  $remove("inactive", textLabel);
  $remove("inactive", text);
  nameInput.setAttribute("required", "");
  phoneInput.setAttribute("required", "");
  handleImageUpload("close");
  iconContainer.src = mail;
  title.textContent = "Отправить сообщение!";
  textLabel.textContent = "Задайте ваш вопрос:";
}

function setContentMailEdit() {
  $add("inactive", nameLabel);
  $add("inactive", phoneLabel);
  $remove("inactive", textLabel);
  $remove("inactive", text);
  $remove("active", serviceLabel);
  $remove("small", iconContainer);
  nameInput.removeAttribute("required");
  phoneInput.removeAttribute("required");
  handleImageUpload("close");
  iconContainer.src = mail;
  title.textContent = "Редактировать сообщение!";
  textLabel.textContent = "Задайте ваш вопрос:";
}

function setContentOrder() {
  $remove("inactive", nameLabel);
  $remove("inactive", phoneLabel);
  $add("active", serviceLabel);
  $remove("inactive", textLabel);
  $remove("inactive", text);
  $remove("small", iconContainer);
  handleImageUpload("open");
  nameInput.setAttribute("required", "");
  phoneInput.setAttribute("required", "");
  iconContainer.src = order;
  title.textContent = "Создать заказ!";
  textLabel.textContent = "Комментарии к заказу:";
}

function setContentAuth() {
  $add("inactive", nameLabel);
  $remove("inactive", phoneLabel);
  $remove("active", serviceLabel);
  $remove("small", iconContainer);
  $add("inactive", textLabel);
  $add("inactive", text);
  nameInput.removeAttribute("required");
  phoneInput.setAttribute("required", "");
  handleImageUpload("close");
  iconContainer.src = auth;
  title.textContent = "Проверить наличие заказов и обращений!";
}

/**
 * Управление контентом модалки в зависимости от типа (сообщение, редактирование или заказ)
 * @param type
 */
export const handleContentModal = async (type: TypeModal) => {
  if (type === "order") {
    setContentOrder();
    handleSelect();
  } else if (type === "mail") {
    setContentMail();
  } else if (type === "orderEdit") {
    setContentOrderEdit();
    handleSelect();
  } else if (type === "mailEdit") {
    setContentMailEdit();
  } else {
    setContentAuth();
  }
};
