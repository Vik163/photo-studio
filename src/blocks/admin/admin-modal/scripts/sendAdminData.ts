import { $class } from "@/utils/lib/getElement";
import type { TypeServices } from "@/utils/types/admin-data-services";
import { sendAdminOrder } from "../../admin-order/scripts/sendAdminOrder";
import { sendAdminService } from "../../admin-services/scripts/sendAdminService";

const modal = $class("admin-modal");
const form = $class("admin-modal__form", modal) as HTMLFormElement;

/**
 * Отправляет данные админ формы на сервер (сообщение и фотографии)
 * @param id - данные заказа { deviceId, orderId }
 */
export const sendAdminData = async (e: Event, id: string) => {
  e.preventDefault();

  const typeModal = id.split("/")[0];

  if (typeModal === "mail" || typeModal === "order") {
    await sendAdminOrder(id, form);
  } else sendAdminService(id as TypeServices, form, modal);
};
