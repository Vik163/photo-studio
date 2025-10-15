import { $adminApi, $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";

export async function fetchAdminAuth(pass: string) {
  try {
    const res = (await $adminApi.post("auth", { pass })).data;
    return res;
  } catch (e) {
    console.log("authError:", e);
    return Messages.AUTH_ERROR;
  }
}
