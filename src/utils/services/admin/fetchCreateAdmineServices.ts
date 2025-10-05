import { $adminApi } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { AdminFetchServiceData } from "@/utils/types/admin-data-services";

export const fetchCreateAdminServices = async (data: AdminFetchServiceData) => {
  try {
    const res = (await $adminApi.post("services", data)).data;

    return res;
  } catch (err) {
    return Messages.GET_ADMIN_UPDATE_ERROR;
  }
};
