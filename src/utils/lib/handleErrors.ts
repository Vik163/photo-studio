import { $add, $class } from "@/utils/lib/getElement";
/**
 * Блок отображения ошибок (class="order__error")
 * @param text
 * @param container
 * @classEl необязательный - класс целевого элемента в контейнере
 */
export const handleErrors = (
  text: string,
  container: HTMLElement,
  classEl?: string
) => {
  if (classEl) {
    const err = $class(classEl, container);
    $add("active", err);
    err.textContent = text;
  } else {
    const err = $class("admin-error", container);
    $add("active", err);
    err.textContent = text;
  }
};
