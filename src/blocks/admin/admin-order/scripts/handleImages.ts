import { setElementsFromCloud } from "@/blocks/modals/modal/scripts/handleImagesFromCloud";
import { deleteImageUpload } from "@/blocks/upload-img/scripts/handleImageUpload";
import { setGallery } from "@/blocks/gallery/scripts/gallery";
import { getDataFromId } from "../../admin-block/scripts/getDataFromId";
import { delBaketObj } from "@/utils/lib/handleYaBaket";
import { AdminUpdateData } from "@/utils/types/admin-data";
import { fetchUpdateAdminDataOrder } from "@/utils/services/admin/fetchUpdateAdminDataOrder";
import { handleErrors } from "@/utils/lib/handleErrors";

let arrSrcClient: string[];
let arrSrcAdmin: string[];
/**
 * Промежуточная функция
 * Удаляет существующие ноды перед встраиванием
 * устанавливает изображения на свои места (container)
 * сохраняет  ключи файлов в массивы arrSrcClient и arrSrcAdmin зависит от типа загруженных фото
 * @param type: "client" | "admin"
 * @param images
 * @param container - куда встраиваются ноды
 */
export const handleImages = async (
  type: "client" | "admin",
  images: string[],
  container: HTMLElement
) => {
  deleteImageUpload(container);

  if (images) {
    if (type === "admin") {
      arrSrcAdmin = await setElementsFromCloud(images, container);
    } else {
      arrSrcClient = await setElementsFromCloud(images, container);
    }
  }
};

/**
 * Открывает галерею в зависимости от типа загруженных фото
 * @param type: "client" | "admin"
 */
export function openAdminGallery(type: "client" | "admin") {
  if (type === "admin") {
    if (arrSrcAdmin.length > 0) setGallery(arrSrcAdmin);
  } else {
    if (arrSrcClient.length > 0) setGallery(arrSrcClient);
  }
}

/**
 * Удаляет ноду по клику кнопки close, принимая от ее id ключ файла в облаке
 * 1. удаляет в облаке
 * 2. удаляет на сервере
 * 3. выбрасывает ошибку или удаляет ноду
 * @param e
 * @param idOrder - данные заказа { deviceId, orderId }
 */
export const deleteImages = async (
  e: Event,
  idOrder: string,
  container: HTMLElement
) => {
  e.preventDefault();
  const target = e.target! as HTMLElement;

  if (target.tagName === "BUTTON") {
    const key = target.id;

    const status = await delBaketObj(key);

    const { deviceId, orderId } = getDataFromId(idOrder);
    const data: AdminUpdateData = {
      deviceId,
      orderId,
      completedImages: [key],
    };

    if (status) {
      const res = await fetchUpdateAdminDataOrder(data);
      if (typeof res === "string") {
        handleErrors(res, container);
      } else target.parentElement?.remove();
    }
  }
};
