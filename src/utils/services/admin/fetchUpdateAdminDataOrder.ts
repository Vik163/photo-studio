import { $adminApi } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { AdminUpdateData, OneOrder } from "@/utils/types/admin-data";

export const fetchUpdateAdminDataOrder = async (
  data: AdminUpdateData
): Promise<OneOrder | string> => {
  try {
    if (data.completedImages || data.status) {
      const order = (await $adminApi.put("", data)).data;

      return order;
    } else {
      const mail = (await $adminApi.put("", data)).data;

      return mail;
    }
  } catch (err) {
    return Messages.GET_ADMIN_UPDATE_ERROR;
  }
};
