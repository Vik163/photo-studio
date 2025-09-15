import { fetchAdminOrders } from "@/utils/services/admin/fetchAdminOrders";
import { handleErrors } from "./handleErrors";
import { $class } from "@/utils/lib/getElement";
import { handleOrdersData } from "./handleOrdersData";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { handleMailsData } from "./handleMailsData";
import { fetchAdminMessages } from "@/utils/services/admin/fetchAdminMessages";
import { Messages } from "@/utils/constants/messages";
import { ADMIN_MAILS } from "@/utils/constants/storage";
import { AdminMessages, OneOrder } from "@/utils/types/fetch-admin-data";
import { setOrderPage } from "./setOrderPage";

const admin = $class("admin");
const errorOrders = $class("admin__error-orders", admin);
const errorMessages = $class("admin__error-messages", admin);

function handleMail(deviceId: string, orderId: string) {
  const mails: AdminMessages[] = JSON.parse(localStorage.getItem(ADMIN_MAILS)!);
  const mailData = mails
    .find((item) => item.deviceId === deviceId)
    ?.messages.find((item) => item.orderId === orderId)!;
  setOrderPage("mail", mailData);
}
function handleOrder(deviceId: string, orderId: string) {
  console.log("order", deviceId, orderId);
}

function clickAdmin(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const arrKeys = target.id.split("/");
  const type = arrKeys[0];
  const deviceId = arrKeys[1];
  const orderId = arrKeys[2];

  if (target.tagName === "BUTTON") {
    if (type === "mail") {
      handleMail(deviceId, orderId);
    } else {
      handleOrder(deviceId, orderId);
    }
  }
}

export const setAdminBlock = async () => {
  openOverlayAndLoader("loader");
  const resOrders = await fetchAdminOrders();
  const resMails = await fetchAdminMessages();

  if (typeof resOrders === "string" && typeof resMails === "string") {
    handleErrors(errorMessages, Messages.GET_ADMIN_ORDER_MAIL_ERROR);
  }
  if (typeof resOrders === "string") {
    handleErrors(errorOrders, resOrders);
  } else handleOrdersData(resOrders);

  if (typeof resMails === "string") {
    handleErrors(errorMessages, resMails);
  } else {
    handleMailsData(resMails);
    localStorage.setItem(ADMIN_MAILS, JSON.stringify(resMails));
  }

  closeOverlayAndLoader();

  admin.addEventListener("click", clickAdmin);
};
