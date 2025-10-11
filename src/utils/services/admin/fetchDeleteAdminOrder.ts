import { $adminApi } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";

export const fetchDeleteAdminOrder = async (
  deviceId: string,
  id: string,
  mailAdmin: FormDataEntryValue
): Promise<string> => {
  try {
    const data = {
      deviceId,
      mailAdmin,
    };

    const res: string | null = (
      await $adminApi.delete(`/orders/${id}`, { data })
    ).data;

    if (res) {
      return res;
    } else return Messages.DELETE_ORDER_ERROR;
  } catch (err) {
    return Messages.DELETE_ORDER_ERROR;
  }
};
