export type NDCCoordinate = { x: number; y: number };
export type NDCSize = { width: number; height: number };
export type ResizeQuadrant = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export function clientToNDC(clientX: number, clientY: number, width: number, height: number): NDCCoordinate {
  return {
    x: (clientX / width) * 2 - 1,
    y: -((clientY / height) * 2 - 1)
  };
}

export function getNDCPixels(ndcPosition: NDCCoordinate, ndcSize: NDCSize, containerWidth: number, containerHeight: number): { left: number; top: number; width: number; height: number } {
  return {
    left: ((ndcPosition.x + 1) / 2) * containerWidth,
    top: ((1 - ndcPosition.y) / 2) * containerHeight,
    width: (ndcSize.width / 2) * containerWidth,
    height: (ndcSize.height / 2) * containerHeight
  };
}

export function getValidUpdate(position: NDCCoordinate, size: NDCSize): { position: NDCCoordinate; size: NDCSize } | null {
  if (size.width <= 0 || size.height <= 0) {
    return null;
  }

  let left = position.x;
  let right = position.x + size.width;
  let top = position.y;
  let bottom = position.y - size.height;

  if (right < -1 || left > 1 || top < -1 || bottom > 1) {
    return null;
  }

  if (left < -1) {
    position.x = -1;
    size.width = Math.min(right + 1, 2);
  }
  if (right > 1) {
    size.width = 1 - position.x;
  }
  if (bottom < -1) {
    size.height = position.y + 1;
  }
  if (top > 1) {
    position.y = 1;
    size.height = Math.min(1 - bottom, 2);
  }

  return { position, size };
}

export function determineResizeQuadrant(ndcCursor: NDCCoordinate, ndcPosition: NDCCoordinate, ndcSize: NDCSize): ResizeQuadrant {
  const elementCenterX = ndcPosition.x + ndcSize.width / 2;
  const elementCenterY = ndcPosition.y - ndcSize.height / 2;

  const isLeft = ndcCursor.x < elementCenterX;
  const isTop = ndcCursor.y > elementCenterY;

  if (isLeft && isTop) return 'topLeft';
  else if (!isLeft && isTop) return 'topRight';
  else if (isLeft && !isTop) return 'bottomLeft';
  else return 'bottomRight';
}

export function calculateDelta(currentPosition: NDCCoordinate, startPosition: NDCCoordinate): { dx: number, dy: number } {
  return {
    dx: currentPosition.x - startPosition.x,
    dy: currentPosition.y - startPosition.y
  };
}

export function calculateNewSize(
  quadrant: ResizeQuadrant,
  dx: number,
  dy: number,
  initialSize: NDCSize,
  minWidth: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number
): NDCSize {
  let width = initialSize.width;
  let height = initialSize.height;

  switch (quadrant) {
    case 'topLeft':
    case 'bottomLeft':
      width = Math.max(minWidth, Math.min(maxWidth, initialSize.width - dx));
      break;
    case 'topRight':
    case 'bottomRight':
      width = Math.max(minWidth, Math.min(maxWidth, initialSize.width + dx));
      break;
  }

  switch (quadrant) {
    case 'topLeft':
    case 'topRight':
      height = Math.max(minHeight, Math.min(maxHeight, initialSize.height + dy));
      break;
    case 'bottomLeft':
    case 'bottomRight':
      height = Math.max(minHeight, Math.min(maxHeight, initialSize.height - dy));
      break;
  }

  return { width, height };
}

export function calculateNewPosition(
  quadrant: ResizeQuadrant,
  initialPosition: NDCCoordinate,
  initialSize: NDCSize,
  newWidth: number,
  newHeight: number
): NDCCoordinate {
  let x = initialPosition.x;
  let y = initialPosition.y;

  if (quadrant === 'topLeft' || quadrant === 'bottomLeft') {
    x = initialPosition.x + initialSize.width - newWidth;
  }

  if (quadrant === 'topLeft' || quadrant === 'topRight') {
    y = initialPosition.y - (initialSize.height - newHeight);
  }

  return { x, y };
}
