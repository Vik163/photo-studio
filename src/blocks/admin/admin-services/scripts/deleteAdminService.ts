import { Messages } from "@/utils/constants/messages";
import { handleErrors } from "@/utils/lib/handleErrors";
import { fetchDeleteAdminService } from "@/utils/services/admin/fetchDeleteAdminService";
import { TypeServices } from "@/utils/types/admin-data-services";

/**
 * Удаляет на сервере услугу обрабатывает ответ (удаляет ноду или выбрасывает ошибку)
 * @param serviceId id услуги
 * @param type "photo-na-dokumenty" | "photo-restavraciya" | "photo-dizain" | "ritual-photo"
 * @param container контейнер, где выбрасывается ошибка
 */
export async function deleteAdminService(
  serviceId: string,
  type: TypeServices,
  container: HTMLElement
) {
  const res = await fetchDeleteAdminService(serviceId, type);

  if (res === "ok") {
    container.remove();
  } else {
    handleErrors(Messages.DELETE_SERVICE_ERROR, container);
  }
}
