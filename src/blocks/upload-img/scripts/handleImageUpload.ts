import { deleteImageDataFromCloud } from "@/blocks/modals/modal/scripts/handleImagesFromCloud";
import { $add, $class, $id, $remove } from "@/utils/lib/getElement";

const loadBlock = $class("upload")!;
const fileInput = $id("fileUpload")! as HTMLInputElement;
const images = $class("upload__images", loadBlock)!;
const dragDropArea = $id("dragDropArea")!;

let files: File[] = [];
let cachFiles: File[] = [];

/**
 * удаление всех файлов в блоке
 */
export function deleteImageUpload() {
  document.querySelectorAll(".upload-img").forEach((img) => {
    img.remove();
  });

  cachFiles = [];
}

/**
 * удаление файлов в блоке по одному
 */
function deleteImageByOne(e: Event) {
  const target = e.target as HTMLElement;
  document.querySelectorAll(".upload-img").forEach((img) => {
    const id = img.id;
    if (id === target.id) {
      img.remove();

      deleteImageDataFromCloud(id);
    }
  });
}

/**
 *  установка файлов img в блоке
 *
 * keyFile - ключ файла в облаке (используется только для облака)
 * навешивает ключ на id кнопки
 */
export function setElements(src: string, keyFile: string) {
  const template = ($id("upload-img") as HTMLTemplateElement).content;

  const imgTemplate = template
    .querySelector(".upload-img")
    ?.cloneNode(true) as HTMLElement;

  if (imgTemplate) {
    imgTemplate.id = keyFile;

    const image = $class("upload-img__img", imgTemplate) as HTMLImageElement;
    image.src = src;
    const btn = $class("upload-img__btn", imgTemplate);
    btn.id = keyFile;

    images?.append(imgTemplate);
  }
}

/**
 * чтение и установка файлов в кеше и блоке
 */
function handleImages() {
  if (!files || files.length === 0) return;

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      alert("Допускаются только файлы image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result;
      if (res && typeof res === "string") setElements(res, file.name);
    };
    reader.onerror = (err) => {
      console.error("Ошибка чтения файлов:", err);
      alert("Ошибка чтения файлов.");
    };
    reader.readAsDataURL(file);
  }

  cachFiles = files;
  files = [];
}

/**
 * фильтрует выбранные файлы по типу и добавляет в массив
 */
function collectFilesFilter(container: FileList) {
  const arrFiles = Object.values(container).filter(
    (file) => typeof file !== "number"
  );
  arrFiles.forEach((file) => files?.push(file));
}

/**
 *  Возвращает изображения в кеше
 */
export function getImgFiles() {
  return cachFiles;
}

/**
 *  Управление видимостью блока загрузки изображений
 */
export const handleImageUpload = (state: "open" | "close") => {
  if (state === "open") {
    $add("upload_active", loadBlock);
  } else $remove("upload_active", loadBlock);
};

/**
 *  Загрузка изображений выбором и перетаскиванием
 */
export const setListenersImageUpload = () => {
  fileInput.addEventListener("change", async () => {
    collectFilesFilter(fileInput.files!);
    handleImages();
  });

  dragDropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragDropArea.classList.add("dragover");
  });

  dragDropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dragDropArea.classList.remove("dragover");

    collectFilesFilter(e.dataTransfer?.files!);
    handleImages();
  });

  images.addEventListener("click", deleteImageByOne);
};
