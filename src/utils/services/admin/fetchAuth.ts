import { $api } from "@/utils/api/axiosApi";

export async function fetchAuth(pass: string) {
  const res = (await $api.post("auth", { pass })).data;
  return res;
}
