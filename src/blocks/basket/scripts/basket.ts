import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { setBasketElements } from "./setBasketElements";
import { deleteOrder } from "./deleteOrder";
import { editBasket } from "./editOrder";

const basketOrders = $class("basket__orders");
const orderNum = $class("basket");
let orderData: Basket[] = [];

export function closeBasket() {
  $remove("active", basketOrders);
  $remove("active-close", orderNum);
}

/**
 * Отображает корзину в header если не пустая
 * @param data - корзина
 */
export const setBasketData = (data: Basket[]) => {
  console.log("data:", data);
  const orderNum = $class("basket");
  closeBasket();

  if (data.length > 0) {
    $add("active", orderNum);
    orderData = data;
    orderNum.textContent = data.length.toString();

    if (data) setBasketElements(basketOrders, data);
  } else $remove("active", orderNum);
};

/**
 * Слушатели на иконку корзины (click, mouseover, mouseleave)
 * Общий слушатель на корзину (удалить, редактировать)
 */
export const setBasketListeners = () => {
  orderNum.addEventListener("mouseover", function () {
    $add("active-hover", basketOrders);
  });
  orderNum.addEventListener("mouseleave", function () {
    $remove("active-hover", basketOrders);
  });

  orderNum.addEventListener("click", function () {
    if ($contains("active", basketOrders)) {
      $remove("active", basketOrders);
      $remove("active-hover", basketOrders);
      $remove("active-close", orderNum);
    } else {
      $add("active", basketOrders);
      $add("active-close", orderNum);
    }
  });

  basketOrders.addEventListener("click", function (e: Event) {
    const el = e.target as HTMLElement;

    if (el.tagName === "BUTTON" && orderData.length > 0) {
      if ($contains("basket-item__edit", el)) {
        editBasket(orderData, el.id);
      } else deleteOrder(orderData, el.id);
    }
  });
};
