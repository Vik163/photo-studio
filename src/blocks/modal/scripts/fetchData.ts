import { getImgFiles } from "@/blocks/upload-img/scripts/handleImageUpload";
import { $api } from "@/utils/api/axiosApi";
import { ORDER_STATE } from "@/utils/constants/storage";
import { $class } from "@/utils/lib/getElement";
import { openOverlayAndLoader } from "@/utils/ui/overlay/overlay";
import { closeModalAfterResult } from "./modal";

const form = $class("modal__form") as HTMLFormElement;

export async function sendData(e: Event, typeModal: "mail" | "load") {
  e.preventDefault();

  openOverlayAndLoader("loader");

  const formData = new FormData(form);

  const name = formData.get("name");
  const service = formData.get("service");
  const phone = (formData.get("phone") as string).replace(/\s+/g, "");
  const message = formData.get("message");

  if (form.checkValidity()) {
    if (typeModal === "load") {
      const files = getImgFiles();

      for (let file of files) {
        formData.append("images", file);
      }

      const images = formData.getAll("images");

      const data = { name, phone, message, images, service };

      const answer = (await $api.post("/order", data)).data;
      if (answer) {
        console.log("answer:", answer);
        closeModalAfterResult("Заказ создан!");
        localStorage.setItem(ORDER_STATE, answer);
      }
    } else {
      const data = { name, phone, message };

      const answer = (await $api.post("/message", data)).data;
      if (answer === "saved") closeModalAfterResult("Сообщение отправлено!");
    }
  }
}
