import { delBaketObj } from "@/utils/lib/handleYaBaket";
import type { Basket } from "@/utils/types/fetch-data";

/**
 * удаляет данные из облака ( for await  of) и потом из бд
 * @param newOrder - заказ Basket
 * @param callbackConfirm - (id: string) => Promise<Basket[] | string>
 * @returns Promise<string | Basket[] | null>
 */
export async function deleteData(
  newOrder: Basket,
  callbackConfirm: (id: string) => Promise<Basket[] | string>
) {
  let arr = [];
  for await (const img of newOrder.images) {
    const statusCode = await delBaketObj(img);
    arr.push(statusCode);
  }

  console.log("status:", arr);
  if (arr.length === newOrder.images.length) {
    const data = await callbackConfirm(newOrder.orderId);

    return data;
  }
  return null;
}
