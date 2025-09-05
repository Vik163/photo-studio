import { $id } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { setElementsFromCloud } from "./handleImagesFromCloud";

const serviceInput = $id("service") as HTMLInputElement;
const messageInput = $id("message") as HTMLTextAreaElement;

export const setValuesModalForm = (order: Basket) => {
  setElementsFromCloud(order.images);

  serviceInput.value = order.service;
  messageInput.value = order.message!;
};
