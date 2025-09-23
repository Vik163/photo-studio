import { fetchAdminOrders } from "@/utils/services/admin/fetchAdminOrders";
import { $class } from "@/utils/lib/getElement";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { fetchAdminMessages } from "@/utils/services/admin/fetchAdminMessages";
import { Messages } from "@/utils/constants/messages";
import { ADMIN_DEVICE_ID, ORDERS_DATA } from "@/utils/constants/storage";
import type { AdminData, OrdersData, TypeData } from "@/utils/types/admin-data";
import { handleOrderPage } from "@/blocks/admin/admin-order/scripts/handleOrderPage";
import { setContent } from "./setContent";
import { getDataFromId } from "./getDataFromId";
import { urlMails, urlOrders } from "@/utils/constants/urls";
import { getDataCacheByName } from "@/utils/lib/dataCache";

const admin = $class("admin");
const errorOrders = $class("admin__error-orders", admin);
const errorMessages = $class("admin__error-messages", admin);

/**
 * Устанавливает в localStorage заказы и письма по id устройства
 * @param deviceId
 */
export async function setDataInStorage(deviceId: string): Promise<void> {
  const mailsData: AdminData[] = await getDataCacheByName(urlMails);
  const ordersData: AdminData[] = await getDataCacheByName(urlOrders);

  const mails = mailsData.find((item) => item.deviceId === deviceId)?.data!;
  const orders = ordersData.find((item) => item.deviceId === deviceId)?.data!;

  localStorage.setItem(ORDERS_DATA, JSON.stringify({ mails, orders }));
}

/**
 * Возвращает данные по типу и id заказа
 * если тип mail, возвращает: письмо по id, массив писем, и массив заказаов полученных по номеру телефона из письма
 * если тип order, возвращает: заказ по id, массив заказов, и массив писем полученных по номеру телефона из заказа
 */
export function getData(typePage: TypeData, orderId: string): OrdersData {
  const { mails, orders }: OrdersData = JSON.parse(
    localStorage.getItem(ORDERS_DATA)!
  );
  let numPhone: string;

  if (typePage === "mail") {
    const mail = mails?.find((item) => item.orderId === orderId)!;
    numPhone = mail.phone;

    const ordersByPhone = orders?.filter((item) => item.phone === numPhone);
    return { mail, mails, orders: ordersByPhone };
  } else {
    const order = orders?.find((item) => item.orderId === orderId)!;
    numPhone = order.phone;

    const mailsByPhone = mails?.filter((item) => item.phone === numPhone);
    return { mails: mailsByPhone, order, orders };
  }
}

/**
 * устанавливает данные определенного заказа при переходе к нему
 * устанавливает в localStorage id устройства
 * @param e
 */
async function clickAdmin(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;

  if (target.tagName === "BUTTON") {
    const { typePage, deviceId, orderId } = getDataFromId(target.id);
    await setDataInStorage(deviceId);

    localStorage.setItem(ADMIN_DEVICE_ID, deviceId);
    handleOrderPage(typePage, orderId);
  }
}

/**
 * устанавливает страницу админа: список заказов и список писем всех пользователей
 * добавляет данные заказов и писем в localStorage
 * вешает слушатель на всю страницу
 */
export const setAdminBlock = async () => {
  openOverlayAndLoader("loader");
  const resOrders = await fetchAdminOrders();
  const resMails = await fetchAdminMessages();

  if (resOrders && resMails) {
    errorMessages.textContent = Messages.GET_ADMIN_ORDER_MAIL_ERROR;
  }
  if (resOrders) {
    errorOrders.textContent = resOrders;
  } else {
    const resOrders: AdminData[] = await getDataCacheByName(urlOrders);

    setContent("order", resOrders);
  }

  if (resMails) {
    errorMessages.textContent = resMails;
  } else {
    const mailsData: AdminData[] = await getDataCacheByName(urlMails);

    setContent("mail", mailsData);
  }

  closeOverlayAndLoader();

  admin.addEventListener("click", clickAdmin);
};
