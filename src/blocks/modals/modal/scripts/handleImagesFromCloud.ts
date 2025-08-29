import { transformFilesInString } from "@/utils/lib/readerFiles";

export async function uploadImagesInCloud(
  file: File,
  orderId: string,
  newArrImg: string[]
) {
  const fileName = `${orderId}/${file.name}`;

  const result = await transformFilesInString(file);

  if (result) {
    // uploadBaketJbj(fileName, result);

    newArrImg.push(fileName);
  }

  return newArrImg;
}

export async function deleteImagesInCloud(
  arrImg: string[],
  newArrImg: string[]
) {
  const filterImages = arrImg.filter((e) =>
    newArrImg.indexOf(e) > -1 ? false : true
  );

  console.log("filterImages:", filterImages);
  return filterImages;
}
