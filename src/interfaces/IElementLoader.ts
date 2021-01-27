/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementLoaderInfo from "./IElementLoaderInfo";

export default interface IElementLoader extends IElementLoaderInfo {
  load: () => Promise<boolean>; 
}
