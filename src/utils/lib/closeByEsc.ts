import { closeMenu } from "@/blocks/menu/scripts/menu";
import { closeModalInfo } from "@/blocks/modals/modal-info/scripts/modal-info";
import { closeModal } from "@/blocks/modals/modal/scripts/modal";

export const closeByEsc = () => {
  document.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.code === "Escape") {
      closeMenu();
      closeModal();
      closeModalInfo();
    }
  });
};
