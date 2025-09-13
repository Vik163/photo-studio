import { $class, $id } from "@/utils/lib/getElement";
import type { Basket, Message } from "@/utils/types/fetch-data";
import { setElementsFromCloud } from "./handleImagesFromCloud";

const form = $class("modal__form") as HTMLFormElement;
const serviceInput = $id("service", form) as HTMLInputElement;
const messageInput = $id("message", form) as HTMLTextAreaElement;

export const setValuesOrderModalForm = (order: Basket) => {
  setElementsFromCloud(order.images);

  serviceInput.value = order.service;
  messageInput.value = order.mail!;
};

export const setValuesMailModalForm = (message: Message) => {
  form.id = message.orderId;
  messageInput.value = message.mail!;
};
