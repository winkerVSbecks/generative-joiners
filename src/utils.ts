import { Image } from './image';

const body = document.body;
const docEl = document.documentElement;

/**
 * Preloads images specified by the CSS selector.
 */
const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
    // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
    window.imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

/**
 * Performs linear interpolation between two numbers.
 */
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

/**
 * Calculates the Euclidean distance between two points in a 2D space.
 */
const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);

/**
 * Retrieves the current position from a mouse or touch event.
 */
const getPointerPos = (ev: MouseEvent & TouchEvent) => {
  let posx = 0;
  let posy = 0;

  // If the event is not provided, use the global window event object.
  // @ts-ignore
  if (!ev) ev = window.event;

  // Handle touch events
  if (ev.touches) {
    if (ev.touches.length > 0) {
      // Check if there are any touches available
      posx = ev.touches[0].pageX;
      posy = ev.touches[0].pageY;
    }
  }
  // Handle mouse events
  else if (ev.pageX || ev.pageY) {
    posx = ev.pageX;
    posy = ev.pageY;
  } else if (ev.clientX || ev.clientY) {
    posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
    posy = ev.clientY + body.scrollTop + docEl.scrollTop;
  }

  // Return the position.
  return { x: posx, y: posy };
};

/**
 * Computes the distance between current and last recorded mouse positions.
 */
const getMouseDistance = (
  mousePos: { x: number; y: number },
  lastMousePos: { x: number; y: number }
) => {
  return distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
};

/**
 * Computes the new position in an array after moving by a given offset.
 * The array is treated as circular, meaning subtracting from the beginning
 * wraps to the end of the array.
 */
const getNewPosition = (position: number, offset: number, arr: Image[]) => {
  // Ensure offset is non-negative and is within the range of the array's length
  const realOffset = Math.abs(offset) % arr.length;

  // Check if subtracting the offset stays within the array's bounds
  if (position - realOffset >= 0) {
    return position - realOffset;
  } else {
    // If not, wrap around to the end of the array and compute the new position
    return arr.length - (realOffset - position);
  }
};

/**
 * Set the clip path for each of the clipInnerElements based on the provided grid dimensions.
 */
const setClipPath = (
  clipInnerElements: any[],
  numRows: number,
  numCols: number
) => {
  if (clipInnerElements.length !== numRows * numCols) {
    console.error(
      'Mismatch between provided grid dimensions and number of elements.'
    );
    return;
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const idx = i * numCols + j;

      const top = (100 / numRows) * i + '%';
      const bottom = (100 / numRows) * (i + 1) + '%';
      const left = (100 / numCols) * j + '%';
      const right = (100 / numCols) * (j + 1) + '%';

      const clipPathValue = `polygon(${left} ${top}, ${right} ${top}, ${right} ${bottom}, ${left} ${bottom})`;

      clipInnerElements[idx].style.clipPath = clipPathValue;
    }
  }
};

// Exporting utility functions for use in other modules.
export {
  preloadImages,
  lerp,
  distance,
  getPointerPos,
  getMouseDistance,
  getNewPosition,
  setClipPath,
};
