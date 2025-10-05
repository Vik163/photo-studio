import { uploadImagesInCloud } from "@/blocks/modals/modal/scripts/handleImagesFromCloud";
import { getImgFiles } from "@/blocks/upload-img/scripts/handleImageUpload";

/**
 * Загружает готовые изображения в облако в папку admin (`${orderId}/admin/${file.name}`)
 * @param orderId
 * @returns массив ключей загруженных фотографий
 */
export const uploadAdminImages = async (orderId: string) => {
  let images: string[] = [];
  // получаю данные файлов из кеша
  const files = getImgFiles();

  // загрузка новых файлов в облако
  for await (let file of files) {
    await uploadImagesInCloud(file, orderId, "admin");

    images.push(`${orderId}/admin/${file.name}`);
  }

  return images;
};
