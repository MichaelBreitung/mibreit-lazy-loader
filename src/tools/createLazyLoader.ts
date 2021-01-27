/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ILazyLoader from '../interfaces/ILazyLoader';
import LazyLoader from '../components/LazyLoader';
import Element from '../components/Element';
import ElementSurrogate from '../components/ElementSurrogate';
import ScrollLoader from '../components/ScrollLoader';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import { DomTools } from 'mibreit-dom-tools';

export enum ELazyMode {
  SIMPLE_DEFER,
  WINDOWED_EXTERNAL,
  WINDOWED_SCROLL,
}

export type LazyLoaderConfig = {
  elementSelector: string;
  preloaderBeforeSize?: number;
  preloaderAfterSize?: number;
  mode?: ELazyMode;
  useSurrogate?: boolean;
};

export default function (
  config: LazyLoaderConfig
): ILazyLoader {
  const htmlElements: NodeListOf<HTMLElement> = DomTools.getElements(config.elementSelector);
  const elements: Array<Element> = [];
  for (let i = 0; i < htmlElements.length; i++) {
    const element = new Element(htmlElements[i]);
    elements.push(element);
    if (config.useSurrogate) {
      const surrogate = new ElementSurrogate(htmlElements[i]);
      surrogate.wrap(htmlElements[i]);
      element.addWasLoadedCallback(() => {
        surrogate.unwrap();
      });
    }
  }

  const lazyLoader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);

  startLoader(lazyLoader, elements, config.mode)

  return lazyLoader;
}

function startLoader(loader: ILazyLoader, elements: Array<IElementLocationInfo>, mode?: ELazyMode) {
  if (mode != null) {
    switch (mode) {
      case ELazyMode.WINDOWED_EXTERNAL:
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

