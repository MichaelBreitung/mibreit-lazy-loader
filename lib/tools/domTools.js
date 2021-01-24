/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
function documentReady(callback) {
    window.addEventListener('load', callback);
}
function createElement(tagName) {
    return document.createElement(tagName);
}
function removeElement(element) {
    element.parentElement.removeChild(element);
}
function wrapElements(elements, wrapper) {
    elements[0].parentNode.insertBefore(wrapper, elements[0]);
    elements.forEach(function (element) {
        wrapper.appendChild(element);
    });
}
function unwrapElements(wrapper) {
    var elements = wrapper.childNodes;
    elements.forEach(function (element) {
        wrapper.parentNode.insertBefore(element, wrapper);
    });
}
function getElementDimension(element) {
    return {
        width: element.clientWidth,
        height: element.clientHeight,
    };
}
function isElementWithinWindow(element) {
    var elementRect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    return elementRect.top + elementRect.height > 0 && elementRect.top < windowHeight;
}
function getCssClass(element) {
    return element.getAttribute('class');
}
function applyCssClass(element, cssClass) {
    if (cssClass !== null) {
        element.setAttribute('class', cssClass);
    }
    else {
        element.removeAttribute('class');
    }
}
function getCssStyle(element, styleName) {
    return element.style.getPropertyValue(styleName);
}
function applyCssStyle(element, styleName, styleProperty) {
    if (styleProperty !== null) {
        element.style.setProperty(styleName, styleProperty);
    }
    else {
        element.style.removeProperty(styleName);
        if (element.style.length === 0) {
            element.removeAttribute('style');
        }
    }
}
function applyCssStyles(element, styles) {
    if (styles !== null) {
        element.style.cssText = styles;
    }
    else {
        element.removeAttribute('style');
    }
}
function getAttribute(element, attribute) {
    return element.getAttribute(attribute);
}
function setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}
function removeAttribute(element, attribute) {
    element.removeAttribute(attribute);
}
function addScrollEventListener(callback) {
    document.addEventListener('scroll', callback);
}
function addResizeEventListener(callback) {
    window.addEventListener('resize', callback);
}
function addEventListener(element, event, callback) {
    element.addEventListener(event, callback);
}
function getElements(selector) {
    return document.querySelectorAll(selector);
}
export default {
    documentReady: documentReady,
    createElement: createElement,
    removeElement: removeElement,
    wrapElements: wrapElements,
    unwrapElements: unwrapElements,
    getElementDimension: getElementDimension,
    isElementWithinWindow: isElementWithinWindow,
    getCssClass: getCssClass,
    applyCssClass: applyCssClass,
    applyCssStyles: applyCssStyles,
    getCssStyle: getCssStyle,
    applyCssStyle: applyCssStyle,
    getAttribute: getAttribute,
    setAttribute: setAttribute,
    removeAttribute: removeAttribute,
    addScrollEventListener: addScrollEventListener,
    addResizeEventListener: addResizeEventListener,
    addEventListener: addEventListener,
    getElements: getElements,
};
