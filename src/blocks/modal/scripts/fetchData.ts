import {
  getImgFiles,
  resetImageUpload,
} from "@/blocks/upload-img/scripts/handleImageUpload";
import { v4 as uuidv4 } from "uuid";
import { $api } from "@/utils/api/axiosApi";
import { ORDER_STATE } from "@/utils/constants/storage";
import { $class } from "@/utils/lib/getElement";
import { openOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { closeModalAfterResult } from "./modal";
import { uploadBaketJbj } from "@/utils/lib/handleYaBaket";
import { readerFiles } from "@/utils/lib/readerFiles";

interface OrderData {
  orderId: string;
  name: FormDataEntryValue;
  phone: FormDataEntryValue;
  message?: FormDataEntryValue;
  images?: FormDataEntryValue[];
  service: FormDataEntryValue;
}

// let reader = new FileReader();

const form = $class("modal__form") as HTMLFormElement;
let data: OrderData | null = null;
let formData: FormData;

function resetForm() {
  form.reset();

  formData.forEach((value, key, parent) => {
    formData.delete(key);
  });
  resetImageUpload();
}

async function fetchData(text: string) {
  const answer = (await $api.post("/order", data)).data;
  if (answer) {
    console.log("answer:", answer);
    closeModalAfterResult(text);
    localStorage.setItem(ORDER_STATE, answer);

    resetForm();
  }
}

export async function sendData(e: Event, typeModal: "mail" | "load") {
  e.preventDefault();

  // openOverlayAndLoader("loader");
  formData = new FormData(form);

  const name = formData.get("name")!;
  const service = formData.get("service")!;
  const phone = (formData.get("phone") as string).replace(/\D/g, "").slice(1); //только цифры без 7;
  const message = formData.get("message")!;

  if (form.checkValidity()) {
    const orderId = uuidv4();
    if (typeModal === "load") {
      const files = getImgFiles();
      let images = [];

      for (let file of files) {
        const fileName = `${orderId}/${file.name}`;

        const result = await readerFiles(file);

        if (result) {
          uploadBaketJbj(fileName, result);

          images.push(fileName);
        }
      }

      data = { orderId, name, phone, message, images, service };

      fetchData("Заказ создан!");
    } else {
      data = { orderId, name, phone, message, service: "Сообщение" };
      fetchData("Сообщение отправлено!");
    }
  }
}
