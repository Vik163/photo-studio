import type { TypeData } from "@/utils/types/admin-data-orders";

/**
 * Получает данные из id элемента
 * @param id
 * @returns { type: 'mail' | 'order', deviceId, orderId }
 */
export function getDataFromId(id: string): {
  typePage: TypeData;
  deviceId: string;
  orderId: string;
} {
  const arrKeys = id.split("/");
  const typePage = arrKeys[0] as TypeData;
  const deviceId = arrKeys[1];
  const orderId = arrKeys[2];

  return { typePage, deviceId, orderId };
}
