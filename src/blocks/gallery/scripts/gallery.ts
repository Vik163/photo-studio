import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
import lightGallery from "lightgallery";
import "lightgallery/css/lightgallery.css";
import type { LightGallery } from "lightgallery/lightgallery";
import thumbnails from "lightgallery/plugins/thumbnail";
import zoom from "lightgallery/plugins/zoom";

const galleryBlock = $class("gallery");
const galleryList = $class("gallery__list", galleryBlock);
const lg = $id("customize-thumbnails-gallery");
let plugin: LightGallery;

export const setGallery = (links: string[]) => {
  if (galleryBlock) {
    const isExistNodes = galleryList.childNodes;
    if (isExistNodes.length === 0)
      links.forEach((link) => {
        const a = document.createElement("a");
        a.href = link;
        lg.append(a);

        const img = document.createElement("img");
        $add("gallery__img", img);
        img.src = link;
        img.alt = "фотография";

        a.append(img);
      });
    plugin = lightGallery(lg, {
      plugins: [thumbnails, zoom],
      // thumbnails
      thumbHeight: "100px",
      thumbWidth: 80,
      addClass: "lg-custom-thumbnails", // кастомные стили
      // Remove the starting animations.
      // This can be done by overriding CSS as well
      appendThumbnailsTo: ".lg-outer", // кастомные стили
      // zoom
      allowMediaOverlap: true,
      actualSize: true, // иконка лупы увеличивает до истинного размера
      // showCloseIcon: true,
      mobileSettings: { showCloseIcon: true },
      // showZoomInOutIcons: true, // отображет две лупы (+-)
      //scale: 0.5, // eсли две иконки, то указывает масштаб увеличения
    });
    plugin.openGallery();

    setTimeout(() => {
      $add("active", galleryBlock);
    }, 500);
  }
};

if (galleryBlock) {
  lg.addEventListener("lgBeforeClose", () => {
    $remove("active", galleryBlock);
  });

  lg.addEventListener("lgAfterClose", () => {
    plugin.destroy();
  });
}
