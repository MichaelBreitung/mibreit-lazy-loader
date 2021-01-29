/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default function(callback: () => void, wait: number) {
  let timeout: number;

  return function debouncedCallback() {
    const later = () => {
      clearTimeout(timeout);
      callback();
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
};