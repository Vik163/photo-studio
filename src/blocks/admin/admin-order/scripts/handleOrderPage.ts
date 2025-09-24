import { $add, $class, $remove } from "@/utils/lib/getElement";
import type { OrdersData, TypeData } from "@/utils/types/admin-data";
import { ADMIN_DEVICE_ID, ORDERS_DATA } from "@/utils/constants/storage";
import { setContentFromData } from "./setContentFromData";
import { setContentListOrders } from "./setContentListOrders";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import { getData } from "../../admin-block/scripts/adminBlock";

const adminPage = $class("admin");
const orderPage = $class("order");
const containerMain = $class("order-main", orderPage);
const containerList = $class("order-list", orderPage);
const containerInfo = $class("order-info", orderPage);
const orderList = $class("order__list", orderPage);
const btnBackAdmin = $class("order__btn-back", orderPage);
const btnclose = $class("order__btn-close", containerInfo);
const btnEditInfo = $class("order__btn-edit", containerInfo);

let userData: OrdersData;

/**
 * Возвращает на страницу админа
 * удаляет слушатели, id устройства и данные заказов из localStorage. Меняет классы
 */
function backAdmin() {
  btnBackAdmin.removeEventListener("click", backAdmin);
  btnclose.removeEventListener("click", closeOrder);
  orderList.removeEventListener("click", openInfoOrder);
  btnEditInfo.removeEventListener("click", editOrder);
  $add("active", adminPage);
  $remove("active", orderPage);
  $remove("active", containerInfo);
  localStorage.removeItem(ADMIN_DEVICE_ID);
  localStorage.removeItem(ORDERS_DATA);
}

/**
 * Открывает блок с дополнительной информацией по выбранному заказу или письму
 * @param e
 */
function openInfoOrder(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const { typePage, orderId } = getDataFromId(target.id);
  if (target.tagName === "BUTTON") {
    $add("active", containerInfo);
    setContentFromData(typePage, userData, containerInfo, orderId);
  } else console.log("arrKeys:");
}

/**
 * Меняет данные в блоке редактирования
 * Меняет список заказов или писем полученный по номеру телефона пользователя
 * убирает инфоблок
 * @param e Получает данные из id кнопки
 */
function editOrder(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const { typePage, orderId } = getDataFromId(target.id);
  const data = getData(typePage, orderId);
  $remove("active", containerInfo);
  setContentFromData(typePage, data, containerMain, orderId);
  setContentListOrders(typePage, data, containerList);
}

function closeOrder() {
  $remove("active", containerInfo);
}

function getImages() {}

/**
 * Устанавливает страницу заказа:
 * Данные заказа и список писем пользователя, найденных по телефону, или наоборот
 * Вешает слушатели
 * @param typePage
 * @param data
 */
export const handleOrderPage = (typePage: TypeData, orderId: string) => {
  userData = getData(typePage, orderId);
  $remove("active", adminPage);
  $add("active", orderPage);

  setContentFromData(typePage, userData, containerMain, orderId);
  setContentListOrders(typePage, userData, containerList);

  btnBackAdmin.addEventListener("click", backAdmin);
  btnclose.addEventListener("click", closeOrder);
  orderList.addEventListener("click", openInfoOrder);
  btnEditInfo.addEventListener("click", editOrder);
};
