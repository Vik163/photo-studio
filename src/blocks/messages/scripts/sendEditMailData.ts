import { handleResponseMessages } from "@/blocks/modals/modal/scripts/handleResponse";
import { $class } from "@/utils/lib/getElement";
import { fetchUpdateMail } from "@/utils/services/mails/fetchUpdateMail";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";

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
    handleResponseMessages(
      "update",
      response,
      "Сообщение успешно изменено!",
      formData
    );
    closeOverlayAndLoader();
  }
}
