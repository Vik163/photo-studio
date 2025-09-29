import { $class, $id } from "@/utils/lib/getElement";
import type { OneOrder, TypeData } from "@/utils/types/admin-data";
import { setStylesDate, setStylesStatus } from "./setStylesDateAndStatus";
import { removeListElements } from "./removeListElements";

export const setContentOrders = (
  type: TypeData,
  orders: OneOrder[],
  container: HTMLElement,
  deviceId?: string
) => {
  removeListElements(".device-order", container);

  const templateOrders = ($id("device-order") as HTMLTemplateElement).content;
  orders.forEach((data) => {
    // дочерний темплейт
    const deviceOrdersTemplate = templateOrders
      .querySelector(".device-order")
      ?.cloneNode(true) as HTMLAnchorElement;

    const title = $class("device-order__service", deviceOrdersTemplate);
    const titleText = type === "mail" ? data.mail : data.service;
    title.textContent = titleText!;

    const date = $class("device-order__date", deviceOrdersTemplate);
    date.textContent = data.created;
    setStylesDate(type, data.leftDays!, date);

    const status = $class("device-order__status", deviceOrdersTemplate);
    status.textContent = data.status!;
    setStylesStatus(data.status!, status);

    const btn = $class(
      "device-order__btn",
      deviceOrdersTemplate
    ) as HTMLButtonElement;
    btn.id = `${type}/${deviceId || ""}/${data.orderId}`;

    container?.append(deviceOrdersTemplate);
  });
};
