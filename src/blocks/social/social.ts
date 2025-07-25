import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";
import telegram from "../../assets/icons/telegram.png";
import whatsapp from "../../assets/icons/whatsapp.png";

const socialBlock = $class("social");
const container = $class("social__container", socialBlock);
const icons = $class("social__icons", socialBlock);
const closeIcon = $class("social__close", container);
const iconContainer = $class(
  "social__container-img",
  container
) as HTMLImageElement;

function openSocial(e: Event) {
  const target = e.target as HTMLElement;
  $add("social__container_active", container);
  if (target.id === "telegram") {
    iconContainer.src = telegram;
    iconContainer.alt = "telegram";
  } else {
    iconContainer.src = whatsapp;
    iconContainer.alt = "whatsapp";
  }

  if ($contains("social__container_active", container)) {
    closeIcon.addEventListener("click", closeSocial);
  }
}

export function closeSocial() {
  if ($contains("social__container_active", container)) {
    $remove("social__container_active", container);
    closeIcon.removeEventListener("click", closeSocial);
  }
}

export const setSocial = () => {
  icons.addEventListener("click", (e) => openSocial(e));
};
