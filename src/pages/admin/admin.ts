import { setAuth, setListenersAuth } from "@/blocks/admin/auth/auth";
import "./admin.scss";
import { ADMIN } from "@/utils/constants/storage";
import { $class } from "@/utils/lib/getElement";
import { redirectOnPage } from "@/utils/lib/redirectOnPage";
import { setAdminBlock } from "@/blocks/admin/admin-block/scripts/adminBlock";
import { getCookie } from "@/utils/lib/getCookie";
import { CONTROL_TOKEN } from "@/utils/constants/admin/cookies";

const btn = $class("main-admin__btn");

localStorage.setItem(ADMIN, "__admin");

function setAuthOrAdmin() {
  const controlToken = getCookie(CONTROL_TOKEN);
  if (controlToken) {
    setAdminBlock();
  } else {
    setAuth();
  }
}

setAuthOrAdmin();

setListenersAuth();

btn.addEventListener("click", function () {
  localStorage.removeItem(ADMIN);

  redirectOnPage("");
});
