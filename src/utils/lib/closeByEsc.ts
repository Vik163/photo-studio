import { closeMenu } from "@/blocks/menu/scripts/menu";
import { closeMailModal } from "@/blocks/mail-modal/scripts/mail-modal";

export const closeByEsc = () => {
  document.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.code === "Escape") {
      closeMenu();
      closeMailModal();
    }
  });
};
