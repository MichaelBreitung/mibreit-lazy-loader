/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import LazyLoader from './LazyLoader';
import ElementLoader from './ElementLoader';

function createLoader(config: LazyLoadConfig) {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(config.elementSelector);
  const elementLoaders: Array<ElementLoader> = [];

  for (let i = 0; i < elements.length; i++) {
    elementLoaders.push(new ElementLoader(elements[i]));
  }

  return new LazyLoader(elementLoaders, config.preloaderBeforeSize, config.preloaderAfterSize);
}

export type LazyLoadConfig = {
  elementSelector: string;
  preloaderBeforeSize?: number;
  preloaderAfterSize?: number;
  windowed?: boolean;
};

export function lazyLoad(config: LazyLoadConfig): LazyLoader {
  const loader = createLoader(config);

  document.addEventListener('DOMContentLoaded', () => {
    if (config.windowed === null || config.windowed === false) {
      loader.loadAll();
    } else {
      loader.loadElement(0);
      loader.setCurrentIndex(0);
    }
  });

  return loader;
}
