/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import Element from '../components/Element';
import ILazyLoader from '../interfaces/ILazyLoader';
import { LazyLoaderConfig } from '../types';
export declare function createLazyLoaderFromElements(elements: Array<Element>, config: LazyLoaderConfig): ILazyLoader;
export declare function createLazyLoader(elementSelector: string, config: LazyLoaderConfig): ILazyLoader;
