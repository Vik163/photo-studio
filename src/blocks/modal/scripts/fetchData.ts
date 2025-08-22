import {
  getImgFiles,
  resetImageUpload,
} from "@/blocks/upload-img/scripts/handleImageUpload";
import { $api } from "@/utils/api/axiosApi";
import { ORDER_STATE } from "@/utils/constants/storage";
import { $class } from "@/utils/lib/getElement";
import { openOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { closeModalAfterResult } from "./modal";
import { uploadBaketJbj } from "@/utils/lib/handleYaBaket";
import { readerFiles } from "@/utils/lib/readerFiles";

interface OrderData {
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
    console.log(value, key, parent);
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
  const phone = (formData.get("phone") as string).replace(/\s+/g, "");
  const message = formData.get("message")!;

  if (form.checkValidity()) {
    if (typeModal === "load") {
      const files = getImgFiles();
      let images = [];

      for (let file of files) {
        formData.append("images", file);

        const fileName = `${phone}-${file.name}`;

        const result = await readerFiles(file);

        if (result) {
          uploadBaketJbj(fileName, result);

          images.push(fileName);
        }
      }

      data = { name, phone, message, images, service };
      console.log("data:", data);

      // fetchData("Заказ создан!");
    } else {
      data = { name, phone, message, service: "Сообщение" };
      // fetchData("Сообщение отправлено!");
    }
  }
}
