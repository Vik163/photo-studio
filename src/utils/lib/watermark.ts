//@ts-ignore
import watermark from "watermarkjs";
import watermarkImg from "../../assets/images/watermark.png";

/**
 * Устанавливает водяной знак поверх изображения
 * @param url изображения
 * @returns url с водяным знаком
 */
export const addWaterMark = async (url: string): Promise<string> => {
  return watermark([url, watermarkImg])
    .dataUrl(watermark.image.center(0.7))
    .then(function (urlMark: string) {
      return urlMark;
    });
};
