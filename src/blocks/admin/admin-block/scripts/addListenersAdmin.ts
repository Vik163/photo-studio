import { $class } from "@/utils/lib/getElement";
import { clickAdmin } from "./adminBlock";
import {
  backAdmin,
  closeInfoOrder,
  openInfoOrder,
} from "../../admin-order/scripts/handleOrderPage";
import {
  deleteImages,
  openAdminGallery,
} from "../../admin-order/scripts/handleImages";
import { setListenersImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import { ADMIN_ORDERS_BLOCK } from "@/utils/constants/storage";
import {
  closeModal,
  openAdminModal,
} from "../../admin-modal/scripts/setAdminModal";
import { openOptionsSelect } from "@/utils/ui/select/select";
import { sendAdminData } from "../../admin-modal/scripts/sendAdminData";
import { handleStatusModal } from "../../admin-modal/scripts/checkSendStatus";

const admin = $class("admin");
const ordersBlock = $class("admin-orders", admin);
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
const btnSelectStatus = $class("select__btn", modal) as HTMLButtonElement;
const btnOptionStatus = $class("select__list", modal) as HTMLButtonElement;
const btnModalSubmit = $class("modal__btn-submit", modal);
const imagesAdmin = $class("order__images-admin", containerMain);
const imagesAdminInfo = $class("order__images-admin", containerInfo);
const btnGalleryAdmin = $class("upload__btn-admin-gallery", containerMain);
const btnGalleryAdminInfo = $class("upload__btn-admin-gallery", containerInfo);
const btnGalleryUser = $class("upload__btn-gallery", containerMain);
const btnGalleryUserInfo = $class("upload__btn-gallery", containerInfo);

export function addListeners() {
  ordersBlock.addEventListener("click", clickAdmin);
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

export function addListenersModal() {
  setListenersImageUpload(uploadImg);

  btnEdit.addEventListener("click", () => {
    localStorage.setItem(ADMIN_ORDERS_BLOCK, "main");
    openAdminModal(btnEdit.id);
  });
  btnEditInfo.addEventListener("click", () => {
    localStorage.setItem(ADMIN_ORDERS_BLOCK, "info");
    openAdminModal(btnEditInfo.id);
  });

  btnSelectStatus.addEventListener("click", () => {
    openOptionsSelect(modal);
  });

  btnModalClose.addEventListener("click", closeModal);
  btnModalSubmit.addEventListener("click", (e) =>
    sendAdminData(e, btnModalSubmit.id)
  );
}
