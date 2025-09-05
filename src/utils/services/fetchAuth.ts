import { $api } from "../api/axiosApi";

export async function fetchAuth(pass: string) {
  const res = (await $api.post("auth", { pass })).data;
  return res;
}
