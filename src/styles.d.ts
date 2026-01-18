/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

declare module '*.css';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
