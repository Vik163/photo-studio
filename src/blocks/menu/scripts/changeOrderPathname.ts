import { ORDER_PATH } from "@/utils/constants/storage";
import { changeUrl } from "@/utils/lib/changeUrl";

export function changeOrderPathname(name: string) {
  const pathname = location.pathname;

  if (pathname !== "/") {
    localStorage.setItem(ORDER_PATH, name);
    changeUrl("orders");
  }
}
