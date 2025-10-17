import { getImgFiles } from "@/blocks/upload-img/scripts/handleImageUpload";
import { $class } from "@/utils/lib/getElement";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";

import { fetchUpdateOrder } from "@/utils/services/orders/fetchUpdateOrder";
import {
  deleteImagesInCloud,
  getImageDataFromCloud,
  uploadImagesInCloud,
} from "@/blocks/modals/modal/scripts/handleImagesFromCloud";
import { handleResponseOrder } from "./handleResponseOrder";

const form = $class("modal__form") as HTMLFormElement;
let formData: FormData;

/**
 * Заполнение массива ключами файлов как в облаке
 * @param orderId
 */
function getKeysFilesFromId(orderId: string, images: string[]) {
  const arrImg = document.querySelectorAll(".upload-img");
  arrImg.forEach((img) => {
    console.log("img.id:", img.id);
    const key = img.id;
    const keyFile =
      key.includes("/") && !key.includes("/admin/") ? key : `${orderId}/${key}`;
    images.push(keyFile);
  });

  return images;
}

/**
 * Отправка данных формы редактирования
 */
export async function sendEditOrderData() {
  let images: string[] = [];

  openOverlayAndLoader("loader");
  formData = new FormData(form);

  const service = formData.get("service")!;
  const mail = formData.get("message")!;

  // удаление ненужных файлов из облака
  await deleteImagesInCloud();

  // получаю id заказа из кеша
  const { orderId } = getImageDataFromCloud();

  // получаю данные файлов из кеша
  const files = getImgFiles();

  // загрузка новых файлов в облако
  for (let file of files) {
    await uploadImagesInCloud(file, orderId);
  }

  images = getKeysFilesFromId(orderId, images);
  const data = { orderId: form.id, mail, images, service };

  const response = await fetchUpdateOrder(data);
  if (response) {
    handleResponseOrder("update", response, "Заказ успешно изменён!", formData);
    closeOverlayAndLoader();
  }
}
