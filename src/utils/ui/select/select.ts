import { setStylesStatus } from "@/blocks/admin/admin-block/scripts/setStylesDateAndStatus";
import { $class, $contains, $toggle } from "@/utils/lib/getElement";
import { StatusOrder } from "@/utils/types/fetch-data";

let status: StatusOrder = "Создан";

export const setSelect = (e: Event, container: HTMLElement) => {
  const target = e.target as HTMLElement;
  const list = $class("select__list", container);
  const defaultValue = $class("select__default", container);

  if ($contains("select__option", target)) {
    status = target.textContent as StatusOrder;
    defaultValue.textContent = status;
    setStylesStatus(status, defaultValue);
  }

  $toggle("active", list);
  $toggle("active", defaultValue);

  if ($contains("active", list)) {
    container.querySelectorAll(".select__option").forEach((item) => {
      setStylesStatus(item.textContent as StatusOrder, item as HTMLElement);
    });
  }
};

export const getNewStatus = () => {
  return status;
};
