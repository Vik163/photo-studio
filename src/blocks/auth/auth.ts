import { MAILS, ORDERS } from "@/utils/constants/storage";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import { setModalFormByType } from "../modals/modal/scripts/modal";

const authIcon = $class("header__auth");

export const setAuth = () => {
  const orders = localStorage.getItem(ORDERS);
  const mails = localStorage.getItem(MAILS);

  if (orders || mails) {
    $remove("active", authIcon);
  } else {
    $add("active", authIcon);
  }

  authIcon.addEventListener("click", () => setModalFormByType("auth"));
};
