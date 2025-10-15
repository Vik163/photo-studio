import { getImgFiles } from "@/blocks/upload-img/scripts/handleImageUpload";
import { $class } from "@/utils/lib/getElement";
import { v4 as uuidv4 } from "uuid";
import { fetchCreateOrder } from "@/utils/services/orders/fetchCreateOrder";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { uploadImagesInCloud } from "@/blocks/modals/modal/scripts/handleImagesFromCloud";
import { handleResponseOrder } from "@/blocks/modals/modal/scripts/handleResponse";

const form = $class("modal__form") as HTMLFormElement;

/**
 * Собирает данные из формы и загруженные фото
 * создает id заказа
 * фото отправляет в облако, а данные на сервер
 */
export async function sendOrderData() {
  let images: string[] = [];
  openOverlayAndLoader("loader");
  const formData = new FormData(form);

  const name = formData.get("name")!;
  const service = formData.get("service")!;
  const phone = (formData.get("phone") as string).replace(/\D/g, "").slice(1); //только цифры без 7;
  const mail = formData.get("message")!;

  if (form.checkValidity()) {
    const orderId = uuidv4();
    const files = getImgFiles();

    for (let file of files) {
      const img = await uploadImagesInCloud(file, orderId);
      images.push(img);
    }

    const data = { orderId, name, phone, mail, images, service };

    const response = await fetchCreateOrder(data);
    if (response) {
      handleResponseOrder("add", response, "Заказ успешно создан!", formData);
      closeOverlayAndLoader();
    }
  }
}
