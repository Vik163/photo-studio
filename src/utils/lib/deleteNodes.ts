/**
 * Удаляет ноды по классу
 * @param classEl
 * @param container контейнер где нужно удалить
 */

export function deleteNodes(classEl: string, container: HTMLElement) {
  container.querySelectorAll(classEl).forEach((node) => {
    node.remove();
  });
}
