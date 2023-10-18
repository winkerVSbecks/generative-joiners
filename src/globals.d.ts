export {};

declare global {
  interface Window {
    imagesLoaded: (...args: any[]) => void;
  }
}
