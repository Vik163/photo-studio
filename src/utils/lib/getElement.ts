/**
 * Получить элемент по классу
 * @param className - класс
 * @param parent - родитель, если есть
 */
export const $class = (
   className: string,
   parent?: HTMLElement,
): HTMLElement => {
   return parent
      ? parent.querySelector(`.${className}`)!
      : document.querySelector(`.${className}`)!;
};

/**
 * Получить элемент по id
 * @param id - id
 */
export const $id = (id: string) => {
   return document.getElementById(id)!;
};

/**
 * Добавить класс
 * @param className - класс
 * @param parent - родитель, если есть
 */
export const $add = (className: string, parent: HTMLElement) => {
   parent.classList.add(className);
};

/**
 * Удалить класс
 * @param className - класс
 * @param parent - родитель, если есть
 */
export const $remove = (className: string, parent: HTMLElement) => {
   parent.classList.remove(className);
};

/**
 * Переключить класс
 * @param className - класс
 * @param parent - родитель, если есть
 */
export const $toggle = (className: string, parent: HTMLElement) => {
   parent.classList.toggle(className);
};

/**
 * Проверить класс
 * @param className - класс
 * @param parent - родитель, если есть
 */
export const $contains = (className: string, parent: HTMLElement) => {
   return parent.classList.contains(className);
};
