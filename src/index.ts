/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from './tools/domTools';
import LazyLoader from './components/LazyLoader';
import ScrollLoader from './components/ScrollLoader';
import Element from './components/Element';
import ElementSurrogate from './components/ElementSurrogate';

export enum ELazyMode {
  SIMPLE_DEFER,
  WINDOWED_EXTERNAL,
  WINDOWED_SCROLL,
}

export type LazyLoadConfig = {
  elementSelector: string;
  preloaderBeforeSize?: number;
  preloaderAfterSize?: number;
  mode?: ELazyMode;
  useSurrogate?: boolean;
};

function startLoader(loader: LazyLoader, elements: Array<Element>, mode?: ELazyMode) {
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

export function lazyLoad(config: LazyLoadConfig): LazyLoader {
  const htmlElements: NodeListOf<HTMLElement> = DomTools.getElements(config.elementSelector);
  const elements: Array<Element> = [];  
  for (let i = 0; i < htmlElements.length; i++) {
    const element = new Element(htmlElements[i]);    
    elements.push(element);
    if (config.useSurrogate != null && config.useSurrogate)
    {
      const surrogate = new ElementSurrogate(element);
      surrogate.wrap(htmlElements[i]);      
      element.addWasLoadedCallback(() => {
        surrogate.unwrap();
      });
    }    
  }
  const loader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
  DomTools.documentReady(() => {
    startLoader(loader, elements, config.mode);
  });
  return loader;
}
