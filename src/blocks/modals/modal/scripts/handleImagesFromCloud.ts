import { delBaketObj, uploadBaketObj } from "@/utils/lib/handleYaBaket";
import { transformFilesInString } from "@/utils/lib/readerFiles";
import { getBaketObj } from "@/utils/lib/handleYaBaket";
import {
  deleteImageUpload,
  setImageElements,
} from "../../../upload-img/scripts/handleImageUpload";

let arrImgCloud: string[] = [];
let newArrImgCloud: string[] = [];

/**
 * Получает изображения из облака и устанавливает их в форме
 * @param images - массив ключей изображений
 */
export async function setElementsFromCloud(
  images: string[],
  container: HTMLElement
): Promise<string[]> {
  let arrSrc = [];
  arrImgCloud = images;
  deleteImageUpload(container);

  for await (const keyFile of images) {
    const src = await getBaketObj(keyFile);

    if (src) {
      arrSrc.push(src);
      setImageElements(src, keyFile, container);
    }
  }

  return arrSrc;
}

/**
 * Из массива ключей удаляет выбранные ключи
 * @param keyFile
 */
export async function deleteImageDataFromCloud(keyFile: string) {
  newArrImgCloud = arrImgCloud.filter((img) => img !== keyFile);
}

/**
 * Загружает файлы в облако и возвращает массив ключей загруженных файлов
 * Преобразует в строку url
 * @param file
 * @param orderId
 * @param admin необязательный параметр для загрузки файлов из админа
 * @returns
 */
export async function uploadImagesInCloud(
  file: File,
  orderId: string,
  admin?: "admin"
) {
  const fileName = admin
    ? `${orderId}/admin/${file.name}`
    : `${orderId}/${file.name}`;

  const result = await transformFilesInString(file);

  if (result) {
    await uploadBaketObj(fileName, result);
  }

  return fileName;
}

/**
 *  Удаляет файлы из облака и возвращает массив ключей удаленных файлов
 * @param arrImg - старый массив
 * @param newArrImg - массив без удаленных файлов
 */
export async function deleteImagesInCloud() {
  if (newArrImgCloud.length > 0) {
    const filterImages = arrImgCloud.filter((e) =>
      newArrImgCloud.indexOf(e) > -1 ? false : true
    );

    for await (const img of filterImages) {
      await delBaketObj(img);
    }
  }
}

/**
 * Возвращает Массив полученных ключей из облака и новый массив с отредактированными ключами
 * @returns
 */
export function getImageDataFromCloud() {
  const orderId = arrImgCloud[0].split("/")[0];
  return { orderId };
}

export function clearCacheEditForm() {
  arrImgCloud = [];
  newArrImgCloud = [];
}
