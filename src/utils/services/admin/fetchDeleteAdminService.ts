import { $adminApi } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import { TypeServices } from "@/utils/types/admin-data-services";

/**
 * Удаляет услугу через запрос с id и query-параметрами
 * @param serviceId
 * @param typeService  отправляется в query
 * @returns возвращает 'ok' или ошибку
 */
export async function fetchDeleteAdminService(
  serviceId: string,
  typeService: TypeServices
): Promise<string> {
  try {
    const params = {
      type: typeService,
    };

    const res: string = (
      await $adminApi.delete(`services/${serviceId}`, {
        params,
      })
    ).data;

    if (res) {
      return res;
    } else return Messages.DELETE_SERVICE_ERROR;
  } catch (err) {
    return Messages.DELETE_SERVICE_ERROR;
  }
}
