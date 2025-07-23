import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";

const socialBlock = $class("social");
const icons = $class("social__icons", socialBlock);
const closeIcon = $class("social__close", socialBlock);

function writeMessage(e: Event) {
  const target = e.target;
  $add("social_active", socialBlock);
  console.log("target:", target);
  if ($contains("social_active", socialBlock)) {
    closeIcon.addEventListener("click", closeSocial);
  }
}

function closeSocial() {
  if ($contains("social_active", socialBlock)) {
    $remove("social_active", socialBlock);
    closeIcon.removeEventListener("click", closeSocial);
  }
}

export const setSocial = () => {
  icons.addEventListener("click", (e) => writeMessage(e));
};
