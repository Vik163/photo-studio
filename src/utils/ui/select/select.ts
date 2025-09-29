import { $class, $contains, $id, $toggle } from "@/utils/lib/getElement";
import { StatusOrder } from "@/utils/types/fetch-data";
import { SelectData } from "@/utils/types/select-data";

let value: StatusOrder;

export const setListOptions = (
  container: HTMLElement,
  selectData: SelectData
) => {
  const list = $class("select__list", container);
  const defaultValue = $class("select__btn", container);
  defaultValue.textContent = selectData.default.value;

  list.querySelectorAll(".option").forEach((item) => item.remove());

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

      list.append(optionTemplate);
    }
  });
};

/**
 * Выполняет действия по клику
 * устанавливает выбранное значение и цвет в дефолтное
 * @param e
 * @param container
 */
export const handleOptionsSelect = (e: Event, container: HTMLElement) => {
  const list = $class("select__list", container);

  const target = e.target as HTMLElement;
  const btn = $class("select__btn", container) as HTMLButtonElement;

  if ($contains("option__value", target)) {
    value = target.textContent as StatusOrder;
    btn.textContent = value;
  }

  $toggle("active", list);
  $toggle("active", btn);
};

export const getNewValueSelect = () => {
  return value;
};
