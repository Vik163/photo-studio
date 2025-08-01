import "./orders.scss";
import "../../assets/icons/logo.png";
import { setHeader } from "@/blocks/header/scripts/header";
import { setContacts } from "@/blocks/contacts/contacts";
import { setCSSVariales } from "@/utils/lib/setCSSVariales";
import { setFooter } from "@/blocks/footer/footer";
import { setMailModal } from "@/blocks/mail-modal/scripts/mail-modal";
import { closeByEsc } from "@/utils/lib/closeByEsc";
import { setDirectionAnimation } from "@/utils/lib/setDirectionAnimation";
import { changeUrl } from "@/utils/lib/changeUrl";
import { setServices } from "@/blocks/main/services/scripts/services";
import { $id } from "@/utils/lib/getElement";
import { HEADER_HEIGHT } from "@/utils/constants/styles";

if (__IS_DEV__) {
  changeUrl("orders");
}

function getServiceById() {
  const locationPath = location.pathname;

  const pathname = locationPath.split("/").slice(-1)[0];
  console.log("pathname:", pathname);

  window.scrollTo({
    top: $id(pathname).offsetTop - HEADER_HEIGHT,
    behavior: "smooth",
  });
}

setCSSVariales();

setHeader();

setContacts();

setMailModal();

setFooter();

closeByEsc();

//* === анимация блоков при скролле  ================================
window.onload = getServiceById;
