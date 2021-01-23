/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export type TElementDimention = { width: number; height: number };

function documentReady(callback: () => void) {
  window.addEventListener('load', callback);
}

function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

function removeElement(element: HTMLElement) {
  element.parentElement.removeChild(element);  
}

function wrapElements(elements: Array<Node>, wrapper: HTMLElement) {
  elements[0].parentNode.insertBefore(wrapper, elements[0]);
  elements.forEach((element: HTMLElement) => {
    wrapper.appendChild(element);
  });
}

function unwrapElements(wrapper: HTMLElement) {
  const elements = wrapper.childNodes;
  elements.forEach((element: HTMLElement) => {
    wrapper.parentNode.insertBefore(element, wrapper);
  });
}

function getElementDimension(element: HTMLElement): TElementDimention {
  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

function isElementWithinWindow(element: HTMLElement)
{
  const elementRect: DOMRect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return elementRect.top + elementRect.height > 0 && elementRect.top < windowHeight;
}

function getCssClass(element: HTMLElement): string {
  return element.getAttribute('class');
}

function applyCssClass(element: HTMLElement, cssClass: string | null) {
  if (cssClass !== null) {
    element.setAttribute('class', cssClass);
  } else {
    element.removeAttribute('class');
  }
}

function getCssStyle(element: HTMLElement, styleName: string): string {
  return element.style.getPropertyValue(styleName);
}

function applyCssStyle(element: HTMLElement, styleName: string, styleProperty: string | null) {
  if (styleProperty !== null) {
    element.style.setProperty(styleName, styleProperty);
  } else {
    element.style.removeProperty(styleName);
    if (element.style.length === 0) {
      element.removeAttribute('style');
    }
  }
}

function applyCssStyles(element: HTMLElement, styles: string | null) {
  if (styles !== null) {
    element.style.cssText = styles;
  } else {
    element.removeAttribute('style');
  }
}

function getAttribute(element: HTMLElement, attribute: string) : string {
  return element.getAttribute(attribute);
}

function setAttribute(element: HTMLElement, attribute: string, value: string) {
  element.setAttribute(attribute, value);
}

function removeAttribute(element: HTMLElement, attribute: string) {
  element.removeAttribute(attribute);
}

function addScrollEventListener(callback: (event: UIEvent) => void) {
  document.addEventListener('scroll', callback);
}

function addResizeEventListener(callback: (event: UIEvent) => void) {
  window.addEventListener('resize', callback);
}

function addEventListener(element: HTMLElement, event: string, callback: () => void) {
  element.addEventListener(event, callback);
}

function getElements(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

export default {
  documentReady,
  createElement,
  removeElement,
  wrapElements,
  unwrapElements,
  getElementDimension,
  isElementWithinWindow,
  getCssClass,
  applyCssClass,
  applyCssStyles,
  getCssStyle,
  applyCssStyle,
  getAttribute,
  setAttribute,
  removeAttribute,
  addScrollEventListener,
  addResizeEventListener,
  addEventListener,  
  getElements,
};
