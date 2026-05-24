/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IElementInfo {
  getHtmlElement(): HTMLElement;

  getWidth(): number;

  getHeight(): number;

  getStyle(): string;
}
