import { fetchAdminOrders } from "@/utils/services/admin/fetchAdminOrders";
import { $add, $class, $remove } from "@/utils/lib/getElement";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { fetchAdminMessages } from "@/utils/services/admin/fetchAdminMessages";
import { Messages } from "@/utils/constants/messages";
import {
  ADMIN_DEVICE_ID,
  ADMIN_ORDERS_BLOCK,
  ORDERS_DATA,
} from "@/utils/constants/storage";
import type {
  AdminData,
  OrdersData,
  TypeData,
} from "@/utils/types/admin-data-orders";
import {
  backAdmin,
  closeInfoOrder,
  openOrderPage,
  openInfoOrder,
} from "@/blocks/admin/admin-order/scripts/handleOrderPage";
import { setContent } from "./setContent";
import { getDataFromId } from "./getDataFromId";
import { urlMails, urlOrders, urlServices } from "@/utils/constants/admin/urls";
import { getDataCacheByName } from "@/utils/lib/dataCache";
import {
  handleOptionsSelect,
  openOptionsSelect,
} from "@/utils/ui/select/select";
import {
  closeModal,
  setAdminModal,
} from "../../admin-modal/scripts/setAdminModal";
import { setListenersImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import {
  deleteImages,
  openAdminGallery,
} from "../../admin-order/scripts/handleImages";
import { setAdminServices } from "../../admin-services/scripts/setAdminServices";
import { sendAdminData } from "../../admin-modal/scripts/sendAdminData";

const admin = $class("admin");
const auth = $class("auth");
const text = $class("auth__info", auth);
const btnAdmin = $class("admin-orders", admin);
const errorOrders = $class("admin__error-orders", admin);
const errorMessages = $class("admin__error-messages", admin);
const orderPage = $class("order");
const containerMain = $class("order-main", orderPage);
const containerInfo = $class("order-info", orderPage);
const orderList = $class("order__list", orderPage);
const btnBackAdmin = $class("btn__back", orderPage);
const btnEdit = $class("order__btn-edit", containerMain);
const btnEditInfo = $class("order__btn-edit", containerInfo);
const btnClose = $class("order__btn-close", containerInfo);
const modal = $class("admin-modal");
const uploadImg = $class("admin-modal__upload", modal);
const btnModalClose = $class("admin-modal__btn-close", modal);
const btnSelectStatus = $class("select__btn", modal);
const btnOptionStatus = $class("select__list", modal);
const btnModalSubmit = $class("modal__btn-submit", modal);
const imagesAdmin = $class("order__images-admin", containerMain);
const imagesAdminInfo = $class("order__images-admin", containerInfo);
const btnGalleryAdmin = $class("upload__btn-admin-gallery", containerMain);
const btnGalleryAdminInfo = $class("upload__btn-admin-gallery", containerInfo);
const btnGalleryUser = $class("upload__btn-gallery", containerMain);
const btnGalleryUserInfo = $class("upload__btn-gallery", containerInfo);

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

function addListeners() {
  btnAdmin.addEventListener("click", clickAdmin);
  btnBackAdmin.addEventListener("click", backAdmin);
  btnClose.addEventListener("click", closeInfoOrder);
  orderList.addEventListener("click", openInfoOrder);

  imagesAdmin.addEventListener("click", (e) =>
    deleteImages(e, imagesAdmin.id, containerMain)
  );
  imagesAdminInfo.addEventListener("click", (e) =>
    deleteImages(e, imagesAdminInfo.id, containerInfo)
  );
  btnGalleryAdmin.addEventListener("click", () => openAdminGallery("admin"));
  btnGalleryAdminInfo.addEventListener("click", () =>
    openAdminGallery("admin")
  );
  btnGalleryUser.addEventListener("click", () => openAdminGallery("client"));
  btnGalleryUserInfo.addEventListener("click", () =>
    openAdminGallery("client")
  );
}

function addListenersModal() {
  setListenersImageUpload(uploadImg);

  btnEdit.addEventListener("click", () => {
    localStorage.setItem(ADMIN_ORDERS_BLOCK, "main");
    setAdminModal(btnEdit.id);
  });
  btnEditInfo.addEventListener("click", () => {
    localStorage.setItem(ADMIN_ORDERS_BLOCK, "info");
    setAdminModal(btnEditInfo.id);
  });

  btnSelectStatus.addEventListener("click", () => {
    const container = $class("select", modal);
    openOptionsSelect(container);
  });
  btnOptionStatus.addEventListener("click", (e) => {
    const container = $class("select", modal);
    handleOptionsSelect(e, container);
  });
  btnModalClose.addEventListener("click", closeModal);
  btnModalSubmit.addEventListener("click", (e) =>
    sendAdminData(e, btnModalSubmit.id)
  );
}
