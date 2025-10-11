import { MAILS } from "@/utils/constants/storage";
import type { Basket } from "@/utils/types/fetch-data";

export const changeDataInStorage = (
  type: "update" | "delete" | "add",
  data: Basket,
  key: "MAILS" | "ORDERS"
) => {
  let list: Basket[] = JSON.parse(localStorage.getItem(key)!);

  if (type === "delete") {
    list = list.filter((item) => item.orderId !== data.orderId);
  }

  if (type === "add") {
    list.push(data);
  }

  if (type === "update") {
    list = list.map((item) => {
      if (item.orderId === data.orderId) {
        item = data;
      }
      return item;
    });
  }

  localStorage.setItem(key, JSON.stringify(list));
  return list;
};
