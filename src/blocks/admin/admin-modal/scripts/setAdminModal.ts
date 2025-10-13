import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import { deleteImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";

import { setSelect } from "@/utils/ui/select/select";
import { ADMIN_STATUS } from "@/utils/constants/admin/selectsData";
import type { StatusOrder } from "@/utils/types/fetch-data";
import { setStylesStatus } from "../../../../utils/lib/setStylesDateAndStatus";
import {
  ADMIN_ORDER_MAIL,
  ADMIN_ORDER_STATUS,
} from "@/utils/constants/storage";

const modal = $class("admin-modal");
const form = $class("admin-modal__form", modal) as HTMLFormElement;
const status = $class("admin-modal__status", form) as HTMLElement;
const error = $class("modal__error", modal) as HTMLElement;
const service = $class("service-label", form) as HTMLLabelElement;
const price = $class("price-label", form) as HTMLLabelElement;
const mail = $class("text-label", form) as HTMLLabelElement;
const upload = $class("admin-modal__upload", form) as HTMLElement;
const text = $id("message", form) as HTMLTextAreaElement;
const imagesContainer = $class("upload__images", modal) as HTMLFormElement;

export const closeModal = () => {
  $remove("modal_active", modal);
  $remove("active", error);
  text.value = "";
  localStorage.removeItem(ADMIN_ORDER_MAIL);
  form.reset();

  deleteImageUpload(imagesContainer);
};

/**
 * Устанавливает админ модалку
 * вешает на id кнопки submit данные заказа
 * @param id данные заказа
 */
export const openAdminModal = (id: string) => {
  const typeModal = id.split("/")[0];
  if ($contains("modal_active", modal)) {
    $remove("modal_active", modal);
  } else {
    $add("modal_active", modal);
  }

  if (typeModal === "order") {
    $add("active", status);
    $add("active", upload);
    $add("active", mail);
    $remove("active", service);
    $remove("active", price);
    $remove("inactive", text);
    setSelect(modal, ADMIN_STATUS);
    modal.querySelectorAll(".option__value").forEach((item) => {
      setStylesStatus(item.textContent as StatusOrder, item as HTMLElement);
    });
  } else if (typeModal === "mail") {
    $remove("active", status);
    $remove("active", upload);
    $remove("active", service);
    $remove("active", price);
    $remove("inactive", text);
    $add("active", mail);
    localStorage.removeItem(ADMIN_ORDER_STATUS);
  } else {
    $remove("active", status);
    $add("inactive", text);
    $remove("active", upload);
    $add("active", service);
    $add("active", price);
    $remove("active", mail);
  }

  const btnModalSubmit = $class("modal__btn-submit", modal);
  btnModalSubmit.id = id;

  text.value = localStorage.getItem(ADMIN_ORDER_MAIL)!;
};
