import { Messages } from "@/utils/constants/messages";
import { ORDERS_DATA } from "@/utils/constants/storage";
import { handleErrors } from "@/utils/lib/handleErrors";
import { delBaketObj } from "@/utils/lib/handleYaBaket";
import { fetchDeleteAdminOrder } from "@/utils/services/admin/fetchDeleteAdminOrder";
import type { OrdersData } from "@/utils/types/admin-data-orders";
import { closeModal } from "../../admin-modal/scripts/setAdminModal";
import { $class } from "@/utils/lib/getElement";
import { backAdmin } from "./handleOrderPage";

const modal = $class("admin-modal");

export const deleteAdminOrder = async (
  orderId: string,
  mailAdmin: FormDataEntryValue
) => {
  const orderData: OrdersData = JSON.parse(localStorage.getItem(ORDERS_DATA)!);
  const order = orderData.orders?.find((order) => order.orderId === orderId)!;
  let arr = [];
  for await (const img of order.images!) {
    const statusCode = await delBaketObj(img);
    arr.push(statusCode);
  }

  if (arr.length === order.images?.length) {
    const res = await fetchDeleteAdminOrder(order.orderId, mailAdmin);

    if (res !== "ok") {
      handleErrors(Messages.DELETE_ORDER_ERROR, modal);
    } else {
      closeModal();
      backAdmin();
    }
  }
};
