import "./index.scss";
import "../../assets/icons/logo.png";
import "../../assets/images/home-2.jpg";
import { setServices } from "@/blocks/services/scripts/services";
import { setHeader } from "@/blocks/header/scripts/header";
import { setContacts } from "@/blocks/contacts/contacts";
import { setCSSVariales } from "@/utils/lib/setCSSVariales";
import { setFooter } from "@/blocks/footer/footer";
import { setMailModal } from "@/blocks/mail-modal/scripts/mail-modal";
import { closeByEsc } from "@/utils/lib/closeByEsc";
import { setDirectionAnimation } from "@/utils/lib/setDirectionAnimation";

//! для разрабтки ===========================
if (__IS_DEV__ && location.pathname !== "/") {
  const locationPath = location.pathname;
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

setServices();

setContacts();

setMailModal();

setFooter();

closeByEsc();

//* === анимация блоков при скролле  ================================
window.onload = setDirectionAnimation;
