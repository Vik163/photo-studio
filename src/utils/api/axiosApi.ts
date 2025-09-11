import axios from "axios";

export const $api = axios.create({
  baseURL: __API__,
  withCredentials: true,
});

export const $adminApi = axios.create({
  baseURL: __API_ADMIN__,
  withCredentials: true,
});
