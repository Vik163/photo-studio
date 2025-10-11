import { $class, $id } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { setElementsFromCloud } from "./handleImagesFromCloud";

const form = $class("modal__form") as HTMLFormElement;
const serviceInput = $id("service", form) as HTMLInputElement;
const messageInput = $id("message", form) as HTMLTextAreaElement;
const container = $class("upload__images")!;

export const setValuesOrderModalForm = (order: Basket) => {
  setElementsFromCloud(order.images!, container);
  form.id = order.orderId;

  serviceInput.value = order.service!;
  messageInput.value = order.mail!;
};

export const setValuesMailModalForm = (message: Basket) => {
  form.id = message.orderId;
  messageInput.value = message.mail!;
};
