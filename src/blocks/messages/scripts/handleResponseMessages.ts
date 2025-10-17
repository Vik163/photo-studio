import type { Basket } from "@/utils/types/fetch-data";
import { openModalInfo } from "../../modals/modal-info/scripts/modal-info";
import { changeDataInStorage } from "@/utils/lib/changeDataInStorage";
import { setMessagesData } from "@/blocks/messages/scripts/setMessages";
import {
  closeModalAfterResult,
  resetForm,
} from "../../modals/modal/scripts/modal";
import { clearCacheEditForm } from "../../modals/modal/scripts/handleImagesFromCloud";

export function handleResponseMessages(
  type: "update" | "delete" | "add",
  res: Basket | string,
  textModalInfo: string,
  formData: FormData
) {
  if (typeof res === "string") {
    openModalInfo("fatal", res);
  } else {
    const messages = changeDataInStorage(type, res, "MAILS");
    setMessagesData(messages);

    closeModalAfterResult();
    openModalInfo("success", textModalInfo);
  }

  resetForm(formData);
  clearCacheEditForm();
}
