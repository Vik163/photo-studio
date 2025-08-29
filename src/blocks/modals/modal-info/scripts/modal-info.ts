import { $add, $class, $remove } from "@/utils/lib/getElement";
import rejectIcon from "@/assets/icons/reject.png";
import successIcon from "@/assets/icons/success.png";

const modal = $class("modal-info");
const title = $class("modal-info__title", modal);
const text = $class("modal-info__text", modal);
const image = $class("modal-info__img", modal) as HTMLImageElement;
const btn = $class("modal-info__btn-submit", modal);

export const closeModalInfo = () => {
  $remove("active", modal);
};

export const openModalInfo = (
  type: "reject" | "success" | "info",
  info: string
) => {
  $add("active", modal);
  $remove("active", btn);
  $remove("active", text);

  title.textContent = info;
  if (type !== "info") {
    $add("active", image);
    image.src = type === "reject" ? rejectIcon : successIcon;
  } else {
    $remove("active", image);
  }
};
