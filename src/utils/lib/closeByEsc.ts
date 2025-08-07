import { closeMenu } from "@/blocks/menu/scripts/menu";
import { closeModal } from "@/blocks/modal/scripts/modal";

export const closeByEsc = () => {
  document.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.code === "Escape") {
      closeMenu();
      closeModal();
    }
  });
};
