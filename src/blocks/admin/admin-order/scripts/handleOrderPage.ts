import { $add, $class, $remove } from "@/utils/lib/getElement";
import type { OrdersData, TypeData } from "@/utils/types/admin-data-orders";
import {
  ADMIN_DEVICE_ID,
  ADMIN_ORDER_MAIL,
  ADMIN_ORDER_STATUS,
  ADMIN_ORDERS_BLOCK,
  ORDERS_DATA,
} from "@/utils/constants/storage";
import { setContentFromData } from "./setContentFromData";
import { setContentListOrders } from "./setContentListOrders";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import {
  getData,
  setContentAdminBlock,
} from "../../admin-block/scripts/adminBlock";

const adminPage = $class("admin");
const orderPage = $class("order");
const containerMain = $class("order-main", orderPage);
const containerList = $class("order-list", orderPage);
const containerInfo = $class("order-info", orderPage);
const errorMain = $class("order__error", containerMain);
const errorInfo = $class("order__error", containerInfo);

let userData: OrdersData;

/**
 * Возвращает на страницу админа
 * удаляет слушатели, id устройства и данные заказов из localStorage. Меняет классы
 */
export function backAdmin() {
  $add("active", adminPage);
  $remove("active", orderPage);
  $remove("active", containerInfo);
  $remove("active", errorInfo);
  $remove("active", errorMain);

  localStorage.removeItem(ADMIN_DEVICE_ID);
  localStorage.removeItem(ORDERS_DATA);
  localStorage.removeItem(ADMIN_ORDERS_BLOCK);
  localStorage.removeItem(ADMIN_ORDER_STATUS);
  localStorage.removeItem(ADMIN_ORDER_MAIL);

  setContentAdminBlock();
}

/**
 * Открывает блок с дополнительной информацией по выбранному заказу или письму
 * @param e
 */
export function openInfoOrder(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const { typePage, orderId } = getDataFromId(target.id);
  if (target.tagName === "BUTTON") {
    $add("active", containerInfo);
    setContentFromData(typePage, userData, containerInfo, orderId);
  } else console.log("arrKeys:");
}

export function closeInfoOrder() {
  $remove("active", errorInfo);
  $remove("active", containerInfo);
}

/**
 * Устанавливает страницу заказа:
 * Данные заказа и список писем пользователя, найденных по телефону, или наоборот
 * Вешает слушатели
 * @param typePage
 * @param data
 */
export const openOrderPage = (typePage: TypeData, orderId: string) => {
  userData = getData(typePage, orderId);
  $remove("active", adminPage);
  $add("active", orderPage);

  setContentFromData(typePage, userData, containerMain, orderId);
  setContentListOrders(typePage, userData, containerList);
};
