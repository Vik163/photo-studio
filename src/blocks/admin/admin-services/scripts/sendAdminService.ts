import { handleErrors } from "@/utils/lib/handleErrors";
import { fetchEditAdminServices } from "@/utils/services/admin/fetchEditAdmineServices";
import type {
  AdminFetchServiceData,
  TypeServices,
} from "@/utils/types/admin-data-services";
import { closeModal } from "../../admin-modal/scripts/setAdminModal";
import { updateContentOneService } from "./updateContentOneService";

/**
 * Отправляет на сервер данные новой или изменённой услуги
 * обрабатывает ответ
 * @param type "photo-na-dokumenty" | "photo-restavraciya" | "photo-dizain" | "retual-photo"
 * @param formEl форма
 * @param errorContainer контейнер где выбрасывается ошибка
 * @param id услуги
 */
export async function sendAdminService(
  type: TypeServices,
  formEl: HTMLFormElement,
  errorContainer: HTMLElement,
  id?: string
) {
  const formData = new FormData(formEl);
  const service = formData.get("service")!;
  const price = formData.get("price")!;

  const data: AdminFetchServiceData = {
    type,
    id: id,
    value: service,
    price,
  };

  const res = await fetchEditAdminServices(data);

  if (typeof res === "string") {
    handleErrors(res, errorContainer);
  } else {
    closeModal();
    updateContentOneService(res);
  }
}
