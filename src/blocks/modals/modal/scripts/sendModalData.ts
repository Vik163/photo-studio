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
import { handleResponseOrder, handleResponseMessages } from "./handleResponse";
import { fetchCreateMessage } from "@/utils/services/fetchCreateMessage";

const form = $class("modal__form") as HTMLFormElement;
let formData: FormData;

/**
 * Собирает данные из формы и загруженные фото
 * создает id заказа
 * фото отправляет в облако, а данные на сервер
 * @param typeModal - "orderEdit" | "mailEdit" | "mail" | "order"
 */
export async function sendModalData(typeModal: TypeModal) {
  let images: string[] = [];
  openOverlayAndLoader("loader");
  formData = new FormData(form);

  const name = formData.get("name")!;
  const service = formData.get("service")!;
  const phone = (formData.get("phone") as string).replace(/\D/g, "").slice(1); //только цифры без 7;
  const mail = formData.get("message")!;

  if (form.checkValidity()) {
    const orderId = uuidv4();
    if (typeModal === "order") {
      const files = getImgFiles();

      for (let file of files) {
        const img = await uploadImagesInCloud(file, orderId);
        images.push(img);
      }

      const data = { orderId, name, phone, mail, images, service };

      const response = await fetchCreateOrder(data);
      if (response) {
        handleResponseOrder(response, "Заказ успешно создан!", formData);
        closeOverlayAndLoader();
      }
    } else if (typeModal === "mail") {
      const data = { orderId, name, phone, mail };
      const response = await fetchCreateMessage(data);

      if (response) {
        handleResponseMessages(response, "Сообщение отправлено!", formData);
        closeOverlayAndLoader();
      }
    }
  }
}
