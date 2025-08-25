import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";

import { $api } from "@/utils/api/axiosApi";
import { setListenerCheckbox } from "./handleCheckbox";
import { setListenersInputPhone } from "@/utils/lib/phoneValidator/handleInputPhone";
import { handleContentModal } from "./handleContentModal";
import {
  getImgFiles,
  setListenersImageUpload,
} from "../../upload-img/scripts/handleImageUpload";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { ORDER_STATE } from "@/utils/constants/storage";
import { sendData } from "./fetchData";
import { getBaketListObj } from "@/utils/lib/handleYaBaket";

// (123) 123-12-31

const container = $class("modal");
const iconMail = $id("header-mail");
const iconOrder = $id("header-order");
const closeIcon = $class("modal__btn-close", container);
const form = $class("modal__form", container) as HTMLFormElement;
const title = $class("modal__title", container);

let typeModal: "mail" | "load" = "mail";

function openModal() {
  $add("modal_active", container);
  $add(typeModal, container);

  handleContentModal(typeModal);
}

export function closeModalAfterResult(text: string) {
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
  }
}

function setModalByType(type: "mail" | "load") {
  typeModal = type;
  if ($contains("modal_active", container)) {
    closeModal();
  } else openModal();
}

export const setListenersModal = () => {
  setListenersImageUpload();
  setListenerCheckbox();
  setListenersInputPhone("modal-phone");

  form.addEventListener("submit", (e) => sendData(e, typeModal));
  closeIcon.addEventListener("click", closeModal);

  iconOrder.addEventListener("click", () => setModalByType("load"));

  iconMail.addEventListener("click", () => setModalByType("mail"));
};
