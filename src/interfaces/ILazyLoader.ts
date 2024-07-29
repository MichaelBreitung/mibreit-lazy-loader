/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface ILazyLoader {
  loadAll(): Promise<void>;

  setCurrentIndex(newIndex: number): Promise<void>;

  loadElement(index: number): Promise<boolean>;

  getUnloadedElementIndices(): Array<number>;
}
