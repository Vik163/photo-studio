import { $add, $class, $id } from "@/utils/lib/getElement";

const loadBlock = $class("upload")!;
const fileInput = $id("fileUpload")! as HTMLInputElement;
const images = $class("upload__images", loadBlock)!;
const dragDropArea = $id("dragDropArea")!;

let files: File[] = [];

function deleteImage(e: Event) {
  console.log("e:", e.currentTarget);
}

function setId() {
  let id = 0;
  let minId = 0;
  const arrImg = document.querySelectorAll("images__container");
  if (arrImg.length > 0) {
    arrImg.forEach((img) => {
      const imgId = +img.id;
      if (imgId > minId) minId = imgId;
    });

    id = minId + 1;
  } else id = 1;

  console.log("e:", id);
  return id;
}

function setElements(res: string) {
  const template = ($id("upload-img") as HTMLTemplateElement).content;

  const imgTemplate = template
    .querySelector(".upload-img")
    ?.cloneNode(true) as HTMLElement;

  if (imgTemplate) {
    const image = $class("upload-img__img", imgTemplate) as HTMLImageElement;
    image.src = res;

    const btn = $class("card-product__btn", imgTemplate);
    // btn.id = setId().toString();

    images?.append(imgTemplate);
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

  files = [];
}

function collectFilesFilter(container: FileList) {
  const arrFiles = Object.values(container).filter(
    (file) => typeof file !== "number"
  );
  arrFiles.forEach((file) => files?.push(file));
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
};
