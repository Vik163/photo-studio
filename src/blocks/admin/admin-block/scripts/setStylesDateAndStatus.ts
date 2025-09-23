import { ORDER_LIMIT } from "@/utils/constants/limitDays";
import { Color } from "@/utils/constants/styles";
import type { TypeData } from "@/utils/types/admin-data";
import type { StatusOrder } from "@/utils/types/fetch-data";

export function setStylesDate(
  type: TypeData,
  leftDays: number,
  el: HTMLElement
) {
  if (type === "mail" || leftDays <= ORDER_LIMIT / 3) {
    el.style.color = Color.RED;
  }
  if (leftDays <= (ORDER_LIMIT / 3) * 2) {
    el.style.color = Color.YELLOW;
  }
  if (leftDays > (ORDER_LIMIT / 3) * 2) {
    el.style.color = Color.GREEN;
  }
}

export function setStylesStatus(status: StatusOrder, el: HTMLElement) {
  if (status === "Принят") {
    el.style.color = Color.YELLOW;
  }
  if (status === "В работе") {
    el.style.color = Color.BLUE;
  }
  if (status === "Выполнен") {
    el.style.color = Color.CYAN;
  }
  if (status === "Завершён") {
    el.style.color = Color.GREEN;
  }
  if (status === "Отложен") {
    el.style.color = Color.ORANGE;
  }
  if (status === "Отменён") {
    el.style.color = Color.RED;
  }
}
