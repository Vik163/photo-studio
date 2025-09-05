import { CONTROL_TOKEN } from "@/utils/constants/cookies";
import { getCookie } from "@/utils/lib/getCookie";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import { fetchAuth } from "@/utils/services/fetchAuth";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";

const admin = $class("admin");
const auth = $class("auth");
const form = $class("auth__form", auth);
const input = $class("auth__input", form) as HTMLInputElement;
const submit = $class("auth__submit", form) as HTMLInputElement;
const text = $class("auth__info", auth);

export function setAuthOrAdmin(res?: { message: string }) {
  const controlToken = getCookie(CONTROL_TOKEN);
  if (controlToken) {
    $add("active", admin);
    $remove("active", auth);
    $remove("active", text);
  } else {
    $remove("active", admin);
    $add("active", auth);
    $add("active", text);
    if (res?.message === "Не авторизован")
      text.textContent = "Неправильный пароль. Рискни ещё!";
  }
}

async function sendPassword(e: Event) {
  e.preventDefault();
  openOverlayAndLoader("loader");

  const res = await fetchAuth(input.value);

  if (res) {
    setAuthOrAdmin(res);
    closeOverlayAndLoader();
  }
}

export const setListenersAuth = () => {
  submit.addEventListener("click", sendPassword);
};
