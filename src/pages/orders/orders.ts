import "./orders.scss";
import "../../assets/icons/logo.png";
import { setHeader } from "@/blocks/header/scripts/header";
import { setContacts } from "@/blocks/contacts/contacts";
import { setCSSVariales } from "@/utils/lib/setCSSVariales";
import { setFooter } from "@/blocks/footer/footer";
import { setListenersModal } from "@/blocks/modals/modal/scripts/modal";
import { closeByEsc } from "@/utils/lib/closeByEsc";
import { changeUrl } from "@/utils/lib/changeUrl";
import { $id } from "@/utils/lib/getElement";
import { HEADER_HEIGHT } from "@/utils/constants/styles";
import { ADMIN, ORDER_PATH } from "@/utils/constants/storage";
import { setListenersModalInfo } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import { setBasket } from "@/blocks/basket/scripts/basket";
import { setMessages } from "@/blocks/messages/scripts/setMessages";

if (localStorage.getItem(ADMIN)) location.href = "/admin.html";

changeUrl("orders");

if (!("state" in window.history) || window.history.state === null) {
  const path = window.location.pathname;

  window.history.replaceState({ page: path }, "", path);
}

function getServiceById() {
  const locationPath = location.pathname;

  // id блока к которому крутит скролл
  const pathname = locationPath.split("/").slice(-1)[0];

  window.scrollTo({
    top: $id(pathname).offsetTop - HEADER_HEIGHT,
    behavior: "smooth",
  });
}

setCSSVariales();

setHeader();

setBasket();
setMessages();

setContacts();

setListenersModal();
setListenersModalInfo();

setFooter();

closeByEsc();

window.addEventListener("popstate", (e) => {
  const state = e.state;

  if (!state) {
    history.go(-2);
    localStorage.removeItem(ORDER_PATH);
  }
});

//* === анимация блоков при скролле  ================================
window.onload = getServiceById;
