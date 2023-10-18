import { ImageTrail } from './imageTrail';

// @ts-ignore
import { generateImages } from './sketch-to-images';

generateImages();

new ImageTrail(document.querySelector('.content') as HTMLElement);
