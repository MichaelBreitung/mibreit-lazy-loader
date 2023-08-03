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
  WINDOWED_SCROLL_HORIZONTAL,
}

export type LazyLoaderConfig = {
  preloaderBeforeSize?: number;
  preloaderAfterSize?: number;
  mode?: ELazyMode;
  useSurrogate?: boolean;
};

function checkElementSelectorInput(elementSelector: string) {
  if (typeof elementSelector !== 'string') {
    throw new Error('createLazyLoader - first parameter needs to be a css selector string');
  }
}

function checkConfig(config: LazyLoaderConfig) {
  if (typeof config.preloaderAfterSize !== 'undefined' && typeof config.preloaderAfterSize !== 'number') {
    throw new Error('createLazyLoader - preloaderAfterSize of config must be a number');
  }
  if (typeof config.preloaderBeforeSize !== 'undefined' && typeof config.preloaderBeforeSize !== 'number') {
    throw new Error('createLazyLoader - preloaderBeforeSize of config must be a number');
  }
  if (typeof config.mode !== 'undefined' && typeof config.mode !== 'number') {
    throw new Error('createLazyLoader - mode of config must be a number (0, 1, 2, 3) - use type ELazyMode');
  }
}

function startLoader(
  loader: ILazyLoader,
  mode: ELazyMode = ELazyMode.SIMPLE_DEFER,
  elementLocations: Array<IElementLocationInfo>
) {
  console.log('startLoader');
  if (mode != null) {
    switch (mode) {
      case ELazyMode.WINDOWED_EXTERNAL:
        loader.loadElement(0);
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
  checkConfig(config);
  console.log('createLazyLoaderFromElements', JSON.stringify(config));
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

  const lazyLoader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
  // enqueing execution of startLoader -> to ensure that resize events from Surrogates are executed before
  setTimeout(() => {
    startLoader(lazyLoader, config.mode, elementLocations);
  }, 0);
  return lazyLoader;
}

export function createLazyLoader(elementSelector: string, config: LazyLoaderConfig): ILazyLoader {
  checkElementSelectorInput(elementSelector);
  const htmlElements: NodeListOf<HTMLElement> = DomTools.getElements(elementSelector);
  const elements: Array<Element> = [];
  for (let i = 0; i < htmlElements.length; i++) {
    const element = new Element(htmlElements[i]);
    elements.push(element);
  }
  return createLazyLoaderFromElements(elements, config);
}
