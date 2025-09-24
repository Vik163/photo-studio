import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import { setListenerCheckbox } from "./handleCheckbox";
import { setListenersInputPhone } from "@/utils/lib/phoneValidator/handleInputPhone";
import { handleContentModal } from "./handleContentModal";
import {
  deleteImageUpload,
  setListenersImageUpload,
} from "@/blocks/upload-img/scripts/handleImageUpload";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { sendModalData } from "./sendModalData";
import type { TypeModal } from "@/utils/types/modal";
import { sendEditOrderData } from "./sendEditOrderData";
import { clearCacheEditForm } from "./handleImagesFromCloud";
import { sendEditMailData } from "./sendEditMailData";

const container = $class("modal");
const iconMail = $id("header-mail");
const iconOrder = $id("header-order");
const closeIcon = $class("modal__btn-close", container);
const form = $class("modal__form", container) as HTMLFormElement;
const imagesContainer = $class("upload")!;

let typeModal: TypeModal = "mail";

function openModal() {
  $add("modal_active", container);
  $add(typeModal, container);
}

export function closeModalAfterResult() {
  closeOverlayAndLoader();
  closeModal();
}

export function closeModal() {
  if ($contains("modal_active", container)) {
    $remove("modal_active", container);
    $remove("mail", container);
    $remove("load", container);

    deleteImageUpload();
    clearCacheEditForm();
  }
}

/**
 * Открывает modalForm c нужным контентом по типу
 * @param type TypeModal = "mail" | "mailEdit" | "order" | "orderEdit""
 */
export function setModalFormByType(type: TypeModal) {
  typeModal = type;
  if ($contains("modal_active", container)) {
    closeModal();
  } else {
    openModal();
    handleContentModal(typeModal);
  }
}

export const setListenersModal = () => {
  setListenersImageUpload(imagesContainer);
  setListenerCheckbox();
  setListenersInputPhone("phone");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (typeModal === "orderEdit") {
      sendEditOrderData();
    } else if (typeModal === "order") {
      sendModalData(typeModal);
    } else if (typeModal === "mailEdit") {
      sendEditMailData();
    } else sendModalData(typeModal);
  });
  closeIcon.addEventListener("click", closeModal);

  iconOrder.addEventListener("click", () => setModalFormByType("order"));

  iconMail.addEventListener("click", () => setModalFormByType("mail"));
};
