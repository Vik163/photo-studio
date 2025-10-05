import { $add, $class, $remove } from "@/utils/lib/getElement";
import { fetchAuth } from "@/utils/services/admin/fetchAuth";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { setAdminBlock } from "../admin-block/scripts/adminBlock";

const admin = $class("admin");
const auth = $class("auth");
const form = $class("auth__form", auth);
const input = $class("auth__input", form) as HTMLInputElement;
const submit = $class("auth__submit", form) as HTMLInputElement;
const text = $class("auth__info", auth);

export function setAuth(res?: { message: string }) {
  $remove("active", admin);
  $add("active", auth);
  $add("active", text);
  if (res?.message === "Не авторизован")
    text.textContent = "Неправильный пароль. Рискни ещё!";
}

async function sendPassword(e: Event) {
  e.preventDefault();
  openOverlayAndLoader("loader");

  const res = await fetchAuth(input.value);

  if (res && res.message === "Не авторизован") {
    setAuth(res);
    closeOverlayAndLoader();
  } else setAdminBlock();
}

export const setListenersAuth = () => {
  submit.addEventListener("click", sendPassword);
};
