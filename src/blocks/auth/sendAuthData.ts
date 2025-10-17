import { $class } from "@/utils/lib/getElement";
import { fetchAuth } from "@/utils/services/fetchAuth";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { handleResponseAuth } from "./handleResponseAuth";

const form = $class("modal__form") as HTMLFormElement;

export async function sendAuthData() {
  openOverlayAndLoader("loader");
  const formData = new FormData(form);

  const phone = (formData.get("phone") as string).replace(/\D/g, "").slice(1); //только цифры без 7;

  if (form.checkValidity()) {
    const data = { phone };
    const response = await fetchAuth(data);

    if (response) {
      handleResponseAuth(response, formData);
      closeOverlayAndLoader();
    }
  }
}
