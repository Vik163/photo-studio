import { $class } from "@/utils/lib/getElement";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import type { AdminUpdateData } from "@/utils/types/admin-data-orders";
import type {
  AdminFetchServiceData,
  TypeServices,
} from "@/utils/types/admin-data-services";
import { fetchUpdateAdminDataOrder } from "@/utils/services/admin/fetchUpdateAdminDataOrder";
import { handleResponseEditAdmin } from "../../admin-order/scripts/handleResponseEditAdmin";
import { handleErrors } from "@/utils/lib/handleErrors";
import type { StatusOrder } from "@/utils/types/fetch-data";
import { ADMIN_ORDER_STATUS } from "@/utils/constants/storage";
import { closeModal } from "./setAdminModal";
import { uploadAdminImages } from "./uploadAdminImages";
import { fetchCreateAdminServices } from "@/utils/services/admin/fetchCreateAdmineServices";
import { fetchUpdateAdminServices } from "@/utils/services/admin/fetchUpdateAdminServices";

const modal = $class("admin-modal");
const form = $class("admin-modal__form", modal) as HTMLFormElement;

async function sendAdminOrder(id: string) {
  const { deviceId, orderId } = getDataFromId(id);
  const formData = new FormData(form);
  const mailAdmin = formData.get("message")!;
  const images = await uploadAdminImages(orderId);
  const status =
    ($class("select__text", modal).textContent as StatusOrder) ||
    localStorage.getItem(ADMIN_ORDER_STATUS);

  const data: AdminUpdateData = {
    deviceId,
    orderId,
    mailAdmin,
    completedImages: images,
    status,
  };

  const res = await fetchUpdateAdminDataOrder(data);
  if (typeof res === "string") {
    handleErrors(res, modal);
  } else {
    closeModal();
    handleResponseEditAdmin(res);
  }
}

async function sendAdminService(id: TypeServices) {
  const formData = new FormData(form);
  const service = formData.get("service")!;
  const price = formData.get("price")!;
  // const images = await uploadAdminImages(orderId);

  const data: AdminFetchServiceData = {
    [id]: {
      service,
      price,
    },
  };

  console.log("data:", data);
  if (data.service) {
    const res = await fetchCreateAdminServices(data);
  } else {
    const res = await fetchUpdateAdminServices(data);
  }
  // if (typeof res === "string") {
  //   handleErrors(res, modal);
  // } else {
  //   closeModal();
  //   handleResponseEditAdmin(res);
  // }
}

/**
 * Отправляет данные админ формы на сервер (сообщение и фотографии)
 * @param id - данные заказа { deviceId, orderId }
 */
export const sendAdminData = async (e: Event, id: string) => {
  e.preventDefault();

  const typeModal = id.split("/")[0];

  if (typeModal === "mail" || typeModal === "order") {
    await sendAdminOrder(id);
  } else sendAdminService(id as TypeServices);
};
