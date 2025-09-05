import { handleImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import edit from "@/assets/icons/edit.png";
import order from "@/assets/icons/photo.png";
import mail from "@/assets/icons/mail.png";
import type { TypeModal } from "@/utils/types/modal";

const container = $class("modal");
const textLabel = $id("text-label") as HTMLLabelElement;
const iconContainer = $class("modal__img", container) as HTMLImageElement;
const form = $class("modal__form", container) as HTMLFormElement;
const nameLabel = $class("name-label", form);
const nameInput = $id("name") as HTMLInputElement;
const phoneLabel = $class("phone-label", form);
const phoneInput = $id("phone") as HTMLInputElement;
const serviceLabel = $class("service-label", form);
const title = $class("modal__title", container);

function setContentEdit() {
  $add("inactive", nameLabel);
  $add("inactive", phoneLabel);
  $add("active", serviceLabel);
  $add("small", iconContainer);
  handleImageUpload("open");
  nameInput.removeAttribute("required");
  phoneInput.removeAttribute("required");
  iconContainer.src = edit;
  title.textContent = "Редактировать заказ!";
  textLabel.textContent = "Комментарии к заказу:";
}

function setContentMessage() {
  $remove("inactive", nameLabel);
  $remove("inactive", phoneLabel);
  $remove("active", serviceLabel);
  $remove("small", iconContainer);
  nameInput.setAttribute("required", "");
  phoneInput.setAttribute("required", "");
  handleImageUpload("close");
  iconContainer.src = mail;
  title.textContent = "Отправить сообщение!";
  textLabel.textContent = "Задайте ваш вопрос:";
}

function setContentOrder() {
  $remove("inactive", nameLabel);
  $remove("inactive", phoneLabel);
  $add("active", serviceLabel);
  $remove("small", iconContainer);
  handleImageUpload("open");
  nameInput.setAttribute("required", "");
  phoneInput.setAttribute("required", "");
  iconContainer.src = order;
  title.textContent = "Создать заказ!";
  textLabel.textContent = "Комментарии к заказу:";
}

/**
 * Управление контентом модалки в зависимости от типа (сообщение, редактирование или заказ)
 * @param type
 */
export const handleContentModal = (type: TypeModal) => {
  if ($contains("modal_active", container)) {
    if (type === "order") {
      setContentOrder();
    } else if (type === "mail") {
      setContentMessage();
    } else setContentEdit();
  }
};
