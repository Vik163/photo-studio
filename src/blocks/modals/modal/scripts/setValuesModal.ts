import { setElementsFromCloud } from "@/blocks/modals/modal/scripts/handleImageDataFromCloud";
import { $id } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";

const serviceInput = $id("service-input") as HTMLInputElement;
const messageInput = $id("modal-message") as HTMLTextAreaElement;

export const setValuesModalForm = (order: Basket) => {
  setElementsFromCloud(order.images);

  serviceInput.value = order.service;
  messageInput.value = order.message!;
};
