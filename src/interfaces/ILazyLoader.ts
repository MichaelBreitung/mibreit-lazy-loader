/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface ILazyLoader {
  loadAll(): void;
  
  setCurrentIndex(newIndex: number): void;
  
  loadElement(index: number): Promise<boolean>;
  
  getUnloadedElementIndices(): Array<number>;
}
