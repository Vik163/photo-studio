import { $add, $class, $toggle } from "@/utils/lib/getElement";
import { fetchUpdateAdminDataOrder } from "@/utils/services/admin/fetchUpdateAdminDataOrder";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import { getNewValueSelect } from "@/utils/ui/select/select";
import type { AdminUpdateData } from "@/utils/types/admin-data";
import { setStylesStatus } from "../../admin-block/scripts/setStylesDateAndStatus";
import { handleErrors } from "../../../../utils/lib/handleErrors";

export const changeAdminData = async (
  btnId: string,
  container: HTMLElement
) => {
  const statusEl = $class("order__status", container);
  const newStatus = getNewValueSelect();

  const { typePage, deviceId, orderId } = getDataFromId(btnId);
  const data: AdminUpdateData = {
    deviceId,
    orderId,
    status: newStatus || undefined,
  };

  const res = await fetchUpdateAdminDataOrder(data);

  if (typeof res === "string") {
    handleErrors(res, container);
  } else {
    const status = res.status!;
    if (status) statusEl.textContent = status;
    setStylesStatus(status, statusEl);
    const mailAdmin = res.mailAdmin;
    const complitImages = res.completedImages;

    console.log("i", res);
  }
};

export const getNewStatus = () => {
  return;
};
