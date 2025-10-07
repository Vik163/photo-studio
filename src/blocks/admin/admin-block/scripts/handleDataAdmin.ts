import { urlMails, urlOrders } from "@/utils/constants/admin/urls";
import { ORDERS_DATA } from "@/utils/constants/storage";
import { getDataCacheByName } from "@/utils/lib/dataCache";
import type {
  AdminData,
  OrdersData,
  TypeData,
} from "@/utils/types/admin-data-orders";

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
