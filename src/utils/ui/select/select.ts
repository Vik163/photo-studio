import {
  $class,
  $contains,
  $id,
  $remove,
  $toggle,
} from "@/utils/lib/getElement";
import type { SelectData } from "@/utils/types/select-data";

let value: string;

/**
 * Монтирует блок select c темплейтами
 * Вешает слушатель на список с опциями
 * слушатель прокидывает транзитом callback
 * @param container
 * @param selectData - options
 * @param defaultValue - необязательный (defaultValue || selectData.default.value)
 * @param callback - необязательный (defaultValue || selectData.default.value)
 */
export const setContentSelect = (
  container: HTMLElement,
  containerOptions: HTMLElement,
  selectData: SelectData,
  defaultValue?: string,
  callback?: (value: string) => void
) => {
  const select = $class("select", container);

  const text = $class("select__text", select) as HTMLInputElement;
  text.value = selectData.default?.value! || defaultValue!;

  containerOptions.querySelectorAll(".option").forEach((item) => item.remove());

  const templateOption = ($id("option") as HTMLTemplateElement).content;

  selectData.content.forEach((data) => {
    const optionTemplate = templateOption
      .querySelector(".option")
      ?.cloneNode(true) as HTMLAnchorElement;

    if (optionTemplate) {
      const value = $class("option__value", optionTemplate) as HTMLElement;
      value.textContent = data.value;

      if (data.iconLink) {
        const icon = $class("option__icon", optionTemplate) as HTMLImageElement;
        icon.src = data.iconLink;
        icon.alt = data.iconAlt!;
      }

      containerOptions.append(optionTemplate);
    }
  });

  containerOptions.addEventListener("click", (e) => {
    handleOptionsSelect(e, container, callback!);
  });
};

/**
 * Выполняет действия по клику option
 * устанавливает выбранное значение и вызывает callback, в который передает значение
 * @param e
 * @param container
 * @callback: (value: string) => void
 */
export const handleOptionsSelect = (
  e: Event,
  container: HTMLElement,
  callback: (value: string) => void
) => {
  const list = $class("select__list", container);

  const target = e.target as HTMLElement;
  const defaultValue = $class("select__text", container) as HTMLInputElement;
  const btn = $class("select__btn", container) as HTMLButtonElement;

  if ($contains("option__value", target)) {
    value = target.textContent!;
    defaultValue.value = value;

    callback(value);
  }

  $remove("active", list);
  $remove("active", btn);
};

export const openOptionsSelect = (container: HTMLElement) => {
  const list = $class("select__list", container);

  const btn = $class("select__btn", container) as HTMLButtonElement;

  $toggle("active", list);
  $toggle("active", btn);
};

export const getNewValueSelect = () => {
  return value;
};
