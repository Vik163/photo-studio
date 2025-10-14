import { fetchAdminOrders } from "@/utils/services/admin/fetchAdminOrders";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { fetchAdminMessages } from "@/utils/services/admin/fetchAdminMessages";
import { ADMIN_DEVICE_ID } from "@/utils/constants/storage";
import type { AdminData } from "@/utils/types/admin-data-orders";
import { openOrderPage } from "@/blocks/admin/admin-order/scripts/handleOrderPage";
import { setContent } from "./setContent";
import { getDataFromId } from "./getDataFromId";
import { urlMails, urlOrders } from "@/utils/constants/admin/urls";
import { getDataCacheByName } from "@/utils/lib/dataCache";
import { setAdminServices } from "../../admin-services/scripts/setAdminServices";
import { handleErrors } from "@/utils/lib/handleErrors";
import { addListeners, addListenersModal } from "./addListenersAdmin";
import { setDataInStorage } from "./handleDataAdmin";

const admin = $class("admin");
const auth = $class("auth");
const text = $class("admin-error", auth);
const ordersBlock = $class("admin-orders", admin);

/**
 * устанавливает данные определенного заказа при переходе к нему
 * устанавливает в localStorage id устройства
 * @param e
 */
export async function clickAdmin(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;

  if (target.tagName === "BUTTON") {
    const { typePage, deviceId, orderId } = getDataFromId(target.id);
    await setDataInStorage(deviceId);

    localStorage.setItem(ADMIN_DEVICE_ID, deviceId);
    openOrderPage(typePage, orderId);
  }
}

/**
 * устанавливает страницу админа: список заказов и список писем всех пользователей
 * добавляет данные заказов и писем в localStorage
 * вешает слушатель на всю страницу
 */
export const setContentAdminBlock = async () => {
  openOverlayAndLoader("loader");
  const resOrdersData = await fetchAdminOrders();
  const resMailsData = await fetchAdminMessages();

  if (typeof resMailsData === "string") {
    handleErrors(resMailsData, ordersBlock, "admin__error-messages");
  } else {
    const resMails: AdminData[] = await getDataCacheByName(urlMails);
    setContent("mail", resMails);
  }
  if (typeof resOrdersData === "string") {
    handleErrors(resOrdersData, ordersBlock, "admin__error-orders");
  } else {
    const resOrders: AdminData[] = await getDataCacheByName(urlOrders);
    setContent("order", resOrders);
  }

  setAdminServices();

  closeOverlayAndLoader();
};

export const setAdminBlock = async () => {
  $add("active", admin);
  $remove("active", auth);
  $remove("active", text);
  await setContentAdminBlock();

  addListeners();
  addListenersModal();
};
