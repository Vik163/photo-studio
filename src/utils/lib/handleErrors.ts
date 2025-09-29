import { $add, $class } from "@/utils/lib/getElement";
/**
 * Блок отображения ошибок (class="order__error")
 * @param text
 * @param container
 */
export const handleErrors = (text: string, container: HTMLElement) => {
  const err = $class("order__error", container);
  $add("active", err);
  err.textContent = text;
};
