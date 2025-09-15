import { $add, $class, $remove } from "@/utils/lib/getElement";
import type { OneOrder } from "@/utils/types/fetch-admin-data";

const adminPage = $class("admin");
const orderPage = $class("order");
const btnBackAdmin = $class("order__btn-back", orderPage);

function backAdmin() {
  btnBackAdmin.removeEventListener("click", backAdmin);
  $add("active", adminPage);
  $remove("active", orderPage);
}

export const setOrderPage = (typePage: "mail" | "order", order: OneOrder) => {
  $remove("active", adminPage);
  $add("active", orderPage);
  console.log("order:", order);

  btnBackAdmin.addEventListener("click", backAdmin);
};
