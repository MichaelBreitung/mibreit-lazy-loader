export function isElementWithinScrollArea(element: HTMLElement): boolean {
  const elementRect = element.getBoundingClientRect();
  return (
    elementRect.top + elementRect.height > 0 &&
    elementRect.top < window.innerHeight &&
    elementRect.left + elementRect.width > 0 &&
    elementRect.left < window.innerWidth
  );
}
