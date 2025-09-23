import { setAuthOrAdmin, setListenersAuth } from "@/blocks/admin/auth/auth";
import "./admin.scss";
import { ADMIN } from "@/utils/constants/storage";
import { $class } from "@/utils/lib/getElement";
import { redirectOnPage } from "@/utils/lib/redirectOnPage";

const btn = $class("main-admin__btn");

localStorage.setItem(ADMIN, "__admin");

setAuthOrAdmin();

setListenersAuth();

btn.addEventListener("click", function () {
  localStorage.removeItem(ADMIN);

  redirectOnPage("");
});
