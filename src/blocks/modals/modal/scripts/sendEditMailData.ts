import { $class } from "@/utils/lib/getElement";
import { fetchUpdateMail } from "@/utils/services/fetchUpdateMail";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { handleResponseMessages } from "./handleResponse";

const form = $class("modal__form") as HTMLFormElement;
let formData: FormData;

/**
 * Отправка данных формы редактирования
 */
export async function sendEditMailData() {
  openOverlayAndLoader("loader");
  formData = new FormData(form);

  const mail = formData.get("message")!;

  const data = { orderId: form.id, mail };

  const response = await fetchUpdateMail(data);
  if (response) {
    handleResponseMessages(response, "Сообщение успешно изменено!", formData);
    closeOverlayAndLoader();
  }
}
