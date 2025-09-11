import "./index.scss";
import "../../assets/icons/logo.png";
import "../../assets/images/home-2.jpg";
import { setServices } from "@/blocks/main/services/scripts/services";
import { setHeader } from "@/blocks/header/scripts/header";
import { setContacts } from "@/blocks/contacts/contacts";
import { setCSSVariales } from "@/utils/lib/setCSSVariales";
import { setFooter } from "@/blocks/footer/footer";
import { setListenersModal } from "@/blocks/modals/modal/scripts/modal";
import { closeByEsc } from "@/utils/lib/closeByEsc";
import { setDirectionAnimation } from "@/utils/lib/setDirectionAnimation";
import { ORDER_PATH } from "@/utils/constants/storage";
import { setListenersModalInfo } from "@/blocks/modals/modal-info/scripts/modal-confirm";
import { setBasket } from "@/blocks/basket/scripts/basket";
import { setMessages } from "@/blocks/messages/scripts/setMessages";

if (location.pathname !== "/") {
  const locationPath = location.pathname;

  history.pushState(null, locationPath, locationPath);

  if (locationPath === "/index.html") {
    window.history.pushState(null, "", "/");
  } else if (locationPath === "/errors") {
    location.href = `/errors.html`;
  } else if (locationPath === "/politic") {
    location.href = `/politic.html`;
  } else location.href = `/orders.html`;
}

setCSSVariales();

setHeader();

setBasket();
setMessages();

setServices();

setContacts();

setListenersModal();
setListenersModalInfo();

setFooter();

closeByEsc();

//* === анимация блоков при скролле  ================================
window.onload = setDirectionAnimation;
