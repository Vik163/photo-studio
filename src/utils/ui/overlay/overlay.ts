import { $add, $class, $remove } from "@/utils/lib/getElement";

const overlay = $class("overlay");
const loader = $class("loader", overlay);

export const openOverlayAndLoader = (el?: "loader") => {
  $add("overlay_active", overlay);
  if (el === "loader") $add("loader_active", loader);
};

export const closeOverlayAndLoader = () => {
  $remove("overlay_active", overlay);
  $remove("loader_active", loader);
};
