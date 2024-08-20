type Resolution = {
  width: number;
  height: number;
};

export type GestureEvent =
  | { type: 'swipe'; direction: 'up' | 'down' | 'left' | 'right' }
  | {
      type: 'panStart';
      x: number;
      y: number;
      ndcX: number;
      ndcY: number;
      resolution: Resolution;
      aspectRatio: number;
    }
  | {
      type: 'panMove';
      deltaX: number;
      deltaY: number;
      ndcDeltaX: number;
      ndcDeltaY: number;
      x: number;
      y: number;
      xDelta: number;
      yDelta: number;
      resolution: Resolution;
      aspectRatio: number;
    }
  | { type: 'panStop' }
  | {
      type: 'tap';
      x: number;
      y: number;
      ndcX: number;
      ndcY: number;
      resolution: Resolution;
      aspectRatio: number;
    }
  | {
      type: 'doubleTap';
      x: number;
      y: number;
      ndcX: number;
      ndcY: number;
      resolution: Resolution;
      aspectRatio: number;
    }
  | { type: 'zoomIn' }
  | { type: 'zoomOut' };