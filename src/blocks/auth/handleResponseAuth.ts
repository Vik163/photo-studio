import { $class, $remove } from "@/utils/lib/getElement";
import {
  closeModalAfterResult,
  resetForm,
} from "../modals/modal/scripts/modal";
import { openModalInfo } from "../modals/modal-info/scripts/modal-info";
import { setBasket } from "../basket/scripts/basket";
import { setMessages } from "../messages/scripts/setMessages";
import { clearCacheEditForm } from "../modals/modal/scripts/handleImagesFromCloud";

export function handleResponseAuth(res: string, formData: FormData) {
  if (res === "Данные по вашим заказам получены") {
    const authIcon = $class("header__auth");

    closeModalAfterResult();
    openModalInfo("success", res);

    setBasket();
    setMessages();
    $remove("active", authIcon);
  } else {
    openModalInfo("fatal", res);
  }

  resetForm(formData);
  clearCacheEditForm();
}
