import { $add, $class, $id } from "@/utils/lib/getElement";

const loadBlock = $class("upload")!;
const fileInput = $id("fileUpload")! as HTMLInputElement;
const images = $class("upload__images", loadBlock)!;
const dragDropArea = $id("dragDropArea")!;

let files: File[] = [];
let cachFiles: File[] = [];
let arrImg: NodeListOf<HTMLImageElement> | null = null;

export function resetImageUpload() {
  document.querySelectorAll(".upload-img").forEach((img) => {
    img.remove();
  });

  cachFiles = [];
  arrImg = null;
}

function deleteImage(e: Event) {
  const target = e.target as HTMLElement;
  document.querySelectorAll(".upload-img").forEach((img) => {
    if (img.id === target.id) {
      img.remove();
    }
  });
}

function setElements(res: string) {
  const template = ($id("upload-img") as HTMLTemplateElement).content;

  const imgTemplate = template
    .querySelector(".upload-img")
    ?.cloneNode(true) as HTMLElement;

  if (imgTemplate) {
    const image = $class("upload-img__img", imgTemplate) as HTMLImageElement;
    image.src = res;

    images?.append(imgTemplate);

    arrImg = document.querySelectorAll(".upload-img");
    arrImg.forEach((img, index) => {
      const id = index.toString();
      const btn = $class("upload-img__btn", img as HTMLElement);
      img.id = id;
      btn.id = id;
    });
  }
}

function handleImages() {
  if (!files) return;
  if (files.length === 0) {
    alert("No files selected.");
    return;
  }

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result;
      if (res && typeof res === "string") setElements(res);
    };
    reader.onerror = (err) => {
      console.error("Error reading file:", err);
      alert("An error occurred while reading the file.");
    };
    reader.readAsDataURL(file);
  }

  cachFiles = files;
  files = [];
}

function collectFilesFilter(container: FileList) {
  const arrFiles = Object.values(container).filter(
    (file) => typeof file !== "number"
  );
  arrFiles.forEach((file) => files?.push(file));
}

export function getImgFiles() {
  return cachFiles;
}

/**
 *  Загрузка изображений выбором и перетаскиванием
 */
export const handleImageUpload = () => {
  $add("upload_active", loadBlock);
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
