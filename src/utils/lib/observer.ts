export type ObserveCallback = (
  entry: IntersectionObserverEntry,
  isLoaded: boolean,
  ...args: any
) => void;

/**
 * Ленивая загрузка
 * @param el - Наблюдаемый элемент
 * @param callback - аргументы: IntersectionObserverEntry, isLoaded: уже загруженный или нет, и ...args
 * @param options - необязательный - настройки наблюдателя
 * @param stop - необязательный - отключает наблюдатель
 */
export const observer = (
  el: Element,
  callback: ObserveCallback,
  options?: IntersectionObserverInit,
  stop?: boolean
) => {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const isLoaded = Boolean(el.getAttribute("data-loaded"));

        callback(entry, isLoaded);
        if (entry.isIntersecting) {
          if (!isLoaded) el.setAttribute("data-loaded", "true");
        }
      });
    },
    options
  );

  if (stop) {
    observer.unobserve(el);
  } else observer.observe(el);
};
