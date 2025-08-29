import {
  getImgFiles,
  resetImageUpload,
} from "@/blocks/upload-img/scripts/handleImageUpload";
import { $class } from "@/utils/lib/getElement";
import { disableCheckbox } from "./handleCheckbox";
import { uploadBaketJbj } from "@/utils/lib/handleYaBaket";
import { transformFilesInString } from "@/utils/lib/readerFiles";
import { v4 as uuidv4 } from "uuid";
import { fetchCreateOrder } from "@/utils/services/fetchCreateOrder";
import type { Basket } from "@/utils/types/fetch-data";
import { setBasketData } from "@/blocks/basket/scripts/basket";
import { openModalInfo } from "../../modal-info/scripts/modal-info";
import { closeModalAfterResult } from "./modal";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import type { TypeModal } from "@/utils/types/modal";
import { getImageDataFromCloud } from "@/blocks/modals/modal/scripts/handleImageDataFromCloud";
import {
  deleteImagesInCloud,
  uploadImagesInCloud,
} from "./handleImagesFromCloud";
import { fetchUpdateOrder } from "@/utils/services/fetchUpdateOrder";

const form = $class("modal__form") as HTMLFormElement;
let formData: FormData;

function resetForm() {
  form.reset();

  formData.forEach((value, key, parent) => {
    formData.delete(key);
  });
  resetImageUpload();
  disableCheckbox();
}

function handleResponse(res: Basket[] | string, textModalInfo: string) {
  if (typeof res === "string") {
    openModalInfo("reject", res);
  } else {
    setBasketData(res);

    closeModalAfterResult();
    openModalInfo("success", textModalInfo);
  }

  resetForm();
}

/**
 * Собирает данные из формы и загруженные фото
 * создает id заказа
 * фото отправляет в облако, а данные на сервер
 * @param typeModal - сообщение или заказ
 */
export async function sendModalData(typeModal: TypeModal) {
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
      let images: string[] = [];

      for (let file of files) {
        images = await uploadImagesInCloud(file, orderId, images);
      }

      const data = { orderId, name, phone, message, images, service };

      const response = await fetchCreateOrder(data);
      if (response) {
        handleResponse(response, "Заказ успешно создан!");
        closeOverlayAndLoader();
      }
    } else {
      const data = { orderId, name, phone, message, service: "Сообщение" };
      const response = await fetchCreateOrder(data);

      if (response) {
        handleResponse(response, "Сообщение отправлено!");
        closeOverlayAndLoader();
      }
    }
  }
}

export async function sendEditModalData() {
  // openOverlayAndLoader("loader");
  formData = new FormData(form);

  const service = formData.get("service")!;
  const message = formData.get("message")!;

  const files = getImgFiles();
  console.log("files:", files);
  let { arrImg, newArrImg } = getImageDataFromCloud();
  const orderId = arrImg[0].split("/")[0];
  console.log("orderId:", orderId);
  const responseDeletImg = await deleteImagesInCloud(arrImg, newArrImg);

  for (let file of files) {
    newArrImg = await uploadImagesInCloud(file, orderId, newArrImg);
  }

  const data = { orderId, message, images: newArrImg, service };
  console.log("data:", data);

  const response = await fetchUpdateOrder(data);
  if (response) {
    handleResponse(response, "Заказ успешно создан!");
    closeOverlayAndLoader();
  }
}
