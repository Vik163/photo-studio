import { handleCaret } from "./handleCaret";
import { phoneValidator } from "./phoneValidator";

/**
 *  маска набора номера телефона (+7 (999) 999-99-99)
 * @param id - id инпута телелефона
 */
export function setListenersInputPhone(id: string) {
  const inp = document.getElementById(id)! as HTMLInputElement;

  inp.addEventListener("input", function () {
    inp.value = phoneValidator(inp.value);
    handleCaret(inp);
  });

  //* при первом клике устанавливает значение
  inp.addEventListener("click", function () {
    if (inp.value.length === 0) inp.value = "+7 (";
    handleCaret(inp);
  });
}
