/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import LazyLoader from './LazyLoader';
import ElementLoader from './ElementLoader';

function createLoader(elementSelector: string)
{
  const elements : NodeListOf<HTMLElement> = document.querySelectorAll(elementSelector);
  const elementLoaders : Array<ElementLoader> = [];

  for (let i = 0; i < elements.length; i++)
  {
    elementLoaders.push(new ElementLoader(elements[i]));
  }

  return new LazyLoader(elementLoaders);  
}

export type LazyLoadConfig  = {
  elementSelector: string,
  windowed?: boolean
}

export function lazyLoad(config: LazyLoadConfig) : LazyLoader
{
  const loader = createLoader(config.elementSelector);

  document.addEventListener('DOMContentLoaded', () => {
    if (config.windowed === null || config.windowed === false)
    {
      loader.loadAll();
    }    
    else{
      loader.loadElement(0);
      loader.setCurrentIndex(0);
    }
  });

  return loader;
}