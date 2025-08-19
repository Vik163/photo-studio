import { $id } from "@/utils/lib/getElement";
import { closeMenu } from "./menu";
import { HEADER_HEIGHT } from "@/utils/constants/styles";
import { changeOrderPathname } from "./changeOrderPathname";

export function scrollToBlock(event: Event) {
  event.preventDefault();
  const nameEl = (event.target as HTMLAnchorElement).name;

  closeMenu();

  changeOrderPathname(nameEl);

  const topPos =
    $id(nameEl).getBoundingClientRect().top -
    HEADER_HEIGHT +
    window.pageYOffset;
  window.scrollTo({
    top: topPos,
    behavior: "smooth",
  });
}
