import { $adminApi } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { AdminMessages } from "@/utils/types/fetch-admin-data";

/**
 ** Первоначальный запрос корзины вызывается в header.ts
 */
export async function fetchAdminMessages(): Promise<AdminMessages[] | string> {
  try {
    const allMessages = (await $adminApi.get("/messages")).data;

    return allMessages;
  } catch (err) {
    return Messages.GET_ADMIN_MAIL_ERROR;
  }
}
