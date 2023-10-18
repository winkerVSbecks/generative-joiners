// @ts-ignore
import canvasSketch from 'canvas-sketch';
// @ts-ignore
import sketch from './sketches/zhi';
// import sketch from './sketches/animated-grid';

const placeholder = document.createElement('canvas');

const settings = {
  duration: 1,
  dimensions: [640, 640],
  playbackRate: 'throttle',
  animate: true,
  fps: 11,
  canvas: placeholder,
  context: '2d',
  scaleToFit: false,
  scaleToView: false,
  scaleContext: false,
  resizeCanvas: true,
  styleCanvas: false,
  parent: false,
  loop: false,
};

const imgEls = document.querySelectorAll(
  '.content__img-inner'
) as NodeListOf<HTMLDivElement>;

let frame = 0;

export function generateImages() {
  canvasSketch(
    sketch(() => {
      const dataURI = placeholder.toDataURL();
      if (imgEls[frame]) {
        imgEls[frame].style.backgroundImage = `url('${dataURI} ')`;
      }
      frame++;
    }),
    settings
  );
}
