import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";

const checker = $class("mail__checkbox-label");
const btnSubmit = $class("mail__btn-submit") as HTMLButtonElement;

export function handleCheckbox() {
  checker.addEventListener("click", function (e) {
    e.preventDefault();
    if ($contains("mail__checkbox-label_active", checker)) {
      $remove("mail__checkbox-label_active", checker);
      btnSubmit.disabled = true;
    } else {
      $add("mail__checkbox-label_active", checker);
      btnSubmit.disabled = false;
    }
  });
}
