/**
 * Преобразует файлы в строку
 * @param file File
 * @returns string
 */

export const transformFilesInString = async (file: File): Promise<string> => {
  console.log("file:", file);
  let result = (await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result as string);
    console.log("file:", file);
    fileReader.readAsDataURL(file);
  })) as string;

  return result;
};
