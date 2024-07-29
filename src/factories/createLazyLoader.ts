/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElements } from 'mibreit-dom-tools';

import Element from '../components/Element';
import ElementSurrogate from '../components/ElementSurrogate';
import ScrollLoader from '../components/ScrollLoader';

// Interfaces
import ILazyLoader from '../interfaces/ILazyLoader';
import LazyLoader from '../components/LazyLoader';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';

// Types
import { checkLazyLoaderConfig, ELazyMode, LazyLoaderConfig } from '../types';

function checkElementSelectorInput(elementSelector: string) {
  if (typeof elementSelector !== 'string') {
    throw new Error('createLazyLoader - first parameter needs to be a css selector string');
  }
}

async function startLoader(
  loader: ILazyLoader,
  mode: ELazyMode = ELazyMode.SIMPLE_DEFER,
  elementLocations: Array<IElementLocationInfo>
) {
  console.log('startLoader');
  if (mode != null) {
    switch (mode) {
      case ELazyMode.WINDOWED_EXTERNAL:
        await loader.loadElement(0);
        loader.setCurrentIndex(0);
        break;
      case ELazyMode.WINDOWED_SCROLL:
      case ELazyMode.WINDOWED_SCROLL_HORIZONTAL:
        const scrollLoader = new ScrollLoader(loader, elementLocations);
        scrollLoader.startLoader();
        break;
      case ELazyMode.SIMPLE_DEFER:
      default:
        loader.loadAll();
        break;
    }
  } else {
    loader.loadAll();
  }
}

export function createLazyLoaderFromElements(elements: Array<Element>, config: LazyLoaderConfig): ILazyLoader {
  console.log('createLazyLoaderFromElements', JSON.stringify(config));

  checkLazyLoaderConfig(config);

  let elementLocations: Array<IElementLocationInfo> = elements;
  if (config?.useSurrogate) {
    const surrogates: Array<ElementSurrogate> = [];
    if (config.mode === ELazyMode.WINDOWED_SCROLL || config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL) {
      for (let i = 0; i < elements.length; i++) {
        const surrogate = new ElementSurrogate(
          elements[i],
          config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL ? true : false
        );
        surrogates.push(surrogate);
      }
    }
    elementLocations = surrogates;
  }

  const lazyLoader = new LazyLoader(elements, config.loaderWindowLeft, config.loaderWindowRight);
  // enqueing execution of startLoader -> to ensure that resize events from Surrogates are executed before
  setTimeout(() => {
    startLoader(lazyLoader, config.mode, elementLocations);
  }, 0);
  return lazyLoader;
}

export function createLazyLoader(elementSelector: string, config: LazyLoaderConfig): ILazyLoader {
  console.log('createLazyLoader', elementSelector, JSON.stringify(config));

  checkElementSelectorInput(elementSelector);

  const htmlElements: NodeListOf<HTMLElement> = getElements(elementSelector);
  const elements: Array<Element> = [];
  for (let i = 0; i < htmlElements.length; i++) {
    const element = new Element(htmlElements[i]);
    elements.push(element);
  }
  return createLazyLoaderFromElements(elements, config);
}
