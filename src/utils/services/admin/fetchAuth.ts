import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";

export async function fetchAuth(pass: string) {
  try {
    const res = (await $api.post("auth", { pass })).data;
    return res;
  } catch (e) {
    console.log("authError:", e);
    return Messages.AUTH_ERROR;
  }
}
