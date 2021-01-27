/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ILazyLoader from '../interfaces/ILazyLoader';
export declare enum ELazyMode {
    SIMPLE_DEFER = 0,
    WINDOWED_EXTERNAL = 1,
    WINDOWED_SCROLL = 2
}
export declare type LazyLoaderConfig = {
    elementSelector: string;
    preloaderBeforeSize?: number;
    preloaderAfterSize?: number;
    mode?: ELazyMode;
    useSurrogate?: boolean;
};
export default function (config: LazyLoaderConfig): ILazyLoader;
