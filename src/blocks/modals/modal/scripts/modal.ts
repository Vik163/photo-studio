import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import { setListenerCheckbox } from "./handleCheckbox";
import { setListenersInputPhone } from "@/utils/lib/phoneValidator/handleInputPhone";
import { handleContentModal } from "./handleContentModal";
import { setListenersImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { sendEditModalData, sendModalData } from "./sendModalData";
import type { TypeModal } from "@/utils/types/modal";

const container = $class("modal");
const iconMail = $id("header-mail");
const iconOrder = $id("header-order");
const closeIcon = $class("modal__btn-close", container);
const form = $class("modal__form", container) as HTMLFormElement;

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
  }
}

/**
 * Открывает modalForm c нужным контентом по типу
 * @param type TypeModal = "mail" | "order" | "edit"
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
  setListenersImageUpload();
  setListenerCheckbox();
  setListenersInputPhone("phone-input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (typeModal === "edit") {
      sendEditModalData();
    } else sendModalData(typeModal);
  });
  closeIcon.addEventListener("click", closeModal);

  iconOrder.addEventListener("click", () => setModalFormByType("order"));

  iconMail.addEventListener("click", () => setModalFormByType("mail"));
};
