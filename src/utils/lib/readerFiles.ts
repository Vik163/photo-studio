export const readerFiles = async (file: File): Promise<string> => {
  let result = (await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result as string);
    fileReader.readAsDataURL(file);
  })) as string;

  return result;
};
