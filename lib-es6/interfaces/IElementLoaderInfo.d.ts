/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default interface IElementLoaderInfo {
    wasLoaded: () => boolean;
    addWasLoadedCallback: (callback: () => void) => void;
}
