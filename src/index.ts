/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import LazyLoader from './components/LazyLoader';
import ScrollLoader from './components/ScrollLoader';
import Element from './components/Element';

export enum ELazyMode {
  SIMPLE_DEFER,
  WINDOWED_ETERNAL,
  WINDOWED_SCROLL,
}

export type LazyLoadConfig = {
  elementSelector: string;
  preloaderBeforeSize?: number;
  preloaderAfterSize?: number;
  mode?: ELazyMode;
};

function startLoader(loader: LazyLoader, elements: Array<Element>, mode?: ELazyMode) {
  if (mode != null) {
    switch (mode) {
      case ELazyMode.WINDOWED_ETERNAL:
        loader.loadElement(0);
        loader.setCurrentIndex(0);
        break;
      case ELazyMode.WINDOWED_SCROLL:
        const scrollLoader = new ScrollLoader(loader, elements);
        scrollLoader.startLoader();
        break;
      case ELazyMode.SIMPLE_DEFER:
      default:
        loader.loadAll();
        break;
    }
  }
}

export function lazyLoad(config: LazyLoadConfig): LazyLoader {
  const htmlElements: NodeListOf<HTMLElement> = document.querySelectorAll(config.elementSelector);
  const elements: Array<Element> = [];
  for (let i = 0; i < htmlElements.length; i++) {
    elements.push(new Element(htmlElements[i]));
  }
  const loader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);

  window.addEventListener('load', () => {
    startLoader(loader, elements, config.mode);
  });

  return loader;
}
