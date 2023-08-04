/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default function (callback, wait) {
    var timeout;
    return function debouncedCallback() {
        var later = function () {
            clearTimeout(timeout);
            callback();
        };
        clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
    };
}
;
