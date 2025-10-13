import { $class } from "@/utils/lib/getElement";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import { uploadAdminImages } from "../../admin-modal/scripts/uploadAdminImages";
import { ADMIN_ORDER_STATUS } from "@/utils/constants/storage";
import type { StatusOrder } from "@/utils/types/fetch-data";
import type { AdminUpdateData } from "@/utils/types/admin-data-orders";
import { fetchUpdateAdminDataOrder } from "@/utils/services/admin/fetchUpdateAdminDataOrder";
import { handleErrors } from "@/utils/lib/handleErrors";
import { closeModal } from "../../admin-modal/scripts/setAdminModal";
import { handleResponseEditAdmin } from "./handleResponseEditAdmin";
import { checkErrorSendStatus } from "../../admin-modal/scripts/checkSendStatus";
import { deleteAdminOrder } from "./deleteAdminOrder";
import { Messages } from "@/utils/constants/messages";

const modal = $class("admin-modal");

/**
 * Отправляет данные отредактированного заказа
 * Собирает данные из формы и изображения и отправляет на сервер
 * обрабатывает ответ
 * @param id данные заказа { deviceId, orderId }
 * @param form
 */
export async function sendAdminOrder(id: string, form: HTMLFormElement) {
  const { deviceId, orderId } = getDataFromId(id);
  const formData = new FormData(form);
  const mailAdmin = formData.get("message")!;
  const images = await uploadAdminImages(orderId);
  const status =
    ($class("select__text", modal).textContent as StatusOrder) ||
    localStorage.getItem(ADMIN_ORDER_STATUS);

  if (!checkErrorSendStatus(status, mailAdmin)) {
    const data: AdminUpdateData = {
      deviceId,
      orderId,
      mailAdmin,
      completedImages: images,
      status,
    };

    if (status === "Отменён") {
      await deleteAdminOrder(orderId, mailAdmin);
    } else {
      const res = await fetchUpdateAdminDataOrder(data);

      handleResponseEditAdmin(res);
    }
  }
}
