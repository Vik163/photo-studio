export const removeListElements = (nameClass: string, list: HTMLElement) => {
  list.querySelectorAll(nameClass).forEach((el) => el.remove());
};
