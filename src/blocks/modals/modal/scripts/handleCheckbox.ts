import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";

const checker = $class("modal__checkbox-label");
const btnSubmit = $class("modal__btn-submit") as HTMLButtonElement;

function handleCheckbox(e: Event) {
  e.preventDefault();
  if ($contains("modal__checkbox-label_active", checker)) {
    disableCheckbox();
  } else {
    $add("modal__checkbox-label_active", checker);
    btnSubmit.disabled = false;
  }
}

export function disableCheckbox() {
  $remove("modal__checkbox-label_active", checker);
  btnSubmit.disabled = true;
}

export function setListenerCheckbox() {
  checker.addEventListener("click", handleCheckbox);
}
