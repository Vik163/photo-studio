//! для webpack
// import { loadSrc } from './loadSrc';

interface LozadElement extends HTMLImageElement {
  load: (element?: LozadElement) => void;
  loaded: (element?: LozadElement) => void;
  poster: string | null;
}

/**
 * Подогнанный под webpack с функцией loadSrc (предварительной загрузкой url)
 * для IE в теге picture ставится аттрибут data-iesrc с прямой ссылкой
 * В тегах  source - ставятся в аттрибут srcset прямые ссылки до изображения
 * @const {boolean}
 * @private
 */
const isIE = typeof document !== "undefined" && document.documentMode;

const defaultConfig = {
  root: undefined,
  rootMargin: "0px",
  threshold: 0,
  load(element: LozadElement) {
    if (element.nodeName.toLowerCase() === "picture") {
      let img = element.querySelector("img");
      let append = false;

      if (img === null) {
        img = document.createElement("img");
        append = true;
      }

      if (isIE && element.getAttribute("data-iesrc")) {
        img.src = element.getAttribute("data-iesrc")!;
      }

      if (element.getAttribute("data-alt")) {
        img.alt = element.getAttribute("data-alt")!;
      }

      if (append) {
        element.append(img);
      }
    }

    if (
      element.nodeName.toLowerCase() === "video" &&
      !element.getAttribute("data-src")
    ) {
      if (element.children) {
        const childs: HTMLCollection = element.children;
        let childSrc: string;
        for (let i = 0; i <= childs.length - 1; i++) {
          childSrc = childs[i].getAttribute("data-src")!;
          const newSrc: string = childSrc;
          //  const newSrc: string = loadSrc(childSrc);
          if (childSrc) {
            (childs[i] as HTMLImageElement).src = childSrc;
          }
        }

        element.load();
      }
    }

    if (element.getAttribute("data-poster")) {
      element.poster = element.getAttribute("data-poster");
    }

    if (element.getAttribute("data-src")) {
      const newEl = element.getAttribute("data-src")!;
      // const newSrc = loadSrc(element.getAttribute("data-src")!);

      element.src = newEl;
    }

    if (element.getAttribute("data-srcset")) {
      const newEl = element.getAttribute("data-srcset")!;
      // const newSrc = loadSrc(element.getAttribute("data-srcset")!);

      element.setAttribute("srcset", newEl);
    }

    let backgroundImageDelimiter = ",";
    if (element.getAttribute("data-background-delimiter")) {
      backgroundImageDelimiter = element.getAttribute(
        "data-background-delimiter"
      )!;
    }

    if (element.getAttribute("data-background-image")) {
      const newEl = element.getAttribute("data-background-image")!;
      // const newSrc = loadSrc(element.getAttribute('data-background-image')!);
      const url = `url('${newEl
        .split(backgroundImageDelimiter)
        .join("'),url('")}')`;
      element.style.backgroundImage = url;
    } else if (element.getAttribute("data-background-image-set")) {
      const imageSetLinks = element //TODO =========== background-image ===============
        .getAttribute("data-background-image-set")!
        .split(backgroundImageDelimiter);
      let firstUrlLink =
        imageSetLinks[0].substr(0, imageSetLinks[0].indexOf(" ")) ||
        imageSetLinks[0]; // Substring before ... 1x
      firstUrlLink =
        firstUrlLink.indexOf("url(") === -1
          ? `url(${firstUrlLink})`
          : firstUrlLink;
      if (imageSetLinks.length === 1) {
        element.style.backgroundImage = firstUrlLink;
      } else {
        element.setAttribute(
          "style",
          (element.getAttribute("style") || "") +
            `background-image: ${firstUrlLink}; background-image: -webkit-image-set(${imageSetLinks}); background-image: image-set(${imageSetLinks})`
        );
      }
    }

    if (element.getAttribute("data-toggle-class")) {
      element.classList.toggle(element.getAttribute("data-toggle-class")!);
    }
  },
  loaded(i: LozadElement) {},
};

function markAsLoaded(element: Element) {
  element.setAttribute("data-loaded", "true");
}

function preLoad(element: LozadElement) {
  if (element.getAttribute("data-placeholder-background")) {
    element.style.background = element.getAttribute(
      "data-placeholder-background"
    )!;
  }
}

const isLoaded = (element: Element) =>
  element.getAttribute("data-loaded") === "true";

const onIntersection =
  (
    load: (element: LozadElement) => void,
    loaded: (element: LozadElement) => void
  ) =>
  (
    entries: IntersectionObserverEntry[],
    observer: { unobserve: (arg0: Element) => void }
  ) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        observer.unobserve(entry.target);

        if (!isLoaded(entry.target)) {
          load(entry.target as LozadElement);
          markAsLoaded(entry.target);
          loaded(entry.target as LozadElement);
        }
      }
    });
  };

const getElements = (selector: any, root = document) => {
  if (selector instanceof Element) {
    return [selector];
  }

  if (selector instanceof NodeList) {
    return selector;
  }

  return root.querySelectorAll(selector);
};

function lozad(selector = ".lozad", options = {}) {
  const { root, rootMargin, threshold, load, loaded } = Object.assign(
    {},
    defaultConfig,
    options
  );
  let observer: IntersectionObserver;

  if (typeof window !== "undefined" && window.IntersectionObserver) {
    observer = new IntersectionObserver(onIntersection(load, loaded), {
      root,
      rootMargin,
      threshold,
    });
  }

  const elements = getElements(selector, root);
  for (let i = 0; i < elements.length; i++) {
    preLoad(elements[i]);
  }

  return {
    observe() {
      const elements = getElements(selector, root);

      for (let i = 0; i < elements.length; i++) {
        if (isLoaded(elements[i])) {
          continue;
        }

        if (observer) {
          observer.observe(elements[i]);
          continue;
        }

        load(elements[i]);
        markAsLoaded(elements[i]);
        loaded(elements[i]);
      }
    },
    triggerLoad(element: LozadElement) {
      if (isLoaded(element)) {
        return;
      }

      load(element);
      markAsLoaded(element);
      loaded(element);
    },
    //@ts-ignore
    observer,
  };
}

export default lozad;
