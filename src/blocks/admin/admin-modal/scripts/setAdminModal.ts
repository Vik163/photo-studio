import { $add, $class, $contains, $id, $remove } from "@/utils/lib/getElement";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import {
  deleteImageUpload,
  getImgFiles,
} from "@/blocks/upload-img/scripts/handleImageUpload";
import { uploadImagesInCloud } from "@/blocks/modals/modal/scripts/handleImagesFromCloud";
import { AdminUpdateData } from "@/utils/types/admin-data";
import { fetchUpdateAdminDataOrder } from "@/utils/services/admin/fetchUpdateAdminDataOrder";
import { handleResponseEditAdmin } from "../../admin-order/scripts/handleResponseEditAdmin";
import { handleErrors } from "@/utils/lib/handleErrors";
import { setSelect } from "@/utils/ui/select/select";
import { ADMIN_STATUS } from "@/utils/constants/selectsData";
import type { StatusOrder } from "@/utils/types/fetch-data";
import { setStylesStatus } from "../../../../utils/lib/setStylesDateAndStatus";
import {
  ADMIN_ORDER_MAIL,
  ADMIN_ORDER_STATUS,
} from "@/utils/constants/storage";

const modal = $class("admin-modal");
const form = $class("admin-modal__form", modal) as HTMLFormElement;
const text = $id("message", form) as HTMLTextAreaElement;
const imagesContainer = $class("upload__images", modal) as HTMLFormElement;

export const closeModal = () => {
  $remove("modal_active", modal);
  $remove("modal__error", modal);

  deleteImageUpload(imagesContainer);
};

/**
 * Устанавливает админ модалку
 * вешает на id кнопки submit данные заказа
 * @param id данные заказа
 */
export const setAdminModal = (id: string) => {
  if ($contains("modal_active", modal)) {
    $remove("modal_active", modal);
    $remove("modal_active", modal);
  } else {
    $add("modal_active", modal);
  }

  const btnModalSubmit = $class("modal__btn-submit", modal);
  btnModalSubmit.id = id;

  text.value = localStorage.getItem(ADMIN_ORDER_MAIL)!;

  setSelect(modal, ADMIN_STATUS);
  modal.querySelectorAll(".option__value").forEach((item) => {
    setStylesStatus(item.textContent as StatusOrder, item as HTMLElement);
  });
};

/**
 * Отправляет данные админ формы на сервер (сообщение и фотографии)
 * @param id - данные заказа { deviceId, orderId }
 */
export const sendAdminData = async (e: Event, id: string) => {
  e.preventDefault();
  const { deviceId, orderId } = getDataFromId(id);
  const formData = new FormData(form);
  const mailAdmin = formData.get("message")!;
  const images = await uploadAdminImages(orderId);
  const status =
    ($class("select__text", modal).textContent as StatusOrder) ||
    localStorage.getItem(ADMIN_ORDER_STATUS);

  const data: AdminUpdateData = {
    deviceId,
    orderId,
    mailAdmin,
    completedImages: images,
    status,
  };

  const res = await fetchUpdateAdminDataOrder(data);
  if (typeof res === "string") {
    handleErrors(res, modal);
  } else {
    closeModal();
    handleResponseEditAdmin(res);
  }
};

/**
 * Загружает готовые изображения в облако в папку admin (`${orderId}/admin/${file.name}`)
 * @param orderId
 * @returns массив ключей загруженных фотографий
 */
const uploadAdminImages = async (orderId: string) => {
  let images: string[] = [];
  // получаю данные файлов из кеша
  const files = getImgFiles();

  // загрузка новых файлов в облако
  for await (let file of files) {
    await uploadImagesInCloud(file, orderId, "admin");

    images.push(`${orderId}/admin/${file.name}`);
  }

  return images;
};
