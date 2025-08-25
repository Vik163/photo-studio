import { handleImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import order from "../../../assets/icons/basket.png";
import mail from "../../../assets/icons/mail.png";

const container = $class("modal");
const textLabel = $id("text-label") as HTMLLabelElement;
const iconContainer = $class("modal__img", container) as HTMLImageElement;
const form = $class("modal__form", container) as HTMLFormElement;
const title = $class("modal__title", container);

export const handleContentModal = (type: "mail" | "load") => {
  if ($contains("modal_active", container)) {
    if (type === "load") {
      $add("service-label_active", $class("service-label", form));
      handleImageUpload("open");

      iconContainer.src = order;
      title.textContent = "Создать заказ!";
      textLabel.textContent = "Комментарии к заказу:";
    } else {
      $remove("service-label_active", $class("service-label", form));

      handleImageUpload("close");

      iconContainer.src = mail;
      title.textContent = "Отправить сообщение!";
      textLabel.textContent = "Задайте ваш вопрос:";
    }
  }
};
