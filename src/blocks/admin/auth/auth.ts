import { $add, $class, $remove } from "@/utils/lib/getElement";
import { fetchAdminAuth } from "@/utils/services/admin/fetchAdminAuth";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { setAdminBlock } from "../admin-block/scripts/adminBlock";
import { handleErrors } from "@/utils/lib/handleErrors";

const admin = $class("admin");
const auth = $class("auth");
const form = $class("auth__form", auth);
const input = $class("auth__input", form) as HTMLInputElement;
const submit = $class("auth__submit", form) as HTMLInputElement;
const text = $class("admin-error", auth);

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

  const res = await fetchAdminAuth(input.value);
  console.log("res:", res);

  if (res === "Ошибка авторизации") {
    handleErrors(res, auth);
    closeOverlayAndLoader();
  } else if (res && res.message === "Не авторизован") {
    setAuth(res);
    closeOverlayAndLoader();
  } else setAdminBlock();
}

export const setListenersAuth = () => {
  submit.addEventListener("click", sendPassword);
};
