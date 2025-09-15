import { Messages } from "@/utils/constants/messages";
import { $api } from "../../api/axiosApi";
import type { Message } from "../../types/fetch-data";

export const fetchDeleteMessage = async (
  id: string
): Promise<Message[] | string> => {
  try {
    const messages: Message[] = (await $api.delete(`/messages/${id}`)).data;

    return messages;
  } catch (err) {
    return Messages.DELETE_MAIL_ERROR;
  }
};
