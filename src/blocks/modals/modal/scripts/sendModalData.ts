import { getImgFiles } from "@/blocks/upload-img/scripts/handleImageUpload";
import { $class } from "@/utils/lib/getElement";
import { v4 as uuidv4 } from "uuid";
import { fetchCreateOrder } from "@/utils/services/fetchCreateOrder";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import type { TypeModal } from "@/utils/types/modal";
import { uploadImagesInCloud } from "./handleImagesFromCloud";
import { handleResponse } from "./handleResponse";

const form = $class("modal__form") as HTMLFormElement;
let formData: FormData;

/**
 * Собирает данные из формы и загруженные фото
 * создает id заказа
 * фото отправляет в облако, а данные на сервер
 * @param typeModal - сообщение или заказ
 */
export async function sendModalData(typeModal: TypeModal) {
  let images: string[] = [];
  openOverlayAndLoader("loader");
  formData = new FormData(form);

  const name = formData.get("name")!;
  const service = formData.get("service")!;
  const phone = (formData.get("phone") as string).replace(/\D/g, "").slice(1); //только цифры без 7;
  const message = formData.get("message")!;

  if (form.checkValidity()) {
    const orderId = uuidv4();
    if (typeModal === "order") {
      const files = getImgFiles();

      for (let file of files) {
        const img = await uploadImagesInCloud(file, orderId);
        images.push(img);
      }

      const data = { orderId, name, phone, message, images, service };

      const response = await fetchCreateOrder(data);
      if (response) {
        handleResponse(response, "Заказ успешно создан!", formData);
        closeOverlayAndLoader();
      }
    } else {
      const data = { orderId, name, phone, message, service: "Сообщение" };
      const response = await fetchCreateOrder(data);

      if (response) {
        handleResponse(response, "Сообщение отправлено!", formData);
        closeOverlayAndLoader();
      }
    }
  }
}
