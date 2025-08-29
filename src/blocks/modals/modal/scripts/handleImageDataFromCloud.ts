import { getBaketObj } from "@/utils/lib/handleYaBaket";
import { setElements } from "../../../upload-img/scripts/handleImageUpload";

let arrImg: string[] = [];
let newArrImg: string[] = [];

/**
 * Получает изображения из облака и устанавливает их в форме
 * @param images - массив ключей изображений
 */
export async function setElementsFromCloud(images: string[]) {
  arrImg = images;
  for await (const keyFile of images) {
    const src = await getBaketObj(keyFile);
    if (src) setElements(src, keyFile);
  }
}

/**
 * Из массива ключей удаляет выбранные ключи
 * @param keyFile
 */
export async function deleteImageDataFromCloud(keyFile: string) {
  newArrImg = arrImg.filter((img) => img !== keyFile);
}

/**
 * Возвращает Массив полученных ключей из облака и новый массив с отредактированными ключами
 * @returns
 */
export function getImageDataFromCloud() {
  return { arrImg, newArrImg };
}
