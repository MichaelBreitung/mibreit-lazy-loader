/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default interface IElementLoader {
    load: () => Promise<boolean>;
    wasLoaded: () => boolean;
}
