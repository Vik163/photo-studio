export const removeListElements = (list: HTMLElement) => {
  list.querySelectorAll(".device-order").forEach((el) => el.remove());
};
