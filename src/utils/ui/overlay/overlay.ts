import { $add, $class, $remove } from "@/utils/lib/getElement";

const overlay = $class("overlay");
const loader = $class("loader", overlay);

/**
 * Устанавливает оверлей и лоадер. Лоадер - добавочная опция
 * @param isLoader "loader" | ""
 */
export const openOverlayAndLoader = (isLoader: "loader" | "") => {
  $add("overlay_active", overlay);
  if (isLoader === "loader") $add("loader_active", loader);
};

export const closeOverlayAndLoader = () => {
  $remove("overlay_active", overlay);
  $remove("loader_active", loader);
};
