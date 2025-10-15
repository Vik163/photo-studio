import { $api } from "@/utils/api/axiosApi";
import { Messages } from "@/utils/constants/messages";
import type { Auth } from "../types/fetch-data";

export async function fetchAuth(data: Auth) {
  console.log("data:", data);
  try {
    const res = (await $api.post("auth", data)).data;
    return res;
  } catch (e) {
    console.log("authError:", e);
    return Messages.AUTH_ERROR;
  }
}
