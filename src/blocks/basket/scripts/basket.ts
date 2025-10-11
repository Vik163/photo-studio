import { $add, $class, $contains, $remove } from "@/utils/lib/getElement";
import type { Basket } from "@/utils/types/fetch-data";
import { setBasketElements } from "./setBasketElements";
import { deleteOrder } from "./deleteOrder";
import { editBasket } from "./editOrder";
import { fetchBasket } from "@/utils/services/orders/fetchBasket";
import { ORDERS } from "@/utils/constants/storage";

const basketOrders = $class("basket__orders");
const basket = $class("basket");
let orderData: Basket[] = [];

export function closeBasket() {
  $remove("active", basketOrders);
  $remove("active-close", basket);
}

/**
 * Отображает корзину в header если не пустая
 * @param data - корзина
 */
export const setBasketData = (data: Basket[]) => {
  let adminMails = 0;
  closeBasket();

  if (data.length > 0) {
    $add("active", basket);
    orderData = data;

    data.forEach((mail) => {
      if (mail.mailAdmin) adminMails++;
    });

    if (adminMails > 0) {
      $add("active_admin", basket);
    } else basket.textContent = data.length.toString();

    if (data) setBasketElements(basketOrders, data);
  } else $remove("active", basket);
};

/**
 * Слушатели на иконку корзины (click, mouseover, mouseleave)
 * Общий слушатель на корзину (удалить, редактировать)
 */
const setBasketListeners = () => {
  basket.addEventListener("mouseover", function () {
    $add("active-hover", basketOrders);
  });
  basket.addEventListener("mouseleave", function () {
    $remove("active-hover", basketOrders);
  });

  basket.addEventListener("click", function () {
    if ($contains("active", basketOrders)) {
      $remove("active", basketOrders);
      $remove("active-hover", basketOrders);
      $remove("active-close", basket);
    } else {
      $add("active", basketOrders);
      $add("active-close", basket);
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

export const setBasket = async () => {
  setBasketListeners();

  const orders = await fetchBasket();
  if (typeof orders === "string") {
    console.log("Ошибка запроса корзины", orders);
  } else {
    localStorage.setItem(ORDERS, JSON.stringify(orders));
    setBasketData(orders);
  }
};
