import { $add, $class, $remove } from "@/utils/lib/getElement";
import { setContentOneService, setContentServices } from "./setContentServices";
import { fetchAdminServices } from "@/utils/services/admin/fetchAdminServices";
import {
  closeOverlayAndLoader,
  openOverlayAndLoader,
} from "@/utils/ui/overlay/overlay";
import { getDataCacheByName } from "@/utils/lib/dataCache";
import type { AdminServices } from "@/utils/types/admin-data-services";
import { urlServices } from "@/utils/constants/admin/urls";

const admin = $class("admin");
const adminService = $class("admin-services");
const btnAdminServices = $class("admin__btn-services-edit", admin);
const btnServiceBack = $class("admin-services__back");
const errorServices = $class("admin__error-services", admin);

async function openAdminServices() {
  $add("active", adminService);
  $remove("active", admin);

  openOverlayAndLoader("loader");

  const resServices = await fetchAdminServices();

  if (typeof resServices === "string") {
    errorServices.textContent = resServices;
  } else {
    const servicesData: AdminServices = await getDataCacheByName(urlServices);

    console.log("servicesData:", servicesData);
    setContentServices(servicesData);
  }

  closeOverlayAndLoader();
}

function closeAdminServices() {
  $remove("active", adminService);
  $add("active", admin);
}

export const setAdminServices = async () => {
  $remove("active", adminService);

  addAdminServicesListeners();
};

export const addAdminServicesListeners = () => {
  btnAdminServices.addEventListener("click", openAdminServices);
  btnServiceBack.addEventListener("click", closeAdminServices);
};
