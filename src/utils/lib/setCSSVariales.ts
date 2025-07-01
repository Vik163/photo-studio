import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_NOTE,
  HEADER_HEIGHT_PAD,
  SERVICE_HEIGHT,
} from "../constants/styles";

export function setCSSVariales() {
  //& ------ установка css-переменных --------
  const root = document.documentElement;
  root.style.setProperty("--height-service", `${SERVICE_HEIGHT}px`);
  root.style.setProperty("--height-header", `${HEADER_HEIGHT}px`);
  root.style.setProperty("--height-header-note", `${HEADER_HEIGHT_NOTE}px`);
  root.style.setProperty("--height-header-pad", `${HEADER_HEIGHT_PAD}px`);
  root.style.setProperty("--height-header-mobile", `${HEADER_HEIGHT_MOBILE}px`);
}
