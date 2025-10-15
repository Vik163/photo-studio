import { handleResponseMessages } from "@/blocks/modals/modal/scripts/handleResponse";
import { $class } from "@/utils/lib/getElement";
import { fetchAuth } from "@/utils/services/fetchAuth";
import { fetchCreateMessage } from "@/utils/services/mails/fetchCreateMessage";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { v4 as uuidv4 } from "uuid";

const form = $class("modal__form") as HTMLFormElement;

export async function sendAuthData() {
  openOverlayAndLoader("loader");
  const formData = new FormData(form);

  const phone = (formData.get("phone") as string).replace(/\D/g, "").slice(1); //только цифры без 7;

  if (form.checkValidity()) {
    const data = { phone };
    const response = await fetchAuth(data);

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
