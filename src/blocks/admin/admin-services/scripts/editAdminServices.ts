import { $add, $contains, $id, $remove } from "@/utils/lib/getElement";
import { TypeServices } from "@/utils/types/admin-data-services";
import { sendAdminService } from "./sendAdminService";
import { deleteAdminService } from "./deleteAdminService";

export const editAdminServices = async (e: Event, name: TypeServices) => {
  e.preventDefault();
  const target = e.target as HTMLElement;

  if (target.tagName === "BUTTON") {
    const containerPrice = target.parentElement! as HTMLFormElement;
    const inputPrice = $id("price", containerPrice) as HTMLInputElement;
    const container = $id(target.id) as HTMLElement;

    if ($contains("service-item__btn-edit", target)) {
      const text = inputPrice.placeholder;
      if ($contains("active", target)) {
        sendAdminService(name, containerPrice, container, target.id);
        $remove("active", target);
        $remove("active", inputPrice);
        inputPrice.setAttribute("disabled", "");
      } else {
        inputPrice.removeAttribute("disabled");
        inputPrice.value = text;
        inputPrice.focus();
        $add("active", inputPrice);
        $add("active", target);
      }
    } else deleteAdminService(target.id, name as TypeServices, container);
  }
};
