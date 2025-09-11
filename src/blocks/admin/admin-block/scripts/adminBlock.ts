import { fetchOrders } from "@/utils/services/fetchOrders";
import { handleErrors } from "./handleErrors";
import { $class } from "@/utils/lib/getElement";
import { handleOrdersData } from "./handleOrdersData";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";

const admin = $class("admin");
const error = $class("admin__error", admin);

function clickAdmin(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;

  if (target.tagName === "BUTTON") {
    console.log(target.id);
  }
}

export const setAdminBlock = async () => {
  openOverlayAndLoader("loader");
  const res = await fetchOrders();

  if (typeof res === "string") {
    handleErrors(error, res);
    closeOverlayAndLoader();
  } else {
    handleOrdersData(res);
    closeOverlayAndLoader();

    admin.addEventListener("click", clickAdmin);
  }
};
