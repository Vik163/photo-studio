import { $adminApi } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type {
  AdminFetchServiceData,
  AdminResServiceData,
} from "@/utils/types/admin-data-services";

export const fetchEditAdminServices = async (
  data: AdminFetchServiceData
): Promise<AdminResServiceData | string> => {
  try {
    const res: AdminResServiceData | string = (
      await $adminApi.put("services", data)
    ).data;

    return res;
  } catch (err) {
    return Messages.GET_ADMIN_UPDATE_ERROR;
  }
};
