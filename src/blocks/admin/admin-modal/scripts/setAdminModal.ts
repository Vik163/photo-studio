import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";
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

const modal = $class("admin-modal");
const form = $class("admin-modal__form", modal) as HTMLFormElement;
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

  const data: AdminUpdateData = {
    deviceId,
    orderId,
    mail: mailAdmin,
    completedImages: images,
  };

  const res = await fetchUpdateAdminDataOrder(data);
  if (typeof res === "string") {
    handleErrors(res, modal);
  } else {
    closeModal();
    handleResponseEditAdmin(res.completedImages!);
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
