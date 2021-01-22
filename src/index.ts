/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import LazyLoader from './LazyLoader';
import ScrollLoader from './ScrollLoader';
import ElementLoader from './ElementLoader';

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

function createLoader(
  elements: NodeListOf<HTMLElement>,
  preloaderBeforeSize?: number,
  preloaderAfterSize?: number
): LazyLoader {
  const elementLoaders: Array<ElementLoader> = [];
  for (let i = 0; i < elements.length; i++) {
    elementLoaders.push(new ElementLoader(elements[i]));
  }
  return new LazyLoader(elementLoaders, preloaderBeforeSize, preloaderAfterSize);
}

function startLoader(loader: LazyLoader, elements: NodeListOf<HTMLElement>, mode?: ELazyMode) {
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
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(config.elementSelector);
  const loader = createLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);

  window.addEventListener('load', () => {
    startLoader(loader, elements, config.mode);
  });

  return loader;
}
