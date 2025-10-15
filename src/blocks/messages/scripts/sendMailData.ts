import { handleResponseMessages } from "@/blocks/modals/modal/scripts/handleResponse";
import { $class } from "@/utils/lib/getElement";
import { fetchCreateMessage } from "@/utils/services/mails/fetchCreateMessage";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { v4 as uuidv4 } from "uuid";

const form = $class("modal__form") as HTMLFormElement;

export async function sendMailData() {
  openOverlayAndLoader("loader");
  const formData = new FormData(form);

  const name = formData.get("name")!;
  const phone = (formData.get("phone") as string).replace(/\D/g, "").slice(1); //только цифры без 7;
  const mail = formData.get("message")!;

  if (form.checkValidity()) {
    const orderId = uuidv4();

    const data = { orderId, name, phone, mail };
    const response = await fetchCreateMessage(data);

    if (response) {
      handleResponseMessages(
        "add",
        response,
        "Сообщение отправлено!",
        formData
      );
      closeOverlayAndLoader();
    }
  }
}
