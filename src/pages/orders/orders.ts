import "./orders.scss";
import "../../assets/icons/logo.png";
import { setHeader } from "@/blocks/header/scripts/header";
import { setContacts } from "@/blocks/contacts/contacts";
import { setCSSVariales } from "@/utils/lib/setCSSVariales";
import { setFooter } from "@/blocks/footer/footer";
import { setListenersModal } from "@/blocks/modal/scripts/modal";
import { closeByEsc } from "@/utils/lib/closeByEsc";
import { setDirectionAnimation } from "@/utils/lib/setDirectionAnimation";
import { changeUrl } from "@/utils/lib/changeUrl";
import { setServices } from "@/blocks/main/services/scripts/services";
import { $id } from "@/utils/lib/getElement";
import { HEADER_HEIGHT } from "@/utils/constants/styles";
import { ORDER_PATH } from "@/utils/constants/storage";

changeUrl("orders");

if (!("state" in window.history) || window.history.state === null) {
  const path = window.location.pathname;

  window.history.replaceState({ page: path }, "", path);
}

function getServiceById() {
  const locationPath = location.pathname;

  const pathname = locationPath.split("/").slice(-1)[0];

  window.scrollTo({
    top: $id(pathname).offsetTop - HEADER_HEIGHT,
    behavior: "smooth",
  });
}

setCSSVariales();

setHeader();

setContacts();

setListenersModal();

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
