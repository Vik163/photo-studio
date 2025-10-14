import { $class, $id } from "@/utils/lib/getElement";
import { handleErrors } from "@/utils/lib/handleErrors";
import type { StatusOrder } from "@/utils/types/fetch-data";

const modal = $class("admin-modal");
const form = $class("admin-modal__form", modal) as HTMLFormElement;
const status = $class("admin-modal__status", form) as HTMLElement;
const error = $class("modal__error", modal) as HTMLElement;

const text = $id("message", form) as HTMLTextAreaElement;

export function handleStatusModal(value: string) {
  if (value === "Отложен") {
    text.value = "";
  }
  if (value === "Отменён") {
    text.value = "";
  }
}

export const checkErrorSendStatus = (
  status: StatusOrder,
  mailAdmin: FormDataEntryValue
): Boolean => {
  if (status === "Отменён" && !Boolean(mailAdmin)) {
    handleErrors("Заказ удалится. Необходимо объяснить причину клиенту", modal);
    return true;
  } else if (status === "Отложен" && !Boolean(mailAdmin)) {
    handleErrors("Необходимо объяснить причину клиенту", modal);
    return true;
  } else return false;
};
