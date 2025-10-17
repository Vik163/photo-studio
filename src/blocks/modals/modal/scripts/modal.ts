import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import { disableCheckbox, setListenerCheckbox } from "./handleCheckbox";
import { setListenersInputPhone } from "@/utils/lib/phoneValidator/handleInputPhone";
import { handleContentModal } from "./handleContentModal";
import {
  deleteImageUpload,
  setListenersImageUpload,
} from "@/blocks/upload-img/scripts/handleImageUpload";
import { closeOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import type { TypeModal } from "@/utils/types/modal";
import { clearCacheEditForm } from "./handleImagesFromCloud";
import { sendEditMailData } from "../../../messages/scripts/sendEditMailData";
import { sendEditOrderData } from "@/blocks/basket/scripts/sendEditOrderData";
import { openOptionsSelect } from "@/utils/ui/select/select";
import { fetchServices } from "@/utils/services/fetchServices";
import { handleErrors } from "@/utils/lib/handleErrors";
import { sendAuthData } from "@/blocks/auth/sendAuthData";
import { sendMailData } from "@/blocks/messages/scripts/sendMailData";
import { sendOrderData } from "@/blocks/basket/scripts/sendOrderData";

const container = $class("modal");
const iconMail = $id("header-mail");
const iconOrder = $id("header-order");
const closeIcon = $class("modal__btn-close", container);
const form = $class("modal__form", container) as HTMLFormElement;
const btnSelect = $class("select__btn", container) as HTMLButtonElement;
const btnOption = $class("select__list", container) as HTMLButtonElement;
const uploadBlock = $class("upload")!;
const imagesContainer = $class("upload__images", uploadBlock)!;

let typeModal: TypeModal = "mail";

export function resetForm(formData: FormData) {
  form.reset();

  formData.forEach((value, key, parent) => {
    formData.delete(key);
  });

  deleteImageUpload(imagesContainer);
  disableCheckbox();
}

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

    deleteImageUpload(imagesContainer);
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

export const setModal = async () => {
  const resServices = await fetchServices();

  if (typeof resServices === "string") {
    handleErrors(resServices, container);
  }
  setListenersModal();
};

const setListenersModal = () => {
  setListenersImageUpload(uploadBlock);
  setListenerCheckbox();
  setListenersInputPhone("phone");

  btnSelect.addEventListener("click", () => {
    openOptionsSelect(container);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (typeModal === "orderEdit") {
      sendEditOrderData();
    } else if (typeModal === "order") {
      sendOrderData();
    } else if (typeModal === "mailEdit") {
      sendEditMailData();
    } else if (typeModal === "mail") {
      sendMailData();
    } else {
      sendAuthData();
    }
  });
  closeIcon.addEventListener("click", closeModal);

  iconOrder.addEventListener("click", () => setModalFormByType("order"));

  iconMail.addEventListener("click", () => setModalFormByType("mail"));
};
