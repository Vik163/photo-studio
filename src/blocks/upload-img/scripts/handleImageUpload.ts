import { $add, $class, $id, $remove } from "@/utils/lib/getElement";
import { deleteImageDataFromCloud } from "../../modals/modal/scripts/handleImageDataFromCloud";

const loadBlock = $class("upload")!;
const fileInput = $id("fileUpload")! as HTMLInputElement;
const images = $class("upload__images", loadBlock)!;
const dragDropArea = $id("dragDropArea")!;

let files: File[] = [];
let cachFiles: File[] = [];
let arrImg: NodeListOf<HTMLImageElement> | null = null;

//* сброс
export function resetImageUpload() {
  document.querySelectorAll(".upload-img").forEach((img) => {
    img.remove();
  });

  cachFiles = [];
  arrImg = null;
}

//* удаление файлов в блоке
function deleteImage(e: Event) {
  const target = e.target as HTMLElement;
  document.querySelectorAll(".upload-img").forEach((img) => {
    const id = img.id;
    if (id === target.id) {
      img.remove();

      if (id.length > 3) {
        deleteImageDataFromCloud(id);
      }
    }
  });
}

/**
 *  установка файлов img в блоке
 *
 * keyFile - ключ файла в облаке (используется только для облака)
 * навешивает ключ на id кнопки
 */
export function setElements(src: string, keyFile?: string) {
  const template = ($id("upload-img") as HTMLTemplateElement).content;

  const imgTemplate = template
    .querySelector(".upload-img")
    ?.cloneNode(true) as HTMLElement;

  if (imgTemplate) {
    const image = $class("upload-img__img", imgTemplate) as HTMLImageElement;
    image.src = src;
    if (keyFile) {
      imgTemplate.id = keyFile;
    }

    images?.append(imgTemplate);

    if (!keyFile) {
      arrImg = document.querySelectorAll(".upload-img");
      arrImg.forEach((img, index) => {
        const id = index.toString();
        const btn = $class("upload-img__btn", img as HTMLElement);
        img.id = id;
        btn.id = id;
      });
    } else {
      const btn = $class("upload-img__btn", $id(keyFile) as HTMLElement);
      btn.id = keyFile;
    }
  }
}

//* чтение и установка файлов в кеше и блоке
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
      if (res && typeof res === "string") setElements(res);
    };
    reader.onerror = (err) => {
      console.error("Ошибка чтения файлов:", err);
      alert("Ошибка чтения файлов.");
    };
    reader.readAsDataURL(file);
  }

  cachFiles = files;
  console.log("cachFiles:", cachFiles);
  files = [];
}

//* фильтрует выбранные файлы по типу и добавляет в массив
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
  console.log("cachFiles:", cachFiles);
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

  images.addEventListener("click", deleteImage);
};
