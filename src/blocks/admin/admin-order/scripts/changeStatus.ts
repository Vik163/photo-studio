import { $class, $toggle } from "@/utils/lib/getElement";
import { getNewStatus } from "@/utils/ui/select/select";

export const changeStatus = (container: HTMLElement) => {
  const newStatus = getNewStatus();

  console.log("i", newStatus);
};
