import { setElementsFromCloud } from "@/blocks/modals/modal/scripts/handleImagesFromCloud";
import {
  deleteImageUpload,
  setListenersImageUpload,
} from "@/blocks/upload-img/scripts/handleImageUpload";
import { setGallery } from "@/blocks/gallery/scripts/gallery";
import { $class } from "@/utils/lib/getElement";
import { OneOrder } from "@/utils/types/admin-data";

export const handleImages = async (
  order: OneOrder,
  contaiiner: HTMLElement
) => {
  const imagesContainer = $class("upload__images", contaiiner)!;
  const btnGallery = $class("upload__btn-gallery", imagesContainer);
  deleteImageUpload();
  setListenersImageUpload(contaiiner);

  if (order.images) {
    const arrSrc = await setElementsFromCloud(order.images, imagesContainer);

    if (arrSrc.length > 0)
      btnGallery.addEventListener("click", function () {
        setGallery(arrSrc);
      });
  }
};
