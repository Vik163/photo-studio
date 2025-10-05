import { $add, $class, $remove } from "@/utils/lib/getElement";
import { setContentServices } from "./setContentServices";
import { fetchAdminServices } from "@/utils/services/admin/fetchAdminServices";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";

const admin = $class("admin");
const adminService = $class("admin-services");
const btnAdminServices = $class("admin__btn-services-edit", admin);
const btnServiceBack = $class("admin-services__back");
const errorServices = $class("admin__error-services", admin);

async function openAdminServices() {
  $add("active", adminService);
  $remove("active", admin);

  openOverlayAndLoader("loader");

  const res = await fetchAdminServices();

  setContentServices();

  closeOverlayAndLoader();
}

function closeAdminServices() {
  $remove("active", adminService);
  $add("active", admin);
}

export const setAdminServices = async () => {
  $remove("active", adminService);
  const resServices = "await fetchAdminMessages()";

  if (resServices) {
    errorServices.textContent = resServices;
  } else {
    //  const servicesData: AdminData[] = await getDataCacheByName(urlServices);
  }

  addAdminServicesListeners();
};

export const addAdminServicesListeners = () => {
  btnAdminServices.addEventListener("click", openAdminServices);
  btnServiceBack.addEventListener("click", closeAdminServices);
};
