import { ORDER_LIMIT } from "@/utils/constants/admin/limitDays";
import { ColorAdmin } from "@/utils/constants/styles";
import type { TypeData } from "@/utils/types/admin-data-orders";
import type { StatusOrder } from "@/utils/types/fetch-data";

export function setStylesDate(
  type: TypeData,
  leftDays: number,
  el: HTMLElement
) {
  if (type === "mail" || leftDays <= ORDER_LIMIT / 3) {
    el.style.color = ColorAdmin.RED;
  }
  if (leftDays <= (ORDER_LIMIT / 3) * 2) {
    el.style.color = ColorAdmin.YELLOW;
  }
  if (leftDays > (ORDER_LIMIT / 3) * 2) {
    el.style.color = ColorAdmin.GREEN;
  }
}

export function setStylesStatus(status: StatusOrder, el: HTMLElement) {
  if (status === "Принят") {
    el.style.color = ColorAdmin.YELLOW;
  }
  if (status === "В работе") {
    el.style.color = ColorAdmin.BLUE;
  }
  if (status === "Выполнен") {
    el.style.color = ColorAdmin.CYAN;
  }
  if (status === "Завершён") {
    el.style.color = ColorAdmin.GREEN;
  }
  if (status === "Отложен") {
    el.style.color = ColorAdmin.ORANGE;
  }
  if (status === "Отменён") {
    el.style.color = ColorAdmin.RED;
  }
}
