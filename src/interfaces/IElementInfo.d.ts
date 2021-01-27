/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementLoaderInfo from "./IElementLoaderInfo";

export default interface IElementInfo extends IElementLoaderInfo {
    getWidth(): number;
    getHeight(): number;
    getStyle(): string;    
}
