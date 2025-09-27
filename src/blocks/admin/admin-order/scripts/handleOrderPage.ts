import { $add, $class, $remove, $toggle } from "@/utils/lib/getElement";
import type { OrdersData, TypeData } from "@/utils/types/admin-data";
import { ADMIN_DEVICE_ID, ORDERS_DATA } from "@/utils/constants/storage";
import { setContentFromData } from "./setContentFromData";
import { setContentListOrders } from "./setContentListOrders";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import { getData } from "../../admin-block/scripts/adminBlock";
import { changeStatus } from "./changeStatus";
import { setSelect } from "@/utils/ui/select/select";

const adminPage = $class("admin");
const orderPage = $class("order");
const containerMain = $class("order-main", orderPage);
const containerList = $class("order-list", orderPage);
const containerInfo = $class("order-info", orderPage);
const orderList = $class("order__list", orderPage);
const btnBackAdmin = $class("order__btn-back", orderPage);
const btnclose = $class("order__btn-close", containerInfo);
const btnEditStatus = $class("order__btn-status", containerMain);
const btnEditStatusInfo = $class("order__btn-status", containerInfo);
const btnSelectStatus = $class("select", containerMain);
const btnSelectStatusInfo = $class("select", containerInfo);

let userData: OrdersData;

/**
 * Возвращает на страницу админа
 * удаляет слушатели, id устройства и данные заказов из localStorage. Меняет классы
 */
function backAdmin() {
  $add("active", adminPage);
  $remove("active", orderPage);
  $remove("active", containerInfo);
  localStorage.removeItem(ADMIN_DEVICE_ID);
  localStorage.removeItem(ORDERS_DATA);

  removeListeners();
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

function closeOrder() {
  $remove("active", containerInfo);
}

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

  addListeners();
};

function addListeners() {
  btnBackAdmin.addEventListener("click", backAdmin);
  btnclose.addEventListener("click", closeOrder);
  orderList.addEventListener("click", openInfoOrder);
  btnEditStatus.addEventListener("click", () => changeStatus(containerMain));
  btnEditStatusInfo.addEventListener("click", () =>
    changeStatus(containerInfo)
  );
  btnSelectStatus.addEventListener("click", (e) => setSelect(e, containerMain));
  btnSelectStatusInfo.addEventListener("click", (e) =>
    setSelect(e, containerInfo)
  );
}

function removeListeners() {
  btnBackAdmin.removeEventListener("click", backAdmin);
  btnclose.removeEventListener("click", closeOrder);
  orderList.removeEventListener("click", openInfoOrder);
  btnEditStatus.removeEventListener("click", () => changeStatus(containerMain));
  btnEditStatusInfo.removeEventListener("click", () =>
    changeStatus(containerInfo)
  );
  btnSelectStatus.removeEventListener("click", (e) =>
    setSelect(e, containerMain)
  );
  btnSelectStatusInfo.removeEventListener("click", (e) =>
    setSelect(e, containerInfo)
  );
}
