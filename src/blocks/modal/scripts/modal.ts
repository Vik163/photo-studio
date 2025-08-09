import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import mail from "../../../assets/icons/mail.png";
import { $api } from "@/utils/api/axiosApi";
import { handleCheckbox } from "./handleCheckbox";
import { handleInputPhone } from "@/utils/lib/phoneValidator/handleInputPhone";
import { handleContentModal } from "./handleContentModal";
import {
  getImgFiles,
  handleImageUpload,
  resetImageUpload,
} from "../../upload-img/scripts/handleImageUpload";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { ORDER_STATE } from "@/utils/constants/storage";
import { sendData } from "./fetchData";

// (123) 123-12-31

const container = $class("modal");
const iconHeader = $class("header__mail");
const closeIcon = $class("modal__btn-close", container);
const form = $class("modal__form", container) as HTMLFormElement;
const title = $class("modal__title", container);
const textLabel = $id("text-label") as HTMLLabelElement;
const iconContainer = $class("modal__img", container) as HTMLImageElement;

let typeModal: "mail" | "load" = "mail";

function resetForm() {
  form.reset();
  resetImageUpload();
}

function openModal() {
  $add("modal_active", container);
  $add(typeModal, container);
  iconContainer.src = mail;

  if ($contains("modal_active", container)) {
    closeIcon.addEventListener("click", closeModal);
    form.addEventListener("submit", (e) => sendData(e, typeModal));
    handleCheckbox();
    handleInputPhone("modal-phone");
    handleContentModal(typeModal);
    if (typeModal === "load") {
      $add("service-label_active", $class("service-label", form));
      handleImageUpload();
      title.textContent = "Создать заказ!";
      textLabel.textContent = "Комментарии к заказу:";
    } else {
      $remove("service-label_active", $class("service-label", form));

      title.textContent = "Отправить сообщение!";
      textLabel.textContent = "Задайте ваш вопрос:";
    }
  }
}

export function closeModalAfterResult(text: string) {
  resetForm();
  title.textContent = text;
  closeOverlayAndLoader();
  setTimeout(() => {
    closeModal();
  }, 1000);
}

export function closeModal() {
  if ($contains("modal_active", container)) {
    $remove("modal_active", container);
    $remove("mail", container);
    $remove("load", container);
    $remove("upload_active", $class("upload", form));
    closeIcon.removeEventListener("click", closeModal);
    form.removeEventListener("submit", (e) => sendData(e, typeModal));
  }
}

function handleModal(type: "mail" | "load") {
  typeModal = type;
  if ($contains("modal_active", container)) {
    if ($contains("load", container)) return;
    closeModal();
  } else openModal();
}

export const setModal = (type: "mail" | "load") => {
  if (type === "load") {
    const loadBtns = document.querySelectorAll(".btn-load");
    loadBtns.forEach((i) =>
      i.addEventListener("click", () => handleModal("load"))
    );
    iconHeader.addEventListener("click", () => handleModal("mail"));
  } else iconHeader.addEventListener("click", () => handleModal("mail"));
};
